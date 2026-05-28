import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useBlocker } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    submitAnswer,
    skipQuestion,
    submitQuiz,
} from "../../../../../redux/slice/quizSlice";

export const useQuizSession = ({
    sessionKey,
    storagePrefix,
    attempt,
    questions,
    topicId,
    onAutoSubmitComplete
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [selected, setSelected] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasAutoSubmitted, setHasAutoSubmitted] = useState(false);
    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);
    const [isTimeUp, setIsTimeUp] = useState(false);
    const [isReloadSubmitting, setIsReloadSubmitting] = useState(false);

    // Refs
    const attemptRef = useRef(attempt);
    const selectedRef = useRef(selected);
    const currentIndexRef = useRef(currentIndex);
    const questionsRef = useRef(questions);
    const hasAutoSubmittedRef = useRef(hasAutoSubmitted);
    const timeLeftRef = useRef(timeLeft);
    const isTimeUpRef = useRef(isTimeUp);
    const topicIdRef = useRef(topicId);

    // Sync refs
    useEffect(() => { attemptRef.current = attempt; }, [attempt]);
    useEffect(() => { selectedRef.current = selected; }, [selected]);
    useEffect(() => { currentIndexRef.current = currentIndex; }, [currentIndex]);
    useEffect(() => { questionsRef.current = questions; }, [questions]);
    useEffect(() => { hasAutoSubmittedRef.current = hasAutoSubmitted; }, [hasAutoSubmitted]);
    useEffect(() => { timeLeftRef.current = timeLeft; }, [timeLeft]);
    useEffect(() => { isTimeUpRef.current = isTimeUp; }, [isTimeUp]);
    useEffect(() => { topicIdRef.current = topicId; }, [topicId]);

    // Navigation Blocker
    const shouldBlockNavigation = !hasAutoSubmitted && !isReloadSubmitting && !isTimeUp && !!attempt?.attempt_id && !attempt?.is_submitted;
    const blocker = useBlocker(shouldBlockNavigation);

    useEffect(() => {
        if (blocker.state === "blocked") {
            setShowLeaveModal(true);
        }
    }, [blocker]);

    // Session storage management
    useEffect(() => {
        if (attempt?.is_submitted || attempt?.status === "failed" || attempt?.status === "passed") {
            sessionStorage.removeItem(sessionKey);
        }
    }, [attempt, sessionKey]);

    useEffect(() => {
        if (attempt?.attempt_id && attempt?.attempts_remaining > 0) {
            sessionStorage.setItem(sessionKey, attempt.attempt_id);
        }
    }, [attempt?.attempt_id, attempt?.attempts_remaining, sessionKey]);

    // Timer setup
    useEffect(() => {
        if (attempt?.duration && attempt?.attempts_remaining > 0) {
            setTimeLeft(attempt.duration * 60);
        }
    }, [attempt?.duration, attempt?.attempts_remaining]);

    // Auto-submit function
    const performAutoSubmit = useCallback(async (shouldNavigate = true, targetPath = null) => {
        if (hasAutoSubmittedRef.current) return;
        setHasAutoSubmitted(true);
        sessionStorage.removeItem(sessionKey);

        try {
            const currentAttempt = attemptRef.current;
            const currentSelected = selectedRef.current;
            const currentQues = questionsRef.current?.[currentIndexRef.current];
            const currentTopicId = topicIdRef.current;

            if (currentSelected && currentQues && currentQues.selected_option_id === null && currentAttempt?.attempt_id) {
                await dispatch(submitAnswer({
                    attemptId: currentAttempt.attempt_id,
                    questionId: currentQues.id,
                    optionId: currentSelected,
                })).unwrap();
            }

            if (currentAttempt?.attempt_id && currentTopicId) {
                await dispatch(submitQuiz({
                    attemptId: currentAttempt.attempt_id,
                    topicId: currentTopicId,
                })).unwrap();
            }

            if (onAutoSubmitComplete) {
                onAutoSubmitComplete(currentAttempt?.attempt_id);
            }
        } catch (error) {
            console.error(`Failed to auto-submit ${storagePrefix}:`, error);
        } finally {
            if (shouldNavigate) {
                if (targetPath) {
                    navigate(targetPath);
                } else if (attemptRef.current?.attempt_id) {
                    navigate(`/${storagePrefix}/result/${attemptRef.current.attempt_id}`);
                } else {
                    navigate(-1);
                }
            }
        }
    }, [dispatch, navigate, sessionKey, storagePrefix, onAutoSubmitComplete]);

    // Before unload handler
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (!hasAutoSubmittedRef.current && !isTimeUpRef.current && attemptRef.current?.attempt_id) {
                sessionStorage.setItem(`${storagePrefix}_refresh_detected`, "true");
                localStorage.setItem(`${storagePrefix}_reload_submit`, JSON.stringify({
                    attemptId: attemptRef.current.attempt_id,
                    topicId: topicIdRef.current,
                }));
                e.preventDefault();
                e.returnValue = "";
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [storagePrefix]);

    // Handle reload auto-submit
    useEffect(() => {
        const refreshDetected = sessionStorage.getItem(`${storagePrefix}_refresh_detected`) === "true";
        const pendingData = localStorage.getItem(`${storagePrefix}_reload_submit`);

        if (!refreshDetected || !pendingData) return;

        sessionStorage.removeItem(`${storagePrefix}_refresh_detected`);
        const data = JSON.parse(pendingData);
        localStorage.removeItem(`${storagePrefix}_reload_submit`);

        if (data?.attemptId && data?.topicId) {
            setIsReloadSubmitting(true);
            setHasAutoSubmitted(true);
            dispatch(submitQuiz({ attemptId: data.attemptId, topicId: data.topicId }))
                .unwrap()
                .then((result) => {
                    navigate(`/${storagePrefix}/result/${data.topicId}/${data.attemptId}`, {
                        state: { results: result },
                    });
                })
                .catch((err) => {
                    console.error("Auto submit failed:", err);
                    setIsReloadSubmitting(false);
                });
        }
    }, [dispatch, navigate, storagePrefix]);

    // Timer countdown
    useEffect(() => {
        if (timeLeft === null || timeLeft <= 0 || isTimeUp || hasAutoSubmitted) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsTimeUp(true);
                    sessionStorage.removeItem(sessionKey);
                    performAutoSubmit(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, isTimeUp, hasAutoSubmitted, performAutoSubmit, sessionKey]);

    // Answer submission
    const submitCurrentAnswer = useCallback(async () => {
        const currentQuestion = questions?.[currentIndex];
        if (!currentQuestion || currentQuestion.selected_option_id !== null || !selected || !attempt?.attempt_id || isSubmitting || isTimeUp || hasAutoSubmitted) {
            return null;
        }

        setIsSubmitting(true);
        try {
            const result = await dispatch(submitAnswer({
                attemptId: attempt.attempt_id,
                questionId: currentQuestion.id,
                optionId: selected,
            })).unwrap();
            setAnswers((prev) => ({ ...prev, [currentQuestion.id]: selected }));
            return result;
        } catch (err) {
            console.error("Failed to submit answer:", err);
            return null;
        } finally {
            setIsSubmitting(false);
        }
    }, [questions, currentIndex, selected, attempt, isSubmitting, isTimeUp, hasAutoSubmitted, dispatch]);

    // Skip question
    const skipCurrentQuestion = useCallback(async () => {
        const currentQuestion = questions?.[currentIndex];
        if (!currentQuestion || currentQuestion.selected_option_id !== null || !attempt?.attempt_id || isSubmitting || isTimeUp || hasAutoSubmitted) {
            return null;
        }

        setIsSubmitting(true);
        try {
            const result = await dispatch(skipQuestion({
                attemptId: attempt.attempt_id,
                questionId: currentQuestion.id,
            })).unwrap();
            setSelected("");
            setAnswers((prev) => ({ ...prev, [currentQuestion.id]: null }));
            return result;
        } catch (err) {
            console.error("Failed to skip question:", err);
            return null;
        } finally {
            setIsSubmitting(false);
        }
    }, [questions, currentIndex, attempt, isSubmitting, isTimeUp, hasAutoSubmitted, dispatch]);

    // Navigation handlers
    const handleAnswerSelect = useCallback((optionId) => {
        if (isTimeUp || hasAutoSubmitted) return;
        setSelected((prev) => (prev === optionId ? "" : optionId));
    }, [isTimeUp, hasAutoSubmitted]);

    const handlePrevious = useCallback(async () => {
        if (currentIndex > 0 && !isTimeUp && !hasAutoSubmitted) {
            await submitCurrentAnswer();
            setCurrentIndex((prev) => prev - 1);
            setSelected("");
        }
    }, [currentIndex, isTimeUp, hasAutoSubmitted, submitCurrentAnswer]);

    const handleNext = useCallback(async () => {
        if (questions && currentIndex < questions.length - 1 && !isTimeUp && !hasAutoSubmitted) {
            await submitCurrentAnswer();
            setCurrentIndex((prev) => prev + 1);
            setSelected("");
        }
    }, [questions, currentIndex, isTimeUp, hasAutoSubmitted, submitCurrentAnswer]);

    const handleSkip = useCallback(async () => {
        if (questions && currentIndex < questions.length - 1 && !isTimeUp && !hasAutoSubmitted) {
            await skipCurrentQuestion();
            setCurrentIndex((prev) => prev + 1);
            setSelected("");
        }
    }, [questions, currentIndex, isTimeUp, hasAutoSubmitted, skipCurrentQuestion]);

    const handleFinalSubmit = useCallback(async () => {
        if (isTimeUp || hasAutoSubmitted || isSubmitting) return;
        if (!attempt?.attempt_id || !topicId) return;

        const currentQuestion = questions?.[currentIndex];
        if (selected && currentQuestion && currentQuestion.selected_option_id === null) {
            await submitCurrentAnswer();
        }

        setIsSubmitting(true);
        setHasAutoSubmitted(true);
        try {
            const result = await dispatch(submitQuiz({ attemptId: attempt.attempt_id, topicId })).unwrap();
            sessionStorage.removeItem(sessionKey);
            navigate(`/${storagePrefix}/result/${topicId}/${attempt.attempt_id}`, {
                state: { results: result },
            });
        } catch (err) {
            console.error(`Failed to submit ${storagePrefix}:`, err);
        } finally {
            setIsSubmitting(false);
        }
    }, [isTimeUp, hasAutoSubmitted, isSubmitting, attempt, topicId, selected, questions, currentIndex, submitCurrentAnswer, dispatch, navigate, sessionKey, storagePrefix]);

    // Restore answer when changing questions
    useEffect(() => {
        const currentQuestion = questions?.[currentIndex];
        if (!currentQuestion) return;

        if (currentQuestion.selected_option_id !== null) {
            setSelected(currentQuestion.selected_option_id);
        } else {
            setSelected(answers[currentQuestion.id] || "");
        }
    }, [currentIndex, questions, answers]);

    const handleConfirmLeave = useCallback(async () => {
        setShowLeaveModal(false);
        sessionStorage.removeItem(sessionKey);
        await performAutoSubmit(false);
        if (blocker.state === "blocked") {
            blocker.proceed();
        } else {
            navigate(-1);
        }
    }, [performAutoSubmit, blocker, navigate, sessionKey]);

    const handleCancelLeave = useCallback(() => {
        setShowLeaveModal(false);
        if (blocker.state === "blocked") {
            blocker.reset();
        }
    }, [blocker]);

    const currentQuestion = questions && questions.length > 0 ? questions[currentIndex] : null;

    return {
        selected,
        currentIndex,
        answers,
        isSubmitting,
        hasAutoSubmitted,
        showLeaveModal,
        timeLeft,
        isTimeUp,
        currentQuestion,
        setShowLeaveModal,
        handleAnswerSelect,
        handlePrevious,
        handleNext,
        handleSkip,
        handleFinalSubmit,
        handleConfirmLeave,
        handleCancelLeave,
        submitCurrentAnswer,
        skipCurrentQuestion,
        performAutoSubmit,
        attemptRef,
        questionsRef,
    };
};
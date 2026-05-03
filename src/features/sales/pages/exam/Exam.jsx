import React, { useState, useEffect, useCallback, useRef, memo } from "react";
import {
  PageBody,
  PageHeader,
  PageHeaderLeft,
  PageLayout,
  PageSubtitle,
  PageTitle,
} from "../../common/layout";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  startAttempt,
  fetchQuestions,
  submitAnswer,
  skipQuestion,
  submitQuiz,
} from "../../../../redux/slice/quizSlice";
import {
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,
  FiAlertCircle,
  FiHelpCircle,
  FiSkipForward,
  FiClock,
  FiInfo,
  FiBookOpen,
  FiLogOut,
  FiX,
  FiAlertTriangle,
} from "react-icons/fi";
import Loader from "../../common/Loader";

/* =============================================================================
   CONFIRMATION MODAL
   - Defined OUTSIDE Quiz component so it is never re-created on timer ticks.
   - React.memo means it only re-renders when its own props actually change.
   - No animation classes that replay every second.
============================================================================= */
const ConfirmationModal = memo(
  ({ show, timeLeft, isTimeUp, onConfirm, onCancel }) => {
    if (!show) return null;

    const formatTime = (seconds) => {
      if (!seconds && seconds !== 0) return "00:00";
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={onCancel}
        />
        {/* Modal — no animation class so it never replays */}
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <FiX className="w-5 h-5" />
          </button>

          <div className="p-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <FiAlertTriangle className="w-8 h-8 text-orange-600" />
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
              Exit Exam?
            </h3>

            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to exit the exam?
              <span className="block mt-2 text-sm text-orange-600 font-medium">
                Your progress will be saved.
              </span>
            </p>

            {timeLeft > 0 && !isTimeUp && (
              <div className="mb-6 p-3 bg-gray-50 rounded-lg text-center">
                <span className="text-sm text-gray-600">Time remaining: </span>
                <span className="font-mono font-bold text-blue-600">
                  {formatTime(timeLeft)}
                </span>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 px-4 py-2.5 border-2 border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 px-4 py-2.5 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition-all shadow-md hover:shadow-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

ConfirmationModal.displayName = "ConfirmationModal";

/* =============================================================================
   QUIZ
============================================================================= */
const Exam = () => {
  const navigate = useNavigate();
  const { topicId } = useParams();
  const dispatch = useDispatch();

  const { attempt, questions, isLoading } = useSelector((state) => state.quiz);

  const [selected, setSelected] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAutoSubmitted, setHasAutoSubmitted] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isTimeUp, setIsTimeUp] = useState(false);

  /* ── Refs (avoid stale closures in callbacks / effects) ───────────────────── */
  const attemptRef = useRef(attempt);
  const topicIdRef = useRef(topicId);
  const selectedRef = useRef(selected);
  const currentIndexRef = useRef(currentIndex);
  const questionsRef = useRef(questions);
  const hasAutoSubmittedRef = useRef(hasAutoSubmitted);
  const navigateRef = useRef(navigate);
  const dispatchRef = useRef(dispatch);
  const timeLeftRef = useRef(timeLeft);
  const isTimeUpRef = useRef(isTimeUp);
  const showLeaveModalRef = useRef(showLeaveModal);

  /* ── Sync refs ────────────────────────────────────────────────────────────── */
  useEffect(() => {
    attemptRef.current = attempt;
  }, [attempt]);
  useEffect(() => {
    topicIdRef.current = topicId;
  }, [topicId]);
  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);
  useEffect(() => {
    questionsRef.current = questions;
  }, [questions]);
  useEffect(() => {
    hasAutoSubmittedRef.current = hasAutoSubmitted;
  }, [hasAutoSubmitted]);
  useEffect(() => {
    navigateRef.current = navigate;
  }, [navigate]);
  useEffect(() => {
    dispatchRef.current = dispatch;
  }, [dispatch]);
  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);
  useEffect(() => {
    isTimeUpRef.current = isTimeUp;
  }, [isTimeUp]);
  useEffect(() => {
    showLeaveModalRef.current = showLeaveModal;
  }, [showLeaveModal]);

  /* ── Derived ──────────────────────────────────────────────────────────────── */
  const currentQuestion =
    questions && questions.length > 0 ? questions[currentIndex] : null;

  /* ── Guard: no attempts left ──────────────────────────────────────────────── */
  useEffect(() => {
    if (attempt && attempt.attempts_remaining === 0) {
      alert("You have no attempts remaining for this exam.");
      navigate(-1);
    }
  }, [attempt, navigate]);

  /* ── Bootstrap ────────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (topicId) dispatch(startAttempt(topicId));
  }, [dispatch, topicId]);

  useEffect(() => {
    if (attempt?.attempt_id && topicId && attempt?.attempts_remaining > 0) {
      dispatch(fetchQuestions({ topicId, attemptId: attempt.attempt_id }));
    }
  }, [attempt, topicId, dispatch]);

  useEffect(() => {
    if (attempt?.duration && attempt?.attempts_remaining > 0) {
      setTimeLeft(attempt.duration * 60);
    }
  }, [attempt?.duration, attempt?.attempts_remaining]);

  /* ── Auto-submit ──────────────────────────────────────────────────────────── */
  const performAutoSubmit = useCallback(
    async (shouldNavigate = true, targetPath = null) => {
      if (hasAutoSubmittedRef.current) return;
      setHasAutoSubmitted(true);

      try {
        const currentAttempt = attemptRef.current;
        const currentTopicId = topicIdRef.current;
        const currentSelected = selectedRef.current;
        const currentQues = questionsRef.current?.[currentIndexRef.current];
        const currentDispatch = dispatchRef.current;

        if (
          currentSelected &&
          currentQues &&
          currentQues.selected_option_id === null &&
          currentAttempt?.attempt_id
        ) {
          await currentDispatch(
            submitAnswer({
              attemptId: currentAttempt.attempt_id,
              questionId: currentQues.id,
              optionId: currentSelected,
            }),
          ).unwrap();
        }

        if (currentAttempt?.attempt_id && currentTopicId) {
          await currentDispatch(
            submitQuiz({
              attemptId: currentAttempt.attempt_id,
              topicId: currentTopicId,
            }),
          ).unwrap();
        }
      } catch (error) {
        console.error("Failed to auto-submit exam:", error);
      } finally {
        if (shouldNavigate) {
          const nav = navigateRef.current;
          if (targetPath) {
            nav(targetPath);
          } else if (attemptRef.current?.attempt_id) {
            nav(`/level/results/${attemptRef.current.attempt_id}`);
          } else {
            nav(-1);
          }
        }
      }
    },
    [],
  );

  /* ── Navigation blocker — mounted ONCE, reads only refs ──────────────────────
     Empty dep array = never tears down/re-attaches on timer ticks.
     shouldBlock() reads refs so it always sees fresh values.
  ─────────────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const originalPushState = window.history.pushState.bind(window.history);
    const originalReplaceState = window.history.replaceState.bind(
      window.history,
    );

    const shouldBlock = () =>
      !hasAutoSubmittedRef.current &&
      !!attemptRef.current?.attempt_id &&
      timeLeftRef.current > 0 &&
      !isTimeUpRef.current &&
      !showLeaveModalRef.current;

    // Sentinel so first back-press always fires popstate
    originalPushState(null, "", window.location.href);

    const handlePopState = () => {
      if (shouldBlock()) {
        originalPushState(null, "", window.location.href); // re-push to keep blocking
        setShowLeaveModal(true);
      }
    };

    const handleLinkClick = (e) => {
      const anchor = e.target.closest("a");
      if (anchor?.href && anchor.href !== window.location.href) {
        if (anchor.href.startsWith(window.location.origin) && shouldBlock()) {
          e.preventDefault();
          e.stopPropagation();
          setShowLeaveModal(true);
          window.__pendingNavigation = () => {
            window.location.href = anchor.href;
          };
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    document.addEventListener("click", handleLinkClick, true);

    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleLinkClick, true);
      delete window.__pendingNavigation;
    };
  }, []); // ← intentionally empty

  /* ── Modal callbacks (stable refs via useCallback) ────────────────────────── */
  const handleConfirmLeave = useCallback(async () => {
    setShowLeaveModal(false);
    await performAutoSubmit(true);
    if (window.__pendingNavigation) {
      window.__pendingNavigation();
      delete window.__pendingNavigation;
    }
  }, [performAutoSubmit]);

  const handleCancelLeave = useCallback(() => {
    setShowLeaveModal(false);
    delete window.__pendingNavigation;
  }, []);

  /* ── Countdown ────────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || isTimeUp || hasAutoSubmitted)
      return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimeUp(true);
          performAutoSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isTimeUp, hasAutoSubmitted, performAutoSubmit]);

  /* ── Before-unload ────────────────────────────────────────────────────────── */
  useEffect(() => {
    const handler = (e) => {
      if (
        !hasAutoSubmittedRef.current &&
        attemptRef.current?.attempt_id &&
        timeLeftRef.current > 0 &&
        !isTimeUpRef.current
      ) {
        e.preventDefault();
        e.returnValue =
          "You have unsaved progress. Are you sure you want to leave?";
        performAutoSubmit(false);
        return e.returnValue;
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [performAutoSubmit]);

  /* ── Helpers ──────────────────────────────────────────────────────────────── */
  const formatTime = (seconds) => {
    if (!seconds && seconds !== 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getTimerColor = () => {
    if (!timeLeft) return "text-gray-600";
    if (timeLeft <= 60) return "text-red-600";
    if (timeLeft <= 300) return "text-orange-600";
    return "text-blue-600";
  };

  /* ── Answer / nav actions ─────────────────────────────────────────────────── */
  const submitCurrentAnswer = async () => {
    if (
      !currentQuestion ||
      currentQuestion.selected_option_id !== null ||
      !selected ||
      !attempt?.attempt_id ||
      isSubmitting ||
      isTimeUp ||
      hasAutoSubmitted
    )
      return null;

    setIsSubmitting(true);
    try {
      const result = await dispatch(
        submitAnswer({
          attemptId: attempt.attempt_id,
          questionId: currentQuestion.id,
          optionId: selected,
        }),
      ).unwrap();
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: selected }));
      return result;
    } catch (err) {
      console.error("Failed to submit answer:", err);
    } finally {
      setIsSubmitting(false);
    }
    return null;
  };

  const skipCurrentQuestion = async () => {
    if (
      !currentQuestion ||
      currentQuestion.selected_option_id !== null ||
      !attempt?.attempt_id ||
      isSubmitting ||
      isTimeUp ||
      hasAutoSubmitted
    )
      return null;

    setIsSubmitting(true);
    try {
      const result = await dispatch(
        skipQuestion({
          attemptId: attempt.attempt_id,
          questionId: currentQuestion.id,
        }),
      ).unwrap();
      setSelected("");
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: null }));
      return result;
    } catch (err) {
      console.error("Failed to skip question:", err);
    } finally {
      setIsSubmitting(false);
    }
    return null;
  };

  const handleAnswerSelect = (optionId) => {
    if (isTimeUp || hasAutoSubmitted) return;
    setSelected((prev) => (prev === optionId ? "" : optionId));
  };

  const handlePrevious = async () => {
    if (currentIndex > 0 && !isTimeUp && !hasAutoSubmitted) {
      await submitCurrentAnswer();
      setCurrentIndex((prev) => prev - 1);
      setSelected("");
    }
  };

  const handleNext = async () => {
    if (currentIndex < questions.length - 1 && !isTimeUp && !hasAutoSubmitted) {
      await submitCurrentAnswer();
      setCurrentIndex((prev) => prev + 1);
      setSelected("");
    }
  };

  const handleSkip = async () => {
    if (currentIndex < questions.length - 1 && !isTimeUp && !hasAutoSubmitted) {
      await skipCurrentQuestion();
      setCurrentIndex((prev) => prev + 1);
      setSelected("");
    }
  };

  const handleFinalSubmit = async () => {
    if (isTimeUp || hasAutoSubmitted || isSubmitting) return;
    if (!attempt?.attempt_id || !topicId) return;

    if (
      selected &&
      currentQuestion &&
      currentQuestion.selected_option_id === null
    ) {
      await submitCurrentAnswer();
    }

    setIsSubmitting(true);
    try {
      const result = await dispatch(
        submitQuiz({ attemptId: attempt.attempt_id, topicId }),
      ).unwrap();
      setHasAutoSubmitted(true);
      navigate(`/exam/result/${topicId}/${attempt.attempt_id}`, {
        state: { results: result },
      });
    } catch (err) {
      console.error("Failed to submit exam:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Restore answer when jumping between questions ────────────────────────── */
  useEffect(() => {
    if (!currentQuestion) return;
    if (currentQuestion.selected_option_id !== null) {
      setSelected(currentQuestion.selected_option_id);
    } else {
      setSelected(answers[currentQuestion.id] || "");
    }
  }, [currentIndex, currentQuestion, answers]);

  /* ── Guards ───────────────────────────────────────────────────────────────── */
  if (isLoading || !attempt) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader />
        </div>
      </PageLayout>
    );
  }

  if (attempt.attempts_remaining === 0) {
    return (
      <PageLayout>
        <PageHeader>
          <PageHeaderLeft>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 rounded-lg">
                <FiAlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <PageTitle>No Attempts Remaining</PageTitle>
                <PageSubtitle>You have exhausted all attempts.</PageSubtitle>
              </div>
            </div>
          </PageHeaderLeft>
        </PageHeader>
        <PageBody>
          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <FiAlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No attempts available
              </h3>
              <p className="text-gray-600 mb-6">
                You have used {attempt.total_attempts_allowed} out of{" "}
                {attempt.total_attempts_allowed} attempts.
              </p>
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </PageBody>
      </PageLayout>
    );
  }

  /* ── Main render ──────────────────────────────────────────────────────────── */
  return (
    <>
      <PageLayout>
        <PageHeader>
          <PageHeaderLeft>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FiHelpCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <PageTitle className="text-gray-800">
                  Final Examination
                </PageTitle>
                <PageSubtitle>Certification Level Assessment</PageSubtitle>
              </div>
            </div>
          </PageHeaderLeft>

          <div className="flex items-center gap-3">
            {/* Timer display */}
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <FiClock className={`w-5 h-5 ${getTimerColor()}`} />
              <div className="text-center">
                <div
                  className={`text-sm font-mono font-bold ${getTimerColor()}`}
                >
                  {formatTime(timeLeft)}
                </div>
                <div className="text-xs text-gray-500">Time Left</div>
              </div>
            </div>

            {/* Exit button */}
            <button
              onClick={() => setShowLeaveModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
            >
              <FiLogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Exit Exam</span>
            </button>
          </div>
        </PageHeader>

        <PageBody>
          <div className="max-w-3xl mx-auto px-4">
            {/* Topic info */}
            <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <FiBookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                    <h3 className="font-semibold text-gray-800">
                      Level Details
                    </h3>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-gray-600">
                        Attempts:{" "}
                        <span className="font-semibold">
                          {attempt.attempts_used}
                        </span>{" "}
                        / {attempt.total_attempts_allowed}
                      </span>
                      <span className="text-gray-600">
                        Remaining:{" "}
                        <span className="font-semibold text-green-600">
                          {attempt.attempts_remaining}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <FiInfo className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium text-gray-800">
                        {attempt.duration} Minutes
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiClock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Started At:</span>
                      <span className="font-medium text-gray-800">
                        {new Date(attempt.started_at).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiAlertCircle className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Expires At:</span>
                      <span className="font-medium text-gray-800">
                        {new Date(attempt.expires_at).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiHelpCircle className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Attempt ID:</span>
                      <span className="font-medium text-gray-800">
                        #{attempt.attempt_id}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Time-up banner */}
            {isTimeUp && (
              <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <FiAlertCircle className="w-5 h-5 text-red-600" />
                  <span className="text-red-700 font-medium">
                    Time is up! The quiz will be submitted automatically.
                  </span>
                </div>
              </div>
            )}

            {/* Question card */}
            {currentQuestion ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {/* Card header */}
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Question {currentIndex + 1} of {questions.length}
                    </span>
                    <div className="flex gap-2">
                      {selected && !isTimeUp && !hasAutoSubmitted && (
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          ✓ Answer Selected
                        </span>
                      )}
                      {answers[currentQuestion.id] === null && (
                        <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                          ⏭ Skipped
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Time progress bar */}
                  {timeLeft !== null && attempt?.duration && (
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            timeLeft <= 60
                              ? "bg-red-500"
                              : timeLeft <= 300
                                ? "bg-orange-500"
                                : "bg-blue-500"
                          }`}
                          style={{
                            width: `${(timeLeft / (attempt.duration * 60)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Card body */}
                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {currentQuestion.question_text}
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {currentQuestion.options?.map((opt, idx) => {
                      const isSelected = selected === opt.id;
                      const isSkipped = answers[currentQuestion.id] === null;
                      const isLocked =
                        isSkipped || isTimeUp || hasAutoSubmitted;

                      return (
                        <div
                          key={opt.id}
                          onClick={() =>
                            !isLocked && handleAnswerSelect(opt.id)
                          }
                          className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                            isLocked
                              ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
                              : isSelected
                                ? "border-blue-500 bg-blue-50 shadow-md cursor-pointer"
                                : "border-gray-200 hover:border-blue-300 hover:bg-gray-50 hover:shadow-sm cursor-pointer"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                                isSelected
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {isSelected ? (
                                <FiCheckCircle className="w-4 h-4" />
                              ) : (
                                <span className="text-sm font-medium">
                                  {String.fromCharCode(65 + idx)}
                                </span>
                              )}
                            </div>
                            <span className="text-gray-700 flex-1">
                              {opt.text}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200">
                    <button
                      disabled={
                        currentIndex === 0 ||
                        isSubmitting ||
                        isTimeUp ||
                        hasAutoSubmitted
                      }
                      onClick={handlePrevious}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        currentIndex === 0 ||
                        isSubmitting ||
                        isTimeUp ||
                        hasAutoSubmitted
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <FiChevronLeft className="w-4 h-4" />
                      Previous
                    </button>

                    <div className="flex gap-3">
                      <button
                        onClick={handleSkip}
                        disabled={
                          currentIndex === questions.length - 1 ||
                          isSubmitting ||
                          isTimeUp ||
                          hasAutoSubmitted
                        }
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          currentIndex === questions.length - 1 ||
                          isSubmitting ||
                          isTimeUp ||
                          hasAutoSubmitted
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <FiSkipForward className="w-4 h-4" />
                        Skip
                      </button>

                      {currentIndex === questions.length - 1 ? (
                        <button
                          onClick={handleFinalSubmit}
                          disabled={
                            isSubmitting || isTimeUp || hasAutoSubmitted
                          }
                          className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FiCheckCircle className="w-4 h-4" />
                          {isSubmitting ? "Submitting..." : "Submit Quiz"}
                        </button>
                      ) : (
                        <button
                          onClick={handleNext}
                          disabled={
                            isSubmitting || isTimeUp || hasAutoSubmitted
                          }
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next
                          <FiChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <FiAlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-base font-medium text-gray-700 mb-1">
                  No questions available
                </h3>
                <p className="text-sm text-gray-500">
                  There are no questions for this quiz.
                </p>
              </div>
            )}
          </div>
        </PageBody>
      </PageLayout>

      {/*
        ConfirmationModal is defined outside Quiz.
        React.memo + stable useCallback handlers = zero re-renders from timer.
        Only re-renders when show/timeLeft/isTimeUp/onConfirm/onCancel change.
      */}
      <ConfirmationModal
        show={showLeaveModal}
        timeLeft={timeLeft}
        isTimeUp={isTimeUp}
        onConfirm={handleConfirmLeave}
        onCancel={handleCancelLeave}
      />
    </>
  );
};

export default Exam;

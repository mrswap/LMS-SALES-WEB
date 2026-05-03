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
import { useTranslation } from "react-i18next";

const ConfirmationModal = memo(
  ({ show, timeLeft, isTimeUp, onConfirm, onCancel }) => {
    const { t } = useTranslation();

    if (!show) return null;

    const formatTime = (seconds) => {
      if (!seconds && seconds !== 0) return "00:00";
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={onCancel}
        />
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
              {t("quiz.confirmationModal.title")}
            </h3>
            <p className="text-gray-600 text-center mb-6">
              {t("quiz.confirmationModal.description")}
              <span className="block mt-2 text-sm text-orange-600 font-medium">
                {t("quiz.confirmationModal.progressSaved")}
              </span>
            </p>
            {timeLeft > 0 && !isTimeUp && (
              <div className="mb-6 p-3 bg-gray-50 rounded-lg text-center">
                <span className="text-sm text-gray-600">
                  {t("quiz.confirmationModal.timeRemaining")}{" "}
                </span>
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
                {t("quiz.confirmationModal.cancel")}
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 px-4 py-2.5 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition-all shadow-md hover:shadow-lg"
              >
                {t("quiz.confirmationModal.confirm")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

ConfirmationModal.displayName = "ConfirmationModal";

// ─── sessionStorage key ────────────────────────────────────────────────────────
// Jab quiz start ho, yeh flag set karo. Jab submit ho, clear karo.
// Refresh ke baad bhi yeh flag rehta hai, toh pata chalega ki quiz active thi.
const QUIZ_ACTIVE_KEY = "quiz_active_attempt";

const Quiz = () => {
  const navigate = useNavigate();
  const { topicId } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { attempt, questions, isLoading } = useSelector((state) => state.quiz);

  const [selected, setSelected] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAutoSubmitted, setHasAutoSubmitted] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // ── Refs ───────────────────────────────────────────────────────────────────
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

  // ── Sync refs ──────────────────────────────────────────────────────────────
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

  const currentQuestion =
    questions && questions.length > 0 ? questions[currentIndex] : null;

  // ── sessionStorage flag: quiz active hote hi set karo ─────────────────────
  // Yeh flag refresh ke baad bhi rehta hai.
  // Jab attempt milta hai toh set karo, jab submit ho toh clear karo.
  useEffect(() => {
    if (attempt?.attempt_id && attempt?.attempts_remaining > 0) {
      sessionStorage.setItem(QUIZ_ACTIVE_KEY, attempt.attempt_id);
    }
  }, [attempt?.attempt_id, attempt?.attempts_remaining]);

  // ── Guard: no attempts left ────────────────────────────────────────────────
  useEffect(() => {
    if (attempt && attempt.attempts_remaining === 0) {
      alert(t("quiz.noAttemptsLeft"));
      navigate(-1);
    }
  }, [attempt, navigate, t]);

  // ── Bootstrap ──────────────────────────────────────────────────────────────
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

  // ── Auto-submit ────────────────────────────────────────────────────────────
  const performAutoSubmit = useCallback(
    async (shouldNavigate = true, targetPath = null) => {
      if (hasAutoSubmittedRef.current) return;
      setHasAutoSubmitted(true);
      // Quiz khatam — flag clear karo
      sessionStorage.removeItem(QUIZ_ACTIVE_KEY);

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
        console.error("Failed to auto-submit quiz:", error);
      } finally {
        if (shouldNavigate) {
          const nav = navigateRef.current;
          if (targetPath) {
            nav(targetPath);
          } else if (attemptRef.current?.attempt_id) {
            nav(`/quiz/results/${attemptRef.current.attempt_id}`);
          } else {
            nav(-1);
          }
        }
      }
    },
    [],
  );

  // ── Navigation blocker ─────────────────────────────────────────────────────
  // KEY FIX:
  // Refresh ke baad page naya mount hota hai — React state sab reset.
  // Isliye hum shouldBlock mein sirf sessionStorage flag check karte hain,
  // jo refresh ke baad bhi rehta hai. Attempt load hone ka wait nahi karna.
  useEffect(() => {
    const originalPushState = window.history.pushState.bind(window.history);

    const shouldBlock = () => {
      // hasAutoSubmitted state se — submit ke baad block nahi karna
      if (hasAutoSubmittedRef.current) return false;
      // isTimeUp state se — time khatam ho gaya toh block nahi
      if (isTimeUpRef.current) return false;
      // Modal already open hai toh dobara mat kholo
      if (showLeaveModalRef.current) return false;
      // sessionStorage flag — refresh ke baad bhi kaam karta hai
      const activeAttempt = sessionStorage.getItem(QUIZ_ACTIVE_KEY);
      if (!activeAttempt) return false;
      return true;
    };

    const pushSentinel = () => {
      originalPushState(null, "", window.location.href);
    };

    // Mount hote hi sentinel push karo — chahe attempt load hua ho ya nahi.
    // sessionStorage flag se pata chalega ki block karna hai ya nahi.
    pushSentinel();

    const handlePopState = () => {
      if (shouldBlock()) {
        pushSentinel();
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
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleLinkClick, true);
      delete window.__pendingNavigation;
    };
  }, []); // intentionally empty

  // ── Modal callbacks ────────────────────────────────────────────────────────
  const handleConfirmLeave = useCallback(async () => {
    setShowLeaveModal(false);
    sessionStorage.removeItem(QUIZ_ACTIVE_KEY);
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

  // ── Countdown ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || isTimeUp || hasAutoSubmitted)
      return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimeUp(true);
          sessionStorage.removeItem(QUIZ_ACTIVE_KEY);
          performAutoSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isTimeUp, hasAutoSubmitted, performAutoSubmit]);

  // ── Before-unload ──────────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      const activeAttempt = sessionStorage.getItem(QUIZ_ACTIVE_KEY);
      if (
        !hasAutoSubmittedRef.current &&
        activeAttempt &&
        !isTimeUpRef.current
      ) {
        e.preventDefault();
        e.returnValue = t("quiz.leaveWarning");
        return e.returnValue;
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [t]);

  // ── Helpers ────────────────────────────────────────────────────────────────
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

  // ── Answer / nav actions ───────────────────────────────────────────────────
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
      sessionStorage.removeItem(QUIZ_ACTIVE_KEY);
      navigate(`/quiz/result/${topicId}/${attempt.attempt_id}`, {
        state: { results: result },
      });
    } catch (err) {
      console.error("Failed to submit quiz:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Restore answer when jumping between questions ──────────────────────────
  useEffect(() => {
    if (!currentQuestion) return;
    if (currentQuestion.selected_option_id !== null) {
      setSelected(currentQuestion.selected_option_id);
    } else {
      setSelected(answers[currentQuestion.id] || "");
    }
  }, [currentIndex, currentQuestion, answers]);

  // ── Guards ─────────────────────────────────────────────────────────────────
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
                <PageTitle>{t("quiz.noAttemptsTitle")}</PageTitle>
                <PageSubtitle>{t("quiz.noAttemptsSubtitle")}</PageSubtitle>
              </div>
            </div>
          </PageHeaderLeft>
        </PageHeader>
        <PageBody>
          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <FiAlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {t("quiz.noAttemptsHeading")}
              </h3>
              <p className="text-gray-600 mb-6">
                {t("quiz.noAttemptsMessage", {
                  total: attempt.total_attempts_allowed,
                })}
              </p>
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {t("quiz.goBack")}
              </button>
            </div>
          </div>
        </PageBody>
      </PageLayout>
    );
  }

  // ── Main render ────────────────────────────────────────────────────────────
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
                <PageTitle>{t("quiz.pageTitle")}</PageTitle>
                <PageSubtitle>{t("quiz.pageSubtitle")}</PageSubtitle>
              </div>
            </div>
          </PageHeaderLeft>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <FiClock className={`w-5 h-5 ${getTimerColor()}`} />
              <div className="text-center">
                <div
                  className={`text-sm font-mono font-bold ${getTimerColor()}`}
                >
                  {formatTime(timeLeft)}
                </div>
                <div className="text-xs text-gray-500">
                  {t("quiz.timeLeft")}
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowLeaveModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
            >
              <FiLogOut className="w-4 h-4" />
              <span className="text-sm font-medium">{t("quiz.exitQuiz")}</span>
            </button>
          </div>
        </PageHeader>

        <PageBody>
          <div className="max-w-3xl mx-auto px-4">
            <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <FiBookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                    <h3 className="font-semibold text-gray-800">
                      {t("quiz.topicDetails")}
                    </h3>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-gray-600">
                        {t("quiz.attempts")}:{" "}
                        <span className="font-semibold">
                          {attempt.attempts_used}
                        </span>{" "}
                        / {attempt.total_attempts_allowed}
                      </span>
                      <span className="text-gray-600">
                        {t("quiz.remaining")}:{" "}
                        <span className="font-semibold text-green-600">
                          {attempt.attempts_remaining}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <FiInfo className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">
                        {t("quiz.duration")}:
                      </span>
                      <span className="font-medium text-gray-800">
                        {attempt.duration} {t("quiz.minutes")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiClock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">
                        {t("quiz.startedAt")}:
                      </span>
                      <span className="font-medium text-gray-800">
                        {new Date(attempt.started_at).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiAlertCircle className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">
                        {t("quiz.expiresAt")}:
                      </span>
                      <span className="font-medium text-gray-800">
                        {new Date(attempt.expires_at).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiHelpCircle className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">
                        {t("quiz.attemptId")}:
                      </span>
                      <span className="font-medium text-gray-800">
                        #{attempt.attempt_id}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {isTimeUp && (
              <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <FiAlertCircle className="w-5 h-5 text-red-600" />
                  <span className="text-red-700 font-medium">
                    {t("quiz.timeUpWarning")}
                  </span>
                </div>
              </div>
            )}

            {currentQuestion ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {t("quiz.questionOf", {
                        current: currentIndex + 1,
                        total: questions.length,
                      })}
                    </span>
                    <div className="flex gap-2">
                      {selected && !isTimeUp && !hasAutoSubmitted && (
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          ✓ {t("quiz.answerSelected")}
                        </span>
                      )}
                      {answers[currentQuestion.id] === null && (
                        <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                          ⏭ {t("quiz.skipped")}
                        </span>
                      )}
                    </div>
                  </div>

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
                      {t("quiz.previous")}
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
                        {t("quiz.skip")}
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
                          {isSubmitting
                            ? t("quiz.submitting")
                            : t("quiz.submitQuiz")}
                        </button>
                      ) : (
                        <button
                          onClick={handleNext}
                          disabled={
                            isSubmitting || isTimeUp || hasAutoSubmitted
                          }
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {t("quiz.next")}
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
                  {t("quiz.noQuestionsTitle")}
                </h3>
                <p className="text-sm text-gray-500">
                  {t("quiz.noQuestionsDescription")}
                </p>
              </div>
            )}
          </div>
        </PageBody>
      </PageLayout>

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

export default Quiz;

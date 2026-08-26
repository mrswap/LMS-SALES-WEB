import React, { useState, useEffect } from "react";
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
  resetFeedbackState,
  clearQuizData,
} from "../../../../redux/slice/quizSlice";
import { FiAlertCircle, FiHelpCircle, FiLogOut } from "react-icons/fi";
import Loader from "../../common/Loader";
import { useTranslation } from "react-i18next";
import Error from "../../common/Error";
import ConfirmationModal from "./common/ConfirmationModal";
import { useQuizSession } from "./common/useQuizSession";
import { useContentProtection } from "./common/useContentProtection";
import McqRenderer from "./common/McqRenderer";
import TimerDisplay from "./common/TimerDisplay";
import QuizInfoPanel from "./common/QuizInfoPanel";

const Quiz = () => {
  const navigate = useNavigate();
  const { topicId } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { attempt, questions, isLoading, isError, message } = useSelector(
    (state) => state.quiz,
  );

  const [isInitializing, setIsInitializing] = useState(true);

  // Content protection
  useContentProtection(true);

  // Quiz session hook
  const {
    selected,
    currentIndex,
    answers,
    isSubmitting,
    hasAutoSubmitted,
    showLeaveModal,
    timeLeft,
    isTimeUp,
    currentQuestion,
    handleAnswerSelect,
    handlePrevious,
    handleNext,
    handleSkip,
    handleFinalSubmit,
    handleConfirmLeave,
    handleCancelLeave,
    setShowLeaveModal,
  } = useQuizSession({
    sessionKey: "quiz_active_attempt",
    storagePrefix: "quiz",
    attempt,
    questions,
    topicId,
  });

  // Bootstrap
  useEffect(() => {
    const initQuiz = async () => {
      setIsInitializing(true);
      if (!topicId) return;
      dispatch(resetFeedbackState());
      try {
        dispatch(clearQuizData());
        const res = await dispatch(startAttempt(topicId)).unwrap();
        if (res.attempts_remaining === 0) {
          console.log("No attempts remaining");
          return;
        }
      } catch (err) {
        console.error("Failed to start attempt:", err);
        if (
          err?.message?.includes("rate limit") ||
          err?.response?.status === 429
        ) {
          alert("Please wait before starting a new attempt");
          navigate(-1);
        }
      } finally {
        setIsInitializing(false);
      }
    };
    initQuiz();
  }, [dispatch, topicId, navigate]);

  useEffect(() => {
    if (
      attempt?.attempt_id &&
      topicId &&
      attempt?.attempts_remaining > 0 &&
      !attempt?.is_submitted
    ) {
      dispatch(fetchQuestions({ topicId, attemptId: attempt.attempt_id }));
    }
  }, [attempt, topicId, dispatch]);

  useEffect(() => {
    if (attempt && attempt.attempts_remaining === 0) {
      alert(t("quiz.noAttemptsLeft"));
      navigate(-1);
    }
  }, [attempt, navigate, t]);

  useEffect(() => {
    dispatch(clearQuizData());
    sessionStorage.removeItem("quiz_active_attempt");
  }, [topicId, dispatch]);

  if (isError) {
    return <Error message={message} />;
  }

  if (isLoading || !attempt || isInitializing) {
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
            <TimerDisplay timeLeft={timeLeft} label={t("quiz.timeLeft")} />

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
            <QuizInfoPanel attempt={attempt} type="quiz" />

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

            <McqRenderer
              currentQuestion={currentQuestion}
              currentIndex={currentIndex}
              totalQuestions={
                attempt?.total_questions ?? questions?.length ?? 0
              }
              selected={selected}
              answers={answers}
              timeLeft={timeLeft}
              duration={attempt?.duration}
              isTimeUp={isTimeUp}
              hasAutoSubmitted={hasAutoSubmitted}
              isSubmitting={isSubmitting}
              attemptType="quiz"
              onAnswerSelect={handleAnswerSelect}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onSkip={handleSkip}
              onFinalSubmit={handleFinalSubmit}
            />
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

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  PageBody,
  PageHeader,
  PageHeaderLeft,
  PageLayout,
  PageSubtitle,
  PageTitle,
} from "../../common/layout";
import {
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiStar,
  FiSend,
  FiHome,
  FiRefreshCw,
  FiAlertCircle,
  FiMessageSquare,
  FiBarChart2,
  FiCheck,
  FiAward,
  FiTarget,
  FiTrendingUp,
  FiBookOpen,
} from "react-icons/fi";
import { useTranslation } from "react-i18next";
import {
  submitFeedback,
  clearQuizData,
} from "../../../../redux/slice/quizSlice";
import Loader from "../../common/Loader";

const QuizResult = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { topicId, attemptId } = useParams();
  console.log("topicId", topicId);

  const { quizResults, isLoading, feedbackSubmitted } = useSelector(
    (state) => state.quiz,
  );

  const [feedback, setFeedback] = useState({
    rating: 0,
    review: "",
  });

  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [showFeedbackForm, setShowFeedbackForm] = useState(true);
  const [feedbackError, setFeedbackError] = useState("");

  useEffect(() => {
    if (!quizResults) {
      navigate("/");
    }
  }, [quizResults, navigate]);

  useEffect(() => {
    if (feedbackSubmitted) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [feedbackSubmitted, navigate]);

  const getStatusColor = () => {
    return quizResults?.status === "passed"
      ? "text-emerald-700"
      : "text-rose-700";
  };

  const getStatusBgColor = () => {
    return quizResults?.status === "passed"
      ? "bg-emerald-50 border-emerald-200"
      : "bg-rose-50 border-rose-200";
  };

  const getStatusIcon = () => {
    return quizResults?.status === "passed" ? (
      <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
        <FiCheckCircle className="w-10 h-10 text-white" />
      </div>
    ) : (
      <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg">
        <FiXCircle className="w-10 h-10 text-white" />
      </div>
    );
  };

  const getPercentageColor = () => {
    const percentage = quizResults?.percentage || 0;
    if (percentage >= 70) return "text-emerald-700";
    if (percentage >= 40) return "text-amber-700";
    return "text-rose-700";
  };

  const getProgressBarColor = () => {
    const percentage = quizResults?.percentage || 0;
    if (percentage >= 70)
      return "bg-gradient-to-r from-emerald-500 to-emerald-600";
    if (percentage >= 40) return "bg-gradient-to-r from-amber-500 to-amber-600";
    return "bg-gradient-to-r from-rose-500 to-rose-600";
  };

  const getScoreMessage = () => {
    const percentage = quizResults?.percentage || 0;
    if (percentage >= 80) return "Outstanding Achievement!";
    if (percentage >= 70) return "Excellent Performance!";
    if (percentage >= 60) return "Good Job!";
    if (percentage >= 50) return "Satisfactory";
    if (percentage >= 40) return "Fair Effort";
    return "Keep Practicing";
  };

  const getScoreSubtext = () => {
    const percentage = quizResults?.percentage || 0;
    if (percentage >= 80)
      return "You've demonstrated exceptional understanding";
    if (percentage >= 70) return "You have a strong grasp of the material";
    if (percentage >= 60) return "Solid performance, keep up the good work";
    if (percentage >= 50) return "You're on the right track";
    if (percentage >= 40) return "Room for improvement, keep learning";
    return "Don't give up, review and try again";
  };

  const handleRatingClick = (rating) => {
    setFeedback({ ...feedback, rating });
    setFeedbackError("");
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    if (feedback.rating === 0) {
      setFeedbackError("Please select a rating");
      return;
    }

    setIsSubmittingFeedback(true);
    setFeedbackError("");

    try {
      await dispatch(
        submitFeedback({
          topicId: topicId,
          attemptId: attemptId,
          rating: feedback.rating,
          review: feedback.review,
        }),
      ).unwrap();

      setShowFeedbackForm(false);
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      setFeedbackError(
        error.response?.data?.message ||
          "Failed to submit feedback. Please try again.",
      );
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  const handleGoHome = () => {
    // dispatch(clearQuizData());
    navigate(`/topic/${topicId}`);
  };

  const handleRetry = () => {
    dispatch(clearQuizData());
    navigate(-2);
  };

  const getRatingLabel = (rating) => {
    const labels = {
      1: "Poor",
      2: "Fair",
      3: "Good",
      4: "Very Good",
      5: "Excellent",
    };
    return labels[rating] || "";
  };

  if (isLoading || !quizResults) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHeader className="border-b border-gray-100 bg-gradient-to-b from-white to-gray-50">
        <PageHeaderLeft>
          <div className="flex items-center gap-6">
            {getStatusIcon()}
            <div>
              <PageTitle className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {quizResults?.status === "passed"
                  ? "Assessment Complete"
                  : "Quiz Finished"}
              </PageTitle>
              <PageSubtitle className="text-gray-500 mt-1">
                {quizResults?.status === "passed"
                  ? "Congratulations on passing the assessment"
                  : "Review your performance summary below"}
              </PageSubtitle>
            </div>
          </div>
        </PageHeaderLeft>
      </PageHeader>

      <PageBody>
        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Main Score Card - Classic Design */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8 hover:shadow-md transition-shadow duration-300">
            {/* Score Header with Gradient */}
            <div className="relative bg-gradient-to-br from-gray-50 to-white p-8 text-center border-b border-gray-100">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gray-50 to-transparent rounded-full opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-gray-50 to-transparent rounded-full opacity-50"></div>

              {/* Percentage Circle - Enhanced */}
              <div className="relative inline-block mb-6">
                <svg className="w-40 h-40 transform -rotate-90">
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor={
                          quizResults?.percentage >= 70
                            ? "#10b981"
                            : quizResults?.percentage >= 40
                              ? "#f59e0b"
                              : "#f43f5e"
                        }
                      />
                      <stop
                        offset="100%"
                        stopColor={
                          quizResults?.percentage >= 70
                            ? "#059669"
                            : quizResults?.percentage >= 40
                              ? "#d97706"
                              : "#e11d48"
                        }
                      />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#f3f4f6"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 70}`}
                    strokeDashoffset={`${2 * Math.PI * 70 * (1 - (quizResults?.percentage || 0) / 100)}`}
                    style={{ transition: "stroke-dashoffset 1s ease-out" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    className={`text-4xl font-bold ${getPercentageColor()}`}
                  >
                    {Math.round(quizResults?.percentage || 0)}%
                  </span>
                  <span className="text-xs text-gray-400 mt-1 font-medium">
                    SCORE
                  </span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {getScoreMessage()}
              </h2>
              <p className="text-gray-500 text-sm max-w-md mx-auto">
                {getScoreSubtext()}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                <FiAward className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Score: {quizResults?.score} / {quizResults?.total}
                </span>
              </div>
            </div>

            {/* Statistics Grid - Professional Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              <div className="bg-white p-6 text-center hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-center mb-2">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <FiCheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-800">
                  {quizResults?.correct || 0}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">
                  Correct Answers
                </div>
              </div>

              <div className="bg-white p-6 text-center hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-center mb-2">
                  <div className="p-2 bg-rose-100 rounded-lg">
                    <FiXCircle className="w-5 h-5 text-rose-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-800">
                  {quizResults?.wrong || 0}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">
                  Incorrect Answers
                </div>
              </div>

              <div className="bg-white p-6 text-center hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-center mb-2">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <FiClock className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-800">
                  {quizResults?.skipped || 0}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">
                  Skipped Questions
                </div>
              </div>

              <div className="bg-white p-6 text-center hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-center mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FiTrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="text-xl font-bold text-gray-800">
                  {Math.floor(quizResults?.time_taken_minutes || 0)}m{" "}
                  {Math.floor((quizResults?.time_taken_seconds || 0) % 60)}s
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">
                  Time Spent
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Statistics Card - Classic Elegance */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8 hover:shadow-md transition-shadow duration-300">
            <div className="border-b border-gray-100 px-8 py-5 bg-gradient-to-r from-gray-50 to-white">
              <h3 className="font-semibold text-gray-800 flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <FiBarChart2 className="w-4 h-4 text-gray-700" />
                </div>
                <span className="text-lg">Detailed Performance Analysis</span>
              </h3>
            </div>
            <div className="p-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <FiBookOpen className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Total Questions</span>
                  </div>
                  <span className="font-semibold text-gray-800 text-lg">
                    {quizResults?.total || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <FiTarget className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Questions Attempted</span>
                  </div>
                  <span className="font-semibold text-gray-800">
                    {quizResults?.answered_questions || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <FiClock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Pending Questions</span>
                  </div>
                  <span className="font-semibold text-gray-800">
                    {quizResults?.remaining_questions || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <FiTrendingUp className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Completion Method</span>
                  </div>
                  <span className="font-semibold capitalize text-gray-800">
                    {quizResults?.submit_type === "auto"
                      ? "Auto-submitted"
                      : quizResults?.submit_type || "Manual"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <div className="flex items-center gap-3">
                    <FiClock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Total Duration</span>
                  </div>
                  <span className="font-semibold text-gray-800">
                    {quizResults?.time_taken_minutes?.toFixed(2) || 0} minutes
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Form - Classic Design */}
          {showFeedbackForm && !feedbackSubmitted && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8 hover:shadow-md transition-shadow duration-300">
              <div className="border-b border-gray-100 px-8 py-5 bg-gradient-to-r from-gray-50 to-white">
                <h3 className="font-semibold text-gray-800 flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <FiMessageSquare className="w-4 h-4 text-gray-700" />
                  </div>
                  <span className="text-lg">Share Your Experience</span>
                </h3>
              </div>
              <div className="p-8">
                <form onSubmit={handleFeedbackSubmit}>
                  {/* Rating Stars Section */}
                  <div className="mb-8">
                    <label className="block text-gray-700 font-medium mb-3">
                      How would you rate this quiz?{" "}
                      <span className="text-rose-500">*</span>
                    </label>

                    <div className="space-y-3">
                      <div className="flex gap-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleRatingClick(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="focus:outline-none transform transition-all hover:scale-110"
                          >
                            <FiStar
                              className={`w-8 h-8 transition-all ${
                                (hoveredRating || feedback.rating) >= star
                                  ? "text-amber-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>

                      {feedback.rating > 0 && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full">
                          <span className="text-sm font-medium text-amber-700">
                            {getRatingLabel(feedback.rating)}
                          </span>
                        </div>
                      )}

                      {feedbackError && (
                        <div className="text-rose-600 text-sm flex items-center gap-2 bg-rose-50 p-3 rounded-lg">
                          <FiAlertCircle className="w-4 h-4" />
                          {feedbackError}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Review Section */}
                  <div className="mb-8">
                    <label className="block text-gray-700 font-medium mb-3">
                      Additional Comments
                    </label>
                    <textarea
                      value={feedback.review}
                      onChange={(e) =>
                        setFeedback({ ...feedback, review: e.target.value })
                      }
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all resize-none text-gray-700 placeholder-gray-400"
                      placeholder="Share your thoughts, suggestions, or concerns..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmittingFeedback}
                    className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 rounded-xl font-medium hover:from-gray-900 hover:to-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    {isSubmittingFeedback ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Submitting Feedback...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <FiSend className="w-4 h-4" />
                        Submit Feedback
                      </div>
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Thank You Message - Elegant */}
          {feedbackSubmitted && (
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-8 text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FiCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-emerald-800 mb-2">
                Thank You for Your Feedback!
              </h3>
              <p className="text-emerald-700">
                Your input helps us improve and create better learning
                experiences.
              </p>
              <div className="mt-4 flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar
                    key={star}
                    className={`w-5 h-5 ${
                      star <= feedback.rating
                        ? "text-amber-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-emerald-600 text-sm mt-4">
                Redirecting to dashboard in a moment...
              </p>
            </div>
          )}

          {/* Action Buttons - Classic Style */}
          {!feedbackSubmitted && (
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleGoHome}
                className="group flex items-center gap-2 px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-400 transition-all text-sm"
              >
                <FiHome className="w-4 h-4 group-hover:transform group-hover:-translate-x-0.5 transition-transform" />
                Back to Home
              </button>
              <button
                onClick={handleRetry}
                className="group flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl font-medium hover:from-gray-900 hover:to-gray-800 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 text-sm"
              >
                <FiRefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                Try Again
              </button>
            </div>
          )}
        </div>
      </PageBody>
    </PageLayout>
  );
};

export default QuizResult;

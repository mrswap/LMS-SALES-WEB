import React, { useState, useEffect, useRef } from "react";
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

/* ── Only unavoidable animations (SVG ring, confetti, spinner) ── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  @keyframes qr-dash {
    to { stroke-dashoffset: var(--qr-offset); }
  }
  @keyframes qr-spin {
    to { transform: rotate(360deg); }
  }
  @keyframes qr-pulse-ring {
    0%   { transform: scale(1);    opacity: .4; }
    50%  { transform: scale(1.22); opacity: 0; }
    100% { opacity: 0; }
  }
  @keyframes qr-confetti {
    0%   { transform: translateY(-10px) rotate(0deg);   opacity: 1; }
    100% { transform: translateY(100px) rotate(720deg); opacity: 0; }
  }
  @keyframes qr-score-in {
    from { opacity: 0; transform: translateY(5px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes qr-shimmer-bar {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
  }

  .qr-font { font-family: 'DM Sans', system-ui, sans-serif; }
  .qr-serif { font-family: 'DM Serif Display', Georgia, serif; }

  .qr-spin-ring  { animation: qr-spin 12s linear infinite; }
  .qr-pulse-ring { animation: qr-pulse-ring 2.2s ease-out infinite; }
  .qr-spin-loader { animation: qr-spin .7s linear infinite; }
  .qr-score-num  { animation: qr-score-in .4s ease .85s both; }

  .qr-confetti-piece {
    position: absolute;
    width: 7px; height: 7px;
    border-radius: 2px;
    animation: qr-confetti linear infinite;
    pointer-events: none;
  }

  .qr-shimmer-bar {
    background: linear-gradient(90deg, #34d399, #059669, #34d399);
    background-size: 200% 100%;
    animation: qr-shimmer-bar 3s linear infinite;
  }
  .qr-shimmer-bar-fail {
    background: linear-gradient(90deg, #fb7185, #e11d48, #fb7185);
    background-size: 200% 100%;
    animation: qr-shimmer-bar 3s linear infinite;
  }

  .qr-textarea:focus {
    outline: none;
    border-color: #6366f1 !important;
    box-shadow: 0 0 0 3px rgba(99,102,241,.15);
  }
`;

/* ── Confetti ── */
const CONFETTI_COLORS = [
  "#10b981",
  "#f59e0b",
  "#6366f1",
  "#f43f5e",
  "#06b6d4",
  "#a855f7",
];
const Confetti = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit]">
    {Array.from({ length: 18 }).map((_, i) => (
      <span
        key={i}
        className="qr-confetti-piece"
        style={{
          left: `${5 + ((i * 5.5) % 90)}%`,
          top: `${-8 + ((i * 7) % 15)}%`,
          background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
          animationDuration: `${2.2 + (i % 5) * 0.4}s`,
          animationDelay: `${(i * 0.18) % 1.8}s`,
          transform: `rotate(${i * 23}deg)`,
          borderRadius: i % 3 === 0 ? "50%" : "2px",
        }}
      />
    ))}
  </div>
);

/* ── SVG Score Ring ── */
const ScoreRing = ({ percentage, isPassed }) => {
  const { t } = useTranslation();
  const circleRef = useRef(null);
  const r = 70;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - (percentage || 0) / 100);

  const trackColor = isPassed ? "#d1fae5" : "#ffe4e6";
  const gradStart = isPassed ? "#34d399" : "#fb7185";
  const gradEnd = isPassed ? "#059669" : "#e11d48";
  const textColor = isPassed ? "#065f46" : "#9f1239";

  useEffect(() => {
    const el = circleRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.style.transition =
        "stroke-dashoffset 1.2s cubic-bezier(.22,.68,0,1.2) .4s";
      el.style.strokeDashoffset = offset;
    });
  }, [offset]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width="168"
        height="168"
        viewBox="0 0 160 160"
        style={{ transform: "rotate(-90deg)" }}
      >
        <defs>
          <linearGradient id="qr-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradStart} />
            <stop offset="100%" stopColor={gradEnd} />
          </linearGradient>
          <filter id="qr-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          cx="80"
          cy="80"
          r={r}
          stroke={trackColor}
          strokeWidth="13"
          fill="none"
        />
        <circle
          ref={circleRef}
          cx="80"
          cy="80"
          r={r}
          stroke="url(#qr-grad)"
          strokeWidth="13"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ}
          filter="url(#qr-glow)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
        <span
          className="qr-score-num qr-serif"
          style={{
            fontSize: "2.4rem",
            fontWeight: 700,
            lineHeight: 1,
            color: textColor,
          }}
        >
          {Math.round(percentage || 0)}%
        </span>
        <span className="text-[0.6rem] tracking-widest text-gray-400 font-semibold uppercase">
          {t("quizResult.score")}
        </span>
      </div>
    </div>
  );
};

/* ══════════════════════════════
   MAIN COMPONENT
══════════════════════════════ */
const QuizResult = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { topicId, attemptId } = useParams();

  const { quizResults, isLoading, feedbackSubmitted } = useSelector(
    (state) => state.quiz,
  );

  const [feedback, setFeedback] = useState({ rating: 0, review: "" });
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [showFeedbackForm, setShowFeedbackForm] = useState(true);
  const [feedbackError, setFeedbackError] = useState("");

  /* inject styles */
  useEffect(() => {
    if (!document.getElementById("qr-styles")) {
      const el = document.createElement("style");
      el.id = "qr-styles";
      el.textContent = STYLES;
      document.head.appendChild(el);
    }
    return () => document.getElementById("qr-styles")?.remove();
  }, []);

  useEffect(() => {
    if (!quizResults) navigate("/");
  }, [quizResults, navigate]);

  useEffect(() => {
    if (feedbackSubmitted) {
      const t = setTimeout(() => navigate("/"), 3000);
      return () => clearTimeout(t);
    }
  }, [feedbackSubmitted, navigate]);

  /* helpers */
  const pct = quizResults?.percentage || 0;
  const isPassed = quizResults?.status === "passed";

  const getScoreMessage = () => {
    if (pct >= 80) return t("quizResult.messages.outstanding");
    if (pct >= 70) return t("quizResult.messages.excellent");
    if (pct >= 60) return t("quizResult.messages.good");
    if (pct >= 50) return t("quizResult.messages.satisfactory");
    if (pct >= 40) return t("quizResult.messages.fair");
    return t("quizResult.messages.keepPracticing");
  };

  const getScoreSubtext = () => {
    if (pct >= 80) return t("quizResult.messages.outstandingSub");
    if (pct >= 70) return t("quizResult.messages.excellentSub");
    if (pct >= 60) return t("quizResult.messages.goodSub");
    if (pct >= 50) return t("quizResult.messages.satisfactorySub");
    if (pct >= 40) return t("quizResult.messages.fairSub");
    return t("quizResult.messages.keepPracticingSub");
  };

  const getRatingLabel = (r) =>
    ({
      1: t("quizResult.feedback.ratingLabels.1"),
      2: t("quizResult.feedback.ratingLabels.2"),
      3: t("quizResult.feedback.ratingLabels.3"),
      4: t("quizResult.feedback.ratingLabels.4"),
      5: t("quizResult.feedback.ratingLabels.5"),
    })[r] || "";

  const handleRatingClick = (rating) => {
    setFeedback((f) => ({ ...f, rating }));
    setFeedbackError("");
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.rating) {
      setFeedbackError(t("quizResult.errors.ratingRequired"));
      return;
    }
    setIsSubmittingFeedback(true);
    setFeedbackError("");
    try {
      await dispatch(
        submitFeedback({
          topicId,
          attemptId,
          rating: feedback.rating,
          review: feedback.review,
        }),
      ).unwrap();
      setShowFeedbackForm(false);
    } catch (err) {
      setFeedbackError(
        err?.response?.data?.message || t("quizResult.errors.feedbackFailed"),
      );
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  const handleGoHome = () => navigate(`/topic/${topicId}`);
  const handleRetry = () => {
    dispatch(clearQuizData());
    navigate(-2);
  };

  /* loading */
  if (isLoading || !quizResults) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader />
        </div>
      </PageLayout>
    );
  }

  /* pass/fail colour tokens */
  const passGlow = isPassed ? "rgba(16,185,129,.18)" : "rgba(244,63,94,.14)";
  const heroBorder = isPassed ? "#a7f3d0" : "#fecdd3";
  const heroBg = isPassed
    ? "linear-gradient(160deg,#f0fdf4 0%,#fff 60%)"
    : "linear-gradient(160deg,#fff1f2 0%,#fff 60%)";
  const iconGrad = isPassed
    ? "linear-gradient(135deg,#34d399,#059669)"
    : "linear-gradient(135deg,#fb7185,#e11d48)";
  const ringColor = isPassed ? "#10b981" : "#f43f5e";
  const pulseBg = isPassed ? "rgba(16,185,129,.2)" : "rgba(244,63,94,.2)";
  const pillBg = isPassed ? "#d1fae5" : "#ffe4e6";
  const pillBorder = isPassed ? "#a7f3d0" : "#fecdd3";
  const pillText = isPassed ? "#065f46" : "#9f1239";
  const pillIcon = isPassed ? "#059669" : "#e11d48";
  const msgColor = isPassed ? "#065f46" : "#9f1239";
  const ghostNum = isPassed ? "rgba(16,185,129,.05)" : "rgba(244,63,94,.05)";

  /* stat cards */
  const stats = [
    {
      icon: FiCheckCircle,
      value: quizResults.correct || 0,
      label: t("quizResult.stats.correct"),
      bg: "#d1fae5",
      color: "#059669",
    },
    {
      icon: FiXCircle,
      value: quizResults.wrong || 0,
      label: t("quizResult.stats.incorrect"),
      bg: "#ffe4e6",
      color: "#e11d48",
    },
    {
      icon: FiClock,
      value: quizResults.skipped || 0,
      label: t("quizResult.stats.skipped"),
      bg: "#f3f4f6",
      color: "#6b7280",
    },
    {
      icon: FiTrendingUp,
      value: `${Math.floor(quizResults.time_taken_minutes || 0)}m ${Math.floor((quizResults.time_taken_seconds || 0) % 60)}s`,
      label: t("quizResult.stats.timeSpent"),
      bg: "#dbeafe",
      color: "#1d4ed8",
      small: true,
    },
  ];

  /* analysis rows */
  const analysisRows = [
    {
      icon: FiBookOpen,
      label: t("quizResult.analysis.totalQuestions"),
      value: quizResults.total || 0,
    },
    {
      icon: FiTarget,
      label: t("quizResult.analysis.questionsAttempted"),
      value: quizResults.answered_questions || 0,
    },
    {
      icon: FiClock,
      label: t("quizResult.analysis.pendingQuestions"),
      value: quizResults.remaining_questions || 0,
    },
    {
      icon: FiClock,
      label: t("quizResult.analysis.totalDuration"),
      value: `${(quizResults.time_taken_minutes || 0).toFixed(2)} minutes`,
      last: true,
    },
  ];

  /* ── RENDER ── */
  return (
    <PageLayout>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

      {/* ── Page Header ── */}
      <PageHeader className="border-b border-gray-100">
        <PageHeaderLeft>
          <div className="flex items-center gap-5">
            {/* Status icon with rings */}
            <div className="relative flex items-center justify-center">
              <div
                className="qr-pulse-ring absolute rounded-full"
                style={{ inset: -6, background: pulseBg }}
              />
              <div
                className="qr-spin-ring absolute rounded-full opacity-35"
                style={{ inset: -14, border: `2px dashed ${ringColor}` }}
              />
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl animate-[scaleIn_.45s_cubic-bezier(.22,.68,0,1.2)_both]"
                style={{ background: iconGrad }}
              >
                {isPassed ? (
                  <FiCheckCircle className="w-9 h-9 text-white" />
                ) : (
                  <FiXCircle className="w-9 h-9 text-white" />
                )}
              </div>
            </div>

            <div className="animate-[fadeUp_.5s_ease_both]">
              <PageTitle className="qr-serif text-[1.75rem]">
                {isPassed
                  ? t("quizResult.pageTitlePassed")
                  : t("quizResult.pageTitleFailed")}
              </PageTitle>
              <PageSubtitle className="text-gray-500 mt-1">
                {isPassed
                  ? t("quizResult.pageSubtitlePassed")
                  : t("quizResult.pageSubtitleFailed")}
              </PageSubtitle>
            </div>
          </div>
        </PageHeaderLeft>
      </PageHeader>

      <PageBody className="qr-font">
        <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
          {/* ── Hero Score Card ── */}
          <div
            className="relative rounded-3xl overflow-hidden animate-[fadeUp_.5s_cubic-bezier(.22,.68,0,1.2)_.05s_both]"
            style={{
              background: "#fff",
              border: `1.5px solid ${heroBorder}`,
              boxShadow: `0 4px 48px -8px ${passGlow}`,
            }}
          >
            {isPassed && <Confetti />}

            {/* top shimmer band */}
            <div
              className={`h-1.5 ${isPassed ? "qr-shimmer-bar" : "qr-shimmer-bar-fail"}`}
            />

            {/* Score section */}
            <div
              className="relative px-8 pt-12 pb-8 text-center"
              style={{ background: heroBg }}
            >
              {/* ghost number */}
              <div
                className="qr-serif absolute top-2 right-6 select-none pointer-events-none"
                style={{
                  fontSize: "9rem",
                  fontWeight: 900,
                  lineHeight: 1,
                  color: ghostNum,
                }}
              >
                {Math.round(pct)}
              </div>

              <div className="mb-6 animate-[scaleIn_.45s_cubic-bezier(.22,.68,0,1.2)_.1s_both]">
                <ScoreRing percentage={pct} isPassed={isPassed} />
              </div>

              <h2
                className="qr-serif text-[1.75rem] font-bold mb-1 animate-[fadeUp_.5s_ease_.15s_both]"
                style={{ color: msgColor }}
              >
                {getScoreMessage()}
              </h2>
              <p className="text-gray-500 text-sm max-w-sm mx-auto mb-3 animate-[fadeUp_.5s_ease_.2s_both]">
                {getScoreSubtext()}
              </p>

              {/* Pass/Fail pill */}
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full animate-[fadeUp_.5s_ease_.22s_both]"
                style={{
                  background: pillBg,
                  border: `1px solid ${pillBorder}`,
                }}
              >
                <FiAward style={{ width: 14, height: 14, color: pillIcon }} />
                <span
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: pillText }}
                >
                  {isPassed ? t("quizResult.passed") : t("quizResult.failed")}{" "}
                  &nbsp;·&nbsp; {t("quizResult.scoreLabel")}:{" "}
                  {quizResults.score} / {quizResults.total}
                </span>
              </div>
            </div>

            {/* Stat grid */}
            <div className="grid grid-cols-4 border-t border-gray-100">
              {stats.map(
                ({ icon: Icon, value, label, bg, color, small }, i) => (
                  <div
                    key={label}
                    className="group py-6 px-3 text-center bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-default"
                    style={{
                      borderRight: i < 3 ? "1px solid #f3f4f6" : "none",
                    }}
                  >
                    <div className="flex justify-center mb-2.5">
                      <div
                        className="w-9 h-9 rounded-[10px] flex items-center justify-center"
                        style={{ background: bg }}
                      >
                        <Icon style={{ width: 17, height: 17, color }} />
                      </div>
                    </div>
                    <div
                      className={`qr-serif font-bold text-gray-800 leading-none mb-1 ${small ? "text-[1.1rem]" : "text-[1.55rem]"}`}
                    >
                      {value}
                    </div>
                    <div className="text-[0.65rem] text-gray-400 uppercase tracking-widest font-semibold">
                      {label}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* ── Analysis Card ── */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm animate-[fadeUp_.5s_cubic-bezier(.22,.68,0,1.2)_.2s_both]">
            {/* Card header */}
            <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex items-center gap-3">
              <div className="w-8 h-8 rounded-[9px] bg-gray-100 flex items-center justify-center">
                <FiBarChart2 className="w-4 h-4 text-gray-600" />
              </div>
              <span className="qr-serif font-semibold text-gray-800 text-base">
                {t("quizResult.analysis.title")}
              </span>
            </div>

            {/* Rows */}
            <div className="px-6">
              {analysisRows.map(({ icon: Icon, label, value, last }) => (
                <div
                  key={label}
                  className="flex justify-between items-center py-3.5 transition-colors duration-150 hover:bg-gray-50 -mx-6 px-6"
                  style={{ borderBottom: last ? "none" : "1px solid #f9fafb" }}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-gray-500 text-sm">{label}</span>
                  </div>
                  <span className="qr-serif font-semibold text-gray-800 text-[0.95rem]">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Feedback Form ── */}
          {showFeedbackForm && !feedbackSubmitted && (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm animate-[fadeUp_.5s_cubic-bezier(.22,.68,0,1.2)_.3s_both]">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex items-center gap-3">
                <div className="w-8 h-8 rounded-[9px] bg-gray-100 flex items-center justify-center">
                  <FiMessageSquare className="w-4 h-4 text-gray-600" />
                </div>
                <span className="qr-serif font-semibold text-gray-800 text-base">
                  {t("quizResult.feedback.title")}
                </span>
              </div>

              <div className="p-6">
                <form onSubmit={handleFeedbackSubmit}>
                  {/* Stars */}
                  <div className="mb-7">
                    <label className="block text-gray-700 font-medium text-sm mb-3">
                      {t("quizResult.feedback.ratingLabel")}{" "}
                      <span className="text-rose-500">
                        {t("quizResult.feedback.required")}
                      </span>
                    </label>

                    <div className="flex items-center gap-2.5 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const active =
                          (hoveredRating || feedback.rating) >= star;
                        return (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleRatingClick(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="qr-star-btn p-0 bg-transparent border-0 cursor-pointer leading-none transition-transform duration-150 hover:scale-125 active:scale-90"
                          >
                            <FiStar
                              className="w-8 h-8 transition-all duration-150"
                              style={{
                                color: active ? "#f59e0b" : "#e5e7eb",
                                fill: active ? "#f59e0b" : "none",
                              }}
                            />
                          </button>
                        );
                      })}

                      {feedback.rating > 0 && (
                        <span className="ml-1 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-800">
                          {getRatingLabel(feedback.rating)}
                        </span>
                      )}
                    </div>

                    {feedbackError && (
                      <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-[10px] bg-rose-50 border border-rose-200 text-rose-500 text-sm mt-2">
                        <FiAlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        {feedbackError}
                      </div>
                    )}
                  </div>

                  {/* Textarea */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium text-sm mb-2">
                      {t("quizResult.feedback.additionalComments")}
                    </label>
                    <textarea
                      value={feedback.review}
                      onChange={(e) =>
                        setFeedback((f) => ({ ...f, review: e.target.value }))
                      }
                      rows={4}
                      placeholder={t("quizResult.feedback.placeholder")}
                      className="qr-textarea w-full px-4 py-3 border-[1.5px] border-gray-200 rounded-xl text-sm text-gray-700 resize-none bg-gray-50 transition-all duration-200"
                      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmittingFeedback}
                    className="submit-btn w-full py-3.5 rounded-xl border-0 font-semibold text-[0.95rem] text-white flex items-center justify-content-center gap-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: "linear-gradient(135deg,#1f2937,#111827)",
                      justifyContent: "center",
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                    }}
                  >
                    {isSubmittingFeedback ? (
                      <>
                        <div
                          className="qr-spin-loader w-4 h-4 rounded-full"
                          style={{
                            border: "2.5px solid rgba(255,255,255,.3)",
                            borderTopColor: "#fff",
                          }}
                        />
                        {t("quizResult.feedback.submitting")}
                      </>
                    ) : (
                      <>
                        <FiSend className="w-4 h-4" />{" "}
                        {t("quizResult.feedback.submitButton")}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ── Thank-you card ── */}
          {feedbackSubmitted && (
            <div
              className="relative rounded-2xl overflow-hidden text-center px-8 py-12 animate-[thankPop_.6s_cubic-bezier(.22,.68,0,1.2)_both]"
              style={{
                background: "linear-gradient(135deg,#ecfdf5,#d1fae5)",
                border: "1.5px solid #6ee7b7",
                boxShadow: "0 4px 32px -8px rgba(16,185,129,.22)",
              }}
            >
              <Confetti />

              <div
                className="w-16 h-16 rounded-[18px] mx-auto mb-5 flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg,#34d399,#059669)",
                  boxShadow: "0 8px 24px -4px rgba(16,185,129,.45)",
                }}
              >
                <FiCheck className="w-7 h-7 text-white" />
              </div>

              <h3 className="qr-serif text-[1.4rem] font-bold text-emerald-900 mb-1.5">
                {t("quizResult.feedback.thankYouTitle")}
              </h3>
              <p className="text-emerald-700 text-sm mb-4">
                {t("quizResult.feedback.thankYouMessage")}
              </p>

              <div className="flex justify-center gap-1.5 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar
                    key={star}
                    className="w-5 h-5"
                    style={{
                      color: star <= feedback.rating ? "#f59e0b" : "#d1d5db",
                      fill: star <= feedback.rating ? "#f59e0b" : "none",
                      transition: `all .12s ease ${star * 80}ms`,
                    }}
                  />
                ))}
              </div>

              <p className="text-emerald-400 text-xs tracking-wide">
                {t("quizResult.feedback.redirecting")}
              </p>
            </div>
          )}

          {/* ── Action Buttons ── */}
          {!feedbackSubmitted && (
            <div className="flex gap-4 justify-center animate-[fadeUp_.5s_ease_.45s_both]">
              <button
                onClick={handleGoHome}
                className="action-btn flex items-center gap-2 px-6 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-gray-700 font-semibold text-sm cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:-translate-y-0.5"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                <FiHome className="w-3.5 h-3.5" />
                {t("quizResult.buttons.backToHome")}
              </button>

              <button
                onClick={handleRetry}
                className="action-btn flex items-center gap-2 px-6 py-2.5 rounded-xl border-0 text-white font-semibold text-sm cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg,#1f2937,#111827)",
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                }}
              >
                <FiRefreshCw className="w-3.5 h-3.5" />
                {t("quizResult.buttons.tryAgain")}
              </button>
            </div>
          )}
        </div>
      </PageBody>
    </PageLayout>
  );
};

export default QuizResult;

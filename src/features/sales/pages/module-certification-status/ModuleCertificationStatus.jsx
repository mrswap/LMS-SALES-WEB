import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchModuleCertificationStatus } from "../../../../redux/slice/moduleLearningStatusSlice";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaChevronDown,
  FaChevronRight,
  FaAward,
  FaBookOpen,
  FaPlayCircle,
  FaEye,
  FaLock,
  FaUnlock,
  FaClipboardList,
  FaHourglassHalf,
  FaArrowRight,
  FaInfoCircle,
  FaQuestionCircle,
  FaStar,
} from "react-icons/fa";
import Loader from "../../common/Loader";
import Error from "../../common/Error";
import { useTranslation } from "react-i18next";

const ModuleCertificationStatus = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data, isLoading, isError, message } = useSelector(
    (state) => state.moduleCertification,
  );

  const [expandedChapters, setExpandedChapters] = useState(new Set());

  useEffect(() => {
    dispatch(fetchModuleCertificationStatus());
  }, [dispatch]);

  useEffect(() => {
    if (data?.data?.chapters) {
      setExpandedChapters(new Set(data.data.chapters.map((c) => c.id)));
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <Error message={message || t("moduleCertification.somethingWentWrong")} />
    );
  }

  if (!data || !data.data) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
        <p>{t("moduleCertification.noData")}</p>
      </div>
    );
  }

  const {
    module,
    progress,
    exam,
    chapters,
    program,
    level,
    checklist,
    content,
    next_learning,
  } = data.data;

  // ---- NAVIGATION HANDLERS ----
  // Content page -> jahan topic padhna hota hai. Quiz yahan se DIRECTLY start nahi hota;
  // topic detail page ke andar hi "Take Quiz" CTA hona chahiye (content complete hone ke baad).
  const handleNavigateToTopic = (topicId) => navigate(`/topics/${topicId}`);

  // Topic-level quiz start/retry -> /quiz/:assessmentId
  // Ye SIRF FAILED topics ke liye row/table se direct call hota hai (retry).
  // Pending topics ke liye kabhi bhi seedha ye call mat karo — pehle content padhna zaroori hai.
  const handleNavigateToQuiz = (assessmentId) =>
    navigate(`/quiz/${assessmentId}`);

  // Module-level exam give/retry -> /exam-module/:assessmentId
  const handleGiveExam = () => navigate(`/exam-module/${exam.assessment.id}`);

  // Certificate view (topic or module) -> /certificate/:assessmentId
  const handleViewCertificate = (assessmentId) =>
    navigate(`/certificate/${assessmentId}`);

  // "Review Content" -> jump to the topic the learner is currently/next on
  const handleReviewContent = () => {
    const currentTopicId = next_learning?.topic?.id;
    if (currentTopicId) {
      handleNavigateToTopic(currentTopicId);
    } else {
      // fallback: agar next_learning na ho (sab complete ho chuka), module page pe le jao
      navigate(`/module/${module.id}`);
    }
  };

  const allTopics = chapters.flatMap((c) => c.topics);
  const totalTopics = allTopics.length;
  const passedTopics = allTopics.filter((t) => t.quiz_status === "passed");
  const failedTopics = allTopics.filter((t) => t.quiz_status === "failed");
  const pendingTopics = allTopics.filter((t) => t.quiz_status === "pending");
  const allTopicsPassed =
    totalTopics > 0 && passedTopics.length === totalTopics;
  const hasFailedTopics = failedTopics.length > 0;

  const isModuleCompleted = module.is_completed;
  const isExamPassed = exam.status === "passed";
  const canViewCertificate = isModuleCompleted || isExamPassed;

  // Passing score as a percentage of total marks (e.g. 10/15 -> 67%)
  const passingScorePercentage =
    exam.assessment.total_marks > 0
      ? Math.round(
          (exam.assessment.passing_score / exam.assessment.total_marks) * 100,
        )
      : 0;

  const toggleChapter = (chapterId) => {
    const newSet = new Set(expandedChapters);
    newSet.has(chapterId) ? newSet.delete(chapterId) : newSet.add(chapterId);
    setExpandedChapters(newSet);
  };

  const getPrimaryAction = () => {
    if (canViewCertificate) {
      return {
        label: t("moduleCertification.actions.viewCertificate"),
        icon: <FaEye className="w-4 h-4" />,
        onClick: () => handleViewCertificate(exam.last_attempt?.id),
        variant: "primary",
      };
    }
    if (allTopicsPassed && exam.unlocked) {
      return {
        label: t("moduleCertification.actions.giveExam"),
        icon: <FaArrowRight className="w-4 h-4" />,
        onClick: handleGiveExam,
        variant: "primary",
      };
    }
    if (allTopicsPassed && !exam.unlocked) {
      return {
        label: t("moduleCertification.actions.examLocked"),
        icon: <FaLock className="w-4 h-4" />,
        onClick: () => {},
        variant: "disabled",
      };
    }
    if (hasFailedTopics) {
      const firstFailed = failedTopics[0];
      return {
        label: `${t("moduleCertification.actions.retryQuiz")}: ${firstFailed.title}`,
        icon: <FaBookOpen className="w-4 h-4" />,
        onClick: () => handleNavigateToQuiz(firstFailed.assessment.id),
        variant: "warning",
      };
    }
    const firstPending = pendingTopics[0];
    if (firstPending) {
      // Agar is topic ka content pehle hi pura padha jaa chuka hai (is_all_contents_read true),
      // to seedha quiz par bhejo. Warna pehle content page par bhejo.
      const contentAlreadyRead = firstPending.is_all_contents_read === true;
      return {
        label: contentAlreadyRead
          ? `${t("moduleCertification.actions.startQuiz")}: ${firstPending.title}`
          : `${t("moduleCertification.actions.continue")}: ${firstPending.title}`,
        icon: contentAlreadyRead ? (
          <FaPlayCircle className="w-4 h-4" />
        ) : (
          <FaBookOpen className="w-4 h-4" />
        ),
        onClick: () =>
          contentAlreadyRead
            ? handleNavigateToQuiz(firstPending.assessment.id)
            : handleNavigateToTopic(firstPending.id),
        variant: "secondary",
      };
    }
    return {
      label: content?.cta || t("moduleCertification.actions.continueLearning"),
      icon: <FaBookOpen className="w-4 h-4" />,
      onClick: handleReviewContent,
      variant: "secondary",
    };
  };

  const primaryAction = getPrimaryAction();

  const buttonStyles = {
    primary:
      "bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow-md cursor-pointer",
    warning: "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 cursor-pointer",
    disabled: "bg-gray-200 text-gray-400 cursor-not-allowed",
  };

  const StatusBadge = ({ status }) => {
    const config = {
      passed: {
        icon: <FaCheckCircle className="w-3.5 h-3.5" />,
        label: t("moduleCertification.status.passed"),
        className: "bg-teal-50 text-teal-700 border-teal-200",
      },
      failed: {
        icon: <FaTimesCircle className="w-3.5 h-3.5" />,
        label: t("moduleCertification.status.failed"),
        className: "bg-rose-50 text-rose-700 border-rose-200",
      },
      pending: {
        icon: <FaHourglassHalf className="w-3.5 h-3.5" />,
        label: t("moduleCertification.status.pending"),
        className: "bg-amber-50 text-amber-700 border-amber-200",
      },
    };
    const c = config[status] || config.pending;
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${c.className}`}
      >
        {c.icon}
        {c.label}
      </span>
    );
  };

  // Row-level click / action column ka logic status ke hisaab se.
  //
  // Backend ab `is_all_contents_read` (boolean) bhejta hai, jo batata hai ki
  // topic ka pura content actually padha ja chuka hai ya nahi. Isी se decide hota hai
  // ki quiz start ho sakta hai ya pehle content page par jaana zaroori hai:
  //   - quiz_status "pending" + is_unlocked true + is_all_contents_read true  -> Start Quiz
  //   - quiz_status "pending" + is_unlocked true + is_all_contents_read false -> Start Learning (content page)
  //   - quiz_status "pending" + is_unlocked false                            -> Locked
  //   - quiz_status "failed"                                                 -> Retry Quiz (direct)
  //   - quiz_status "passed"                                                 -> View Certificate
  const renderTopicRow = (topic) => {
    const scoreDisplay = topic.last_attempt
      ? `${topic.last_attempt.score}/${topic.last_attempt.total_score}`
      : "—";
    const percentageDisplay = topic.last_attempt
      ? `${topic.last_attempt.percentage}%`
      : "—";

    const isFailed = topic.quiz_status === "failed";
    const isPassed = topic.quiz_status === "passed";

    // pending + unlocked + content already read -> quiz can start
    const isQuizReady =
      topic.quiz_status === "pending" &&
      topic.is_unlocked &&
      topic.is_all_contents_read === true;

    // pending + unlocked + content NOT read yet -> must go read content first
    const isContentPending =
      topic.quiz_status === "pending" &&
      topic.is_unlocked &&
      topic.is_all_contents_read !== true;

    const isLockedPending =
      topic.quiz_status === "pending" && !topic.is_unlocked;

    // row click: failed/ready -> quiz, content-pending -> content page
    const isRowClickable = isFailed || isQuizReady || isContentPending;
    const handleRowClick = () => {
      if (isFailed || isQuizReady) {
        handleNavigateToQuiz(topic.assessment.id);
      } else if (isContentPending) {
        handleNavigateToTopic(topic.id);
      }
    };

    return (
      <tr
        key={topic.id}
        className={`border-b border-gray-100 transition-colors ${
          isRowClickable ? "cursor-pointer hover:bg-teal-50/50" : ""
        }`}
        onClick={handleRowClick}
      >
        <td className="px-4 py-3 max-w-[240px]">
          <div className="flex items-center gap-2 truncate" title={topic.title}>
            <span className="text-sm font-medium text-gray-800 truncate">
              {topic.title}
            </span>
            {!topic.is_unlocked && (
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full flex items-center gap-1 flex-shrink-0">
                <FaLock className="w-3 h-3" />
                {t("moduleCertification.topic.locked")}
              </span>
            )}
          </div>
        </td>
        <td className="px-4 py-3">
          <StatusBadge status={topic.quiz_status} />
        </td>
        <td className="px-4 py-3 text-sm font-medium text-gray-700 whitespace-nowrap">
          {scoreDisplay}
        </td>
        <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
          {percentageDisplay}
        </td>
        <td className="px-4 py-3 text-sm text-gray-400 whitespace-nowrap">
          {topic.last_attempt?.submitted_at
            ? new Date(topic.last_attempt.submitted_at).toLocaleDateString()
            : "—"}
        </td>
        <td className="px-4 py-3 text-center">
          {isPassed && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleViewCertificate(topic.last_attempt.id);
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 transition whitespace-nowrap cursor-pointer"
              title={t("moduleCertification.actions.viewCertificate")}
            >
              <FaEye className="w-3.5 h-3.5" />
              {t("moduleCertification.actions.certificate")}
            </button>
          )}

          {isFailed && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNavigateToQuiz(topic.assessment.id);
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium text-white bg-blue-500 hover:bg-blue-600 transition whitespace-nowrap cursor-pointer"
              title={t("moduleCertification.actions.retryQuiz")}
            >
              <FaPlayCircle className="w-3.5 h-3.5" />
              {t("moduleCertification.actions.retryQuiz")}
            </button>
          )}

          {isQuizReady && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNavigateToQuiz(topic.assessment.id);
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium text-white bg-blue-500 hover:bg-blue-600 transition whitespace-nowrap cursor-pointer"
              title={t("moduleCertification.actions.startQuiz")}
            >
              <FaPlayCircle className="w-3.5 h-3.5" />
              {t("moduleCertification.actions.startQuiz")}
            </button>
          )}

          {isContentPending && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNavigateToTopic(topic.id);
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium text-white bg-blue-500 hover:bg-blue-600 transition whitespace-nowrap cursor-pointer"
              title={t("moduleCertification.actions.startLearning")}
            >
              <FaBookOpen className="w-3.5 h-3.5" />
              {t("moduleCertification.actions.continue")}
            </button>
          )}

          {isLockedPending && (
            <button
              disabled
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium text-gray-400 bg-gray-100 cursor-not-allowed whitespace-nowrap"
              title={t("moduleCertification.actions.lockedTooltip")}
            >
              <FaLock className="w-3.5 h-3.5" />
              {t("moduleCertification.actions.startQuiz")}
            </button>
          )}
        </td>
      </tr>
    );
  };

  // Pill / heading copy driven by API "content" block, falling back to computed state
  const pillLabel =
    content?.heading ||
    (canViewCertificate
      ? t("moduleCertification.pills.milestoneReached")
      : allTopicsPassed
        ? t("moduleCertification.pills.examReady")
        : t("moduleCertification.pills.learningInProgress"));
  const heroTitle =
    content?.title ||
    (canViewCertificate
      ? t("moduleCertification.hero.certificationComplete")
      : t("moduleCertification.hero.completeModule"));
  const heroDescription =
    content?.description || t("moduleCertification.hero.description");
  const footerNote = content?.footer || t("moduleCertification.footerNote");

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      <style>{`
        .thin-scroll::-webkit-scrollbar {
          height: 3px;
        }
        .thin-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .thin-scroll::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 9999px;
        }
        .thin-scroll::-webkit-scrollbar-thumb:hover {
          background-color: #9ca3af;
        }
        .thin-scroll {
          scrollbar-width: thin;
          scrollbar-color: #d1d5db transparent;
        }
      `}</style>
      <div className="lg:p-4">
        {/* PILL + HERO HEADING */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-teal-50 text-teal-700 border border-teal-100">
            <FaAward className="w-3 h-3" />
            {pillLabel}
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            {heroTitle}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-500 max-w-2xl">
            {heroDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* MODULE CARD */}
            <div className="relative bg-white rounded-2xl shadow-sm border border-gray-200/80 pl-6 pr-6 py-6 overflow-hidden">
              <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-teal-500 rounded-l-2xl" />
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="flex items-center gap-5 flex-1 min-w-0">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <svg className="w-16 h-16 -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        stroke="#e5e7eb"
                        strokeWidth="9"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        stroke="#14b8a6"
                        strokeWidth="9"
                        fill="none"
                        strokeDasharray={`${(progress.percentage / 100) * 264} 264`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-base font-bold text-teal-600">
                      {Math.round(progress.percentage)}%
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold tracking-wide uppercase text-gray-400">
                      {t("moduleCertification.moduleCard.currentModule")}
                    </p>
                    <h2
                      className="text-lg sm:text-xl font-bold text-gray-900 leading-snug truncate"
                      title={module.title}
                    >
                      {module.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1.5 whitespace-nowrap">
                        <FaClock className="text-teal-500" />
                        {module.estimated_duration || "—"}{" "}
                        {t("moduleCertification.moduleCard.studyTime")}
                      </span>
                      <span className="flex items-center gap-1.5 whitespace-nowrap">
                        <FaBookOpen className="text-teal-500" />
                        {chapters.length}{" "}
                        {t("moduleCertification.moduleCard.lessons")}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleReviewContent}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-blue-200 text-blue-700 hover:bg-blue-50 font-semibold rounded-lg transition text-sm whitespace-nowrap cursor-pointer flex-shrink-0"
                >
                  <FaArrowRight className="w-3.5 h-3.5" />
                  {t("moduleCertification.actions.reviewContent")}
                </button>
              </div>

              {/* Module description */}
              {module.description && (
                <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                  {module.description}
                </p>
              )}

              {/* Extra stats row: program / level / topics / remaining — fills out the card */}
              <div className="mt-5 pt-5 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
                    <FaAward className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p
                      className="text-xs font-semibold text-gray-800 truncate"
                      title={program.title}
                    >
                      {program.title}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      {t("moduleCertification.moduleCard.program")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <FaStar className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p
                      className="text-xs font-semibold text-gray-800 truncate"
                      title={level.title}
                    >
                      {level.title}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      {t("moduleCertification.moduleCard.level")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                    <FaClipboardList className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">
                      {progress.completed_topics}/{progress.total_topics}{" "}
                      {t("moduleCertification.moduleCard.topics")}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      {t("moduleCertification.moduleCard.completed")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0">
                    <FaHourglassHalf className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">
                      {progress.remaining_topics}{" "}
                      {t("moduleCertification.moduleCard.remaining")}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      {t("moduleCertification.moduleCard.topicsLeft")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* EXAM READINESS CHECKLIST */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <FaClipboardList className="text-teal-600 w-4 h-4" />
                <h3 className="font-bold text-gray-900">
                  {t("moduleCertification.checklist.title")}
                </h3>
              </div>
              <div className="space-y-3">
                {checklist.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-3 bg-gray-50 rounded-xl px-4 py-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                          item.completed
                            ? "bg-teal-500 text-white"
                            : "bg-gray-200 text-gray-400"
                        }`}
                      >
                        <FaCheckCircle className="w-3.5 h-3.5" />
                      </div>
                      <span
                        className="text-sm font-semibold text-gray-800 truncate"
                        title={item.title}
                      >
                        {item.title}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0">
                      {item.completed_count !== undefined &&
                        `${item.completed_count}/${item.total_count} ${t("moduleCertification.checklist.topics")}`}
                      {item.remaining !== undefined &&
                        `${item.remaining} ${t("moduleCertification.checklist.remaining")}`}
                      {item.unlocked !== undefined &&
                        (item.unlocked ? (
                          <span className="inline-flex items-center gap-1 text-teal-600">
                            <FaUnlock className="w-3 h-3" />{" "}
                            {t("moduleCertification.checklist.unlocked")}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-600">
                            <FaLock className="w-3 h-3" />{" "}
                            {t("moduleCertification.checklist.locked")}
                          </span>
                        ))}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA row: Continue / Retry / Give Exam / View Certificate — sab primaryAction se driven */}
              <div className="mt-6 flex-1 flex flex-col items-center justify-center text-center gap-4">
                <button
                  onClick={primaryAction.onClick}
                  disabled={primaryAction.variant === "disabled"}
                  className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                    buttonStyles[primaryAction.variant] ||
                    buttonStyles.secondary
                  }`}
                >
                  {primaryAction.icon}
                  {primaryAction.label}
                </button>
                <div className="w-full pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400 leading-snug whitespace-nowrap">
                    {footerNote}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-6">
            {/* WHAT TO EXPECT */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6">
              <h3 className="text-xs font-bold tracking-wide uppercase text-teal-600 mb-4">
                {t("moduleCertification.whatToExpect.title")}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <FaClock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {exam.assessment.duration}{" "}
                      {t("moduleCertification.whatToExpect.minutes")}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t("moduleCertification.whatToExpect.timeDescription")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <FaQuestionCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {exam.assessment.total_marks}{" "}
                      {t("moduleCertification.whatToExpect.questions")}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t(
                        "moduleCertification.whatToExpect.questionDescription",
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <FaStar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {exam.assessment.passing_score}/
                      {exam.assessment.total_marks}{" "}
                      {t("moduleCertification.whatToExpect.passingScore")}
                      <span className="text-gray-400 font-normal ml-1">
                        ({passingScorePercentage}%)
                      </span>
                    </p>
                    <p className="text-xs text-gray-500">
                      {t("moduleCertification.whatToExpect.requiredFor")}{" "}
                      {program.title}{" "}
                      {t("moduleCertification.whatToExpect.certification")}.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex gap-2.5 bg-blue-50 text-blue-800 text-xs leading-snug rounded-xl px-4 py-3">
                <FaInfoCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p>
                  {exam.reason || t("moduleCertification.whatToExpect.reason")}
                </p>
              </div>

              {/* Sab topics complete + exam unlocked -> seedha Give Exam CTA yahan bhi */}
              {allTopicsPassed && exam.unlocked && !canViewCertificate && (
                <button
                  onClick={handleGiveExam}
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-blue-500 hover:bg-blue-600 text-white transition cursor-pointer"
                >
                  <FaArrowRight className="w-3.5 h-3.5" />
                  {t("moduleCertification.actions.giveExam")}
                </button>
              )}
            </div>

            {/* PENDING / EARNED CREDENTIAL CARD */}
            <div className="bg-gray-900 rounded-2xl p-6 text-white overflow-hidden flex-1 flex flex-col">
              <span
                className={`text-[11px] font-semibold tracking-wide uppercase ${
                  canViewCertificate ? "text-teal-400" : "text-amber-400"
                }`}
              >
                {canViewCertificate
                  ? t("moduleCertification.credential.earned")
                  : t("moduleCertification.credential.pending")}
              </span>

              <div className="flex items-center gap-3 mt-3">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <FaAward
                    className={`w-5 h-5 ${
                      canViewCertificate ? "text-teal-400" : "text-gray-400"
                    }`}
                  />
                </div>
                <div className="min-w-0">
                  <p
                    className="font-bold leading-tight truncate"
                    title={program.title}
                  >
                    {program.title}
                  </p>
                  <p className="text-xs text-gray-400">
                    {level.title}{" "}
                    {t("moduleCertification.credential.certification")}
                  </p>
                </div>
              </div>

              <div className="mt-5 relative rounded-xl bg-gray-800/70 border border-dashed border-gray-700 flex-1 min-h-[8rem] overflow-hidden flex items-center justify-center">
                {module.thumbnail && (
                  <img
                    src={module.thumbnail}
                    alt={module.title}
                    className={`absolute inset-0 w-full h-full object-cover ${
                      canViewCertificate
                        ? ""
                        : "grayscale opacity-25 blur-[1px]"
                    }`}
                  />
                )}
                {canViewCertificate ? (
                  <FaAward className="relative w-10 h-10 text-teal-400 drop-shadow" />
                ) : (
                  <div className="relative w-10 h-10 rounded-full bg-gray-900/80 border border-gray-700 flex items-center justify-center">
                    <FaLock className="w-4 h-4 text-gray-400" />
                  </div>
                )}
              </div>

              <p className="mt-3 text-[11px] text-gray-500 text-center">
                {canViewCertificate
                  ? t("moduleCertification.credential.badgeActive")
                  : t("moduleCertification.credential.badgeInactive")}
              </p>
            </div>
          </div>
        </div>

        {/* CHAPTER / TOPIC TABLE — full width, own row */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/60 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
              <FaClipboardList className="text-teal-600" />
              <span>{t("moduleCertification.table.title")}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1 whitespace-nowrap">
                <FaCheckCircle className="text-teal-500" />{" "}
                {t("moduleCertification.table.passed")}: {passedTopics.length}
              </span>
              <span className="flex items-center gap-1 whitespace-nowrap">
                <FaTimesCircle className="text-rose-500" />{" "}
                {t("moduleCertification.table.failed")}: {failedTopics.length}
              </span>
              <span className="flex items-center gap-1 whitespace-nowrap">
                <FaHourglassHalf className="text-amber-500" />{" "}
                {t("moduleCertification.table.pending")}: {pendingTopics.length}
              </span>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {chapters.map((chapter) => {
              const isExpanded = expandedChapters.has(chapter.id);
              const chapterPassed = chapter.topics.every(
                (t) => t.quiz_status === "passed",
              );

              return (
                <div key={chapter.id} className="transition-all">
                  <div
                    className="px-6 py-3 bg-white hover:bg-gray-50 cursor-pointer flex flex-wrap items-center justify-between gap-2 transition-colors"
                    onClick={() => toggleChapter(chapter.id)}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {isExpanded ? (
                        <FaChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      ) : (
                        <FaChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      )}
                      <span
                        className="font-medium text-gray-800 truncate"
                        title={chapter.title}
                      >
                        {chapter.title}
                      </span>
                      <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">
                        ({chapter.progress.completed_topics}/
                        {chapter.progress.total_topics}{" "}
                        {t("moduleCertification.table.topics")})
                      </span>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {Math.round(chapter.progress.percentage)}%{" "}
                        {t("moduleCertification.table.complete")}
                      </span>
                      {chapterPassed ? (
                        <FaCheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0" />
                      ) : (
                        <FaHourglassHalf className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="overflow-x-auto thin-scroll">
                      <table className="w-full text-sm table-fixed min-w-[640px]">
                        <thead className="bg-gray-50/70 text-xs uppercase text-gray-500">
                          <tr>
                            <th className="px-4 py-2 text-left font-medium w-[34%]">
                              {t("moduleCertification.table.topic")}
                            </th>
                            <th className="px-4 py-2 text-left font-medium w-[14%]">
                              {t("moduleCertification.table.status")}
                            </th>
                            <th className="px-4 py-2 text-left font-medium w-[12%]">
                              {t("moduleCertification.table.score")}
                            </th>
                            <th className="px-4 py-2 text-left font-medium w-[8%]">
                              %
                            </th>
                            <th className="px-4 py-2 text-left font-medium w-[16%]">
                              {t("moduleCertification.table.attempted")}
                            </th>
                            <th className="px-4 py-2 text-center font-medium w-[16%]">
                              {t("moduleCertification.table.action")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {chapter.topics.map((topic) => renderTopicRow(topic))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleCertificationStatus;

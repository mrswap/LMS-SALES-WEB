import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchModuleCertificationStatus } from "../../../../redux/slice/moduleLearningStatusSlice";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaExclamationCircle,
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
} from "react-icons/fa";

const ModuleCertificationStatus = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading certification status…</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-red-500">
        <p>{message || "Something went wrong."}</p>
      </div>
    );
  }

  if (!data || !data.data) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
        <p>No module data available.</p>
      </div>
    );
  }

  const handleNavigateToTopic = (topicId) => {
    navigate(`/topics/${topicId}`);
  };

  const handleStartExam = () => {
    navigate(`/exam/${data.data.module.id}`);
  };

  const handleViewCertificate = (assessmentId) => {
    navigate(`/certificate/${assessmentId}`);
  };

  const handleContinueLearning = () => {
    navigate(`/module/${data.data.module.id}`);
  };

  const { module, progress, exam, chapters, program, level, checklist } =
    data.data;

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

  const toggleChapter = (chapterId) => {
    const newSet = new Set(expandedChapters);
    newSet.has(chapterId) ? newSet.delete(chapterId) : newSet.add(chapterId);
    setExpandedChapters(newSet);
  };

  const getPrimaryAction = () => {
    if (canViewCertificate) {
      return {
        label: "View Certificate",
        icon: <FaEye className="w-5 h-5" />,
        onClick: () => handleViewCertificate(exam.assessment.id),
        variant: "primary",
      };
    }
    if (allTopicsPassed && exam.unlocked) {
      return {
        label: "Start Certification Exam",
        icon: <FaPlayCircle className="w-5 h-5" />,
        onClick: handleStartExam,
        variant: "primary",
      };
    }
    if (allTopicsPassed && !exam.unlocked) {
      return {
        label: "Exam Locked",
        icon: <FaLock className="w-5 h-5" />,
        onClick: () => {},
        variant: "disabled",
      };
    }
    if (hasFailedTopics) {
      const firstFailed = failedTopics[0];
      return {
        label: `Retry: ${firstFailed.title}`,
        icon: <FaBookOpen className="w-5 h-5" />,
        onClick: () => handleNavigateToTopic(firstFailed.id),
        variant: "warning",
      };
    }
    const firstPending = pendingTopics[0];
    if (firstPending) {
      return {
        label: `Continue: ${firstPending.title}`,
        icon: <FaBookOpen className="w-5 h-5" />,
        onClick: () => handleNavigateToTopic(firstPending.id),
        variant: "secondary",
      };
    }
    return {
      label: "Continue Learning",
      icon: <FaBookOpen className="w-5 h-5" />,
      onClick: handleContinueLearning,
      variant: "secondary",
    };
  };

  const primaryAction = getPrimaryAction();

  const buttonStyles = {
    primary:
      "bg-blue-700 hover:bg-blue-800 text-white shadow-sm hover:shadow-md cursor-pointer",
    warning: "bg-amber-600 hover:bg-amber-700 text-white cursor-pointer",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 cursor-pointer",
    disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
  };

  const StatusBadge = ({ status }) => {
    const config = {
      passed: {
        icon: <FaCheckCircle className="w-4 h-4" />,
        label: "Passed",
        className: "bg-emerald-50 text-emerald-700 border-emerald-200",
      },
      failed: {
        icon: <FaTimesCircle className="w-4 h-4" />,
        label: "Failed",
        className: "bg-rose-50 text-rose-700 border-rose-200",
      },
      pending: {
        icon: <FaHourglassHalf className="w-4 h-4" />,
        label: "Pending",
        className: "bg-amber-50 text-amber-700 border-amber-200",
      },
    };
    const c = config[status] || config.pending;
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${c.className}`}
      >
        {c.icon}
        {c.label}
      </span>
    );
  };

  const renderTopicRow = (topic, chapterTitle) => {
    const scoreDisplay = topic.last_attempt
      ? `${topic.last_attempt.score}/${topic.last_attempt.total_score}`
      : "—";
    const percentageDisplay = topic.last_attempt
      ? `${topic.last_attempt.percentage}%`
      : "—";
    const isClickable =
      topic.quiz_status === "failed" || topic.quiz_status === "pending";

    return (
      <tr
        key={topic.id}
        className={`border-b border-gray-100 transition-colors ${
          isClickable ? "cursor-pointer hover:bg-blue-50" : ""
        }`}
        onClick={() => isClickable && handleNavigateToTopic(topic.id)}
      >
        {/* Chapter name – truncate with max-width */}
        <td
          className="px-4 py-3 text-sm text-gray-600 max-w-[140px] truncate"
          title={chapterTitle}
        >
          {chapterTitle}
        </td>
        {/* Topic name – truncate with max-width */}
        <td className="px-4 py-3 max-w-[200px]">
          <div className="flex items-center gap-2 truncate" title={topic.title}>
            <span className="text-sm font-medium text-gray-800 truncate">
              {topic.title}
            </span>
            {!topic.is_unlocked && (
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full flex items-center gap-1 flex-shrink-0">
                <FaLock className="w-3 h-3" />
                Locked
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
          {topic.quiz_status === "passed" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleViewCertificate(topic.assessment.id);
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition whitespace-nowrap cursor-pointer"
              title="View Certificate"
            >
              <FaEye className="w-3.5 h-3.5" />
              Certificate
            </button>
          )}
          {topic.quiz_status !== "passed" && (
            <span className="text-gray-300 text-xs">—</span>
          )}
        </td>
      </tr>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* CARD HEADER */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200/80 p-6 sm:p-8 mb-8 transition hover:shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex items-center gap-6 flex-1 min-w-0">
              <div className="relative w-20 h-20 flex-shrink-0">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(progress.percentage / 100) * 264} 264`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-blue-600">
                  {Math.round(progress.percentage)}%
                </div>
              </div>

              <div className="space-y-1 min-w-0 flex-1">
                <h2
                  className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight truncate"
                  title={module.title}
                >
                  {module.title}
                </h2>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <FaClock className="text-blue-500" />
                    {module.estimated_duration || "12h"} Study Time
                  </span>
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <FaBookOpen className="text-blue-500" />
                    {chapters.length} Lessons
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 whitespace-nowrap">
                    <FaAward className="w-3 h-3" />
                    {program.title} · {level.title}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <button
                onClick={() => navigate(`/module/${module.id}`)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition shadow-sm hover:shadow-md text-sm whitespace-nowrap cursor-pointer"
              >
                <FaBookOpen className="w-4 h-4" />
                Review Content
              </button>
            </div>
          </div>
        </div>

        {/* CHECKLIST CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {checklist.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow min-w-0"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  item.completed
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {item.completed ? (
                  <FaCheckCircle className="w-5 h-5" />
                ) : (
                  <FaHourglassHalf className="w-5 h-5" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className="text-sm font-medium text-gray-800 truncate"
                  title={item.title}
                >
                  {item.title}
                </p>
                {item.completed_count !== undefined && (
                  <p className="text-xs text-gray-500">
                    {item.completed_count} / {item.total_count}
                  </p>
                )}
                {item.remaining !== undefined && (
                  <p className="text-xs text-gray-500">
                    {item.remaining} remaining
                  </p>
                )}
                {item.unlocked !== undefined && (
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    {item.unlocked ? (
                      <>
                        <FaUnlock className="text-emerald-500" /> Unlocked
                      </>
                    ) : (
                      <>
                        <FaLock className="text-amber-500" /> Locked
                      </>
                    )}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CHAPTER / TOPIC TABLE */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/80 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FaClipboardList className="text-blue-500" />
              <span>Chapter & Topic Progress</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1 whitespace-nowrap">
                <FaCheckCircle className="text-emerald-500" /> Passed:{" "}
                {passedTopics.length}
              </span>
              <span className="flex items-center gap-1 whitespace-nowrap">
                <FaTimesCircle className="text-rose-500" /> Failed:{" "}
                {failedTopics.length}
              </span>
              <span className="flex items-center gap-1 whitespace-nowrap">
                <FaHourglassHalf className="text-amber-500" /> Pending:{" "}
                {pendingTopics.length}
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
                  {/* Chapter accordion header – cursor-pointer */}
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
                        {chapter.progress.total_topics} topics)
                      </span>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {Math.round(chapter.progress.percentage)}% complete
                      </span>
                      {chapterPassed ? (
                        <FaCheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      ) : (
                        <FaHourglassHalf className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50/70 text-xs uppercase text-gray-500">
                          <tr>
                            <th className="px-4 py-2 text-left font-medium">
                              Chapter
                            </th>
                            <th className="px-4 py-2 text-left font-medium">
                              Topic
                            </th>
                            <th className="px-4 py-2 text-left font-medium">
                              Status
                            </th>
                            <th className="px-4 py-2 text-left font-medium">
                              Score
                            </th>
                            <th className="px-4 py-2 text-left font-medium">
                              %
                            </th>
                            <th className="px-4 py-2 text-left font-medium">
                              Attempted
                            </th>
                            <th className="px-4 py-2 text-center font-medium">
                              Certificate
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {chapter.topics.map((topic) =>
                            renderTopicRow(topic, chapter.title),
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-3 text-sm text-gray-600">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-medium text-gray-700">
              Certification Exam
            </span>
            <span className="whitespace-nowrap">
              {exam.assessment.total_marks} questions
            </span>
            <span className="flex items-center gap-1 whitespace-nowrap">
              <FaClock className="text-gray-400" /> {exam.assessment.duration}{" "}
              min
            </span>
            <span className="text-amber-600 font-medium whitespace-nowrap">
              Passing: {exam.assessment.passing_score}%
            </span>
            <span className="flex items-center gap-1 whitespace-nowrap">
              {exam.unlocked ? (
                <>
                  <FaUnlock className="text-emerald-500" />
                  <span className="text-emerald-600">Unlocked</span>
                </>
              ) : (
                <>
                  <FaLock className="text-amber-500" />
                  <span className="text-amber-600">Locked</span>
                </>
              )}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {exam.last_attempt && (
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="text-gray-400">Last attempt:</span>
                <span
                  className={`font-semibold flex items-center gap-1 ${
                    exam.last_attempt.status === "passed"
                      ? "text-emerald-600"
                      : "text-rose-600"
                  }`}
                >
                  {exam.last_attempt.status === "passed" ? (
                    <FaCheckCircle className="w-4 h-4" />
                  ) : (
                    <FaTimesCircle className="w-4 h-4" />
                  )}
                  {exam.last_attempt.status === "passed" ? "Passed" : "Failed"}
                </span>
                <span className="text-gray-400">
                  ({exam.last_attempt.score}/{exam.last_attempt.total_score})
                </span>
              </div>
            )}
            <button
              onClick={primaryAction.onClick}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                buttonStyles[primaryAction.variant] || buttonStyles.secondary
              }`}
              disabled={primaryAction.variant === "disabled"}
            >
              {primaryAction.icon}
              {primaryAction.label}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleCertificationStatus;

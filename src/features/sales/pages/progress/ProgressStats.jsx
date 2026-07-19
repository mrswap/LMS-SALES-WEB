import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaBookOpen,
  FaClipboardList,
  FaUserGraduate,
  FaCertificate,
  FaChevronRight,
  FaCheckCircle,
  FaSpinner,
  FaLock,
  FaPlayCircle,
  FaStar,
  FaTrophy,
  FaFolderOpen,
  FaFileAlt,
} from "react-icons/fa";
import { FiTarget, FiBarChart2 } from "react-icons/fi";
import { getDashboardData } from "../../../../redux/slice/dashboardSlice";
import {
  PageBody,
  PageHeader,
  PageHeaderLeft,
  PageLayout,
  PageSubtitle,
  PageTitle,
} from "../../common/layout";
import Loader from "../../common/Loader";
import Error from "../../common/Error";
import { useTranslation } from "react-i18next";

// ==================== PROFESSIONAL CLASSIC COMPONENTS ====================

// Classic Card Component
const ClassicCard = ({ children, className, bordered = true }) => {
  return (
    <div
      className={`bg-white ${bordered ? "border border-gray-200" : "border-0"} rounded-lg shadow-sm ${className}`}
    >
      {children}
    </div>
  );
};

// Stat Card
const StatCard = ({ icon: Icon, title, value, subtitle, color }) => {
  const { t } = useTranslation();
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <ClassicCard className="p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div className={`p-3 rounded-lg ${colors[color]}`}>
          <Icon className="text-xl" />
        </div>
      </div>
    </ClassicCard>
  );
};

// ==================== LEVEL HIERARCHY COMPONENT ====================

const LevelHierarchy = ({ levels, onChapterClick }) => {
  const { t } = useTranslation();
  const [expandedLevels, setExpandedLevels] = useState({});
  const [expandedModules, setExpandedModules] = useState({});

  const toggleLevel = (levelId) => {
    setExpandedLevels((prev) => ({
      ...prev,
      [levelId]: !prev[levelId],
    }));
  };

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  return (
    <div className="space-y-4">
      {levels?.map((level, levelIdx) => {
        const isLevelExpanded = expandedLevels[level.id];
        const levelProgress = level.completion_percent || 0;
        const levelStatus = level.status;

        return (
          <ClassicCard key={level.id || levelIdx} className="overflow-hidden">
            {/* Level Header */}
            <div
              className={`flex items-center justify-between p-4 cursor-pointer transition-colors border-b border-gray-100 ${
                levelStatus === "locked"
                  ? "opacity-60 bg-gray-50"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => {
                if (levelStatus !== "locked") {
                  toggleLevel(level.id);
                }
              }}
            >
              <div className="flex items-center gap-3 flex-1">
                <div
                  className={`w-2 h-2 rounded-full ${
                    levelProgress === 100
                      ? "bg-green-500"
                      : levelProgress > 0
                        ? "bg-blue-500"
                        : "bg-gray-300"
                  }`}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <FaTrophy className="text-amber-500 text-sm" />
                    <h4 className="font-medium text-gray-900">{level.title}</h4>
                    {levelStatus === "locked" && (
                      <span className="text-xs text-gray-400 ml-2">
                        <FaLock className="inline mr-1 text-xs" /> Locked
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all"
                          style={{ width: `${levelProgress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">
                        {levelProgress}%
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {level.completed_topics || 0}/{level.total_topics || 0}{" "}
                      {t("progressStats.topics")}
                    </span>
                  </div>
                </div>
              </div>
              {levelStatus !== "locked" && (
                <FaChevronRight
                  className={`text-gray-400 text-sm transition-transform ${
                    isLevelExpanded ? "rotate-90" : ""
                  }`}
                />
              )}
            </div>

            {/* Modules inside Level */}
            {isLevelExpanded && level.modules?.length > 0 && (
              <div className="bg-gray-50/30 p-3 space-y-3">
                {level.modules.map((module, moduleIdx) => {
                  const isModuleExpanded = expandedModules[module.module_id];
                  const moduleProgress = module.progress_percent || 0;

                  return (
                    <ClassicCard
                      key={module.module_id || moduleIdx}
                      className="overflow-hidden"
                    >
                      {/* Module Header */}
                      <div
                        className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100"
                        onClick={() => toggleModule(module.module_id)}
                      >
                        <div className="flex items-center gap-2 flex-1">
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${
                              moduleProgress === 100
                                ? "bg-green-500"
                                : moduleProgress > 0
                                  ? "bg-blue-500"
                                  : "bg-gray-300"
                            }`}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <FaFolderOpen className="text-blue-500 text-xs" />
                              <span className="text-sm font-medium text-gray-800">
                                {module.module_title}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 mt-1">
                              <div className="flex items-center gap-1">
                                <div className="w-16 h-1 bg-gray-200 rounded-full">
                                  <div
                                    className="h-1 bg-blue-500 rounded-full"
                                    style={{ width: `${moduleProgress}%` }}
                                  />
                                </div>
                                <span className="text-xs text-gray-400">
                                  {moduleProgress}%
                                </span>
                              </div>
                              <span className="text-xs text-gray-400">
                                {module.completed_topics || 0}/
                                {module.total_topics || 0} Topics
                              </span>
                            </div>
                          </div>
                        </div>
                        <FaChevronRight
                          className={`text-gray-400 text-xs transition-transform ${
                            isModuleExpanded ? "rotate-90" : ""
                          }`}
                        />
                      </div>

                      {/* Chapters inside Module */}
                      {isModuleExpanded && module.chapters?.length > 0 && (
                        <div className="bg-white p-2 space-y-1">
                          {module.chapters.map((chapter, chIdx) => (
                            <div
                              key={chapter.chapter_id || chIdx}
                              className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 transition-colors cursor-pointer"
                              onClick={() =>
                                onChapterClick?.(chapter.chapter_id)
                              }
                            >
                              <div className="w-5 text-center">
                                {chapter.progress_percent === 100 ? (
                                  <FaCheckCircle className="text-green-500 text-xs" />
                                ) : chapter.progress_percent > 0 ? (
                                  <FaSpinner className="text-blue-500 text-xs" />
                                ) : (
                                  <FaLock className="text-gray-300 text-xs" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <FaFileAlt className="text-gray-400 text-xs" />
                                  <span className="text-sm text-gray-700">
                                    {chapter.chapter_title}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-gray-500 min-w-[35px] text-right">
                                  {chapter.progress_percent || 0}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </ClassicCard>
                  );
                })}
              </div>
            )}
          </ClassicCard>
        );
      })}
    </div>
  );
};

// ==================== HELPER FUNCTIONS ====================

// Get accurate level data from levels array (not from current_learning)
const getAccurateLevelData = (levels, currentLevelId) => {
  if (!levels || !currentLevelId) return null;
  return levels.find((level) => level.id === currentLevelId);
};

// Get accurate stats from levels array
const getAccurateStatsFromLevels = (levels) => {
  if (!levels || levels.length === 0) {
    return {
      totalTopics: 0,
      completedTopics: 0,
      totalLessons: 0,
      completedLessons: 0,
      overallProgress: 0,
    };
  }

  let totalTopics = 0;
  let completedTopics = 0;
  let totalLessons = 0;
  let completedLessons = 0;

  levels.forEach((level) => {
    totalTopics += level.total_topics || 0;
    completedTopics += level.completed_topics || 0;
    totalLessons += level.total_lessons || 0;
    // Note: completed_lessons might need to be calculated from module/chapter level
    // For now using completion_percent to estimate
    completedLessons += Math.round(
      ((level.completion_percent || 0) * (level.total_lessons || 0)) / 100,
    );
  });

  const overallProgress =
    totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  return {
    totalTopics,
    completedTopics,
    totalLessons,
    completedLessons,
    overallProgress,
  };
};

// ==================== CURRENT FOCUS COMPONENT ====================

const CurrentFocus = ({
  currentLearning,
  levels,
  onContinue,
  stats, // ← ADD THIS - stats object pass karo
}) => {
  const { t } = useTranslation();

  // Get accurate level data from levels array
  const accurateLevel = getAccurateLevelData(
    levels,
    currentLearning?.level?.id,
  );

  // ✅ FIX: Topic progress ko stats se lo, current_learning se nahi
  const topicProgressPercent =
    stats?.current_topic_progress?.progress_percent || 0;
  const readContents = stats?.current_topic_progress?.read_contents || 0;
  const totalContents = stats?.current_topic_progress?.total_contents || 0;

  const levelProgress = accurateLevel?.completion_percent || 0;
  const levelTotalTopics = accurateLevel?.total_topics || 0;
  const levelCompletedTopics = accurateLevel?.completed_topics || 0;
  const levelTotalLessons = accurateLevel?.total_lessons || 0;
  const levelCompletedLessons = accurateLevel?.completed_lessons || 0;

  if (!currentLearning) {
    return (
      <ClassicCard className="p-6 text-center">
        <FaBookOpen className="text-4xl text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">{t("progressStats.noActiveLearning")}</p>
        <button className="mt-3 text-blue-600 text-sm font-medium hover:underline">
          {t("progressStats.browseCourses")} →
        </button>
      </ClassicCard>
    );
  }

  return (
    <ClassicCard className="overflow-hidden">
      <div className="bg-blue-50 px-4 py-2 border-b border-blue-100">
        <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
          <FiTarget className="text-blue-600" />
          {t("progressStats.currentFocus")}
        </h3>
      </div>
      <div className="p-4">
        {/* Program */}
        {currentLearning.program && (
          <div className="mb-3">
            <span className="text-xs font-medium text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
              {currentLearning.program.title}
            </span>
          </div>
        )}

        {/* Level - Using accurate data from levels array */}
        {accurateLevel && (
          <div className="flex items-start gap-2 mb-3">
            <FaTrophy className="text-amber-500 text-sm mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">
                {t("progressStats.level")}
              </p>
              <p className="text-sm font-medium text-gray-900">
                {accurateLevel.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="text-gray-500">
                      {t("progressStats.levelProgress")}
                    </span>
                    <span className="text-gray-700">{levelProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full">
                    <div
                      className="h-1.5 bg-amber-500 rounded-full transition-all"
                      style={{ width: `${levelProgress}%` }}
                    />
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {levelCompletedTopics}/{levelTotalTopics}{" "}
                {t("progressStats.topicsCompleted")} • {levelCompletedLessons}/
                {levelTotalLessons} {t("progressStats.lessonsCompleted")}
              </p>
            </div>
          </div>
        )}

        {/* Module */}
        {currentLearning.module && (
          <div className="flex items-start gap-2 ml-4 mb-2">
            <FaFolderOpen className="text-blue-500 text-sm mt-0.5" />
            <div>
              <p className="text-xs text-gray-500">
                {t("progressStats.module")}
              </p>
              <p className="text-sm font-medium text-gray-900">
                {currentLearning.module.title}
              </p>
            </div>
          </div>
        )}

        {/* Chapter */}
        {currentLearning.chapter && (
          <div className="flex items-start gap-2 ml-8 mb-2">
            <FaFileAlt className="text-gray-400 text-sm mt-0.5" />
            <div>
              <p className="text-xs text-gray-500">
                {t("progressStats.chapter")}
              </p>
              <p className="text-sm text-gray-800">
                {currentLearning.chapter.title}
              </p>
            </div>
          </div>
        )}

        {/* Topic */}
        {currentLearning.topic && (
          <div className="flex items-start gap-2 ml-12 bg-amber-50 p-2 rounded-md -mx-2">
            <FaStar className="text-amber-500 text-sm mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">
                {t("progressStats.currentTopic")}
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {currentLearning.topic.title}
              </p>
            </div>
          </div>
        )}

        {/* ✅ FIXED: Topic Progress Bar - Now using stats instead of current_learning */}
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-600">
              {t("progressStats.topicProgress")}
            </span>
            <span className="font-medium text-blue-700">
              {topicProgressPercent}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full">
            <div
              className="h-2 bg-blue-500 rounded-full transition-all"
              style={{ width: `${topicProgressPercent}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1 text-right">
            {readContents}/{totalContents} Contents
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onContinue}
          className="w-full mt-4 py-2 bg-accent hover:opacity-90 text-white rounded text-sm font-medium cursor-pointer transition-colors flex items-center justify-center gap-2"
        >
          <FaPlayCircle size={12} /> {t("progressStats.continueLearning")}
        </button>
      </div>
    </ClassicCard>
  );
};

// Report Card Component
const ReportCard = ({ icon: Icon, title, description, color, onClick }) => {
  const { t } = useTranslation();
  const colorStyles = {
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      borderHover: "hover:border-purple-200",
    },
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      borderHover: "hover:border-blue-200",
    },
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      borderHover: "hover:border-emerald-200",
    },
  };

  const styles = colorStyles[color] || colorStyles.blue;

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-5 shadow-sm cursor-pointer transition-all hover:shadow-md ${styles.borderHover}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
    >
      <div
        className={`inline-flex p-2 rounded-md ${styles.bg} ${styles.text} mb-4`}
      >
        <Icon size={20} />
      </div>
      <h4 className="text-base font-semibold text-gray-800 mb-2">{title}</h4>
      <p className="text-sm text-gray-500 mb-4 leading-relaxed">
        {description}
      </p>
      <div className="flex items-center text-sm font-medium text-blue-600">
        <span>{t("progressStats.viewReport")}</span>
        <FaChevronRight size={12} className="ml-1" />
      </div>
    </div>
  );
};

// Main Component
export default function ProgressStats() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { dashboardData, isLoading, isError, message } = useSelector(
    (state) => state.dashboard,
  );

  useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch]);

  if (isLoading) return <Loader />;
  if (isError) return <Error message={message} />;

  const data = dashboardData?.data;
  if (!data) return null;

  const { current_learning, levels, stats } = data;

  // Calculate stats from levels array (ACCURATE DATA)
  const accurateStats = getAccurateStatsFromLevels(levels);

  const completedLevels =
    levels?.filter((l) => l.status === "completed").length || 0;
  const inProgressLevels =
    levels?.filter((l) => l.status === "unlocked").length || 0;

  // Use accurate stats instead of stats from API
  const accurateTotalTopics = accurateStats.totalTopics;
  const accurateCompletedTopics = accurateStats.completedTopics;
  const overallProgress = accurateStats.overallProgress;
  const totalLessons = accurateStats.totalLessons;
  const completedLessons = accurateStats.completedLessons;

  const currentTopicProgress = stats?.current_topic_progress;

  const handleContinueLearning = () => {
    if (current_learning?.topic?.id) {
      navigate(`/topics/${current_learning.topic.id}`);
    }
  };

  const handleChapterClick = (chapterId) => {
    if (chapterId) {
      navigate(`/learn/chapter/${chapterId}`);
    }
  };

  const navigationHandlers = {
    auditLogs: () => navigate("/audit-logs"),
    userProgress: () => navigate("/user-progress"),
    certification: () => navigate("/certification"),
  };

  const reports = [
    {
      key: "auditLogs",
      icon: FaClipboardList,
      title: t("progressStats.reports.auditLogs.title"),
      description: t("progressStats.reports.auditLogs.description"),
      color: "purple",
      onClick: navigationHandlers.auditLogs,
    },
    {
      key: "userProgress",
      icon: FaUserGraduate,
      title: t("progressStats.reports.userProgress.title"),
      description: t("progressStats.reports.userProgress.description"),
      color: "blue",
      onClick: navigationHandlers.userProgress,
    },
    {
      key: "certification",
      icon: FaCertificate,
      title: t("progressStats.reports.certificate.title"),
      description: t("progressStats.reports.certification.description"),
      color: "emerald",
      onClick: navigationHandlers.certification,
    },
  ];

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>{t("progressStats.pageTitle")}</PageTitle>
          <PageSubtitle>{t("progressStats.pageSubtitle")}</PageSubtitle>
        </PageHeaderLeft>
      </PageHeader>

      <PageBody>
        {/* Stats Row - Using accurate data from levels */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
          <StatCard
            icon={FaTrophy}
            title={t("progressStats.stats.levelsCompleted")}
            value={completedLevels}
            subtitle={`${inProgressLevels} ${t("progressStats.stats.inProgress")}`}
            color="blue"
          />
          <StatCard
            icon={FaCertificate}
            title={t("progressStats.stats.certificates")}
            value={stats?.certificates_earned || 0}
            subtitle={`${t("progressStats.stats.avgScore")} ${stats?.avg_topic_score || 0}%`}
            color="green"
          />
          <StatCard
            icon={FiBarChart2}
            title={t("progressStats.stats.avgScore")}
            value={`${stats?.avg_topic_score || 0}%`}
            subtitle={t("progressStats.stats.overallPerformance")}
            color="purple"
          />
          <StatCard
            icon={FaBookOpen}
            title={t("progressStats.stats.topicsCompleted")}
            value={`${accurateCompletedTopics}/${accurateTotalTopics}`}
            subtitle={`${overallProgress}% ${t("progressStats.stats.complete")}`}
            color="orange"
          />
        </div>

        {/* Main Content - 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Current Focus (1/3) */}
          <div>
            <CurrentFocus
              currentLearning={current_learning}
              levels={levels}
              stats={stats} // ← ADD THIS - stats pass karo
              onContinue={handleContinueLearning}
            />
            {/* Quick Stats - Using accurate data */}
            <ClassicCard className="mt-5 p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                {t("progressStats.quickStats.title")}
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    {t("progressStats.quickStats.totalTopics")}
                  </span>
                  <span className="font-medium text-gray-900">
                    {accurateTotalTopics}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    {t("progressStats.quickStats.completedTopics")}
                  </span>
                  <span className="font-medium text-green-600">
                    {accurateCompletedTopics}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    {t("progressStats.quickStats.totalLessons")}
                  </span>
                  <span className="font-medium text-gray-900">
                    {totalLessons}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    {t("progressStats.quickStats.completedLessons")}
                  </span>
                  <span className="font-medium text-green-600">
                    {completedLessons}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    {t("progressStats.quickStats.pendingQuizzes")}
                  </span>
                  <span className="font-medium text-orange-600">
                    {current_learning?.pending_quizzes || 0}
                  </span>
                </div>
              </div>
            </ClassicCard>
          </div>

          {/* Right Column - Level Hierarchy */}
          <div className="lg:col-span-2">
            <ClassicCard className="overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <FaTrophy className="text-amber-500" />
                  <h3 className="font-semibold text-gray-900">
                    {t("progressStats.levelHierarchy.title")}
                  </h3>
                  <span className="text-xs text-gray-400 ml-auto">
                    {levels?.length || 0}{" "}
                    {t("progressStats.levelHierarchy.levels")}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <LevelHierarchy
                  levels={levels || []}
                  onChapterClick={handleChapterClick}
                />
              </div>
            </ClassicCard>
          </div>
        </div>

        {/* Reports Section */}
        <div className="mt-5">
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-gray-800">
              {t("progressStats.reports.title")}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {t("progressStats.reports.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* {reports.map((report) => (
              <ReportCard key={report.key} {...report} />
            ))} */}
            {reports.map((report) => {
              const { key, ...reportProps } = report;
              return <ReportCard key={key} {...reportProps} />;
            })}
          </div>
        </div>
      </PageBody>
    </PageLayout>
  );
}

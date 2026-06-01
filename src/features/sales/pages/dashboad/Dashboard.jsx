import React, { useEffect, useState } from "react";
import {
  PageBody,
  PageHeader,
  PageHeaderLeft,
  PageLayout,
  PageSubtitle,
  PageTitle,
} from "../../common/layout";
import { getDashboardData } from "../../../../redux/slice/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../common/Loader";
import Error from "../../common/Error";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import {
  FaMedal,
  FaShieldAlt,
  FaUserGraduate,
  FaBookOpen,
  FaPlay,
  FaLayerGroup,
  FaBook,
  FaChevronDown,
  FaChevronUp,
  FaChevronRight,
} from "react-icons/fa";
import {
  FiTarget,
  FiTrendingUp,
  FiCalendar,
  FiPlayCircle,
  FiCheckCircle,
  FiChevronRight,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// ==================== COMPONENTS ====================

// Progress Ring Component
const ProgressRing = ({ percentage, size = 80 }) => {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          className="text-gray-200"
          strokeWidth="4"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          strokeWidth="4"
          stroke="#facc15"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold">{percentage}%</span>
      </div>
    </div>
  );
};

// Topic Card Component
const TopicCard = ({
  title,
  subtitle,
  progress,
  status,
  statusColor,
  onClick,
}) => {
  const { t } = useTranslation();

  const getStatusText = () => {
    if (status === "IN_PROGRESS") return t("dashboard.status.inProgress");
    if (status === "COMPLETED") return t("dashboard.status.completed");
    if (status === "PENDING") return t("dashboard.status.pending");
    return status;
  };

  return (
    <div
      className="rounded-xl shadow-sm p-4 flex items-center justify-between bg-white
       "
      onClick={onClick}
    >
      <div className="flex items-center gap-4 flex-1">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
          <FaBookOpen className="text-blue-600 text-xl" />
        </div>
        <div className="flex-1">
          <h2 className="text-sm sm:text-base font-semibold text-gray-800">
            {title}
          </h2>
          {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
          <div className="w-full h-1 bg-gray-200 rounded-full mt-2">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: statusColor }}
            />
          </div>
        </div>
      </div>
      <span
        className="text-xs font-semibold px-3 py-1 rounded-md whitespace-nowrap ml-2"
        style={{ color: statusColor, background: `${statusColor}20` }}
      >
        {getStatusText()}
      </span>
    </div>
  );
};

// Activity Item Component
const ActivityItem = ({
  icon,
  bg,
  color,
  title,
  time,
  actionText,
  onAction,
}) => {
  return (
    <div className="flex items-start gap-4">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center ${bg}`}
      >
        {React.cloneElement(icon, { className: `${color} text-xl` })}
      </div>
      <div className="flex-1">
        <h3 className="text-gray-800 font-semibold text-sm sm:text-base">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">{time}</p>
      </div>
      {actionText && (
        <button
          onClick={onAction}
          className="text-blue-600 text-xs font-semibold cursor-pointer"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

// Level Card Component - Using actual levels data
const SimpleLevelCard = ({ level, active, onClick }) => {
  const { t } = useTranslation();

  let statusConfig = {
    text: "",
    color: "",
    icon: null,
    bgColor: "",
  };

  if (level.status === "completed") {
    statusConfig = {
      text: t("dashboard.simpleLevel.completed"),
      color: "text-green-600",
      icon: <IoCheckmarkCircleOutline className="text-green-500 text-xl" />,
      bgColor: "bg-green-50",
    };
  } else if (level.status === "unlocked") {
    statusConfig = {
      text: t("dashboard.simpleLevel.inProgress"),
      color: "text-blue-600",
      icon: <FiTrendingUp className="text-blue-500 text-xl" />,
      bgColor: "bg-blue-50",
    };
  } else {
    statusConfig = {
      text: t("dashboard.simpleLevel.locked"),
      color: "text-gray-400",
      icon: <CiLock className="text-gray-400 text-xl" />,
      bgColor: "bg-gray-50",
    };
  }

  return (
    <div
      className={`bg-white shadow-sm rounded-lg p-4 text-center transition-all cursor-pointer hover:shadow-md ${
        !active ? "opacity-60" : ""
      }`}
      onClick={onClick}
    >
      <div
        className={`flex justify-center mb-2 p-2 rounded-full ${statusConfig.bgColor}`}
      >
        {statusConfig.icon}
      </div>
      <p className="text-sm font-bold text-gray-800">{level.title}</p>
      <p className={`text-xs font-semibold mt-1 ${statusConfig.color}`}>
        {statusConfig.text}
      </p>
      {level.completion_percent > 0 && level.completion_percent < 100 && (
        <div className="mt-2">
          <div className="w-full h-1 bg-gray-200 rounded-full">
            <div
              className="h-1 bg-blue-500 rounded-full"
              style={{ width: `${level.completion_percent}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {level.completion_percent}% {t("dashboard.simpleLevel.complete")}
          </p>
        </div>
      )}
    </div>
  );
};

// Progress Analytics Component - Using actual levels data
const ProgressAnalytics = ({ levels }) => {
  const { t } = useTranslation();
  const [expandedLevel, setExpandedLevel] = useState(null);
  const [expandedModule, setExpandedModule] = useState(null);

  useEffect(() => {
    if (levels && levels.length > 0 && !expandedLevel) {
      const firstUnlockedLevel = levels.find(
        (level) => level.status === "unlocked",
      );
      if (firstUnlockedLevel) {
        setExpandedLevel(firstUnlockedLevel.id);
      }
    }
  }, [levels]);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <FaShieldAlt className="text-blue-500" />
            {t("dashboard.levelProgress.title")}
          </h3>
        </div>
        <div className="p-4 max-h-[600px] overflow-y-auto">
          {levels?.map((level) => (
            <div key={level.id} className="mb-6 last:mb-0">
              {/* Level Header */}
              <div
                className={`flex items-center justify-between mb-2 p-2 rounded-lg cursor-pointer transition-colors ${
                  level.status === "locked" ? "opacity-60" : "hover:bg-gray-50"
                }`}
                onClick={() => {
                  if (level.status !== "locked") {
                    setExpandedLevel(
                      expandedLevel === level.id ? null : level.id,
                    );
                  }
                }}
              >
                <div className="flex items-center gap-2 flex-1">
                  {level.status !== "locked" &&
                    (expandedLevel === level.id ? (
                      <FaChevronUp className="text-gray-500 text-xs" />
                    ) : (
                      <FaChevronDown className="text-gray-500 text-xs" />
                    ))}
                  {level.status === "locked" && (
                    <CiLock className="text-gray-400 text-xs" />
                  )}
                  <span className="font-semibold text-gray-800">
                    {level.title}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({level.completed_topics || 0}/{level.total_topics || 0}{" "}
                    Topics)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-blue-600">
                    {level.completion_percent || 0}%
                  </span>
                </div>
              </div>

              {/* Level Progress Bar */}
              <div className="mb-3 pl-6">
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-500 rounded-full transition-all"
                    style={{ width: `${level.completion_percent || 0}%` }}
                  />
                </div>
              </div>

              {/* Modules inside Level */}
              {expandedLevel === level.id && level.modules?.length > 0 && (
                <div className="ml-6 mt-3 space-y-3">
                  {level.modules.map((module) => (
                    <div
                      key={module.module_id}
                      className="border border-gray-100 rounded-lg overflow-hidden"
                    >
                      {/* Module Header */}
                      <div
                        className="p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() =>
                          setExpandedModule(
                            expandedModule === module.module_id
                              ? null
                              : module.module_id,
                          )
                        }
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <FaLayerGroup className="text-green-600 text-sm flex-shrink-0" />
                          <span className="font-medium text-gray-800">
                            {module.module_title}
                          </span>
                          <div className="flex-shrink-0 ml-auto">
                            {expandedModule === module.module_id ? (
                              <FaChevronUp className="text-gray-500" />
                            ) : (
                              <FaChevronDown className="text-gray-500" />
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-500">
                            ({module.completed_topics || 0}/
                            {module.total_topics || 0} Topics)
                          </span>
                          <span className="text-sm font-semibold text-green-600">
                            {module.progress_percent || 0}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-200 rounded-full">
                          <div
                            className="h-1.5 bg-green-500 rounded-full transition-all"
                            style={{
                              width: `${module.progress_percent || 0}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Chapters with Topics inside Module */}
                      {expandedModule === module.module_id &&
                        module.chapters?.length > 0 && (
                          <div className="border-t border-gray-100 p-3 bg-white">
                            <p className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1">
                              <FaBook className="text-purple-500" />
                              {t("dashboard.chapters")}
                            </p>
                            <div className="space-y-3 max-h-[300px] overflow-y-auto">
                              {module.chapters.map((chapter) => (
                                <div key={chapter.chapter_id} className="pl-2">
                                  <div className="mb-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <FaBook className="text-purple-400 text-xs flex-shrink-0" />
                                      <span className="text-sm text-gray-700">
                                        {chapter.chapter_title}
                                      </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-xs text-gray-400">
                                        ({chapter.completed_topics || 0}/
                                        {chapter.total_topics || 0} Topics)
                                      </span>
                                      <span className="text-xs font-medium text-purple-600">
                                        {chapter.progress_percent || 0}%
                                      </span>
                                    </div>
                                  </div>
                                  <div className="w-full h-1 bg-gray-100 rounded-full">
                                    <div
                                      className="h-1 bg-purple-500 rounded-full transition-all"
                                      style={{
                                        width: `${chapter.progress_percent || 0}%`,
                                      }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Topic Contents Component
const TopicContents = ({ contents, currentTopicTitle }) => {
  const { t } = useTranslation();

  if (!contents || contents.length === 0) return null;

  return (
    <div className="mt-4">
      <h4 className="font-semibold text-sm mb-2">
        {currentTopicTitle || t("dashboard.currentTopics.topicContents")}
      </h4>
      <div className="space-y-2">
        {contents.map((content, index) => (
          <div
            key={content.id}
            className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
          >
            <div className="w-8 h-8 bg-white border border-gray-200 rounded flex items-center justify-center">
              {content.type === "text" ? (
                <FaBookOpen className="text-blue-500 text-sm" />
              ) : (
                <FaPlay className="text-blue-500 text-sm" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">
                {index + 1}. {content.title}
              </p>
              <p className="text-xs text-gray-500 capitalize">{content.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { dashboardData, isLoading, isError, message } = useSelector(
    (state) => state.dashboard,
  );

  const { profile } = useSelector((state) => state.profile);

  const [animateItems, setAnimateItems] = useState(false);

  useEffect(() => {
    dispatch(getDashboardData());
    setTimeout(() => setAnimateItems(true), 100);
  }, [dispatch]);

  if (isLoading) return <Loader />;
  if (isError) return <Error message={message} />;

  const data = dashboardData?.data;
  if (!data) return null;

  const {
    current_learning,
    levels,
    stats,
    last_certificate,
    next_action,
    current_topic_contents,
  } = data;

  // 🔥 IMPORTANT: Get current level ID from current_learning and find its accurate data from levels array
  const currentLevelId = current_learning?.level?.id;
  const currentLevelData = levels?.find((level) => level.id === currentLevelId);

  // Get current module and chapter data from the current level's accurate data
  const currentModuleId = current_learning?.module?.id;
  const currentModuleData = currentLevelData?.modules?.find(
    (module) => module.module_id === currentModuleId,
  );

  const currentChapterId = current_learning?.chapter?.id;
  const currentChapterData = currentModuleData?.chapters?.find(
    (chapter) => chapter.chapter_id === currentChapterId,
  );

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t("dashboard.greeting.morning");
    if (hour < 18) return t("dashboard.greeting.afternoon");
    return t("dashboard.greeting.evening");
  };

  const getUserName = () => {
    return profile?.name || "";
  };

  const displayedLevels = levels?.slice(0, 3) || [];
  const remainingLevels = levels?.slice(3) || [];

  const handleViewAllLevels = () => {
    navigate("/levels");
  };

  // const handleResumeTopic = () => {
  //   if (next_action?.topic?.id) {
  //     navigate(`/topics/${next_action.topic.id}`);
  //   } else if (current_learning?.topic?.id) {
  //     navigate(`/topics/${current_learning.topic.id}`);
  //   } else if (
  //     next_action?.type === "topic_quiz" &&
  //     next_action?.assessment_id
  //   ) {
  //     navigate(`/quiz/${next_action.assessment_id}`);
  //   }
  // };

  const handleResumeTopic = () => {
    navigate(`/chapters/${current_learning?.chapter?.id}`);
  };

  const handleTopicClick = (topicId) => {
    if (topicId) {
      navigate(`/topics/${topicId}`);
    }
  };

  const getNextActionTitle = () => {
    if (!next_action) return t("dashboard.nextAction.continueLearning");
    if (next_action.topic?.title)
      return `${t("dashboard.nextAction.next")}: ${next_action.topic.title}`;
    if (next_action.assessment_title)
      return `${t("dashboard.nextAction.next")}: ${next_action.assessment_title}`;
    return t("dashboard.nextAction.continueLearning");
  };

  // Using accurate data from levels array for hierarchy display
  const getCurrentHierarchy = () => {
    return {
      program: current_learning?.program?.title,
      level: currentLevelData?.title || current_learning?.level?.title,
      module:
        currentModuleData?.module_title || current_learning?.module?.title,
      chapter:
        currentChapterData?.chapter_title || current_learning?.chapter?.title,
      topic: current_learning?.topic?.title,
    };
  };

  const currentHierarchy = getCurrentHierarchy();

  // Get accurate progress percent from level data
  const accurateLevelProgress =
    currentLevelData?.completion_percent ||
    current_learning?.progress_percent ||
    0;

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>
            {getGreeting()}, {getUserName()}
          </PageTitle>
          <PageSubtitle>{t("dashboard.subtitle")}</PageSubtitle>
        </PageHeaderLeft>
      </PageHeader>

      <PageBody>
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 my-4">
          {/* Main Card - Current Topic with Hierarchy (Using accurate level data) */}
          <div
            className={`bg-[#1e63ff] lg:col-span-2 text-white rounded-xl p-5 transition-all duration-500 delay-100 transform ${
              animateItems
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-yellow-300 text-xs font-semibold mb-1">
                  {current_learning?.program?.title || "Program"}
                </p>

                <div className="text-xs text-white/80 mb-3">
                  {/* Level */}
                  {currentHierarchy.level && (
                    <div className="flex items-center gap-2 py-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-300/60"></div>
                      <span className="text-white/70">
                        {currentHierarchy.level}
                      </span>
                      <FiChevronRight
                        size={10}
                        className="text-white/40 ml-auto"
                      />
                    </div>
                  )}

                  {/* Module */}
                  {currentHierarchy.module && (
                    <div className="flex items-center gap-2 py-0.5 pl-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-300/60"></div>
                      <span className="text-white/70">
                        {currentHierarchy.module}
                      </span>
                      <FiChevronRight
                        size={10}
                        className="text-white/40 ml-auto"
                      />
                    </div>
                  )}

                  {/* Chapter */}
                  {currentHierarchy.chapter && (
                    <div className="flex items-center gap-2 py-0.5 pl-8">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-300/60"></div>
                      <span className="text-white/70">
                        {currentHierarchy.chapter}
                      </span>
                      <FiChevronRight
                        size={10}
                        className="text-white/40 ml-auto"
                      />
                    </div>
                  )}

                  {/* Topic - Active/Current */}
                  <div className="flex items-center gap-2 py-1 pl-12 mt-1 bg-white/5 rounded-md">
                    <div className="w-2 h-2 rounded-full bg-yellow-300"></div>
                    <span className="font-semibold text-white text-sm">
                      {currentHierarchy.topic}
                    </span>
                    <span className="text-[10px] text-yellow-300/80 ml-auto">
                      Current
                    </span>
                  </div>
                </div>

                <h2 className="text-lg font-semibold">
                  {current_learning?.topic?.title || ""}
                </h2>

                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>{t("dashboard.currentLearning.levelProgress")}</span>
                    <span>{accurateLevelProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-blue-300 rounded-full">
                    <div
                      className="h-2 bg-white rounded-full transition-all duration-700"
                      style={{ width: `${accurateLevelProgress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-3 flex gap-2 text-xs flex-wrap">
                  <span className="bg-white/20 px-2 py-1 rounded">
                    <FiCheckCircle className="inline mr-1" size={10} />
                    {currentLevelData?.completed_topics || 0}/
                    {currentLevelData?.total_topics || 0} Topics
                  </span>
                  <span className="bg-white/20 px-2 py-1 rounded">
                    <FaBookOpen className="inline mr-1" size={10} />
                    Level {currentLevelData?.title || ""}
                  </span>
                </div>
              </div>

              {/* Progress Ring - Using accurate level progress */}
              <div className="ml-4">
                <ProgressRing percentage={accurateLevelProgress} size={80} />
              </div>
            </div>

            {/* Current Topic Content Progress */}
            {stats?.current_topic_progress && (
              <div className="mt-3 bg-white/10 rounded p-2">
                <p className="text-xs mb-1">
                  {t("dashboard.currentLearning.currentTopicProgress")}:{" "}
                  {current_learning?.topic?.title}
                </p>
                <div className="w-full h-1.5 bg-blue-300 rounded-full">
                  <div
                    className="h-1.5 bg-yellow-300 rounded-full transition-all"
                    style={{
                      width: `${stats.current_topic_progress.progress_percent || 0}%`,
                    }}
                  />
                </div>
                <p className="text-right text-xs mt-1">
                  {stats.current_topic_progress.read_contents || 0}/
                  {stats.current_topic_progress.total_contents || 0} Contents
                </p>
              </div>
            )}

            <button
              className="mt-4 px-6 bg-white text-blue-600 text-sm py-2 rounded-full font-medium hover:shadow-lg transition-all flex items-center gap-2"
              onClick={handleResumeTopic}
            >
              <FiPlayCircle size={14} />
              {current_learning?.cta?.type === "resume"
                ? t("dashboard.currentLearning.resumeTopic")
                : t("dashboard.currentLearning.startTopic")}
            </button>
          </div>

          {/* Learning Path - Using actual levels data */}
          <div
            className={`border lg:col-span-3 border-gray-300 rounded-lg p-3 transition-all duration-500 delay-200 transform ${
              animateItems
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">
                {t("dashboard.learningPath.title")}
              </h3>
              <button
                className="text-blue-600 text-xs cursor-pointer hover:underline"
                onClick={handleViewAllLevels}
              >
                {t("dashboard.learningPath.viewAll")} ({levels?.length || 0}{" "}
                Levels)
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {displayedLevels.map((level) => (
                <SimpleLevelCard
                  key={level.id}
                  level={level}
                  active={level.status !== "locked"}
                  onClick={() => {
                    if (level.status !== "locked") {
                      navigate(`/levels/${level.id}`);
                    }
                  }}
                />
              ))}
            </div>
            {remainingLevels.length > 0 && (
              <div className="mt-3 text-center">
                <button
                  onClick={handleViewAllLevels}
                  className="text-xs text-blue-600 hover:underline"
                >
                  + {remainingLevels.length} more{" "}
                  {remainingLevels.length === 1 ? "level" : "levels"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Current Topics Section - Topic Cards with Contents */}
          <div
            className={`lg:col-span-2 border border-gray-300 rounded-lg p-3 transition-all duration-500 delay-300 transform ${
              animateItems
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">
                {t("dashboard.currentTopics.title")}
              </h3>
            </div>
            <div className="space-y-3">
              {/* Current Topic Card */}
              <TopicCard
                title={
                  current_learning?.topic?.title ||
                  t("dashboard.currentTopics.currentTopic")
                }
                subtitle={`${currentChapterData?.chapter_title || current_learning?.chapter?.title || "Chapter"} • ${currentModuleData?.module_title || current_learning?.module?.title || "Module"}`}
                progress={stats?.current_topic_progress?.progress_percent || 0}
                status="IN_PROGRESS"
                statusColor="#1e63ff"
                // onClick={handleResumeTopic}
              />

              {/* Last Completed Topic */}
              {current_learning?.last_completed_topic?.title && (
                <TopicCard
                  title={current_learning.last_completed_topic.title}
                  subtitle={`${t("dashboard.currentTopics.completed")} • ${currentChapterData?.chapter_title || current_learning?.chapter?.title || ""}`}
                  progress={100}
                  status="COMPLETED"
                  statusColor="#16a34a"
                  // onClick={() =>
                  //   handleTopicClick(current_learning.last_completed_topic.id)
                  // }
                />
              )}

              {/* Quiz Card */}
              <TopicCard
                title={t("dashboard.currentTopics.quizAssessment")}
                subtitle={t("dashboard.currentTopics.readyToTake")}
                progress={0}
                status="PENDING"
                statusColor="#f97316"
                // onClick={() => {
                //   if (next_action?.assessment_id) {
                //     navigate(`/quiz/${next_action.assessment_id}`);
                //   }
                // }}
              />
            </div>

            {/* Topic Contents - Directly from API response */}
            <TopicContents
              contents={current_topic_contents}
              currentTopicTitle={current_learning?.topic?.title}
            />
          </div>

          {/* Progress Analytics Section - Using actual levels data */}
          <div
            className={`lg:col-span-2 border border-gray-300 rounded-lg p-3 transition-all duration-500 delay-400 transform ${
              animateItems
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <ProgressAnalytics levels={levels || []} />
          </div>
        </div>

        {/* Latest Updates / Activity Section */}
        <div
          className={`mt-4 border border-gray-300 rounded-lg p-3 transition-all duration-500 delay-500 transform ${
            animateItems
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          <h3 className="font-semibold mb-4">
            {t("dashboard.latestUpdates.title")}
          </h3>
          <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
            {/* {next_action && (
              <>
                <ActivityItem
                  icon={<FiTarget />}
                  bg="bg-blue-100"
                  color="text-blue-600"
                  title={getNextActionTitle()}
                  time={t("dashboard.nextAction.readyToContinue")}
                  actionText={t("dashboard.latestUpdates.continue")}
                  onAction={handleResumeTopic}
                />
                <div className="border-t border-gray-300" />
              </>
            )} */}

            {last_certificate && (
              <ActivityItem
                icon={<FaMedal />}
                bg="bg-green-100"
                color="text-green-600"
                title={`${t("dashboard.latestUpdates.certificateEarned")}: ${last_certificate.meta?.context?.title || t("dashboard.latestUpdates.certificate")}`}
                time={`${t("dashboard.latestUpdates.score")}: ${last_certificate.percentage || 0}% • ${new Date(last_certificate.issued_at).toLocaleDateString()}`}
                actionText={t("dashboard.latestUpdates.view")}
                onAction={() =>
                  navigate(
                    `/certificate/${last_certificate?.assessment_attempt_id}`,
                  )
                }
              />
            )}

            <ActivityItem
              icon={<FaUserGraduate />}
              bg="bg-orange-100"
              color="text-orange-600"
              title={`${stats?.completed_levels || 0}/${stats?.total_levels || 0} ${t("dashboard.latestUpdates.levelsCompleted")}`}
              time={`${stats?.overall_avg_score || 0}% ${t("dashboard.latestUpdates.averageScore")} • ${stats?.remaining_levels || 0} ${t("dashboard.latestUpdates.moreToGo")}`}
              actionText={t("dashboard.latestUpdates.view")}
              onAction={handleViewAllLevels}
            />

            {/* {current_learning?.last_activity_date && (
              <ActivityItem
                icon={<FiCalendar />}
                bg="bg-purple-100"
                color="text-purple-600"
                title={t("dashboard.latestUpdates.lastLearningSession")}
                time={new Date(
                  current_learning.last_activity_date,
                ).toLocaleString()}
                actionText={t("dashboard.latestUpdates.resume")}
                onAction={handleResumeTopic}
              />
            )} */}
          </div>
        </div>
      </PageBody>
    </PageLayout>
  );
}

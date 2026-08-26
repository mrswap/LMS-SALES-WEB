import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  PageLayout,
  PageBody,
  PageHeader,
  PageHeaderLeft,
  PageTitle,
  PageSubtitle,
  PageHeaderRight,
} from "../../common/layout/index";
import { useDispatch, useSelector } from "react-redux";
import { getChapterById } from "../../../../redux/slice/coursePreviewSlice";
import {
  IoBookOutline,
  IoChevronForward,
  IoPlayCircle,
  IoCheckmarkCircle,
  IoLockClosed,
  IoTrendingUp,
  IoRibbonOutline,
  IoTimeOutline,
  IoPlay,
  IoListOutline,
  IoHelpCircle,
} from "react-icons/io5";
import Loader from "../../common/Loader";
import Error from "../../common/Error";
import { useTranslation } from "react-i18next";
import ReadMoreText from "../../common/ReadMoreText";
import Breadcrumb from "../../common/layout/Breadcrumb";

export default function Chapters() {
  const { chapterId: id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { currentChapter, isLoading, isError, message } = useSelector(
    (state) => state.course,
  );

  useEffect(() => {
    if (id) {
      dispatch(getChapterById(id));
    }
  }, [dispatch, id]);

  const topics = currentChapter?.topics || [];
  const completedTopics = currentChapter?.completed_topics || 0;
  const totalTopics = currentChapter?.total_topics || 0;
  const progress = currentChapter?.progress_percent || 0;
  const totalTime = topics.reduce(
    (acc, topic) => acc + (topic.estimated_duration || 0),
    0,
  );

  // Get next topic for CTA
  const nextTopic = topics.find((t) => {
    const isCompleted = t.is_completed === true || t.is_completed === 1;
    const isUnlocked = t.is_unlocked === true || t.is_unlocked === 1;
    return !isCompleted && isUnlocked;
  });

  const handleGiveQuiz = (assessmentId, e) => {
    e.stopPropagation();
    navigate(`/quiz/${assessmentId}`);
  };

  if (isLoading) return <Loader />;
  if (isError) return <Error message={message} />;
  if (!currentChapter) {
    return (
      <PageLayout>
        <PageBody>
          <div className="text-center py-20">
            <p className="text-gray-500">{t("chapters.emptyState.noData")}</p>
          </div>
        </PageBody>
      </PageLayout>
    );
  }

  const level = currentChapter?.parent_hierarchy?.level;
  const module = currentChapter?.parent_hierarchy?.module;
  const program = currentChapter?.parent_hierarchy?.program;

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>{t("chapters.pageTitle")}</PageTitle>
          <PageSubtitle>{t("chapters.pageSubtitle")}</PageSubtitle>
        </PageHeaderLeft>
        <PageHeaderRight />
      </PageHeader>
      <PageBody>
        <div className="mb-2">
          <Breadcrumb
            items={[
              {
                label: "Home",
                path: "/dashboard",
              },
              ...(program
                ? [
                    {
                      label: program.title,
                      path: "/levels",
                    },
                  ]
                : []),
              ...(level
                ? [
                    {
                      label: level.title,
                      path: `/levels/${level.id}`,
                    },
                  ]
                : []),
              ...(module
                ? [
                    {
                      label: module.title,
                      path: `/modules/${module.id}`,
                    },
                  ]
                : []),
              {
                label: currentChapter?.title,
              },
            ]}
          />
        </div>

        {/* Hero Banner – only image */}
        <div className="rounded-2xl overflow-hidden shadow-md">
          <img
            src={currentChapter?.thumbnail}
            className="w-full h-56 sm:h-72 lg:h-[450px] object-cover"
            alt={currentChapter?.title}
          />
        </div>

        {/* Chapter at a glance */}
        <div className="mt-6 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <IoRibbonOutline className="text-accent text-xl shrink-0" />
            <span className="text-lg font-bold text-gray-800 leading-tight">
              {currentChapter?.title?.replace(/\s*at a glance$/i, "")}
            </span>
            <span className="text-sm text-gray-600 leading-tight self-end">
              {t("chapters.atAGlance")}
            </span>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            <StatItem
              icon={<IoListOutline className="w-5 h-5 text-blue-500" />}
              label={t("chapters.stats.totalTopics")}
              value={totalTopics}
            />
            <StatItem
              icon={<IoCheckmarkCircle className="w-5 h-5 text-emerald-500" />}
              label={t("chapters.stats.completedTopics")}
              value={`${completedTopics}/${totalTopics}`}
            />
            <StatItem
              icon={<IoTrendingUp className="w-5 h-5 text-indigo-500" />}
              label={t("chapters.stats.chapterProgress")}
              value={`${Number(progress).toFixed(1)}%`}
            />
            <StatItem
              icon={<IoTimeOutline className="w-5 h-5 text-rose-500" />}
              label={t("chapters.stats.estimatedTime")}
              value={`${totalTime} min`}
            />
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-xl p-5 mt-4 shadow-sm border border-gray-100">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <IoBookOutline className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-2">
                {t("chapters.aboutSection.title")}
              </h3>
              <div className="text-sm text-gray-600">
                <ReadMoreText
                  text={
                    currentChapter?.description ||
                    t("chapters.aboutSection.noDescription")
                  }
                  maxLength={100}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Topics Section */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
              <IoListOutline className="text-blue-600" />
              {t("chapters.topicsSection.syllabus")}
            </h3>
            <p className="text-xs text-gray-500">
              {completedTopics} of {totalTopics}{" "}
              {t("chapters.topicsSection.topicsCompleted")}
            </p>
          </div>

          <div className="space-y-3">
            {topics.map((topic, index) => {
              const isUnlocked =
                topic.is_unlocked === true || topic.is_unlocked === 1;
              const isCompleted =
                topic.is_completed === true || topic.is_completed === 1;
              const isQuizAvailable =
                topic.is_quiz_available === true ||
                topic.is_quiz_available === 1;
              const isAssessmentAvailable =
                topic.assessment && topic.assessment !== null;
              const isPassed = topic.assessment_passed === true;

              return (
                <div
                  key={topic.id}
                  className={`bg-white rounded-xl p-4 transition-all duration-300 hover:shadow-md border
                    ${
                      isUnlocked && !isCompleted
                        ? "border-2 border-blue-500 shadow-lg"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className={`w-12 h-12 rounded-xl overflow-hidden relative flex items-center justify-center transition-all
                          ${
                            isCompleted
                              ? "bg-green-100"
                              : isUnlocked
                                ? "bg-blue-100"
                                : "bg-gray-100"
                          }`}
                      >
                        {isCompleted ? (
                          topic.thumbnail || currentChapter?.thumbnail ? (
                            <>
                              <img
                                src={
                                  topic.thumbnail || currentChapter?.thumbnail
                                }
                                alt={topic.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-green-500/20 rounded-xl">
                                <IoCheckmarkCircle className="w-6 h-6 text-green-600" />
                              </div>
                            </>
                          ) : (
                            <IoCheckmarkCircle className="w-6 h-6 text-green-600" />
                          )
                        ) : isUnlocked ? (
                          topic.thumbnail || currentChapter?.thumbnail ? (
                            <img
                              src={topic.thumbnail || currentChapter?.thumbnail}
                              alt={topic.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <IoPlay className="w-6 h-6 text-blue-600" />
                          )
                        ) : topic.thumbnail || currentChapter?.thumbnail ? (
                          <>
                            <img
                              src={topic.thumbnail || currentChapter?.thumbnail}
                              alt={topic.title}
                              className="w-full h-full object-cover opacity-50 grayscale"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl">
                              <IoLockClosed className="w-5 h-5 text-white/80" />
                            </div>
                          </>
                        ) : (
                          <IoLockClosed className="w-6 h-6 text-gray-400" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-xs font-medium text-gray-500">
                            {t("chapters.topicsSection.topicText")}
                          </p>
                          {!isUnlocked && (
                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                              <IoLockClosed className="w-3 h-3" />{" "}
                              {t("chapters.topicsSection.locked")}
                            </span>
                          )}
                          {isUnlocked && !isCompleted && (
                            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
                              {t("chapters.topicsSection.inProgress")}
                            </span>
                          )}
                          {isCompleted && (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                              {t("chapters.topicsSection.completed")}
                            </span>
                          )}
                          {topic.estimated_duration && (
                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                              <IoTimeOutline className="w-3 h-3" />{" "}
                              {topic.estimated_duration}{" "}
                              {t("chapters.topicsSection.min")}
                            </span>
                          )}
                        </div>
                        <h4 className="text-base font-semibold text-gray-800 mt-0.5">
                          {topic.title}
                        </h4>
                        {topic.description && (
                          <p className="text-xs text-gray-500 mt-1">
                            <ReadMoreText
                              text={topic.description}
                              maxLength={50}
                            />
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end md:flex-shrink-0">
                      {/* FAQ Button */}
                      <button
                        onClick={() => {
                          if (isUnlocked) {
                            navigate(`/faqs?type=topic&id=${topic.id}`);
                          }
                        }}
                        disabled={!isUnlocked}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1
                          ${
                            isUnlocked
                              ? "bg-orange-50 text-orange-600 hover:bg-orange-100 border border-orange-200 cursor-pointer"
                              : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                          }`}
                      >
                        <IoHelpCircle className="w-4 h-4" />
                        {t("chapters.buttons.faq")}
                      </button>

                      {/* Action Buttons */}
                      {isCompleted ? (
                        // Completed topic
                        <div className="flex gap-2">
                          <button
                            className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
                            onClick={() => navigate(`/topics/${topic.id}`)}
                          >
                            {t("chapters.buttons.view")} {/* now "Review" */}
                          </button>
                          {isPassed && isAssessmentAvailable && (
                            <button
                              className="px-4 py-2 rounded-lg text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 flex items-center gap-1"
                              onClick={() =>
                                navigate(`/certificate/${topic.assessment.id}`)
                              }
                            >
                              <IoCheckmarkCircle className="w-4 h-4" />
                              {t("chapters.buttons.viewCertificate")}
                            </button>
                          )}
                        </div>
                      ) : isQuizAvailable && isUnlocked ? (
                        // Unlocked, not completed, but quiz is available
                        <div className="flex gap-2">
                          <button
                            className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
                            onClick={() => navigate(`/topics/${topic.id}`)}
                          >
                            {t("chapters.buttons.view")}{" "}
                            {/* "View" (continue) */}
                          </button>
                          <button
                            onClick={(e) => {
                              if (isAssessmentAvailable) {
                                handleGiveQuiz(topic.assessment.id, e);
                              }
                            }}
                            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2
                              ${
                                isAssessmentAvailable
                                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md hover:opacity-90"
                                  : "bg-gray-100 text-gray-500 cursor-not-allowed"
                              }`}
                            disabled={!isAssessmentAvailable}
                          >
                            <IoHelpCircle className="w-4 h-4" />
                            {isAssessmentAvailable
                              ? t("chapters.topicsSection.giveQuiz")
                              : t("chapters.topicsSection.quizNotAvailable")}
                          </button>
                        </div>
                      ) : (
                        // Not completed, no quiz, or locked
                        <button
                          className={`px-4 py-2 rounded-lg text-sm font-medium
                            ${
                              isUnlocked
                                ? "bg-accent hover:opacity-90 text-white shadow-md cursor-pointer"
                                : "bg-gray-100 text-gray-500 cursor-not-allowed"
                            }`}
                          disabled={!isUnlocked}
                          onClick={() => {
                            if (isUnlocked) {
                              navigate(`/topics/${topic.id}`);
                            }
                          }}
                        >
                          {isUnlocked
                            ? t("chapters.buttons.continue") // "View"
                            : t("chapters.topicsSection.lockedButton")}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Sticky CTA */}
        <div className="fixed bottom-15 lg:bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 shadow-lg z-10">
          <div className="max-w-[1800px] mx-auto px-4  lg:px-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="hidden sm:block">
                <p className="text-sm text-gray-600">
                  {t("chapters.cta.continueJourney")}
                </p>
                <p className="text-xs text-gray-400">
                  {nextTopic
                    ? `${t("chapters.cta.next")}: ${nextTopic.title}`
                    : t("chapters.cta.allTopicsCompleted")}
                </p>
              </div>
              <button
                onClick={() => {
                  if (nextTopic) {
                    navigate(`/topics/${nextTopic.id}`);
                  }
                }}
                disabled={!nextTopic}
                className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2
                  ${
                    nextTopic
                      ? "bg-accent hover:opacity-90 text-white shadow-md cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                <IoPlayCircle className="w-5 h-5" />
                {nextTopic
                  ? t("chapters.cta.continueLearning")
                  : t("chapters.cta.allCompleted")}
                <IoChevronForward className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </PageBody>
    </PageLayout>
  );
}

// Stat helper
const StatItem = ({ icon, label, value }) => (
  <div className="bg-gray-50 rounded-lg p-3 flex flex-col items-center text-center hover:bg-gray-100 transition-colors">
    <div className="mb-1">{icon}</div>
    <span className="text-xs text-gray-500 font-medium">{label}</span>
    <span className="text-lg font-bold text-gray-800">{value}</span>
  </div>
);

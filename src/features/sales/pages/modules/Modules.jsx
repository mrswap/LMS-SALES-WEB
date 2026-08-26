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
import { getModuleById } from "../../../../redux/slice/coursePreviewSlice";
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
  IoDocumentTextOutline,
  IoHelpCircle,
} from "react-icons/io5";
import Loader from "../../common/Loader";
import Error from "../../common/Error";
import { useTranslation } from "react-i18next";
import ReadMoreText from "../../common/ReadMoreText";
import Breadcrumb from "../../common/layout/Breadcrumb";

export default function Modules() {
  const { moduleId: id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { currentModule, isLoading, isError, message } = useSelector(
    (state) => state.course,
  );

  useEffect(() => {
    if (id) {
      dispatch(getModuleById(id));
    }
  }, [dispatch, id]);

  const chapters = currentModule?.chapters || [];
  const progress = currentModule?.progress_percent || 0;
  const totalTopics = currentModule?.total_topics || 0;
  const completedTopics = currentModule?.completed_topics || 0;
  const completedChapters = chapters.filter(
    (c) => c.is_completed === true || c.is_completed === 1,
  ).length;
  const totalChapters = chapters.length;

  const calculateTotalTime = () => {
    let totalDuration = 0;
    chapters.forEach((chapter) => {
      if (chapter.topics) {
        chapter.topics.forEach((topic) => {
          if (topic.estimated_duration) {
            totalDuration += topic.estimated_duration;
          }
        });
      }
    });
    return totalDuration;
  };
  const totalTime = calculateTotalTime();

  const nextChapter = chapters.find(
    (c) => c.is_completed === false && c.is_unlocked === true,
  );

  if (isLoading) return <Loader />;
  if (isError) return <Error message={message} />;
  if (!currentModule) {
    return (
      <PageLayout>
        <PageBody>
          <div className="text-center py-20">
            <p className="text-gray-500">{t("modules.emptyState.noData")}</p>
          </div>
        </PageBody>
      </PageLayout>
    );
  }

  const level = currentModule?.parent_hierarchy?.level;
  const program = currentModule?.parent_hierarchy?.program;

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>{t("modules.pageTitle")}</PageTitle>
          <PageSubtitle>{t("modules.pageSubtitle")}</PageSubtitle>
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
              {
                label: currentModule?.title,
              },
            ]}
          />
        </div>

        {/* Hero Banner – only image, no overlay */}
        <div className="rounded-2xl overflow-hidden shadow-md">
          <img
            src={currentModule?.thumbnail}
            className="w-full h-56 sm:h-72 lg:h-[450px] object-cover"
            alt={currentModule?.title}
          />
        </div>

        {/* Module at a glance */}
        <div className="mt-6 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <IoRibbonOutline className="text-accent text-xl shrink-0" />
            <span className="text-lg font-bold text-gray-800 leading-tight">
              {currentModule?.title?.replace(/\s*at a glance$/i, "")}
            </span>
            <span className="text-sm text-gray-600 leading-tight self-end">
              {t("modules.atAGlance")}
            </span>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
            <StatItem
              icon={<IoBookOutline className="w-5 h-5 text-blue-500" />}
              label={t("modules.stats.totalChapters")}
              value={totalChapters}
            />
            <StatItem
              icon={
                <IoDocumentTextOutline className="w-5 h-5 text-purple-500" />
              }
              label={t("modules.stats.totalTopics")}
              value={totalTopics}
            />
            <StatItem
              icon={<IoCheckmarkCircle className="w-5 h-5 text-emerald-500" />}
              label={t("modules.stats.completedTopics")}
              value={`${completedTopics}/${totalTopics}`}
            />
            <StatItem
              icon={<IoTrendingUp className="w-5 h-5 text-indigo-500" />}
              label={t("modules.stats.moduleProgress")}
              value={`${Number(progress).toFixed(1)}%`}
            />
            <StatItem
              icon={<IoTimeOutline className="w-5 h-5 text-rose-500" />}
              label={t("modules.stats.estimatedTime")}
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
                {t("modules.aboutSection.title")}
              </h3>
              <div className="text-sm text-gray-600">
                <ReadMoreText
                  text={
                    currentModule?.description ||
                    t("modules.aboutSection.noDescription")
                  }
                  maxLength={100}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Chapters Section */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
              <IoDocumentTextOutline className="text-blue-600" />
              {t("modules.chaptersSection.syllabus")}
            </h3>
            <p className="text-xs text-gray-500">
              {completedChapters} of {totalChapters}{" "}
              {t("modules.chaptersSection.chaptersCompleted")}
            </p>
          </div>

          <div className="space-y-3">
            {chapters.map((chapter, index) => (
              <div
                key={chapter.id}
                className={`bg-white rounded-xl p-4 transition-all duration-300 hover:shadow-md border
                  ${
                    chapter.is_unlocked && !chapter.is_completed
                      ? "border-2 border-blue-500 shadow-lg"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className={`w-12 h-12 rounded-xl overflow-hidden relative flex items-center justify-center transition-all
                        ${
                          chapter.is_completed
                            ? "bg-green-100"
                            : chapter.is_unlocked
                              ? "bg-blue-100"
                              : "bg-gray-100"
                        }`}
                    >
                      {chapter.is_completed ? (
                        chapter.thumbnail ? (
                          <>
                            <img
                              src={chapter.thumbnail}
                              alt={chapter.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-green-500/20 rounded-xl">
                              <IoCheckmarkCircle className="w-6 h-6 text-green-600" />
                            </div>
                          </>
                        ) : (
                          <IoCheckmarkCircle className="w-6 h-6 text-green-600" />
                        )
                      ) : chapter.is_unlocked ? (
                        chapter.thumbnail ? (
                          <img
                            src={chapter.thumbnail}
                            alt={chapter.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <IoPlay className="w-6 h-6 text-blue-600" />
                        )
                      ) : chapter.thumbnail ? (
                        <>
                          <img
                            src={chapter.thumbnail}
                            alt={chapter.title}
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
                          {t("modules.chaptersSection.chapterText")} {index + 1}
                        </p>
                        {!chapter.is_unlocked && (
                          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                            <IoLockClosed className="w-3 h-3" />{" "}
                            {t("modules.chaptersSection.locked")}
                          </span>
                        )}
                        {chapter.is_unlocked && !chapter.is_completed && (
                          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
                            {t("modules.chaptersSection.inProgress")}
                          </span>
                        )}
                        {chapter.is_completed && (
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                            {t("modules.chaptersSection.completed")}
                          </span>
                        )}
                      </div>
                      <h4 className="text-base font-semibold text-gray-800 mt-0.5">
                        {chapter?.title}
                      </h4>
                      {chapter?.description && (
                        <p className="text-xs text-gray-500 mt-1">
                          <ReadMoreText
                            text={chapter.description}
                            maxLength={50}
                          />
                        </p>
                      )}
                      {chapter?.topics && (
                        <p className="text-xs text-gray-800 font-semibold mt-1">
                          {chapter.topics.length}{" "}
                          {t("modules.chaptersSection.topics")} •{" "}
                          {
                            chapter.topics.filter(
                              (t) =>
                                t.is_completed === true || t.is_completed === 1,
                            ).length
                          }{" "}
                          {t("modules.chaptersSection.completedText")}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end md:flex-shrink-0">
                    <button
                      onClick={() => {
                        if (chapter.is_unlocked) {
                          navigate(`/faqs?type=chapter&id=${chapter.id}`);
                        }
                      }}
                      disabled={!chapter.is_unlocked}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1
                        ${
                          chapter.is_unlocked
                            ? "bg-orange-50 text-orange-600 hover:bg-orange-100 border border-orange-200 cursor-pointer"
                            : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                        }`}
                    >
                      <IoHelpCircle className="w-4 h-4" />
                      {t("modules.buttons.faq")}
                    </button>

                    {chapter.is_completed ? (
                      <button
                        className="px-4 py-2 rounded-md text-sm font-semibold bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-all flex items-center gap-1"
                        onClick={() => navigate(`/chapters/${chapter.id}`)}
                      >
                        <IoBookOutline className="w-4 h-4" />
                        {t("modules.buttons.view")}
                      </button>
                    ) : (
                      <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1
                          ${
                            chapter.is_unlocked
                              ? "bg-accent hover:opacity-90 text-white shadow-md cursor-pointer"
                              : "bg-gray-100 text-gray-500 cursor-not-allowed"
                          }`}
                        disabled={!chapter.is_unlocked}
                        onClick={() => {
                          if (chapter.is_unlocked) {
                            navigate(`/chapters/${chapter.id}`);
                          }
                        }}
                      >
                        <IoPlay className="w-4 h-4" />
                        {chapter.is_unlocked
                          ? t("modules.buttons.continue")
                          : t("modules.buttons.locked")}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Sticky CTA */}
        <div className="fixed bottom-15 lg:bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 shadow-lg z-10">
          <div className="max-w-[1800px] mx-auto px-4  lg:px-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="hidden sm:block">
                <p className="text-sm text-gray-600">
                  {t("modules.cta.continueJourney")}
                </p>
                <p className="text-xs text-gray-400">
                  {nextChapter
                    ? `${t("modules.cta.next")}: ${nextChapter.title}`
                    : t("modules.cta.allChaptersCompleted")}
                </p>
              </div>
              <button
                onClick={() => {
                  if (nextChapter) {
                    navigate(`/chapters/${nextChapter.id}`);
                  }
                }}
                disabled={!nextChapter}
                className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2
                  ${
                    nextChapter
                      ? "bg-accent hover:opacity-90 text-white shadow-md cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                <IoPlayCircle className="w-5 h-5" />
                {nextChapter
                  ? t("modules.cta.continueLearning")
                  : t("modules.cta.allCompleted")}
                <IoChevronForward className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </PageBody>
    </PageLayout>
  );
}

// Stat helper component
const StatItem = ({ icon, label, value }) => (
  <div className="bg-gray-50 rounded-lg p-3 flex flex-col items-center text-center hover:bg-gray-100 transition-colors">
    <div className="mb-1">{icon}</div>
    <span className="text-xs text-gray-500 font-medium">{label}</span>
    <span className="text-lg font-bold text-gray-800">{value}</span>
  </div>
);

import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  PageLayout,
  PageBody,
  PageHeader,
  PageHeaderLeft,
  PageTitle,
  PageSubtitle,
  PageHeaderRight,
} from "../../common/layout/index";
import img from "../../../../assets/sales/pacemaker.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getModuleById } from "../../../../redux/slice/coursePreviewSlice";
import {
  IoArrowBack,
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

  // Calculate total estimated time from topics
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

  // Get current chapter (first unlocked and not completed)
  const currentChapter =
    chapters.find((c) => c.is_unlocked === true && c.is_completed === false) ||
    chapters.find((c) => c.is_unlocked === true);

  // Get next chapter for CTA
  const nextChapter = chapters.find(
    (c) => c.is_completed === false && c.is_unlocked === true,
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error message={message} />;
  }

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
        {/* 🔹 Hero Banner */}
        {/* <div className="relative rounded-2xl overflow-hidden shadow-xl group">
          <img
            src={currentModule?.thumbnail}
            className="w-full h-56 sm:h-72 lg:h-[450px] object-cover"
            alt="Module Banner"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="mb-3">
              {currentModule?.parent_hierarchy?.level?.title && (
                <div className="flex items-center gap-2 py-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-300/60"></div>
                  <span className="text-white/70 text-xs">
                    {currentModule.parent_hierarchy.level.title}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2 py-1 pl-4">
                <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                <span className="font-semibold text-white text-sm border-b border-blue-300/80">
                  {currentModule?.title}
                </span>
              </div>

              <div className="mt-2 text-xs text-white/60 pl-8">
                {totalChapters} {t("modules.badge.chapters")} • {totalTopics}{" "}
                {t("modules.badge.topics")}
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              {currentModule?.title || "-"}
            </h1>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm hover:bg-white px-3 py-1.5 rounded-xl text-sm font-medium transition-all hover:shadow-lg flex items-center gap-1"
          >
            <IoArrowBack className="w-4 h-4" /> {t("modules.backButton")}
          </button>
        </div> */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl group">
          <img
            src={currentModule?.thumbnail}
            className="w-full h-56 sm:h-72 lg:h-[450px] object-cover"
            alt="Module Banner"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="mb-3">
              {currentModule?.parent_hierarchy?.level?.title && (
                <div className="flex items-center gap-2 py-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-300/60"></div>
                  <span className="text-white/80 text-xs">
                    {currentModule.parent_hierarchy.level.title}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2 py-1 pl-4">
                <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                <span className="font-semibold text-white text-sm border-b border-blue-300/80">
                  {currentModule?.title}
                </span>
              </div>

              <div className="mt-2 text-xs text-white/80 pl-8">
                {totalChapters} {t("modules.badge.chapters")} • {totalTopics}{" "}
                {t("modules.badge.topics")}
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight drop-shadow-lg">
              {currentModule?.title || "-"}
            </h1>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white px-3 py-1.5 rounded-xl text-sm font-medium transition-all flex items-center gap-1"
          >
            <IoArrowBack className="w-4 h-4" /> {t("modules.backButton")}
          </button>
        </div>

        {/* 🔹 Stats & Progress Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-blue-600 font-medium">
                  {t("modules.stats.progress")}
                </p>
                <h2 className="text-3xl font-bold text-blue-700 mt-1">
                  {/* {Math.round(progress)}% */}
                  {Number(progress || 0).toFixed(1)}%
                </h2>
              </div>
              <IoTrendingUp className="text-blue-400 w-8 h-8" />
            </div>
            <div className="w-full h-2 bg-blue-200 rounded-full mt-3">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-purple-600 font-medium">
                  {t("modules.stats.completed")}
                </p>
                <h2 className="text-3xl font-bold text-purple-700 mt-1">
                  {completedTopics}/{totalTopics}
                </h2>
              </div>
              <IoRibbonOutline className="text-purple-400 w-8 h-8" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-green-600 font-medium">
                  {t("modules.stats.estTime")}
                </p>
                <h2 className="text-3xl font-bold text-green-700 mt-1">
                  {totalTime} min
                </h2>
              </div>
              <IoTimeOutline className="text-green-400 w-8 h-8" />
            </div>
            <p className="text-xs text-green-600 mt-2">
              {t("modules.stats.totalLearningTime")}
            </p>
          </div>
        </div>

        {/* 🔹 About Section */}
        <div className="bg-white rounded-xl p-5 mt-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <IoBookOutline className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-2">
                {t("modules.aboutSection.title")}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                <ReadMoreText
                  text={currentModule?.description}
                  maxLength={100}
                />
              </p>
            </div>
          </div>
        </div>

        {/* 🔹 Chapters Section */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
              <IoDocumentTextOutline className="text-blue-600" />
              {t("modules.chaptersSection.title")}
            </h3>
            <p className="text-xs text-gray-500">
              {completedChapters} of {totalChapters} completed
            </p>
          </div>

          <div className="space-y-3">
            {chapters.map((chapter, index) => (
              <div
                key={chapter.id}
                className={`bg-white rounded-xl p-4 transition-all duration-300 hover:shadow-md 
        ${chapter.is_unlocked && !chapter.is_completed ? "border-2 border-blue-500 shadow-lg" : "border border-gray-200 hover:border-blue-300"}`}
              >
                {/* Responsive: md screen pe flex-row, small screen pe flex-col */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between md:flex-wrap gap-3">
                  {/* Left side content */}
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all
              ${chapter.is_completed ? "bg-green-100" : chapter.is_unlocked ? "bg-blue-100" : "bg-gray-100"}`}
                    >
                      {chapter.is_completed ? (
                        <IoCheckmarkCircle className="w-6 h-6 text-green-600" />
                      ) : chapter.is_unlocked ? (
                        <IoPlay className="w-6 h-6 text-blue-600" />
                      ) : (
                        <IoLockClosed className="w-6 h-6 text-gray-400" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-xs font-medium text-gray-500">
                          {t("modules.chaptersSection.chapterText")} {index + 1}
                        </p>
                        {chapter.is_unlocked && !chapter.is_completed && (
                          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
                            {t("modules.chaptersSection.current")}
                          </span>
                        )}
                        {chapter.is_completed && (
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                            {t("modules.chaptersSection.completed")}
                          </span>
                        )}
                        {!chapter.is_unlocked && (
                          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                            <IoLockClosed className="w-3 h-3" />{" "}
                            {t("modules.chaptersSection.locked")}
                          </span>
                        )}
                      </div>
                      <h4 className="text-base font-semibold text-gray-800 mt-0.5">
                        {chapter?.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        <ReadMoreText
                          text={chapter?.description}
                          maxLength={50}
                        />
                      </p>
                      {chapter?.topics && (
                        <p className="text-xs text-gray-400 mt-2 flex items-center gap-2">
                          <span>
                            {chapter.topics.length}{" "}
                            {t("modules.chaptersSection.topics")}
                          </span>
                          <span>•</span>
                          <span>
                            {
                              chapter.topics.filter(
                                (t) =>
                                  t.is_completed === true ||
                                  t.is_completed === 1,
                              ).length
                            }{" "}
                            {t("modules.chaptersSection.completedText")}
                          </span>
                          <span>•</span>
                          <span>
                            {chapter.topics.reduce(
                              (acc, t) => acc + (t.estimated_duration || 0),
                              0,
                            )}{" "}
                            {t("modules.chaptersSection.min")}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Buttons - always end (right side), mobile pe niche */}
                  <div className="flex gap-2 justify-end md:flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
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
                      FAQ
                    </button>

                    {chapter?.is_completed ? (
                      <button
                        className="w-full py-2 px-4 cursor-pointer rounded-md text-sm font-semibold justify-center bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/chapters/${chapter.id}`);
                        }}
                      >
                        {t("modules.buttons.view")}
                      </button>
                    ) : (
                      <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer
                ${
                  chapter.is_unlocked
                    ? "bg-accent hover:opacity-90 text-white shadow-md"
                    : "bg-gray-100 text-gray-500 cursor-not-allowed"
                }`}
                        disabled={!chapter.is_unlocked}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (chapter.is_unlocked) {
                            navigate(`/chapters/${chapter.id}`);
                          }
                        }}
                      >
                        {chapter.is_unlocked
                          ? t("modules.buttons.continue")
                          : t("modules.chaptersSection.lockedButton")}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 Bottom Sticky CTA */}
        <div className="fixed bottom-15 md:bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 shadow-lg z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="hidden sm:block">
                <p className="text-sm text-gray-600">
                  {t("modules.cta.continueJourney")}
                </p>
                <p className="text-xs text-gray-400">
                  {nextChapter
                    ? `${t("modules.cta.nextChapter")} ${nextChapter.title}`
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
                className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-semibold  flex items-center justify-center gap-2
                  ${
                    nextChapter
                      ? "bg-accent hover:cursor-pointer text-white shadow-md "
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

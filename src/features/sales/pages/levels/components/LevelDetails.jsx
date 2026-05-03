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
} from "../../../common/layout/index";
import img from "../../../../../assets/sales/pacemaker.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getLevelById } from "../../../../../redux/slice/coursePreviewSlice";
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
  IoHelpCircle,
} from "react-icons/io5";
import Loader from "../../../common/Loader";
import Error from "../../../common/Error";
import { useTranslation } from "react-i18next";

export default function LevelDetails() {
  const { levelId: id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { currentLevel, isLoading, isError, message } = useSelector(
    (state) => state.course,
  );

  console.log("currentLevel from API:", currentLevel);

  useEffect(() => {
    if (id) {
      dispatch(getLevelById(id));
    }
  }, [dispatch, id]);

  // Use actual modules from API response
  const modules = currentLevel?.modules || [];

  // Calculate progress based on actual completed modules
  const completedModules = modules.filter(
    (m) => m.is_completed === true,
  ).length;
  const totalModules = modules.length;
  const progress =
    totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

  // Calculate total estimated time (example: 20-30 min per module based on chapters)
  const calculateTotalTime = () => {
    let totalTopics = 0;
    modules.forEach((module) => {
      if (module.chapters) {
        module.chapters.forEach((chapter) => {
          if (chapter.topics) {
            totalTopics += chapter.topics.length;
          }
        });
      }
    });
    // Assume 5 minutes per topic
    return totalTopics * 5;
  };

  const totalTime = calculateTotalTime();

  // Get current module (first unlocked and not completed, or first unlocked)
  const currentModule =
    modules.find((m) => m.is_unlocked === true && m.is_completed === false) ||
    modules.find((m) => m.is_unlocked === true);

  // Get next module for CTA
  const nextModule = modules.find(
    (m) => m.is_completed === false && m.is_unlocked === true,
  );

  // Get level number from id or title
  const levelNumber = currentLevel?.title?.match(/\d+/)?.[0] || id || 1;

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error message={message} />;
  }

  if (!currentLevel) {
    return (
      <PageLayout>
        <PageBody>
          <div className="text-center py-20">
            <p className="text-gray-500">
              {t("levelDetails.emptyState.noData")}
            </p>
          </div>
        </PageBody>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>{t("levelDetails.pageTitle")}</PageTitle>
          <PageSubtitle>{t("levelDetails.pageSubtitle")}</PageSubtitle>
        </PageHeaderLeft>
        <PageHeaderRight />
      </PageHeader>
      <PageBody>
        {/* 🔹 Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl group">
          <img
            src={currentLevel?.thumbnail}
            className="w-full h-56 sm:h-72 lg:h-[450px] object-cover"
            alt="Level Banner"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-500/80 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium">
                {t("levelDetails.levelBadge")} {levelNumber} • {totalModules}{" "}
                {t("levelDetails.modulesCount")}
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs flex items-center gap-1">
                <IoTimeOutline className="w-3 h-3" />{" "}
                {t("levelDetails.stats.selfPaced")}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              {currentLevel?.title}
            </h1>
            <p className="text-sm sm:text-base text-white/80 mt-2 max-w-2xl">
              {currentLevel?.description}
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm hover:bg-white px-3 py-1.5 rounded-xl text-sm font-medium transition-all hover:shadow-lg flex items-center gap-1"
          >
            <IoArrowBack className="w-4 h-4" /> {t("levelDetails.backButton")}
          </button>
        </div>

        {/* 🔹 Stats & Progress Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-blue-600 font-medium">
                  {t("levelDetails.stats.progress")}
                </p>
                <h2 className="text-3xl font-bold text-blue-700 mt-1">
                  {Math.round(progress)}%
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
                  {t("levelDetails.stats.completed")}
                </p>
                <h2 className="text-3xl font-bold text-purple-700 mt-1">
                  {completedModules}/{totalModules}
                </h2>
              </div>
              <IoRibbonOutline className="text-purple-400 w-8 h-8" />
            </div>
            <p className="text-xs text-purple-600 mt-2">
              {t("levelDetails.stats.modulesCompleted")}
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-green-600 font-medium">
                  {t("levelDetails.stats.estTime")}
                </p>
                <h2 className="text-3xl font-bold text-green-700 mt-1">
                  {totalTime} min
                </h2>
              </div>
              <IoTimeOutline className="text-green-400 w-8 h-8" />
            </div>
            <p className="text-xs text-green-600 mt-2">
              {t("levelDetails.stats.totalLearningTime")}
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
                {t("levelDetails.aboutSection.title")}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {currentLevel?.description}
              </p>
            </div>
          </div>
        </div>

        {/* 🔹 Modules Section */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
              <IoPlayCircle className="text-blue-600" />
              {t("levelDetails.modulesSection.title")}
            </h3>
            <p className="text-xs text-gray-500">
              {completedModules} of {totalModules} completed
            </p>
          </div>

          <div className="space-y-3">
            {modules.map((module, index) => (
              <div
                key={module.id}
                className={`bg-white rounded-xl p-4 transition-all duration-300 hover:shadow-md 
                    ${module.is_unlocked && !module.is_completed ? "border-2 border-blue-500 shadow-lg" : "border border-gray-200 hover:border-blue-300"}`}
              >
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all
                          ${module.is_completed ? "bg-green-100" : module.is_unlocked ? "bg-blue-100" : "bg-gray-100"}`}
                    >
                      {module.is_completed ? (
                        <IoCheckmarkCircle className="w-6 h-6 text-green-600" />
                      ) : module.is_unlocked ? (
                        <IoPlay className="w-6 h-6 text-blue-600" />
                      ) : (
                        <IoLockClosed className="w-6 h-6 text-gray-400" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-xs font-medium text-gray-500">
                          {t("levelDetails.modulesSection.moduleText")}{" "}
                          {index + 1}
                        </p>
                        {module.is_unlocked && !module.is_completed && (
                          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
                            {t("levelDetails.modulesSection.current")}
                          </span>
                        )}
                        {module.is_completed && (
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                            {t("levelDetails.modulesSection.completed")}
                          </span>
                        )}
                        {!module.is_unlocked && (
                          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                            <IoLockClosed className="w-3 h-3" />{" "}
                            {t("levelDetails.modulesSection.locked")}
                          </span>
                        )}
                      </div>
                      <h4 className="text-base font-semibold text-gray-800 mt-0.5">
                        {module?.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {module?.description}
                      </p>
                      {module?.chapters && (
                        <p className="text-xs text-gray-400 mt-1">
                          {module.chapters.length}{" "}
                          {t("levelDetails.modulesSection.chapters")} •{" "}
                          {module.chapters.reduce(
                            (acc, ch) => acc + (ch.topics?.length || 0),
                            0,
                          )}{" "}
                          {t("levelDetails.modulesSection.topics")}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (module.is_unlocked) {
                          navigate(`/faqs?type=module&id=${module.id}`);
                        }
                      }}
                      disabled={!module.is_unlocked}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1
    ${
      module.is_unlocked
        ? "bg-orange-50 text-orange-600 hover:bg-orange-100 border border-orange-200 cursor-pointer"
        : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
    }`}
                    >
                      <IoHelpCircle className="w-4 h-4" />
                      FAQ
                    </button>

                    {/* {!module?.is_completed && (
                      <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium 
                          ${
                            module.is_unlocked
                              ? "bg-accent hover:opacity-90 text-white shadow-md "
                              : "bg-gray-100 text-gray-500 cursor-not-allowed"
                          }`}
                        disabled={!module.is_unlocked}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (module.is_unlocked) {
                            navigate(`/modules/${module.id}`);
                          }
                        }}
                      >
                        {module.is_unlocked
                          ? t("levelDetails.buttons.continue")
                          : t("levelDetails.modulesSection.lockedButton")}
                      </button>
                    )} */}
                    {module?.is_completed ? (
                      <button
                        className="w-full py-2 px-4 cursor-pointer rounded-md text-sm font-semibold  justify-center bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/modules/${module.id}`);
                        }}
                      >
                        {t("levelDetails.buttons.view")}
                      </button>
                    ) : (
                      <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium 
      ${
        module.is_unlocked
          ? "bg-accent hover:opacity-90 text-white shadow-md cursor-pointer"
          : "bg-gray-100 text-gray-500 cursor-not-allowed"
      }`}
                        disabled={!module.is_unlocked}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (module.is_unlocked) {
                            navigate(`/modules/${module.id}`);
                          }
                        }}
                      >
                        {module.is_unlocked
                          ? t("levelDetails.buttons.continue")
                          : t("levelDetails.modulesSection.lockedButton")}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 Bottom Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 shadow-lg z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="hidden sm:block">
                <p className="text-sm text-gray-600">
                  {t("levelDetails.cta.continueJourney")}
                </p>
                <p className="text-xs text-gray-400">
                  {nextModule
                    ? `${t("levelDetails.cta.nextModule")} ${nextModule.title}`
                    : t("levelDetails.cta.allModulesCompleted")}
                </p>
              </div>
              <button
                onClick={() => {
                  if (nextModule) {
                    navigate(`/modules/${nextModule.id}`);
                  }
                }}
                disabled={!nextModule}
                className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-semibold  flex items-center justify-center gap-2
                  ${
                    nextModule
                      ? "bg-accent hover:opacity-90 text-white shadow-md hover:cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                <IoPlayCircle className="w-5 h-5" />
                {nextModule
                  ? t("levelDetails.cta.continueLearning")
                  : t("levelDetails.cta.allCompleted")}
                <IoChevronForward className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </PageBody>
    </PageLayout>
  );
}

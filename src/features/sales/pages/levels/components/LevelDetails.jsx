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
} from "../../../common/layout/index";
import { useDispatch, useSelector } from "react-redux";
import { getLevelById } from "../../../../../redux/slice/coursePreviewSlice";
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
  IoHelpCircle,
  IoDocumentTextOutline,
  IoWarningOutline,
  IoSchoolOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import Loader from "../../../common/Loader";
import Error from "../../../common/Error";
import { useTranslation } from "react-i18next";
import ReadMoreText from "../../../common/ReadMoreText";
import { FaAward } from "react-icons/fa";
import Breadcrumb from "../../../common/layout/Breadcrumb";

export default function LevelDetails() {
  const { levelId: id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { currentLevel, isLoading, isError, message } = useSelector(
    (state) => state.course,
  );

  useEffect(() => {
    if (id) {
      dispatch(getLevelById(id));
    }
  }, [dispatch, id]);

  const modules = currentLevel?.modules || [];
  const progress = currentLevel?.progress_percent || 0;
  const totalTopics = currentLevel?.total_topics || 0;
  const completedTopics = currentLevel?.completed_topics || 0;

  const totalModules = modules.length;
  const totalChapters = modules.reduce(
    (acc, m) => acc + (m.chapters?.length || 0),
    0,
  );

  const calculateTotalTime = () => {
    let totalTime = 0;
    modules.forEach((module) => {
      module?.chapters?.forEach((chapter) => {
        chapter?.topics?.forEach((topic) => {
          totalTime += topic?.estimated_duration || 0;
        });
      });
    });
    return totalTime;
  };
  const totalTime = calculateTotalTime();

  const nextModule = modules.find(
    (m) => m.is_unlocked === true && m.is_completed === false,
  );

  const hasQuizNotAvailableForCompletedContent = modules.some((module) => {
    return module?.chapters?.some((chapter) => {
      return chapter?.topics?.some((topic) => {
        return (
          topic?.is_content_completed === true &&
          topic?.is_quiz_available === false
        );
      });
    });
  });

  if (isLoading) return <Loader />;
  if (isError) return <Error message={message} />;
  if (!currentLevel) {
    return (
      <PageLayout>
        <PageBody>
          <div className="text-center py-20">
            <p className="text-gray-500">{t("levelDetails.levelNotFound")}</p>
          </div>
        </PageBody>
      </PageLayout>
    );
  }

  const program = currentLevel?.parent_hierarchy?.program;

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
              {
                label: currentLevel?.title,
              },
            ]}
          />
        </div>

        {/* Hero Banner – only image with simple shadow, no overlay, no text */}
        <div className="rounded-2xl overflow-hidden shadow-md">
          <img
            src={currentLevel?.thumbnail}
            className="w-full h-56 sm:h-72 lg:h-[450px] object-cover"
            alt={currentLevel?.title}
          />
        </div>

        {/* Level at a glance */}
        <div className="mt-6 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <IoRibbonOutline className="text-accent text-xl shrink-0" />
            <span className="text-lg font-bold text-gray-800 leading-tight">
              {currentLevel?.title?.replace(/\s*at a glance$/i, "")}
            </span>
            <span className="text-sm text-gray-600 leading-tight self-end">
              {t("levelDetails.atAGlance")}
            </span>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
            <StatItem
              icon={<IoBookOutline className="w-5 h-5 text-blue-500" />}
              label={t("levelDetails.stats.totalModules")}
              value={totalModules}
            />
            <StatItem
              icon={
                <IoDocumentTextOutline className="w-5 h-5 text-purple-500" />
              }
              label={t("levelDetails.stats.totalChapters")}
              value={totalChapters}
            />
            <StatItem
              icon={<IoPlayCircle className="w-5 h-5 text-green-500" />}
              label={t("levelDetails.stats.totalTopics")}
              value={totalTopics}
            />
            <StatItem
              icon={<IoCheckmarkCircle className="w-5 h-5 text-emerald-500" />}
              label={t("levelDetails.stats.completedTopics")}
              value={`${completedTopics}/${totalTopics}`}
            />
            <StatItem
              icon={<IoTrendingUp className="w-5 h-5 text-indigo-500" />}
              label={t("levelDetails.stats.levelProgress")}
              value={`${Number(progress).toFixed(1)}%`}
            />
            <StatItem
              icon={<IoTimeOutline className="w-5 h-5 text-rose-500" />}
              label={t("levelDetails.stats.estimatedTime")}
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
                {t("levelDetails.aboutSection.title")}
              </h3>
              <div className="text-sm text-gray-600">
                <ReadMoreText
                  text={
                    currentLevel?.description ||
                    t("levelDetails.aboutSection.noDescription")
                  }
                  maxLength={100}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modules Section */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
              <IoPlayCircle className="text-blue-600" />
              Module Syllabus
            </h3>
            <p className="text-xs text-gray-500">
              {modules.filter((m) => m.is_completed === true).length} of{" "}
              {modules.length}{" "}
              {t("levelDetails.modulesSection.modulesCompleted")}
            </p>
          </div>

          <div className="space-y-3">
            {modules.map((module, index) => {
              const isModuleCompleted = module.is_completed === true;
              const isModuleUnlocked = module.is_unlocked === true;
              const canTakeModuleExam = module.can_take_exam === true;
              const isModulePassed = module.is_passed === true;
              const hasModuleAssessment = module.assessment !== null;
              const hasExamDetails = module.exam_details !== null;
              const passedAttemptId = module.exam_details?.passed_attempt_id;

              const showModuleExamPending =
                isModuleCompleted && canTakeModuleExam && !isModulePassed;
              const showModulePassed = isModulePassed === true;

              const hasQuizNotAvailableForCompletedContent =
                module?.chapters?.some((chapter) =>
                  chapter?.topics?.some(
                    (topic) =>
                      topic?.is_content_completed === true &&
                      topic?.is_quiz_available === false,
                  ),
                );

              return (
                <div
                  key={module.id}
                  className={`bg-white rounded-xl p-4 transition-all duration-300 hover:shadow-md border ${
                    isModuleUnlocked && !isModuleCompleted
                      ? "border-2 border-blue-500 shadow-lg"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className={`w-12 h-12 rounded-xl overflow-hidden relative flex items-center justify-center transition-all
                          ${isModuleCompleted ? "bg-green-100" : isModuleUnlocked ? "bg-blue-100" : "bg-gray-100"}`}
                      >
                        {isModuleCompleted ? (
                          module.thumbnail ? (
                            <>
                              <img
                                src={module.thumbnail}
                                alt={module.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-green-500/20 rounded-xl">
                                <IoCheckmarkCircle className="w-6 h-6 text-green-600" />
                              </div>
                            </>
                          ) : (
                            <IoCheckmarkCircle className="w-6 h-6 text-green-600" />
                          )
                        ) : isModuleUnlocked ? (
                          module.thumbnail ? (
                            <img
                              src={module.thumbnail}
                              alt={module.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <IoPlay className="w-6 h-6 text-blue-600" />
                          )
                        ) : module.thumbnail ? (
                          <>
                            <img
                              src={module.thumbnail}
                              alt={module.title}
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
                            {t("levelDetails.modulesSection.module")}{" "}
                            {index + 1}
                          </p>
                          {!isModuleUnlocked && (
                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                              <IoLockClosed className="w-3 h-3" />{" "}
                              {t("levelDetails.modulesSection.locked")}
                            </span>
                          )}
                          {isModuleUnlocked && !isModuleCompleted && (
                            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
                              {t("levelDetails.modulesSection.inProgress")}
                            </span>
                          )}
                          {showModulePassed && (
                            <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                              <IoSchoolOutline className="w-3 h-3" />{" "}
                              {t("levelDetails.modulesSection.passed")}
                            </span>
                          )}
                          {showModuleExamPending && (
                            <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                              <IoWarningOutline className="w-3 h-3" />{" "}
                              {t("levelDetails.modulesSection.examPending")}
                            </span>
                          )}
                          {isModuleCompleted &&
                            !canTakeModuleExam &&
                            !isModulePassed && (
                              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                                {t("levelDetails.modulesSection.completed")}
                              </span>
                            )}
                          {hasQuizNotAvailableForCompletedContent && (
                            <span className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                              <IoCloseCircleOutline className="w-3 h-3" />
                              {t(
                                "levelDetails.modulesSection.quizNotAvailable",
                              )}
                            </span>
                          )}
                        </div>

                        <h4 className="text-base font-semibold text-gray-800 mt-0.5">
                          {module?.title}
                        </h4>
                        {module?.description && (
                          <p className="text-xs text-gray-500 mt-1">
                            <ReadMoreText
                              text={module?.description}
                              maxLength={50}
                            />
                          </p>
                        )}
                        {module?.chapters && (
                          <p className="text-xs text-gray-800 font-semibold mt-1">
                            {module.chapters.length}{" "}
                            {t("levelDetails.modulesSection.chapters")} •{" "}
                            {module.chapters.reduce(
                              (acc, ch) => acc + (ch.topics?.length || 0),
                              0,
                            )}{" "}
                            {t("levelDetails.modulesSection.topics")}
                          </p>
                        )}
                        {isModuleUnlocked &&
                          !isModuleCompleted &&
                          module.progress_percent > 0 && (
                            <div className="mt-2">
                              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-500 rounded-full transition-all"
                                  style={{
                                    width: `${module.progress_percent}%`,
                                  }}
                                />
                              </div>
                              <p className="text-xs text-gray-400 mt-0.5">
                                {module.progress_percent}%{" "}
                                {t("levelDetails.modulesSection.complete")}
                              </p>
                            </div>
                          )}
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end md:flex-shrink-0">
                      <button
                        onClick={() => {
                          if (isModuleUnlocked) {
                            navigate(`/faqs?type=module&id=${module.id}`);
                          }
                        }}
                        disabled={!isModuleUnlocked}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1
                          ${
                            isModuleUnlocked
                              ? "bg-orange-50 text-orange-600 hover:bg-orange-100 border border-orange-200 cursor-pointer"
                              : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                          }`}
                      >
                        <IoHelpCircle className="w-4 h-4" />
                        {t("levelDetails.modulesSection.faq")}
                      </button>

                      {hasExamDetails && passedAttemptId && (
                        <button
                          onClick={() =>
                            navigate(`/certificate/${passedAttemptId}`)
                          }
                          className="px-4 py-2 rounded-lg text-sm font-medium bg-emerald-50 cursor-pointer text-emerald-700 border border-emerald-300 hover:bg-emerald-100 transition-colors flex items-center gap-1"
                        >
                          <FaAward className="w-4 h-4" />
                          {t("levelDetails.modulesSection.viewCertificate")}
                        </button>
                      )}

                      {showModuleExamPending &&
                        (hasModuleAssessment ? (
                          <button
                            onClick={() =>
                              navigate(`/exam-module/${module.assessment.id}`)
                            }
                            className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md hover:opacity-90 transition-all flex items-center gap-1"
                          >
                            <IoDocumentTextOutline className="w-4 h-4" />
                            {t("levelDetails.modulesSection.takeModuleExam")}
                          </button>
                        ) : (
                          <button
                            disabled
                            className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-300 text-gray-500 cursor-not-allowed flex items-center gap-1"
                          >
                            <IoCloseCircleOutline className="w-4 h-4" />
                            {t(
                              "levelDetails.modulesSection.assessmentNotAvailable",
                            )}
                          </button>
                        ))}

                      {isModuleCompleted ? (
                        <button
                          className="px-4 py-2 rounded-md text-sm font-semibold bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-all flex items-center gap-1"
                          onClick={() => navigate(`/modules/${module.id}`)}
                        >
                          <IoBookOutline className="w-4 h-4" />
                          {t("levelDetails.modulesSection.viewContent")}
                        </button>
                      ) : (
                        <button
                          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1
                            ${
                              isModuleUnlocked
                                ? "bg-accent hover:opacity-90 text-white shadow-md cursor-pointer"
                                : "bg-gray-100 text-gray-500 cursor-not-allowed"
                            }`}
                          disabled={!isModuleUnlocked}
                          onClick={() => {
                            if (isModuleUnlocked) {
                              navigate(`/modules/${module.id}`);
                            }
                          }}
                        >
                          <IoPlay className="w-4 h-4" />
                          {isModuleUnlocked
                            ? t("levelDetails.modulesSection.continue")
                            : t("levelDetails.modulesSection.lockedButton")}
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
                {hasQuizNotAvailableForCompletedContent ? (
                  <>
                    <p className="text-sm text-orange-600 font-medium flex items-center gap-2">
                      <IoWarningOutline className="w-4 h-4" />
                      {t("levelDetails.cta.quizNotAvailableWarning")}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t("levelDetails.cta.quizNotAvailableMessage")}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-600">
                      {t("levelDetails.cta.continueJourney")}
                    </p>
                    <p className="text-xs text-gray-400">
                      {nextModule
                        ? `${t("levelDetails.cta.next")}: ${nextModule.title}`
                        : t("levelDetails.cta.allModulesCompleted")}
                    </p>
                  </>
                )}
              </div>

              {hasQuizNotAvailableForCompletedContent ? (
                <button
                  onClick={() => {
                    const firstQuizNotAvailableTopic = (() => {
                      for (const module of modules) {
                        if (module.is_unlocked) {
                          for (const chapter of module.chapters || []) {
                            for (const topic of chapter.topics || []) {
                              if (
                                topic?.is_content_completed === true &&
                                topic?.is_quiz_available === false
                              ) {
                                return {
                                  moduleId: module.id,
                                  topicId: topic.id,
                                };
                              }
                            }
                          }
                        }
                      }
                      return null;
                    })();

                    if (firstQuizNotAvailableTopic) {
                      navigate(
                        `/modules/${firstQuizNotAvailableTopic.moduleId}`,
                      );
                    }
                  }}
                  className="flex-1 sm:flex-none px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white shadow-md cursor-pointer"
                >
                  <IoCloseCircleOutline className="w-5 h-5" />
                  {t("levelDetails.cta.viewQuizIssues")}
                  <IoChevronForward className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (nextModule) {
                      navigate(`/modules/${nextModule.id}`);
                    }
                  }}
                  disabled={!nextModule}
                  className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2
                    ${
                      nextModule
                        ? "bg-accent hover:opacity-90 text-white shadow-md cursor-pointer"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  <IoPlayCircle className="w-5 h-5" />
                  {nextModule
                    ? t("levelDetails.cta.continueLearning")
                    : t("levelDetails.cta.allModulesCompleted")}
                  <IoChevronForward className="w-4 h-4" />
                </button>
              )}
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

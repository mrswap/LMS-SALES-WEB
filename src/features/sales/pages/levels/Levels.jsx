import React, { useEffect, useState } from "react";
import {
  PageBody,
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight,
  PageLayout,
  PageSubtitle,
  PageTitle,
} from "../../common/layout";
import { useNavigate } from "react-router-dom";
import img from "../../../../assets/sales/pacemaker.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getAllLevels } from "../../../../redux/slice/coursePreviewSlice";
import Loader from "../../common/Loader";
import Error from "../../common/Error";
import { useTranslation } from "react-i18next";
import { FaGraduationCap } from "react-icons/fa";

/* ---------------- Card ---------------- */
const LevelCard = ({ item }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Determine status
  const getStatus = () => {
    if (item.is_completed) return t("levelsPage.status.completed");
    if (item.is_unlocked && !item.is_completed)
      return t("levelsPage.status.running");
    return t("levelsPage.status.locked");
  };

  const status = getStatus();

  // Get button text
  const getButtonText = () => {
    if (status === t("levelsPage.status.completed"))
      return t("levelsPage.buttons.takeExam");
    if (status === t("levelsPage.status.running"))
      return t("levelsPage.buttons.continue");
    return t("levelsPage.buttons.startLevel");
  };

  // Get modules info
  const getModulesInfo = () => {
    if (!item.modules || item.modules.length === 0)
      return t("levelsPage.modules.zero");
    const moduleCount = item.modules.length;
    if (moduleCount === 1) return t("levelsPage.modules.one");
    return `${moduleCount} ${t("levelsPage.modules.other")}`;
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-300 shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="relative">
        <img
          src={item.thumbnail}
          className="w-full h-44 object-cover"
          alt={item.title}
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <span
          className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full shadow font-medium
          ${
            status === t("levelsPage.status.completed")
              ? "bg-green-500 text-white"
              : status === t("levelsPage.status.running")
                ? "bg-blue-500 text-white"
                : "bg-gray-500 text-white"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-sm sm:text-base text-gray-800 line-clamp-2">
          {item.title}
        </h3>

        <p className="text-xs text-gray-500 mt-1">{item.description}</p>
        <p className="text-xs text-gray-400 mt-1">{getModulesInfo()}</p>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{t("levelsPage.progress")}</span>
            <span>pending%</span>
          </div>

          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300" />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (status === t("levelsPage.status.locked")) return;

            if (getButtonText() === t("levelsPage.buttons.continue")) {
              navigate(`/levels/${item.id}`);
            } else if (getButtonText() === t("levelsPage.buttons.takeExam")) {
              navigate(`/levels/exam/${item.id}`);
            }
          }}
          disabled={status === t("levelsPage.status.locked")}
          className={`mt-5 w-full py-2.5 rounded-xl text-sm font-medium transition 
            ${
              status === t("levelsPage.status.locked")
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : status === t("levelsPage.status.running")
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90"
                  : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:opacity-90"
            }`}
        >
          {getButtonText()}
        </button>

        {/* Give Exam Button - Only show when is_completed is true */}
        {item.is_completed && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/levels/exam/${item.id}`);
            }}
            className="mt-3 w-full py-2.5 rounded-xl text-sm font-medium transition bg-purple-500 text-white hover:bg-purple-600 flex items-center justify-center gap-2"
          >
            <FaGraduationCap className="w-4 h-4" />
            Give Exam
          </button>
        )}
      </div>
    </div>
  );
};

/* ---------------- Main ---------------- */
export default function LevelsPage() {
  const [activeTab, setActiveTab] = useState("ALL");
  const dispatch = useDispatch();
  const courseData = useSelector((state) => state.course);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getAllLevels());
  }, [dispatch]);

  // Extract levels from the correct path
  let levelsArray = [];
  let programTitle = t("levelsPage.programTitle");

  // Try different possible paths to find the levels array
  if (courseData.levels && Array.isArray(courseData.levels)) {
    // Case 1: levels is directly an array
    if (courseData.levels.length > 0 && courseData.levels[0].type === "level") {
      levelsArray = courseData.levels;
      console.log("Case 1: Direct levels array", levelsArray);
    }
    // Case 2: levels contains a program object with levels property
    else if (courseData.levels[0] && courseData.levels[0].levels) {
      levelsArray = courseData.levels[0].levels;
      programTitle = courseData.levels[0].title || t("levelsPage.programTitle");
      console.log("Case 2: levels[0].levels", levelsArray);
    }
    // Case 3: levels is the program object itself
    else if (courseData.levels.levels) {
      levelsArray = courseData.levels.levels;
      programTitle = courseData.levels.title || t("levelsPage.programTitle");
      console.log("Case 3: levels.levels", levelsArray);
    }
  }
  // Case 4: courseData might have a data property (API response wrapper)
  else if (courseData.data && courseData.data.levels) {
    levelsArray = courseData.data.levels;
    // console.log("Case 4: data.levels", levelsArray);
  } else if (
    courseData.data &&
    courseData.data[0] &&
    courseData.data[0].levels
  ) {
    levelsArray = courseData.data[0].levels;
    programTitle = courseData.data[0].title || t("levelsPage.programTitle");
    console.log("Case 5: data[0].levels", levelsArray);
  }
  // Case 5: Check for success/data structure
  else if (courseData.success && courseData.data) {
    if (courseData.data[0] && courseData.data[0].levels) {
      levelsArray = courseData.data[0].levels;
      programTitle = courseData.data[0].title || t("levelsPage.programTitle");
      console.log("Case 6: success.data[0].levels", levelsArray);
    } else if (courseData.data.levels) {
      levelsArray = courseData.data.levels;
      console.log("Case 7: success.data.levels", levelsArray);
    }
  }

  // Ensure levelsArray is an array
  if (!Array.isArray(levelsArray)) {
    levelsArray = [];
  }

  // Filter levels based on active tab
  const getFilteredLevels = () => {
    if (activeTab === "COMPLETED") {
      return levelsArray.filter((level) => level.is_completed === true);
    }
    return levelsArray;
  };

  const filteredLevels = getFilteredLevels();

  if (courseData.isLoading) {
    return <Loader />;
  }

  if (courseData.isError) {
    return <Error message={t("levelsPage.emptyStates.error")} />;
  }

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>{programTitle}</PageTitle>
          <PageSubtitle>{t("levelsPage.subtitle")}</PageSubtitle>
        </PageHeaderLeft>
        <PageHeaderRight />
      </PageHeader>

      <PageBody>
        {/* Tabs */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setActiveTab("ALL")}
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition
                ${
                  activeTab === "ALL"
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
          >
            {t("levelsPage.allLevels")} ({levelsArray.length})
          </button>
          <button
            onClick={() => setActiveTab("COMPLETED")}
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition
                ${
                  activeTab === "COMPLETED"
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
          >
            {t("levelsPage.completed")} (
            {levelsArray.filter((l) => l.is_completed).length})
          </button>
        </div>

        {/* Grid */}
        {filteredLevels.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {filteredLevels.map((level) => {
              // console.log("Rendering level:", level);
              return <LevelCard key={level.id} item={level} />;
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-5xl mb-3"></div>
            <p className="text-gray-500 text-sm">
              {activeTab === "COMPLETED"
                ? t("levelsPage.emptyStates.noCompleted")
                : `${t("levelsPage.emptyStates.noLevels")} Levels found: ${levelsArray.length}`}
            </p>
          </div>
        )}
      </PageBody>
    </PageLayout>
  );
}

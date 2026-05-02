// import React, { useEffect, useState } from "react";
// import {
//   PageBody,
//   PageHeader,
//   PageHeaderLeft,
//   PageHeaderRight,
//   PageLayout,
//   PageSubtitle,
//   PageTitle,
// } from "../../common/layout";
// import { useNavigate } from "react-router-dom";
// import img from "../../../../assets/sales/pacemaker.jpg";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllLevels } from "../../../../redux/slice/coursePreviewSlice";
// import Loader from "../../common/Loader";
// import Error from "../../common/Error";
// import { useTranslation } from "react-i18next";
// import {
//   FaGraduationCap,
//   FaQuestionCircle,
//   FaArrowRight,
//   FaLock,
//   FaCheckCircle,
//   FaAward,
//   FaBookOpen,
//   FaHourglassHalf,
//   FaFileAlt,
//   FaClipboardList,
// } from "react-icons/fa";

// /* ---------------- Card ---------------- */
// const LevelCard = ({ item }) => {
//   const navigate = useNavigate();
//   const { t } = useTranslation();

//   // Determine status based on new flags
//   const getStatus = () => {
//     if (item.is_passed) return "passed";
//     if (item.is_content_completed && item.can_take_exam && !item.is_passed)
//       return "readyForExam";
//     if (item.is_unlocked && !item.is_content_completed) return "inProgress";
//     if (!item.is_unlocked) return "locked";
//     return "notStarted";
//   };

//   const status = getStatus();

//   // Get status text for display
//   const getStatusText = () => {
//     switch (status) {
//       case "passed":
//         return t("levelsPage.status.passed");
//       case "readyForExam":
//         return t("levelsPage.status.readyForExam");
//       case "inProgress":
//         return t("levelsPage.status.inProgress");
//       case "locked":
//         return t("levelsPage.status.locked");
//       default:
//         return t("levelsPage.status.notStarted");
//     }
//   };

//   // Get status icon
//   const getStatusIcon = () => {
//     switch (status) {
//       case "passed":
//         return <FaAward className="w-3 h-3" />;
//       case "readyForExam":
//         return <FaClipboardList className="w-3 h-3" />;
//       case "inProgress":
//         return <FaHourglassHalf className="w-3 h-3" />;
//       case "locked":
//         return <FaLock className="w-3 h-3" />;
//       default:
//         return <FaBookOpen className="w-3 h-3" />;
//     }
//   };

//   // Get status color (classic look with softer colors)
//   const getStatusColor = () => {
//     switch (status) {
//       case "passed":
//         return "bg-emerald-100 text-emerald-700 border border-emerald-200";
//       case "readyForExam":
//         return "bg-amber-100 text-amber-700 border border-amber-200";
//       case "inProgress":
//         return "bg-blue-100 text-blue-700 border border-blue-200";
//       default:
//         return "bg-gray-100 text-gray-600 border border-gray-200";
//     }
//   };

//   // Calculate progress percentage
//   const getProgressPercentage = () => {
//     if (item.is_passed) return 100;
//     if (item.is_content_completed) return 100;
//     if (!item.is_unlocked) return 0;
//     if (item.modules) {
//       const completedModules = item.modules.filter(
//         (m) => m.is_completed,
//       ).length;
//       return (completedModules / item.modules.length) * 100;
//     }
//     return 0;
//   };

//   const progressPercentage = getProgressPercentage();

//   // Get main button config
//   const getMainButtonConfig = () => {
//     if (!item.is_unlocked) {
//       return {
//         text: t("levelsPage.buttons.locked"),
//         action: null,
//         disabled: true,
//         color:
//           "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed",
//         icon: <FaLock className="w-4 h-4" />,
//       };
//     }

//     if (item.is_passed) {
//       return {
//         text: t("levelsPage.buttons.viewCertificate"),
//         action: () => navigate(`/certificate/${item.id}`),
//         disabled: false,
//         color:
//           "bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 transition-colors",
//         icon: <FaAward className="w-4 h-4" />,
//       };
//     }
//     if (item.is_content_completed && item.can_take_exam) {
//       return {
//         text: t("levelsPage.buttons.giveExam"),
//         action: () => navigate(`/levels/exam/${item.id}`),
//         disabled: false,
//         color:
//           "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md cursor-pointer hover:opacity-90",
//         icon: <FaGraduationCap className="w-4 h-4" />,
//       };
//     }

//     if (item.is_unlocked && !item.is_content_completed) {
//       return {
//         text: t("levelsPage.buttons.continue"),
//         action: () => navigate(`/levels/${item.id}`),
//         disabled: false,
//         color:
//           "bg-accent text-white hover:opacity-90 transition-colors shadow-sm",
//       };
//     }

//     return {
//       text: t("levelsPage.buttons.startLevel"),
//       action: () => navigate(`/levels/${item.id}`),
//       disabled: false,
//       color:
//         "bg-accent text-white hover:opacity-90 transition-colors shadow-sm",
//     };
//   };

//   const mainButton = getMainButtonConfig();

//   // Get modules info
//   const getModulesInfo = () => {
//     if (!item.modules || item.modules.length === 0)
//       return t("levelsPage.modules.zero");
//     const moduleCount = item.modules.length;
//     if (moduleCount === 1) return t("levelsPage.modules.one");
//     return `${moduleCount} ${t("levelsPage.modules.other")}`;
//   };

//   return (
//     <div className="group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
//       {/* Image */}
//       <div
//         onClick={() => {
//           navigate(`/levels/${item.id}`);
//         }}
//         className="relative cursor-pointer"
//       >
//         <img
//           src={item.thumbnail}
//           className="w-full h-44 object-cover"
//           alt={item.title}
//         />

//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

//         {/* Status Badge - Classic Style */}
//         <div
//           className={`absolute top-3 right-3 text-xs px-3 py-1.5 rounded-md shadow-sm font-medium flex items-center gap-1.5 ${getStatusColor()}`}
//         >
//           {getStatusIcon()}
//           {getStatusText()}
//         </div>

//         {/* Level Number Badge */}
//         <div className="absolute  bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
//           <FaBookOpen className="w-3 h-3" />
//           Level {item.id}
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-5">
//         <h3 className="font-bold text-lg text-gray-800 line-clamp-2 mb-1">
//           {item.title}
//         </h3>

//         <p className="text-sm text-gray-500 line-clamp-2 mb-2">
//           {item.description}
//         </p>

//         <p className="text-xs text-gray-400 mb-3 flex items-center gap-1">
//           <FaFileAlt className="w-3 h-3" />
//           {getModulesInfo()}
//         </p>

//         {/* Progress Bar - Classic Style */}
//         {item.is_unlocked && (
//           <div className="mt-3 mb-4">
//             <div className="flex justify-between text-xs text-gray-600 mb-1.5">
//               <span className="font-medium flex items-center gap-1">
//                 <FaBookOpen className="w-3 h-3" />
//                 {t("levelsPage.progress")}
//               </span>
//               <span className="font-medium">
//                 {item.is_passed
//                   ? "100%"
//                   : item.is_content_completed
//                     ? "100%"
//                     : `${Math.round(progressPercentage)}%`}
//               </span>
//             </div>

//             <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
//               <div
//                 className={`h-full rounded-full transition-all duration-500 ${
//                   item.is_passed
//                     ? "bg-emerald-500"
//                     : item.is_content_completed
//                       ? "bg-amber-500"
//                       : "bg-blue-600"
//                 }`}
//                 style={{ width: `${progressPercentage}%` }}
//               />
//             </div>
//           </div>
//         )}

//         {/* Content Completion Message - Classic Alert */}
//         {item.is_content_completed && !item.is_passed && (
//           <div className="mt-3 mb-3 p-2.5 bg-green-50 rounded-md border-l-4 border-green-500">
//             <div className="flex items-center gap-2">
//               <FaCheckCircle className="w-4 h-4 text-green-600" />
//               <p className="text-xs text-green-700 font-medium">
//                 {t("levelsPage.messages.contentCompleted")}
//                 {item.can_take_exam &&
//                   ` ${t("levelsPage.messages.readyForExam")}`}
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Certificate Earned Message - Classic Alert */}
//         {item.is_passed && (
//           <div className="mt-3 mb-3 p-2.5 bg-emerald-50 rounded-md border-l-4 border-emerald-500">
//             <div className="flex items-center gap-2">
//               <FaAward className="w-4 h-4 text-emerald-600" />
//               <p className="text-xs text-emerald-700 font-medium">
//                 {t("levelsPage.messages.certificateEarned")}
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Exam Not Available Message */}
//         {item.is_content_completed &&
//           !item.can_take_exam &&
//           !item.is_passed && (
//             <div className="mt-3 mb-3 p-2.5 bg-gray-50 rounded-md border-l-4 border-gray-400">
//               <div className="flex items-center gap-2">
//                 <FaHourglassHalf className="w-4 h-4 text-gray-600" />
//                 <p className="text-xs text-gray-600 font-medium">
//                   {t("levelsPage.messages.examNotAvailable")}
//                 </p>
//               </div>
//             </div>
//           )}

//         {/* FAQ Button - Classic Style */}
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             if (item.is_unlocked) {
//               navigate(`/faqs?type=level&id=${item.id}`);
//             }
//           }}
//           className={`mt-2 w-full py-2.5 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2
//     ${
//       item.is_unlocked
//         ? "bg-orange-50 text-orange-600 hover:bg-orange-100 border border-orange-200 cursor-pointer"
//         : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
//     }`}
//           disabled={!item.is_unlocked}
//         >
//           <FaQuestionCircle className="w-4 h-4" />
//           {t("levelsPage.buttons.faqs")}
//         </button>

//         {/* Main Action Button */}
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             if (mainButton.action) {
//               mainButton.action();
//             }
//           }}
//           disabled={mainButton.disabled}
//           className={`mt-2 w-full py-2.5 rounded-md text-sm font-semibold transition-all flex items-center justify-center gap-2 ${mainButton.color}`}
//         >
//           {mainButton.icon}
//           {mainButton.text}
//         </button>
//       </div>
//     </div>
//   );
// };

// /* ---------------- Main ---------------- */
// export default function LevelsPage() {
//   const [activeTab, setActiveTab] = useState("ALL");
//   const dispatch = useDispatch();
//   const courseData = useSelector((state) => state.course);
//   const { t } = useTranslation();

//   useEffect(() => {
//     dispatch(getAllLevels());
//   }, [dispatch]);

//   // Extract levels from the correct path
//   let levelsArray = [];
//   let programTitle = t("levelsPage.programTitle");

//   // Try different possible paths to find the levels array
//   if (courseData.levels && Array.isArray(courseData.levels)) {
//     if (courseData.levels.length > 0 && courseData.levels[0].type === "level") {
//       levelsArray = courseData.levels;
//       console.log("Case 1: Direct levels array", levelsArray);
//     } else if (courseData.levels[0] && courseData.levels[0].levels) {
//       levelsArray = courseData.levels[0].levels;
//       programTitle = courseData.levels[0].title || t("levelsPage.programTitle");
//       console.log("Case 2: levels[0].levels", levelsArray);
//     } else if (courseData.levels.levels) {
//       levelsArray = courseData.levels.levels;
//       programTitle = courseData.levels.title || t("levelsPage.programTitle");
//       console.log("Case 3: levels.levels", levelsArray);
//     }
//   } else if (courseData.data && courseData.data.levels) {
//     levelsArray = courseData.data.levels;
//   } else if (
//     courseData.data &&
//     courseData.data[0] &&
//     courseData.data[0].levels
//   ) {
//     levelsArray = courseData.data[0].levels;
//     programTitle = courseData.data[0].title || t("levelsPage.programTitle");
//     console.log("Case 5: data[0].levels", levelsArray);
//   } else if (courseData.success && courseData.data) {
//     if (courseData.data[0] && courseData.data[0].levels) {
//       levelsArray = courseData.data[0].levels;
//       programTitle = courseData.data[0].title || t("levelsPage.programTitle");
//       console.log("Case 6: success.data[0].levels", levelsArray);
//     } else if (courseData.data.levels) {
//       levelsArray = courseData.data.levels;
//       console.log("Case 7: success.data.levels", levelsArray);
//     }
//   }

//   // Ensure levelsArray is an array
//   if (!Array.isArray(levelsArray)) {
//     levelsArray = [];
//   }

//   // Filter levels based on active tab
//   const getFilteredLevels = () => {
//     if (activeTab === "COMPLETED") {
//       return levelsArray.filter((level) => level.is_passed === true);
//     }
//     return levelsArray;
//   };

//   const filteredLevels = getFilteredLevels();

//   if (courseData.isLoading) {
//     return <Loader />;
//   }

//   if (courseData.isError) {
//     return <Error message={t("levelsPage.emptyStates.error")} />;
//   }

//   return (
//     <PageLayout>
//       <PageHeader>
//         <PageHeaderLeft>
//           <PageTitle>{programTitle}</PageTitle>
//           <PageSubtitle>{t("levelsPage.subtitle")}</PageSubtitle>
//         </PageHeaderLeft>
//         <PageHeaderRight />
//       </PageHeader>

//       <PageBody>
//         {/* Tabs - Classic Style */}
//         <div className="flex items-center gap-2 mb-8 border-b border-gray-200">
//           <button
//             onClick={() => setActiveTab("ALL")}
//             className={`px-6 py-2.5 text-sm font-medium transition-all relative flex items-center gap-2
//                 ${
//                   activeTab === "ALL"
//                     ? "text-blue-600 border-b-2 border-blue-600"
//                     : "text-gray-500 hover:text-gray-700"
//                 }`}
//           >
//             <FaBookOpen className="w-4 h-4" />
//             {t("levelsPage.allLevels")} ({levelsArray.length})
//           </button>
//           <button
//             onClick={() => setActiveTab("COMPLETED")}
//             className={`px-6 py-2.5 text-sm font-medium transition-all relative flex items-center gap-2
//                 ${
//                   activeTab === "COMPLETED"
//                     ? "text-blue-600 border-b-2 border-blue-600"
//                     : "text-gray-500 hover:text-gray-700"
//                 }`}
//           >
//             <FaAward className="w-4 h-4" />
//             {t("levelsPage.completed")} (
//             {levelsArray.filter((l) => l.is_passed).length})
//           </button>
//         </div>

//         {/* Grid */}
//         {filteredLevels.length > 0 ? (
//           <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
//             {filteredLevels.map((level) => {
//               return <LevelCard key={level.id} item={level} />;
//             })}
//           </div>
//         ) : (
//           <div className="flex flex-col items-center justify-center py-20 text-center">
//             <FaBookOpen className="w-16 h-16 text-gray-300 mb-4" />
//             <p className="text-gray-500 text-base">
//               {activeTab === "COMPLETED"
//                 ? t("levelsPage.emptyStates.noCompleted")
//                 : t("levelsPage.emptyStates.noLevels")}
//             </p>
//           </div>
//         )}
//       </PageBody>
//     </PageLayout>
//   );
// }

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
import {
  FaGraduationCap,
  FaQuestionCircle,
  FaArrowRight,
  FaLock,
  FaCheckCircle,
  FaAward,
  FaBookOpen,
  FaHourglassHalf,
  FaFileAlt,
  FaClipboardList,
} from "react-icons/fa";

/* ---------------- Card ---------------- */
const LevelCard = ({ item }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Determine status based on new flags
  const getStatus = () => {
    if (item.is_passed) return "passed";
    if (item.is_content_completed && item.can_take_exam && !item.is_passed)
      return "readyForExam";
    if (item.is_unlocked && !item.is_content_completed) return "inProgress";
    if (!item.is_unlocked) return "locked";
    return "notStarted";
  };

  const status = getStatus();

  // Get status text for display
  const getStatusText = () => {
    switch (status) {
      case "passed":
        return t("levelsPage.status.passed");
      case "readyForExam":
        return t("levelsPage.status.readyForExam");
      case "inProgress":
        return t("levelsPage.status.inProgress");
      case "locked":
        return t("levelsPage.status.locked");
      default:
        return t("levelsPage.status.notStarted");
    }
  };

  // Get status icon
  const getStatusIcon = () => {
    switch (status) {
      case "passed":
        return <FaAward className="w-3 h-3" />;
      case "readyForExam":
        return <FaClipboardList className="w-3 h-3" />;
      case "inProgress":
        return <FaHourglassHalf className="w-3 h-3" />;
      case "locked":
        return <FaLock className="w-3 h-3" />;
      default:
        return <FaBookOpen className="w-3 h-3" />;
    }
  };

  // Get status color (classic look with softer colors)
  const getStatusColor = () => {
    switch (status) {
      case "passed":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      case "readyForExam":
        return "bg-amber-100 text-amber-700 border border-amber-200";
      case "inProgress":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  };

  // Calculate progress percentage
  const getProgressPercentage = () => {
    if (item.is_passed) return 100;
    if (item.is_content_completed) return 100;
    if (!item.is_unlocked) return 0;
    if (item.modules) {
      const completedModules = item.modules.filter(
        (m) => m.is_completed,
      ).length;
      return (completedModules / item.modules.length) * 100;
    }
    return 0;
  };

  const progressPercentage = getProgressPercentage();

  // Get main button config
  const getMainButtonConfig = () => {
    if (!item.is_unlocked) {
      return {
        text: t("levelsPage.buttons.locked"),
        action: null,
        disabled: true,
        color:
          "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed",
        icon: <FaLock className="w-4 h-4" />,
      };
    }

    if (item.is_passed) {
      return {
        text: t("levelsPage.buttons.viewCertificate"),
        action: () => navigate(`/certificate/${item.id}`),
        disabled: false,
        color:
          "bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 transition-colors",
        icon: <FaAward className="w-4 h-4" />,
      };
    }
    if (item.is_content_completed && item.can_take_exam) {
      return {
        text: t("levelsPage.buttons.giveExam"),
        action: () => navigate(`/levels/exam/${item.id}`),
        disabled: false,
        color:
          "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md cursor-pointer hover:opacity-90",
        icon: <FaGraduationCap className="w-4 h-4" />,
      };
    }

    if (item.is_unlocked && !item.is_content_completed) {
      return {
        text: t("levelsPage.buttons.continue"),
        action: () => navigate(`/levels/${item.id}`),
        disabled: false,
        color:
          "bg-accent text-white hover:opacity-90 transition-colors shadow-sm",
      };
    }

    return {
      text: t("levelsPage.buttons.startLevel"),
      action: () => navigate(`/levels/${item.id}`),
      disabled: false,
      color:
        "bg-accent text-white hover:opacity-90 transition-colors shadow-sm",
    };
  };

  const mainButton = getMainButtonConfig();

  // Get modules info
  const getModulesInfo = () => {
    if (!item.modules || item.modules.length === 0)
      return t("levelsPage.modules.zero");
    const moduleCount = item.modules.length;
    if (moduleCount === 1) return t("levelsPage.modules.one");
    return `${moduleCount} ${t("levelsPage.modules.other")}`;
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Image */}
      <div
        onClick={() => {
          navigate(`/levels/${item.id}`);
        }}
        className="relative cursor-pointer"
      >
        <img
          src={item.thumbnail}
          className="w-full h-44 object-cover"
          alt={item.title}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Status Badge - Classic Style */}
        <div
          className={`absolute top-3 right-3 text-xs px-3 py-1.5 rounded-md shadow-sm font-medium flex items-center gap-1.5 ${getStatusColor()}`}
        >
          {getStatusIcon()}
          {getStatusText()}
        </div>

        {/* Level Number Badge */}
        <div className="absolute  bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
          <FaBookOpen className="w-3 h-3" />
          Level {item.id}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-800 line-clamp-2 mb-1">
          {item.title}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2 mb-2">
          {item.description}
        </p>

        <p className="text-xs text-gray-400 mb-3 flex items-center gap-1">
          <FaFileAlt className="w-3 h-3" />
          {getModulesInfo()}
        </p>

        {/* Progress Bar - Classic Style */}
        {item.is_unlocked && (
          <div className="mt-3 mb-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1.5">
              <span className="font-medium flex items-center gap-1">
                <FaBookOpen className="w-3 h-3" />
                {t("levelsPage.progress")}
              </span>
              <span className="font-medium">
                {item.is_passed
                  ? "100%"
                  : item.is_content_completed
                    ? "100%"
                    : `${Math.round(progressPercentage)}%`}
              </span>
            </div>

            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  item.is_passed
                    ? "bg-emerald-500"
                    : item.is_content_completed
                      ? "bg-amber-500"
                      : "bg-blue-600"
                }`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Content Completion Message - Classic Alert */}
        {item.is_content_completed && !item.is_passed && (
          <div className="mt-3 mb-3 p-2.5 bg-green-50 rounded-md border-l-4 border-green-500">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="w-4 h-4 text-green-600" />
              <p className="text-xs text-green-700 font-medium">
                {t("levelsPage.messages.contentCompleted")}
                {item.can_take_exam &&
                  ` ${t("levelsPage.messages.readyForExam")}`}
              </p>
            </div>
          </div>
        )}

        {/* Certificate Earned Message - Classic Alert */}
        {item.is_passed && (
          <div className="mt-3 mb-3 p-2.5 bg-emerald-50 rounded-md border-l-4 border-emerald-500">
            <div className="flex items-center gap-2">
              <FaAward className="w-4 h-4 text-emerald-600" />
              <p className="text-xs text-emerald-700 font-medium">
                {t("levelsPage.messages.certificateEarned")}
              </p>
            </div>
          </div>
        )}

        {/* Exam Not Available Message */}
        {item.is_content_completed &&
          !item.can_take_exam &&
          !item.is_passed && (
            <div className="mt-3 mb-3 p-2.5 bg-gray-50 rounded-md border-l-4 border-gray-400">
              <div className="flex items-center gap-2">
                <FaHourglassHalf className="w-4 h-4 text-gray-600" />
                <p className="text-xs text-gray-600 font-medium">
                  {t("levelsPage.messages.examNotAvailable")}
                </p>
              </div>
            </div>
          )}

        {/* FAQ Button - Classic Style */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (item.is_unlocked) {
              navigate(`/faqs?type=level&id=${item.id}`);
            }
          }}
          className={`mt-2 w-full py-2.5 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2
    ${
      item.is_unlocked
        ? "bg-orange-50 text-orange-600 hover:bg-orange-100 border border-orange-200 cursor-pointer"
        : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
    }`}
          disabled={!item.is_unlocked}
        >
          <FaQuestionCircle className="w-4 h-4" />
          {t("levelsPage.buttons.faqs")}
        </button>

        {/* Main Action Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (mainButton.action) {
              mainButton.action();
            }
          }}
          disabled={mainButton.disabled}
          className={`mt-2 w-full py-2.5 rounded-md text-sm font-semibold transition-all flex items-center justify-center gap-2 ${mainButton.color}`}
        >
          {mainButton.icon}
          {mainButton.text}
        </button>
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
    if (courseData.levels.length > 0 && courseData.levels[0].type === "level") {
      levelsArray = courseData.levels;
      console.log("Case 1: Direct levels array", levelsArray);
    } else if (courseData.levels[0] && courseData.levels[0].levels) {
      levelsArray = courseData.levels[0].levels;
      programTitle = courseData.levels[0].title || t("levelsPage.programTitle");
      console.log("Case 2: levels[0].levels", levelsArray);
    } else if (courseData.levels.levels) {
      levelsArray = courseData.levels.levels;
      programTitle = courseData.levels.title || t("levelsPage.programTitle");
      console.log("Case 3: levels.levels", levelsArray);
    }
  } else if (courseData.data && courseData.data.levels) {
    levelsArray = courseData.data.levels;
  } else if (
    courseData.data &&
    courseData.data[0] &&
    courseData.data[0].levels
  ) {
    levelsArray = courseData.data[0].levels;
    programTitle = courseData.data[0].title || t("levelsPage.programTitle");
    console.log("Case 5: data[0].levels", levelsArray);
  } else if (courseData.success && courseData.data) {
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
      return levelsArray.filter((level) => level.is_passed === true);
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
        {/* Tabs - Classic Style */}
        <div className="flex items-center gap-2 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("ALL")}
            className={`px-6 py-2.5 text-sm font-medium transition-all relative flex items-center gap-2
                ${
                  activeTab === "ALL"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
          >
            <FaBookOpen className="w-4 h-4" />
            {t("levelsPage.allLevels")} ({levelsArray.length})
          </button>
          <button
            onClick={() => setActiveTab("COMPLETED")}
            className={`px-6 py-2.5 text-sm font-medium transition-all relative flex items-center gap-2
                ${
                  activeTab === "COMPLETED"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
          >
            <FaAward className="w-4 h-4" />
            {t("levelsPage.completed")} (
            {levelsArray.filter((l) => l.is_passed).length})
          </button>
        </div>

        {/* Grid */}
        {filteredLevels.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {filteredLevels.map((level) => {
              return <LevelCard key={level.id} item={level} />;
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FaBookOpen className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-base">
              {activeTab === "COMPLETED"
                ? t("levelsPage.emptyStates.noCompleted")
                : t("levelsPage.emptyStates.noLevels")}
            </p>
          </div>
        )}
      </PageBody>
    </PageLayout>
  );
}

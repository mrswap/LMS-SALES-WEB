// import React, { useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   PageLayout,
//   PageBody,
//   PageHeader,
//   PageHeaderLeft,
//   PageTitle,
//   PageSubtitle,
//   PageHeaderRight,
// } from "../../../common/layout/index";
// import { useDispatch, useSelector } from "react-redux";
// import { getLevelById } from "../../../../../redux/slice/coursePreviewSlice";
// import {
//   IoArrowBack,
//   IoBookOutline,
//   IoChevronForward,
//   IoPlayCircle,
//   IoCheckmarkCircle,
//   IoLockClosed,
//   IoTrendingUp,
//   IoRibbonOutline,
//   IoTimeOutline,
//   IoPlay,
//   IoHelpCircle,
//   IoDocumentTextOutline,
//   IoWarningOutline,
//   IoSchoolOutline,
//   IoCloseCircleOutline,
//   IoDownloadOutline,
//   IoMedalOutline,
// } from "react-icons/io5";
// import Loader from "../../../common/Loader";
// import Error from "../../../common/Error";
// import { useTranslation } from "react-i18next";
// import ReadMoreText from "../../../common/ReadMoreText";
// import { FaAward } from "react-icons/fa";

// export default function LevelDetails() {
//   const { levelId: id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { t } = useTranslation();

//   const { currentLevel, isLoading, isError, message } = useSelector(
//     (state) => state.course,
//   );

//   useEffect(() => {
//     if (id) {
//       dispatch(getLevelById(id));
//     }
//   }, [dispatch, id]);

//   const modules = currentLevel?.modules || [];
//   const progress = currentLevel?.progress_percent || 0;
//   const totalTopics = currentLevel?.total_topics || 0;
//   const completedTopics = currentLevel?.completed_topics || 0;

//   const calculateTotalTime = () => {
//     let totalTime = 0;
//     modules.forEach((module) => {
//       module?.chapters?.forEach((chapter) => {
//         chapter?.topics?.forEach((topic) => {
//           totalTime += topic?.estimated_duration || 0;
//         });
//       });
//     });
//     return totalTime;
//   };

//   const totalTime = calculateTotalTime();

//   // Find first unlocked and not completed module
//   const nextModule = modules.find(
//     (m) => m.is_unlocked === true && m.is_completed === false,
//   );

//   // Check if any module has a quiz not available AFTER content is completed for the sticky button
//   const hasQuizNotAvailableForCompletedContent = modules.some((module) => {
//     return module?.chapters?.some((chapter) => {
//       return chapter?.topics?.some((topic) => {
//         // Only show quiz not available warning if content is completed AND quiz is not available
//         return (
//           topic?.is_content_completed === true &&
//           topic?.is_quiz_available === false
//         );
//       });
//     });
//   });

//   if (isLoading) {
//     return <Loader />;
//   }

//   if (isError) {
//     return <Error message={message} />;
//   }

//   if (!currentLevel) {
//     return (
//       <PageLayout>
//         <PageBody>
//           <div className="text-center py-20">
//             <p className="text-gray-500">Level data not found</p>
//           </div>
//         </PageBody>
//       </PageLayout>
//     );
//   }

//   return (
//     <PageLayout>
//       <PageHeader>
//         <PageHeaderLeft>
//           <PageTitle>{t("levelDetails.pageTitle")}</PageTitle>
//           <PageSubtitle>{t("levelDetails.pageSubtitle")}</PageSubtitle>
//         </PageHeaderLeft>
//         <PageHeaderRight />
//       </PageHeader>
//       <PageBody>
//         {/* Hero Banner */}
//         <div className="relative rounded-2xl overflow-hidden shadow-xl group">
//           <img
//             src={
//               currentLevel?.thumbnail ||
//               "https://lms-backend.netswaptech.com/public/uploads/logo.png"
//             }
//             className="w-full h-56 sm:h-72 lg:h-[450px] object-cover"
//             alt="Level Banner"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
//           <div className="absolute bottom-6 left-6 right-6 text-white">
//             <div className="mb-3">
//               {currentLevel?.parent_hierarchy?.program?.title && (
//                 <div className="flex items-center gap-2 py-0.5">
//                   <div className="w-1.5 h-1.5 rounded-full bg-yellow-300/60"></div>
//                   <span className="text-white/80 text-xs">
//                     {currentLevel.parent_hierarchy.program.title}
//                   </span>
//                 </div>
//               )}
//               <div className="flex items-center gap-2 py-1 pl-4">
//                 <div className="w-2 h-2 rounded-full bg-blue-300"></div>
//                 <span className="font-semibold text-white text-sm border-b border-blue-300/80">
//                   {currentLevel?.title}
//                 </span>
//               </div>
//               <div className="mt-2 text-xs text-white/80 pl-8">
//                 {modules.length} Modules • {totalTopics} Topics
//               </div>
//             </div>
//             <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight drop-shadow-lg">
//               {currentLevel?.title}
//             </h1>
//           </div>
//           <button
//             onClick={() => navigate(-1)}
//             className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white px-3 py-1.5 rounded-xl text-sm font-medium transition-all flex items-center gap-1"
//           >
//             <IoArrowBack className="w-4 h-4" /> Back
//           </button>
//         </div>

//         {/* Stats Section */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
//           <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs text-blue-600 font-medium">Progress</p>
//                 <h2 className="text-3xl font-bold text-blue-700 mt-1">
//                   {Number(progress || 0).toFixed(1)}%
//                 </h2>
//               </div>
//               <IoTrendingUp className="text-blue-400 w-8 h-8" />
//             </div>
//             <div className="w-full h-2 bg-blue-200 rounded-full mt-3">
//               <div
//                 className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
//                 style={{ width: `${progress}%` }}
//               />
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs text-purple-600 font-medium">
//                   Topics Completed
//                 </p>
//                 <h2 className="text-3xl font-bold text-purple-700 mt-1">
//                   {completedTopics}/{totalTopics}
//                 </h2>
//               </div>
//               <IoRibbonOutline className="text-purple-400 w-8 h-8" />
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs text-green-600 font-medium">Est. Time</p>
//                 <h2 className="text-3xl font-bold text-green-700 mt-1">
//                   {totalTime} min
//                 </h2>
//               </div>
//               <IoTimeOutline className="text-green-400 w-8 h-8" />
//             </div>
//             <p className="text-xs text-green-600 mt-2">Total learning time</p>
//           </div>
//         </div>

//         {/* About Section */}
//         <div className="bg-white rounded-xl p-5 mt-4 shadow-sm border border-gray-100">
//           <div className="flex items-start gap-3">
//             <div className="p-2 bg-blue-50 rounded-lg">
//               <IoBookOutline className="w-5 h-5 text-blue-600" />
//             </div>
//             <div className="flex-1">
//               <h3 className="font-semibold text-gray-800 mb-2">
//                 About this Level
//               </h3>
//               <p className="text-sm text-gray-600">
//                 <ReadMoreText
//                   text={
//                     currentLevel?.description || "No description available."
//                   }
//                   maxLength={100}
//                 />
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Modules Section */}
//         <div className="mt-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
//               <IoPlayCircle className="text-blue-600" />
//               Learning Modules
//             </h3>
//             <p className="text-xs text-gray-500">
//               {modules.filter((m) => m.is_completed === true).length} of{" "}
//               {modules.length} modules completed
//             </p>
//           </div>

//           <div className="space-y-3">
//             {modules.map((module, index) => {
//               // Module status flags - ACCORDING TO YOUR API
//               const isModuleCompleted = module.is_completed === true;
//               const isModuleUnlocked = module.is_unlocked === true;
//               const canTakeModuleExam = module.can_take_exam === true;
//               const isModulePassed = module.is_passed === true;
//               const hasModuleAssessment = module.assessment !== null;
//               const hasExamDetails = module.exam_details !== null;
//               const passedAttemptId = module.exam_details?.passed_attempt_id;

//               // Show exam pending badge when: completed AND can take exam AND not passed
//               const showModuleExamPending =
//                 isModuleCompleted && canTakeModuleExam && !isModulePassed;
//               // Show passed badge
//               const showModulePassed = isModulePassed === true;

//               // Check if module has any topic where content is completed but quiz is NOT available
//               const hasQuizNotAvailableForCompletedContent =
//                 module?.chapters?.some((chapter) =>
//                   chapter?.topics?.some(
//                     (topic) =>
//                       topic?.is_content_completed === true &&
//                       topic?.is_quiz_available === false,
//                   ),
//                 );

//               return (
//                 <div
//                   key={module.id}
//                   className={`bg-white rounded-xl p-4 transition-all duration-300 hover:shadow-md border ${
//                     isModuleUnlocked && !isModuleCompleted
//                       ? "border-2 border-blue-500 shadow-lg"
//                       : "border-gray-200 hover:border-blue-300"
//                   }`}
//                 >
//                   <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
//                     {/* Left Content */}
//                     <div className="flex items-center gap-3 flex-1">
//                       <div
//                         className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all
//                           ${isModuleCompleted ? "bg-green-100" : isModuleUnlocked ? "bg-blue-100" : "bg-gray-100"}`}
//                       >
//                         {isModuleCompleted ? (
//                           <IoCheckmarkCircle className="w-6 h-6 text-green-600" />
//                         ) : isModuleUnlocked ? (
//                           <IoPlay className="w-6 h-6 text-blue-600" />
//                         ) : (
//                           <IoLockClosed className="w-6 h-6 text-gray-400" />
//                         )}
//                       </div>

//                       <div className="flex-1">
//                         <div className="flex items-center gap-2 flex-wrap">
//                           <p className="text-xs font-medium text-gray-500">
//                             Module {index + 1}
//                           </p>

//                           {!isModuleUnlocked && (
//                             <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
//                               <IoLockClosed className="w-3 h-3" /> Locked
//                             </span>
//                           )}

//                           {isModuleUnlocked && !isModuleCompleted && (
//                             <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
//                               In Progress
//                             </span>
//                           )}

//                           {showModulePassed && (
//                             <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
//                               <IoSchoolOutline className="w-3 h-3" /> Passed
//                             </span>
//                           )}

//                           {showModuleExamPending && (
//                             <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
//                               <IoWarningOutline className="w-3 h-3" /> Exam
//                               Pending
//                             </span>
//                           )}

//                           {isModuleCompleted &&
//                             !canTakeModuleExam &&
//                             !isModulePassed && (
//                               <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
//                                 Completed
//                               </span>
//                             )}

//                           {/* Quiz Not Available Warning - Only show when content is completed */}
//                           {hasQuizNotAvailableForCompletedContent && (
//                             <span className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
//                               <IoCloseCircleOutline className="w-3 h-3" />
//                               Quiz Not Available
//                             </span>
//                           )}
//                         </div>

//                         <h4 className="text-base font-semibold text-gray-800 mt-0.5">
//                           {module?.title}
//                         </h4>

//                         {/* Show description if exists */}
//                         {module?.description && (
//                           <p className="text-xs text-gray-500 mt-1">
//                             <ReadMoreText
//                               text={module?.description}
//                               maxLength={50}
//                             />
//                           </p>
//                         )}

//                         {module?.chapters && (
//                           <p className="text-xs text-gray-400 mt-1">
//                             {module.chapters.length} Chapters •{" "}
//                             {module.chapters.reduce(
//                               (acc, ch) => acc + (ch.topics?.length || 0),
//                               0,
//                             )}{" "}
//                             Topics
//                           </p>
//                         )}

//                         {/* Progress bar for incomplete modules */}
//                         {isModuleUnlocked &&
//                           !isModuleCompleted &&
//                           module.progress_percent > 0 && (
//                             <div className="mt-2">
//                               <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
//                                 <div
//                                   className="h-full bg-blue-500 rounded-full transition-all"
//                                   style={{
//                                     width: `${module.progress_percent}%`,
//                                   }}
//                                 />
//                               </div>
//                               <p className="text-xs text-gray-400 mt-0.5">
//                                 {module.progress_percent}% complete
//                               </p>
//                             </div>
//                           )}
//                       </div>
//                     </div>

//                     {/* Buttons */}
//                     <div className="flex gap-2 justify-end md:flex-shrink-0">
//                       {/* FAQ Button */}
//                       <button
//                         onClick={() => {
//                           if (isModuleUnlocked) {
//                             navigate(`/faqs?type=module&id=${module.id}`);
//                           }
//                         }}
//                         disabled={!isModuleUnlocked}
//                         className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1
//                           ${
//                             isModuleUnlocked
//                               ? "bg-orange-50 text-orange-600 hover:bg-orange-100 border border-orange-200 cursor-pointer"
//                               : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
//                           }`}
//                       >
//                         <IoHelpCircle className="w-4 h-4" />
//                         FAQ
//                       </button>

//                       {/* CERTIFICATE BUTTON - When exam_details exists and has passed_attempt_id */}
//                       {hasExamDetails && passedAttemptId && (
//                         <button
//                           onClick={() =>
//                             navigate(`/certificate/${passedAttemptId}`)
//                           }
//                           className="px-4 py-2 rounded-lg text-sm font-medium bg-emerald-50 cursor-pointer text-emerald-700 border border-emerald-300 hover:bg-emerald-100 transition-colors flex items-center gap-1"
//                         >
//                           <FaAward className="w-4 h-4" />
//                           View Certificate
//                         </button>
//                       )}

//                       {/* MODULE EXAM BUTTON - Only when exam pending and assessment exists */}
//                       {showModuleExamPending &&
//                         (hasModuleAssessment ? (
//                           <button
//                             onClick={() =>
//                               navigate(`/exam-module/${module.assessment.id}`)
//                             }
//                             className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md hover:opacity-90 transition-all flex items-center gap-1"
//                           >
//                             <IoDocumentTextOutline className="w-4 h-4" />
//                             Take Module Exam
//                           </button>
//                         ) : (
//                           <button
//                             disabled
//                             className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-300 text-gray-500 cursor-not-allowed flex items-center gap-1"
//                           >
//                             <IoCloseCircleOutline className="w-4 h-4" />
//                             Assessment Not Available
//                           </button>
//                         ))}

//                       {/* View/Continue Button */}
//                       {isModuleCompleted ? (
//                         <button
//                           className="px-4 py-2 rounded-md text-sm font-semibold bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-all flex items-center gap-1"
//                           onClick={() => navigate(`/modules/${module.id}`)}
//                         >
//                           <IoBookOutline className="w-4 h-4" />
//                           View Content
//                         </button>
//                       ) : (
//                         <button
//                           className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1
//                             ${
//                               isModuleUnlocked
//                                 ? "bg-accent hover:opacity-90 text-white shadow-md cursor-pointer"
//                                 : "bg-gray-100 text-gray-500 cursor-not-allowed"
//                             }`}
//                           disabled={!isModuleUnlocked}
//                           onClick={() => {
//                             if (isModuleUnlocked) {
//                               navigate(`/modules/${module.id}`);
//                             }
//                           }}
//                         >
//                           <IoPlay className="w-4 h-4" />
//                           {isModuleUnlocked ? "Continue" : "Locked"}
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Bottom Sticky CTA - Shows quiz not available warning for completed content */}
//         <div className="fixed bottom-15 lg:bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 shadow-lg z-10">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex items-center justify-between flex-wrap gap-3">
//               <div className="hidden sm:block">
//                 {hasQuizNotAvailableForCompletedContent ? (
//                   <>
//                     <p className="text-sm text-orange-600 font-medium flex items-center gap-2">
//                       <IoWarningOutline className="w-4 h-4" />
//                       Quiz Not Available for Completed Content
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       You've completed the content but the quiz is unavailable.
//                       Please contact support for assistance.
//                     </p>
//                   </>
//                 ) : (
//                   <>
//                     <p className="text-sm text-gray-600">
//                       Continue your learning journey
//                     </p>
//                     <p className="text-xs text-gray-400">
//                       {nextModule
//                         ? `Next: ${nextModule.title}`
//                         : "All modules completed! Check your module exams."}
//                     </p>
//                   </>
//                 )}
//               </div>

//               {hasQuizNotAvailableForCompletedContent ? (
//                 <button
//                   onClick={() => {
//                     // Find first topic where content is completed but quiz is not available
//                     const firstQuizNotAvailableTopic = (() => {
//                       for (const module of modules) {
//                         if (module.is_unlocked) {
//                           for (const chapter of module.chapters || []) {
//                             for (const topic of chapter.topics || []) {
//                               if (
//                                 topic?.is_content_completed === true &&
//                                 topic?.is_quiz_available === false
//                               ) {
//                                 return {
//                                   moduleId: module.id,
//                                   topicId: topic.id,
//                                 };
//                               }
//                             }
//                           }
//                         }
//                       }
//                       return null;
//                     })();

//                     if (firstQuizNotAvailableTopic) {
//                       navigate(
//                         `/modules/${firstQuizNotAvailableTopic.moduleId}`,
//                       );
//                     }
//                   }}
//                   className="flex-1 sm:flex-none px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white shadow-md cursor-pointer"
//                 >
//                   <IoCloseCircleOutline className="w-5 h-5" />
//                   View Quiz Issues
//                   <IoChevronForward className="w-4 h-4" />
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => {
//                     if (nextModule) {
//                       navigate(`/modules/${nextModule.id}`);
//                     }
//                   }}
//                   disabled={!nextModule}
//                   className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2
//                     ${
//                       nextModule
//                         ? "bg-accent hover:opacity-90 text-white shadow-md cursor-pointer"
//                         : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                     }`}
//                 >
//                   <IoPlayCircle className="w-5 h-5" />
//                   {nextModule ? "Continue Learning" : "All Modules Completed"}
//                   <IoChevronForward className="w-4 h-4" />
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </PageBody>
//     </PageLayout>
//   );
// }

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
  IoDocumentTextOutline,
  IoWarningOutline,
  IoSchoolOutline,
  IoCloseCircleOutline,
  IoDownloadOutline,
  IoMedalOutline,
} from "react-icons/io5";
import Loader from "../../../common/Loader";
import Error from "../../../common/Error";
import { useTranslation } from "react-i18next";
import ReadMoreText from "../../../common/ReadMoreText";
import { FaAward } from "react-icons/fa";

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

  // Find first unlocked and not completed module
  const nextModule = modules.find(
    (m) => m.is_unlocked === true && m.is_completed === false,
  );

  // Check if any module has a quiz not available AFTER content is completed for the sticky button
  const hasQuizNotAvailableForCompletedContent = modules.some((module) => {
    return module?.chapters?.some((chapter) => {
      return chapter?.topics?.some((topic) => {
        // Only show quiz not available warning if content is completed AND quiz is not available
        return (
          topic?.is_content_completed === true &&
          topic?.is_quiz_available === false
        );
      });
    });
  });

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
            <p className="text-gray-500">{t("levelDetails.levelNotFound")}</p>
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
        {/* Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl group">
          <img
            src={
              currentLevel?.thumbnail ||
              "https://lms-backend.netswaptech.com/public/uploads/logo.png"
            }
            className="w-full h-56 sm:h-72 lg:h-[450px] object-cover"
            alt="Level Banner"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="mb-3">
              {currentLevel?.parent_hierarchy?.program?.title && (
                <div className="flex items-center gap-2 py-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-300/60"></div>
                  <span className="text-white/80 text-xs">
                    {currentLevel.parent_hierarchy.program.title}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 py-1 pl-4">
                <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                <span className="font-semibold text-white text-sm border-b border-blue-300/80">
                  {currentLevel?.title}
                </span>
              </div>
              <div className="mt-2 text-xs text-white/80 pl-8">
                {modules.length} {t("levelDetails.modules")} • {totalTopics}{" "}
                {t("levelDetails.topics")}
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight drop-shadow-lg">
              {currentLevel?.title}
            </h1>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white px-3 py-1.5 rounded-xl text-sm font-medium transition-all flex items-center gap-1"
          >
            <IoArrowBack className="w-4 h-4" /> {t("levelDetails.backButton")}
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-blue-600 font-medium">
                  {t("levelDetails.stats.progress")}
                </p>
                <h2 className="text-3xl font-bold text-blue-700 mt-1">
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
                  {t("levelDetails.stats.topicsCompleted")}
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
              <p className="text-sm text-gray-600">
                <ReadMoreText
                  text={
                    currentLevel?.description ||
                    t("levelDetails.aboutSection.noDescription")
                  }
                  maxLength={100}
                />
              </p>
            </div>
          </div>
        </div>

        {/* Modules Section */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
              <IoPlayCircle className="text-blue-600" />
              {t("levelDetails.modulesSection.title")}
            </h3>
            <p className="text-xs text-gray-500">
              {modules.filter((m) => m.is_completed === true).length} of{" "}
              {modules.length}{" "}
              {t("levelDetails.modulesSection.modulesCompleted")}
            </p>
          </div>

          <div className="space-y-3">
            {modules.map((module, index) => {
              // Module status flags - ACCORDING TO YOUR API
              const isModuleCompleted = module.is_completed === true;
              const isModuleUnlocked = module.is_unlocked === true;
              const canTakeModuleExam = module.can_take_exam === true;
              const isModulePassed = module.is_passed === true;
              const hasModuleAssessment = module.assessment !== null;
              const hasExamDetails = module.exam_details !== null;
              const passedAttemptId = module.exam_details?.passed_attempt_id;

              // Show exam pending badge when: completed AND can take exam AND not passed
              const showModuleExamPending =
                isModuleCompleted && canTakeModuleExam && !isModulePassed;
              // Show passed badge
              const showModulePassed = isModulePassed === true;

              // Check if module has any topic where content is completed but quiz is NOT available
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
                    {/* Left Content */}
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all
                          ${isModuleCompleted ? "bg-green-100" : isModuleUnlocked ? "bg-blue-100" : "bg-gray-100"}`}
                      >
                        {isModuleCompleted ? (
                          <IoCheckmarkCircle className="w-6 h-6 text-green-600" />
                        ) : isModuleUnlocked ? (
                          <IoPlay className="w-6 h-6 text-blue-600" />
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

                          {/* Quiz Not Available Warning - Only show when content is completed */}
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

                        {/* Show description if exists */}
                        {module?.description && (
                          <p className="text-xs text-gray-500 mt-1">
                            <ReadMoreText
                              text={module?.description}
                              maxLength={50}
                            />
                          </p>
                        )}

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

                        {/* Progress bar for incomplete modules */}
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

                    {/* Buttons */}
                    <div className="flex gap-2 justify-end md:flex-shrink-0">
                      {/* FAQ Button */}
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

                      {/* CERTIFICATE BUTTON - When exam_details exists and has passed_attempt_id */}
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

                      {/* MODULE EXAM BUTTON - Only when exam pending and assessment exists */}
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

                      {/* View/Continue Button */}
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

        {/* Bottom Sticky CTA - Shows quiz not available warning for completed content */}
        <div className="fixed bottom-15 lg:bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 shadow-lg z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    // Find first topic where content is completed but quiz is not available
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

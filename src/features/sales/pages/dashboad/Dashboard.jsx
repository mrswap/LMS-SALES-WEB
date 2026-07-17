// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
// import { CiLock } from "react-icons/ci";
// import {
//   FaShieldAlt,
//   FaBookOpen,
//   FaLayerGroup,
//   FaBook,
//   FaChevronDown,
//   FaChevronUp,
//   FaTrophy,
//   FaCertificate,
// } from "react-icons/fa";
// import {
//   FiTrendingUp,
//   FiPlayCircle,
//   FiChevronRight,
//   FiBarChart2,
//   FiClock,
// } from "react-icons/fi";
// import { MdOutlineQuiz } from "react-icons/md";

// import {
//   PageBody,
//   PageHeader,
//   PageHeaderLeft,
//   PageLayout,
//   PageSubtitle,
//   PageTitle,
// } from "../../common/layout";
// import Loader from "../../common/Loader";
// import Error from "../../common/Error";

// import { getDashboardData } from "../../../../redux/slice/dashboardSlice";

// // ----------------------------------------------------------------------
// // LevelCard Component (fully responsive)
// // ----------------------------------------------------------------------
// const LevelCard = ({ level, onClick }) => {
//   const isLocked = level.status === "locked";
//   const isCompleted = level.status === "completed";
//   const isInProgress = level.status === "unlocked";

//   let badge = {
//     label: "Locked",
//     color: "bg-gray-200 text-gray-600",
//     icon: <CiLock className="text-gray-500 text-sm" />,
//   };
//   if (isCompleted) {
//     badge = {
//       label: "Completed",
//       color: "bg-green-100 text-green-700",
//       icon: <IoCheckmarkCircle className="text-green-500 text-sm" />,
//     };
//   } else if (isInProgress) {
//     badge = {
//       label: "In Progress",
//       color: "bg-blue-100 text-blue-700",
//       icon: <FiTrendingUp className="text-blue-500 text-sm" />,
//     };
//   }

//   const totalChapters =
//     level.modules?.reduce((acc, mod) => acc + (mod.chapters?.length || 0), 0) ||
//     0;

//   return (
//     <div
//       className={`
//         bg-white rounded-2xl border shadow-sm
//         transition-all duration-300 ease-in-out overflow-hidden
//         flex flex-col h-full w-full
//         ${
//           isLocked
//             ? "border-gray-200 opacity-70 cursor-not-allowed"
//             : "border-gray-200 hover:border-blue-400 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
//         }
//       `}
//       onClick={() => {
//         if (!isLocked) onClick();
//       }}
//     >
//       <div className="px-3 sm:px-5 pt-3 sm:pt-5 pb-2 flex items-start justify-between gap-2 sm:gap-4">
//         <div className="flex-1 min-w-0">
//           <h3 className="text-sm sm:text-lg font-bold text-gray-800 leading-tight truncate">
//             {level.title}
//           </h3>
//           <div className="flex items-center gap-1.5 text-[10px] sm:text-sm text-gray-500 mt-1 flex-wrap">
//             <span>{level.total_modules} Modules</span>
//             <span className="w-1 h-1 rounded-full bg-gray-300" />
//             <span>{totalChapters} Chapters</span>
//             <span className="w-1 h-1 rounded-full bg-gray-300" />
//             <span>{level.total_topics} Topics</span>
//           </div>
//         </div>
//         <div
//           className={`flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-semibold whitespace-nowrap ${badge.color}`}
//         >
//           {badge.icon}
//           <span>{badge.label}</span>
//         </div>
//       </div>

//       {!isLocked ? (
//         <div className="px-3 sm:px-5 pt-3 pb-1">
//           <div className="flex justify-between text-[10px] sm:text-xs text-gray-600 mb-1">
//             <span className="font-medium truncate">
//               {level.completed_topics || 0} Topics completed
//             </span>
//             <span className="font-semibold text-blue-600 flex-shrink-0 ml-2">
//               {level.completion_percent || 0}%
//             </span>
//           </div>
//           <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
//             <div
//               className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-700 ease-out"
//               style={{ width: `${level.completion_percent || 0}%` }}
//             />
//           </div>
//         </div>
//       ) : (
//         <div className="px-3 sm:px-5 pt-3 pb-1">
//           <div className="text-[10px] sm:text-xs text-gray-400 italic">
//             Locked
//           </div>
//         </div>
//       )}

//       <div className="mt-auto px-3 sm:px-5 py-3 border-t border-gray-100/80 flex items-center justify-between flex-wrap gap-1">
//         <span className="text-[9px] sm:text-xs text-gray-500 flex items-center gap-1.5">
//           {isLocked ? (
//             <>
//               <CiLock className="w-3.5 h-3.5" />
//               Complete previous level to unlock
//             </>
//           ) : (
//             "Ready to level up?"
//           )}
//         </span>

//         <div
//           className={`
//             text-[10px] sm:text-sm font-medium flex items-center gap-1.5 transition-colors duration-200
//             ${isLocked ? "text-gray-400" : "text-blue-600 hover:text-blue-800"}
//           `}
//         >
//           {isLocked ? "Locked" : "View Path"}
//           {!isLocked && <FiChevronRight className="w-3.5 h-3.5" />}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ----------------------------------------------------------------------
// // StatCard (fully responsive – truncates text, resizes)
// // ----------------------------------------------------------------------
// const StatCard = ({ icon: Icon, title, value, subtitle, color }) => {
//   const colors = {
//     blue: "bg-blue-500/20 text-blue-300",
//     green: "bg-green-500/20 text-green-300",
//     purple: "bg-purple-500/20 text-purple-300",
//     orange: "bg-orange-500/20 text-orange-300",
//   };

//   return (
//     <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-2 sm:p-4 transition-transform duration-300 hover:scale-105 hover:border-white/30 min-w-0">
//       <div className="flex items-start justify-between gap-2">
//         <div className="flex-1 min-w-0">
//           <p className="text-[7px] sm:text-[10px] font-medium text-gray-300 uppercase tracking-wider truncate">
//             {title}
//           </p>
//           <p className="text-base sm:text-xl font-bold text-white mt-1 truncate">
//             {value}
//           </p>
//           <p className="text-[7px] sm:text-[10px] text-gray-400 mt-0.5 truncate">
//             {subtitle}
//           </p>
//         </div>
//         <div
//           className={`p-1.5 sm:p-2 rounded-xl flex-shrink-0 ${colors[color]}`}
//         >
//           <Icon className="text-sm sm:text-lg" />
//         </div>
//       </div>
//     </div>
//   );
// };

// // ----------------------------------------------------------------------
// // ProgressAnalytics (accordion, responsive)
// // ----------------------------------------------------------------------
// const ProgressAnalytics = ({ levels }) => {
//   const [expandedLevel, setExpandedLevel] = useState(null);
//   const [expandedModule, setExpandedModule] = useState(null);

//   useEffect(() => {
//     if (levels && levels.length > 0 && !expandedLevel) {
//       const firstUnlocked = levels.find((l) => l.status === "unlocked");
//       if (firstUnlocked) setExpandedLevel(firstUnlocked.id);
//     }
//   }, [levels, expandedLevel]);

//   return (
//     <div className="space-y-4">
//       <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//         <div className="bg-gray-50 px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200">
//           <h3 className="font-semibold text-gray-800 flex items-center gap-2 text-sm sm:text-base">
//             <FaShieldAlt className="text-blue-500" />
//             Level Progress Details
//           </h3>
//         </div>
//         <div className="p-3 sm:p-4">
//           {levels?.map((level) => (
//             <div key={level.id} className="mb-4 sm:mb-6 last:mb-0">
//               <div
//                 className={`flex items-center justify-between mb-2 p-2 rounded-lg cursor-pointer transition-colors ${
//                   level.status === "locked" ? "opacity-60" : "hover:bg-gray-50"
//                 }`}
//                 onClick={() => {
//                   if (level.status !== "locked") {
//                     setExpandedLevel(
//                       expandedLevel === level.id ? null : level.id,
//                     );
//                   }
//                 }}
//               >
//                 <div className="flex items-center gap-2 flex-1 min-w-0">
//                   {level.status !== "locked" &&
//                     (expandedLevel === level.id ? (
//                       <FaChevronUp className="text-gray-500 text-xs flex-shrink-0" />
//                     ) : (
//                       <FaChevronDown className="text-gray-500 text-xs flex-shrink-0" />
//                     ))}
//                   {level.status === "locked" && (
//                     <CiLock className="text-gray-400 text-xs flex-shrink-0" />
//                   )}
//                   <span className="font-semibold text-gray-800 text-sm sm:text-base truncate">
//                     {level.title}
//                   </span>
//                   <span className="text-[9px] sm:text-xs text-gray-500 flex-shrink-0 ml-1">
//                     ({level.completed_topics || 0}/{level.total_topics || 0}{" "}
//                     Topics)
//                   </span>
//                 </div>
//                 <span className="text-sm font-semibold text-blue-600 flex-shrink-0 ml-2">
//                   {level.completion_percent || 0}%
//                 </span>
//               </div>

//               <div className="mb-3 pl-2 sm:pl-6">
//                 <div className="w-full h-2 bg-gray-200 rounded-full">
//                   <div
//                     className="h-2 bg-blue-500 rounded-full transition-all"
//                     style={{ width: `${level.completion_percent || 0}%` }}
//                   />
//                 </div>
//               </div>

//               {expandedLevel === level.id && level.modules?.length > 0 && (
//                 <div className="ml-2 sm:ml-6 mt-3 space-y-3">
//                   {level.modules.map((module) => (
//                     <div
//                       key={module.module_id}
//                       className="border border-gray-100 rounded-lg overflow-hidden"
//                     >
//                       <div
//                         className="p-2 sm:p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
//                         onClick={() =>
//                           setExpandedModule(
//                             expandedModule === module.module_id
//                               ? null
//                               : module.module_id,
//                           )
//                         }
//                       >
//                         <div className="flex items-center gap-2 mb-1">
//                           <FaLayerGroup className="text-green-600 text-xs sm:text-sm flex-shrink-0" />
//                           <span className="font-medium text-gray-800 text-sm sm:text-base truncate">
//                             {module.module_title}
//                           </span>
//                           <div className="flex-shrink-0 ml-auto">
//                             {expandedModule === module.module_id ? (
//                               <FaChevronUp className="text-gray-500" />
//                             ) : (
//                               <FaChevronDown className="text-gray-500" />
//                             )}
//                           </div>
//                         </div>
//                         <div className="flex justify-between items-center mb-1">
//                           <span className="text-[9px] sm:text-xs text-gray-500">
//                             ({module.completed_topics || 0}/
//                             {module.total_topics || 0} Topics)
//                           </span>
//                           <span className="text-xs sm:text-sm font-semibold text-green-600">
//                             {module.progress_percent || 0}%
//                           </span>
//                         </div>
//                         <div className="w-full h-1.5 bg-gray-200 rounded-full">
//                           <div
//                             className="h-1.5 bg-green-500 rounded-full transition-all"
//                             style={{
//                               width: `${module.progress_percent || 0}%`,
//                             }}
//                           />
//                         </div>
//                       </div>

//                       {expandedModule === module.module_id &&
//                         module.chapters?.length > 0 && (
//                           <div className="border-t border-gray-100 p-2 sm:p-3 bg-white">
//                             <p className="text-[9px] sm:text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1">
//                               <FaBook className="text-purple-500" />
//                               Chapters
//                             </p>
//                             <div className="space-y-3 max-h-[300px] overflow-y-auto">
//                               {module.chapters.map((chapter) => (
//                                 <div
//                                   key={chapter.chapter_id}
//                                   className="pl-1 sm:pl-2"
//                                 >
//                                   <div className="mb-1">
//                                     <div className="flex items-center gap-2 mb-1">
//                                       <FaBook className="text-purple-400 text-[10px] sm:text-xs flex-shrink-0" />
//                                       <span className="text-xs sm:text-sm text-gray-700 truncate">
//                                         {chapter.chapter_title}
//                                       </span>
//                                     </div>
//                                     <div className="flex justify-between items-center">
//                                       <span className="text-[9px] sm:text-xs text-gray-400">
//                                         ({chapter.completed_topics || 0}/
//                                         {chapter.total_topics || 0} Topics)
//                                       </span>
//                                       <span className="text-[9px] sm:text-xs font-medium text-purple-600">
//                                         {chapter.progress_percent || 0}%
//                                       </span>
//                                     </div>
//                                   </div>
//                                   <div className="w-full h-1 bg-gray-100 rounded-full">
//                                     <div
//                                       className="h-1 bg-purple-500 rounded-full transition-all"
//                                       style={{
//                                         width: `${chapter.progress_percent || 0}%`,
//                                       }}
//                                     />
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const AssessmentStatusCard = ({ assessment, navigate }) => {
//   if (!assessment) return null;

//   const {
//     type,
//     status,
//     title,
//     reason,
//     last_attempt,
//     is_completed,
//     assessment_id,
//     progress,
//   } = assessment;

//   const isContentComplete = (progress?.remaining ?? 0) === 0;
//   const completed = progress?.completed ?? 0;
//   const total = progress?.total ?? 0;
//   const remaining = progress?.remaining ?? 0;
//   const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

//   // Status badge configuration
//   const getStatusBadge = (status) => {
//     const map = {
//       locked: {
//         label: "Locked",
//         color: "bg-gray-100 text-gray-600 border-gray-200",
//         icon: <CiLock className="text-gray-500" />,
//       },
//       ready: {
//         label: "Ready",
//         color: "bg-emerald-50 text-emerald-700 border-emerald-200",
//         icon: <FiTrendingUp className="text-emerald-500" />,
//       },
//       failed: {
//         label: "Failed",
//         color: "bg-rose-50 text-rose-700 border-rose-200",
//         icon: <IoCloseCircle className="text-rose-500" />,
//       },
//       passed: {
//         label: "Passed",
//         color: "bg-emerald-50 text-emerald-700 border-emerald-200",
//         icon: <IoCheckmarkCircle className="text-emerald-500" />,
//       },
//       not_found: {
//         label: "Not Found",
//         color: "bg-gray-100 text-gray-600 border-gray-200",
//         icon: <CiLock className="text-gray-500" />,
//       },
//       completed: {
//         label: "Completed",
//         color: "bg-emerald-50 text-emerald-700 border-emerald-200",
//         icon: <IoCheckmarkCircle className="text-emerald-500" />,
//       },
//     };
//     return map[status] || map.locked;
//   };

//   const badge = getStatusBadge(status);

//   // --- Action label ---
//   const getActionLabel = () => {
//     if (status === "failed") {
//       if (type === "topic") return "Retry Quiz";
//       if (type === "module") return "Retry Exam";
//       return "Retry";
//     }
//     if (status === "ready") {
//       if (type === "topic") return "Start Quiz";
//       if (type === "module") return "Start Exam";
//       return "Start";
//     }
//     if (status === "passed" || status === "completed" || is_completed) {
//       return "View Results";
//     }
//     return "Locked";
//   };

//   // --- Dual-context Message ---
//   const getStatusMessage = () => {
//     let contentMsg = "";

//     if (isContentComplete) {
//       contentMsg = "All required content completed.";
//     } else {
//       return `Complete ${remaining} more item${
//         remaining > 1 ? "s" : ""
//       } to unlock the assessment.`;
//     }

//     if (status === "failed") {
//       const percent = last_attempt?.percentage ?? 0;
//       return `${contentMsg} Last score: ${percent}%. Try again.`;
//     }

//     if (status === "ready") {
//       return `${contentMsg} Quiz is ready to start.`;
//     }

//     if (status === "passed" || status === "completed" || is_completed) {
//       return `${contentMsg} Assessment passed successfully.`;
//     }

//     return contentMsg;
//   };

//   // --- Navigation ---
//   const handleAction = () => {
//     if (!assessment_id) return;

//     if (status === "failed" || status === "ready") {
//       let path = `/assessment/${assessment_id}`;
//       if (type === "topic") {
//         path = `/quiz/${assessment_id}`;
//       } else if (type === "module") {
//         path = `/exam-module/${assessment_id}`;
//       } else if (type === "chapter") {
//         path = `/exam-chapter/${assessment_id}`;
//       } else if (type === "level") {
//         path = `/exam-level/${assessment_id}`;
//       }
//       navigate(path);
//     } else if (status === "passed" || status === "completed" || is_completed) {
//       navigate(`/assessment/${assessment_id}/results`);
//     }
//   };

//   const isActionDisabled =
//     status === "locked" || status === "not_found" || status === "completed";

//   const totalQuestions =
//     last_attempt?.total_questions || last_attempt?.total_score || "?";

//   return (
//     <div className="w-full bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
//       <div className="p-4 sm:p-6">
//         {/* Header: Type + Status Badge + View All */}
//         <div className="flex items-center justify-between gap-3 flex-wrap">
//           <div className="flex items-center gap-2">
//             <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">
//               {type || "Assessment"}
//             </span>
//           </div>
//           <div className="flex items-center gap-3">
//             <span
//               className={`inline-flex items-center gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-semibold border ${badge.color}`}
//             >
//               {badge.icon}
//               {badge.label}
//             </span>
//             <button
//               className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 whitespace-nowrap transition-colors"
//               onClick={() => navigate("/assessments")}
//             >
//               View all
//               <FiChevronRight className="w-4 h-4" />
//             </button>
//           </div>
//         </div>

//         {/* Title */}
//         <h3 className="text-lg sm:text-xl font-bold text-slate-800 mt-3 leading-snug tracking-tight break-words">
//           {title || "Untitled Assessment"}
//         </h3>

//         {/* Content Progress Row */}
//         <div className="flex items-center gap-3 mt-3 flex-wrap">
//           <span className="text-[10px] sm:text-xs font-medium text-slate-500">
//             Content Progress
//           </span>
//           <span
//             className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] sm:text-xs font-semibold border ${
//               isContentComplete
//                 ? "bg-emerald-50 text-emerald-700 border-emerald-200"
//                 : "bg-amber-50 text-amber-700 border-amber-200"
//             }`}
//           >
//             {isContentComplete ? (
//               <IoCheckmarkCircle className="w-3 h-3" />
//             ) : (
//               <FiTrendingUp className="w-3 h-3" />
//             )}
//             {isContentComplete ? "Completed" : "In Progress"}
//           </span>
//           <span className="text-[10px] sm:text-xs text-slate-400 font-medium">
//             ({completed}/{total})
//           </span>
//         </div>

//         {/* Progress Bar */}
//         <div className="mt-2">
//           <div className="flex justify-between items-center text-[10px] sm:text-xs text-slate-500 mb-1">
//             <span className="font-medium">Reading Progress</span>
//             <span className="font-semibold text-blue-600">
//               {progressPercent}%
//             </span>
//           </div>
//           <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
//             <div
//               className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
//               style={{ width: `${progressPercent}%` }}
//             />
//           </div>
//         </div>

//         {/* Status Message */}
//         <div className="mt-3 p-3 bg-slate-50/80 rounded-lg border border-slate-100/80">
//           <p className="text-xs sm:text-sm text-slate-600 flex items-start gap-2">
//             <span className="text-slate-400 text-base leading-none">•</span>
//             <span className="leading-relaxed break-words">
//               {getStatusMessage()}
//             </span>
//           </p>
//         </div>

//         {/* Last Attempt (only if exists) */}
//         {last_attempt && (
//           <div className="mt-4 p-3 bg-slate-50/80 rounded-lg border border-slate-100/80">
//             <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] sm:text-xs">
//               <span className="font-medium text-slate-500">Last Attempt:</span>
//               <span
//                 className={`font-semibold ${
//                   last_attempt.status === "passed"
//                     ? "text-emerald-600"
//                     : "text-rose-600"
//                 }`}
//               >
//                 {last_attempt.status?.toUpperCase() || "N/A"}
//               </span>
//               <span className="text-slate-600">
//                 Score: {last_attempt.score ?? 0}/{totalQuestions}
//               </span>
//               <span className="text-slate-600">
//                 {last_attempt.percentage ?? 0}%
//               </span>
//               <span className="text-slate-400 flex items-center gap-1">
//                 <FiClock className="w-3 h-3" />
//                 {Math.floor((last_attempt.time_taken ?? 0) / 60)}m{" "}
//                 {(last_attempt.time_taken ?? 0) % 60}s
//               </span>
//               <span className="text-slate-400">
//                 {last_attempt.submitted_at
//                   ? new Date(last_attempt.submitted_at).toLocaleDateString(
//                       undefined,
//                       {
//                         month: "short",
//                         day: "numeric",
//                         year: "numeric",
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       },
//                     )
//                   : ""}
//               </span>
//             </div>
//           </div>
//         )}

//         {/* Action Button - Aligned Right, styled like Resume Topic button */}
//         <div className="mt-5 flex justify-end">
//           <button
//             onClick={handleAction}
//             disabled={isActionDisabled}
//             className={`
//               px-4 sm:px-6 py-1.5 sm:py-2 rounded-2xl font-medium transition-all duration-200
//               flex items-center gap-1.5 text-xs sm:text-sm
//               ${
//                 status === "failed" || status === "ready"
//                   ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
//                   : status === "passed" || is_completed
//                     ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                     : "bg-gray-100 text-gray-400 cursor-not-allowed"
//               }
//             `}
//           >
//             {(status === "failed" || status === "ready") && (
//               <FiPlayCircle className="w-4 h-4" />
//             )}
//             {getActionLabel()}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ----------------------------------------------------------------------
// // MAIN DASHBOARD COMPONENT
// // ----------------------------------------------------------------------
// export default function Dashboard() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { dashboardData, isLoading, isError, message } = useSelector(
//     (state) => state.dashboard,
//   );
//   const { profile } = useSelector((state) => state.profile);
//   const [animateItems, setAnimateItems] = useState(false);

//   useEffect(() => {
//     dispatch(getDashboardData());
//     setTimeout(() => setAnimateItems(true), 100);
//   }, [dispatch]);

//   if (isLoading) return <Loader />;
//   if (isError) return <Error message={message} />;

//   const data = dashboardData?.data;
//   if (!data) return null;

//   const {
//     current_learning,
//     levels,
//     stats,
//     last_certificate,
//     next_action,
//     assessment_status,
//   } = data;

//   const totalLevels = stats?.total_levels || 0;
//   const completedLevels = stats?.completed_levels || 0;
//   const inProgressLevels =
//     totalLevels - completedLevels - (stats?.remaining_levels || 0);
//   const totalTopics = stats?.total_topics || 0;
//   const completedTopics = stats?.completed_topics || 0;
//   const overallProgress =
//     totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

//   const currentLevelId = current_learning?.level?.id;
//   const currentLevelData = levels?.find((l) => l.id === currentLevelId);
//   const currentModuleId = current_learning?.module?.id;
//   const currentModuleData = currentLevelData?.modules?.find(
//     (m) => m.module_id === currentModuleId,
//   );
//   const currentChapterId = current_learning?.chapter?.id;
//   const currentChapterData = currentModuleData?.chapters?.find(
//     (c) => c.chapter_id === currentChapterId,
//   );

//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return "Good Morning";
//     if (hour < 18) return "Good Afternoon";
//     return "Good Evening";
//   };

//   const getUserName = () => profile?.name || "";

//   const handleViewAllLevels = () => navigate("/levels");
//   const handleResumeTopic = () => {
//     if (current_learning?.topic?.id) {
//       navigate(`/topics/${current_learning.topic.id}`);
//     }
//   };

//   const currentHierarchy = {
//     program: current_learning?.program?.title,
//     level: currentLevelData?.title || current_learning?.level?.title,
//     module: currentModuleData?.module_title || current_learning?.module?.title,
//     chapter:
//       currentChapterData?.chapter_title || current_learning?.chapter?.title,
//     topic: current_learning?.topic?.title,
//   };

//   const levelProgress =
//     currentLevelData?.completion_percent ||
//     current_learning?.progress_percent ||
//     0;

//   const topicProgress = stats?.current_topic_progress || {};
//   const topicProgressPercent = topicProgress.progress_percent || 0;
//   const readContents = topicProgress.read_contents || 0;
//   const totalContents = topicProgress.total_contents || 0;

//   const allLevels = levels || [];

//   return (
//     <PageLayout>
//       <PageHeader>
//         <PageHeaderLeft>
//           <PageTitle>
//             {getGreeting()}, {getUserName()}
//           </PageTitle>
//           <PageSubtitle>
//             Track your learning progress and continue where you left off
//           </PageSubtitle>
//         </PageHeaderLeft>
//       </PageHeader>

//       <PageBody>
//         {/* Top Section: Current Level Overview + Resume & Assessments */}
//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 my-4">
//           {/* Left Column */}
//           <div className="lg:col-span-3 flex flex-col h-full">
//             {/* Resume Learning Card */}
//             <div className="bg-white rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-teal-400 flex flex-col p-4 sm:p-5 flex-1 mb-4">
//               <div className="flex items-start justify-between mb-3 sm:mb-4">
//                 <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
//                   Resume your topic learning
//                 </h2>
//                 <span className="text-[7px] sm:text-[8px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
//                   In Progress
//                 </span>
//               </div>
//               <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 flex-1">
//                 <div className="relative w-16 h-16 sm:w-24 sm:h-24 shrink-0 rounded-lg overflow-hidden bg-slate-100 mt-0.5">
//                   <img
//                     src={
//                       current_learning?.module?.thumbnail ||
//                       currentLevelData?.modules?.find(
//                         (m) => m.module_id === current_learning?.module?.id,
//                       )?.thumbnail
//                     }
//                     alt={current_learning?.module?.title || "Module"}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.target.src = "/images/default-module.png";
//                     }}
//                   />

//                   <div className="absolute bottom-1 right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-teal-500/90 flex items-center justify-center">
//                     <div className="w-0 h-0 border-t-[3px] sm:border-t-[4px] border-t-transparent border-b-[3px] sm:border-b-[4px] border-b-transparent border-l-[5px] sm:border-l-[6px] border-l-white ml-0.5" />
//                   </div>
//                 </div>

//                 <div className="flex-1 flex flex-col h-full w-full min-w-0">
//                   <div className="flex items-start gap-1.5 mt-0.5">
//                     <div className="flex items-center gap-2 flex-wrap">
//                       <span>
//                         <FaBook className="text-blue-500 text-xs mt-0.5" />
//                       </span>
//                       <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium">
//                         Current Topic:
//                       </span>
//                       <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug break-words">
//                         {current_learning?.topic?.title ||
//                           currentHierarchy.topic ||
//                           "No topic started"}
//                       </h2>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-2 mt-1 flex-wrap">
//                     <FaBookOpen className="text-purple-500 text-xs" />
//                     <p className="text-[10px] sm:text-xs text-slate-500">
//                       Chapter:{" "}
//                       <span className="font-semibold text-slate-700">
//                         {currentHierarchy.chapter || "Not yet started"}
//                       </span>
//                     </p>
//                   </div>

//                   <div className="flex items-center gap-2 mt-1 flex-wrap">
//                     <FaLayerGroup className="text-green-500 text-xs" />
//                     <p className="text-[10px] sm:text-xs text-slate-500">
//                       Module:{" "}
//                       <span className="font-semibold text-slate-700">
//                         {currentHierarchy.module || "Not yet started"}
//                       </span>
//                     </p>
//                   </div>

//                   <div className="mt-2">
//                     <div className="flex justify-between text-[8px] sm:text-[9px] text-slate-400 mb-0.5">
//                       <span>Topic Progress</span>
//                       <span className="font-medium text-blue-600">
//                         {topicProgressPercent}%
//                       </span>
//                     </div>
//                     <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
//                       <div
//                         className="h-full bg-blue-500 rounded-full transition-all duration-700"
//                         style={{ width: `${topicProgressPercent}%` }}
//                       />
//                     </div>
//                   </div>

//                   <div className="mt-auto flex items-center justify-end gap-2 pt-2">
//                     <button
//                       className="px-4 sm:px-6 bg-blue-600 text-white text-xs sm:text-sm py-1.5 sm:py-2 rounded-2xl font-medium cursor-pointer hover:bg-blue-700 hover:shadow-md transition-all flex items-center gap-1.5"
//                       onClick={handleResumeTopic}
//                     >
//                       <FiPlayCircle size={12} />
//                       {current_learning?.cta?.type === "resume"
//                         ? "Resume Topic"
//                         : "Start Topic"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Upcoming Assessments - IMPROVED */}
//             <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-5 flex-1 flex flex-col">
//               <div className="flex items-start justify-between mb-3">
//                 <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
//                   Upcoming Assessments
//                 </h2>
//               </div>

//               <div className="flex-1 flex items-center">
//                 {assessment_status ? (
//                   <AssessmentStatusCard
//                     assessment={assessment_status}
//                     navigate={navigate}
//                   />
//                 ) : next_action ? (
//                   // Fallback to next_action if assessment_status is not provided
//                   <div className="w-full border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
//                     <div className="flex items-start gap-4">
//                       <div className="w-10 h-10 shrink-0 rounded-md bg-blue-50 flex items-center justify-center text-blue-600 mt-0.5">
//                         <MdOutlineQuiz className="text-xl" />
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center gap-2 flex-wrap">
//                           <span className="bg-rose-100 text-rose-600 text-[8px] sm:text-[9px] font-bold px-2 py-0.5 rounded">
//                             {next_action.type?.toUpperCase() || "UPCOMING"}
//                           </span>
//                           <span className="text-sm font-semibold text-slate-800 break-words">
//                             {next_action.assessment_title || "Assessment Ready"}
//                           </span>
//                         </div>
//                         <div className="mt-2 space-y-1.5">
//                           <p className="text-[10px] sm:text-xs text-slate-500 flex items-center gap-4 flex-wrap">
//                             <span className="flex items-center gap-1.5">
//                               <span className="w-1 h-1 rounded-full bg-slate-300" />
//                               Module: {next_action.module?.title || ""}
//                             </span>
//                           </p>
//                         </div>
//                         <div className="mt-3 flex items-center justify-between">
//                           <span className="text-[10px] sm:text-xs font-semibold text-teal-600 bg-teal-50 px-3 py-1.5 rounded-full">
//                             Ready to take
//                           </span>
//                           <FiChevronRight className="text-slate-400 text-lg" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="w-full text-center text-sm text-gray-500 py-8">
//                     No upcoming assessments
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Current Level Overview */}
//           <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-5 transition-all duration-500 delay-100 transform translate-y-0 opacity-100 flex flex-col h-full">
//             <div className="flex items-center justify-between mb-3">
//               <h2 className="text-base sm:text-lg font-bold text-slate-800">
//                 Current Level Overview
//               </h2>
//               <span className="text-[9px] sm:text-[11px] text-slate-500 bg-slate-100 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
//                 {levelProgress === 0
//                   ? "Not Started"
//                   : levelProgress === 100
//                     ? "Completed"
//                     : "In Progress"}
//               </span>
//             </div>

//             {currentHierarchy.level && (
//               <div className="flex items-center gap-2 py-1.5 px-3 bg-gray-50 rounded-md border-l-4 border-blue-400">
//                 <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
//                 <span className="font-medium text-blue-700 text-sm">
//                   {currentHierarchy.level}
//                 </span>
//               </div>
//             )}

//             {/* Ring - now responsive */}
//             <div className="flex justify-center mb-4">
//               <div className="relative w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-slate-100 flex items-center justify-center">
//                 <div
//                   className="absolute inset-0 rounded-full"
//                   style={{
//                     background: `conic-gradient(#2563eb ${levelProgress * 3.6}deg, #e5e7eb 0deg)`,
//                   }}
//                 />
//                 <div className="relative w-28 h-28 sm:w-40 sm:h-40 rounded-full bg-white shadow-inner flex flex-col items-center justify-center">
//                   <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
//                     {levelProgress}%
//                   </span>
//                   <span className="text-[9px] sm:text-[11px] text-slate-500 mt-0.5">
//                     Completed
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="flex-1">
//               <div className="text-[10px] sm:text-xs text-gray-600 mb-3 space-y-1.5">
//                 {currentHierarchy.module && (
//                   <div className="flex items-center gap-2 py-1.5 px-3 bg-gray-50 rounded-md border-l-4 border-blue-300 ml-4">
//                     <span className="w-1.5 h-1.5 rounded-full bg-blue-300" />
//                     <span className="font-medium text-blue-700 text-[10px] sm:text-[11px] truncate">
//                       {currentHierarchy.module}
//                     </span>
//                   </div>
//                 )}
//                 {currentHierarchy.chapter && (
//                   <div className="flex items-center gap-2 py-1.5 px-3 bg-gray-50 rounded-md border-l-4 border-purple-300 ml-8">
//                     <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
//                     <span className="font-medium text-purple-700 text-[10px] sm:text-[11px] truncate">
//                       {currentHierarchy.chapter}
//                     </span>
//                   </div>
//                 )}
//                 {currentHierarchy.topic && (
//                   <div className="ml-4 sm:ml-8 mt-1 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-lg border border-blue-200 p-2 sm:p-2.5">
//                     <div className="flex items-center gap-2">
//                       <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
//                       <span className="font-semibold text-gray-800 text-[10px] sm:text-xs break-words">
//                         {currentHierarchy.topic}
//                       </span>
//                       <span className="text-[8px] sm:text-[10px] text-white font-bold bg-blue-600 px-2 py-0.5 rounded-full ml-auto">
//                         Current
//                       </span>
//                     </div>
//                     {topicProgress && (
//                       <div className="mt-1.5">
//                         <div className="flex justify-between text-[8px] sm:text-[10px] text-gray-500">
//                           <span>
//                             {readContents}/{totalContents} Contents
//                           </span>
//                           <span className="font-medium text-blue-600">
//                             {topicProgressPercent}%
//                           </span>
//                         </div>
//                         <div className="w-full h-1 bg-gray-200 rounded-full mt-0.5 overflow-hidden">
//                           <div
//                             className="h-full bg-blue-500 rounded-full transition-all duration-500"
//                             style={{ width: `${topicProgressPercent}%` }}
//                           />
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>

//               <div className="mt-3">
//                 <div className="flex justify-between text-[8px] sm:text-[10px] text-gray-600 mb-0.5">
//                   <span className="font-medium uppercase tracking-wide">
//                     Level Progress
//                   </span>
//                   <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
//                     {levelProgress}%
//                   </span>
//                 </div>
//                 <div className="w-full h-2 sm:h-2.5 bg-gray-100 rounded-full overflow-hidden">
//                   <div
//                     className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-700"
//                     style={{ width: `${levelProgress}%` }}
//                   />
//                 </div>
//               </div>

//               <div className="mt-3 flex gap-2 text-[8px] sm:text-[10px] flex-wrap">
//                 <span className="bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full text-gray-700 flex items-center gap-1.5">
//                   <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
//                   <span className="font-medium">
//                     {currentLevelData?.completed_topics || 0} /{" "}
//                     {currentLevelData?.total_topics || 0} Topics
//                   </span>
//                 </span>
//                 <span className="bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-full text-gray-700 flex items-center gap-1.5">
//                   <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
//                   <span className="font-medium">
//                     {currentLevelData?.title || "Level 1"}
//                   </span>
//                 </span>
//               </div>
//             </div>

//             <p className="text-center text-[8px] sm:text-[10px] mt-3 text-slate-500 leading-relaxed">
//               Complete this module and unlock the exam to get promoted.
//             </p>
//           </div>
//         </div>

//         {/* Learning Path – Level Cards */}
//         <div className="mt-6 w-full">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-base sm:text-lg font-bold text-slate-800">
//               Your Curriculum
//             </h2>
//             {allLevels.length > 2 && (
//               <button
//                 onClick={handleViewAllLevels}
//                 className="text-xs sm:text-sm text-blue-600 hover:underline"
//               >
//                 View all levels →
//               </button>
//             )}
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-5 w-full">
//             {allLevels.map((level) => (
//               <LevelCard
//                 key={level.id}
//                 level={level}
//                 onClick={() => {
//                   if (level.status !== "locked") {
//                     navigate(`/levels/${level.id}`);
//                   }
//                 }}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Professional Growth Tracking Banner */}
//         <div className="relative mt-6 bg-[#23262b] rounded-xl overflow-hidden p-4 sm:p-6 w-full">
//           <div className="absolute right-6 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-white/5 hidden sm:block" />

//           <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 w-full">
//             <div className="flex-1 min-w-0 w-full">
//               <h2 className="text-white text-base sm:text-xl font-bold mb-3">
//                 Professional Growth Tracking
//               </h2>
//               <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
//                 Your certifications demonstrate commitment to medical excellence
//                 and technical precision. Maintain your trajectory to become an
//                 Avante Elite Sales Specialist.
//               </p>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 w-full">
//                 <StatCard
//                   icon={FaTrophy}
//                   title="Levels Completed"
//                   value={completedLevels}
//                   subtitle={
//                     inProgressLevels > 0
//                       ? `${inProgressLevels} in progress`
//                       : "All done"
//                   }
//                   color="blue"
//                 />
//                 <StatCard
//                   icon={FaCertificate}
//                   title="Certificates"
//                   value={stats?.certificates_earned || 0}
//                   subtitle={`Avg Score ${stats?.avg_topic_score || 0}%`}
//                   color="green"
//                 />
//                 <StatCard
//                   icon={FiBarChart2}
//                   title="Average Score"
//                   value={`${stats?.avg_topic_score || 0}%`}
//                   subtitle="Overall Performance"
//                   color="purple"
//                 />
//                 <StatCard
//                   icon={FaBookOpen}
//                   title="Topics Completed"
//                   value={`${completedTopics}/${totalTopics}`}
//                   subtitle={`${overallProgress}% complete`}
//                   color="orange"
//                 />
//               </div>
//             </div>

//             <button
//               className="shrink-0 w-full lg:w-auto bg-teal-300 hover:bg-teal-200 text-slate-900 font-bold text-sm px-6 py-4 rounded-lg leading-snug transition-colors text-center"
//               onClick={() => navigate("/assessments")}
//             >
//               Analyze your progress
//             </button>
//           </div>
//         </div>

//         {/* Progress Analytics Section */}
//         <div
//           className={`mt-4 transition-all duration-500 delay-400 transform ${
//             animateItems
//               ? "translate-y-0 opacity-100"
//               : "translate-y-4 opacity-0"
//           } w-full`}
//         >
//           <ProgressAnalytics levels={levels || []} />
//         </div>
//       </PageBody>
//     </PageLayout>
//   );
// }

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import {
  FaShieldAlt,
  FaBookOpen,
  FaLayerGroup,
  FaBook,
  FaChevronDown,
  FaChevronUp,
  FaTrophy,
  FaCertificate,
} from "react-icons/fa";
import {
  FiTrendingUp,
  FiPlayCircle,
  FiChevronRight,
  FiBarChart2,
  FiClock,
} from "react-icons/fi";
import { MdOutlineQuiz } from "react-icons/md";

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

import { getDashboardData } from "../../../../redux/slice/dashboardSlice";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------
// LevelCard Component (fully responsive)
// ----------------------------------------------------------------------
const LevelCard = ({ level, onClick }) => {
  const { t } = useTranslation();
  const isLocked = level.status === "locked";
  const isCompleted = level.status === "completed";
  const isInProgress = level.status === "unlocked";

  let badge = {
    label: t("dashboard.levelCard.locked"),
    color: "bg-gray-200 text-gray-600",
    icon: <CiLock className="text-gray-500 text-sm" />,
  };
  if (isCompleted) {
    badge = {
      label: t("dashboard.levelCard.completed"),
      color: "bg-green-100 text-green-700",
      icon: <IoCheckmarkCircle className="text-green-500 text-sm" />,
    };
  } else if (isInProgress) {
    badge = {
      label: t("dashboard.levelCard.inProgress"),
      color: "bg-blue-100 text-blue-700",
      icon: <FiTrendingUp className="text-blue-500 text-sm" />,
    };
  }

  const totalChapters =
    level.modules?.reduce((acc, mod) => acc + (mod.chapters?.length || 0), 0) ||
    0;

  return (
    <div
      className={`
        bg-white rounded-2xl border shadow-sm 
        transition-all duration-300 ease-in-out overflow-hidden
        flex flex-col h-full w-full
        ${
          isLocked
            ? "border-gray-200 opacity-70 cursor-not-allowed"
            : "border-gray-200 hover:border-blue-400 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
        }
      `}
      onClick={() => {
        if (!isLocked) onClick();
      }}
    >
      <div className="px-3 sm:px-5 pt-3 sm:pt-5 pb-2 flex items-start justify-between gap-2 sm:gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-lg font-bold text-gray-800 leading-tight truncate">
            {level.title}
          </h3>
          <div className="flex items-center gap-1.5 text-[10px] sm:text-sm text-gray-500 mt-1 flex-wrap">
            <span>
              {level.total_modules} {t("dashboard.levelCard.modules")}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>
              {totalChapters} {t("dashboard.levelCard.chapters")}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>
              {level.total_topics} {t("dashboard.levelCard.topics")}
            </span>
          </div>
        </div>
        <div
          className={`flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-semibold whitespace-nowrap ${badge.color}`}
        >
          {badge.icon}
          <span>{badge.label}</span>
        </div>
      </div>

      {!isLocked ? (
        <div className="px-3 sm:px-5 pt-3 pb-1">
          <div className="flex justify-between text-[10px] sm:text-xs text-gray-600 mb-1">
            <span className="font-medium truncate">
              {level.completed_topics || 0}{" "}
              {t("dashboard.levelCard.topicsCompleted")}
            </span>
            <span className="font-semibold text-blue-600 flex-shrink-0 ml-2">
              {level.completion_percent || 0}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${level.completion_percent || 0}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="px-3 sm:px-5 pt-3 pb-1">
          <div className="text-[10px] sm:text-xs text-gray-400 italic">
            {t("dashboard.levelCard.locked")}
          </div>
        </div>
      )}

      <div className="mt-auto px-3 sm:px-5 py-3 border-t border-gray-100/80 flex items-center justify-between flex-wrap gap-1">
        <span className="text-[9px] sm:text-xs text-gray-500 flex items-center gap-1.5">
          {isLocked ? (
            <>
              <CiLock className="w-3.5 h-3.5" />
              {t("dashboard.levelCard.lockMessage")}
            </>
          ) : (
            t("dashboard.levelCard.readyMessage")
          )}
        </span>

        <div
          className={`
            text-[10px] sm:text-sm font-medium flex items-center gap-1.5 transition-colors duration-200
            ${isLocked ? "text-gray-400" : "text-blue-600 hover:text-blue-800"}
          `}
        >
          {isLocked
            ? t("dashboard.levelCard.locked")
            : t("dashboard.levelCard.viewPath")}
          {!isLocked && <FiChevronRight className="w-3.5 h-3.5" />}
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// StatCard (fully responsive – truncates text, resizes)
// ----------------------------------------------------------------------
const StatCard = ({ icon: Icon, title, value, subtitle, color }) => {
  const colors = {
    blue: "bg-blue-500/20 text-blue-300",
    green: "bg-green-500/20 text-green-300",
    purple: "bg-purple-500/20 text-purple-300",
    orange: "bg-orange-500/20 text-orange-300",
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-2 sm:p-4 transition-transform duration-300 hover:scale-105 hover:border-white/30 min-w-0">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-[7px] sm:text-[10px] font-medium text-gray-300 uppercase tracking-wider truncate">
            {title}
          </p>
          <p className="text-base sm:text-xl font-bold text-white mt-1 truncate">
            {value}
          </p>
          <p className="text-[7px] sm:text-[10px] text-gray-400 mt-0.5 truncate">
            {subtitle}
          </p>
        </div>
        <div
          className={`p-1.5 sm:p-2 rounded-xl flex-shrink-0 ${colors[color]}`}
        >
          <Icon className="text-sm sm:text-lg" />
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// ProgressAnalytics (accordion, responsive)
// ----------------------------------------------------------------------
const ProgressAnalytics = ({ levels }) => {
  const { t } = useTranslation();
  const [expandedLevel, setExpandedLevel] = useState(null);
  const [expandedModule, setExpandedModule] = useState(null);

  useEffect(() => {
    if (levels && levels.length > 0 && !expandedLevel) {
      const firstUnlocked = levels.find((l) => l.status === "unlocked");
      if (firstUnlocked) setExpandedLevel(firstUnlocked.id);
    }
  }, [levels, expandedLevel]);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2 text-sm sm:text-base">
            <FaShieldAlt className="text-blue-500" />
            {t("dashboard.progressAnalytics.title")}
          </h3>
        </div>
        <div className="p-3 sm:p-4">
          {levels?.map((level) => (
            <div key={level.id} className="mb-4 sm:mb-6 last:mb-0">
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
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {level.status !== "locked" &&
                    (expandedLevel === level.id ? (
                      <FaChevronUp className="text-gray-500 text-xs flex-shrink-0" />
                    ) : (
                      <FaChevronDown className="text-gray-500 text-xs flex-shrink-0" />
                    ))}
                  {level.status === "locked" && (
                    <CiLock className="text-gray-400 text-xs flex-shrink-0" />
                  )}
                  <span className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                    {level.title}
                  </span>
                  <span className="text-[9px] sm:text-xs text-gray-500 flex-shrink-0 ml-1">
                    ({level.completed_topics || 0}/{level.total_topics || 0}{" "}
                    {t("dashboard.progressAnalytics.topics")})
                  </span>
                </div>
                <span className="text-sm font-semibold text-blue-600 flex-shrink-0 ml-2">
                  {level.completion_percent || 0}%
                </span>
              </div>

              <div className="mb-3 pl-2 sm:pl-6">
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-500 rounded-full transition-all"
                    style={{ width: `${level.completion_percent || 0}%` }}
                  />
                </div>
              </div>

              {expandedLevel === level.id && level.modules?.length > 0 && (
                <div className="ml-2 sm:ml-6 mt-3 space-y-3">
                  {level.modules.map((module) => (
                    <div
                      key={module.module_id}
                      className="border border-gray-100 rounded-lg overflow-hidden"
                    >
                      <div
                        className="p-2 sm:p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() =>
                          setExpandedModule(
                            expandedModule === module.module_id
                              ? null
                              : module.module_id,
                          )
                        }
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <FaLayerGroup className="text-green-600 text-xs sm:text-sm flex-shrink-0" />
                          <span className="font-medium text-gray-800 text-sm sm:text-base truncate">
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
                          <span className="text-[9px] sm:text-xs text-gray-500">
                            ({module.completed_topics || 0}/
                            {module.total_topics || 0}{" "}
                            {t("dashboard.progressAnalytics.topics")})
                          </span>
                          <span className="text-xs sm:text-sm font-semibold text-green-600">
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

                      {expandedModule === module.module_id &&
                        module.chapters?.length > 0 && (
                          <div className="border-t border-gray-100 p-2 sm:p-3 bg-white">
                            <p className="text-[9px] sm:text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1">
                              <FaBook className="text-purple-500" />
                              {t("dashboard.progressAnalytics.chapters")}
                            </p>
                            <div className="space-y-3 max-h-[300px] overflow-y-auto">
                              {module.chapters.map((chapter) => (
                                <div
                                  key={chapter.chapter_id}
                                  className="pl-1 sm:pl-2"
                                >
                                  <div className="mb-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <FaBook className="text-purple-400 text-[10px] sm:text-xs flex-shrink-0" />
                                      <span className="text-xs sm:text-sm text-gray-700 truncate">
                                        {chapter.chapter_title}
                                      </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-[9px] sm:text-xs text-gray-400">
                                        ({chapter.completed_topics || 0}/
                                        {chapter.total_topics || 0}{" "}
                                        {t(
                                          "dashboard.progressAnalytics.topics",
                                        )}
                                        )
                                      </span>
                                      <span className="text-[9px] sm:text-xs font-medium text-purple-600">
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

const AssessmentStatusCard = ({ assessment, navigate }) => {
  const { t } = useTranslation();
  if (!assessment) return null;

  const {
    type,
    status,
    title,
    reason,
    last_attempt,
    is_completed,
    assessment_id,
    progress,
  } = assessment;

  const isContentComplete = (progress?.remaining ?? 0) === 0;
  const completed = progress?.completed ?? 0;
  const total = progress?.total ?? 0;
  const remaining = progress?.remaining ?? 0;
  const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Status badge configuration
  const getStatusBadge = (status) => {
    const map = {
      locked: {
        label: t("dashboard.assessmentStatus.locked"),
        color: "bg-gray-100 text-gray-600 border-gray-200",
        icon: <CiLock className="text-gray-500" />,
      },
      ready: {
        label: t("dashboard.assessmentStatus.ready"),
        color: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: <FiTrendingUp className="text-emerald-500" />,
      },
      failed: {
        label: t("dashboard.assessmentStatus.failed"),
        color: "bg-rose-50 text-rose-700 border-rose-200",
        icon: <IoCloseCircle className="text-rose-500" />,
      },
      passed: {
        label: t("dashboard.assessmentStatus.passed"),
        color: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: <IoCheckmarkCircle className="text-emerald-500" />,
      },
      not_found: {
        label: t("dashboard.assessmentStatus.notFound"),
        color: "bg-gray-100 text-gray-600 border-gray-200",
        icon: <CiLock className="text-gray-500" />,
      },
      completed: {
        label: t("dashboard.assessmentStatus.completed"),
        color: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: <IoCheckmarkCircle className="text-emerald-500" />,
      },
    };
    return map[status] || map.locked;
  };

  const badge = getStatusBadge(status);

  // --- Action label ---
  const getActionLabel = () => {
    if (status === "failed") {
      if (type === "topic") return t("dashboard.assessmentStatus.retryQuiz");
      if (type === "module") return t("dashboard.assessmentStatus.retryExam");
      return t("dashboard.assessmentStatus.retry");
    }
    if (status === "ready") {
      if (type === "topic") return t("dashboard.assessmentStatus.startQuiz");
      if (type === "module") return t("dashboard.assessmentStatus.startExam");
      return t("dashboard.assessmentStatus.start");
    }
    if (status === "passed" || status === "completed" || is_completed) {
      return t("dashboard.assessmentStatus.viewResults");
    }
    return t("dashboard.assessmentStatus.locked");
  };

  // --- Dual-context Message ---
  const getStatusMessage = () => {
    let contentMsg = "";

    if (isContentComplete) {
      contentMsg = t("dashboard.assessmentStatus.contentComplete");
    } else {
      return t("dashboard.assessmentStatus.contentRemaining", {
        count: remaining,
      });
    }

    if (status === "failed") {
      const percent = last_attempt?.percentage ?? 0;
      return t("dashboard.assessmentStatus.failedMessage", { percent });
    }

    if (status === "ready") {
      return t("dashboard.assessmentStatus.readyMessage");
    }

    if (status === "passed" || status === "completed" || is_completed) {
      return t("dashboard.assessmentStatus.passedMessage");
    }

    return contentMsg;
  };

  // --- Navigation ---
  const handleAction = () => {
    if (!assessment_id) return;

    if (status === "failed" || status === "ready") {
      let path = `/assessment/${assessment_id}`;
      if (type === "topic") {
        path = `/quiz/${assessment_id}`;
      } else if (type === "module") {
        path = `/exam-module/${assessment_id}`;
      } else if (type === "chapter") {
        path = `/exam-chapter/${assessment_id}`;
      } else if (type === "level") {
        path = `/exam-level/${assessment_id}`;
      }
      navigate(path);
    } else if (status === "passed" || status === "completed" || is_completed) {
      navigate(`/assessment/${assessment_id}/results`);
    }
  };

  const isActionDisabled =
    status === "locked" || status === "not_found" || status === "completed";

  const totalQuestions =
    last_attempt?.total_questions || last_attempt?.total_score || "?";

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="p-4 sm:p-6">
        {/* Header: Type + Status Badge + View All */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {type || t("dashboard.assessmentStatus.type")}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-semibold border ${badge.color}`}
            >
              {badge.icon}
              {badge.label}
            </span>
            <button
              className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 whitespace-nowrap transition-colors"
              onClick={() => navigate("/assessments")}
            >
              {t("dashboard.assessmentStatus.viewAll")}
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-slate-800 mt-3 leading-snug tracking-tight break-words">
          {title || t("dashboard.assessmentStatus.untitled")}
        </h3>

        {/* Content Progress Row */}
        <div className="flex items-center gap-3 mt-3 flex-wrap">
          <span className="text-[10px] sm:text-xs font-medium text-slate-500">
            {t("dashboard.assessmentStatus.contentProgress")}
          </span>
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] sm:text-xs font-semibold border ${
              isContentComplete
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-amber-50 text-amber-700 border-amber-200"
            }`}
          >
            {isContentComplete ? (
              <IoCheckmarkCircle className="w-3 h-3" />
            ) : (
              <FiTrendingUp className="w-3 h-3" />
            )}
            {isContentComplete
              ? t("dashboard.assessmentStatus.completed")
              : t("dashboard.assessmentStatus.inProgress")}
          </span>
          <span className="text-[10px] sm:text-xs text-slate-400 font-medium">
            ({completed}/{total})
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mt-2">
          <div className="flex justify-between items-center text-[10px] sm:text-xs text-slate-500 mb-1">
            <span className="font-medium">
              {t("dashboard.assessmentStatus.readingProgress")}
            </span>
            <span className="font-semibold text-blue-600">
              {progressPercent}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Status Message */}
        <div className="mt-3 p-3 bg-slate-50/80 rounded-lg border border-slate-100/80">
          <p className="text-xs sm:text-sm text-slate-600 flex items-start gap-2">
            <span className="text-slate-400 text-base leading-none">•</span>
            <span className="leading-relaxed break-words">
              {getStatusMessage()}
            </span>
          </p>
        </div>

        {/* Last Attempt (only if exists) */}
        {last_attempt && (
          <div className="mt-4 p-3 bg-slate-50/80 rounded-lg border border-slate-100/80">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] sm:text-xs">
              <span className="font-medium text-slate-500">
                {t("dashboard.assessmentStatus.lastAttempt")}
              </span>
              <span
                className={`font-semibold ${
                  last_attempt.status === "passed"
                    ? "text-emerald-600"
                    : "text-rose-600"
                }`}
              >
                {last_attempt.status?.toUpperCase() ||
                  t("dashboard.assessmentStatus.na")}
              </span>
              <span className="text-slate-600">
                {t("dashboard.assessmentStatus.score")}:{" "}
                {last_attempt.score ?? 0}/{totalQuestions}
              </span>
              <span className="text-slate-600">
                {last_attempt.percentage ?? 0}%
              </span>
              <span className="text-slate-400 flex items-center gap-1">
                <FiClock className="w-3 h-3" />
                {Math.floor((last_attempt.time_taken ?? 0) / 60)}m{" "}
                {(last_attempt.time_taken ?? 0) % 60}s
              </span>
              <span className="text-slate-400">
                {last_attempt.submitted_at
                  ? new Date(last_attempt.submitted_at).toLocaleDateString(
                      undefined,
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )
                  : ""}
              </span>
            </div>
          </div>
        )}

        {/* Action Button - Aligned Right, styled like Resume Topic button */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={handleAction}
            disabled={isActionDisabled}
            className={`
              px-4 sm:px-6 py-1.5 sm:py-2 rounded-2xl font-medium transition-all duration-200
              flex items-center gap-1.5 text-xs sm:text-sm
              ${
                status === "failed" || status === "ready"
                  ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
                  : status === "passed" || is_completed
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            {(status === "failed" || status === "ready") && (
              <FiPlayCircle className="w-4 h-4" />
            )}
            {getActionLabel()}
          </button>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// MAIN DASHBOARD COMPONENT
// ----------------------------------------------------------------------
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
    assessment_status,
  } = data;

  const totalLevels = stats?.total_levels || 0;
  const completedLevels = stats?.completed_levels || 0;
  const inProgressLevels =
    totalLevels - completedLevels - (stats?.remaining_levels || 0);
  const totalTopics = stats?.total_topics || 0;
  const completedTopics = stats?.completed_topics || 0;
  const overallProgress =
    totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  const currentLevelId = current_learning?.level?.id;
  const currentLevelData = levels?.find((l) => l.id === currentLevelId);
  const currentModuleId = current_learning?.module?.id;
  const currentModuleData = currentLevelData?.modules?.find(
    (m) => m.module_id === currentModuleId,
  );
  const currentChapterId = current_learning?.chapter?.id;
  const currentChapterData = currentModuleData?.chapters?.find(
    (c) => c.chapter_id === currentChapterId,
  );

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t("dashboard.greeting.morning");
    if (hour < 18) return t("dashboard.greeting.afternoon");
    return t("dashboard.greeting.evening");
  };

  const getUserName = () => profile?.name || "";

  const handleViewAllLevels = () => navigate("/levels");
  const handleResumeTopic = () => {
    if (current_learning?.topic?.id) {
      navigate(`/topics/${current_learning.topic.id}`);
    }
  };

  const currentHierarchy = {
    program: current_learning?.program?.title,
    level: currentLevelData?.title || current_learning?.level?.title,
    module: currentModuleData?.module_title || current_learning?.module?.title,
    chapter:
      currentChapterData?.chapter_title || current_learning?.chapter?.title,
    topic: current_learning?.topic?.title,
  };

  const levelProgress =
    currentLevelData?.completion_percent ||
    current_learning?.progress_percent ||
    0;

  const topicProgress = stats?.current_topic_progress || {};
  const topicProgressPercent = topicProgress.progress_percent || 0;
  const readContents = topicProgress.read_contents || 0;
  const totalContents = topicProgress.total_contents || 0;

  const allLevels = levels || [];

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>
            {getGreeting()}, {getUserName()}
          </PageTitle>
          <PageSubtitle>{t("dashboard.pageSubtitle")}</PageSubtitle>
        </PageHeaderLeft>
      </PageHeader>

      <PageBody>
        {/* Top Section: Current Level Overview + Resume & Assessments */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 my-4">
          {/* Left Column */}
          <div className="lg:col-span-3 flex flex-col h-full">
            {/* Resume Learning Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-teal-400 flex flex-col p-4 sm:p-5 flex-1 mb-4">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {t("dashboard.resumeCard.title")}
                </h2>
                <span className="text-[7px] sm:text-[8px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  {t("dashboard.resumeCard.inProgress")}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 flex-1">
                <div className="relative w-16 h-16 sm:w-24 sm:h-24 shrink-0 rounded-lg overflow-hidden bg-slate-100 mt-0.5">
                  <img
                    src={
                      current_learning?.module?.thumbnail ||
                      currentLevelData?.modules?.find(
                        (m) => m.module_id === current_learning?.module?.id,
                      )?.thumbnail
                    }
                    alt={
                      current_learning?.module?.title ||
                      t("dashboard.resumeCard.module")
                    }
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/images/default-module.png";
                    }}
                  />

                  <div className="absolute bottom-1 right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-teal-500/90 flex items-center justify-center">
                    <div className="w-0 h-0 border-t-[3px] sm:border-t-[4px] border-t-transparent border-b-[3px] sm:border-b-[4px] border-b-transparent border-l-[5px] sm:border-l-[6px] border-l-white ml-0.5" />
                  </div>
                </div>

                <div className="flex-1 flex flex-col h-full w-full min-w-0">
                  <div className="flex items-start gap-1.5 mt-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span>
                        <FaBook className="text-blue-500 text-xs mt-0.5" />
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium">
                        {t("dashboard.resumeCard.currentTopic")}:
                      </span>
                      <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug break-words">
                        {current_learning?.topic?.title ||
                          currentHierarchy.topic ||
                          t("dashboard.resumeCard.noTopic")}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <FaBookOpen className="text-purple-500 text-xs" />
                    <p className="text-[10px] sm:text-xs text-slate-500">
                      {t("dashboard.resumeCard.chapter")}:{" "}
                      <span className="font-semibold text-slate-700">
                        {currentHierarchy.chapter ||
                          t("dashboard.resumeCard.notStarted")}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <FaLayerGroup className="text-green-500 text-xs" />
                    <p className="text-[10px] sm:text-xs text-slate-500">
                      {t("dashboard.resumeCard.module")}:{" "}
                      <span className="font-semibold text-slate-700">
                        {currentHierarchy.module ||
                          t("dashboard.resumeCard.notStarted")}
                      </span>
                    </p>
                  </div>

                  <div className="mt-2">
                    <div className="flex justify-between text-[8px] sm:text-[9px] text-slate-400 mb-0.5">
                      <span>{t("dashboard.resumeCard.topicProgress")}</span>
                      <span className="font-medium text-blue-600">
                        {topicProgressPercent}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-700"
                        style={{ width: `${topicProgressPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-end gap-2 pt-2">
                    <button
                      className="px-4 sm:px-6 bg-blue-600 text-white text-xs sm:text-sm py-1.5 sm:py-2 rounded-2xl font-medium cursor-pointer hover:bg-blue-700 hover:shadow-md transition-all flex items-center gap-1.5"
                      onClick={handleResumeTopic}
                    >
                      <FiPlayCircle size={12} />
                      {current_learning?.cta?.type === "resume"
                        ? t("dashboard.resumeCard.resumeTopic")
                        : t("dashboard.resumeCard.startTopic")}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Assessments - IMPROVED */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-5 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {t("dashboard.assessments.title")}
                </h2>
              </div>

              <div className="flex-1 flex items-center">
                {assessment_status ? (
                  <AssessmentStatusCard
                    assessment={assessment_status}
                    navigate={navigate}
                  />
                ) : next_action ? (
                  // Fallback to next_action if assessment_status is not provided
                  <div className="w-full border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 shrink-0 rounded-md bg-blue-50 flex items-center justify-center text-blue-600 mt-0.5">
                        <MdOutlineQuiz className="text-xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="bg-rose-100 text-rose-600 text-[8px] sm:text-[9px] font-bold px-2 py-0.5 rounded">
                            {next_action.type?.toUpperCase() ||
                              t("dashboard.assessments.upcoming")}
                          </span>
                          <span className="text-sm font-semibold text-slate-800 break-words">
                            {next_action.assessment_title ||
                              t("dashboard.assessments.ready")}
                          </span>
                        </div>
                        <div className="mt-2 space-y-1.5">
                          <p className="text-[10px] sm:text-xs text-slate-500 flex items-center gap-4 flex-wrap">
                            <span className="flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-slate-300" />
                              {t("dashboard.assessments.module")}:{" "}
                              {next_action.module?.title || ""}
                            </span>
                          </p>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-[10px] sm:text-xs font-semibold text-teal-600 bg-teal-50 px-3 py-1.5 rounded-full">
                            {t("dashboard.assessments.readyToTake")}
                          </span>
                          <FiChevronRight className="text-slate-400 text-lg" />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full text-center text-sm text-gray-500 py-8">
                    {t("dashboard.assessments.noUpcoming")}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Current Level Overview */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-5 transition-all duration-500 delay-100 transform translate-y-0 opacity-100 flex flex-col h-full">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-800">
                {t("dashboard.levelOverview.title")}
              </h2>
              <span className="text-[9px] sm:text-[11px] text-slate-500 bg-slate-100 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                {levelProgress === 0
                  ? t("dashboard.levelOverview.notStarted")
                  : levelProgress === 100
                    ? t("dashboard.levelOverview.completed")
                    : t("dashboard.levelOverview.inProgress")}
              </span>
            </div>

            {currentHierarchy.level && (
              <div className="flex items-center gap-2 py-1.5 px-3 bg-gray-50 rounded-md border-l-4 border-blue-400">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span className="font-medium text-blue-700 text-sm">
                  {currentHierarchy.level}
                </span>
              </div>
            )}

            {/* Ring - now responsive */}
            <div className="flex justify-center mb-4">
              <div className="relative w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-slate-100 flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(#2563eb ${levelProgress * 3.6}deg, #e5e7eb 0deg)`,
                  }}
                />
                <div className="relative w-28 h-28 sm:w-40 sm:h-40 rounded-full bg-white shadow-inner flex flex-col items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {levelProgress}%
                  </span>
                  <span className="text-[9px] sm:text-[11px] text-slate-500 mt-0.5">
                    {t("dashboard.levelOverview.completed")}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="text-[10px] sm:text-xs text-gray-600 mb-3 space-y-1.5">
                {currentHierarchy.module && (
                  <div className="flex items-center gap-2 py-1.5 px-3 bg-gray-50 rounded-md border-l-4 border-blue-300 ml-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-300" />
                    <span className="font-medium text-blue-700 text-[10px] sm:text-[11px] truncate">
                      {currentHierarchy.module}
                    </span>
                  </div>
                )}
                {currentHierarchy.chapter && (
                  <div className="flex items-center gap-2 py-1.5 px-3 bg-gray-50 rounded-md border-l-4 border-purple-300 ml-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    <span className="font-medium text-purple-700 text-[10px] sm:text-[11px] truncate">
                      {currentHierarchy.chapter}
                    </span>
                  </div>
                )}
                {currentHierarchy.topic && (
                  <div className="ml-4 sm:ml-8 mt-1 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-lg border border-blue-200 p-2 sm:p-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      <span className="font-semibold text-gray-800 text-[10px] sm:text-xs break-words">
                        {currentHierarchy.topic}
                      </span>
                      <span className="text-[8px] sm:text-[10px] text-white font-bold bg-blue-600 px-2 py-0.5 rounded-full ml-auto">
                        {t("dashboard.levelOverview.current")}
                      </span>
                    </div>
                    {topicProgress && (
                      <div className="mt-1.5">
                        <div className="flex justify-between text-[8px] sm:text-[10px] text-gray-500">
                          <span>
                            {readContents}/{totalContents}{" "}
                            {t("dashboard.levelOverview.contents")}
                          </span>
                          <span className="font-medium text-blue-600">
                            {topicProgressPercent}%
                          </span>
                        </div>
                        <div className="w-full h-1 bg-gray-200 rounded-full mt-0.5 overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full transition-all duration-500"
                            style={{ width: `${topicProgressPercent}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-3">
                <div className="flex justify-between text-[8px] sm:text-[10px] text-gray-600 mb-0.5">
                  <span className="font-medium uppercase tracking-wide">
                    {t("dashboard.levelOverview.levelProgress")}
                  </span>
                  <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                    {levelProgress}%
                  </span>
                </div>
                <div className="w-full h-2 sm:h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-700"
                    style={{ width: `${levelProgress}%` }}
                  />
                </div>
              </div>

              <div className="mt-3 flex gap-2 text-[8px] sm:text-[10px] flex-wrap">
                <span className="bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full text-gray-700 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="font-medium">
                    {currentLevelData?.completed_topics || 0} /{" "}
                    {currentLevelData?.total_topics || 0}{" "}
                    {t("dashboard.levelOverview.topics")}
                  </span>
                </span>
                <span className="bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-full text-gray-700 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span className="font-medium">
                    {currentLevelData?.title ||
                      t("dashboard.levelOverview.level")}
                  </span>
                </span>
              </div>
            </div>

            <p className="text-center text-[8px] sm:text-[10px] mt-3 text-slate-500 leading-relaxed">
              {t("dashboard.levelOverview.footer")}
            </p>
          </div>
        </div>

        {/* Learning Path – Level Cards */}
        <div className="mt-6 w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-800">
              {t("dashboard.curriculum.title")}
            </h2>
            {allLevels.length > 2 && (
              <button
                onClick={handleViewAllLevels}
                className="text-xs sm:text-sm text-blue-600 hover:underline"
              >
                {t("dashboard.curriculum.viewAll")} →
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-5 w-full">
            {allLevels.map((level) => (
              <LevelCard
                key={level.id}
                level={level}
                onClick={() => {
                  if (level.status !== "locked") {
                    navigate(`/levels/${level.id}`);
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* Professional Growth Tracking Banner */}
        <div className="relative mt-6 bg-[#23262b] rounded-xl overflow-hidden p-4 sm:p-6 w-full">
          <div className="absolute right-6 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-white/5 hidden sm:block" />

          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 w-full">
            <div className="flex-1 min-w-0 w-full">
              <h2 className="text-white text-base sm:text-xl font-bold mb-3">
                {t("dashboard.growth.title")}
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                {t("dashboard.growth.description")}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 w-full">
                <StatCard
                  icon={FaTrophy}
                  title={t("dashboard.growth.levelsCompleted")}
                  value={completedLevels}
                  subtitle={
                    inProgressLevels > 0
                      ? `${inProgressLevels} ${t("dashboard.growth.inProgress")}`
                      : t("dashboard.growth.allDone")
                  }
                  color="blue"
                />
                <StatCard
                  icon={FaCertificate}
                  title={t("dashboard.growth.certificates")}
                  value={stats?.certificates_earned || 0}
                  subtitle={`${t("dashboard.growth.avgScore")} ${stats?.avg_topic_score || 0}%`}
                  color="green"
                />
                <StatCard
                  icon={FiBarChart2}
                  title={t("dashboard.growth.averageScore")}
                  value={`${stats?.avg_topic_score || 0}%`}
                  subtitle={t("dashboard.growth.overallPerformance")}
                  color="purple"
                />
                <StatCard
                  icon={FaBookOpen}
                  title={t("dashboard.growth.topicsCompleted")}
                  value={`${completedTopics}/${totalTopics}`}
                  subtitle={`${overallProgress}% ${t("dashboard.growth.complete")}`}
                  color="orange"
                />
              </div>
            </div>

            <button
              className="shrink-0 w-full lg:w-auto bg-teal-300 hover:bg-teal-200 text-slate-900 font-bold text-sm px-6 py-4 rounded-lg leading-snug transition-colors text-center"
              onClick={() => navigate("/assessments")}
            >
              {t("dashboard.growth.analyzeButton")}
            </button>
          </div>
        </div>

        {/* Progress Analytics Section */}
        <div
          className={`mt-4 transition-all duration-500 delay-400 transform ${
            animateItems
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          } w-full`}
        >
          <ProgressAnalytics levels={levels || []} />
        </div>
      </PageBody>
    </PageLayout>
  );
}

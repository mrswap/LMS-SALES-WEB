// import React, { useEffect, useState } from "react";
// import {
//   PageBody,
//   PageHeader,
//   PageHeaderLeft,
//   PageLayout,
//   PageSubtitle,
//   PageTitle,
// } from "../../common/layout";
// import { getDashboardData } from "../../../../redux/slice/dashboardSlice";
// import { useDispatch, useSelector } from "react-redux";
// import Loader from "../../common/Loader";
// import Error from "../../common/Error";
// import { IoCheckmarkCircleOutline } from "react-icons/io5";
// import { CiLock } from "react-icons/ci";
// import {
//   FaMedal,
//   FaShieldAlt,
//   FaChartLine,
//   FaUserGraduate,
//   FaBookOpen,
//   FaPlay,
//   FaCertificate,
//   FaClock,
//   FaLayerGroup,
//   FaBook,
//   FaChevronDown,
//   FaChevronUp,
//   FaListOl,
// } from "react-icons/fa";
// import {
//   FiChevronRight,
//   FiAward,
//   FiTarget,
//   FiTrendingUp,
//   FiCalendar,
//   FiDownload,
//   FiPlayCircle,
//   FiCheckCircle,
//   FiBarChart2,
// } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// // ==================== COMPONENTS ====================

// // Progress Ring Component
// const ProgressRing = ({ percentage, size = 80 }) => {
//   const radius = (size - 8) / 2;
//   const circumference = 2 * Math.PI * radius;
//   const offset = circumference - (percentage / 100) * circumference;

//   return (
//     <div className="relative" style={{ width: size, height: size }}>
//       <svg className="transform -rotate-90" width={size} height={size}>
//         <circle
//           className="text-gray-200"
//           strokeWidth="4"
//           stroke="currentColor"
//           fill="transparent"
//           r={radius}
//           cx={size / 2}
//           cy={size / 2}
//         />
//         <circle
//           strokeWidth="4"
//           stroke="#facc15"
//           fill="transparent"
//           r={radius}
//           cx={size / 2}
//           cy={size / 2}
//           strokeDasharray={circumference}
//           strokeDashoffset={offset}
//           strokeLinecap="round"
//           className="transition-all duration-1000"
//         />
//       </svg>
//       <div className="absolute inset-0 flex items-center justify-center">
//         <span className="text-xl font-bold ">{percentage}%</span>
//       </div>
//     </div>
//   );
// };

// // Course Card Component
// const CourseCard = ({
//   title,
//   subtitle,
//   days,
//   progress,
//   status,
//   statusColor,
//   onClick,
// }) => (
//   <div
//     className="rounded-xl shadow-sm p-4 flex items-center justify-between bg-white hover:shadow-md transition-shadow cursor-pointer"
//     onClick={onClick}
//   >
//     <div className="flex items-center gap-4 flex-1">
//       <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
//         <FaShieldAlt className="text-blue-600 text-xl" />
//       </div>
//       <div className="flex-1">
//         <h2 className="text-sm sm:text-base font-semibold text-gray-800">
//           {title}
//         </h2>
//         {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
//         <div className="w-full h-1 bg-gray-200 rounded-full mt-2">
//           <div
//             className="h-full rounded-full transition-all duration-500"
//             style={{ width: `${progress}%`, background: statusColor }}
//           />
//         </div>
//       </div>
//     </div>
//     <span
//       className="text-xs font-semibold px-3 py-1 rounded-md whitespace-nowrap ml-2"
//       style={{ color: statusColor, background: `${statusColor}20` }}
//     >
//       {status}
//     </span>
//   </div>
// );

// // Activity Item Component
// const ActivityItem = ({
//   icon,
//   bg,
//   color,
//   title,
//   time,
//   actionText,
//   onAction,
// }) => (
//   <div className="flex items-start gap-4">
//     <div
//       className={`w-12 h-12 rounded-full flex items-center justify-center ${bg}`}
//     >
//       {React.cloneElement(icon, { className: `${color} text-xl` })}
//     </div>
//     <div className="flex-1">
//       <h3 className="text-gray-800 font-semibold text-sm sm:text-base">
//         {title}
//       </h3>
//       <p className="text-xs sm:text-sm text-gray-500 mt-1">{time}</p>
//     </div>
//     {actionText && (
//       <button
//         onClick={onAction}
//         className="text-blue-600 text-xs font-semibold cursor-pointer"
//       >
//         {actionText}
//       </button>
//     )}
//   </div>
// );

// // Simple Level Card - No progress bar, just name and status
// const SimpleLevelCard = ({ title, status, active, onClick }) => {
//   let statusText = "";
//   let statusColor = "";
//   let icon = null;

//   if (status === "completed") {
//     statusText = "Completed";
//     statusColor = "text-green-600";
//     icon = <IoCheckmarkCircleOutline className="text-green-500 text-xl" />;
//   } else if (status === "unlocked") {
//     statusText = "In Progress";
//     statusColor = "text-blue-600";
//     icon = <FiTrendingUp className="text-blue-500 text-xl" />;
//   } else {
//     statusText = "Locked";
//     statusColor = "text-gray-400";
//     icon = <CiLock className="text-gray-400 text-xl" />;
//   }

//   return (
//     <div
//       className={`bg-white shadow-sm rounded-lg p-4 text-center transition-all cursor-pointer hover:shadow-md ${!active ? "opacity-60" : ""}`}
//       onClick={onClick}
//     >
//       <div className="flex justify-center mb-2">
//         <span className="p-2 rounded-full bg-gray-100">{icon}</span>
//       </div>
//       <p className="text-sm font-bold text-gray-800">{title}</p>
//       <p className={`text-xs font-semibold mt-1 ${statusColor}`}>
//         {statusText}
//       </p>
//     </div>
//   );
// };

// // Progress Analytics Component - Full width with clear hierarchy
// const ProgressAnalytics = ({
//   levels,
//   modules,
//   chapters,
//   currentTopic,
//   currentLearning,
// }) => {
//   const [expandedModule, setExpandedModule] = useState(null);

//   // Group chapters by module
//   const modulesWithChapters =
//     modules?.map((module) => ({
//       ...module,
//       chapters:
//         chapters?.filter((chapter) => chapter.module_id === module.module_id) ||
//         [],
//     })) || [];

//   return (
//     <div className="space-y-4">
//       {/* Level Progress Section */}
//       <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//         <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
//           <h3 className="font-semibold text-gray-800 flex items-center gap-2">
//             <FaShieldAlt className="text-blue-500" /> Level Progress
//           </h3>
//         </div>
//         <div className="p-4">
//           {levels.map((level) => (
//             <div key={level.id} className="mb-4 last:mb-0">
//               <div className="flex justify-between items-center mb-2">
//                 <div>
//                   <span className="font-medium text-gray-800">
//                     {level.title}
//                   </span>
//                   <span className="text-xs text-gray-500 ml-2">
//                     ({level.completed_topics || 0}/{level.total_topics} topics)
//                   </span>
//                 </div>
//                 <span className="text-sm font-semibold text-blue-600">
//                   {level.completion_percent}%
//                 </span>
//               </div>
//               <div className="w-full h-2 bg-gray-200 rounded-full">
//                 <div
//                   className="h-2 bg-blue-500 rounded-full transition-all"
//                   style={{ width: `${level.completion_percent}%` }}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Module & Chapter Progress Section */}
//       <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//         <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
//           <h3 className="font-semibold text-gray-800 flex items-center gap-2">
//             <FaLayerGroup className="text-green-500" /> Module & Chapter
//             Progress
//           </h3>
//         </div>
//         <div className="p-4">
//           {modulesWithChapters.map((module) => (
//             <div
//               key={module.module_id}
//               className="mb-4 border border-gray-100 rounded-lg overflow-hidden"
//             >
//               <div
//                 className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
//                 onClick={() =>
//                   setExpandedModule(
//                     expandedModule === module.module_id
//                       ? null
//                       : module.module_id,
//                   )
//                 }
//               >
//                 <div className="flex items-center gap-2">
//                   <FaLayerGroup className="text-green-600 text-sm" />
//                   <span className="font-medium text-gray-800">
//                     {module.module_title}
//                   </span>
//                   <span className="text-xs text-gray-500">
//                     ({module.completed_topics}/{module.total_topics} topics)
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <span className="text-sm font-semibold text-green-600">
//                     {module.progress_percent}%
//                   </span>
//                   {expandedModule === module.module_id ? (
//                     <FaChevronUp className="text-gray-500" />
//                   ) : (
//                     <FaChevronDown className="text-gray-500" />
//                   )}
//                 </div>
//               </div>

//               <div className="px-3 pb-2">
//                 <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2">
//                   <div
//                     className="h-1.5 bg-green-500 rounded-full transition-all"
//                     style={{ width: `${module.progress_percent}%` }}
//                   />
//                 </div>
//               </div>

//               {expandedModule === module.module_id &&
//                 module.chapters.length > 0 && (
//                   <div className="border-t border-gray-100 p-3 bg-white">
//                     <p className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1">
//                       <FaBook className="text-purple-500" /> Chapters
//                     </p>
//                     <div className="space-y-3">
//                       {module.chapters.map((chapter) => (
//                         <div key={chapter.chapter_id} className="pl-4">
//                           <div className="flex justify-between items-center mb-1">
//                             <div className="flex items-center gap-2">
//                               <FaBook className="text-purple-400 text-xs" />
//                               <span className="text-sm text-gray-700">
//                                 {chapter.chapter_title}
//                               </span>
//                               <span className="text-xs text-gray-400">
//                                 ({chapter.completed_topics}/
//                                 {chapter.total_topics} topics)
//                               </span>
//                             </div>
//                             <span className="text-xs font-medium text-purple-600">
//                               {chapter.progress_percent}%
//                             </span>
//                           </div>
//                           <div className="w-full h-1 bg-gray-100 rounded-full">
//                             <div
//                               className="h-1 bg-purple-500 rounded-full transition-all"
//                               style={{ width: `${chapter.progress_percent}%` }}
//                             />
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ==================== MAIN COMPONENT ====================

// export default function Dashboard() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { dashboardData, isLoading, isError, message } = useSelector(
//     (state) => state.dashboard,
//   );
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
//     current_topic_contents,
//   } = data;

//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return "Good morning";
//     if (hour < 18) return "Good afternoon";
//     return "Good evening";
//   };

//   const getUserName = () => {
//     return last_certificate?.meta?.user?.name || "Kajal Chrave";
//   };

//   // Get first 3 levels for learning path
//   const displayedLevels = levels.slice(0, 3);
//   const remainingLevels = levels.slice(3);
//   const chartData = [25, 45, 60, 40, 70, 55, 80];

//   // Navigation handlers
//   const handleViewAllLevels = () => {
//     navigate("/levels");
//   };

//   const handleResumeTopic = () => {
//     if (current_learning?.chapter?.id) {
//       navigate(`/chapters/${current_learning.chapter.id}`);
//     } else if (next_action?.topic?.id) {
//       navigate(`/chapters/${next_action.topic.id}`);
//     }
//   };

//   const handleTopicClick = (topicId) => {
//     if (topicId) {
//       navigate(`/chapters/${topicId}`);
//     }
//   };

//   return (
//     <PageLayout>
//       <PageHeader>
//         <PageHeaderLeft>
//           <PageTitle>
//             {getGreeting()}, {getUserName()}
//           </PageTitle>
//         </PageHeaderLeft>
//       </PageHeader>

//       <PageBody>
//         {/* Top Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
//           {/* Main Card - Current Learning */}
//           <div
//             className={`bg-[#1e63ff] text-white rounded-xl p-5 transition-all duration-500 delay-100 transform ${
//               animateItems
//                 ? "translate-y-0 opacity-100"
//                 : "translate-y-4 opacity-0"
//             }`}
//           >
//             <div className="flex justify-between items-start">
//               <div className="flex-1">
//                 <p className="text-yellow-300 text-xs font-semibold mb-1">
//                   {current_learning.program.title} •{" "}
//                   {current_learning.level.title}
//                 </p>
//                 <h2 className="text-lg font-semibold">
//                   {current_learning.module.title}
//                 </h2>
//                 <p className="text-sm opacity-80 mt-1">
//                   Current Topic: {current_learning.topic.title}
//                 </p>

//                 <div className="mt-3">
//                   <div className="w-full h-2 bg-blue-300 rounded-full">
//                     <div
//                       className="h-2 bg-white rounded-full transition-all duration-700"
//                       style={{ width: `${current_learning.progress_percent}%` }}
//                     />
//                   </div>
//                   <p className="text-right text-xs mt-1">
//                     {current_learning.progress_percent}% Complete
//                   </p>
//                 </div>

//                 <div className="mt-3 flex gap-2 text-xs flex-wrap">
//                   <span className="bg-white/20 px-2 py-1 rounded">
//                     <FiCheckCircle className="inline mr-1" size={10} />{" "}
//                     {stats.completed_topics}/{stats.total_topics} Topics
//                   </span>
//                   {current_learning.pending_quizzes > 0 && (
//                     <span className="bg-orange-500/30 px-2 py-1 rounded">
//                       Pending Quizzes: {current_learning.pending_quizzes}
//                     </span>
//                   )}
//                 </div>
//               </div>

//               {/* Progress Ring */}
//               <div className="ml-4">
//                 <ProgressRing
//                   percentage={current_learning.progress_percent}
//                   size={80}
//                 />
//               </div>
//             </div>

//             {/* Current Topic Content Progress */}
//             {stats.current_topic_progress && (
//               <div className="mt-3 bg-white/10 rounded p-2">
//                 <p className="text-xs mb-1">Current Topic Progress</p>
//                 <div className="w-full h-1.5 bg-blue-300 rounded-full">
//                   <div
//                     className="h-1.5 bg-yellow-300 rounded-full transition-all"
//                     style={{
//                       width: `${stats.current_topic_progress.progress_percent}%`,
//                     }}
//                   />
//                 </div>
//                 <p className="text-right text-xs mt-1">
//                   {stats.current_topic_progress.read_contents}/
//                   {stats.current_topic_progress.total_contents} Contents Read
//                 </p>
//               </div>
//             )}

//             <button
//               className="mt-4 px-6 bg-white text-blue-600 text-sm py-2 rounded-full font-medium hover:shadow-lg transition-all flex items-center gap-2"
//               onClick={handleResumeTopic}
//             >
//               <FiPlayCircle size={14} /> Resume Topic
//             </button>
//           </div>

//           {/* Learning Path - Simple Grid with 3 columns, no progress bar */}
//           <div
//             className={`border border-gray-300 rounded-lg p-3 transition-all duration-500 delay-200 transform ${
//               animateItems
//                 ? "translate-y-0 opacity-100"
//                 : "translate-y-4 opacity-0"
//             }`}
//           >
//             <div className="flex justify-between mb-4">
//               <h3 className="font-semibold">Learning Path</h3>
//               <button
//                 className="text-blue-600 text-xs cursor-pointer hover:underline"
//                 onClick={handleViewAllLevels}
//               >
//                 View All
//               </button>
//             </div>
//             <div className="grid grid-cols-3 gap-3">
//               {displayedLevels.map((level) => {
//                 const isActive = level.status !== "locked";
//                 return (
//                   <SimpleLevelCard
//                     key={level.id}
//                     title={level.title}
//                     status={level.status}
//                     active={isActive}
//                     onClick={() => handleTopicClick(level.id)}
//                   />
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//           {/* Current Topics Section - Takes 2 columns */}
//           <div
//             className={`lg:col-span-2 border border-gray-300 rounded-lg p-3 transition-all duration-500 delay-300 transform ${
//               animateItems
//                 ? "translate-y-0 opacity-100"
//                 : "translate-y-4 opacity-0"
//             }`}
//           >
//             <div className="flex justify-between mb-4">
//               <h3 className="font-semibold">Current Topics</h3>
//             </div>
//             <div className="space-y-3">
//               <CourseCard
//                 title={current_learning.topic.title}
//                 subtitle={`${current_learning.chapter.title} • ${current_learning.module.title}`}
//                 days={5}
//                 progress={current_learning.progress_percent}
//                 status="IN PROGRESS"
//                 statusColor="#1e63ff"
//                 onClick={handleResumeTopic}
//               />
//               {current_learning.last_completed_topic && (
//                 <CourseCard
//                   title={current_learning.last_completed_topic.title}
//                   subtitle="Completed"
//                   days={0}
//                   progress={100}
//                   status="COMPLETED"
//                   statusColor="#16a34a"
//                   onClick={() =>
//                     handleTopicClick(current_learning.last_completed_topic.id)
//                   }
//                 />
//               )}
//               {current_learning.pending_quizzes === 0 && (
//                 <CourseCard
//                   title="Quiz Assessment"
//                   subtitle="Ready to take"
//                   days={7}
//                   progress={0}
//                   status="PENDING"
//                   statusColor="#f97316"
//                   onClick={() => console.log("Start quiz")}
//                 />
//               )}
//             </div>

//             {/* Topic Contents - No Read/Watch buttons, just display content */}
//             {current_topic_contents && current_topic_contents.length > 0 && (
//               <div className="mt-4">
//                 <h4 className="font-semibold text-sm mb-2">Topic Contents</h4>
//                 <div className="space-y-2">
//                   {current_topic_contents.map((content) => (
//                     <div
//                       key={content.id}
//                       className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
//                     >
//                       <div className="w-8 h-8 bg-white border border-gray-200 rounded flex items-center justify-center">
//                         {content.type === "text" ? (
//                           <FaBookOpen className="text-blue-500 text-sm" />
//                         ) : (
//                           <FaPlay className="text-blue-500 text-sm" />
//                         )}
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-sm font-medium text-gray-800">
//                           {content.title}
//                         </p>
//                         <p className="text-xs text-gray-500 capitalize">
//                           {content.type}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Progress Analytics Section - Full width and clear hierarchy */}
//           <div
//             className={`lg:col-span-1 border border-gray-300 rounded-lg p-3 transition-all duration-500 delay-400 transform ${
//               animateItems
//                 ? "translate-y-0 opacity-100"
//                 : "translate-y-4 opacity-0"
//             }`}
//           >
//             <ProgressAnalytics
//               levels={levels}
//               modules={stats.modules_progress}
//               chapters={stats.chapters_progress}
//               currentTopic={stats.current_topic_progress}
//               currentLearning={current_learning}
//             />
//           </div>
//         </div>

//         {/* Latest Updates / Activity Section - Full Width */}
//         <div
//           className={`mt-4 border border-gray-300 rounded-lg p-3 transition-all duration-500 delay-500 transform ${
//             animateItems
//               ? "translate-y-0 opacity-100"
//               : "translate-y-4 opacity-0"
//           }`}
//         >
//           <h3 className="font-semibold mb-4">Latest Updates</h3>
//           <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
//             {next_action && (
//               <>
//                 <ActivityItem
//                   icon={<FiTarget />}
//                   bg="bg-blue-100"
//                   color="text-blue-600"
//                   title={`Next: ${next_action.topic.title}`}
//                   time={`${next_action.level.title} • ${next_action.module.title} • ${next_action.chapter.title}`}
//                   actionText="Continue"
//                   onAction={handleResumeTopic}
//                 />
//                 <div className="border-t border-gray-300" />
//               </>
//             )}

//             {last_certificate && (
//               <ActivityItem
//                 icon={<FaMedal />}
//                 bg="bg-green-100"
//                 color="text-green-600"
//                 title={`Certificate earned: ${last_certificate.meta?.context?.title}`}
//                 time={`Score: ${last_certificate.percentage}% • ${new Date(last_certificate.issued_at).toLocaleDateString()}`}
//                 actionText="View"
//                 onAction={() =>
//                   navigate(
//                     `/certificate/${last_certificate?.assessment_attempt_id}`,
//                   )
//                 }
//               />
//             )}

//             <ActivityItem
//               icon={<FaUserGraduate />}
//               bg="bg-orange-100"
//               color="text-orange-600"
//               title={`${stats.completed_levels}/${stats.total_levels} levels completed`}
//               time={`${stats.remaining_levels} more to go`}
//               actionText="View"
//               onAction={handleViewAllLevels}
//             />

//             {current_learning.last_activity_date && (
//               <ActivityItem
//                 icon={<FiCalendar />}
//                 bg="bg-purple-100"
//                 color="text-purple-600"
//                 title="Last Learning Session"
//                 time={new Date(
//                   current_learning.last_activity_date,
//                 ).toLocaleString()}
//                 actionText="Resume"
//                 onAction={handleResumeTopic}
//               />
//             )}
//           </div>
//         </div>

//         {/* Achievement Banner */}
//         <div
//           className={`mt-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-3 border border-amber-200 transition-all duration-500 delay-600 transform ${
//             animateItems
//               ? "translate-y-0 opacity-100"
//               : "translate-y-4 opacity-0"
//           }`}
//         >
//           <div className="flex items-center gap-3">
//             <FiAward className="text-amber-600 text-lg" />
//             <div className="flex-1">
//               <p className="text-xs font-semibold text-amber-800">
//                 Achievement Unlocked
//               </p>
//               <p className="text-xs text-amber-600">
//                 You have earned {stats.certificates_earned} certificates with an
//                 average score of {stats.avg_topic_score}%.
//               </p>
//             </div>
//             <FiChevronRight className="text-amber-600" />
//           </div>
//         </div>
//       </PageBody>
//     </PageLayout>
//   );
// }

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
  FaChartLine,
  FaUserGraduate,
  FaBookOpen,
  FaPlay,
  FaCertificate,
  FaClock,
  FaLayerGroup,
  FaBook,
  FaChevronDown,
  FaChevronUp,
  FaListOl,
} from "react-icons/fa";
import {
  FiChevronRight,
  FiAward,
  FiTarget,
  FiTrendingUp,
  FiCalendar,
  FiDownload,
  FiPlayCircle,
  FiCheckCircle,
  FiBarChart2,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

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
        <span className="text-xl font-bold ">{percentage}%</span>
      </div>
    </div>
  );
};

// Course Card Component
const CourseCard = ({
  title,
  subtitle,
  days,
  progress,
  status,
  statusColor,
  onClick,
}) => (
  <div
    className="rounded-xl shadow-sm p-4 flex items-center justify-between bg-white hover:shadow-md transition-shadow cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-center gap-4 flex-1">
      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
        <FaShieldAlt className="text-blue-600 text-xl" />
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
      {status}
    </span>
  </div>
);

// Activity Item Component
const ActivityItem = ({
  icon,
  bg,
  color,
  title,
  time,
  actionText,
  onAction,
}) => (
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

// Simple Level Card - No progress bar, just name and status
const SimpleLevelCard = ({ title, status, active, onClick }) => {
  let statusText = "";
  let statusColor = "";
  let icon = null;

  if (status === "completed") {
    statusText = "Completed";
    statusColor = "text-green-600";
    icon = <IoCheckmarkCircleOutline className="text-green-500 text-xl" />;
  } else if (status === "unlocked") {
    statusText = "In Progress";
    statusColor = "text-blue-600";
    icon = <FiTrendingUp className="text-blue-500 text-xl" />;
  } else {
    statusText = "Locked";
    statusColor = "text-gray-400";
    icon = <CiLock className="text-gray-400 text-xl" />;
  }

  return (
    <div
      className={`bg-white shadow-sm rounded-lg p-4 text-center transition-all cursor-pointer hover:shadow-md ${!active ? "opacity-60" : ""}`}
      onClick={onClick}
    >
      <div className="flex justify-center mb-2">
        <span className="p-2 rounded-full bg-gray-100">{icon}</span>
      </div>
      <p className="text-sm font-bold text-gray-800">{title}</p>
      <p className={`text-xs font-semibold mt-1 ${statusColor}`}>
        {statusText}
      </p>
    </div>
  );
};

// Progress Analytics Component - Full width with clear hierarchy
const ProgressAnalytics = ({
  levels,
  modules,
  chapters,
  currentTopic,
  currentLearning,
}) => {
  const [expandedModule, setExpandedModule] = useState(null);

  // Group chapters by module
  const modulesWithChapters =
    modules?.map((module) => ({
      ...module,
      chapters:
        chapters?.filter((chapter) => chapter.module_id === module.module_id) ||
        [],
    })) || [];

  return (
    <div className="space-y-4">
      {/* Level Progress Section */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <FaShieldAlt className="text-blue-500" /> Level Progress
          </h3>
        </div>
        <div className="p-4">
          {levels?.map((level) => (
            <div key={level.id} className="mb-4 last:mb-0">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="font-medium text-gray-800">
                    {level.title}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({level.completed_topics || 0}/{level.total_topics || 0}{" "}
                    topics)
                  </span>
                </div>
                <span className="text-sm font-semibold text-blue-600">
                  {level.completion_percent || 0}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-blue-500 rounded-full transition-all"
                  style={{ width: `${level.completion_percent || 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Module & Chapter Progress Section */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <FaLayerGroup className="text-green-500" /> Module & Chapter
            Progress
          </h3>
        </div>
        <div className="p-4">
          {modulesWithChapters.map((module) => (
            <div
              key={module.module_id}
              className="mb-4 border border-gray-100 rounded-lg overflow-hidden"
            >
              <div
                className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() =>
                  setExpandedModule(
                    expandedModule === module.module_id
                      ? null
                      : module.module_id,
                  )
                }
              >
                <div className="flex items-center gap-2">
                  <FaLayerGroup className="text-green-600 text-sm" />
                  <span className="font-medium text-gray-800">
                    {module.module_title}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({module.completed_topics || 0}/{module.total_topics || 0}{" "}
                    topics)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-green-600">
                    {module.progress_percent || 0}%
                  </span>
                  {expandedModule === module.module_id ? (
                    <FaChevronUp className="text-gray-500" />
                  ) : (
                    <FaChevronDown className="text-gray-500" />
                  )}
                </div>
              </div>

              <div className="px-3 pb-2">
                <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2">
                  <div
                    className="h-1.5 bg-green-500 rounded-full transition-all"
                    style={{ width: `${module.progress_percent || 0}%` }}
                  />
                </div>
              </div>

              {expandedModule === module.module_id &&
                module.chapters.length > 0 && (
                  <div className="border-t border-gray-100 p-3 bg-white">
                    <p className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1">
                      <FaBook className="text-purple-500" /> Chapters
                    </p>
                    <div className="space-y-3">
                      {module.chapters.map((chapter) => (
                        <div key={chapter.chapter_id} className="pl-4">
                          <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center gap-2">
                              <FaBook className="text-purple-400 text-xs" />
                              <span className="text-sm text-gray-700">
                                {chapter.chapter_title}
                              </span>
                              <span className="text-xs text-gray-400">
                                ({chapter.completed_topics || 0}/
                                {chapter.total_topics || 0} topics)
                              </span>
                            </div>
                            <span className="text-xs font-medium text-purple-600">
                              {chapter.progress_percent || 0}%
                            </span>
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
      </div>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dashboardData, isLoading, isError, message } = useSelector(
    (state) => state.dashboard,
  );
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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const getUserName = () => {
    return last_certificate?.meta?.user?.name || "Kajal Chrave";
  };

  // Get first 3 levels for learning path
  const displayedLevels = levels?.slice(0, 3) || [];
  const remainingLevels = levels?.slice(3) || [];

  // Navigation handlers
  const handleViewAllLevels = () => {
    navigate("/levels");
  };

  const handleResumeTopic = () => {
    // First priority: current learning chapter
    if (current_learning?.chapter?.id) {
      navigate(`/chapters/${current_learning.chapter.id}`);
    }
    // Second priority: next_action topic
    else if (next_action?.topic?.id) {
      navigate(`/chapters/${next_action.topic.id}`);
    }
    // Third priority: current learning topic
    else if (current_learning?.topic?.id) {
      navigate(`/chapters/${current_learning.topic.id}`);
    }
    // Fallback for quiz
    else if (next_action?.type === "topic_quiz" && next_action?.assessment_id) {
      navigate(`/quiz/${next_action.assessment_id}`);
    }
  };

  const handleTopicClick = (topicId) => {
    if (topicId) {
      navigate(`/chapters/${topicId}`);
    }
  };

  // Helper function to get next action display text
  const getNextActionTitle = () => {
    if (!next_action) return "Continue Learning";
    if (next_action.topic?.title) return `Next: ${next_action.topic.title}`;
    if (next_action.assessment_title)
      return `Next: ${next_action.assessment_title}`;
    return "Continue Learning";
  };

  const getNextActionTime = () => {
    if (!next_action) return "Ready to continue";
    if (next_action.type === "topic_quiz") return "Quiz • Ready to start";
    if (next_action.topic?.title) return "Topic • Ready to continue";
    return "Ready to start";
  };

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>
            {getGreeting()}, {getUserName()}
          </PageTitle>
        </PageHeaderLeft>
      </PageHeader>

      <PageBody>
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
          {/* Main Card - Current Learning */}
          <div
            className={`bg-[#1e63ff] text-white rounded-xl p-5 transition-all duration-500 delay-100 transform ${
              animateItems
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-yellow-300 text-xs font-semibold mb-1">
                  {current_learning?.program?.title || "Program"} •{" "}
                  {current_learning?.level?.title || "Level"}
                </p>
                <h2 className="text-lg font-semibold">
                  {current_learning?.module?.title || "Module"}
                </h2>
                <p className="text-sm opacity-80 mt-1">
                  Current Topic: {current_learning?.topic?.title || "Topic"}
                </p>

                <div className="mt-3">
                  <div className="w-full h-2 bg-blue-300 rounded-full">
                    <div
                      className="h-2 bg-white rounded-full transition-all duration-700"
                      style={{
                        width: `${current_learning?.progress_percent || 0}%`,
                      }}
                    />
                  </div>
                  <p className="text-right text-xs mt-1">
                    {current_learning?.progress_percent || 0}% Complete
                  </p>
                </div>

                <div className="mt-3 flex gap-2 text-xs flex-wrap">
                  <span className="bg-white/20 px-2 py-1 rounded">
                    <FiCheckCircle className="inline mr-1" size={10} />{" "}
                    {stats?.completed_topics || 0}/{stats?.total_topics || 0}{" "}
                    Topics
                  </span>
                  {current_learning?.pending_quizzes > 0 && (
                    <span className="bg-orange-500/30 px-2 py-1 rounded">
                      Pending Quizzes: {current_learning.pending_quizzes}
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Ring */}
              <div className="ml-4">
                <ProgressRing
                  percentage={current_learning?.progress_percent || 0}
                  size={80}
                />
              </div>
            </div>

            {/* Current Topic Content Progress */}
            {stats?.current_topic_progress && (
              <div className="mt-3 bg-white/10 rounded p-2">
                <p className="text-xs mb-1">Current Topic Progress</p>
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
                  Read
                </p>
              </div>
            )}

            <button
              className="mt-4 px-6 bg-white text-blue-600 text-sm py-2 rounded-full font-medium hover:shadow-lg transition-all flex items-center gap-2"
              onClick={handleResumeTopic}
            >
              <FiPlayCircle size={14} /> Resume Topic
            </button>
          </div>

          {/* Learning Path - Simple Grid with 3 columns, no progress bar */}
          <div
            className={`border border-gray-300 rounded-lg p-3 transition-all duration-500 delay-200 transform ${
              animateItems
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">Learning Path</h3>
              <button
                className="text-blue-600 text-xs cursor-pointer hover:underline"
                onClick={handleViewAllLevels}
              >
                View All
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {displayedLevels.map((level) => {
                const isActive = level.status !== "locked";
                return (
                  <SimpleLevelCard
                    key={level.id}
                    title={level.title}
                    status={level.status}
                    active={isActive}
                    onClick={() => handleTopicClick(level.id)}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Current Topics Section - Takes 2 columns */}
          <div
            className={`lg:col-span-2 border border-gray-300 rounded-lg p-3 transition-all duration-500 delay-300 transform ${
              animateItems
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">Current Topics</h3>
            </div>
            <div className="space-y-3">
              <CourseCard
                title={current_learning?.topic?.title || "Current Topic"}
                subtitle={`${current_learning?.chapter?.title || "Chapter"} • ${current_learning?.module?.title || "Module"}`}
                days={5}
                progress={current_learning?.progress_percent || 0}
                status="IN PROGRESS"
                statusColor="#1e63ff"
                onClick={handleResumeTopic}
              />
              {current_learning?.last_completed_topic?.title && (
                <CourseCard
                  title={current_learning.last_completed_topic.title}
                  subtitle="Completed"
                  days={0}
                  progress={100}
                  status="COMPLETED"
                  statusColor="#16a34a"
                  onClick={() =>
                    handleTopicClick(current_learning.last_completed_topic.id)
                  }
                />
              )}
              {current_learning?.pending_quizzes === 0 && (
                <CourseCard
                  title="Quiz Assessment"
                  subtitle="Ready to take"
                  days={7}
                  progress={0}
                  status="PENDING"
                  statusColor="#f97316"
                  onClick={() => {
                    if (next_action?.assessment_id) {
                      navigate(`/quiz/${next_action.assessment_id}`);
                    }
                  }}
                />
              )}
            </div>

            {/* Topic Contents - No Read/Watch buttons, just display content */}
            {current_topic_contents && current_topic_contents.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold text-sm mb-2">Topic Contents</h4>
                <div className="space-y-2">
                  {current_topic_contents.map((content) => (
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
                          {content.title}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                          {content.type}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Progress Analytics Section - Full width and clear hierarchy */}
          <div
            className={`lg:col-span-1 border border-gray-300 rounded-lg p-3 transition-all duration-500 delay-400 transform ${
              animateItems
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <ProgressAnalytics
              levels={levels || []}
              modules={stats?.modules_progress || []}
              chapters={stats?.chapters_progress || []}
              currentTopic={stats?.current_topic_progress}
              currentLearning={current_learning}
            />
          </div>
        </div>

        {/* Latest Updates / Activity Section - Full Width */}
        <div
          className={`mt-4 border border-gray-300 rounded-lg p-3 transition-all duration-500 delay-500 transform ${
            animateItems
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          <h3 className="font-semibold mb-4">Latest Updates</h3>
          <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
            {next_action && (
              <>
                <ActivityItem
                  icon={<FiTarget />}
                  bg="bg-blue-100"
                  color="text-blue-600"
                  title={getNextActionTitle()}
                  time={getNextActionTime()}
                  actionText="Continue"
                  onAction={handleResumeTopic}
                />
                <div className="border-t border-gray-300" />
              </>
            )}

            {last_certificate && (
              <ActivityItem
                icon={<FaMedal />}
                bg="bg-green-100"
                color="text-green-600"
                title={`Certificate earned: ${last_certificate.meta?.context?.title || "Certificate"}`}
                time={`Score: ${last_certificate.percentage || 0}% • ${new Date(last_certificate.issued_at).toLocaleDateString()}`}
                actionText="View"
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
              title={`${stats?.completed_levels || 0}/${stats?.total_levels || 0} levels completed`}
              time={`${stats?.remaining_levels || 0} more to go`}
              actionText="View"
              onAction={handleViewAllLevels}
            />

            {current_learning?.last_activity_date && (
              <ActivityItem
                icon={<FiCalendar />}
                bg="bg-purple-100"
                color="text-purple-600"
                title="Last Learning Session"
                time={new Date(
                  current_learning.last_activity_date,
                ).toLocaleString()}
                actionText="Resume"
                onAction={handleResumeTopic}
              />
            )}
          </div>
        </div>

        {/* Achievement Banner */}
        <div
          className={`mt-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-3 border border-amber-200 transition-all duration-500 delay-600 transform ${
            animateItems
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          <div className="flex items-center gap-3">
            <FiAward className="text-amber-600 text-lg" />
            <div className="flex-1">
              <p className="text-xs font-semibold text-amber-800">
                Achievement Unlocked
              </p>
              <p className="text-xs text-amber-600">
                You have earned {stats?.certificates_earned || 0} certificates
                with an average score of {stats?.avg_topic_score || 0}%.
              </p>
            </div>
            <FiChevronRight className="text-amber-600" />
          </div>
        </div>
      </PageBody>
    </PageLayout>
  );
}

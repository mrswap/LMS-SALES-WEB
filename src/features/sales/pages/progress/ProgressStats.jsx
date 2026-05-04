// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   FaBookOpen,
//   FaClock,
//   FaChartLine,
//   FaClipboardList,
//   FaUserGraduate,
//   FaCertificate,
//   FaChevronRight,
//   FaMedal,
//   FaFire,
//   FaCalendarAlt,
//   FaCheckCircle,
//   FaSpinner,
//   FaLock,
//   FaPlayCircle,
//   FaStar,
//   FaTrophy,
//   FaArrowRight,
//   FaFolderOpen,
//   FaFileAlt,
//   FaQuestionCircle,
// } from "react-icons/fa";
// import { FiTrendingUp, FiTarget, FiAward, FiBarChart2 } from "react-icons/fi";
// import { getDashboardData } from "../../../../redux/slice/dashboardSlice";
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

// // ==================== PROFESSIONAL CLASSIC COMPONENTS ====================

// // Classic Card Component
// const ClassicCard = ({ children, className, bordered = true }) => {
//   return (
//     <div
//       className={`bg-white ${bordered ? "border border-gray-200" : "border-0"} rounded-lg shadow-sm ${className}`}
//     >
//       {children}
//     </div>
//   );
// };

// // Stat Card
// const StatCard = ({ icon: Icon, title, value, subtitle, color }) => {
//   const colors = {
//     blue: "bg-blue-50 text-blue-600",
//     green: "bg-green-50 text-green-600",
//     purple: "bg-purple-50 text-purple-600",
//     orange: "bg-orange-50 text-orange-600",
//   };

//   return (
//     <ClassicCard className="p-5 hover:shadow-md transition-shadow">
//       <div className="flex items-start justify-between">
//         <div className="flex-1">
//           <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
//             {title}
//           </p>
//           <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
//           <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
//         </div>
//         <div className={`p-3 rounded-lg ${colors[color]}`}>
//           <Icon className="text-xl" />
//         </div>
//       </div>
//     </ClassicCard>
//   );
// };

// // Module Hierarchy Component
// const ModuleHierarchy = ({ modules, chapters, onModuleClick }) => {
//   const [expandedModules, setExpandedModules] = useState({});

//   const toggleModule = (moduleId) => {
//     setExpandedModules((prev) => ({
//       ...prev,
//       [moduleId]: !prev[moduleId],
//     }));
//   };

//   // Group chapters by module
//   const getChaptersByModule = (moduleId) => {
//     return chapters?.filter((ch) => ch.module_id === moduleId) || [];
//   };

//   return (
//     <div className="space-y-3">
//       {modules?.map((module, idx) => {
//         const moduleChapters = getChaptersByModule(module.module_id);
//         const isExpanded = expandedModules[module.module_id];
//         const moduleProgress = module.progress_percent || 0;

//         return (
//           <ClassicCard
//             key={module.module_id || idx}
//             className="overflow-hidden"
//           >
//             {/* Module Header */}
//             <div
//               className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100"
//               onClick={() => toggleModule(module.module_id)}
//             >
//               <div className="flex items-center gap-3 flex-1">
//                 <div
//                   className={`w-2 h-2 rounded-full ${moduleProgress === 100 ? "bg-green-500" : moduleProgress > 0 ? "bg-blue-500" : "bg-gray-300"}`}
//                 ></div>
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2">
//                     <FaFolderOpen className="text-blue-600 text-sm" />
//                     <h4 className="font-medium text-gray-900">
//                       {module.module_title || module.title}
//                     </h4>
//                     {module.code && (
//                       <span className="text-xs text-gray-400 font-mono">
//                         ({module.code})
//                       </span>
//                     )}
//                   </div>
//                   <div className="flex items-center gap-4 mt-1">
//                     <div className="flex items-center gap-2">
//                       <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
//                         <div
//                           className="h-full bg-blue-500 rounded-full transition-all"
//                           style={{ width: `${moduleProgress}%` }}
//                         />
//                       </div>
//                       <span className="text-xs text-gray-500">
//                         {moduleProgress}%
//                       </span>
//                     </div>
//                     <span className="text-xs text-gray-400">
//                       {module.completed_topics || 0}/
//                       {module.total_topics || moduleChapters.length} topics
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <FaChevronRight
//                 className={`text-gray-400 text-sm transition-transform ${isExpanded ? "rotate-90" : ""}`}
//               />
//             </div>

//             {/* Chapters List */}
//             {isExpanded && moduleChapters.length > 0 && (
//               <div className="bg-gray-50/30 p-3 space-y-2">
//                 {moduleChapters.map((chapter, chIdx) => (
//                   <div
//                     key={chapter.chapter_id || chIdx}
//                     className="flex items-center gap-3 p-2 rounded hover:bg-white transition-colors cursor-pointer"
//                     onClick={() =>
//                       onModuleClick?.(module.module_id, chapter.chapter_id)
//                     }
//                   >
//                     <div className="w-6 text-center">
//                       {chapter.progress_percent === 100 ? (
//                         <FaCheckCircle className="text-green-500 text-xs" />
//                       ) : chapter.progress_percent > 0 ? (
//                         <FaSpinner className="text-blue-500 text-xs" />
//                       ) : (
//                         <FaLock className="text-gray-300 text-xs" />
//                       )}
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2">
//                         <FaFileAlt className="text-gray-400 text-xs" />
//                         <span className="text-sm text-gray-700">
//                           {chapter.chapter_title || chapter.title}
//                         </span>
//                       </div>
//                       {chapter.description && (
//                         <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
//                           {chapter.description}
//                         </p>
//                       )}
//                     </div>
//                     <div className="flex items-center gap-2">
//                       {chapter.estimated_time && (
//                         <span className="text-xs text-gray-400">
//                           {chapter.estimated_time} min
//                         </span>
//                       )}
//                       <span className="text-xs font-medium text-gray-500 min-w-[35px] text-right">
//                         {chapter.progress_percent || 0}%
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </ClassicCard>
//         );
//       })}
//     </div>
//   );
// };

// // Current Focus Component
// const CurrentFocus = ({ currentLearning, onContinue }) => {
//   if (!currentLearning) {
//     return (
//       <ClassicCard className="p-6 text-center">
//         <FaBookOpen className="text-4xl text-gray-300 mx-auto mb-3" />
//         <p className="text-gray-500">No active learning in progress</p>
//         <button className="mt-3 text-blue-600 text-sm font-medium hover:underline">
//           Browse Courses →
//         </button>
//       </ClassicCard>
//     );
//   }

//   return (
//     <ClassicCard className="overflow-hidden">
//       <div className="bg-blue-50 px-4 py-2 border-b border-blue-100">
//         <h3 className="font-semibold text-gray-900 text-sm">CURRENT FOCUS</h3>
//       </div>
//       <div className="p-4">
//         {/* Program/Level */}
//         {currentLearning.program && (
//           <div className="mb-3">
//             <span className="text-xs font-medium text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
//               {currentLearning.program.title}
//             </span>
//           </div>
//         )}

//         {/* Module & Chapter Hierarchy */}
//         <div className="space-y-2 mb-4">
//           {currentLearning.module && (
//             <div className="flex items-start gap-2">
//               <FaFolderOpen className="text-blue-500 text-sm mt-0.5" />
//               <div>
//                 <p className="text-xs text-gray-500">Module</p>
//                 <p className="text-sm font-medium text-gray-900">
//                   {currentLearning.module.title}
//                 </p>
//               </div>
//             </div>
//           )}

//           {currentLearning.chapter && (
//             <div className="flex items-start gap-2 ml-4">
//               <FaFileAlt className="text-gray-400 text-sm mt-0.5" />
//               <div>
//                 <p className="text-xs text-gray-500">Chapter</p>
//                 <p className="text-sm text-gray-800">
//                   {currentLearning.chapter.title}
//                 </p>
//               </div>
//             </div>
//           )}

//           {currentLearning.topic && (
//             <div className="flex items-start gap-2 ml-8">
//               <FaStar className="text-amber-500 text-sm mt-0.5" />
//               <div>
//                 <p className="text-xs text-gray-500">Current Topic</p>
//                 <p className="text-sm font-medium text-gray-900">
//                   {currentLearning.topic.title}
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Progress Bar */}
//         <div className="mb-4">
//           <div className="flex justify-between text-xs mb-1">
//             <span className="text-gray-600">Topic Progress</span>
//             <span className="font-medium text-blue-700">
//               {currentLearning.progress_percent || 0}%
//             </span>
//           </div>
//           <div className="w-full h-2 bg-gray-100 rounded-full">
//             <div
//               className="h-2 bg-blue-500 rounded-full transition-all"
//               style={{ width: `${currentLearning.progress_percent || 0}%` }}
//             />
//           </div>
//         </div>

//         {/* Action Button */}
//         <button
//           onClick={onContinue}
//           className="w-full py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
//         >
//           <FaPlayCircle size={12} /> Continue Learning
//         </button>
//       </div>
//     </ClassicCard>
//   );
// };

// // Main Component
// export default function ProgressStats() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { dashboardData, isLoading, isError, message } = useSelector(
//     (state) => state.dashboard,
//   );

//   useEffect(() => {
//     dispatch(getDashboardData());
//   }, [dispatch]);

//   if (isLoading) return <Loader />;
//   if (isError) return <Error message={message} />;

//   const data = dashboardData?.data;
//   if (!data) return null;

//   const { current_learning, levels, stats, modules, chapters } = data;

//   // Calculate stats
//   const completedLevels =
//     levels?.filter((l) => l.status === "completed").length || 0;
//   const inProgressLevels =
//     levels?.filter((l) => l.status === "unlocked").length || 0;
//   const overallProgress =
//     Math.round((stats?.completed_topics / stats?.total_topics) * 100) || 0;

//   const handleContinueLearning = () => {
//     if (current_learning?.topic?.id) {
//       navigate(`/learn/topic/${current_learning.topic.id}`);
//     }
//   };

//   const handleModuleChapterClick = (moduleId, chapterId) => {
//     navigate(`/learn/chapter/${chapterId}`);
//   };

//   const reports = [
//     {
//       key: "auditLogs",
//       icon: FaClipboardList,
//       title: "Audit Logs",
//       description: "Track system activities and user actions",
//       color: "blue",
//       onClick: () => navigate("/audit-logs"),
//     },
//     {
//       key: "userProgress",
//       icon: FaUserGraduate,
//       title: "User Progress",
//       description: "Monitor learner achievements and completion rates",
//       color: "green",
//       onClick: () => navigate("/user-progress"),
//     },
//     {
//       key: "certification",
//       icon: FaCertificate,
//       title: "Certification",
//       description: "View certificates issued and status",
//       color: "purple",
//       onClick: () => navigate("/certification"),
//     },
//   ];

//   return (
//     <PageLayout>
//       <PageHeader>
//         <PageHeaderLeft>
//           <PageTitle>Progress Dashboard</PageTitle>
//           <PageSubtitle>
//             Track your learning progress across modules and chapters
//           </PageSubtitle>
//         </PageHeaderLeft>
//       </PageHeader>

//       <PageBody>
//         {/* Stats Row */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
//           <StatCard
//             icon={FaTrophy}
//             title="Levels Completed"
//             value={completedLevels}
//             subtitle={`${inProgressLevels} in progress`}
//             color="blue"
//           />
//           <StatCard
//             icon={FaCertificate}
//             title="Certificates"
//             value={stats?.certificates_earned || 0}
//             subtitle={`Avg. score ${stats?.avg_topic_score || 0}%`}
//             color="green"
//           />
//           <StatCard
//             icon={FiBarChart2}
//             title="Avg. Score"
//             value={`${stats?.avg_topic_score || 0}%`}
//             subtitle="Overall performance"
//             color="purple"
//           />
//           <StatCard
//             icon={FaBookOpen}
//             title="Topics Completed"
//             value={`${stats?.completed_topics || 0}/${stats?.total_topics || 0}`}
//             subtitle={`${overallProgress}% complete`}
//             color="orange"
//           />
//         </div>

//         {/* Main Content - 2 Columns */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column - Current Focus (1/3) */}
//           <div>
//             <CurrentFocus
//               currentLearning={current_learning}
//               onContinue={handleContinueLearning}
//             />

//             {/* Quick Stats */}
//             <ClassicCard className="mt-5 p-4">
//               <h4 className="text-sm font-semibold text-gray-700 mb-3">
//                 Quick Stats
//               </h4>
//               <div className="space-y-2">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-500">Total Topics</span>
//                   <span className="font-medium text-gray-900">
//                     {stats?.total_topics || 0}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-500">Completed</span>
//                   <span className="font-medium text-green-600">
//                     {stats?.completed_topics || 0}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-500">In Progress</span>
//                   <span className="font-medium text-blue-600">
//                     {stats?.in_progress_topics || 0}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-500">Pending Quizzes</span>
//                   <span className="font-medium text-orange-600">
//                     {current_learning?.pending_quizzes || 0}
//                   </span>
//                 </div>
//               </div>
//             </ClassicCard>
//           </div>

//           {/* Right Column - Module Hierarchy (2/3) */}
//           <div className="lg:col-span-2">
//             <ClassicCard className="overflow-hidden">
//               <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
//                 <div className="flex items-center gap-2">
//                   <FaFolderOpen className="text-blue-600" />
//                   <h3 className="font-semibold text-gray-900">
//                     Module & Chapter Hierarchy
//                   </h3>
//                   <span className="text-xs text-gray-400 ml-auto">
//                     {modules?.length || 0} modules
//                   </span>
//                 </div>
//               </div>
//               <div className="p-4">
//                 <ModuleHierarchy
//                   modules={modules || stats?.modules_progress}
//                   chapters={chapters || stats?.chapters_progress}
//                   onModuleClick={handleModuleChapterClick}
//                 />
//               </div>
//             </ClassicCard>
//           </div>
//         </div>

//         {/* Reports Section */}
//         <div className="mt-8">
//           <div className="mb-4">
//             <h3 className="text-lg font-semibold text-gray-800">Reports</h3>
//             <p className="text-sm text-gray-500">
//               Access detailed reports and analytics
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//             {reports.map((report) => (
//               <ClassicCard
//                 key={report.key}
//                 className="cursor-pointer hover:shadow-md transition-shadow"
//                 onClick={report.onClick}
//               >
//                 <div className="p-5">
//                   <div
//                     className={`inline-flex p-2 rounded-lg bg-${report.color}-50 mb-3`}
//                   >
//                     <report.icon
//                       className={`text-${report.color}-600 text-lg`}
//                     />
//                   </div>
//                   <h4 className="font-semibold text-gray-900 mb-1">
//                     {report.title}
//                   </h4>
//                   <p className="text-sm text-gray-500">{report.description}</p>
//                   <div className="flex items-center gap-1 text-sm text-blue-600 mt-3">
//                     <span>Access</span>
//                     <FaArrowRight size={11} />
//                   </div>
//                 </div>
//               </ClassicCard>
//             ))}
//           </div>
//         </div>
//       </PageBody>
//     </PageLayout>
//   );
// }

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaBookOpen,
  FaClock,
  FaChartLine,
  FaClipboardList,
  FaUserGraduate,
  FaCertificate,
  FaChevronRight,
  FaMedal,
  FaFire,
  FaCalendarAlt,
  FaCheckCircle,
  FaSpinner,
  FaLock,
  FaPlayCircle,
  FaStar,
  FaTrophy,
  FaArrowRight,
  FaFolderOpen,
  FaFileAlt,
  FaQuestionCircle,
} from "react-icons/fa";
import { FiTrendingUp, FiTarget, FiAward, FiBarChart2 } from "react-icons/fi";
import { getDashboardData } from "../../../../redux/slice/dashboardSlice";
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

// ==================== PROFESSIONAL CLASSIC COMPONENTS ====================

// Classic Card Component
const ClassicCard = ({ children, className, bordered = true }) => {
  return (
    <div
      className={`bg-white ${bordered ? "border border-gray-200" : "border-0"} rounded-lg shadow-sm ${className}`}
    >
      {children}
    </div>
  );
};

// Stat Card
const StatCard = ({ icon: Icon, title, value, subtitle, color }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <ClassicCard className="p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div className={`p-3 rounded-lg ${colors[color]}`}>
          <Icon className="text-xl" />
        </div>
      </div>
    </ClassicCard>
  );
};

// Module Hierarchy Component
const ModuleHierarchy = ({ modules, chapters, onModuleClick }) => {
  const [expandedModules, setExpandedModules] = useState({});

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  // Group chapters by module
  const getChaptersByModule = (moduleId) => {
    return chapters?.filter((ch) => ch.module_id === moduleId) || [];
  };

  return (
    <div className="space-y-3">
      {modules?.map((module, idx) => {
        const moduleChapters = getChaptersByModule(module.module_id);
        const isExpanded = expandedModules[module.module_id];
        const moduleProgress = module.progress_percent || 0;

        return (
          <ClassicCard
            key={module.module_id || idx}
            className="overflow-hidden"
          >
            {/* Module Header */}
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100"
              onClick={() => toggleModule(module.module_id)}
            >
              <div className="flex items-center gap-3 flex-1">
                <div
                  className={`w-2 h-2 rounded-full ${moduleProgress === 100 ? "bg-green-500" : moduleProgress > 0 ? "bg-blue-500" : "bg-gray-300"}`}
                ></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <FaFolderOpen className="text-blue-600 text-sm" />
                    <h4 className="font-medium text-gray-900">
                      {module.module_title || module.title}
                    </h4>
                    {module.code && (
                      <span className="text-xs text-gray-400 font-mono">
                        ({module.code})
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all"
                          style={{ width: `${moduleProgress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">
                        {moduleProgress}%
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {module.completed_topics || 0}/
                      {module.total_topics || moduleChapters.length} topics
                    </span>
                  </div>
                </div>
              </div>
              <FaChevronRight
                className={`text-gray-400 text-sm transition-transform ${isExpanded ? "rotate-90" : ""}`}
              />
            </div>

            {/* Chapters List */}
            {isExpanded && moduleChapters.length > 0 && (
              <div className="bg-gray-50/30 p-3 space-y-2">
                {moduleChapters.map((chapter, chIdx) => (
                  <div
                    key={chapter.chapter_id || chIdx}
                    className="flex items-center gap-3 p-2 rounded hover:bg-white transition-colors cursor-pointer"
                    onClick={() =>
                      onModuleClick?.(module.module_id, chapter.chapter_id)
                    }
                  >
                    <div className="w-6 text-center">
                      {chapter.progress_percent === 100 ? (
                        <FaCheckCircle className="text-green-500 text-xs" />
                      ) : chapter.progress_percent > 0 ? (
                        <FaSpinner className="text-blue-500 text-xs" />
                      ) : (
                        <FaLock className="text-gray-300 text-xs" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <FaFileAlt className="text-gray-400 text-xs" />
                        <span className="text-sm text-gray-700">
                          {chapter.chapter_title || chapter.title}
                        </span>
                      </div>
                      {chapter.description && (
                        <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                          {chapter.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {chapter.estimated_time && (
                        <span className="text-xs text-gray-400">
                          {chapter.estimated_time} min
                        </span>
                      )}
                      <span className="text-xs font-medium text-gray-500 min-w-[35px] text-right">
                        {chapter.progress_percent || 0}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ClassicCard>
        );
      })}
    </div>
  );
};

// Current Focus Component
const CurrentFocus = ({ currentLearning, onContinue }) => {
  if (!currentLearning) {
    return (
      <ClassicCard className="p-6 text-center">
        <FaBookOpen className="text-4xl text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">No active learning in progress</p>
        <button className="mt-3 text-blue-600 text-sm font-medium hover:underline">
          Browse Courses →
        </button>
      </ClassicCard>
    );
  }

  return (
    <ClassicCard className="overflow-hidden">
      <div className="bg-blue-50 px-4 py-2 border-b border-blue-100">
        <h3 className="font-semibold text-gray-900 text-sm">CURRENT FOCUS</h3>
      </div>
      <div className="p-4">
        {/* Program/Level */}
        {currentLearning.program && (
          <div className="mb-3">
            <span className="text-xs font-medium text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
              {currentLearning.program.title}
            </span>
          </div>
        )}

        {/* Module & Chapter Hierarchy */}
        <div className="space-y-2 mb-4">
          {currentLearning.module && (
            <div className="flex items-start gap-2">
              <FaFolderOpen className="text-blue-500 text-sm mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Module</p>
                <p className="text-sm font-medium text-gray-900">
                  {currentLearning.module.title}
                </p>
              </div>
            </div>
          )}

          {currentLearning.chapter && (
            <div className="flex items-start gap-2 ml-4">
              <FaFileAlt className="text-gray-400 text-sm mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Chapter</p>
                <p className="text-sm text-gray-800">
                  {currentLearning.chapter.title}
                </p>
              </div>
            </div>
          )}

          {currentLearning.topic && (
            <div className="flex items-start gap-2 ml-8">
              <FaStar className="text-amber-500 text-sm mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Current Topic</p>
                <p className="text-sm font-medium text-gray-900">
                  {currentLearning.topic.title}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-600">Topic Progress</span>
            <span className="font-medium text-blue-700">
              {currentLearning.progress_percent || 0}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full">
            <div
              className="h-2 bg-blue-500 rounded-full transition-all"
              style={{ width: `${currentLearning.progress_percent || 0}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onContinue}
          className="w-full py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <FaPlayCircle size={12} /> Continue Learning
        </button>
      </div>
    </ClassicCard>
  );
};

// Main Component
export default function ProgressStats() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dashboardData, isLoading, isError, message } = useSelector(
    (state) => state.dashboard,
  );

  useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch]);

  if (isLoading) return <Loader />;
  if (isError) return <Error message={message} />;

  const data = dashboardData?.data;
  if (!data) return null;

  const { current_learning, levels, stats, modules, chapters } = data;

  // Calculate stats
  const completedLevels =
    levels?.filter((l) => l.status === "completed").length || 0;
  const inProgressLevels =
    levels?.filter((l) => l.status === "unlocked").length || 0;
  const overallProgress =
    Math.round((stats?.completed_topics / stats?.total_topics) * 100) || 0;

  const handleContinueLearning = () => {
    if (current_learning?.topic?.id) {
      navigate(`/learn/topic/${current_learning.topic.id}`);
    }
  };

  const handleModuleChapterClick = (moduleId, chapterId) => {
    navigate(`/learn/chapter/${chapterId}`);
  };

  const navigationHandlers = {
    auditLogs: () => navigate("/audit-logs"),
    userProgress: () => navigate("/user-progress"),
    certification: () => navigate("/certification"),
  };

  const reports = [
    {
      key: "auditLogs",
      icon: FaClipboardList,
      title: "Audit Logs",
      description: "Track system activities, user actions, and security events",
      color: "purple",
      onClick: navigationHandlers.auditLogs,
    },
    {
      key: "userProgress",
      icon: FaUserGraduate,
      title: "User Progress",
      description:
        "Monitor learner achievements, completion rates, and milestones",
      color: "blue",
      onClick: navigationHandlers.userProgress,
    },
    {
      key: "certification",
      icon: FaCertificate,
      title: "Certification Reports",
      description: "View certificates issued, pending, and expiration status",
      color: "emerald",
      onClick: navigationHandlers.certification,
    },
  ];

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>Progress Dashboard</PageTitle>
          <PageSubtitle>
            Track your learning progress across modules and chapters
          </PageSubtitle>
        </PageHeaderLeft>
      </PageHeader>

      <PageBody>
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
          <StatCard
            icon={FaTrophy}
            title="Levels Completed"
            value={completedLevels}
            subtitle={`${inProgressLevels} in progress`}
            color="blue"
          />
          <StatCard
            icon={FaCertificate}
            title="Certificates"
            value={stats?.certificates_earned || 0}
            subtitle={`Avg. score ${stats?.avg_topic_score || 0}%`}
            color="green"
          />
          <StatCard
            icon={FiBarChart2}
            title="Avg. Score"
            value={`${stats?.avg_topic_score || 0}%`}
            subtitle="Overall performance"
            color="purple"
          />
          <StatCard
            icon={FaBookOpen}
            title="Topics Completed"
            value={`${stats?.completed_topics || 0}/${stats?.total_topics || 0}`}
            subtitle={`${overallProgress}% complete`}
            color="orange"
          />
        </div>

        {/* Main Content - 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Current Focus (1/3) */}
          <div>
            <CurrentFocus
              currentLearning={current_learning}
              onContinue={handleContinueLearning}
            />

            {/* Quick Stats */}
            <ClassicCard className="mt-5 p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Quick Stats
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Topics</span>
                  <span className="font-medium text-gray-900">
                    {stats?.total_topics || 0}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Completed</span>
                  <span className="font-medium text-green-600">
                    {stats?.completed_topics || 0}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">In Progress</span>
                  <span className="font-medium text-blue-600">
                    {stats?.in_progress_topics || 0}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Pending Quizzes</span>
                  <span className="font-medium text-orange-600">
                    {current_learning?.pending_quizzes || 0}
                  </span>
                </div>
              </div>
            </ClassicCard>
          </div>

          {/* Right Column - Module Hierarchy (2/3) */}
          <div className="lg:col-span-2">
            <ClassicCard className="overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <FaFolderOpen className="text-blue-600" />
                  <h3 className="font-semibold text-gray-900">
                    Module & Chapter Hierarchy
                  </h3>
                  <span className="text-xs text-gray-400 ml-auto">
                    {modules?.length || 0} modules
                  </span>
                </div>
              </div>
              <div className="p-4">
                <ModuleHierarchy
                  modules={modules || stats?.modules_progress}
                  chapters={chapters || stats?.chapters_progress}
                  onModuleClick={handleModuleChapterClick}
                />
              </div>
            </ClassicCard>
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Reports & Analytics
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Click any card to view detailed insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reports.map((report) => (
              <ReportCard key={report.key} {...report} />
            ))}
          </div>
        </div>
      </PageBody>
    </PageLayout>
  );
}

const ReportCard = ({ icon: Icon, title, description, color, onClick }) => {
  const colorStyles = {
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      borderHover: "hover:border-purple-200",
    },
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      borderHover: "hover:border-blue-200",
    },
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      borderHover: "hover:border-emerald-200",
    },
  };

  const styles = colorStyles[color] || colorStyles.blue;

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-5 shadow-sm cursor-pointer transition-all hover:shadow-md ${styles.borderHover}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
    >
      <div
        className={`inline-flex p-2 rounded-md ${styles.bg} ${styles.text} mb-4`}
      >
        <Icon size={20} />
      </div>
      <h4 className="text-base font-semibold text-gray-800 mb-2">{title}</h4>
      <p className="text-sm text-gray-500 mb-4 leading-relaxed">
        {description}
      </p>
      <div className="flex items-center text-sm font-medium text-blue-600">
        <span>View report</span>
        <FaChevronRight size={12} className="ml-1" />
      </div>
    </div>
  );
};

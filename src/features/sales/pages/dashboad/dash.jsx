// // import React from "react";
// // import {
// //   PageBody,
// //   PageHeader,
// //   PageHeaderLeft,
// //   PageLayout,
// //   PageSubtitle,
// //   PageTitle,
// // } from "../../common/layout";
// // import { IoCheckmarkCircleOutline } from "react-icons/io5";
// // import { CiLock } from "react-icons/ci";
// // import { FaMedal, FaShieldAlt } from "react-icons/fa";
// // import { FiPlus } from "react-icons/fi";

// // // Assigned Card
// // const CourseCard = ({ title, days, progress, status, statusColor }) => (
// //   <div className="rounded-xl shadow-sm p-4 flex items-center justify-between bg-white">
// //     <div className="flex items-center gap-4">
// //       <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
// //         <FaShieldAlt className="text-blue-600 text-xl" />
// //       </div>

// //       <div>
// //         <h2 className="text-sm sm:text-base font-semibold text-gray-800">
// //           {title}
// //         </h2>
// //         <p className="text-xs sm:text-sm text-gray-500">Due in {days} days</p>

// //         <div className="w-full h-1 bg-gray-200 rounded-full mt-2">
// //           <div
// //             className="h-full rounded-full"
// //             style={{ width: `${progress}%`, background: statusColor }}
// //           />
// //         </div>
// //       </div>
// //     </div>

// //     <span
// //       className="text-xs font-semibold px-3 py-1 rounded-md"
// //       style={{
// //         color: statusColor,
// //         background: `${statusColor}20`,
// //       }}
// //     >
// //       {status}
// //     </span>
// //   </div>
// // );

// // // Activity Item
// // const ActivityItem = ({ icon, bg, color, title, time }) => (
// //   <div className="flex items-start gap-4">
// //     <div
// //       className={`w-12 h-12 rounded-full flex items-center justify-center ${bg}`}
// //     >
// //       {React.cloneElement(icon, { className: `${color} text-xl` })}
// //     </div>

// //     <div>
// //       <h3 className="text-gray-800 font-semibold text-sm sm:text-base">
// //         {title}
// //       </h3>
// //       <p className="text-xs sm:text-sm text-gray-500 mt-1">{time}</p>
// //     </div>
// //   </div>
// // );

// // // Level Card
// // const LevelCard = ({ icon, title, status, active }) => (
// //   <div
// //     className={`flex-1 bg-white shadow-sm rounded-lg p-3 text-center ${
// //       !active && "opacity-60"
// //     }`}
// //   >
// //     <div className="flex justify-center mb-1">
// //       <span className="p-2 rounded-full bg-gray-100 text-lg">{icon}</span>
// //     </div>

// //     <p className="text-xs font-bold">{title}</p>
// //     <p className="text-[10px] font-semibold">{status}</p>
// //   </div>
// // );

// // /* ---------------- Main Component ---------------- */

// // export default function Dashboard() {
// //   return (
// //     <PageLayout>
// //       <PageHeader>
// //         <PageHeaderLeft>
// //           <PageTitle>Welcome back, Dr. Sarah</PageTitle>
// //           <PageSubtitle>You have 3 courses to finish this week.</PageSubtitle>
// //         </PageHeaderLeft>
// //       </PageHeader>

// //       <PageBody>
// //         {/* Banner */}
// //         <div className="bg-green-100 text-green-700 text-center text-xs sm:text-sm py-2 rounded-md mb-4 font-semibold">
// //           Welcome! Successfully Signup To The Platform
// //         </div>

// //         {/* Top Section */}
// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
// //           {/* Main Card */}
// //           <div className="bg-[#1e63ff] text-white rounded-xl p-5 lg:col-span-1">
// //             <p className="text-yellow-300 text-xs font-semibold mb-1">
// //               LEVEL 1: PACEMAKER TRAINING CURRICULUM
// //             </p>

// //             <h2 className="text-lg font-semibold">
// //               Level 1: Device Introduction & Core Concepts
// //             </h2>

// //             <p className="text-sm opacity-80 mt-1">
// //               Last Topic: History & Evolution
// //             </p>

// //             <div className="mt-3">
// //               <div className="w-full h-2 bg-blue-300 rounded-full">
// //                 <div className="h-2 bg-white rounded-full w-[65%]" />
// //               </div>
// //               <p className="text-right text-xs mt-1">65%</p>
// //             </div>

// //             <button className="mt-4 px-6 bg-white text-blue-600 text-sm py-2 rounded-full font-medium">
// //               Resume Lesson ▶
// //             </button>
// //           </div>

// //           {/* Learning Path */}
// //           <div className="border border-gray-300 rounded-lg p-3">
// //             <div className="flex justify-between mb-4">
// //               <h3 className="font-semibold">Learning Path</h3>
// //               <span className="text-blue-600 text-xs cursor-pointer">
// //                 View All
// //               </span>
// //             </div>

// //             <div className="flex gap-3">
// //               <LevelCard
// //                 icon={<IoCheckmarkCircleOutline className="text-green-500" />}
// //                 title="Level 1"
// //                 status="COMPLETED"
// //                 active
// //               />
// //               <LevelCard icon={<CiLock />} title="Level 2" status="LOCKED" />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Bottom Section */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //           {/* Assigned */}
// //           <div className="border border-gray-300 rounded-lg p-3">
// //             <div className="flex justify-between mb-4">
// //               <h3 className="font-semibold">Assigned User</h3>
// //               <span className="text-blue-600 text-xs cursor-pointer">
// //                 View All
// //               </span>
// //             </div>

// //             <div className="space-y-3">
// //               <CourseCard
// //                 title="What Is a Pacemaker?"
// //                 days={4}
// //                 progress={30}
// //                 status="PENDING"
// //                 statusColor="#f97316"
// //               />
// //               <CourseCard
// //                 title="Key Terminology?"
// //                 days={6}
// //                 progress={60}
// //                 status="STARTED"
// //                 statusColor="#16a34a"
// //               />
// //             </div>
// //           </div>

// //           {/* Analytics */}
// //           <div className="border border-gray-300 rounded-lg p-3">
// //             <h3 className="font-semibold mb-4">Analytics</h3>

// //             <div className="flex gap-3">
// //               <div className="flex-1 bg-white rounded-lg p-3 text-center shadow-sm">
// //                 <div className="w-14 h-14 rounded-full border-4 border-blue-500 flex items-center justify-center">
// //                   75%
// //                 </div>
// //                 <p className="text-xs mt-1">AVG SCORE</p>
// //               </div>

// //               <div className="flex-1 bg-white rounded-lg p-3 flex items-end gap-1 h-20 shadow-sm">
// //                 {[20, 40, 60, 35].map((h, i) => (
// //                   <div
// //                     key={i}
// //                     className="w-2 bg-blue-500"
// //                     style={{ height: `${h}%` }}
// //                   />
// //                 ))}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Activity */}
// //           <div className="border border-gray-300 rounded-lg p-3">
// //             <h3 className="font-semibold mb-4">Latest Updates</h3>

// //             <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
// //               <ActivityItem
// //                 icon={<FiPlus />}
// //                 bg="bg-blue-100"
// //                 color="text-blue-600"
// //                 title="New Course: Introduction to CRISPR-Cas9 Genomics"
// //                 time="2 hours ago"
// //               />

// //               <div className="border-t border-gray-300" />

// //               <ActivityItem
// //                 icon={<FaMedal />}
// //                 bg="bg-green-100"
// //                 color="text-green-600"
// //                 title="Certificate earned: Patient Privacy Regulations"
// //                 time="Yesterday"
// //               />
// //             </div>
// //           </div>
// //         </div>
// //       </PageBody>
// //     </PageLayout>
// //   );
// // }

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
// import {
//   FiTrendingUp,
//   FiBookOpen,
//   FiAward,
//   FiClock,
//   FiChevronRight,
//   FiLock,
//   FiUnlock,
//   FiCheckCircle,
//   FiAlertCircle,
//   FiBarChart2,
//   FiCalendar,
//   FiFileText,
//   FiPlayCircle,
//   FiZap,
//   FiTarget,
//   FiDownload,
//   FiUser,
//   FiActivity,
//   FiThumbsUp,
//   FiStar,
//   FiPieChart,
//   FiMonitor,
// } from "react-icons/fi";
// import { HiOutlineSparkles } from "react-icons/hi";

// // Animated Circular Progress Component
// const CircularProgress = ({
//   percentage,
//   size = 120,
//   strokeWidth = 8,
//   color = "#1e63ff",
// }) => {
//   const radius = (size - strokeWidth) / 2;
//   const circumference = radius * 2 * Math.PI;
//   const offset = circumference - (percentage / 100) * circumference;
//   const [isAnimating, setIsAnimating] = useState(false);

//   useEffect(() => {
//     setIsAnimating(true);
//   }, []);

//   return (
//     <div className="relative" style={{ width: size, height: size }}>
//       <svg width={size} height={size} className="transform -rotate-90">
//         <circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           fill="none"
//           stroke="#e2e8f0"
//           strokeWidth={strokeWidth}
//         />
//         <circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           fill="none"
//           stroke={color}
//           strokeWidth={strokeWidth}
//           strokeLinecap="round"
//           strokeDasharray={circumference}
//           strokeDashoffset={isAnimating ? offset : circumference}
//           className="transition-all duration-1000 ease-out"
//         />
//       </svg>
//       <div className="absolute inset-0 flex flex-col items-center justify-center">
//         <span className="text-2xl font-bold text-gray-800">{percentage}%</span>
//         <span className="text-xs text-gray-500">Completed</span>
//       </div>
//     </div>
//   );
// };

// // Progress Bar Component
// const ProgressBar = ({ percentage, color = "#1e63ff" }) => {
//   const [width, setWidth] = useState(0);

//   useEffect(() => {
//     setTimeout(() => setWidth(percentage), 100);
//   }, [percentage]);

//   return (
//     <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
//       <div
//         className="h-full rounded-full transition-all duration-700 ease-out"
//         style={{ width: `${width}%`, backgroundColor: color }}
//       />
//     </div>
//   );
// };

// // Stats Card Component
// const StatsCard = ({ title, value, subtitle, icon: Icon, color, delay }) => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsVisible(true), delay);
//     return () => clearTimeout(timer);
//   }, [delay]);

//   return (
//     <div
//       className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-500 transform ${
//         isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
//       } hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group`}
//     >
//       <div className="flex items-center justify-between">
//         <div className="flex-1">
//           <p className="text-sm text-gray-500 font-medium">{title}</p>
//           <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
//           {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
//         </div>
//         <div
//           className={`p-3 rounded-xl bg-${color}-50 group-hover:bg-${color}-100 transition-all`}
//         >
//           <Icon size={24} className={`text-${color}-600`} />
//         </div>
//       </div>
//     </div>
//   );
// };

// // Level Card Component
// const LevelCard = ({ level, index, delay }) => {
//   const [isVisible, setIsVisible] = useState(false);

//   const statusConfig = {
//     completed: {
//       icon: FiCheckCircle,
//       color: "green",
//       bg: "bg-green-50",
//       border: "border-green-200",
//       textColor: "text-green-700",
//       btnColor: "#16a34a",
//     },
//     unlocked: {
//       icon: FiUnlock,
//       color: "blue",
//       bg: "bg-blue-50",
//       border: "border-blue-200",
//       textColor: "text-blue-700",
//       btnColor: "#1e63ff",
//     },
//     locked: {
//       icon: FiLock,
//       color: "gray",
//       bg: "bg-gray-50",
//       border: "border-gray-200",
//       textColor: "text-gray-500",
//       btnColor: "#9ca3af",
//     },
//   };

//   const config = statusConfig[level.status] || statusConfig.locked;
//   const Icon = config.icon;

//   useEffect(() => {
//     const timer = setTimeout(() => setIsVisible(true), delay);
//     return () => clearTimeout(timer);
//   }, [delay]);

//   const getButtonText = () => {
//     if (level.cta === "view_certificate") return "View Certificate";
//     if (level.cta === "continue") return "Continue";
//     return "Start";
//   };

//   return (
//     <div
//       className={`bg-white rounded-xl shadow-sm border ${config.border} p-4 transition-all duration-500 transform ${
//         isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
//       } hover:shadow-lg transition-all group`}
//     >
//       <div className="flex flex-col h-full">
//         <div className="flex items-center justify-between mb-3">
//           <div className="flex items-center gap-2">
//             <Icon size={16} className={`text-${config.color}-600`} />
//             <span
//               className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-${config.color}-100 ${config.textColor}`}
//             >
//               {level.status.toUpperCase()}
//             </span>
//           </div>
//           <span className="text-xs font-bold text-gray-400">
//             Level {level.id}
//           </span>
//         </div>

//         <h3 className="text-base font-bold text-gray-800 mb-1">
//           {level.title}
//         </h3>

//         {level.description && (
//           <p className="text-gray-500 text-xs mb-2 line-clamp-1">
//             {level.description}
//           </p>
//         )}

//         <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
//           <span className="flex items-center gap-1">
//             <FiBookOpen size={10} /> {level.total_lessons} lessons
//           </span>
//           <span className="flex items-center gap-1">
//             <FiFileText size={10} /> {level.total_topics} topics
//           </span>
//         </div>

//         {level.completion_percent > 0 && (
//           <div className="mt-2">
//             <ProgressBar
//               percentage={level.completion_percent}
//               color={config.btnColor}
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               {level.completion_percent}% complete
//             </p>
//           </div>
//         )}

//         <button
//           className={`mt-3 w-full px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
//             level.status === "locked"
//               ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//               : "text-white shadow-sm hover:shadow"
//           }`}
//           style={{
//             backgroundColor:
//               level.status !== "locked" ? config.btnColor : undefined,
//             opacity: level.status === "locked" ? 0.5 : 1,
//           }}
//           disabled={level.status === "locked"}
//         >
//           {getButtonText()}
//           {level.status !== "locked" && (
//             <FiChevronRight size={12} className="inline ml-1" />
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// // Main Dashboard Component
// export default function Dashboard() {
//   const dispatch = useDispatch();
//   const { dashboardData, isLoading, isError, message } = useSelector(
//     (state) => state.dashboard,
//   );
//   const [animateHeader, setAnimateHeader] = useState(false);

//   useEffect(() => {
//     dispatch(getDashboardData());
//     setAnimateHeader(true);
//   }, [dispatch]);

//   if (isLoading) return <Loader />;
//   if (isError) return <Error message={message} />;

//   const data = dashboardData?.data;
//   if (!data) return null;

//   const { current_learning, levels, stats, last_certificate, next_action } =
//     data;

//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return "Good morning";
//     if (hour < 18) return "Good afternoon";
//     return "Good evening";
//   };

//   const getUserName = () => {
//     return last_certificate?.meta?.user?.name || "Learner";
//   };

//   const getInitials = () => {
//     const name = getUserName();
//     return name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase();
//   };

//   return (
//     <PageLayout>
//       {/* Header Section */}
//       <PageHeader className="border-b border-gray-200 bg-white">
//         <PageHeaderLeft>
//           <div
//             className={`transition-all duration-700 transform ${animateHeader ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}
//           >
//             <PageTitle className="text-gray-800 flex items-center gap-2">
//               <span className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
//                 {getInitials()}
//               </span>
//               {getGreeting()}, {getUserName()}!
//             </PageTitle>
//             <PageSubtitle className="text-gray-500">
//               Track your learning progress and achievements
//             </PageSubtitle>
//           </div>
//         </PageHeaderLeft>
//         <div
//           className={`flex items-center gap-4 transition-all duration-700 delay-200 transform ${animateHeader ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}
//         >
//           <div className="bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
//             <div className="flex items-center gap-2">
//               <FiCalendar size={16} className="text-gray-500" />
//               <span className="text-sm text-gray-600">
//                 {new Date().toLocaleDateString("en-US", {
//                   month: "long",
//                   day: "numeric",
//                   year: "numeric",
//                 })}
//               </span>
//             </div>
//           </div>
//         </div>
//       </PageHeader>

//       <PageBody className="bg-gray-50">
//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           <StatsCard
//             title="Total Levels"
//             value={stats.total_levels}
//             subtitle={`${stats.completed_levels} completed, ${stats.remaining_levels} remaining`}
//             icon={FiTarget}
//             color="purple"
//             delay={100}
//           />
//           <StatsCard
//             title="Topics Progress"
//             value={`${stats.completed_topics}/${stats.total_topics}`}
//             subtitle={`${Math.round((stats.completed_topics / stats.total_topics) * 100)}% complete`}
//             icon={FiBookOpen}
//             color="blue"
//             delay={200}
//           />
//           <StatsCard
//             title="Avg. Topic Score"
//             value={`${stats.avg_topic_score}%`}
//             subtitle="Above average"
//             icon={FiBarChart2}
//             color="green"
//             delay={300}
//           />
//           <StatsCard
//             title="Certificates Earned"
//             value={stats.certificates_earned}
//             subtitle="Total achievements"
//             icon={FiAward}
//             color="amber"
//             delay={400}
//           />
//         </div>

//         {/* Current Learning Section */}
//         <div className="mb-6">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//             <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
//               <div className="flex items-center gap-2">
//                 <FiZap size={18} className="text-blue-600" />
//                 <h2 className="font-semibold text-gray-800">
//                   Current Learning
//                 </h2>
//               </div>
//             </div>
//             <div className="p-5">
//               <div className="flex flex-col lg:flex-row items-center gap-6">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2 text-xs text-blue-600 font-medium mb-2">
//                     <HiOutlineSparkles size={12} />
//                     <span>{current_learning.program.title}</span>
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-800">
//                     {current_learning.level.title}
//                   </h3>
//                   <div className="mt-3 space-y-1.5">
//                     <p className="text-sm text-gray-600 flex items-center gap-2">
//                       <FiBookOpen size={12} className="text-gray-400" />
//                       Module:{" "}
//                       <span className="font-medium">
//                         {current_learning.module.title}
//                       </span>
//                     </p>
//                     <p className="text-sm text-gray-600 flex items-center gap-2">
//                       <FiFileText size={12} className="text-gray-400" />
//                       Chapter:{" "}
//                       <span className="font-medium">
//                         {current_learning.chapter.title}
//                       </span>
//                     </p>
//                     <p className="text-sm text-gray-600 flex items-center gap-2">
//                       <FiTarget size={12} className="text-gray-400" />
//                       Current Topic:{" "}
//                       <span className="font-medium text-blue-600">
//                         {current_learning.topic.title}
//                       </span>
//                     </p>
//                   </div>
//                   <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
//                     <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded">
//                       <FiCheckCircle size={12} />
//                       <span>
//                         {current_learning.completed_lessons}/
//                         {current_learning.total_lessons} Lessons
//                       </span>
//                     </div>
//                     {current_learning.pending_quizzes > 0 && (
//                       <div className="flex items-center gap-1 text-orange-600 bg-orange-50 px-2 py-1 rounded">
//                         <FiAlertCircle size={12} />
//                         <span>
//                           {current_learning.pending_quizzes} Pending Quizzes
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                   <button className="mt-5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow flex items-center gap-2">
//                     <FiPlayCircle size={14} />
//                     Resume Learning
//                   </button>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <CircularProgress
//                     percentage={current_learning.progress_percent}
//                     size={130}
//                     strokeWidth={8}
//                     color="#1e63ff"
//                   />
//                   <p className="text-xs text-gray-500 mt-2">Course Progress</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Learning Path Section */}
//         <div className="mb-6">
//           <div className="flex items-center justify-between mb-3">
//             <div className="flex items-center gap-2">
//               <FiTrendingUp size={20} className="text-gray-700" />
//               <h2 className="text-lg font-bold text-gray-800">Learning Path</h2>
//             </div>
//             <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded shadow-sm">
//               {levels.filter((l) => l.status === "completed").length} of{" "}
//               {levels.length} levels completed
//             </span>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {levels.map((level, idx) => (
//               <LevelCard
//                 key={level.id}
//                 level={level}
//                 index={idx}
//                 delay={500 + idx * 100}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
//           {/* Last Certificate Card */}
//           {last_certificate && (
//             <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-4">
//               <div className="flex items-start gap-3">
//                 <div className="p-2 bg-amber-100 rounded-lg">
//                   <FiAward size={24} className="text-amber-700" />
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="font-bold text-gray-800 flex items-center gap-2 text-sm">
//                     Latest Certificate
//                     <FiStar size={12} className="text-amber-500" />
//                   </h3>
//                   <p className="text-xs font-mono text-gray-600 mt-0.5">
//                     {last_certificate.certificate_id}
//                   </p>
//                   <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
//                     <span className="text-amber-700 font-medium bg-amber-100 px-2 py-0.5 rounded">
//                       {last_certificate.percentage}% Score
//                     </span>
//                     <span className="text-gray-400">•</span>
//                     <span className="text-gray-500 flex items-center gap-1">
//                       <FiCalendar size={10} />
//                       {new Date(
//                         last_certificate.issued_at,
//                       ).toLocaleDateString()}
//                     </span>
//                   </div>
//                   <div className="mt-2 flex items-center gap-2">
//                     <span className="text-xs text-gray-500">
//                       {last_certificate.meta?.result?.status === "passed"
//                         ? "Passed"
//                         : "Failed"}
//                     </span>
//                     <button className="text-xs text-amber-700 font-medium hover:text-amber-800 flex items-center gap-1">
//                       <FiDownload size={12} />
//                       Download
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Next Action Card */}
//           {next_action && (
//             <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-4">
//               <div className="flex items-start gap-3">
//                 <div className="p-2 bg-blue-100 rounded-lg">
//                   <FiClock size={24} className="text-blue-700" />
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="font-bold text-gray-800 flex items-center gap-2 text-sm">
//                     Next Action
//                     <FiActivity size={12} className="text-blue-500" />
//                   </h3>
//                   <p className="text-sm font-semibold text-blue-700 mt-0.5">
//                     {next_action.topic.title}
//                   </p>
//                   <p className="text-xs text-gray-500 mt-0.5">
//                     {next_action.level.title} • {next_action.module.title}
//                   </p>
//                   <button className="mt-2 text-xs text-blue-700 font-medium hover:text-blue-800 flex items-center gap-1">
//                     Continue Learning <FiChevronRight size={11} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Achievement Banner */}
//         <div className="mt-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 p-3">
//           <div className="flex items-center gap-2">
//             <div className="p-1.5 bg-green-100 rounded-full">
//               <FiThumbsUp size={14} className="text-green-700" />
//             </div>
//             <div className="flex-1">
//               <p className="text-xs font-medium text-green-800">
//                 Progress Update
//               </p>
//               <p className="text-xs text-green-600">
//                 Completed {stats.completed_topics} out of {stats.total_topics}{" "}
//                 topics.
//                 {stats.completed_levels === stats.total_levels
//                   ? " All levels completed!"
//                   : " Keep progressing!"}
//               </p>
//             </div>
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
} from "react-icons/fa";
import {
  FiPlus,
  FiClock,
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
import { HiOutlineSparkles } from "react-icons/hi";

// Course Card Component (matching reference design)
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
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Due in {days} days
        </p>

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
      style={{
        color: statusColor,
        background: `${statusColor}20`,
      }}
    >
      {status}
    </span>
  </div>
);

// Activity Item Component (matching reference design)
const ActivityItem = ({ icon, bg, color, title, time }) => (
  <div className="flex items-start gap-4">
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center ${bg}`}
    >
      {React.cloneElement(icon, { className: `${color} text-xl` })}
    </div>
    <div>
      <h3 className="text-gray-800 font-semibold text-sm sm:text-base">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-gray-500 mt-1">{time}</p>
    </div>
  </div>
);

// Level Card Component (matching reference design)
const LevelCard = ({ icon, title, status, active, progress }) => (
  <div
    className={`flex-1 bg-white shadow-sm rounded-lg p-3 text-center transition-all cursor-pointer hover:shadow-md ${
      !active ? "opacity-60" : ""
    }`}
  >
    <div className="flex justify-center mb-1">
      <span className="p-2 rounded-full bg-gray-100 text-lg">{icon}</span>
    </div>
    <p className="text-xs font-bold">{title}</p>
    <p className="text-[10px] font-semibold">{status}</p>
    {progress !== undefined && progress > 0 && (
      <div className="w-full h-1 bg-gray-200 rounded-full mt-2">
        <div
          className="h-full bg-green-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    )}
  </div>
);

// Stats Card for Analytics (matching reference design)
const StatsCard = ({ value, label, color }) => (
  <div className="flex-1 bg-white rounded-lg p-3 text-center shadow-sm">
    <div
      className={`w-14 h-14 rounded-full border-4 ${color} flex items-center justify-center mx-auto font-bold text-lg`}
    >
      {value}
    </div>
    <p className="text-xs mt-1 text-gray-600">{label}</p>
  </div>
);

// Mini Chart Component (matching reference design)
const MiniChart = ({ data, color }) => (
  <div className="flex-1 bg-white rounded-lg p-3 flex items-end gap-1 h-20 shadow-sm">
    {data.map((h, i) => (
      <div
        key={i}
        className={`w-2 ${color} rounded-t transition-all duration-500`}
        style={{ height: `${h}%` }}
      />
    ))}
  </div>
);

/* ---------------- Main Component ---------------- */

export default function Dashboard() {
  const dispatch = useDispatch();
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

  const { current_learning, levels, stats, last_certificate, next_action } =
    data;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const getUserName = () => {
    return last_certificate?.meta?.user?.name || "Dr. Sarah";
  };

  // Get current level info
  const currentLevel = levels.find((l) => l.id === current_learning.level.id);
  const currentLevelIndex = levels.findIndex(
    (l) => l.id === current_learning.level.id,
  );
  const nextLevel = levels[currentLevelIndex + 1];

  // Prepare chart data for weekly activity
  const chartData = [25, 45, 60, 40, 70, 55, 80];

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>
            {getGreeting()}, {getUserName()}
          </PageTitle>
          <PageSubtitle>
            You have {stats.remaining_levels} levels to complete this month.
          </PageSubtitle>
        </PageHeaderLeft>
      </PageHeader>

      <PageBody>
        {/* Banner - Success Message */}
        <div
          className={`bg-green-100 text-green-700 text-center text-xs sm:text-sm py-2 rounded-md mb-4 font-semibold transition-all duration-500 transform ${animateItems ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}
        >
          Great progress! You have completed {stats.completed_topics} out of{" "}
          {stats.total_topics} topics.
        </div>

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Main Card - Current Learning (matching reference design colors) */}
          <div
            className={`bg-[#1e63ff] text-white rounded-xl p-5 lg:col-span-1 transition-all duration-500 delay-100 transform ${animateItems ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            <p className="text-yellow-300 text-xs font-semibold mb-1">
              {current_learning.program.title} • {current_learning.level.title}
            </p>

            <h2 className="text-lg font-semibold">
              {current_learning.module.title}
            </h2>

            <p className="text-sm opacity-80 mt-1">
              Current Topic: {current_learning.topic.title}
            </p>

            <div className="mt-3">
              <div className="w-full h-2 bg-blue-300 rounded-full">
                <div
                  className="h-2 bg-white rounded-full transition-all duration-700"
                  style={{ width: `${current_learning.progress_percent}%` }}
                />
              </div>
              <p className="text-right text-xs mt-1">
                {current_learning.progress_percent}% Complete
              </p>
            </div>

            <div className="mt-3 flex gap-2 text-xs">
              <span className="bg-white/20 px-2 py-1 rounded">
                <FiCheckCircle className="inline mr-1" size={10} />{" "}
                {current_learning.completed_lessons}/
                {current_learning.total_lessons} Lessons
              </span>
              {current_learning.pending_quizzes > 0 && (
                <span className="bg-orange-500/30 px-2 py-1 rounded">
                  Pending Quizzes: {current_learning.pending_quizzes}
                </span>
              )}
            </div>

            <button className="mt-4 px-6 bg-white text-blue-600 text-sm py-2 rounded-full font-medium hover:shadow-lg transition-all flex items-center gap-2">
              <FiPlayCircle size={14} /> Resume Lesson
            </button>
          </div>

          {/* Learning Path (matching reference design) */}
          <div
            className={`border border-gray-300 rounded-lg p-3 transition-all duration-500 delay-200 transform ${animateItems ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">Learning Path</h3>
              <span className="text-blue-600 text-xs cursor-pointer hover:underline">
                View All
              </span>
            </div>

            <div className="flex gap-3">
              {levels.map((level) => {
                const isActive = level.status !== "locked";
                let statusText = "";
                let icon = null;

                if (level.status === "completed") {
                  statusText = "COMPLETED";
                  icon = (
                    <IoCheckmarkCircleOutline className="text-green-500 text-lg" />
                  );
                } else if (level.status === "unlocked") {
                  statusText = "IN PROGRESS";
                  icon = <FiTrendingUp className="text-blue-500 text-lg" />;
                } else {
                  statusText = "LOCKED";
                  icon = <CiLock className="text-gray-400 text-lg" />;
                }

                return (
                  <LevelCard
                    key={level.id}
                    icon={icon}
                    title={level.title}
                    status={statusText}
                    active={isActive}
                    progress={level.completion_percent}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Current Topics Section (matching Assigned User style) */}
          <div
            className={`border border-gray-300 rounded-lg p-3 transition-all duration-500 delay-300 transform ${animateItems ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">Current Topics</h3>
              <span className="text-blue-600 text-xs cursor-pointer hover:underline">
                View All
              </span>
            </div>

            <div className="space-y-3">
              <CourseCard
                title={current_learning.topic.title}
                subtitle={`${current_learning.chapter.title} • ${current_learning.module.title}`}
                days={5}
                progress={current_learning.progress_percent}
                status="IN PROGRESS"
                statusColor="#1e63ff"
                onClick={() => console.log("Resume topic")}
              />
              {current_learning.last_completed_topic && (
                <CourseCard
                  title={current_learning.last_completed_topic.title}
                  subtitle="Completed"
                  days={0}
                  progress={100}
                  status="COMPLETED"
                  statusColor="#16a34a"
                  onClick={() => console.log("View completed")}
                />
              )}
              {current_learning.pending_quizzes === 0 && (
                <CourseCard
                  title="Quiz Assessment"
                  subtitle="Ready to take"
                  days={7}
                  progress={0}
                  status="PENDING"
                  statusColor="#f97316"
                  onClick={() => console.log("Start quiz")}
                />
              )}
            </div>
          </div>

          {/* Analytics Section (matching reference design) */}
          <div
            className={`border border-gray-300 rounded-lg p-3 transition-all duration-500 delay-400 transform ${animateItems ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            <h3 className="font-semibold mb-4">Analytics</h3>

            <div className="flex gap-3">
              <StatsCard
                value={`${stats.avg_topic_score}%`}
                label="AVG SCORE"
                color="border-blue-500 text-blue-600"
              />
              <StatsCard
                value={stats.certificates_earned}
                label="CERTIFICATES"
                color="border-amber-500 text-amber-600"
              />
            </div>

            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Topics Progress</span>
                <span>
                  {stats.completed_topics}/{stats.total_topics} Completed
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-green-500 rounded-full transition-all duration-700"
                  style={{
                    width: `${(stats.completed_topics / stats.total_topics) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="mt-3">
              <MiniChart data={chartData} color="bg-blue-500" />
              <p className="text-xs text-center text-gray-400 mt-1">
                Weekly Learning Activity
              </p>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Avg. Exam Score</span>
                <span className="font-semibold text-gray-700">
                  {stats.avg_exam_score}%
                </span>
              </div>
            </div>
          </div>

          {/* Latest Updates / Activity Section (matching reference design) */}
          <div
            className={`border border-gray-300 rounded-lg p-3 sm:col-span-2 transition-all duration-500 delay-500 transform ${animateItems ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            <h3 className="font-semibold mb-4">Latest Updates</h3>

            <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
              {/* Next Action Activity */}
              {/* {next_action && (
                <>
                  <ActivityItem
                    icon={<FiClock />}
                    bg="bg-blue-100"
                    color="text-blue-600"
                    title={`Next: ${next_action.topic.title}`}
                    time={`${next_action.level.title} • ${next_action.module.title} • ${next_action.chapter.title}`}
                  />
                  <div className="border-t border-gray-300" />
                </>
              )} */}

              {/* Level Unlock Activity */}
              {nextLevel && nextLevel.status === "unlocked" && (
                <>
                  <ActivityItem
                    icon={<HiOutlineSparkles />}
                    bg="bg-purple-100"
                    color="text-purple-600"
                    title={`${nextLevel.title} has been unlocked`}
                    time="Continue your learning journey"
                  />
                  <div className="border-t border-gray-300" />
                </>
              )}

              {/* Certificate Activity */}
              {last_certificate && (
                <ActivityItem
                  icon={<FaMedal />}
                  bg="bg-green-100"
                  color="text-green-600"
                  title={`Certificate earned: ${last_certificate.meta?.context?.title || "Level Completion"}`}
                  time={`Score: ${last_certificate.percentage}% • ${new Date(last_certificate.issued_at).toLocaleDateString()}`}
                />
              )}

              {/* Stats Update Activity */}
              <div className="border-t border-gray-300" />
              <ActivityItem
                icon={<FaUserGraduate />}
                bg="bg-orange-100"
                color="text-orange-600"
                title={`${stats.completed_levels}/${stats.total_levels} levels completed`}
                time={`${stats.remaining_levels} more to go`}
              />
            </div>
          </div>
        </div>

        {/* Achievement Banner (matching reference design banner style) */}
        <div
          className={`mt-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-3 border border-amber-200 transition-all duration-500 delay-600 transform ${animateItems ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <div className="flex items-center gap-3">
            <FiAward className="text-amber-600 text-lg" />
            <div className="flex-1">
              <p className="text-xs font-semibold text-amber-800">
                Achievement Unlocked
              </p>
              <p className="text-xs text-amber-600">
                You have earned {stats.certificates_earned} certificates with an
                average score of {stats.avg_topic_score}%.
              </p>
            </div>
            <FiChevronRight className="text-amber-600" />
          </div>
        </div>
      </PageBody>
    </PageLayout>
  );
}

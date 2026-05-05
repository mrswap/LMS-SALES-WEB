// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getAllNotifications,
//   markNotificationAsRead,
//   markAllAsRead,
//   getUnreadCount,
// } from "../../../../redux/slice/notificationSlicer";
// import {
//   IoNotificationsOutline,
//   IoCheckmarkCircle,
//   IoTimeOutline,
//   IoArrowForward,
//   IoMailOpenOutline,
//   IoMailOutline,
//   IoHappyOutline,
// } from "react-icons/io5";
// import { MdDoneAll, MdNotificationsActive } from "react-icons/md";
// import { FaChalkboardTeacher, FaTrophy, FaGraduationCap } from "react-icons/fa";
// import { GiDiploma } from "react-icons/gi";
// import { HiOutlineBell, HiOutlineBellAlert } from "react-icons/hi2";
// import { RiEmotionHappyLine } from "react-icons/ri";
// import Loader from "../Loader";
// import Error from "../Error";
// import {
//   PageBody,
//   PageHeader,
//   PageHeaderLeft,
//   PageHeaderRight,
//   PageLayout,
//   PageSubtitle,
//   PageTitle,
// } from "../layout";
// import Breadcrumb from "../layout/Breadcrumb";

// const Notification = () => {
//   const dispatch = useDispatch();
//   const { notifications, unreadCount, isLoading, isError, message } =
//     useSelector((state) => state.notification);

//   const [activeTab, setActiveTab] = useState("all");
//   const [hoveredId, setHoveredId] = useState(null);

//   useEffect(() => {
//     dispatch(getAllNotifications());
//     dispatch(getUnreadCount());
//   }, [dispatch]);

//   const filteredNotifications =
//     activeTab === "all"
//       ? notifications
//       : notifications?.filter((notif) => !notif.is_read);

//   const handleMarkAsRead = (notificationId) => {
//     dispatch(markNotificationAsRead(notificationId));
//   };

//   const handleMarkAllAsRead = () => {
//     if (unreadCount > 0) {
//       dispatch(markAllAsRead());
//     }
//   };

//   const getRelativeTime = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffSeconds = Math.floor((now - date) / 1000);
//     const diffMinutes = Math.floor(diffSeconds / 60);
//     const diffHours = Math.floor(diffMinutes / 60);
//     const diffDays = Math.floor(diffHours / 24);
//     const diffWeeks = Math.floor(diffDays / 7);
//     const diffMonths = Math.floor(diffDays / 30);
//     const diffYears = Math.floor(diffDays / 365);

//     if (diffSeconds < 60) return "Just now";
//     if (diffMinutes < 60) return `${diffMinutes} min ago`;
//     if (diffHours < 24)
//       return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
//     if (diffDays === 1) return "Yesterday";
//     if (diffDays < 7) return `${diffDays} days ago`;
//     if (diffWeeks < 4)
//       return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
//     if (diffMonths < 12)
//       return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
//     return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
//   };

//   const getIcon = (type) => {
//     const icons = {
//       TRAINING_ASSIGNED: <FaChalkboardTeacher size={18} />,
//       ASSESSMENT_COMPLETED: <IoCheckmarkCircle size={18} />,
//       CERTIFICATE_ISSUED: <GiDiploma size={18} />,
//       COURSE_COMPLETED: <FaGraduationCap size={18} />,
//       ACHIEVEMENT_UNLOCKED: <FaTrophy size={18} />,
//     };
//     return icons[type] || <HiOutlineBell size={18} />;
//   };

//   const getIconBackground = (type, isRead) => {
//     const baseClass = "rounded-full p-2 transition-all duration-200";
//     if (isRead) return `${baseClass} bg-gray-100 text-gray-500`;

//     const bgColors = {
//       TRAINING_ASSIGNED: "bg-blue-100 text-blue-600",
//       ASSESSMENT_COMPLETED: "bg-green-100 text-green-600",
//       CERTIFICATE_ISSUED: "bg-purple-100 text-purple-600",
//       COURSE_COMPLETED: "bg-emerald-100 text-emerald-600",
//       ACHIEVEMENT_UNLOCKED: "bg-amber-100 text-amber-600",
//     };
//     return `${baseClass} ${bgColors[type] || "bg-indigo-100 text-indigo-600"}`;
//   };

//   if (isLoading) return <Loader />;
//   if (isError) return <Error message={message} />;

//   return (
//     <PageLayout>
//       <Breadcrumb
//         items={[{ label: "Home", path: "/" }, { label: "Notifications" }]}
//       />

//       <PageHeader>
//         <PageHeaderLeft>
//           <PageTitle className="flex items-center gap-3">
//             Notifications
//           </PageTitle>
//           <PageSubtitle>
//             Stay updated with your learning journey and achievements
//           </PageSubtitle>
//         </PageHeaderLeft>
//         <PageHeaderRight />
//       </PageHeader>

//       <PageBody>
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Total Notifications
//                 </p>
//                 <p className="text-3xl font-bold text-gray-800 mt-1">
//                   {notifications?.length || 0}
//                 </p>
//               </div>
//               <div className="bg-indigo-50 rounded-full p-3">
//                 <IoNotificationsOutline className="text-indigo-500 text-xl" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Unread
//                 </p>
//                 <p className="text-3xl font-bold text-blue-600 mt-1">
//                   {unreadCount}
//                 </p>
//               </div>
//               <div className="bg-blue-50 rounded-full p-3">
//                 <MdNotificationsActive className="text-blue-500 text-xl" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Read
//                 </p>
//                 <p className="text-3xl font-bold text-green-600 mt-1">
//                   {(notifications?.length || 0) - (unreadCount || 0)}
//                 </p>
//               </div>
//               <div className="bg-green-50 rounded-full p-3">
//                 <IoMailOpenOutline className="text-green-500 text-xl" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//           <div className="border-b border-gray-200">
//             <div className="flex gap-1 p-1">
//               <button
//                 onClick={() => setActiveTab("all")}
//                 className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${
//                   activeTab === "all"
//                     ? "bg-indigo-50 text-indigo-700 shadow-sm"
//                     : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
//                 }`}
//               >
//                 <div className="flex items-center justify-center gap-2">
//                   <IoMailOutline className="text-base" />
//                   All Notifications
//                 </div>
//               </button>

//               <button
//                 onClick={() => setActiveTab("unread")}
//                 className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${
//                   activeTab === "unread"
//                     ? "bg-indigo-50 text-indigo-700 shadow-sm"
//                     : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
//                 }`}
//               >
//                 <div className="flex items-center justify-center gap-2">
//                   <HiOutlineBellAlert className="text-base" />
//                   Unread
//                   {unreadCount > 0 && (
//                     <span className="ml-1.75 px-2 py-0.5 text-xs font-semibold bg-red-500 text-white rounded-full">
//                       {unreadCount}
//                     </span>
//                   )}
//                 </div>
//               </button>
//             </div>
//           </div>

//           {/* Mark All Read Button */}
//           {unreadCount > 0 && activeTab === "all" && (
//             <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-end">
//               <button
//                 onClick={handleMarkAllAsRead}
//                 className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-all duration-200"
//               >
//                 <MdDoneAll size={16} />
//                 Mark all as read
//               </button>
//             </div>
//           )}

//           {/* Notifications List */}
//           <div className="divide-y divide-gray-100 ">
//             {filteredNotifications && filteredNotifications.length > 0 ? (
//               filteredNotifications.map((notification) => (
//                 <div
//                   key={notification.id}
//                   onMouseEnter={() => setHoveredId(notification.id)}
//                   onMouseLeave={() => setHoveredId(null)}
//                   className={`group relative transition-all  duration-300 ${
//                     !notification.is_read
//                       ? "bg-gradient-to-r from-indigo-50/30 to-transparent hover:bg-indigo-50/50"
//                       : "hover:bg-gray-50"
//                   }`}
//                 >
//                   <div className="p-4">
//                     <div className="flex gap-4">
//                       {/* Icon */}
//                       <div className="flex-shrink-0">
//                         <div
//                           className={getIconBackground(
//                             notification.type,
//                             notification.is_read,
//                           )}
//                         >
//                           {getIcon(notification.type)}
//                         </div>
//                       </div>

//                       {/* Content */}
//                       <div className="flex-1 min-w-0">
//                         <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
//                           <div className="flex-1">
//                             <h4
//                               className={`text-sm font-semibold ${
//                                 !notification.is_read
//                                   ? "text-gray-900"
//                                   : "text-gray-700"
//                               }`}
//                             >
//                               {notification.title}
//                               {!notification.is_read && (
//                                 <span className="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
//                               )}
//                             </h4>
//                             <p className="text-sm text-gray-600 mt-1 leading-relaxed">
//                               {notification.message}
//                             </p>
//                           </div>

//                           <div className="flex items-center gap-2 text-xs text-gray-400 whitespace-nowrap">
//                             <IoTimeOutline size={12} />
//                             <span>
//                               {getRelativeTime(notification.created_at)}
//                             </span>
//                           </div>
//                         </div>

//                         {/* Action Buttons */}
//                         {!notification.is_read && (
//                           <div className="mt-3">
//                             <button
//                               onClick={() => handleMarkAsRead(notification.id)}
//                               className="text-xs text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-indigo-50 transition-all duration-200"
//                             >
//                               <IoCheckmarkCircle size={14} />
//                               Mark as read
//                             </button>
//                           </div>
//                         )}
//                       </div>

//                       {/* Quick action on hover */}
//                       {!notification.is_read &&
//                         hoveredId === notification.id && (
//                           <button
//                             onClick={() => handleMarkAsRead(notification.id)}
//                             className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 bg-white rounded-full shadow-md border border-gray-200 text-gray-500 hover:text-indigo-600 transition-all duration-200 opacity-0 group-hover:opacity-100"
//                             title="Mark as read"
//                           >
//                             <IoCheckmarkCircle size={16} />
//                           </button>
//                         )}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="py-16 text-center">
//                 <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl mb-4">
//                   {activeTab === "unread" ? (
//                     <RiEmotionHappyLine className="text-gray-400 text-3xl" />
//                   ) : (
//                     <IoNotificationsOutline className="text-gray-400 text-3xl" />
//                   )}
//                 </div>
//                 <h3 className="text-gray-700 font-medium mb-1">
//                   {activeTab === "unread"
//                     ? "All caught up"
//                     : "No notifications yet"}
//                 </h3>
//                 <p className="text-gray-400 text-sm">
//                   {activeTab === "unread"
//                     ? "You've read all your notifications"
//                     : "When you receive notifications, they'll appear here"}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </PageBody>
//     </PageLayout>
//   );
// };

// export default Notification;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllNotifications,
  markNotificationAsRead,
  markAllAsRead,
  getUnreadCount,
} from "../../../../redux/slice/notificationSlicer";
import {
  IoNotificationsOutline,
  IoCheckmarkCircle,
  IoTimeOutline,
  IoArrowForward,
  IoMailOpenOutline,
  IoMailOutline,
  IoHappyOutline,
} from "react-icons/io5";
import { MdDoneAll, MdNotificationsActive } from "react-icons/md";
import { FaChalkboardTeacher, FaTrophy, FaGraduationCap } from "react-icons/fa";
import { GiDiploma } from "react-icons/gi";
import { HiOutlineBell, HiOutlineBellAlert } from "react-icons/hi2";
import { RiEmotionHappyLine } from "react-icons/ri";
import Loader from "../Loader";
import Error from "../Error";
import {
  PageBody,
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight,
  PageLayout,
  PageSubtitle,
  PageTitle,
} from "../layout";
import Breadcrumb from "../layout/Breadcrumb";

const Notification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notifications, unreadCount, isLoading, isError, message } =
    useSelector((state) => state.notification);

  const [activeTab, setActiveTab] = useState("all");
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    dispatch(getAllNotifications());
    dispatch(getUnreadCount());
  }, [dispatch]);

  const filteredNotifications =
    activeTab === "all"
      ? notifications
      : notifications?.filter((notif) => !notif.is_read);

  const handleMarkAsRead = (notificationId) => {
    dispatch(markNotificationAsRead(notificationId));
  };

  const handleMarkAllAsRead = () => {
    if (unreadCount > 0) {
      dispatch(markAllAsRead());
    }
  };

  const handleNotificationClick = (notification) => {
    if (!notification.is_read) {
      dispatch(markNotificationAsRead(notification.id));
    }
    navigate(`/notifications/${notification.id}`, { state: { notification } });
  };

  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffSeconds = Math.floor((now - date) / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffSeconds < 60) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffWeeks < 4)
      return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
    if (diffMonths < 12)
      return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
    return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
  };

  const getIcon = (type) => {
    const icons = {
      TRAINING_ASSIGNED: <FaChalkboardTeacher size={18} />,
      ASSESSMENT_COMPLETED: <IoCheckmarkCircle size={18} />,
      CERTIFICATE_ISSUED: <GiDiploma size={18} />,
      COURSE_COMPLETED: <FaGraduationCap size={18} />,
      ACHIEVEMENT_UNLOCKED: <FaTrophy size={18} />,
    };
    return icons[type] || <HiOutlineBell size={18} />;
  };

  const getIconBackground = (type, isRead) => {
    const baseClass = "rounded-full p-2 transition-all duration-200";
    if (isRead) return `${baseClass} bg-gray-100 text-gray-500`;

    const bgColors = {
      TRAINING_ASSIGNED: "bg-blue-100 text-blue-600",
      ASSESSMENT_COMPLETED: "bg-green-100 text-green-600",
      CERTIFICATE_ISSUED: "bg-purple-100 text-purple-600",
      COURSE_COMPLETED: "bg-emerald-100 text-emerald-600",
      ACHIEVEMENT_UNLOCKED: "bg-amber-100 text-amber-600",
    };
    return `${baseClass} ${bgColors[type] || "bg-indigo-100 text-indigo-600"}`;
  };

  if (isLoading) return <Loader />;
  if (isError) return <Error message={message} />;

  return (
    <PageLayout>
      <Breadcrumb
        items={[{ label: "Home", path: "/" }, { label: "Notifications" }]}
      />

      <PageHeader>
        <PageHeaderLeft>
          <PageTitle className="flex items-center gap-3">
            Notifications
          </PageTitle>
          <PageSubtitle>
            Stay updated with your learning journey and achievements
          </PageSubtitle>
        </PageHeaderLeft>
        <PageHeaderRight />
      </PageHeader>

      <PageBody>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Notifications
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {notifications?.length || 0}
                </p>
              </div>
              <div className="bg-indigo-50 rounded-full p-3">
                <IoNotificationsOutline className="text-indigo-500 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unread
                </p>
                <p className="text-3xl font-bold text-blue-600 mt-1">
                  {unreadCount}
                </p>
              </div>
              <div className="bg-blue-50 rounded-full p-3">
                <MdNotificationsActive className="text-blue-500 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Read
                </p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {(notifications?.length || 0) - (unreadCount || 0)}
                </p>
              </div>
              <div className="bg-green-50 rounded-full p-3">
                <IoMailOpenOutline className="text-green-500 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex gap-1 p-1">
              <button
                onClick={() => setActiveTab("all")}
                className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === "all"
                    ? "bg-indigo-50 text-indigo-700 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <IoMailOutline className="text-base" />
                  All Notifications
                </div>
              </button>

              <button
                onClick={() => setActiveTab("unread")}
                className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === "unread"
                    ? "bg-indigo-50 text-indigo-700 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <HiOutlineBellAlert className="text-base" />
                  Unread
                  {unreadCount > 0 && (
                    <span className="ml-1.75 px-2 py-0.5 text-xs font-semibold bg-red-500 text-white rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Mark All Read Button */}
          {unreadCount > 0 && activeTab === "all" && (
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-end">
              <button
                onClick={handleMarkAllAsRead}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-all duration-200"
              >
                <MdDoneAll size={16} />
                Mark all as read
              </button>
            </div>
          )}

          {/* Notifications List */}
          <div className="divide-y divide-gray-100">
            {filteredNotifications && filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  onMouseEnter={() => setHoveredId(notification.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => handleNotificationClick(notification)}
                  className={`group relative transition-all duration-300 cursor-pointer ${
                    !notification.is_read
                      ? "bg-gradient-to-r from-indigo-50/30 to-transparent hover:bg-indigo-50/50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="p-4">
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div
                          className={getIconBackground(
                            notification.type,
                            notification.is_read,
                          )}
                        >
                          {getIcon(notification.type)}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                          <div className="flex-1">
                            <h4
                              className={`text-sm font-semibold ${
                                !notification.is_read
                                  ? "text-gray-900"
                                  : "text-gray-700"
                              }`}
                            >
                              {notification.title}
                              {!notification.is_read && (
                                <span className="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                              )}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1 leading-relaxed line-clamp-2">
                              {notification.message}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-gray-400 whitespace-nowrap">
                            <IoTimeOutline size={12} />
                            <span>
                              {getRelativeTime(notification.created_at)}
                            </span>
                          </div>
                        </div>

                        {/* Read more link - appears on hover */}
                        <div className="mt-3 flex items-center text-indigo-600 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 uppercase tracking-wider">
                          Read more
                          <svg
                            className="ml-1 w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl mb-4">
                  {activeTab === "unread" ? (
                    <RiEmotionHappyLine className="text-gray-400 text-3xl" />
                  ) : (
                    <IoNotificationsOutline className="text-gray-400 text-3xl" />
                  )}
                </div>
                <h3 className="text-gray-700 font-medium mb-1">
                  {activeTab === "unread"
                    ? "All caught up"
                    : "No notifications yet"}
                </h3>
                <p className="text-gray-400 text-sm">
                  {activeTab === "unread"
                    ? "You've read all your notifications"
                    : "When you receive notifications, they'll appear here"}
                </p>
              </div>
            )}
          </div>
        </div>
      </PageBody>
    </PageLayout>
  );
};

export default Notification;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
} from "react-icons/io5";
import { MdDoneAll, MdNotificationsActive } from "react-icons/md";
import { FaChalkboardTeacher, FaTrophy } from "react-icons/fa";
import { GiDiploma } from "react-icons/gi";

const Notification = () => {
  const dispatch = useDispatch();
  const { notifications, unreadCount, isLoading } = useSelector(
    (state) => state.notification,
  );

  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    dispatch(getAllNotifications());
    dispatch(getUnreadCount());
  }, []);

  const filteredNotifications =
    activeTab === "all"
      ? notifications
      : notifications?.filter((notif) => !notif.is_read);

  const handleMarkAsRead = (notificationId) => {
    dispatch(markNotificationAsRead(notificationId));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffSeconds = Math.floor((now - date) / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSeconds < 60) return "just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getIcon = (type) => {
    const icons = {
      TRAINING_ASSIGNED: <FaChalkboardTeacher size={16} />,
      ASSESSMENT_COMPLETED: <IoCheckmarkCircle size={16} />,
      CERTIFICATE_ISSUED: <GiDiploma size={16} />,
    };
    return icons[type] || <IoNotificationsOutline size={16} />;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-3 text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Notifications
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Stay updated with your learning journey
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                <MdDoneAll size={16} />
                Read all
              </button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-white rounded-lg p-3 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase">Total</p>
                <p className="text-2xl font-bold text-gray-800">
                  {notifications?.length || 0}
                </p>
              </div>
              <IoNotificationsOutline className="text-gray-400 text-xl" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase">Unread</p>
                <p className="text-2xl font-bold text-blue-600">
                  {unreadCount}
                </p>
              </div>
              <MdNotificationsActive className="text-blue-400 text-xl" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-lg border-b border-gray-200 flex">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 py-2.5 text-sm font-medium transition ${
              activeTab === "all"
                ? "text-blue-600 border-b-2 border-blue-600 -mb-px"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab("unread")}
            className={`flex-1 py-2.5 text-sm font-medium transition ${
              activeTab === "unread"
                ? "text-blue-600 border-b-2 border-blue-600 -mb-px"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Unread
            {unreadCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-red-100 text-red-600 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-b-lg shadow-sm overflow-hidden">
          {filteredNotifications && filteredNotifications.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 transition hover:bg-gray-50 ${
                    !notification.is_read ? "bg-blue-50/20" : ""
                  }`}
                >
                  <div className="flex gap-3">
                    <div
                      className={`flex-shrink-0 mt-0.5 ${
                        !notification.is_read
                          ? "text-blue-600"
                          : "text-gray-400"
                      }`}
                    >
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-1">
                        <div className="flex-1">
                          <p
                            className={`text-sm font-medium ${
                              !notification.is_read
                                ? "text-gray-900"
                                : "text-gray-700"
                            }`}
                          >
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-600 mt-0.5">
                            {notification.message}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400 whitespace-nowrap">
                            {getRelativeTime(notification.created_at)}
                          </span>
                          {!notification.is_read && (
                            <button
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="text-gray-300 hover:text-blue-500"
                            >
                              <IoArrowForward size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                      {!notification.is_read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="text-xs text-blue-600 mt-2 inline-flex items-center gap-0.5 hover:text-blue-700"
                        >
                          <IoCheckmarkCircle size={12} />
                          Mark read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-3">
                <IoNotificationsOutline className="text-gray-400 text-2xl" />
              </div>
              <p className="text-gray-500 text-sm">Nothing to see here</p>
              <p className="text-gray-400 text-xs mt-1">
                {activeTab === "unread"
                  ? "All caught up!"
                  : "No notifications yet"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;

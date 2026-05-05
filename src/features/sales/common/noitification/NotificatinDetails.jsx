import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { markNotificationAsRead } from "../../../../redux/slice/notificationSlicer";
import {
  IoArrowBack,
  IoTimeOutline,
  IoCheckmarkCircle,
  IoMailOpenOutline,
} from "react-icons/io5";
import { FaChalkboardTeacher, FaTrophy, FaGraduationCap } from "react-icons/fa";
import { GiDiploma } from "react-icons/gi";
import {
  PageBody,
  PageHeader,
  PageHeaderLeft,
  PageLayout,
  PageTitle,
} from "../layout";
import Breadcrumb from "../layout/Breadcrumb";

const NotificationDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notification = location.state?.notification;

  React.useEffect(() => {
    // If notification is not read, mark it as read
    if (notification && !notification.is_read) {
      dispatch(markNotificationAsRead(notification.id));
    }
  }, [notification, dispatch]);

  const getIcon = (type) => {
    const icons = {
      TRAINING_ASSIGNED: <FaChalkboardTeacher size={32} />,
      ASSESSMENT_COMPLETED: <IoCheckmarkCircle size={32} />,
      CERTIFICATE_ISSUED: <GiDiploma size={32} />,
      COURSE_COMPLETED: <FaGraduationCap size={32} />,
      ACHIEVEMENT_UNLOCKED: <FaTrophy size={32} />,
    };
    return icons[type] || <IoMailOpenOutline size={32} />;
  };

  const getIconBackground = (type) => {
    const bgColors = {
      TRAINING_ASSIGNED: "bg-blue-100 text-blue-600",
      ASSESSMENT_COMPLETED: "bg-green-100 text-green-600",
      CERTIFICATE_ISSUED: "bg-purple-100 text-purple-600",
      COURSE_COMPLETED: "bg-emerald-100 text-emerald-600",
      ACHIEVEMENT_UNLOCKED: "bg-amber-100 text-amber-600",
    };
    return bgColors[type] || "bg-indigo-100 text-indigo-600";
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

    if (diffSeconds < 60) return "Just now";
    if (diffMinutes < 60)
      return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffWeeks < 4)
      return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
    if (diffMonths < 12)
      return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
    return date.toLocaleDateString();
  };

  if (!notification) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-gray-500">Notification not found</p>
            <button
              onClick={() => navigate("/notifications")}
              className="mt-4 text-blue-600 hover:text-blue-700"
            >
              Go back to notifications
            </button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Notifications", path: "/notifications" },
          { label: "Notification Details", path: `/notification/${id}` },
        ]}
      />

      <PageHeader>
        <PageHeaderLeft>
          <button
            onClick={() => navigate("/notifications")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-4"
          >
            <IoArrowBack size={20} />
            <span>Back to Notifications</span>
          </button>
          <div className="flex items-center gap-3">
            <div
              className={`rounded-2xl p-3 ${getIconBackground(notification.type)}`}
            >
              {getIcon(notification.type)}
            </div>
            <PageTitle>{notification.title}</PageTitle>
          </div>
        </PageHeaderLeft>
      </PageHeader>

      <PageBody>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Status Bar */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IoTimeOutline className="text-gray-400" />
                <span className="text-sm text-gray-600">
                  {getRelativeTime(notification.created_at)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    notification.is_read
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {notification.is_read ? "Read" : "Unread"}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  {notification.title}
                </h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {notification.message}
                </p>

                {/* Additional Data if any */}
                {notification.data &&
                  Object.keys(notification.data).length > 0 && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-700 mb-2">
                        Additional Information
                      </h3>
                      <div className="space-y-2 text-sm">
                        {notification.data.screen && (
                          <p>
                            <span className="font-medium text-gray-600">
                              Screen:
                            </span>{" "}
                            {notification.data.screen}
                          </p>
                        )}
                        {notification.data.link && (
                          <p>
                            <span className="font-medium text-gray-600">
                              Link:
                            </span>{" "}
                            <a
                              href={notification.data.link}
                              className="text-blue-600 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {notification.data.link}
                            </a>
                          </p>
                        )}
                      </div>
                    </div>
                  )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => navigate("/notifications")}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
              >
                View All Notifications
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </PageBody>
    </PageLayout>
  );
};

export default NotificationDetail;

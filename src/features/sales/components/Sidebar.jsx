import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import {
  MdOutlineVideoLibrary,
  MdAnalytics,
  MdAssignment,
  MdVerified,
} from "react-icons/md";
import {
  FaSignOutAlt,
  FaCommentDots,
  FaClipboardList,
  FaUserGraduate,
  FaCertificate,
  FaEnvelope, // icon for Contact Us
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/slice/authSlice";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Navigation Items
  const navItems = [
    { path: "/dashboard", name: t("sidebar.nav.home"), icon: HiHome },
    {
      path: "/levels",
      name: t("sidebar.nav.myLevels"),
      icon: MdOutlineVideoLibrary,
    },
    { path: "/progress", name: t("sidebar.nav.analytics"), icon: MdAnalytics },
    {
      path: "/assessment",
      name: t("sidebar.nav.assessment"),
      icon: MdAssignment,
    },
    { path: "/support", name: t("sidebar.nav.inbox"), icon: FaCommentDots },
    {
      path: "/module-certification-status",
      name: t("sidebar.nav.certificationStatus"),
      icon: MdVerified,
    },
  ];

  // Reports Items (no Contact Us here)
  const reportItems = [
    {
      path: "/audit-logs",
      name: t("sidebar.reports.auditLogs"),
      icon: FaClipboardList,
    },
    {
      path: "/user-progress",
      name: t("sidebar.reports.userProgress"),
      icon: FaUserGraduate,
    },
    {
      path: "/certification",
      name: t("sidebar.reports.certificate"),
      icon: FaCertificate,
    },
  ];

  // Logout Logic
  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <aside className="hidden lg:block w-[200px] min-w-[200px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white border-r border-gray-700 h-full overflow-y-auto custom-scrollbar">
      <div className="flex flex-col h-full">
        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 mt-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                  isActive
                    ? "bg-white/20 text-white shadow-lg backdrop-blur-sm"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <item.icon className="text-lg" />
              <span>{item.name}</span>
            </NavLink>
          ))}

          {/* Reports Section - Always Open */}
          <div className="mt-1">
            {/* Reports Label */}
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70">
              <FaClipboardList className="text-lg" />
              <span>{t("sidebar.reports.label")}</span>
            </div>

            {/* Child Items - Always Visible with Indentation */}
            <div className="ml-4 mt-1 space-y-1 border-l-2 border-white/10 pl-3">
              {reportItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                      isActive
                        ? "bg-white/20 text-white shadow-lg backdrop-blur-sm"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  <item.icon className="text-base" />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>
          </div>

          {/* Contact Us - Standalone item, outside Reports */}
          <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                isActive
                  ? "bg-white/20 text-white shadow-lg backdrop-blur-sm"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <FaEnvelope className="text-lg" />
            <span>{t("sidebar.nav.contactUs")}</span>
          </NavLink>
        </nav>

        {/* Logout */}
        <div className="p-3 border-t-2 border-gray-500/50 mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center cursor-pointer gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <FaSignOutAlt className="text-lg" />
            <span>{t("sidebar.logout")}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiHome } from "react-icons/hi";
import {
  MdOutlineVideoLibrary,
  MdAnalytics,
  MdSettings,
  MdLogout,
  MdPerson,
  MdAssignment,
  MdNotifications,
} from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";
import logo from "../../../assets/admin/AvanteMedicalLogo.png";

const Sidebar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Define your navigation items
  const navItems = [
    { path: "/dashboard", name: t("navbar.home"), icon: HiHome },
    {
      path: "/levels",
      name: t("navbar.myLevels"),
      icon: MdOutlineVideoLibrary,
    },
    { path: "/progress", name: t("navbar.analytics"), icon: MdAnalytics },
    { path: "/assessment", name: t("navbar.assessment"), icon: MdAssignment },
  ];

  const handleLogout = () => {
    // Your logout logic here
    navigate("/login");
  };

  return (
    <aside className="hidden lg:block w-[200px] min-w-[200px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white border-r border-gray-700 h-full overflow-y-auto custom-scrollbar">
      <div className="flex flex-col h-full ">
        {/* Navigation Items */}
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
              <span className="text-lg">{React.createElement(item.icon)}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Section - Logout with clear border */}
        <div className="p-3 border-t-2 border-gray-500/50 mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <FaSignOutAlt className="text-lg" />
            <span>{t("logout") || "Logout"}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

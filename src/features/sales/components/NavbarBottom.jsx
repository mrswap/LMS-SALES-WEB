import React from "react";
import { NavLink } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { MdOutlineVideoLibrary, MdAnalytics, MdSettings } from "react-icons/md";
import { useTranslation } from "react-i18next";

const NavbarBottom = () => {
  const { t } = useTranslation();

  const navItems = [
    { path: "/dashboard", name: t("sidebar.home"), icon: HiHome },
    {
      path: "/levels",
      name: t("sidebar.myLevels"),
      icon: MdOutlineVideoLibrary,
    },
    { path: "/progress", name: t("sidebar.anlytics"), icon: MdAnalytics },
    { path: "/settings", name: t("sidebar.profile"), icon: MdSettings },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 shadow-md flex justify-around items-center h-16 z-50 sm:hidden">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center text-xs ${
              isActive ? "text-blue-600" : "text-gray-500"
            }`
          }
        >
          <item.icon className="w-6 h-6 mb-1" />
        </NavLink>
      ))}
    </div>
  );
};

export default NavbarBottom;

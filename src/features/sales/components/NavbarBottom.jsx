// import React from "react";
// import { NavLink } from "react-router-dom";
// import { HiHome } from "react-icons/hi";
// import {
//   MdOutlineVideoLibrary,
//   MdAnalytics,
//   MdSettings,
//   MdAssignment,
// } from "react-icons/md";
// import { useTranslation } from "react-i18next";

// const NavbarBottom = () => {
//   const { t } = useTranslation();

//   const navItems = [
//     { path: "/dashboard", name: t("navbar.home"), icon: HiHome },
//     {
//       path: "/levels",
//       name: t("navbar.myLevels"),
//       icon: MdOutlineVideoLibrary,
//     },
//     { path: "/progress", name: t("navbar.anlytics"), icon: MdAnalytics },
//     { path: "/assessment", name: t("navbar.assessment"), icon: MdAssignment },
//   ];

//   return (
//     <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 shadow-md flex justify-around items-center h-16 z-50 lg:hidden">
//       {navItems.map((item) => (
//         <NavLink
//           key={item.path}
//           to={item.path}
//           className={({ isActive }) =>
//             `flex flex-col items-center justify-center text-xs ${
//               isActive ? "text-blue-600" : "text-gray-500"
//             }`
//           }
//         >
//           <item.icon className="w-6 h-6 mb-1" />
//         </NavLink>
//       ))}
//     </div>
//   );
// };

// export default NavbarBottom;

import React from "react";
import { NavLink } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import {
  MdOutlineVideoLibrary,
  MdAnalytics,
  MdAssignment,
  MdVerified,
} from "react-icons/md";
import { useTranslation } from "react-i18next";

const NavbarBottom = () => {
  const { t } = useTranslation();

  // BILKUL SAME items jo header mein hain - bas Certification add kiya
  const navItems = [
    { path: "/dashboard", name: t("navbar.home"), icon: HiHome },
    {
      path: "/levels",
      name: t("navbar.myLevels"),
      icon: MdOutlineVideoLibrary,
    },
    { path: "/progress", name: t("navbar.analytics"), icon: MdAnalytics },
    { path: "/assessment", name: t("navbar.assessment"), icon: MdAssignment },
    {
      path: "/module-certification-status",
      name: t("sidebar.nav.certificationStatus"),
      icon: MdVerified,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 shadow-md flex justify-around items-center h-16 z-50 lg:hidden">
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
          {/* BAS YAHI - same text, sirf chhota size */}
          <span className="text-[12px] leading-tight font-medium text-center">
            {item.name}
          </span>
        </NavLink>
      ))}
    </div>
  );
};

export default NavbarBottom;

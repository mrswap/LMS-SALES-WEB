// import React, { useState, useEffect, useRef } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { HiHome } from "react-icons/hi";
// import {
//   MdOutlineVideoLibrary,
//   MdAnalytics,
//   MdSettings,
//   MdLogout,
//   MdPerson,
//   MdAssignment,
// } from "react-icons/md";
// import { IoMdArrowDropdown } from "react-icons/io";
// import { useTranslation } from "react-i18next";
// import i18n from "../../../i18n";
// import logo from "../../../assets/admin/AvanteMedicalLogo.png";
// import { useDispatch, useSelector } from "react-redux";
// import { getProfile } from "../../../redux/slice/profileSlice";
// import { logout } from "../../../redux/slice/authSlice";

// const HeaderNavbar = () => {
//   const [lang, setLang] = useState("en");
//   const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
//   const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
//   const userDropdownRef = useRef(null);
//   const languageDropdownRef = useRef(null);
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { profile, isLoading, isError, message } = useSelector(
//     (state) => state.profile,
//   );

//   useEffect(() => {
//     dispatch(getProfile());
//   }, [dispatch]);

//   // Get user initials (first 2 characters of name)
//   const getUserInitials = () => {
//     const name = profile?.name || "User";
//     return name.slice(0, 2).toUpperCase();
//   };

//   // Get profile image or fallback to name initials
//   const getProfileDisplay = () => {
//     if (profile?.profile_image) {
//       return { type: "image", value: profile.profile_image };
//     }
//     return { type: "initials", value: getUserInitials() };
//   };

//   const profileDisplay = getProfileDisplay();

//   // --- Language Logic ---
//   useEffect(() => {
//     const savedLang = localStorage.getItem("appLanguage") || "en";
//     setLang(savedLang);
//     i18n.changeLanguage(savedLang);
//   }, []);

//   const handleLanguageChange = (selectedLang) => {
//     setLang(selectedLang);
//     i18n.changeLanguage(selectedLang);
//     localStorage.setItem("appLanguage", selectedLang);
//     setIsLanguageDropdownOpen(false);
//   };

//   // --- Dropdown Handlers ---
//   const toggleUserDropdown = () => {
//     setIsUserDropdownOpen(!isUserDropdownOpen);
//     setIsLanguageDropdownOpen(false);
//   };

//   const toggleLanguageDropdown = () => {
//     setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
//     setIsUserDropdownOpen(false);
//   };

//   const handleProfileClick = () => {
//     navigate("/profile");
//     setIsUserDropdownOpen(false);
//   };

//   const handleSettingsClick = () => {
//     console.log("Navigate to settings");
//     setIsUserDropdownOpen(false);
//   };

//   const handleLogoutClick = () => {
//     dispatch(logout());
//     navigate("/login");
//     setIsUserDropdownOpen(false);
//   };

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         userDropdownRef.current &&
//         !userDropdownRef.current.contains(event.target)
//       ) {
//         setIsUserDropdownOpen(false);
//       }
//       if (
//         languageDropdownRef.current &&
//         !languageDropdownRef.current.contains(event.target)
//       ) {
//         setIsLanguageDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Get language display with flag and text
//   const getLanguageDisplay = () => {
//     switch (lang) {
//       case "en":
//         return { flag: "🇺🇸", text: t("navbar.language.en") };
//       case "hi":
//         return { flag: "🇮🇳", text: t("navbar.language.hi") };
//       case "pa":
//         return { flag: "🇮🇳", text: t("navbar.language.pa") };
//       default:
//         return { flag: "🇺🇸", text: t("navbar.language.en") };
//     }
//   };

//   const currentLanguage = getLanguageDisplay();

//   // Language options for dropdown
//   const languageOptions = [
//     {
//       code: "en",
//       flag: "🇺🇸",
//       name: t("navbar.language.en"),
//       label: "navbar.language.en",
//     },
//     {
//       code: "hi",
//       flag: "🇮🇳",
//       name: t("navbar.language.hi"),
//       label: "navbar.language.hi",
//     },
//     {
//       code: "pa",
//       flag: "🇮🇳",
//       name: t("navbar.language.pa"),
//       label: "navbar.language.pa",
//     },
//   ];

//   // --- Navigation Items ---
//   const navItems = [
//     { path: "/dashboard", name: t("navbar.home"), icon: HiHome },
//     {
//       path: "/levels",
//       name: t("navbar.myLevels"),
//       icon: MdOutlineVideoLibrary,
//     },
//     { path: "/progress", name: t("navbar.analytics"), icon: MdAnalytics },
//     { path: "/assessment", name: t("navbar.assessment"), icon: MdAssignment },
//     { path: "/notification", name: "Notification", icon: MdAssignment },
//   ];

//   const linkClass =
//     "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 whitespace-nowrap";

//   const activeClass = "bg-white text-blue-600 shadow-md";
//   const inactiveClass = "text-white/80 hover:text-white hover:bg-white/10";

//   return (
//     <div className="bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] shadow-lg border-b border-[#1d3d8a] sticky top-0 z-50">
//       <div className="max-w-[1600px] mx-auto px-3 sm:px-6">
//         {/* Top Row: Logo + Navigation + Right Section (Language + User) */}
//         <div className="flex items-center justify-between h-14 sm:h-16 gap-4">
//           {/* Logo Section */}
//           <div className="flex-shrink-0">
//             <img
//               src={logo}
//               alt="Logo"
//               className="h-7 sm:h-9 md:h-10 w-auto transition-transform hover:scale-105 cursor-pointer"
//             />
//           </div>

//           {/* Navigation Links - Desktop Only */}
//           <div className="hidden md:flex items-center justify-center gap-1 lg:gap-2 bg-white/5 backdrop-blur-sm rounded-full px-2 py-1">
//             {navItems.map((item) => (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `${linkClass} ${isActive ? activeClass : inactiveClass}`
//                 }
//               >
//                 <item.icon className="w-4 h-4" />
//                 <span>{item.name}</span>
//               </NavLink>
//             ))}
//           </div>

//           {/* Right Section: Language + User Info with Dropdowns */}
//           <div className="flex items-center gap-3 sm:gap-4">
//             {/* Custom Language Dropdown */}
//             <div className="relative" ref={languageDropdownRef}>
//               <button
//                 onClick={toggleLanguageDropdown}
//                 className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 sm:py-2 border border-white/20 hover:bg-white/20 transition-all duration-200 cursor-pointer min-w-[100px] sm:min-w-[120px]"
//               >
//                 <span className="text-base">{currentLanguage.flag}</span>
//                 <span className="text-white text-sm sm:text-base font-medium">
//                   {currentLanguage.text}
//                 </span>
//                 <IoMdArrowDropdown
//                   className={`text-white/70 transition-transform duration-200 ${isLanguageDropdownOpen ? "rotate-180" : ""}`}
//                 />
//               </button>

//               {/* Language Dropdown Menu */}
//               {isLanguageDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100 animate-fadeIn">
//                   {languageOptions.map((option) => (
//                     <button
//                       key={option.code}
//                       onClick={() => handleLanguageChange(option.code)}
//                       className={`w-full px-4 py-2 text-left text-sm flex items-center gap-3 transition-colors duration-150 ${
//                         lang === option.code
//                           ? "bg-blue-50 text-blue-600"
//                           : "text-gray-700 hover:bg-gray-50"
//                       }`}
//                     >
//                       <span className="text-base">{option.flag}</span>
//                       <span>{option.name}</span>
//                       {lang === option.code && (
//                         <span className="ml-auto text-blue-600">✓</span>
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* User Dropdown */}
//             <div className="relative" ref={userDropdownRef}>
//               <button
//                 onClick={toggleUserDropdown}
//                 className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full pl-1 pr-3 py-1 border border-white/20 hover:bg-white/20 transition-all duration-200 cursor-pointer"
//               >
//                 {/* Profile Image or Name Initials */}
//                 {profileDisplay?.type === "image" ? (
//                   <img
//                     src={profileDisplay?.value}
//                     alt="User Avatar"
//                     className="h-7 w-7 sm:h-8 sm:w-8 rounded-full object-cover border border-white/30"
//                   />
//                 ) : (
//                   <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white font-semibold text-sm">
//                     {profileDisplay?.value}
//                   </div>
//                 )}
//                 <span className="text-white text-sm sm:text-base font-medium hidden xs:inline-block">
//                   {profile?.name || "User"}
//                 </span>
//                 <IoMdArrowDropdown
//                   className={`text-white/70 transition-transform duration-200 ${isUserDropdownOpen ? "rotate-180" : ""}`}
//                 />
//               </button>

//               {/* User Dropdown Menu */}
//               {isUserDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100 animate-fadeIn">
//                   <button
//                     onClick={handleProfileClick}
//                     className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors duration-150"
//                   >
//                     <MdPerson className="w-4 h-4 text-gray-500" />
//                     <span>{t("navbar.profile")}</span>
//                   </button>
//                   <button
//                     onClick={handleSettingsClick}
//                     className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors duration-150"
//                   >
//                     <MdSettings className="w-4 h-4 text-gray-500" />
//                     <span>{t("navbar.settings")}</span>
//                   </button>
//                   <hr className="my-1 border-gray-100" />
//                   <button
//                     onClick={handleLogoutClick}
//                     className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors duration-150"
//                   >
//                     <MdLogout className="w-4 h-4" />
//                     <span>{t("navbar.logout")}</span>
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeaderNavbar;

import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
import { useTranslation } from "react-i18next";
import { IoMdArrowDropdown } from "react-icons/io";
import i18n from "../../../i18n";
import logo from "../../../assets/admin/AvanteMedicalLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../../redux/slice/profileSlice";
import { logout } from "../../../redux/slice/authSlice";

const HeaderNavbar = () => {
  const [lang, setLang] = useState("en");
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const userDropdownRef = useRef(null);
  const languageDropdownRef = useRef(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { profile, isLoading, isError, message } = useSelector(
    (state) => state.profile,
  );

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  // Get user initials (first 2 characters of name)
  const getUserInitials = () => {
    const name = profile?.name || "User";
    return name.slice(0, 2).toUpperCase();
  };

  // Get profile image or fallback to name initials
  const getProfileDisplay = () => {
    if (profile?.profile_image) {
      return { type: "image", value: profile.profile_image };
    }
    return { type: "initials", value: getUserInitials() };
  };

  const profileDisplay = getProfileDisplay();

  // --- Language Logic ---
  useEffect(() => {
    const savedLang = localStorage.getItem("appLanguage") || "en";
    setLang(savedLang);
    i18n.changeLanguage(savedLang);
  }, []);

  const handleLanguageChange = (selectedLang) => {
    setLang(selectedLang);
    i18n.changeLanguage(selectedLang);
    localStorage.setItem("appLanguage", selectedLang);
    setIsLanguageDropdownOpen(false);
  };

  // --- Dropdown Handlers ---
  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    setIsLanguageDropdownOpen(false);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
    setIsUserDropdownOpen(false);
  };

  // Handle direct profile click (without arrow)
  const handleProfileDirectClick = (e) => {
    e.stopPropagation();
    toggleUserDropdown();
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setIsUserDropdownOpen(false);
  };

  const handleSettingsClick = () => {
    console.log("Navigate to settings");
    setIsUserDropdownOpen(false);
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    navigate("/login");
    setIsUserDropdownOpen(false);
  };

  // Handle notification click
  const handleNotificationClick = () => {
    navigate("/notification");
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false);
      }
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target)
      ) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get language display without flag
  const getLanguageDisplay = () => {
    switch (lang) {
      case "en":
        return t("navbar.language.en");
      case "hi":
        return t("navbar.language.hi");
      case "pa":
        return t("navbar.language.pa");
      default:
        return t("navbar.language.en");
    }
  };

  const currentLanguage = getLanguageDisplay();

  // Language options for dropdown without flags
  const languageOptions = [
    { code: "en", name: t("navbar.language.en"), label: "navbar.language.en" },
    { code: "hi", name: t("navbar.language.hi"), label: "navbar.language.hi" },
    { code: "pa", name: t("navbar.language.pa"), label: "navbar.language.pa" },
  ];

  // --- Navigation Items (removed notification from here) ---
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

  const linkClass =
    "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 whitespace-nowrap";

  const activeClass = "bg-white text-blue-600 shadow-md";
  const inactiveClass = "text-white/80 hover:text-white hover:bg-white/10";

  return (
    <div className="bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] shadow-lg border-b border-[#1d3d8a] sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-6">
        {/* Top Row: Logo + Navigation + Right Section (Language + User) */}
        <div className="flex items-center justify-between h-14 sm:h-16 gap-4">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <img
              src={logo}
              alt="Logo"
              className="h-7 sm:h-9 md:h-10 w-auto transition-transform hover:scale-105 cursor-pointer"
            />
          </div>

          {/* Navigation Links - Desktop Only */}
          <div className="hidden md:flex items-center justify-center gap-1 lg:gap-2 bg-white/5 backdrop-blur-sm rounded-full px-2 py-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : inactiveClass}`
                }
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Right Section: Language + Notification + User Info with Dropdowns */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Notification Bell Icon */}
            <button
              onClick={handleNotificationClick}
              className="relative bg-white/10 backdrop-blur-sm rounded-full p-2 border border-white/20 hover:bg-white/20 transition-all duration-200 cursor-pointer"
            >
              <MdNotifications className="w-5 h-5 text-white" />
              {/* Optional: Notification Badge - you can remove this if not needed */}
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Custom Language Dropdown - Original style without flags */}
            <div className="relative" ref={languageDropdownRef}>
              <button
                onClick={toggleLanguageDropdown}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 sm:py-2 border border-white/20 hover:bg-white/20 transition-all duration-200 cursor-pointer"
              >
                <span className="text-white text-sm sm:text-base font-medium">
                  {currentLanguage}
                </span>
                <IoMdArrowDropdown
                  className={`text-white/70 transition-transform duration-200 ${isLanguageDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Language Dropdown Menu */}
              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100 animate-fadeIn">
                  {languageOptions.map((option) => (
                    <button
                      key={option.code}
                      onClick={() => handleLanguageChange(option.code)}
                      className={`w-full px-4 py-2 text-left text-sm flex items-center gap-3 transition-colors duration-150 ${
                        lang === option.code
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span>{option.name}</span>
                      {lang === option.code && (
                        <span className="ml-auto text-blue-600">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Dropdown - Direct click on profile opens dropdown (no arrow) */}
            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={handleProfileDirectClick}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full pl-1 pr-1 py-1 border border-white/20 hover:bg-white/20 transition-all duration-200 cursor-pointer"
              >
                {/* Profile Image or Name Initials */}
                {profileDisplay?.type === "image" ? (
                  <img
                    src={profileDisplay?.value}
                    alt="User Avatar"
                    className="h-7 w-7 sm:h-8 sm:w-8 rounded-full object-cover border border-white/30"
                  />
                ) : (
                  <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white font-semibold text-sm">
                    {profileDisplay?.value}
                  </div>
                )}
                <span className="text-white text-sm sm:text-base font-medium hidden xs:inline-block">
                  {profile?.name || "User"}
                </span>
                {/* Arrow removed from here */}
              </button>

              {/* User Dropdown Menu */}
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100 animate-fadeIn">
                  <button
                    onClick={handleProfileClick}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors duration-150"
                  >
                    <MdPerson className="w-4 h-4 text-gray-500" />
                    <span>{t("navbar.profile")}</span>
                  </button>
                  <button
                    onClick={handleSettingsClick}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors duration-150"
                  >
                    <MdSettings className="w-4 h-4 text-gray-500" />
                    <span>{t("navbar.settings")}</span>
                  </button>
                  <hr className="my-1 border-gray-100" />
                  <button
                    onClick={handleLogoutClick}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors duration-150"
                  >
                    <MdLogout className="w-4 h-4" />
                    <span>{t("navbar.logout")}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderNavbar;

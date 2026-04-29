// import i18n from "../../../i18n";
// import { useEffect, useState } from "react";
// import logo from "../../../assets/admin/AvanteMedicalLogo.png";
// import { FaGlobe } from "react-icons/fa";
// import { IoMdArrowDropdown } from "react-icons/io";
// import { useTranslation } from "react-i18next";

// const Header = () => {
//   const [lang, setLang] = useState("en");
//   const { t } = useTranslation();

//   useEffect(() => {
//     const savedLang = localStorage.getItem("appLanguage") || "en";
//     setLang(savedLang);
//     i18n.changeLanguage(savedLang);
//   }, []);

//   const handleChange = (e) => {
//     const selectedLang = e.target.value;
//     setLang(selectedLang);
//     i18n.changeLanguage(selectedLang);
//     localStorage.setItem("appLanguage", selectedLang);
//   };

//   // Language display mapping (still needed for dropdown display)
//   const getLanguageDisplay = () => {
//     switch (lang) {
//       case "en":
//         return t("header.language.en");
//       case "hi":
//         return t("header.language.hi");
//       case "pa":
//         return t("header.language.pa");
//       default:
//         return t("header.language.en");
//     }
//   };

//   return (
//     <div className="bg-gradient-to-r from-[#2563EB] to-[#1E3A8A]  shadow-lg border-b border-[#1d3d8a] z-50 relative">
//       <div className="max-w-[1600px] mx-auto flex items-center justify-between px-3 sm:px-6 h-14 sm:h-16 ">
//         <div className="flex items-center gap-3 sm:gap-6">
//           <img
//             src={logo}
//             alt="Logo"
//             className="h-7 sm:h-9 md:h-10 w-auto transition-transform hover:scale-105 cursor-pointer"
//           />
//         </div>

//         <div className="relative group">
//           <select
//             value={lang}
//             onChange={handleChange}
//             className="bg-white/10 backdrop-blur-sm text-white border border-white/20
//                      rounded-lg pl-9 pr-7 py-1.5 sm:py-2 text-sm sm:text-base
//                      focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/30
//                      cursor-pointer hover:bg-white/20 transition-all duration-200
//                      appearance-none min-w-[100px] sm:min-w-[120px]"
//           >
//             <option value="en" className="text-gray-900">
//               🇺🇸 {t("header.language.en")}
//             </option>
//             <option value="hi" className="text-gray-900">
//               🇮🇳 {t("header.language.hi")}
//             </option>
//             <option value="pa" className="text-gray-900">
//               🇮🇳 {t("header.language.pa")}
//             </option>
//           </select>

//           {/* Left Icon */}
//           <FaGlobe className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-white/70 transition-colors group-hover:text-white" />

//           {/* Right Icon */}
//           <IoMdArrowDropdown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-white/70 transition-transform group-hover:scale-110" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;

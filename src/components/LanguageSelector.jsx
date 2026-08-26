// import React, { useState, useEffect } from "react";
// import { FaGlobeAsia } from "react-icons/fa";

// const LanguageSelector = () => {
//   const [currentLang, setCurrentLang] = useState(() => {
//     return localStorage.getItem("selectedLang") || "en";
//   });
//   const [isTranslating, setIsTranslating] = useState(false);

//   const changeLanguage = (lang) => {
//     if (lang === currentLang) return;

//     setIsTranslating(true);
//     localStorage.setItem("selectedLang", lang);
//     localStorage.setItem("pendingTranslation", lang);

//     // Page reload karna padega Google Translate ke liye
//     window.location.reload();
//   };

//   return (
//     <div className="flex items-center">
//       <div className="relative">
//         <select
//           value={currentLang}
//           onChange={(e) => changeLanguage(e.target.value)}
//           disabled={isTranslating}
//           className={`appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 pr-8 text-sm font-medium shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${
//             isTranslating ? "opacity-50" : ""
//           }`}
//         >
//           <option value="en">🇺🇸 English</option>
//           <option value="hi">🇮🇳 हिन्दी</option>
//           <option value="pa">🇮🇳 ਪੰਜਾਬੀ</option>
//         </select>
//         <FaGlobeAsia className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none" />
//       </div>
//     </div>
//   );
// };

// export default LanguageSelector;

// import { useEffect, useState } from "react";
// import Loader from "../features/sales/common/Loader";

// const LoadingOverlay = () => {
//   const [show, setShow] = useState(false);
//   const currentLang = localStorage.getItem("selectedLang") || "en";
//   const pendingLang = localStorage.getItem("pendingTranslation");

//   useEffect(() => {
//     if (pendingLang && pendingLang !== "en") {
//       setShow(true);

//       // Check for translation completion
//       const checkTranslation = setInterval(() => {
//         const html = document.documentElement;
//         // Google Translate adds this attribute when translation is done
//         if (
//           html.getAttribute("lang") === pendingLang
//           //   document.body.innerHTML.includes("translated")
//         ) {
//           setShow(false);
//           localStorage.removeItem("pendingTranslation");
//           clearInterval(checkTranslation);
//         }
//       }, 500);

//       // Timeout after 5 seconds
//       setTimeout(() => {
//         setShow(false);
//         clearInterval(checkTranslation);
//       }, 5000);

//       return () => clearInterval(checkTranslation);
//     }
//   }, [pendingLang]);

//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 bg-white bg-opacity-50 z-[9999] flex items-center justify-center">
//       {/* <div className="bg-white rounded-lg p-6 flex flex-col items-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
//         <p className="text-gray-700 font-medium">
//           Translating to {pendingLang === "hi" ? "Hindi" : "Punjabi"}...
//         </p>
//         <p className="text-gray-500 text-sm mt-2">Please wait</p>
//       </div> */}
//       <Loader />
//     </div>
//   );
// };

// export default LoadingOverlay;

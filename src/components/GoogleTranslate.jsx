// import { useEffect } from "react";

// const GoogleTranslate = () => {
//   useEffect(() => {
//     const currentLang = localStorage.getItem("selectedLang") || "en";
//     const pendingLang = localStorage.getItem("pendingTranslation");

//     console.log("Current Lang:", currentLang);
//     console.log("Pending Lang:", pendingLang);

//     if (currentLang === "en") {
//       // Agar English hai to pending clear karo
//       localStorage.removeItem("pendingTranslation");
//       return;
//     }

//     // Function to apply translation
//     const applyTranslation = () => {
//       const select = document.querySelector(".goog-te-combo");
//       if (select) {
//         const langToApply = pendingLang || currentLang;
//         console.log("Applying translation for:", langToApply);
//         select.value = langToApply;
//         select.dispatchEvent(new Event("change"));
//         localStorage.removeItem("pendingTranslation"); // Clear pending
//         return true;
//       }
//       return false;
//     };

//     const initializeTranslate = () => {
//       if (!window.google?.translate) {
//         setTimeout(initializeTranslate, 100);
//         return;
//       }

//       const element = document.getElementById("google_translate_element");
//       if (element && !element.hasChildNodes()) {
//         console.log("Creating translate element");
//         new window.google.translate.TranslateElement(
//           {
//             pageLanguage: "en",
//             includedLanguages: "en,hi,pa",
//             autoDisplay: false,
//           },
//           "google_translate_element",
//         );

//         // Try to apply translation immediately
//         setTimeout(() => {
//           if (!applyTranslation()) {
//             // Retry if not found
//             let attempts = 0;
//             const interval = setInterval(() => {
//               attempts++;
//               if (applyTranslation()) {
//                 clearInterval(interval);
//               } else if (attempts > 20) {
//                 clearInterval(interval);
//               }
//             }, 100);
//           }
//         }, 200);
//       } else {
//         applyTranslation();
//       }
//     };

//     // Add script if not exists
//     if (!document.getElementById("google-translate-script")) {
//       console.log("Adding Google Translate script");
//       const script = document.createElement("script");
//       script.id = "google-translate-script";
//       script.src =
//         "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//       script.async = true;
//       document.body.appendChild(script);
//     }

//     window.googleTranslateElementInit = initializeTranslate;

//     // Try to initialize immediately if already loaded
//     if (window.google?.translate) {
//       initializeTranslate();
//     }
//   }, []);

//   const currentLang = localStorage.getItem("selectedLang") || "en";

//   if (currentLang === "en") {
//     return null;
//   }

//   return <div id="google_translate_element" style={{ display: "none" }} />;
// };

// export default GoogleTranslate;

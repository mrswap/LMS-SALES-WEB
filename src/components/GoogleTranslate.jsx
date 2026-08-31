// import { useEffect } from "react";

// const GoogleTranslate = () => {
//   useEffect(() => {
//     const currentLang = localStorage.getItem("appLanguage") || "en";
//     const pendingLang = localStorage.getItem("pendingTranslation");

//     console.log("🌐 Current Lang:", currentLang);
//     console.log("⏳ Pending Lang:", pendingLang);

//     const getGoogleLangCode = (lang) => {
//       const map = {
//         en: "en",
//         hi: "hi",
//         pa: "pa", // Punjabi
//       };
//       return map[lang] || "en";
//     };

//     const googleLangCode = getGoogleLangCode(currentLang);

//     if (currentLang === "en") {
//       localStorage.removeItem("pendingTranslation");
//       const frame = document.querySelector(".goog-te-banner-frame");
//       if (frame) frame.remove();
//       // Remove translated classes
//       document.documentElement.lang = "en";
//       return;
//     }

//     const applyTranslation = () => {
//       const select = document.querySelector(".goog-te-combo");
//       if (select) {
//         const langToApply = getGoogleLangCode(pendingLang || currentLang);
//         console.log("🔄 Applying translation for:", langToApply);

//         // Try multiple ways to set language
//         select.value = langToApply;
//         select.dispatchEvent(new Event("change", { bubbles: true }));
//         select.dispatchEvent(new Event("click", { bubbles: true }));

//         // Try to find and select option
//         for (let i = 0; i < select.options.length; i++) {
//           if (select.options[i].value === langToApply) {
//             select.selectedIndex = i;
//             break;
//           }
//         }

//         // Force translation
//         if (window.google && window.google.translate) {
//           // Additional force
//         }

//         localStorage.removeItem("pendingTranslation");
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
//         console.log("✅ Creating translate element");
//         new window.google.translate.TranslateElement(
//           {
//             pageLanguage: "en",
//             includedLanguages: "en,hi,pa",
//             autoDisplay: false,
//           },
//           "google_translate_element",
//         );

//         setTimeout(() => {
//           if (!applyTranslation()) {
//             let attempts = 0;
//             const interval = setInterval(() => {
//               attempts++;
//               if (applyTranslation()) {
//                 clearInterval(interval);
//               } else if (attempts > 30) {
//                 clearInterval(interval);
//               }
//             }, 200);
//           }
//         }, 300);
//       } else {
//         applyTranslation();
//       }
//     };

//     // Remove old script
//     const oldScript = document.getElementById("google-translate-script");
//     if (oldScript) oldScript.remove();

//     // Add fresh script
//     const script = document.createElement("script");
//     script.id = "google-translate-script";
//     script.src =
//       "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//     script.async = true;
//     document.body.appendChild(script);

//     window.googleTranslateElementInit = initializeTranslate;

//     if (window.google?.translate) {
//       initializeTranslate();
//     }

//     return () => {
//       const frame = document.querySelector(".goog-te-banner-frame");
//       if (frame) frame.remove();
//     };
//   }, []);

//   const currentLang = localStorage.getItem("appLanguage") || "en";

//   if (currentLang === "en") {
//     return null;
//   }

//   return <div id="google_translate_element" style={{ display: "none" }} />;
// };

// export default GoogleTranslate;

import { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    const currentLang = localStorage.getItem("appLanguage") || "en";
    const pendingLang = localStorage.getItem("pendingTranslation");

    console.log("🌐 Current Lang:", currentLang);
    console.log("⏳ Pending Lang:", pendingLang);

    const getGoogleLangCode = (lang) => {
      const map = { en: "en", hi: "hi", pa: "pa" };
      return map[lang] || "en";
    };

    const googleLangCode = getGoogleLangCode(currentLang);

    if (currentLang === "en") {
      localStorage.removeItem("pendingTranslation");
      // Remove Google Translate UI
      const frame = document.querySelector(".goog-te-banner-frame");
      if (frame) frame.remove();
      document.documentElement.lang = "en";
      return;
    }

    const applyTranslation = () => {
      const select = document.querySelector(".goog-te-combo");
      if (select) {
        const langToApply = getGoogleLangCode(pendingLang || currentLang);
        console.log("🔄 Applying translation for:", langToApply);
        select.value = langToApply;
        select.dispatchEvent(new Event("change", { bubbles: true }));
        localStorage.removeItem("pendingTranslation");
        return true;
      }
      return false;
    };

    const initializeTranslate = () => {
      if (!window.google?.translate) {
        setTimeout(initializeTranslate, 100);
        return;
      }

      const element = document.getElementById("google_translate_element");
      if (element && !element.hasChildNodes()) {
        console.log("✅ Creating translate element");
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,pa",
            autoDisplay: false,
          },
          "google_translate_element",
        );

        setTimeout(() => {
          if (!applyTranslation()) {
            let attempts = 0;
            const interval = setInterval(() => {
              attempts++;
              if (applyTranslation()) {
                clearInterval(interval);
              } else if (attempts > 30) {
                clearInterval(interval);
              }
            }, 200);
          }
        }, 300);
      } else {
        applyTranslation();
      }
    };

    // Remove old script if any
    const oldScript = document.getElementById("google-translate-script");
    if (oldScript) oldScript.remove();

    // Add fresh script
    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = initializeTranslate;

    if (window.google?.translate) {
      initializeTranslate();
    }

    // ✅ Cleanup function: Jab component unmount ho, translation reset karo
    return () => {
      // Remove Google Translate banner
      const frame = document.querySelector(".goog-te-banner-frame");
      if (frame) frame.remove();

      // Reset page language to English
      document.documentElement.lang = "en";

      // Remove the translate element (optional)
      const translateElement = document.getElementById(
        "google_translate_element",
      );
      if (translateElement) {
        translateElement.innerHTML = ""; // Clear the widget
      }

      // Remove the script from DOM (optional, but not necessary)
      // const scriptTag = document.getElementById("google-translate-script");
      // if (scriptTag) scriptTag.remove();

      // Reset any Google Translate cookies or state? Not possible easily.
      // But removing banner and resetting lang is enough.
    };
  }, []);

  const currentLang = localStorage.getItem("appLanguage") || "en";

  if (currentLang === "en") {
    return null;
  }

  return <div id="google_translate_element" style={{ display: "none" }} />;
};

export default GoogleTranslate;

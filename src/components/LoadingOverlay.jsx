import { useEffect, useState } from "react";
import Loader from "../features/sales/common/Loader";

const LoadingOverlay = () => {
  const [show, setShow] = useState(false);
  const currentLang = localStorage.getItem("appLanguage") || "en";
  const pendingLang = localStorage.getItem("pendingTranslation");

  useEffect(() => {
    if (pendingLang && pendingLang !== "en") {
      setShow(true);

      // Check for translation completion
      const checkTranslation = setInterval(() => {
        const html = document.documentElement;
        // Google Translate adds this attribute when translation is done
        if (html.getAttribute("lang") === pendingLang) {
          setShow(false);
          localStorage.removeItem("pendingTranslation");
          clearInterval(checkTranslation);
        }
      }, 500);

      // Timeout after 5 seconds
      setTimeout(() => {
        setShow(false);
        clearInterval(checkTranslation);
      }, 5000);

      return () => clearInterval(checkTranslation);
    }
  }, [pendingLang]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 z-[9999] flex items-center justify-center">
      <Loader />
    </div>
  );
};

export default LoadingOverlay;

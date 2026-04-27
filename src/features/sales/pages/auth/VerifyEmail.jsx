// import { useEffect, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import axios from "axios";
// import {
//   FiMail,
//   FiArrowLeft,
//   FiCheckCircle,
//   FiAlertCircle,
// } from "react-icons/fi";
// import logo from "../../../../assets/admin/AvanteMedicalLogoBlue.png";
// import success from "../../../../assets/admin/success-right.png";

// const VerifyEmail = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [email, setEmail] = useState("");

//   useEffect(() => {
//     const verifyEmail = async () => {
//       const token = searchParams.get("token");

//       if (!token) {
//         setError("Invalid verification link");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get(
//           `/api/v1/trainee/verify-email?token=${token}`,
//         );
//         // Agar response se email mil raha hai toh set karo
//         if (response.data?.email) {
//           setEmail(response.data.email);
//         }
//       } catch (err) {
//         setError(err?.response?.data?.message || "Verification failed");
//       } finally {
//         setLoading(false);
//       }
//     };

//     verifyEmail();
//   }, [searchParams]);

//   // Loading State
//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-[#EEF2F6] px-4">
//         <div className="text-center mb-6">
//           <img
//             src={logo}
//             alt="Avante Medical"
//             className="w-[190px] h-[110px] object-contain"
//           />
//         </div>

//         <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 border border-gray-200">
//           <div className="text-center">
//             <div className="flex justify-center mb-4">
//               <FiMail className="w-12 h-12 text-[#22A699] animate-pulse" />
//             </div>
//             <h2 className="text-xl font-bold text-[#1F3C88] mb-2">
//               Verifying Email
//             </h2>
//             <p className="text-[#64748B] text-sm">
//               Please wait while we verify your email...
//             </p>
//             <div className="mt-4 flex justify-center">
//               <div className="w-6 h-6 border-2 border-[#22A699] border-t-transparent rounded-full animate-spin"></div>
//             </div>
//           </div>
//         </div>

//         <p className="text-xs text-gray-400 my-4">
//           © 2025 Avante Medical LMS · v2.1.0
//         </p>
//       </div>
//     );
//   }

//   // Success State
//   if (!loading && !error) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-[#EEF2F6] px-4">
//         <div className="text-center mb-6">
//           <img
//             src={logo}
//             alt="Avante Medical"
//             className="w-[190px] h-[110px] object-contain"
//           />
//         </div>

//         <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 border border-gray-200">
//           <div className="mb-6">
//             <div className="flex justify-center mb-2">
//               <img src={success} alt="" />
//             </div>
//             <h2 className="text-2xl text-center font-bold text-[#1F3C88]">
//               Email Verified!
//             </h2>
//             <p className="text-[#64748B] text-sm text-center mt-2">
//               Your email has been successfully verified.
//             </p>
//             {email && (
//               <p className="text-[#22A699] text-sm text-center font-semibold mt-1">
//                 {email}
//               </p>
//             )}
//           </div>

//           <div>
//             <button
//               onClick={() => navigate("/login")}
//               className="w-full bg-[#22A699] hover:bg-[#1c8c82] font-bold text-white py-2 rounded-lg cursor-pointer transition-colors"
//             >
//               Go to Login
//             </button>
//           </div>

//           <div className="mt-6 text-center text-sm text-[#64748B]">
//             <button
//               type="button"
//               onClick={() => navigate("/")}
//               className="inline-flex items-center text-[#64748B] text-sm hover:text-[#1F3C88] transition-colors"
//             >
//               <FiArrowLeft className="mr-1" size={16} />
//               Back to Home
//             </button>
//           </div>
//         </div>

//         <p className="text-xs text-gray-400 my-4">
//           © 2025 Avante Medical LMS · v2.1.0
//         </p>
//       </div>
//     );
//   }

//   // Error State
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-[#EEF2F6] px-4">
//       <div className="text-center mb-6">
//         <img
//           src={logo}
//           alt="Avante Medical"
//           className="w-[190px] h-[110px] object-contain"
//         />
//       </div>

//       <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 border border-gray-200">
//         <div className="mb-6">
//           <div className="flex justify-center mb-2">
//             <FiAlertCircle className="w-12 h-12 text-red-500" />
//           </div>
//           <h2 className="text-2xl text-center font-bold text-red-600">
//             Verification Failed
//           </h2>
//           <p className="text-[#64748B] text-sm text-center mt-2">{error}</p>
//         </div>

//         <div>
//           <button
//             onClick={() => window.location.reload()}
//             className="w-full bg-[#22A699] hover:bg-[#1c8c82] font-bold text-white py-2 rounded-lg cursor-pointer transition-colors"
//           >
//             Try Again
//           </button>
//           <button
//             onClick={() => navigate("/")}
//             className="mt-2 w-full text-gray-800 hover:text-gray-900 border border-[#1F3C88] border-2 py-2 rounded-lg cursor-pointer transition-colors"
//           >
//             Back to Home
//           </button>
//         </div>

//         <div className="mt-6 text-center text-sm text-[#64748B]">
//           <button
//             type="button"
//             onClick={() => navigate("/login")}
//             className="inline-flex items-center text-[#64748B] text-sm hover:text-[#1F3C88] transition-colors"
//           >
//             <FiArrowLeft className="mr-1" size={16} />
//             Go to Login
//           </button>
//         </div>
//       </div>

//       <p className="text-xs text-gray-400 my-4">
//         © 2025 Avante Medical LMS · v2.1.0
//       </p>
//     </div>
//   );
// };

// export default VerifyEmail;

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  FiMail,
  FiArrowLeft,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { useTranslation } from "react-i18next";
import logo from "../../../../assets/admin/AvanteMedicalLogoBlue.png";
import success from "../../../../assets/admin/success-right.png";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setError(t("verifyEmail.error.invalidLink"));
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `/api/v1/trainee/verify-email?token=${token}`,
        );
        // Agar response se email mil raha hai toh set karo
        if (response.data?.email) {
          setEmail(response.data.email);
        }
      } catch (err) {
        setError(
          err?.response?.data?.message || t("verifyEmail.error.defaultMessage"),
        );
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [searchParams, t]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#EEF2F6] px-4">
        <div className="text-center mb-6">
          <img
            src={logo}
            alt={t("verifyEmail.title")}
            className="w-[190px] h-[110px] object-contain"
          />
        </div>

        <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <FiMail className="w-12 h-12 text-[#22A699] animate-pulse" />
            </div>
            <h2 className="text-xl font-bold text-[#1F3C88] mb-2">
              {t("verifyEmail.loading.heading")}
            </h2>
            <p className="text-[#64748B] text-sm">
              {t("verifyEmail.loading.message")}
            </p>
            <div className="mt-4 flex justify-center">
              <div className="w-6 h-6 border-2 border-[#22A699] border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-400 my-4">{t("verifyEmail.footer")}</p>
      </div>
    );
  }

  // Success State
  if (!loading && !error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#EEF2F6] px-4">
        <div className="text-center mb-6">
          <img
            src={logo}
            alt={t("verifyEmail.title")}
            className="w-[190px] h-[110px] object-contain"
          />
        </div>

        <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="mb-6">
            <div className="flex justify-center mb-2">
              <img src={success} alt={t("verifyEmail.success.heading")} />
            </div>
            <h2 className="text-2xl text-center font-bold text-[#1F3C88]">
              {t("verifyEmail.success.heading")}
            </h2>
            <p className="text-[#64748B] text-sm text-center mt-2">
              {t("verifyEmail.success.message")}
            </p>
            {email && (
              <p className="text-[#22A699] text-sm text-center font-semibold mt-1">
                {email}
              </p>
            )}
          </div>

          <div>
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-[#22A699] hover:bg-[#1c8c82] font-bold text-white py-2 rounded-lg cursor-pointer transition-colors"
            >
              {t("verifyEmail.success.goToLogin")}
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-[#64748B]">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="inline-flex items-center text-[#64748B] text-sm hover:text-[#1F3C88] transition-colors"
            >
              <FiArrowLeft className="mr-1" size={16} />
              {t("verifyEmail.success.backToHome")}
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-400 my-4">{t("verifyEmail.footer")}</p>
      </div>
    );
  }

  // Error State
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#EEF2F6] px-4">
      <div className="text-center mb-6">
        <img
          src={logo}
          alt={t("verifyEmail.title")}
          className="w-[190px] h-[110px] object-contain"
        />
      </div>

      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="mb-6">
          <div className="flex justify-center mb-2">
            <FiAlertCircle className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-2xl text-center font-bold text-red-600">
            {t("verifyEmail.error.heading")}
          </h2>
          <p className="text-[#64748B] text-sm text-center mt-2">{error}</p>
        </div>

        <div>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-[#22A699] hover:bg-[#1c8c82] font-bold text-white py-2 rounded-lg cursor-pointer transition-colors"
          >
            {t("verifyEmail.error.tryAgain")}
          </button>
          <button
            onClick={() => navigate("/")}
            className="mt-2 w-full text-gray-800 hover:text-gray-900 border border-[#1F3C88] border-2 py-2 rounded-lg cursor-pointer transition-colors"
          >
            {t("verifyEmail.error.backToHome")}
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-[#64748B]">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="inline-flex items-center text-[#64748B] text-sm hover:text-[#1F3C88] transition-colors"
          >
            <FiArrowLeft className="mr-1" size={16} />
            {t("verifyEmail.error.goToLogin")}
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-400 my-4">{t("verifyEmail.footer")}</p>
    </div>
  );
};

export default VerifyEmail;

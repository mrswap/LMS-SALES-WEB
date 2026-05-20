import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiMail, FiArrowLeft, FiAlertCircle } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import logo from "../../../../assets/admin/AvanteMedicalLogoBlue.png";
import success from "../../../../assets/admin/success-right.png";
import { verifyEmail } from "../../../../redux/slice/authSlice";
import { getSiteSettings } from "../../../../redux/slice/commonSlice";
import Loader from "../../common/Loader";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Get state from Redux
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth,
  );

  const { siteSettings, isLoading: siteSettingsLoading } = useSelector(
    (state) => state.common,
  );
  useEffect(() => {
    dispatch(getSiteSettings());
  }, [dispatch]);

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [redirectCountdown, setRedirectCountdown] = useState(5);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setError(t("verifyEmail.error.invalidLink"));
      return;
    }

    // Dispatch the verifyEmail thunk
    dispatch(verifyEmail(token));
  }, [searchParams, t, dispatch]);

  // Auto-redirect to login after successful verification
  useEffect(() => {
    if (isSuccess && !isLoading) {
      const timer = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate("/login");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isSuccess, isLoading, navigate]);

  // Extract email from response if available
  useEffect(() => {
    if (isSuccess && !isLoading && message) {
      // Try to extract email from message or you can modify your authSlice to store email
      // For now, we'll keep the email state as is
    }
  }, [isSuccess, isLoading, message]);

  if (siteSettingsLoading) return <Loader />;

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#EEF2F6] px-4">
        <div className="text-center mb-6">
          <img
            src={siteSettings?.company_logo || ""}
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

        <p className="tracking-widest text-xs text-gray-400 my-6">
          {siteSettings?.footer_text}
        </p>
      </div>
    );
  }

  // Success State
  if (!isLoading && isSuccess && !isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#EEF2F6] px-4">
        <div className="text-center mb-6">
          <img
            src={siteSettings?.company_logo || ""}
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
            <p className="text-[#64748B] text-sm text-center mt-4">
              {t("verifyEmail.success.redirecting")} {redirectCountdown}{" "}
              {t("verifyEmail.success.seconds")}
            </p>
          </div>

          <div>
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-[#22A699] hover:bg-[#1c8c82] font-bold text-white py-2 rounded-lg cursor-pointer transition-colors"
            >
              {t("verifyEmail.success.goToLogin")} ({redirectCountdown})
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

        <p className="tracking-widest text-xs text-gray-400 my-6">
          {siteSettings?.footer_text}
        </p>
      </div>
    );
  }

  // Error State
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#EEF2F6] px-4">
      <div className="text-center mb-6">
        <img
          src={siteSettings?.company_logo || ""}
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
          <p className="text-[#64748B] text-sm text-center mt-2">
            {error || message || t("verifyEmail.error.defaultMessage")}
          </p>
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

      <p className="tracking-widest text-xs text-gray-400 my-6">
        {siteSettings?.footer_text}
      </p>
    </div>
  );
};

export default VerifyEmail;

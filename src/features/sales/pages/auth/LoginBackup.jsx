import React, { useState, useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import TextInput from "../../common/form/TextInput";
import logo from "../../../../assets/admin/AvanteMedicalLogoBlue.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../../redux/slice/authSlice";
import { useTranslation } from "react-i18next";
import { useToast } from "../../common/toast/ToastContext";
import { getSiteSettings } from "../../../../redux/slice/commonSlice";
import Loader from "../../common/Loader";

const Login = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const toast = useToast();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const languageDropdownRef = useRef(null);
  const { siteSettings, isLoading: siteSettingsLoading } = useSelector(
    (state) => state.common,
  );
  useEffect(() => {
    dispatch(getSiteSettings());
  }, [dispatch]);

  const { isLoading } = useSelector((state) => state.auth);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
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

  // Get current language from i18n
  const currentLanguage = i18n.language || "en";

  // Get language display name using translation
  const getLanguageDisplay = () => {
    switch (currentLanguage) {
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

  // Language change handler
  const handleLanguageChange = (selectedLang) => {
    i18n.changeLanguage(selectedLang);
    localStorage.setItem("appLanguage", selectedLang);
    setIsLanguageDropdownOpen(false);
  };

  // Language options using translation
  const languageOptions = [
    { code: "en", name: t("navbar.language.en"), label: "navbar.language.en" },
    { code: "hi", name: t("navbar.language.hi"), label: "navbar.language.hi" },
    { code: "pa", name: t("navbar.language.pa"), label: "navbar.language.pa" },
  ];

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("login.validation.emailInvalid"))
      .required(t("login.validation.emailRequired")),
    password: Yup.string().required(t("login.validation.passwordRequired")),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await dispatch(loginUser(values)).unwrap();
      toast.success(
        res?.message || t("login.successMessage") || "Login Successful",
      );
      navigate("/");
    } catch (err) {
      toast.error(
        err?.message || t("login.errorMessage") || "Something went wrong",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (siteSettingsLoading) return <Loader />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#EEF2F6] px-4 sm:px-6">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-5 sm:p-6 border border-gray-200">
        {/* Language Dropdown - Exactly like Navbar */}
        <div
          className="relative mb-4 flex justify-end"
          ref={languageDropdownRef}
        >
          <button
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-1.5 sm:py-2 border border-gray-300 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
          >
            <span className="text-gray-700 text-sm sm:text-base font-medium">
              {getLanguageDisplay()}
            </span>
            <IoMdArrowDropdown
              className={`text-gray-500 transition-transform duration-200 ${isLanguageDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Language Dropdown Menu */}
          {isLanguageDropdownOpen && (
            <div className="absolute right-0 mt-8 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100 animate-fadeIn">
              {languageOptions.map((option) => (
                <button
                  key={option.code}
                  onClick={() => handleLanguageChange(option.code)}
                  className={`w-full px-4 py-2 text-left text-sm flex items-center gap-3 transition-colors duration-150 ${
                    currentLanguage === option.code
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>{option.name}</span>
                  {currentLanguage === option.code && (
                    <span className="ml-auto text-blue-600">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Logo */}
        <div className="text-center mb-4 ">
          {siteSettings?.company_logo && (
            <img
              src={siteSettings.company_logo}
              alt="logo"
              className="mx-auto w-[160px] sm:w-[160px] h-[100px]"
            />
          )}
          <p className="text-gray-500 text-sm mt-2">{t("login.title")}</p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4 sm:space-y-5">
              {/* Email */}
              <div>
                <label className="text-[#29324C] font-medium text-sm mb-1 block">
                  {t("login.emailLabel")}
                </label>
                <div className="relative">
                  <FiMail className="absolute top-2 left-2 sm:top-3 sm:left-3 text-gray-400" />
                  <TextInput
                    name="email"
                    placeholder={t("login.emailPlaceholder")}
                    className="!pl-10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <label className="text-[#29324C] font-medium">
                    {t("login.passwordLabel")}
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    {t("login.forgotPassword")}
                  </Link>
                </div>

                <div className="relative">
                  <FiLock className="absolute top-2 left-2 sm:top-3 sm:left-3 text-gray-400" />
                  <TextInput
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("login.passwordPlaceholder")}
                    className="!pl-10 !pr-10"
                  />
                  {showPassword ? (
                    <FiEyeOff
                      onClick={() => setShowPassword(false)}
                      className="absolute top-3 right-3 text-gray-400 cursor-pointer"
                    />
                  ) : (
                    <FiEye
                      onClick={() => setShowPassword(true)}
                      className="absolute top-3 right-3 text-gray-400 cursor-pointer"
                    />
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || isSubmitting}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2.5 rounded-md font-medium transition-colors"
              >
                {isLoading ? t("login.loading") : t("login.button")}
              </button>
            </Form>
          )}
        </Formik>

        {/* <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">{t("login.or")}</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <p className="text-gray-600 text-sm text-center mb-3">
          {t("login.newEmployee")}
        </p>

        <button
          onClick={() => navigate("/register")}
          className="w-full border border-blue-500 text-blue-600 py-2 rounded-md font-medium hover:bg-blue-50 transition"
        >
          {t("login.completeEmployeeOnboarding")}
        </button> */}

        <div className="text-xs text-gray-400 mt-6 text-center">
          <p className="tracking-widest mb-2">{t("login.secureLogin")}</p>

          <div className="flex justify-center gap-2 flex-wrap">
            <span
              onClick={() => navigate("/terms-conditions-info")}
              className="hover:underline cursor-pointer"
            >
              {t("login.termsAndConditions")}
            </span>

            <span>/</span>

            <span
              onClick={() => navigate("/policy-info")}
              className="hover:underline cursor-pointer"
            >
              {t("login.privacyPolicy")}
            </span>
          </div>

          <div className="flex justify-center gap-2 mt-1 flex-wrap">
            <span
              onClick={() => navigate("/about-us-info")}
              className="hover:underline cursor-pointer"
            >
              {t("login.aboutUs")}
            </span>

            <span>/</span>

            <span
              onClick={() => navigate("/troubleshooting")}
              className="hover:underline cursor-pointer"
            >
              {t("login.troubleshooting")}
            </span>
          </div>
        </div>
      </div>

      <p className="tracking-widest text-xs text-gray-400 my-6">
        {siteSettings?.footer_text}
      </p>
    </div>
  );
};

export default Login;

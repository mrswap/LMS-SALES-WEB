import React, { useState, useRef, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import TextInput from "../../common/form/TextInput";
import FormButton from "../../common/form/FormButton";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../common/toast/ToastContext";
import { forgotPassword } from "../../../../redux/slice/authSlice";
import { useTranslation } from "react-i18next";
import { getSiteSettings } from "../../../../redux/slice/commonSlice";
import Loader from "../../common/Loader";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { t, i18n } = useTranslation();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const languageDropdownRef = useRef(null);
  const { siteSettings, isLoading: siteSettingsLoading } = useSelector(
    (state) => state.common,
  );
  useEffect(() => {
    dispatch(getSiteSettings());
  }, [dispatch]);

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
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("forgotPassword.validation.emailInvalid"))
      .required(t("forgotPassword.validation.emailRequired")),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await dispatch(forgotPassword(values)).unwrap();
      toast.success(t("forgotPassword.successMessage"));
      setTimeout(() => {
        navigate("/check-email");
      }, 2000);
    } catch (err) {
      toast.error(err?.message || t("forgotPassword.errorMessage"));
      setSubmitting(false);
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
        <div className="text-center mb-4">
          {siteSettings?.company_logo && (
            <img
              src={siteSettings?.company_logo || ""}
              alt="logo"
              className="mx-auto w-[160px] sm:w-[160px] h-[100px]"
            />
          )}

          {/* <p className="text-gray-500 text-sm mt-2">
            {t("forgotPassword.title")}
          </p> */}
        </div>

        {/* Heading */}
        <div className="mb-6">
          {/* <div className="flex justify-center mb-2">
            <span className="bg-[#EFF6FF] px-3 py-3 rounded-full">
              <FiMail size={20} className="text-primary" />
            </span>
          </div> */}
          <h2 className="text-2xl text-center font-bold text-primary">
            {t("forgotPassword.heading")}
          </h2>
          <p className="text-[#64748B] text-sm text-center mt-2">
            {t("forgotPassword.description")}
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              {/* Email field */}
              <div>
                <div className="relative">
                  <FiMail
                    size={18}
                    className="absolute top-7 sm:top-9 left-3 text-primary"
                  />
                  <TextInput
                    label={t("forgotPassword.emailLabel")}
                    name="email"
                    type="email"
                    placeholder={t("forgotPassword.emailPlaceholder")}
                    className="!pl-10"
                  />
                </div>
              </div>

              {/* Send Link Button */}
              <FormButton
                text={
                  isSubmitting
                    ? t("forgotPassword.sendingButton")
                    : t("forgotPassword.sendLinkButton")
                }
                className="cursor-pointer"
                loading={isSubmitting}
                type="submit"
              />

              {/* Help text */}
              <div className="text-center text-sm text-[#64748B]">
                <p>
                  {t("forgotPassword.helpText")}{" "}
                  <Link
                    to="/check-email"
                    className="text-[#1F3C88] hover:underline font-medium"
                  >
                    {t("forgotPassword.checkSpam")}
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>

        {/* Sign in link */}
        <div className="mt-6 text-center text-sm text-[#64748B]">
          <p>
            {t("forgotPassword.signInText")}{" "}
            <a
              href="/login"
              className="text-[#1F3C88] font-medium hover:underline"
            >
              {t("forgotPassword.signInLink")}
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <p className="tracking-widest text-xs text-gray-400 mt-6">
        {siteSettings?.footer_text}
      </p>
    </div>
  );
};

export default ForgotPassword;

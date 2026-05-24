import React, { useEffect, useState, useRef } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";

import TextInput from "../../common/form/TextInput";
import FormButton from "../../common/form/FormButton";
import logo from "../../../../assets/admin/AvanteMedicalLogoBlue.png";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../common/toast/ToastContext";
import { resetPassword } from "../../../../redux/slice/authSlice";
import { useTranslation } from "react-i18next";
import { getSiteSettings } from "../../../../redux/slice/commonSlice";
import Loader from "../../common/Loader";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { t, i18n } = useTranslation();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const languageDropdownRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

  // Get token from URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  // Validation Schema
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, t("resetPassword.validation.passwordMin"))
      // .matches(/[A-Z]/, t("resetPassword.validation.passwordUppercase"))
      // .matches(/[0-9]/, t("resetPassword.validation.passwordNumber"))
      // .matches(/[!@#$%^&*]/, t("resetPassword.validation.passwordSpecialChar"))
      .required(t("resetPassword.validation.passwordRequired")),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], t("resetPassword.validation.passwordMatch"))
      .required(t("resetPassword.validation.confirmPasswordRequired")),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    const payload = {
      password: values.password,
      password_confirmation: values.confirmPassword,
      token: token,
    };

    try {
      const res = await dispatch(resetPassword(payload)).unwrap();
      toast.success(res?.message || t("resetPassword.successMessage"));
      navigate("/login");
    } catch (err) {
      toast.error(err?.message || t("resetPassword.errorMessage"));
    } finally {
      setSubmitting(false);
    }
  };

  if (siteSettingsLoading) return <Loader />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#EEF2F6] px-4">
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
          <img
            src={siteSettings?.company_logo || ""}
            alt={t("resetPassword.title")}
            className="mx-auto w-[160px] sm:w-[160px] h-[100px]"
          />
        </div>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-center text-[#1F3C88]">
          {t("resetPassword.heading")}
        </h2>

        <p className="text-sm text-gray-500 text-center mt-2 mb-6">
          {t("resetPassword.description")}
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* New Password */}
              <div className="relative">
                <FiLock className="absolute top-9 left-3 text-primary" />

                <TextInput
                  name="password"
                  label={t("resetPassword.newPasswordLabel")}
                  type={showPassword ? "text" : "password"}
                  placeholder={t("resetPassword.newPasswordPlaceholder")}
                  className="!pl-10"
                />

                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 cursor-pointer text-gray-400"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </div>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <FiLock className="absolute top-9 left-3 text-primary" />

                <TextInput
                  name="confirmPassword"
                  label={t("resetPassword.confirmPasswordLabel")}
                  type={showConfirm ? "text" : "password"}
                  placeholder={t("resetPassword.confirmPasswordPlaceholder")}
                  className="!pl-10"
                />

                <div
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-9 cursor-pointer text-gray-400"
                >
                  {showConfirm ? <FiEyeOff /> : <FiEye />}
                </div>
              </div>

              {/* Button */}
              <FormButton
                text={
                  isSubmitting
                    ? t("resetPassword.updatingButton")
                    : t("resetPassword.updateButton")
                }
                loading={isSubmitting}
                type="submit"
                className="bg-[#22A699] hover:bg-[#1d8f85] text-white py-2.5 rounded-lg w-full cursor-pointer"
              />
            </Form>
          )}
        </Formik>

        {/* Sign in link */}
        <div className="mt-6 text-center text-sm text-[#64748B]">
          <p>
            {t("resetPassword.signInText")}{" "}
            <a
              href="/login"
              className="text-[#1F3C88] font-medium hover:underline"
            >
              {t("resetPassword.signInLink")}
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <p className="tracking-widest text-xs text-gray-400 my-6">
        {siteSettings?.footer_text}
      </p>
    </div>
  );
};

export default ResetPassword;

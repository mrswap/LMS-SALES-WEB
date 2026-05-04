import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

import TextInput from "../../common/form/TextInput";
import FormButton from "../../common/form/FormButton";

import logo from "../../../../assets/admin/AvanteMedicalLogoBlue.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../../redux/slice/authSlice";
import { useTranslation } from "react-i18next";
import { useToast } from "../../common/toast/ToastContext";

const Login = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const toast = useToast();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const { isLoading } = useSelector((state) => state.auth);

  // Language change handler
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng); // Save to localStorage
  };

  const initialValues = {
    email: "kajalcharve6@gmail.com",
    password: "123456",
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#EEF2F6] px-4 sm:px-6">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-5 sm:p-6 border border-gray-200">
        {/* Language Dropdown - Working Now */}
        <div className="w-full max-w-md flex justify-end">
          <select
            className="text-sm border border-gray-300 rounded-md px-3 py-1 bg-white"
            value={i18n.language} // Current language set karo
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value="en">🌐 English</option>
            <option value="hi">🌐 हिंदी</option>
            {/* Aur languages add kar sakte ho */}
          </select>
        </div>

        {/* Logo */}
        <div className="text-center mb-4">
          <img
            src={logo}
            alt="logo"
            className="mx-auto w-[160px] sm:w-[190px]"
          />
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
              <div className="relative">
                <FiMail className="absolute top-7 sm:top-10 left-3 text-gray-400" />
                <TextInput
                  name="email"
                  label={t("login.emailLabel")}
                  placeholder={t("login.emailPlaceholder")}
                  className="!pl-10"
                />
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
                  <FiLock className="absolute top-2 sm:top-3 left-3 text-gray-400" />

                  <TextInput
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("login.passwordPlaceholder")}
                    className="!pl-10 !pr-10"
                  />

                  {showPassword ? (
                    <FiEyeOff
                      onClick={() => setShowPassword(false)}
                      className="absolute top-2 sm:top-3 right-3 text-gray-400 cursor-pointer"
                    />
                  ) : (
                    <FiEye
                      onClick={() => setShowPassword(true)}
                      className="absolute top-2 sm:top-3 right-3 text-gray-400 cursor-pointer"
                    />
                  )}
                </div>
              </div>

              {/* Stay Logged */}
              {/* <div className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" />
                <span>{t("login.stayLoggedIn")}</span>
              </div> */}
              <button
                type="submit"
                disabled={isLoading || isSubmitting}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2.5 rounded-md"
              >
                {isLoading ? t("login.loading") : t("login.button")}
              </button>
            </Form>
          )}
        </Formik>

        {/* OR */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">{t("login.or")}</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* New Employee */}
        <p className="text-gray-600 text-sm text-center mb-3">
          {t("login.newEmployee")}
        </p>

        <button
          onClick={() => navigate("/register")}
          className="w-full border border-blue-500 text-blue-600 py-2 rounded-md font-medium hover:bg-blue-50 transition"
        >
          {t("login.completeEmployeeOnboarding")}
        </button>

        {/* Footer */}
        <div className="text-xs text-gray-400 mt-6 text-center">
          <p className="tracking-widest mb-2">{t("login.secureLogin")}</p>
          <div className="flex justify-center gap-2">
            <span className="hover:underline cursor-pointer">
              {t("login.termsOfService")}
            </span>
            <span>/</span>
            <span className="hover:underline cursor-pointer">
              {t("login.privacyPolicy")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

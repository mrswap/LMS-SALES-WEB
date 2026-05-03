import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import TextInput from "../../common/form/TextInput";
import FormButton from "../../common/form/FormButton";
import logo from "../../../../assets/admin/AvanteMedicalLogoBlue.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useToast } from "../../common/toast/ToastContext";
import { forgotPassword } from "../../../../redux/slice/authSlice";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { t, i18n } = useTranslation();

  // Language change handler
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

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
        navigate("/reset-password");
      }, 2000);
    } catch (err) {
      toast.error(err?.message || t("forgotPassword.errorMessage"));
      setSubmitting(false);
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
            value={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value="en">🌐 English</option>
            <option value="hi">🌐 हिंदी</option>
          </select>
        </div>

        {/* Logo */}
        <div className="text-center mb-4">
          <img
            src={logo}
            alt="logo"
            className="mx-auto w-[160px] sm:w-[190px]"
          />
          <p className="text-gray-500 text-sm mt-2">
            {t("forgotPassword.title")}
          </p>
        </div>

        {/* Heading */}
        <div className="mb-6">
          <div className="flex justify-center mb-2">
            <span className="bg-[#EFF6FF] px-3 py-3 rounded-full">
              <FiMail size={20} className="text-primary" />
            </span>
          </div>
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
              href="/register"
              className="text-[#1F3C88] font-medium hover:underline"
            >
              {t("forgotPassword.signInLink")}
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <p className="text-xs text-gray-400 my-4">{t("forgotPassword.footer")}</p>
    </div>
  );
};

export default ForgotPassword;

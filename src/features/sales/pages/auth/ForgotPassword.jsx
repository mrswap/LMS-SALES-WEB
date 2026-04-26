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

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await dispatch(forgotPassword(values)).unwrap();
      toast.success("Link sent successfully to your mail. Please check.");
      setTimeout(() => {
        navigate("/reset-password");
      }, 2000);
    } catch (err) {
      toast.error(err?.message || "Login Failed");
      setSubmitting(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#EEF2F6] px-4 sm:px-6">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-5 sm:p-6 border border-gray-200">
        {/* Language Dropdown */}
        <div className="w-full max-w-md flex justify-end">
          <select className="text-sm border border-gray-300 rounded-md px-3 py-1 bg-white">
            <option>🌐 Language</option>
          </select>
        </div>
        {/* Logo */}
        <div className="text-center mb-4">
          <img
            src={logo}
            alt="logo"
            className="mx-auto w-[160px] sm:w-[190px]"
          />
          <p className="text-gray-500 text-sm mt-2">Avante Medical LMS</p>
        </div>
        {/* Heading */}
        <div className="mb-6">
          <div className="flex justify-center mb-2">
            <span className="bg-[#EFF6FF] px-3 py-3 rounded-full">
              <FiMail size={20} className="text-primary" />
            </span>
          </div>
          <h2 className="text-2xl text-center font-bold text-primary">
            Forgot Password?
          </h2>
          <p className="text-[#64748B] text-sm text-center mt-2">
            Enter your email address and we'll send you a link to reset your
            password.
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
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="!pl-10"
                  />
                </div>
              </div>

              {/* Send Link Button */}
              <FormButton
                text={isSubmitting ? "Sending..." : "Send Reset Link"}
                className="cursor-pointer"
                loading={isSubmitting}
                type="submit"
              />

              {/* Help text */}
              <div className="text-center text-sm text-[#64748B]">
                <p>
                  Didn't receive the email?{" "}
                  <Link
                    to="/check-email"
                    className="text-[#1F3C88] hover:underline font-medium"
                  >
                    Check spam folder
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
        {/* Sign in link */}
        <div className="mt-6 text-center text-sm text-[#64748B]">
          <p>
            Remember your password?{" "}
            <a
              href="/signin"
              className="text-[#1F3C88] font-medium hover:underline"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <p className="text-xs text-gray-400 my-4">
        © 2025 Avante Medical LMS · v2.1.0
      </p>
    </div>
  );
};

export default ForgotPassword;

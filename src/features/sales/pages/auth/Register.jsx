import React, { useState, useRef, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUser,
  FiPhone,
  FiMapPin,
  FiBriefcase,
  FiCamera,
  FiTrash2,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../common/toast/ToastContext";
import { registerUser } from "../../../../redux/slice/authSlice";
import { TextInput, SelectField } from "../../common/form";
import logo from "../../../../assets/admin/AvanteMedicalLogoBlue.png";
import { useTranslation } from "react-i18next";
import { getDesignations, getRoles } from "../../../../redux/slice/commonSlice";
import countriesData from "../../../../data/countries.json";

const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  // Language change handler
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  // API calls on component mount
  useEffect(() => {
    dispatch(getRoles());
    dispatch(getDesignations());
  }, [dispatch]);

  // Get designations from Redux store
  const { designations } = useSelector((state) => state.common);

  // Convert API designations to SelectField options format
  const designationOptions =
    designations?.map((des) => ({
      label: des.name,
      value: des.id,
    })) || [];

  // Get countries from JSON file
  const countryOptions = countriesData.countries || [];

  // Form initial values
  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    employee_id: "",
    designation_id: null,
    country: null,
    city: "indore",
    password: "123456",
    password_confirmation: "123456",
    profile_image: null,
  };

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required(t("register.validation.nameRequired")),
    email: Yup.string()
      .email(t("register.validation.emailInvalid"))
      .required(t("register.validation.emailRequired")),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, t("register.validation.mobileInvalid"))
      .required(t("register.validation.mobileRequired")),
    employee_id: Yup.string().required(
      t("register.validation.employeeIdRequired"),
    ),
    designation_id: Yup.object()
      .nullable()
      .required(t("register.validation.designationRequired")),
    country: Yup.object()
      .nullable()
      .required(t("register.validation.countryRequired")),
    city: Yup.string().required(t("register.validation.cityRequired")),
    password: Yup.string()
      .min(8, t("register.validation.passwordMin"))
      .required(t("register.validation.passwordRequired")),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password")], t("register.validation.passwordMatch"))
      .required(t("register.validation.confirmPasswordRequired")),
  });

  // Handle profile image change
  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!validTypes.includes(file.type)) {
        toast.error(t("register.validation.imageInvalidType"));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error(t("register.validation.imageSizeExceed"));
        return;
      }

      setFieldValue("profile_image", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle remove profile image
  const handleRemoveImage = (setFieldValue) => {
    setFieldValue("profile_image", null);
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Form submission handler
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("mobile", values.mobile);
      formData.append("password", values.password);
      formData.append("password_confirmation", values.password_confirmation);
      formData.append("employee_id", values.employee_id);
      formData.append("designation_id", values.designation_id.value);
      formData.append("region", values.country.value);
      formData.append("city", values.city);
      formData.append("source", "web");

      if (values.profile_image) {
        formData.append("profile_image", values.profile_image);
      }

      await dispatch(registerUser(formData)).unwrap();
      toast.success(t("register.successMessage"));

      // Reset form and clear image
      resetForm();
      if (preview) {
        URL.revokeObjectURL(preview);
        setPreview(null);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      navigate("/check-email");
    } catch (error) {
      toast.error(error?.message || t("register.errorMessage"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#EEF2F6] px-4 sm:px-6 py-8">
      {/* Card */}
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm p-5 sm:p-6 border border-gray-200">
        {/* Language Dropdown - Working Now */}
        <div className="w-full flex justify-end mb-4">
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
        <div className="text-center mb-6">
          <img
            src={logo}
            alt="logo"
            className="mx-auto w-[160px] sm:w-[190px]"
          />
          <p className="text-gray-500 text-sm mt-2">{t("register.subtitle")}</p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="space-y-4 sm:space-y-5">
              {/* Name with Icon */}
              <div className="relative">
                <FiUser className="absolute top-7 sm:top-9 left-3 text-gray-400 z-10" />
                <TextInput
                  name="name"
                  label={t("register.fullNameLabel")}
                  placeholder={t("register.fullNamePlaceholder")}
                  className="!pl-10"
                  required
                />
              </div>

              {/* Email with Icon */}
              <div className="relative">
                <FiMail className="absolute top-7 sm:top-9 left-3 text-gray-400 z-10" />
                <TextInput
                  name="email"
                  label={t("register.emailLabel")}
                  placeholder={t("register.emailPlaceholder")}
                  className="!pl-10"
                  required
                />
              </div>

              {/* Mobile + Employee ID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <FiPhone className="absolute top-7 sm:top-9 left-3 text-gray-400 z-10" />
                  <TextInput
                    name="mobile"
                    label={t("register.mobileLabel")}
                    placeholder={t("register.mobilePlaceholder")}
                    className="!pl-10"
                    required
                  />
                </div>

                <div className="relative">
                  <FiBriefcase className="absolute top-7 sm:top-9 left-3 text-gray-400 z-10" />
                  <TextInput
                    name="employee_id"
                    label={t("register.employeeIdLabel")}
                    placeholder={t("register.employeeIdPlaceholder")}
                    className="!pl-10"
                    required
                  />
                </div>
              </div>

              {/* Designation + Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectField
                  name="designation_id"
                  label={t("register.designationLabel")}
                  options={designationOptions}
                  placeholder={
                    designationOptions.length === 0
                      ? t("register.designationLoading")
                      : t("register.designationPlaceholder")
                  }
                  required
                />

                <SelectField
                  name="country"
                  label={t("register.countryLabel")}
                  options={countryOptions}
                  placeholder={t("register.countryPlaceholder")}
                  required
                />
              </div>

              {/* City with Icon */}
              <div className="relative">
                <FiMapPin className="absolute top-7 sm:top-9 left-3 text-gray-400 z-0" />
                <TextInput
                  name="city"
                  label={t("register.cityLabel")}
                  placeholder={t("register.cityPlaceholder")}
                  className="!pl-10"
                  required
                />
              </div>

              {/* Password with Icon */}
              <div className="relative">
                <FiLock className="absolute top-7 sm:top-9 left-3 text-gray-400 z-10" />
                <TextInput
                  name="password"
                  label={t("register.passwordLabel")}
                  type={showPassword ? "text" : "password"}
                  placeholder={t("register.passwordPlaceholder")}
                  className="!pl-10 !pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-7 sm:top-9 text-gray-400"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>

              {/* Confirm Password with Icon */}
              <div className="relative">
                <FiLock className="absolute top-7 sm:top-9 left-3 text-gray-400 z-10" />
                <TextInput
                  name="password_confirmation"
                  label={t("register.confirmPasswordLabel")}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={t("register.confirmPasswordPlaceholder")}
                  className="!pl-10 !pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-7 sm:top-9 text-gray-400"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </button>
              </div>

              {/* Profile Image */}
              <div>
                <label className="block mb-2 text-[#29324C] font-medium text-xs sm:text-sm">
                  {t("register.profileImageLabel")}
                </label>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  {/* Image Preview */}
                  <div className="relative group flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-300 shadow-sm">
                      {preview ? (
                        <img
                          src={preview}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FiUser className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* Button Group */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-1.5 text-sm bg-white border border-gray-300 hover:border-gray-400 rounded-md text-gray-700 flex items-center gap-2 transition-all"
                    >
                      <FiCamera size={14} />
                      {preview
                        ? t("register.changePhoto")
                        : t("register.uploadPhoto")}
                    </button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, setFieldValue)}
                      className="hidden"
                    />

                    {preview && (
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(setFieldValue)}
                        className="px-4 py-1.5 text-sm bg-white border border-gray-300 hover:border-red-300 hover:bg-red-50 rounded-md text-gray-600 hover:text-red-600 flex items-center gap-2 transition-all"
                      >
                        <FiTrash2 size={14} />
                        {t("register.removePhoto")}
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  {t("register.imageSupportedText")}
                </p>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2.5 rounded-md font-medium transition disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isSubmitting
                  ? t("register.registeringButton")
                  : t("register.registerButton")}
              </button>
            </Form>
          )}
        </Formik>

        {/* OR Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">{t("register.or")}</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Already have account */}
        <p className="text-gray-600 text-sm text-center mb-3">
          {t("register.alreadyAccount")}
        </p>

        <button
          onClick={() => navigate("/login")}
          className="w-full border border-teal-500 text-teal-600 py-2 rounded-md font-medium hover:bg-teal-50 transition text-sm sm:text-base"
        >
          {t("register.loginButton")}
        </button>

        {/* Footer */}
        <div className="text-xs text-gray-400 mt-6 text-center">
          <p className="tracking-widest mb-2">
            {t("register.secureRegistration")}
          </p>
          <div className="flex justify-center gap-2">
            <span className="hover:underline cursor-pointer">
              {t("register.termsOfService")}
            </span>
            <span>/</span>
            <span className="hover:underline cursor-pointer">
              {t("register.privacyPolicy")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

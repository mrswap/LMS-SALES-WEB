// import React, { useState } from "react";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import {
//   PageBody,
//   PageHeader,
//   PageHeaderLeft,
//   PageLayout,
//   PageSubtitle,
//   PageTitle,
// } from "../../common/layout";
// import { TextInput, SelectField } from "../../common/form";
// import { useToast } from "../../common/toast/ToastContext";
// import { registerUser } from "../../../../redux/slice/authSlice";
// import { useDispatch } from "react-redux";

// const Register = () => {
//   const navigate = useNavigate();
//   const [preview, setPreview] = useState(null);
//   const toast = useToast();
//   const dispatch = useDispatch();

//   const designationOptions = [
//     { label: "Executive", value: 1 },
//     { label: "Manager", value: 2 },
//   ];

//   const regionOptions = [
//     { label: "North", value: "north" },
//     { label: "South", value: "south" },
//   ];

//   const initialValues = {
//     name: "ajay",
//     email: "ajay@gmail.com",
//     mobile: "8982251030",
//     password: "123456",
//     password_confirmation: "123456",
//     employee_id: "1234",
//     designation_id: null,
//     region: null,
//     city: "",
//     profile_image: null,
//   };

//   const validationSchema = Yup.object({
//     name: Yup.string().required("Name required"),
//     email: Yup.string().email("Invalid email").required("Email required"),
//     mobile: Yup.string().required("Mobile required"),
//     password: Yup.string().min(6).required("Password required"),
//     password_confirmation: Yup.string()
//       .oneOf([Yup.ref("password")], "Password must match")
//       .required("Confirm password required"),
//     designation_id: Yup.object().required("Designation required"),
//     region: Yup.object().required("Region required"),
//     city: Yup.string().required("City required"),
//   });

//   const onSubmit = async (values, { setSubmitting, resetForm }) => {
//     try {
//       const formData = new FormData();

//       formData.append("name", values.name);
//       formData.append("email", values.email);
//       formData.append("mobile", values.mobile);
//       formData.append("password", values.password);
//       formData.append("password_confirmation", values.password_confirmation);
//       formData.append("employee_id", values.employee_id);
//       formData.append("designation_id", values.designation_id.value);
//       formData.append("region", values.region.value);
//       formData.append("city", values.city);

//       if (values.profile_image) {
//         formData.append("profile_image", values.profile_image);
//       }

//       console.log("FORM DATA:");
//       for (let [key, value] of formData.entries()) {
//         console.log(key, value);
//       }

//       await dispatch(registerUser(formData)).unwrap();
//       toast.success("User created successfully ");
//       resetForm();
//       setPreview(null);
//       navigate("/login");
//     } catch (error) {
//       toast.error(error?.message || "Error creating user");
//       console.log(error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <PageLayout>
//       <div className="p-6 max-w-4xl mx-auto">
//         <PageHeader className="mb-6">
//           <PageHeaderLeft>
//             <PageTitle>Register</PageTitle>
//             <PageSubtitle>Create your account</PageSubtitle>
//           </PageHeaderLeft>
//         </PageHeader>

//         <PageBody>
//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={onSubmit}
//           >
//             {({ isSubmitting, setFieldValue, handleSubmit, values }) => (
//               <Form className="space-y-4">
//                 {/* NAME + EMAIL */}
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <TextInput name="name" label="Full Name" required />
//                   <TextInput name="email" label="Email" required />
//                 </div>

//                 {/* MOBILE + EMPLOYEE */}
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <TextInput name="mobile" label="Mobile" required />
//                   <TextInput name="employee_id" label="Employee ID" />
//                 </div>

//                 {/* DESIGNATION + REGION */}
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <SelectField
//                     name="designation_id"
//                     label="Designation"
//                     options={designationOptions}
//                     required
//                   />
//                   <SelectField
//                     name="region"
//                     label="Region"
//                     options={regionOptions}
//                     required
//                   />
//                 </div>

//                 {/* CITY */}
//                 <TextInput name="city" label="City" required />

//                 {/* PASSWORD */}
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <TextInput
//                     name="password"
//                     label="Password"
//                     type="password"
//                     required
//                   />
//                   <TextInput
//                     name="password_confirmation"
//                     label="Confirm Password"
//                     type="password"
//                     required
//                   />
//                 </div>

//                 {/* PROFILE IMAGE */}
//                 <div>
//                   <label className="block mb-2 font-medium">
//                     Profile Image
//                   </label>

//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => {
//                       const file = e.target.files[0];
//                       setFieldValue("profile_image", file);

//                       if (file) {
//                         setPreview(URL.createObjectURL(file));
//                       }
//                     }}
//                     className="border p-2 rounded w-full"
//                   />

//                   {preview && (
//                     <img
//                       src={preview}
//                       alt="preview"
//                       className="mt-3 w-20 h-20 object-cover rounded-full"
//                     />
//                   )}
//                 </div>

//                 {/* BUTTON */}
//                 <div className="flex justify-end mt-4">
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                   >
//                     {isSubmitting ? "Creating..." : "Register"}
//                   </button>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </PageBody>
//       </div>
//     </PageLayout>
//   );
// };

// export default Register;

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

const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

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
      label: des.name, // Designation name show hoga
      value: des.id, // Designation ID submit hoga
    })) || [];

  // Region options (hardcoded for now, can be from API too)
  const regionOptions = [
    { label: "North", value: "north" },
    { label: "South", value: "south" },
    { label: "East", value: "east" },
    { label: "West", value: "west" },
  ];

  // Form initial values
  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    employee_id: "",
    designation_id: null,
    region: null,
    city: "",
    password: "",
    password_confirmation: "",
    profile_image: null,
  };

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name required"),
    email: Yup.string().email("Invalid email").required("Email required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Mobile required"),
    employee_id: Yup.string().required("Employee ID required"),
    designation_id: Yup.object().nullable().required("Designation required"),
    region: Yup.object().nullable().required("Region required"),
    city: Yup.string().required("City required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password required"),
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
        toast.error("Please upload a valid image file (JPEG, PNG, GIF, WEBP)");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      // setFieldValue("profile_image", file);
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
      formData.append("region", values.region.value);
      formData.append("city", values.city);

      if (values.profile_image) {
        formData.append("profile_image", values.profile_image);
      }

      await dispatch(registerUser(formData)).unwrap();
      toast.success("Registration successful! Please login.");
      resetForm();
      handleRemoveImage();
      navigate("/check-email");
    } catch (error) {
      toast.error(error?.message || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#EEF2F6] px-4 sm:px-6 py-8">
      {/* Card */}
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm p-5 sm:p-6 border border-gray-200">
        {/* Language Dropdown */}
        <div className="w-full flex justify-end mb-4">
          <select className="text-sm border border-gray-300 rounded-md px-3 py-1 bg-white">
            <option>🌐 {t("login.language") || "English"}</option>
          </select>
        </div>

        {/* Logo */}
        <div className="text-center mb-6">
          <img
            src={logo}
            alt="logo"
            className="mx-auto w-[160px] sm:w-[190px]"
          />
          <p className="text-gray-500 text-sm mt-2">Create your account</p>
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
                  label="Full Name"
                  placeholder="Enter your full name"
                  className="!pl-10"
                  required
                />
              </div>

              {/* Email with Icon */}
              <div className="relative">
                <FiMail className="absolute top-7 sm:top-9 left-3 text-gray-400 z-10" />
                <TextInput
                  name="email"
                  label="Email Address"
                  placeholder="example@email.com"
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
                    label="Mobile Number"
                    placeholder="9876543210"
                    className="!pl-10"
                    required
                  />
                </div>

                <div className="relative">
                  <FiBriefcase className="absolute top-7 sm:top-9 left-3 text-gray-400 z-10" />
                  <TextInput
                    name="employee_id"
                    label="Employee ID"
                    placeholder="EMP-12345"
                    className="!pl-10"
                    required
                  />
                </div>
              </div>

              {/* Designation + Region */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectField
                  name="designation_id"
                  label="Designation"
                  options={designationOptions}
                  placeholder={
                    designationOptions.length === 0
                      ? "Loading designations..."
                      : "Select Designation"
                  }
                  required
                />

                <SelectField
                  name="region"
                  label="Region"
                  options={regionOptions}
                  placeholder="Select Region"
                  required
                />
              </div>

              {/* City with Icon */}
              <div className="relative">
                <FiMapPin className="absolute top-7 sm:top-9 left-3 text-gray-400 z-0" />
                <TextInput
                  name="city"
                  label="City"
                  placeholder="Enter your city"
                  className="!pl-10"
                  required
                />
              </div>

              {/* Password with Icon */}
              <div className="relative">
                <FiLock className="absolute top-7 sm:top-9 left-3 text-gray-400 z-10" />
                <TextInput
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
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
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="********"
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
                  Profile Image
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
                      {preview ? "Change Photo" : "Upload Photo"}
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
                        Remove
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  Supported: JPG, PNG, GIF • Max 5MB
                </p>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2.5 rounded-md font-medium transition disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isSubmitting ? "Creating Account..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>

        {/* OR Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Already have account */}
        <p className="text-gray-600 text-sm text-center mb-3">
          Already have an account?
        </p>

        <button
          onClick={() => navigate("/login")}
          className="w-full border border-teal-500 text-teal-600 py-2 rounded-md font-medium hover:bg-teal-50 transition text-sm sm:text-base"
        >
          Login to your account
        </button>

        {/* Footer */}
        <div className="text-xs text-gray-400 mt-6 text-center">
          <p className="tracking-widest mb-2">SECURE REGISTRATION</p>
          <div className="flex justify-center gap-2">
            <span className="hover:underline cursor-pointer">
              Terms of Service
            </span>
            <span>/</span>
            <span className="hover:underline cursor-pointer">
              Privacy Policy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

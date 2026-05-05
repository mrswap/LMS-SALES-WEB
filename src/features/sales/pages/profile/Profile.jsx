// import React, { useEffect, useRef, useState } from "react";
// import {
//   FaUser,
//   FaLock,
//   FaBell,
//   FaSignOutAlt,
//   FaCamera,
//   FaChevronRight,
//   FaTrash,
// } from "react-icons/fa";

// import {
//   PageBody,
//   PageHeader,
//   PageHeaderLeft,
//   PageLayout,
//   PageSubtitle,
//   PageTitle,
// } from "../../common/layout";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../../../redux/slice/authSlice";
// import { getProfile, clearProfile } from "../../../../redux/slice/profileSlice";
// import Loader from "../../common/Loader";
// import Error from "../../common/Error";
// import { useTranslation } from "react-i18next";

// const Profile = () => {
//   const fileInputRef = useRef();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { t } = useTranslation();

//   const { profile, isLoading, isError, message } = useSelector(
//     (state) => state.profile,
//   );

//   const { user: authUser } = useSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(getProfile());
//     return () => {
//       dispatch(clearProfile());
//     };
//   }, [dispatch]);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   if (isLoading) {
//     return <Loader />;
//   }

//   if (isError) {
//     return <Error message={message} />;
//   }

//   return (
//     <PageLayout>
//       <PageHeader>
//         <PageHeaderLeft>
//           <PageTitle>{t("profile.pageTitle")}</PageTitle>
//           <PageSubtitle>{t("profile.pageSubtitle")}</PageSubtitle>
//         </PageHeaderLeft>
//       </PageHeader>

//       <PageBody>
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* LEFT PROFILE */}
//           <div className="bg-gray-50 lg:bg-white lg:rounded-2xl lg:shadow-sm lg:border border-gray-300 p-6 text-center">
//             <div className="relative w-24 h-24 mx-auto">
//               <img
//                 src={profile?.profile_image}
//                 className="w-full h-full rounded-full object-cover"
//                 alt="Profile"
//               />
//             </div>

//             <h2 className="mt-4 text-xl font-semibold text-gray-800">
//               {profile?.name || t("profile.loading")}
//             </h2>

//             <p className="text-gray-500 text-sm">
//               {profile?.email || t("profile.loading")}
//             </p>

//             <div className="flex justify-center gap-2 mt-3 flex-wrap">
//               <span className="bg-gray-200 px-3 py-1 rounded-full text-xs">
//                 {t("profile.tags.id")}:{" "}
//                 {profile?.employee_id || t("profile.na")}
//               </span>
//               <span className="bg-gray-200 px-3 py-1 rounded-full text-xs">
//                 {profile?.region
//                   ? profile.region.toUpperCase()
//                   : t("profile.na")}
//               </span>
//               <span className="bg-gray-200 px-3 py-1 rounded-full text-xs">
//                 {t("profile.tags.city")}:{" "}
//                 {profile?.city || t("profile.notSpecified")}
//               </span>
//             </div>

//             <div className="mt-4 text-left text-sm text-gray-600 border-t pt-3">
//               <p>
//                 <strong>{t("profile.details.department")}:</strong>{" "}
//                 {profile?.department || t("profile.notAssigned")}
//               </p>
//               <p>
//                 <strong>{t("profile.details.mobile")}:</strong>{" "}
//                 {profile?.mobile || t("profile.notProvided")}
//               </p>
//               <p>
//                 <strong>{t("profile.details.role")}:</strong>{" "}
//                 {profile?.role?.label ||
//                   profile?.role?.name ||
//                   t("profile.notAssigned")}
//               </p>
//               <p>
//                 <strong>{t("profile.details.designationId")}:</strong>{" "}
//                 {profile?.designation_id || t("profile.na")}
//               </p>
//               <p>
//                 <strong>{t("profile.details.employeeId")}:</strong>{" "}
//                 {profile?.employee_id || t("profile.na")}
//               </p>
//             </div>
//           </div>

//           {/* RIGHT MENU */}
//           <div className="lg:col-span-2 bg-white lg:rounded-2xl lg:shadow-sm lg:border border-gray-300 divide-y divide-gray-300">
//             <MenuItem
//               icon={<FaUser />}
//               text={t("profile.menu.editProfile")}
//               onClick={() => navigate("details")}
//             />

//             <MenuItem
//               icon={<FaLock />}
//               text={t("profile.menu.changePassword")}
//               onClick={() => navigate("/change-password")}
//             />
//             <MenuItem
//               icon={<FaBell />}
//               text={t("profile.menu.notificationSettings")}
//             />
//             <MenuItem
//               icon={<FaSignOutAlt />}
//               text={t("profile.menu.logout")}
//               danger
//               onClick={handleLogout}
//             />
//           </div>
//         </div>
//       </PageBody>
//     </PageLayout>
//   );
// };

// const MenuItem = ({ icon, text, danger, onClick }) => (
//   <div
//     onClick={onClick}
//     className={`flex items-center justify-between px-5 py-4 cursor-pointer transition
//     ${danger ? "text-red-500 hover:bg-red-50" : "text-gray-700 hover:bg-gray-50"}`}
//   >
//     <div className="flex items-center gap-3">
//       <div
//         className={`p-2 rounded-lg ${
//           danger ? "bg-red-100 text-red-500" : "bg-gray-100 text-blue-600"
//         }`}
//       >
//         {icon}
//       </div>
//       <span className="font-medium">{text}</span>
//     </div>
//     <FaChevronRight className="text-gray-400" />
//   </div>
// );

// export default Profile;

import React, { useEffect, useRef, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaBuilding,
  FaPhone,
  FaUserTag,
  FaMapMarkerAlt,
  FaIdCard,
  FaCamera,
} from "react-icons/fa";
import {
  PageBody,
  PageHeader,
  PageHeaderLeft,
  PageLayout,
  PageSubtitle,
  PageTitle,
} from "../../common/layout";
import { TextInput } from "../../common/form/index";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../redux/slice/authSlice";
import {
  getProfile,
  clearProfile,
  changePassword,
} from "../../../../redux/slice/profileSlice";
import Loader from "../../common/Loader";
import Error from "../../common/Error";
import { useToast } from "../../common/toast/ToastContext";
import { MdLogout } from "react-icons/md";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { t } = useTranslation();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { profile, isLoading, isError, message } = useSelector(
    (state) => state.profile,
  );

  useEffect(() => {
    dispatch(getProfile());
    return () => {
      dispatch(clearProfile());
    };
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleChangePassword = async (values, { resetForm, setSubmitting }) => {
    try {
      const payload = {
        old_password: values.currentPassword,
        new_password: values.newPassword,
        new_password_confirmation: values.confirmNewPassword,
      };

      const res = await dispatch(changePassword(payload)).unwrap();
      toast.success(res.message || t("profile.passwordSuccess"));
      resetForm();
    } catch (error) {
      toast.error(error?.message || t("profile.passwordError"));
    } finally {
      setSubmitting(false);
    }
  };

  const passwordValidationSchema = Yup.object({
    currentPassword: Yup.string().required(
      t("profile.validation.currentPasswordRequired"),
    ),
    newPassword: Yup.string()
      .min(8, t("profile.validation.passwordMin"))
      .required(t("profile.validation.newPasswordRequired")),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], t("profile.validation.passwordMatch"))
      .required(t("profile.validation.confirmPasswordRequired")),
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>{t("profile.pageTitle")}</PageTitle>
          <PageSubtitle>{t("profile.pageSubtitle")}</PageSubtitle>
        </PageHeaderLeft>
      </PageHeader>

      <PageBody>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT PROFILE CARD */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="h-28 bg-gradient-to-br from-gray-800 to-gray-900 relative">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              ></div>
            </div>

            <div className="relative px-6 text-center -mt-12">
              <div className="relative inline-block">
                <img
                  src={
                    profile?.profile_image ||
                    "https://ui-avatars.com/api/?name=" +
                      (profile?.name || "User") +
                      "&background=4F46E5&color=fff&size=120"
                  }
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
                  alt="Profile"
                />
              </div>
            </div>

            <div className="px-6 pb-6 text-center border-b border-gray-100">
              <h2 className="mt-3 text-xl font-bold text-gray-800">
                {profile?.name || t("profile.loading")}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {profile?.email || t("profile.loading")}
              </p>

              <div className="flex justify-center gap-2 mt-4 flex-wrap">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-xs font-medium">
                  <FaIdCard className="inline mr-1 text-gray-500" size={10} />
                  {t("profile.id")}: {profile?.employee_id || t("profile.na")}
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-xs font-medium">
                  <FaMapMarkerAlt
                    className="inline mr-1 text-gray-500"
                    size={10}
                  />
                  {profile?.region
                    ? profile.region.toUpperCase()
                    : t("profile.na")}
                </span>
              </div>
            </div>

            <div className="px-6 py-5">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                {t("profile.accountDetails")}
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FaBuilding
                    className="text-gray-400 mt-0.5 flex-shrink-0"
                    size={14}
                  />
                  <div className="flex-1">
                    <p className="text-xs text-gray-400">
                      {t("profile.department")}
                    </p>
                    <p className="text-sm text-gray-700 font-medium">
                      {profile?.department || t("profile.notAssigned")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaPhone
                    className="text-gray-400 mt-0.5 flex-shrink-0"
                    size={14}
                  />
                  <div className="flex-1">
                    <p className="text-xs text-gray-400">
                      {t("profile.mobile")}
                    </p>
                    <p className="text-sm text-gray-700 font-medium">
                      {profile?.mobile || t("profile.notProvided")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaUserTag
                    className="text-gray-400 mt-0.5 flex-shrink-0"
                    size={14}
                  />
                  <div className="flex-1">
                    <p className="text-xs text-gray-400">{t("profile.role")}</p>
                    <p className="text-sm text-gray-700 font-medium">
                      {profile?.role?.label ||
                        profile?.role?.name ||
                        t("profile.notAssigned")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaIdCard
                    className="text-gray-400 mt-0.5 flex-shrink-0"
                    size={14}
                  />
                  <div className="flex-1">
                    <p className="text-xs text-gray-400">
                      {t("profile.designationId")}
                    </p>
                    <p className="text-sm text-gray-700 font-medium">
                      {profile?.designation_id || t("profile.na")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6">
              <button
                onClick={() => navigate("details")}
                className="w-full py-2.5 border text-white bg-accent hover:opacity-90 cursor-pointer font-medium rounded-lg  transition duration-200 flex items-center justify-center gap-2"
              >
                <FaUser size={14} />
                {t("profile.editProfile")}
              </button>
            </div>
          </div>

          {/* RIGHT PANEL - CHANGE PASSWORD */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-5 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent rounded-lg">
                    <FaLock className="text-white" size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {t("profile.changePassword")}
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {t("profile.changePasswordSubtitle")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <Formik
                  initialValues={{
                    currentPassword: "",
                    newPassword: "",
                    confirmNewPassword: "",
                  }}
                  validationSchema={passwordValidationSchema}
                  onSubmit={handleChangePassword}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-5">
                      {/* Current Password */}
                      <div className="relative">
                        <TextInput
                          name="currentPassword"
                          label={t("profile.currentPassword")}
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder={t("profile.currentPasswordPlaceholder")}
                          required={true}
                        />

                        {showCurrentPassword ? (
                          <FaEyeSlash
                            onClick={() => setShowCurrentPassword(false)}
                            className="absolute top-7 sm:top-9 right-3 text-gray-400 cursor-pointer"
                          />
                        ) : (
                          <FaEye
                            onClick={() => setShowCurrentPassword(true)}
                            className="absolute top-7 sm:top-9 right-3 text-gray-400 cursor-pointer"
                          />
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* New Password */}
                        <div className="relative">
                          <TextInput
                            name="newPassword"
                            label={t("profile.newPassword")}
                            type={showNewPassword ? "text" : "password"}
                            placeholder={t("profile.newPasswordPlaceholder")}
                            required={true}
                          />
                          {showNewPassword ? (
                            <FaEyeSlash
                              onClick={() => setShowNewPassword(false)}
                              className="absolute top-7 sm:top-9 right-3 text-gray-400 cursor-pointer"
                            />
                          ) : (
                            <FaEye
                              onClick={() => setShowNewPassword(true)}
                              className="absolute top-7 sm:top-9 right-3 text-gray-400 cursor-pointer"
                            />
                          )}
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                          <TextInput
                            name="confirmNewPassword"
                            label={t("profile.confirmPassword")}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder={t(
                              "profile.confirmPasswordPlaceholder",
                            )}
                            required={true}
                          />
                          {showConfirmPassword ? (
                            <FaEyeSlash
                              onClick={() => setShowConfirmPassword(false)}
                              className="absolute top-7 sm:top-9 right-3 text-gray-400 cursor-pointer"
                            />
                          ) : (
                            <FaEye
                              onClick={() => setShowConfirmPassword(true)}
                              className="absolute top-7 sm:top-9 right-3 text-gray-400 cursor-pointer"
                            />
                          )}
                        </div>
                      </div>

                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-accent hover:opacity-90 cursor-pointer text-white font-medium py-2.5 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-sm"
                        >
                          {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            t("profile.updatePassword")
                          )}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>

            {/* Logout Button */}
            <div className="mt-6">
              <button
                onClick={handleLogout}
                className="w-full bg-white border cursor-pointer border-red-200 text-red-600 py-3 rounded-xl hover:bg-red-50 transition duration-200 flex items-center justify-center gap-2 shadow-sm"
              >
                <MdLogout size={16} />
                {t("profile.logout")}
              </button>
            </div>
          </div>
        </div>
      </PageBody>
    </PageLayout>
  );
};

export default Profile;

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

//   // console.log("profile", profile);

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
//         {/* GRID */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* ================= LEFT PROFILE ================= */}
//           <div className="bg-gray-50 lg:bg-white lg:rounded-2xl lg:shadow-sm lg:border border-gray-300 p-6 text-center">
//             <div className="relative w-24 h-24 mx-auto">
//               <img
//                 src={profile?.profile_image}
//                 className="w-full h-full rounded-full object-cover"
//                 alt="Profile"
//               />
//             </div>

//             {/* ✅ NAME - Ab profile slice se */}
//             <h2 className="mt-4 text-xl font-semibold text-gray-800">
//               {profile?.name || t("profile.loading")}
//             </h2>

//             {/* ✅ EMAIL - Ab profile slice se */}
//             <p className="text-gray-500 text-sm">
//               {profile?.email || t("profile.loading")}
//             </p>

//             {/* TAGS - Ab profile slice se */}
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

//             {/* ✅ More user details - Ab profile slice se */}
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

//           {/* ================= RIGHT MENU ================= */}
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

// /* ================= MENU ITEM ================= */
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
import {
  FaUser,
  FaLock,
  FaBell,
  FaSignOutAlt,
  FaCamera,
  FaChevronRight,
  FaTrash,
} from "react-icons/fa";

import {
  PageBody,
  PageHeader,
  PageHeaderLeft,
  PageLayout,
  PageSubtitle,
  PageTitle,
} from "../../common/layout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../redux/slice/authSlice";
import { getProfile, clearProfile } from "../../../../redux/slice/profileSlice";
import Loader from "../../common/Loader";
import Error from "../../common/Error";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { profile, isLoading, isError, message } = useSelector(
    (state) => state.profile,
  );

  const { user: authUser } = useSelector((state) => state.auth);

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

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error message={message} />;
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT PROFILE */}
          <div className="bg-gray-50 lg:bg-white lg:rounded-2xl lg:shadow-sm lg:border border-gray-300 p-6 text-center">
            <div className="relative w-24 h-24 mx-auto">
              <img
                src={profile?.profile_image}
                className="w-full h-full rounded-full object-cover"
                alt="Profile"
              />
            </div>

            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              {profile?.name || t("profile.loading")}
            </h2>

            <p className="text-gray-500 text-sm">
              {profile?.email || t("profile.loading")}
            </p>

            <div className="flex justify-center gap-2 mt-3 flex-wrap">
              <span className="bg-gray-200 px-3 py-1 rounded-full text-xs">
                {t("profile.tags.id")}:{" "}
                {profile?.employee_id || t("profile.na")}
              </span>
              <span className="bg-gray-200 px-3 py-1 rounded-full text-xs">
                {profile?.region
                  ? profile.region.toUpperCase()
                  : t("profile.na")}
              </span>
              <span className="bg-gray-200 px-3 py-1 rounded-full text-xs">
                {t("profile.tags.city")}:{" "}
                {profile?.city || t("profile.notSpecified")}
              </span>
            </div>

            <div className="mt-4 text-left text-sm text-gray-600 border-t pt-3">
              <p>
                <strong>{t("profile.details.department")}:</strong>{" "}
                {profile?.department || t("profile.notAssigned")}
              </p>
              <p>
                <strong>{t("profile.details.mobile")}:</strong>{" "}
                {profile?.mobile || t("profile.notProvided")}
              </p>
              <p>
                <strong>{t("profile.details.role")}:</strong>{" "}
                {profile?.role?.label ||
                  profile?.role?.name ||
                  t("profile.notAssigned")}
              </p>
              <p>
                <strong>{t("profile.details.designationId")}:</strong>{" "}
                {profile?.designation_id || t("profile.na")}
              </p>
              <p>
                <strong>{t("profile.details.employeeId")}:</strong>{" "}
                {profile?.employee_id || t("profile.na")}
              </p>
            </div>
          </div>

          {/* RIGHT MENU */}
          <div className="lg:col-span-2 bg-white lg:rounded-2xl lg:shadow-sm lg:border border-gray-300 divide-y divide-gray-300">
            <MenuItem
              icon={<FaUser />}
              text={t("profile.menu.editProfile")}
              onClick={() => navigate("details")}
            />

            <MenuItem
              icon={<FaLock />}
              text={t("profile.menu.changePassword")}
              onClick={() => navigate("/change-password")}
            />
            <MenuItem
              icon={<FaBell />}
              text={t("profile.menu.notificationSettings")}
            />
            <MenuItem
              icon={<FaSignOutAlt />}
              text={t("profile.menu.logout")}
              danger
              onClick={handleLogout}
            />
          </div>
        </div>
      </PageBody>
    </PageLayout>
  );
};

const MenuItem = ({ icon, text, danger, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between px-5 py-4 cursor-pointer transition
    ${danger ? "text-red-500 hover:bg-red-50" : "text-gray-700 hover:bg-gray-50"}`}
  >
    <div className="flex items-center gap-3">
      <div
        className={`p-2 rounded-lg ${
          danger ? "bg-red-100 text-red-500" : "bg-gray-100 text-blue-600"
        }`}
      >
        {icon}
      </div>
      <span className="font-medium">{text}</span>
    </div>
    <FaChevronRight className="text-gray-400" />
  </div>
);

export default Profile;

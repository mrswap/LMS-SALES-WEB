// import React, { useRef, useState } from "react";
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
// import { useSelector } from "react-redux";

// const DEFAULT_IMG = "https://i.pravatar.cc/150";

// const Profile = () => {
//   const [image, setImage] = useState(DEFAULT_IMG);
//   const fileInputRef = useRef();
//   const navigate = useNavigate();

//   const { user, profile } = useSelector((state) => state.auth);

//   console.log("user", user);
//   console.log("profile", profile);

//   // image change
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const url = URL.createObjectURL(file);
//       setImage(url);
//     }
//   };

//   // remove image
//   const handleRemove = () => {
//     setImage(DEFAULT_IMG);
//   };

//   return (
//     <PageLayout>
//       <PageHeader>
//         <PageHeaderLeft>
//           <PageTitle>Profile</PageTitle>
//           <PageSubtitle>Manage your account</PageSubtitle>
//         </PageHeaderLeft>
//       </PageHeader>

//       <PageBody>
//         <div className="max-w-5xl mx-auto">
//           {/* GRID */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* ================= LEFT PROFILE ================= */}
//             <div className="bg-gray-50 lg:bg-white lg:rounded-2xl lg:shadow-sm lg:border border-gray-300 p-6 text-center">
//               {/* AVATAR */}
//               <div className="relative w-24 h-24 mx-auto">
//                 <img
//                   src={image}
//                   className="w-full h-full rounded-full object-cover"
//                   alt=""
//                 />

//                 {/* CHANGE BUTTON */}
//                 <button
//                   onClick={() => fileInputRef.current.click()}
//                   className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white shadow hover:bg-blue-700 transition"
//                 >
//                   <FaCamera size={12} />
//                 </button>

//                 {/* REMOVE BUTTON */}
//                 {image !== DEFAULT_IMG && (
//                   <button
//                     onClick={handleRemove}
//                     className="absolute top-0 right-0 bg-red-500 p-1.5 rounded-full text-white text-xs shadow"
//                   >
//                     <FaTrash size={10} />
//                   </button>
//                 )}

//                 <input
//                   type="file"
//                   accept="image/*"
//                   ref={fileInputRef}
//                   onChange={handleImageChange}
//                   className="hidden"
//                 />
//               </div>

//               {/* NAME */}
//               <h2 className="mt-4 text-xl font-semibold text-gray-800">
//                 Johnathan Doe
//               </h2>

//               <p className="text-gray-500 text-sm">
//                 johnathan.doe@avantemedical.com
//               </p>

//               {/* TAGS */}
//               <div className="flex justify-center gap-2 mt-3 flex-wrap">
//                 <span className="bg-gray-200 px-3 py-1 rounded-full text-xs">
//                   ID: AV-9942
//                 </span>
//                 <span className="bg-gray-200 px-3 py-1 rounded-full text-xs">
//                   NORTH AMERICA
//                 </span>
//               </div>
//             </div>

//             {/* ================= RIGHT MENU ================= */}
//             <div className="lg:col-span-2 bg-white lg:rounded-2xl lg:shadow-sm lg:border border-gray-300 divide-y divide-gray-300 ">
//               {/* <MenuItem icon={<FaUser />} text="Edit Profile" />
//               <MenuItem icon={<FaLock />} text="Change Password" /> */}
//               <MenuItem
//                 icon={<FaUser />}
//                 text="Edit Profile"
//                 onClick={() => navigate("details")}
//               />

//               <MenuItem
//                 icon={<FaLock />}
//                 text="Change Password"
//                 onClick={() => navigate("/change-password")}
//               />
//               <MenuItem icon={<FaBell />} text="Notification Settings" />
//               <MenuItem icon={<FaSignOutAlt />} text="Logout" danger />
//             </div>
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

// import React, { use, useEffect, useRef, useState } from "react";
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
// import { getProfile } from "../../../../redux/slice/profileSlice";

// const DEFAULT_IMG = "https://i.pravatar.cc/150";

// const Profile = () => {
//   const [image, setImage] = useState(DEFAULT_IMG);
//   const fileInputRef = useRef();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { user, profile } = useSelector((state) => state.auth);
//   const { profile: p } = useSelector((state) => state.profile);
//   console.log("profilep", p);

//   useEffect(() => {
//     dispatch(getProfile());
//   }, []);

//   // image change
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const url = URL.createObjectURL(file);
//       setImage(url);
//     }
//   };

//   // remove image
//   const handleRemove = () => {
//     setImage(DEFAULT_IMG);
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   return (
//     <PageLayout>
//       <PageHeader>
//         <PageHeaderLeft>
//           <PageTitle>Profile</PageTitle>
//           <PageSubtitle>Manage your account</PageSubtitle>
//         </PageHeaderLeft>
//       </PageHeader>

//       <PageBody>
//         <div className="max-w-5xl mx-auto">
//           {/* GRID */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* ================= LEFT PROFILE ================= */}
//             <div className="bg-gray-50 lg:bg-white lg:rounded-2xl lg:shadow-sm lg:border border-gray-300 p-6 text-center">
//               {/* AVATAR */}
//               <div className="relative w-24 h-24 mx-auto">
//                 <img
//                   src={image}
//                   className="w-full h-full rounded-full object-cover"
//                   alt=""
//                 />

//                 {/* CHANGE BUTTON */}
//                 <button
//                   onClick={() => fileInputRef.current.click()}
//                   className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white shadow hover:bg-blue-700 transition"
//                 >
//                   <FaCamera size={12} />
//                 </button>

//                 {/* REMOVE BUTTON */}
//                 {image !== DEFAULT_IMG && (
//                   <button
//                     onClick={handleRemove}
//                     className="absolute top-0 right-0 bg-red-500 p-1.5 rounded-full text-white text-xs shadow"
//                   >
//                     <FaTrash size={10} />
//                   </button>
//                 )}

//                 <input
//                   type="file"
//                   accept="image/*"
//                   ref={fileInputRef}
//                   onChange={handleImageChange}
//                   className="hidden"
//                 />
//               </div>

//               {/* NAME - Using actual user data */}
//               <h2 className="mt-4 text-xl font-semibold text-gray-800">
//                 {user?.name || "Johnathan Doe"}
//               </h2>

//               {/* EMAIL - Using actual user data */}
//               <p className="text-gray-500 text-sm">
//                 {user?.email || "johnathan.doe@avantemedical.com"}
//               </p>

//               {/* TAGS - Using actual user data including city */}
//               <div className="flex justify-center gap-2 mt-3 flex-wrap">
//                 <span className="bg-gray-200 px-3 py-1 rounded-full text-xs">
//                   ID: {user?.employee_id || "AV-9942"}
//                 </span>
//                 <span className="bg-gray-200 px-3 py-1 rounded-full text-xs">
//                   {user?.region ? user.region.toUpperCase() : "NORTH AMERICA"}
//                 </span>
//                 {/* Added city tag */}
//                 <span className="bg-gray-200 px-3 py-1 rounded-full text-xs">
//                   CITY: {user?.city || "Not specified"}
//                 </span>
//               </div>

//               {/* Optional: Display more user details */}
//               <div className="mt-4 text-left text-sm text-gray-600 border-t pt-3">
//                 <p>
//                   <strong>Department:</strong>{" "}
//                   {user?.department || "Not assigned"}
//                 </p>
//                 <p>
//                   <strong>Mobile:</strong> {user?.mobile || "Not provided"}
//                 </p>
//                 <p>
//                   <strong>Role:</strong>{" "}
//                   {user?.role?.label || user?.role_id || "Not assigned"}
//                 </p>
//               </div>
//             </div>

//             {/* ================= RIGHT MENU ================= */}
//             <div className="lg:col-span-2 bg-white lg:rounded-2xl lg:shadow-sm lg:border border-gray-300 divide-y divide-gray-300 ">
//               <MenuItem
//                 icon={<FaUser />}
//                 text="Edit Profile"
//                 onClick={() => navigate("details")}
//               />

//               <MenuItem
//                 icon={<FaLock />}
//                 text="Change Password"
//                 onClick={() => navigate("/change-password")}
//               />
//               <MenuItem icon={<FaBell />} text="Notification Settings" />
//               <MenuItem
//                 icon={<FaSignOutAlt />}
//                 text="Logout"
//                 danger
//                 onClick={handleLogout}
//               />
//             </div>
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

const DEFAULT_IMG = "https://i.pravatar.cc/150";

const Profile = () => {
  const [image, setImage] = useState(DEFAULT_IMG);
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Ab sirf state.profile se data le rahe hain
  const { profile, isLoading, isError, message } = useSelector(
    (state) => state.profile,
  );
  const { user: authUser } = useSelector((state) => state.auth); // Sirf logout ke liye chahiye

  console.log("Profile data from profile slice:", profile);

  useEffect(() => {
    // ✅ Profile fetch karo
    dispatch(getProfile());

    // Cleanup
    return () => {
      dispatch(clearProfile());
    };
  }, [dispatch]);

  // ✅ Profile data available hone par image set karo (agar profile_image hai to)
  useEffect(() => {
    if (profile?.profile_image) {
      setImage(profile.profile_image);
    } else {
      setImage(DEFAULT_IMG);
    }
  }, [profile]);

  // image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
      // Yahan API call bhi karni padegi image update ke liye
    }
  };

  // remove image
  const handleRemove = () => {
    setImage(DEFAULT_IMG);
    // Yahan API call bhi karni padegi image remove ke liye
  };

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
          <PageTitle>Profile</PageTitle>
          <PageSubtitle>Manage your account</PageSubtitle>
        </PageHeaderLeft>
      </PageHeader>

      <PageBody>
        <div className="max-w-5xl mx-auto">
          {/* GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ================= LEFT PROFILE ================= */}
            <div className="bg-gray-50 lg:bg-white lg:rounded-2xl lg:shadow-sm lg:border border-gray-300 p-6 text-center">
              {/* AVATAR */}
              <div className="relative w-24 h-24 mx-auto">
                <img
                  src={image}
                  className="w-full h-full rounded-full object-cover"
                  alt="Profile"
                />

                {/* CHANGE BUTTON */}
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white shadow hover:bg-blue-700 transition"
                >
                  <FaCamera size={12} />
                </button>

                {/* REMOVE BUTTON */}
                {image !== DEFAULT_IMG && (
                  <button
                    onClick={handleRemove}
                    className="absolute top-0 right-0 bg-red-500 p-1.5 rounded-full text-white text-xs shadow"
                  >
                    <FaTrash size={10} />
                  </button>
                )}

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {/* ✅ NAME - Ab profile slice se */}
              <h2 className="mt-4 text-xl font-semibold text-gray-800">
                {profile?.name || "Loading..."}
              </h2>

              {/* ✅ EMAIL - Ab profile slice se */}
              <p className="text-gray-500 text-sm">
                {profile?.email || "Loading..."}
              </p>

              {/* TAGS - Ab profile slice se */}
              <div className="flex justify-center gap-2 mt-3 flex-wrap">
                <span className="bg-gray-200 px-3 py-1 rounded-full text-xs">
                  ID: {profile?.employee_id || "N/A"}
                </span>
                <span className="bg-gray-200 px-3 py-1 rounded-full text-xs">
                  {profile?.region ? profile.region.toUpperCase() : "N/A"}
                </span>
                <span className="bg-gray-200 px-3 py-1 rounded-full text-xs">
                  CITY: {profile?.city || "Not specified"}
                </span>
              </div>

              {/* ✅ More user details - Ab profile slice se */}
              <div className="mt-4 text-left text-sm text-gray-600 border-t pt-3">
                <p>
                  <strong>Department:</strong>{" "}
                  {profile?.department || "Not assigned"}
                </p>
                <p>
                  <strong>Mobile:</strong> {profile?.mobile || "Not provided"}
                </p>
                <p>
                  <strong>Role:</strong>{" "}
                  {profile?.role?.label ||
                    profile?.role?.name ||
                    "Not assigned"}
                </p>
                <p>
                  <strong>Designation ID:</strong>{" "}
                  {profile?.designation_id || "N/A"}
                </p>
                <p>
                  <strong>Employee ID:</strong> {profile?.employee_id || "N/A"}
                </p>
              </div>
            </div>

            {/* ================= RIGHT MENU ================= */}
            <div className="lg:col-span-2 bg-white lg:rounded-2xl lg:shadow-sm lg:border border-gray-300 divide-y divide-gray-300">
              <MenuItem
                icon={<FaUser />}
                text="Edit Profile"
                onClick={() => navigate("details")}
              />

              <MenuItem
                icon={<FaLock />}
                text="Change Password"
                onClick={() => navigate("/change-password")}
              />
              <MenuItem icon={<FaBell />} text="Notification Settings" />
              <MenuItem
                icon={<FaSignOutAlt />}
                text="Logout"
                danger
                onClick={handleLogout}
              />
            </div>
          </div>
        </div>
      </PageBody>
    </PageLayout>
  );
};

/* ================= MENU ITEM ================= */
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

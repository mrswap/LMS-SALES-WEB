// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import { TextInput, SelectField } from "../../../common/form/index";

// import {
//   PageLayout,
//   PageHeader,
//   PageHeaderLeft,
//   PageTitle,
//   PageSubtitle,
//   PageBody,
// } from "../../../common/layout/index";

// const ProfileDetails = () => {
//   const initialValues = {
//     employeeId: "",
//     fullName: "",
//     email: "",
//     role: "",
//     region: "",
//     password: "",
//     confirmPassword: "",
//   };

//   const validationSchema = Yup.object({
//     employeeId: Yup.string().required("Employee ID required"),
//     fullName: Yup.string().required("Full name required"),
//     email: Yup.string().email("Invalid email").required("Email required"),
//     role: Yup.string().required("Role required"),
//     region: Yup.string().required("Region required"),
//     password: Yup.string().min(6, "Min 6 chars").required("Password required"),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("password")], "Passwords must match")
//       .required("Confirm password required"),
//   });

//   const onSubmit = (values) => {
//     console.log("Form Data:", values);
//   };

//   return (
//     <PageLayout>
//       <PageHeader>
//         <PageHeaderLeft>
//           <PageTitle>Update Profile</PageTitle>
//           <PageSubtitle>Fill profile details</PageSubtitle>
//         </PageHeaderLeft>
//       </PageHeader>

//       <PageBody>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={onSubmit}
//         >
//           {({ handleSubmit }) => (
//             <Form onSubmit={handleSubmit} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
//                 <TextInput
//                   name="employeeId"
//                   label="Employee ID"
//                   placeholder="e.g. EMP-12345"
//                   required={true}
//                 />

//                 <TextInput
//                   name="fullName"
//                   label="Full Name"
//                   placeholder="e.g. Dr. Sarah Jenkins"
//                   required={true}
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
//                 <TextInput
//                   name="email"
//                   label="Email Address"
//                   placeholder="example@email.com"
//                   required={true}
//                 />
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
//                 <SelectField
//                   name="role"
//                   label="Role"
//                   placeholder="Select Role"
//                   options={[
//                     { label: "Admin", value: "admin" },
//                     { label: "Manager", value: "manager" },
//                     { label: "Employee", value: "employee" },
//                   ]}
//                   required={true}
//                 />

//                 <SelectField
//                   name="region"
//                   label="Region"
//                   placeholder="Select Region"
//                   options={[
//                     { label: "North", value: "north" },
//                     { label: "South", value: "south" },
//                     { label: "East", value: "east" },
//                     { label: "West", value: "west" },
//                   ]}
//                   required={true}
//                 />
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
//                 <TextInput
//                   name="password"
//                   label="Create Password"
//                   type="password"
//                   placeholder="********"
//                   required={true}
//                 />

//                 <TextInput
//                   name="confirmPassword"
//                   label="Confirm Password"
//                   type="password"
//                   placeholder="********"
//                   required={true}
//                 />
//               </div>

//               {/* Button */}
//               <button
//                 type="submit"
//                 className="w-full py-3 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 transition"
//               >
//                 Save
//               </button>
//             </Form>
//           )}
//         </Formik>
//       </PageBody>
//     </PageLayout>
//   );
// };

// export default ProfileDetails;

import { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextInput, SelectField } from "../../../common/form/index";
import {
  PageLayout,
  PageHeader,
  PageHeaderLeft,
  PageTitle,
  PageSubtitle,
  PageBody,
} from "../../../common/layout/index";
import { getProfile } from "../../../../../redux/slice/profileSlice";
import Loader from "../../../common/Loader";
// import {
//   getProfile,
//   updateProfile,
// } from "../../../../redux/slice/profileSlice";

const ProfileDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, isLoading, isSuccess, message } = useSelector(
    (state) => state.profile,
  );

  useEffect(() => {
    // Agar profile nahi hai to fetch karo
    if (!profile) {
      dispatch(getProfile());
    }
  }, [dispatch, profile]);

  const initialValues = {
    employeeId: profile?.employee_id || "",
    fullName: profile?.name || "",
    email: profile?.email || "",
    mobile: profile?.mobile || "",
    city: profile?.city || "",
    region: profile?.region || "",
    department: profile?.department || "",
    designationId: profile?.designation_id || "",
  };

  const validationSchema = Yup.object({
    employeeId: Yup.string().required("Employee ID required"),
    fullName: Yup.string().required("Full name required"),
    email: Yup.string().email("Invalid email").required("Email required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .optional(),
    city: Yup.string().optional(),
    region: Yup.string().required("Region required"),
    department: Yup.string().optional(),
    designationId: Yup.string().optional(),
  });

  const onSubmit = async (values) => {
    const updateData = {
      name: values.fullName,
      email: values.email,
      mobile: values.mobile,
      city: values.city,
      region: values.region,
      department: values.department,
      designation_id: values.designationId,
      employee_id: values.employeeId,
    };

    // const result = await dispatch(updateProfile(updateData));
    // if (result.meta.requestStatus === "fulfilled") {
    //   console.log("Profile updated successfully");
    // }
  };

  // Agar loading hai to loading show karo
  if (isLoading && !profile) {
    return <Loader />;
  }

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>Update Profile</PageTitle>
          <PageSubtitle>Fill profile details</PageSubtitle>
        </PageHeaderLeft>
      </PageHeader>

      <PageBody>
        {/* Success Message */}
        {/* {isSuccess && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
            {message || "Profile updated successfully!"}
          </div>
        )} */}

        {/* Error Message */}
        {/* {message && !isSuccess && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {message}
          </div>
        )} */}

        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                <TextInput
                  name="employeeId"
                  label="Employee ID"
                  placeholder="e.g. EMP-12345"
                  required={true}
                  disabled={true} // Employee ID usually readonly
                />

                <TextInput
                  name="fullName"
                  label="Full Name"
                  placeholder="e.g. Ajay Trainee"
                  required={true}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                <TextInput
                  name="email"
                  label="Email Address"
                  placeholder="example@email.com"
                  required={true}
                />

                <TextInput
                  name="mobile"
                  label="Mobile Number"
                  placeholder="9876543210"
                  required={false}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                <TextInput
                  name="city"
                  label="City"
                  placeholder="e.g. Indore"
                  required={false}
                />

                <SelectField
                  name="region"
                  label="Region"
                  placeholder="Select Region"
                  options={[
                    { label: "North", value: "north" },
                    { label: "South", value: "south" },
                    { label: "East", value: "east" },
                    { label: "West", value: "west" },
                  ]}
                  required={true}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                <TextInput
                  name="department"
                  label="Department"
                  placeholder="e.g. Sales"
                  required={false}
                />

                <TextInput
                  name="designationId"
                  label="Designation ID"
                  placeholder="e.g. 1"
                  required={false}
                  type="number"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-full py-3 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </Form>
          )}
        </Formik>
      </PageBody>
    </PageLayout>
  );
};

export default ProfileDetails;

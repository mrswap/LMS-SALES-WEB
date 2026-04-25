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
import {
  getProfile,
  updateProfile,
} from "../../../../../redux/slice/profileSlice";
import { getDesignations } from "../../../../../redux/slice/commonSlice";
import Loader from "../../../common/Loader";

const ProfileDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, isLoading, isSuccess, message } = useSelector(
    (state) => state.profile,
  );

  // Get designations from Redux store
  const { designations } = useSelector((state) => state.common);

  console.log("designation", designations);

  // Convert API designations to SelectField options format
  const designationOptions =
    designations
      ?.filter((des) => des.name && des.name !== "undefined") // Filter out invalid designations
      .map((des) => ({
        label: des.name, // Designation name show hoga
        value: des.id, // Designation ID submit hoga
      })) || [];

  useEffect(() => {
    // Agar profile nahi hai to fetch karo
    if (!profile) {
      dispatch(getProfile());
      dispatch(getDesignations());
    }
  }, [dispatch, profile]);

  // API response ke hisaab se initial values set ki hain
  const initialValues = {
    employeeId: profile?.employee_id || "",
    fullName: profile?.name || "",
    email: profile?.email || "",
    mobile: profile?.mobile || "",
    city: profile?.city || "",
    region: profile?.region || "",
    department: profile?.department || "",
    designationId: profile?.designation_id || "",
    // Extra fields jo UI mein add kiye hain
    roleId: profile?.role_id || "", // Role ID from API
    roleName: profile?.role?.name || "", // Role name from nested object
    roleLabel: profile?.role?.label || "", // Role label
    isActive: profile?.is_active || false, // Active status
    profileImage: profile?.profile_image || null, // Profile image
    employee_id: profile?.employee_id || "", // Duplicate for clarity
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
    // Optional validation for new fields
    roleId: Yup.number().optional(),
    isActive: Yup.boolean().optional(),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const updateData = {
        name: values.fullName,
        email: values.email,
        mobile: values.mobile,
        city: values.city,
        region: values.region,
        department: values.department,
        designation_id: values.designationId,
        employee_id: values.employeeId,
        // Extra fields agar update karni ho to uncomment karo
        // role_id: values.roleId,
        // is_active: values.isActive,
      };

      // Dispatch update profile action
      const result = await dispatch(updateProfile(updateData)).unwrap();

      // Optional: Show success message or redirect
      if (result) {
        // Refresh profile data
        dispatch(getProfile());
      }
    } catch (error) {
      console.error("Profile update failed:", error);
    } finally {
      setSubmitting(false);
    }
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
        {isSuccess && message && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
            {message || "Profile updated successfully!"}
          </div>
        )}

        {/* Error Message */}
        {message && !isSuccess && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {message}
          </div>
        )}

        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, isSubmitting, values }) => (
            <Form onSubmit={handleSubmit} className="space-y-4">
              {/* Basic Info Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                <TextInput
                  name="employeeId"
                  label="Employee ID"
                  placeholder="e.g. EMP124"
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
                  placeholder="kajalcharve6@gmail.com"
                  required={true}
                />

                <TextInput
                  name="mobile"
                  label="Mobile Number"
                  placeholder="8982251020"
                  required={false}
                />
              </div>

              {/* Location & Region Section */}
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

              {/* Work Info Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                <TextInput
                  name="department"
                  label="Department"
                  placeholder="e.g. Sales"
                  required={false}
                />

                <SelectField
                  name="designationId"
                  label="Designation"
                  placeholder="Select Designation"
                  options={designationOptions}
                  required={false}
                />
              </div>

              {/* Extra Information Section - Optional fields jo API se aayi hain */}
              <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-semibold mb-3 text-gray-700">
                  Additional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                  {/* Readonly fields to show extra data */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Role
                    </label>
                    <div className="text-gray-800">
                      {values.roleLabel || values.roleName || "Not assigned"}
                      {values.roleId && ` (ID: ${values.roleId})`}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Account Status
                    </label>
                    <div
                      className={`font-medium ${values.isActive ? "text-green-600" : "text-red-600"}`}
                    >
                      {values.isActive ? "Active ✓" : "Inactive ✗"}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Email Verified
                    </label>
                    <div className="text-gray-800">
                      {profile?.email_verified_at ? (
                        <span className="text-green-600">
                          Verified on{" "}
                          {new Date(
                            profile.email_verified_at,
                          ).toLocaleDateString()}
                        </span>
                      ) : (
                        <span className="text-yellow-600">Not verified</span>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Profile Image
                    </label>
                    <div className="text-gray-800">
                      {values.profileImage ? (
                        <a
                          href={values.profileImage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-500 hover:underline"
                        >
                          View Image
                        </a>
                      ) : (
                        "No image uploaded"
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timestamps (Readonly) */}
              <div className="border-t pt-4 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-500">
                  <div>
                    <span className="font-medium">Created:</span>{" "}
                    {profile?.created_at
                      ? new Date(profile.created_at).toLocaleString()
                      : "N/A"}
                  </div>
                  <div>
                    <span className="font-medium">Last Updated:</span>{" "}
                    {profile?.updated_at
                      ? new Date(profile.updated_at).toLocaleString()
                      : "N/A"}
                  </div>
                </div>
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

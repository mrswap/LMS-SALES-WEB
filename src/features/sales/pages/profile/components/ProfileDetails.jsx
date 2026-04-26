import { useEffect, useState } from "react";
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
import { FiUpload, FiTrash2, FiUser, FiCamera } from "react-icons/fi";
import { useToast } from "../../../common/toast/ToastContext";

const ProfileDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const toast = useToast();

  const { profile, isLoading, isSuccess, message } = useSelector(
    (state) => state.profile,
  );

  const { designations } = useSelector((state) => state.common);

  const designationOptions =
    designations
      ?.filter((des) => des.name && des.name !== "undefined")
      .map((des) => ({
        label: des.name,
        value: des.id,
      })) || [];

  useEffect(() => {
    if (!profile) {
      dispatch(getProfile());
      dispatch(getDesignations());
    }
  }, [dispatch, profile]);

  const regionOptions = [
    { label: "North", value: "north" },
    { label: "South", value: "south" },
    { label: "East", value: "east" },
    { label: "West", value: "west" },
  ];

  // Handle image selection
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please select a valid image file (JPEG, PNG, WEBP)");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Handle image remove
  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const initialValues = {
    employeeId: profile?.employee_id || "",
    fullName: profile?.name || "",
    email: profile?.email || "",
    mobile: profile?.mobile || "",
    city: profile?.city || "",
    department: profile?.department || "",

    region: regionOptions.find((opt) => opt.value === profile?.region) || null,

    designationId:
      designationOptions.find((opt) => opt.value === profile?.designation_id) ||
      null,

    roleId: profile?.role_id || "",
    roleName: profile?.role?.name || "",
    roleLabel: profile?.role?.label || "",
    isActive: profile?.is_active || false,
  };

  const validationSchema = Yup.object({
    employeeId: Yup.string().required("Employee ID required"),
    fullName: Yup.string().required("Full name required"),
    email: Yup.string().email("Invalid email").required("Email required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .optional(),
    city: Yup.string().optional(),
    department: Yup.string().optional(),
    designationId: Yup.object().nullable().required("Designation required"),
    region: Yup.object().nullable().required("Region required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      let updateData = {
        name: values.fullName,
        email: values.email,
        mobile: values.mobile,
        city: values.city,
        department: values.department,
        region: values.region?.value || values.region,
        designation_id: values.designationId?.value || values.designationId,
        employee_id: values.employeeId,
      };

      let formData = new FormData();

      // Append all text fields
      Object.keys(updateData).forEach((key) => {
        if (updateData[key] !== undefined && updateData[key] !== null) {
          formData.append(key, updateData[key]);
        }
      });

      // Handle image
      if (imageFile) {
        // New image selected - upload it
        formData.append("profile_image", imageFile);
      } else if (imagePreview === null && profile?.profile_image) {
        // Image was removed
        formData.append("remove_image", true);
      }

      const result = await dispatch(updateProfile(formData)).unwrap();
      if (result) {
        dispatch(getProfile());
        setImageFile(null);
        setImagePreview(null);
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading && !profile) {
    return <Loader />;
  }

  // Get current image to display
  const currentImage = imagePreview || profile?.profile_image || null;

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>Update Profile</PageTitle>
          <PageSubtitle>Manage your profile information and image</PageSubtitle>
        </PageHeaderLeft>
      </PageHeader>

      <PageBody>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, isSubmitting, values }) => (
            <Form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Image Section */}
              <div className="border-b border-gray-300 pb-6 mb-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
                  <FiCamera className="text-teal-500" />
                  Profile Image
                </h3>

                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* Image Preview */}
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 shadow-md">
                      {currentImage ? (
                        <img
                          src={currentImage}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-100 to-blue-100">
                          <FiUser className="w-12 h-12 text-teal-600" />
                        </div>
                      )}
                    </div>

                    {/* Hover overlay for image actions */}
                    {currentImage && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <label className="cursor-pointer p-2 bg-white rounded-full hover:bg-gray-100 transition">
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/jpg,image/webp"
                            onChange={handleImageSelect}
                            className="hidden"
                          />
                          <FiCamera className="w-4 h-4 text-gray-700" />
                        </label>
                        <button
                          type="button"
                          onClick={handleImageRemove}
                          className="p-2 bg-white rounded-full hover:bg-gray-100 transition"
                        >
                          <FiTrash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Buttons - Normal website style */}
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap gap-3">
                      {!currentImage ? (
                        // No image - Show Upload button
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/jpg,image/webp"
                            onChange={handleImageSelect}
                            className="hidden"
                            disabled={isSubmitting}
                          />
                          <span className="inline-flex items-center gap-2 px-6 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition font-medium">
                            <FiUpload />
                            Upload Image
                          </span>
                        </label>
                      ) : (
                        // Image exists - Show Change and Remove buttons
                        <>
                          <label className="cursor-pointer">
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/jpg,image/webp"
                              onChange={handleImageSelect}
                              className="hidden"
                              disabled={isSubmitting}
                            />
                            <span className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium">
                              <FiCamera />
                              Change Image
                            </span>
                          </label>

                          <button
                            type="button"
                            onClick={handleImageRemove}
                            disabled={isSubmitting}
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
                          >
                            <FiTrash2 />
                            Remove Image
                          </button>
                        </>
                      )}
                    </div>

                    <p className="text-xs text-gray-500">
                      Supported formats: JPEG, PNG, WEBP. Max size: 5MB
                    </p>

                    {/* Show selected file name */}
                    {imageFile && !currentImage && (
                      <p className="text-sm text-green-600">
                        ✓ Selected: {imageFile.name}
                      </p>
                    )}

                    {imageFile && currentImage === imagePreview && (
                      <p className="text-sm text-blue-600">
                        New image selected: {imageFile.name} (will be saved with
                        profile)
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Basic Info Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  name="employeeId"
                  label="Employee ID"
                  placeholder="e.g. EMP124"
                  required={true}
                  disabled={true}
                />

                <TextInput
                  name="fullName"
                  label="Full Name"
                  placeholder="e.g. Ajay Trainee"
                  required={true}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  name="email"
                  label="Email Address"
                  placeholder="kajalcharve6@gmail.com"
                  required={true}
                  isDisabled={true}
                />

                <TextInput
                  name="mobile"
                  label="Mobile Number"
                  placeholder="8982251020"
                  required={false}
                />
              </div>

              {/* Location & Region Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  options={regionOptions}
                  required={true}
                />
              </div>

              {/* Work Info Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              {/* Additional Information Section */}
              <div className="border-t border-gray-300 pt-4 mt-4">
                <h3 className="text-lg font-semibold mb-3 text-gray-700">
                  Additional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>
              </div>

              {/* Timestamps */}
              <div className="border-t border-gray-300 pt-4 mt-2">
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

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="w-full py-3 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                    dispatch(getProfile());
                  }}
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </PageBody>
    </PageLayout>
  );
};

export default ProfileDetails;

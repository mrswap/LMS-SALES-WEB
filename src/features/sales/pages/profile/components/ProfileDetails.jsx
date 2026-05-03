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
import { useTranslation } from "react-i18next";
import countryOption from "../../../../../data/countries.json";

const ProfileDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isImageRemoved, setIsImageRemoved] = useState(false);
  const toast = useToast();
  const { t } = useTranslation();

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

  const regionOptions = countryOption.countries || [];

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
        toast.error(t("profileDetails.toast.imageInvalidType"));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error(t("profileDetails.toast.imageSizeExceed"));
        return;
      }

      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setIsImageRemoved(false);
    }
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreview(null);
    setIsImageRemoved(true);
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
    employeeId: Yup.string().required(
      t("profileDetails.validation.employeeIdRequired"),
    ),
    fullName: Yup.string().required(
      t("profileDetails.validation.fullNameRequired"),
    ),
    email: Yup.string()
      .email(t("profileDetails.validation.emailInvalid"))
      .required(t("profileDetails.validation.emailRequired")),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, t("profileDetails.validation.mobileInvalid"))
      .optional(),
    city: Yup.string().optional(),
    department: Yup.string().optional(),
    designationId: Yup.object()
      .nullable()
      .required(t("profileDetails.validation.designationRequired")),
    region: Yup.object()
      .nullable()
      .required(t("profileDetails.validation.regionRequired")),
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

      Object.keys(updateData).forEach((key) => {
        if (updateData[key] !== undefined && updateData[key] !== null) {
          formData.append(key, updateData[key]);
        }
      });

      if (imageFile) {
        formData.append("profile_image", imageFile);
      } else if (isImageRemoved) {
        formData.append("profile_image", null);
      }

      const result = await dispatch(updateProfile(formData)).unwrap();
      if (result) {
        dispatch(getProfile());
        setImageFile(null);
        setImagePreview(null);
        setIsImageRemoved(false);
        toast.success(t("profileDetails.toast.success"));
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error(t("profileDetails.toast.error"));
    } finally {
      setSubmitting(false);
    }
  };

  const currentImage = () => {
    if (isImageRemoved) return null;
    if (imagePreview) return imagePreview;
    if (profile?.profile_image) return profile.profile_image;
    return null;
  };

  if (isLoading && !profile) {
    return <Loader />;
  }

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>{t("profileDetails.pageTitle")}</PageTitle>
          <PageSubtitle>{t("profileDetails.pageSubtitle")}</PageSubtitle>
        </PageHeaderLeft>
      </PageHeader>

      <PageBody>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, isSubmitting, values, resetForm }) => (
            <Form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Image Section */}
              <div className="border-b border-gray-300 pb-6 mb-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
                  <FiCamera className="text-teal-500" />
                  {t("profileDetails.profileImage.title")}
                </h3>

                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 shadow-md">
                      {currentImage() ? (
                        <img
                          src={currentImage()}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-100 to-blue-100">
                          <FiUser className="w-12 h-12 text-teal-600" />
                        </div>
                      )}
                    </div>

                    {currentImage() && (
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

                    {!currentImage() && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <label className="cursor-pointer p-2 bg-white rounded-full hover:bg-gray-100 transition">
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/jpg,image/webp"
                            onChange={handleImageSelect}
                            className="hidden"
                          />
                          <FiCamera className="w-4 h-4 text-gray-700" />
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap gap-3">
                      {!currentImage() ? (
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
                            {t("profileDetails.profileImage.upload")}
                          </span>
                        </label>
                      ) : (
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
                              {t("profileDetails.profileImage.change")}
                            </span>
                          </label>

                          <button
                            type="button"
                            onClick={handleImageRemove}
                            disabled={isSubmitting}
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
                          >
                            <FiTrash2 />
                            {t("profileDetails.profileImage.remove")}
                          </button>
                        </>
                      )}
                    </div>

                    <p className="text-xs text-gray-500">
                      {t("profileDetails.profileImage.supportedFormats")}
                    </p>

                    {imageFile && (
                      <p className="text-sm text-green-600">
                        ✓ {t("profileDetails.profileImage.selected")}{" "}
                        {imageFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Basic Info Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  name="employeeId"
                  label={t("profileDetails.basicInfo.employeeId.label")}
                  placeholder={t(
                    "profileDetails.basicInfo.employeeId.placeholder",
                  )}
                  required={true}
                  disabled={true}
                />
                <TextInput
                  name="fullName"
                  label={t("profileDetails.basicInfo.fullName.label")}
                  placeholder={t(
                    "profileDetails.basicInfo.fullName.placeholder",
                  )}
                  required={true}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  name="email"
                  label={t("profileDetails.basicInfo.email.label")}
                  placeholder={t("profileDetails.basicInfo.email.placeholder")}
                  required={true}
                  isDisabled={true}
                />
                <TextInput
                  name="mobile"
                  label={t("profileDetails.basicInfo.mobile.label")}
                  placeholder={t("profileDetails.basicInfo.mobile.placeholder")}
                  required={false}
                />
              </div>

              {/* Location & Region Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  name="city"
                  label={t("profileDetails.location.city.label")}
                  placeholder={t("profileDetails.location.city.placeholder")}
                  required={false}
                />
                <SelectField
                  name="region"
                  label={t("profileDetails.location.region.label")}
                  placeholder={t("profileDetails.location.region.placeholder")}
                  options={regionOptions}
                  required={true}
                />
              </div>

              {/* Work Info Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  name="department"
                  label={t("profileDetails.workInfo.department.label")}
                  placeholder={t(
                    "profileDetails.workInfo.department.placeholder",
                  )}
                  required={false}
                />
                <SelectField
                  name="designationId"
                  label={t("profileDetails.workInfo.designation.label")}
                  placeholder={t(
                    "profileDetails.workInfo.designation.placeholder",
                  )}
                  options={designationOptions}
                  required={false}
                />
              </div>

              {/* Additional Information Section */}
              <div className="border-t border-gray-300 pt-4 mt-4">
                <h3 className="text-lg font-semibold mb-3 text-gray-700">
                  {t("profileDetails.additionalInfo.title")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      {t("profileDetails.additionalInfo.role")}
                    </label>
                    <div className="text-gray-800">
                      {values.roleLabel ||
                        values.roleName ||
                        t("profileDetails.additionalInfo.notAssigned")}
                      {values.roleId && ` (ID: ${values.roleId})`}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      {t("profileDetails.additionalInfo.accountStatus")}
                    </label>
                    <div
                      className={`font-medium ${values.isActive ? "text-green-600" : "text-red-600"}`}
                    >
                      {values.isActive
                        ? t("profileDetails.additionalInfo.active")
                        : t("profileDetails.additionalInfo.inactive")}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      {t("profileDetails.additionalInfo.emailVerified")}
                    </label>
                    <div className="text-gray-800">
                      {profile?.email_verified_at ? (
                        <span className="text-green-600">
                          {t("profileDetails.additionalInfo.verified")}{" "}
                          {new Date(
                            profile.email_verified_at,
                          ).toLocaleDateString()}
                        </span>
                      ) : (
                        <span className="text-yellow-600">
                          {t("profileDetails.additionalInfo.notVerified")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timestamps */}
              <div className="border-t border-gray-300 pt-4 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-500">
                  <div>
                    <span className="font-medium">
                      {t("profileDetails.timestamps.created")}
                    </span>{" "}
                    {profile?.created_at
                      ? new Date(profile.created_at).toLocaleString()
                      : t("profileDetails.timestamps.na")}
                  </div>
                  <div>
                    <span className="font-medium">
                      {t("profileDetails.timestamps.lastUpdated")}
                    </span>{" "}
                    {profile?.updated_at
                      ? new Date(profile.updated_at).toLocaleString()
                      : t("profileDetails.timestamps.na")}
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
                  {isSubmitting
                    ? t("profileDetails.buttons.saving")
                    : t("profileDetails.buttons.save")}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                    setIsImageRemoved(false);
                    resetForm();
                    dispatch(getProfile());
                  }}
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition disabled:opacity-50"
                >
                  {t("profileDetails.buttons.cancel")}
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

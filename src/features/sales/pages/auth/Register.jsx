import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  PageBody,
  PageHeader,
  PageHeaderLeft,
  PageLayout,
  PageSubtitle,
  PageTitle,
} from "../../common/layout";

import { TextInput, SelectField } from "../../common/form";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import {
  FaUserCircle,
  FaUpload,
  FaExchangeAlt,
  FaTrashAlt,
} from "react-icons/fa";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const roleOptions = [{ label: "Sales", value: "sales" }];

  const regionOptions = [
    { label: "India", value: "india" },
    { label: "USA", value: "usa" },
  ];

  const initialValues = {
    name: "",
    email: "",
    employee_id: "",
    role: null,
    // department: null,
    // designation: null,
    region: null,
    city: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    // profile_image: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(t("register.validation.nameRequired")),
    email: Yup.string()
      .email(t("register.validation.emailInvalid"))
      .required(t("register.validation.emailRequired")),
    role: Yup.object().required(t("register.validation.roleRequired")),
    // department: Yup.object().required(
    //   t("userManagement.validation.departmentRequired"),
    // ),
    // designation: Yup.object().required(
    //   t("userManagement.validation.designationRequired"),
    // ),
    region: Yup.object().required(t("register.validation.regionRequired")),
    city: Yup.string().required(t("register.validation.cityRequired")),
    mobile: Yup.string().required(t("register.validation.mobileRequired")),
    password: Yup.string()
      .min(6, t("register.validation.passwordMin"))
      .required(t("register.validation.passwordRequired")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], t("register.validation.passwordMatch"))
      .required(t("register.validation.confirmPasswordRequired")),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("employee_id", values.employee_id);
      formData.append("role", values.role?.value);
      // formData.append("department", values.department?.value);
      // formData.append("designation", values.designation?.value);
      formData.append("region", values.region?.value);
      formData.append("city", values.city);
      formData.append("mobile", values.mobile);
      formData.append("password", values.password);
      formData.append("designation", "executive");

      if (values.profile_image) {
        formData.append("profile_image", values.profile_image);
      }

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      //  await dispatch(createUser(formData)).unwrap();

      //  toast.success("User created successfully ");
      //  resetForm();
      //  setPreview(null);
      //  navigate("/assign-training");
    } catch (error) {
      //  toast.error(error?.message || "Error creating user");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <div className="p-6">
        <PageHeader className="mb-6">
          <PageHeaderLeft>
            <PageTitle>{t("register.title")}</PageTitle>
            <PageSubtitle>{t("register.subtitle")}</PageSubtitle>
          </PageHeaderLeft>
        </PageHeader>
        <PageBody>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, setFieldValue, handleSubmit, values }) => (
              <Form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <TextInput
                    name="name"
                    label={t("register.details.fullName")}
                    placeholder={t("register.details.fullNamePlaceholder")}
                    required
                  />
                  <TextInput
                    name="email"
                    label={t("register.details.email")}
                    placeholder={t("register.details.emailPlaceholder")}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <TextInput
                    name="mobile"
                    label={t("register.details.phone")}
                    placeholder={t("register.details.phonePlaceholder")}
                    required
                  />

                  <TextInput
                    name="employee_id"
                    label={t("register.details.employeeId")}
                    placeholder={t("register.details.employeeIdPlaceholder")}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <SelectField
                    name="region"
                    label={t("register.details.region")}
                    options={regionOptions}
                    required
                  />
                  <TextInput
                    name="city"
                    label={t("register.details.city")}
                    placeholder={t("register.details.cityPlaceholder")}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <SelectField
                    name="role"
                    label="Role"
                    options={roleOptions}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <TextInput
                    name="password"
                    label={t("register.details.password")}
                    placeholder={t("register.details.passwordPlaceholder")}
                    type="password"
                    required
                  />
                  <TextInput
                    name="confirmPassword"
                    label={t("register.details.confirmPassword")}
                    placeholder={t(
                      "register.details.confirmPasswordPlaceholder",
                    )}
                    type="password"
                    required
                  />
                </div>

                {/* FOOTER */}
                <div className="flex justify-center sm:justify-end gap-3 mt-2 mb-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-accent w-full sm:w-auto text-white rounded cursor-pointer"
                  >
                    {isSubmitting
                      ? t("register.actions.creating")
                      : t("register.actions.createAccount")}
                  </button>
                </div>

                <p className="text-[#64748B] text-[16px] font-[400] text-center">
                  {t("register.footerText")}
                </p>
              </Form>
            )}
          </Formik>
        </PageBody>
      </div>
    </PageLayout>
  );
};

export default Register;

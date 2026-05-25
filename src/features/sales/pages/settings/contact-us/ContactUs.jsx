import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FiSend, FiMail, FiPhone, FiMapPin, FiClock } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import TextInput from "../../../common/form/TextInput";
import TextareaField from "../../../common/form/TextareaField";
import FormButton from "../../../common/form/FormButton";
import { useToast } from "../../../common/toast/ToastContext";

import { postContactUs } from "../../../../../redux/slice/commonSlice";
import {
  PageBody,
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight,
  PageLayout,
  PageSubtitle,
  PageTitle,
} from "../../../common/layout";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../../../common/layout/Breadcrumb";

const ContactUs = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { isSubmitting, contactUsResponse, siteSettings, message } =
    useSelector((state) => state.common);

  const { profile } = useSelector((state) => state.profile);

  const initialValues = {
    name: profile?.name || "",
    email: profile?.email || "",
    subject: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required(t("contactUs.validation.nameRequired"))
      .min(2, t("contactUs.validation.nameMin")),
    email: Yup.string()
      .email(t("contactUs.validation.emailInvalid"))
      .required(t("contactUs.validation.emailRequired")),
    subject: Yup.string()
      .required(t("contactUs.validation.subjectRequired"))
      .min(3, t("contactUs.validation.subjectMin")),
    message: Yup.string()
      .required(t("contactUs.validation.messageRequired"))
      .min(10, t("contactUs.validation.messageMin")),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await dispatch(postContactUs(values)).unwrap();
      // toast.success(res?.message || t("contactUs.toast.success"));
      toast.success(t("contactUs.toast.success"));

      resetForm();
    } catch (err) {
      // toast.error(err?.message || t("contactUs.toast.error"));
      toast.error(t("contactUs.toast.error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <Breadcrumb
        items={[
          {
            label: t("contactUs.home"),
            path: `/dashboard`,
          },
          {
            label: t("contactUs.contact-us"),
          },
        ]}
      />
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>{t("contactUs.pageTitle")}</PageTitle>
          <PageSubtitle>{t("contactUs.pageSubtitle")}</PageSubtitle>
        </PageHeaderLeft>
        <PageHeaderRight />
      </PageHeader>
      <PageBody>
        <div className="grid md:grid-cols-2 gap-8">
          {/* LEFT SIDE - COMPANY INFO */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* Logo & Header */}
            <div className="p-6 border-b border-gray-100">
              {siteSettings?.company_logo && (
                <img
                  src={siteSettings?.company_logo}
                  alt="logo"
                  className="h-10 mb-4"
                />
              )}
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {siteSettings?.contact_heading}
              </h2>
              <p className="text-gray-600 text-sm">
                {siteSettings?.contact_text}
              </p>
            </div>

            {/* Company Bio */}
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                {t("contactUs.aboutCompany")}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {siteSettings?.company_bio}
              </p>
            </div>

            {/* Contact Details */}
            <div className="p-6">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
                {t("contactUs.contactInformation")}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <FiMail className="text-gray-400 flex-shrink-0" />
                  <span className="text-gray-600">
                    {siteSettings?.contact_email}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <FiPhone className="text-gray-400 flex-shrink-0" />
                  <span className="text-gray-600">
                    {siteSettings?.contact_phone}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <FiMapPin className="text-gray-400 flex-shrink-0" />
                  <span className="text-gray-600">
                    {t("contactUs.address")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - FORM */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {t("contactUs.sendMessage")}
            </h3>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              enableReinitialize={true}
            >
              {() => (
                <Form className="space-y-5">
                  <TextInput
                    name="name"
                    label={t("contactUs.form.fullName.label")}
                    placeholder={t("contactUs.form.fullName.placeholder")}
                    isDisabled
                  />

                  <TextInput
                    name="email"
                    type="email"
                    label={t("contactUs.form.email.label")}
                    placeholder={t("contactUs.form.email.placeholder")}
                    isDisabled
                  />

                  <TextInput
                    name="subject"
                    label={t("contactUs.form.subject.label")}
                    placeholder={t("contactUs.form.subject.placeholder")}
                  />

                  <TextareaField
                    name="message"
                    label={t("contactUs.form.message.label")}
                    rows={4}
                    placeholder={t("contactUs.form.message.placeholder")}
                  />

                  <FormButton
                    text={
                      isSubmitting
                        ? t("contactUs.buttons.sending")
                        : t("contactUs.buttons.sendMessage")
                    }
                    className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    type="submit"
                    disabled={isSubmitting}
                    icon={<FiSend />}
                  />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </PageBody>
    </PageLayout>
  );
};

export default ContactUs;

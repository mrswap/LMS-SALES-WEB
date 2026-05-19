// import React from "react";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import { FiSend, FiHelpCircle } from "react-icons/fi";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useToast } from "../common/toast/ToastContext";
// import { postContactUs } from "../../../redux/slice/commonSlice";
// import TextInput from "../common/form/TextInput";
// import TextareaField from "../common/form/TextareaField";
// import FormButton from "../common/form/FormButton";

// const Troubleshooting = () => {
//   const dispatch = useDispatch();
//   const toast = useToast();
//   const navigate = useNavigate();
//   const { isSubmitting } = useSelector((state) => state.common);
//   const { profile } = useSelector((state) => state.profile);

//   const initialValues = {
//     name: profile?.name || "",
//     email: profile?.email || "",
//     subject: "",
//     message: "",
//   };

//   const validationSchema = Yup.object({
//     name: Yup.string()
//       .required("Name is required")
//       .min(2, "Name must be at least 2 characters"),
//     email: Yup.string()
//       .email("Invalid email address")
//       .required("Email is required"),
//     subject: Yup.string()
//       .required("Subject is required")
//       .min(3, "Subject must be at least 3 characters"),
//     message: Yup.string()
//       .required("Message is required")
//       .min(10, "Message must be at least 10 characters"),
//   });

//   const onSubmit = async (values, { setSubmitting, resetForm }) => {
//     try {
//       const res = await dispatch(postContactUs(values)).unwrap();
//       toast.success(res?.message || "Message sent successfully!");
//       resetForm();
//     } catch (err) {
//       toast.error(err?.message || "Failed to send message. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className=" bg-gray-100">
//       <div className="max-w-3xl mx-auto p-4 sm:p-5 lg:p-6 min-h-full pb-10 sm:pb-6">
//         {/* Breadcrumb */}
//         <div className="mb-6">
//           <button
//             onClick={() => navigate("/login")}
//             className="text-sm text-blue-500 hover:text-blue-600 cursor-pointer"
//           >
//             ← Back to Login
//           </button>
//         </div>

//         {/* Classic Header */}
//         <div className="mb-4">
//           <div className="flex items-center gap-3 mb-2">
//             <FiHelpCircle className="w-8 h-8 text-gray-700" />
//             <h1 className="text-2xl font-semibold text-gray-900">
//               Troubleshooting Support
//             </h1>
//           </div>
//           <p className="text-gray-600">
//             Fill out the form below and our support team will assist you.
//           </p>
//         </div>

//         {/* Classic Form Card */}
//         <div className="bg-white border border-gray-300 overflow-hidden rounded-md shadow-xs">
//           <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
//             <h2 className="text-base font-medium text-gray-900">
//               Contact Support
//             </h2>
//           </div>

//           <div className="p-6">
//             <Formik
//               initialValues={initialValues}
//               validationSchema={validationSchema}
//               onSubmit={onSubmit}
//               enableReinitialize={true}
//             >
//               {() => (
//                 <Form className="space-y-4">
//                   <TextInput
//                     name="name"
//                     label="Full Name"
//                     placeholder="Enter your full name"
//                   />

//                   <TextInput
//                     name="email"
//                     type="email"
//                     label="Email Address"
//                     placeholder="Enter your email"
//                   />

//                   <TextInput
//                     name="subject"
//                     label="Subject"
//                     placeholder="What is this regarding?"
//                   />

//                   <TextareaField
//                     name="message"
//                     label="Message"
//                     rows={5}
//                     placeholder="Please describe your issue in detail..."
//                   />

//                   <div className="pt-2">
//                     <FormButton
//                       text={isSubmitting ? "Sending..." : "Send Message"}
//                       className="w-full bg-accent opacity-90 cursor-pointer text-white py-2 px-4 rounded text-sm font-medium transition-colors flex items-center justify-center gap-2"
//                       type="submit"
//                       disabled={isSubmitting}
//                       icon={<FiSend className="w-4 h-4" />}
//                     />
//                   </div>
//                 </Form>
//               )}
//             </Formik>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Troubleshooting;

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FiSend, FiHelpCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "../common/toast/ToastContext";
import { postContactUs } from "../../../redux/slice/commonSlice";
import TextInput from "../common/form/TextInput";
import TextareaField from "../common/form/TextareaField";
import FormButton from "../common/form/FormButton";
import { useTranslation } from "react-i18next";

const Troubleshooting = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isSubmitting } = useSelector((state) => state.common);
  const { profile } = useSelector((state) => state.profile);

  const initialValues = {
    name: profile?.name || "",
    email: profile?.email || "",
    subject: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required(t("troubleshooting.validation.nameRequired"))
      .min(2, t("troubleshooting.validation.nameMin")),
    email: Yup.string()
      .email(t("troubleshooting.validation.emailInvalid"))
      .required(t("troubleshooting.validation.emailRequired")),
    subject: Yup.string()
      .required(t("troubleshooting.validation.subjectRequired"))
      .min(3, t("troubleshooting.validation.subjectMin")),
    message: Yup.string()
      .required(t("troubleshooting.validation.messageRequired"))
      .min(10, t("troubleshooting.validation.messageMin")),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await dispatch(postContactUs(values)).unwrap();
      toast.success(res?.message || t("troubleshooting.successMessage"));
      resetForm();
    } catch (err) {
      toast.error(err?.message || t("troubleshooting.errorMessage"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className=" bg-gray-100">
      <div className="max-w-3xl mx-auto p-4 sm:p-5 lg:p-6 min-h-full pb-10 sm:pb-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-blue-500 hover:text-blue-600 cursor-pointer"
          >
            ← {t("troubleshooting.backToLogin")}
          </button>
        </div>

        {/* Classic Header */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-2">
            <FiHelpCircle className="w-8 h-8 text-gray-700" />
            <h1 className="text-2xl font-semibold text-gray-900">
              {t("troubleshooting.title")}
            </h1>
          </div>
          <p className="text-gray-600">{t("troubleshooting.description")}</p>
        </div>

        {/* Classic Form Card */}
        <div className="bg-white border border-gray-300 overflow-hidden rounded-md shadow-xs">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-base font-medium text-gray-900">
              {t("troubleshooting.contactSupport")}
            </h2>
          </div>

          <div className="p-6">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              enableReinitialize={true}
            >
              {() => (
                <Form className="space-y-4">
                  <TextInput
                    name="name"
                    label={t("troubleshooting.form.fullName.label")}
                    placeholder={t("troubleshooting.form.fullName.placeholder")}
                  />

                  <TextInput
                    name="email"
                    type="email"
                    label={t("troubleshooting.form.email.label")}
                    placeholder={t("troubleshooting.form.email.placeholder")}
                  />

                  <TextInput
                    name="subject"
                    label={t("troubleshooting.form.subject.label")}
                    placeholder={t("troubleshooting.form.subject.placeholder")}
                  />

                  <TextareaField
                    name="message"
                    label={t("troubleshooting.form.message.label")}
                    rows={5}
                    placeholder={t("troubleshooting.form.message.placeholder")}
                  />

                  <div className="pt-2">
                    <FormButton
                      text={
                        isSubmitting
                          ? t("troubleshooting.form.sending")
                          : t("troubleshooting.form.sendMessage")
                      }
                      className="w-full bg-accent opacity-90 cursor-pointer text-white py-2 px-4 rounded text-sm font-medium transition-colors flex items-center justify-center gap-2"
                      type="submit"
                      disabled={isSubmitting}
                      icon={<FiSend className="w-4 h-4" />}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Troubleshooting;

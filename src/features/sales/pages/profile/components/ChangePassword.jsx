// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import { TextInput } from "../../../common/form/index";

// import {
//   PageLayout,
//   PageHeader,
//   PageHeaderLeft,
//   PageTitle,
//   PageSubtitle,
//   PageBody,
// } from "../../../common/layout/index";
// import { changePassword } from "../../../../../redux/slice/profileSlice";
// import { useToast } from "../../../common/toast/ToastContext";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";

// const ChangePassword = () => {
//   const toast = useToast();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { t } = useTranslation();

//   const initialValues = {
//     currentPassword: "",
//     newPassword: "",
//     confirmNewPassword: "",
//   };

//   const validationSchema = Yup.object({
//     currentPassword: Yup.string().required(
//       t("changePassword.validation.currentPasswordRequired"),
//     ),
//     newPassword: Yup.string()
//       .min(6, t("changePassword.validation.newPasswordMin"))
//       .required(t("changePassword.validation.newPasswordRequired")),
//     confirmNewPassword: Yup.string()
//       .oneOf(
//         [Yup.ref("newPassword")],
//         t("changePassword.validation.passwordMatch"),
//       )
//       .required(t("changePassword.validation.confirmPasswordRequired")),
//   });

//   const onSubmit = async (values, { resetForm }) => {
//     try {
//       const payload = {
//         old_password: values.currentPassword,
//         new_password: values.newPassword,
//         new_password_confirmation: values.confirmNewPassword,
//       };

//       const res = await dispatch(changePassword(payload)).unwrap();

//       toast.success(res.message || t("changePassword.successMessage"));
//       resetForm();
//       navigate("/profile");
//     } catch (error) {
//       toast.error(error?.message || t("changePassword.errorMessage"));
//     }
//   };

//   return (
//     <PageLayout>
//       <PageHeader>
//         <PageHeaderLeft>
//           <PageTitle>{t("changePassword.pageTitle")}</PageTitle>
//           <PageSubtitle>{t("changePassword.pageSubtitle")}</PageSubtitle>
//         </PageHeaderLeft>
//       </PageHeader>

//       <PageBody>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={onSubmit}
//         >
//           {({ handleSubmit }) => (
//             <Form onSubmit={handleSubmit} className="space-y-4 ">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
//                 <TextInput
//                   name="currentPassword"
//                   label={t("changePassword.fields.currentPassword.label")}
//                   type="password"
//                   placeholder={t(
//                     "changePassword.fields.currentPassword.placeholder",
//                   )}
//                   required={true}
//                 />

//                 <TextInput
//                   name="newPassword"
//                   label={t("changePassword.fields.newPassword.label")}
//                   type="password"
//                   placeholder={t(
//                     "changePassword.fields.newPassword.placeholder",
//                   )}
//                   required={true}
//                 />
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
//                 <TextInput
//                   name="confirmNewPassword"
//                   label={t("changePassword.fields.confirmNewPassword.label")}
//                   type="password"
//                   placeholder={t(
//                     "changePassword.fields.confirmNewPassword.placeholder",
//                   )}
//                   required={true}
//                 />
//               </div>

//               {/* Button */}
//               <button
//                 type="submit"
//                 className="w-full py-3 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 transition"
//               >
//                 {t("changePassword.button")}
//               </button>
//             </Form>
//           )}
//         </Formik>
//       </PageBody>
//     </PageLayout>
//   );
// };

// export default ChangePassword;

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInput } from "../../../common/form/index";

import {
  PageLayout,
  PageHeader,
  PageHeaderLeft,
  PageTitle,
  PageSubtitle,
  PageBody,
} from "../../../common/layout/index";
import { changePassword } from "../../../../../redux/slice/profileSlice";
import { useToast } from "../../../common/toast/ToastContext";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ChangePassword = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required(
      t("changePassword.validation.currentPasswordRequired"),
    ),
    newPassword: Yup.string()
      .min(6, t("changePassword.validation.newPasswordMin"))
      .required(t("changePassword.validation.newPasswordRequired")),
    confirmNewPassword: Yup.string()
      .oneOf(
        [Yup.ref("newPassword")],
        t("changePassword.validation.passwordMatch"),
      )
      .required(t("changePassword.validation.confirmPasswordRequired")),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      const payload = {
        old_password: values.currentPassword,
        new_password: values.newPassword,
        new_password_confirmation: values.confirmNewPassword,
      };

      const res = await dispatch(changePassword(payload)).unwrap();

      toast.success(res.message || t("changePassword.successMessage"));
      resetForm();
      navigate("/profile");
    } catch (error) {
      toast.error(error?.message || t("changePassword.errorMessage"));
    }
  };

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>{t("changePassword.pageTitle")}</PageTitle>
          <PageSubtitle>{t("changePassword.pageSubtitle")}</PageSubtitle>
        </PageHeaderLeft>
      </PageHeader>

      <PageBody>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="space-y-4 ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                <TextInput
                  name="currentPassword"
                  label={t("changePassword.fields.currentPassword.label")}
                  type="password"
                  placeholder={t(
                    "changePassword.fields.currentPassword.placeholder",
                  )}
                  required={true}
                />

                <TextInput
                  name="newPassword"
                  label={t("changePassword.fields.newPassword.label")}
                  type="password"
                  placeholder={t(
                    "changePassword.fields.newPassword.placeholder",
                  )}
                  required={true}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                <TextInput
                  name="confirmNewPassword"
                  label={t("changePassword.fields.confirmNewPassword.label")}
                  type="password"
                  placeholder={t(
                    "changePassword.fields.confirmNewPassword.placeholder",
                  )}
                  required={true}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 transition"
              >
                {t("changePassword.button")}
              </button>
            </Form>
          )}
        </Formik>
      </PageBody>
    </PageLayout>
  );
};

export default ChangePassword;

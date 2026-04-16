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

const ChangePassword = () => {
  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Current password required"),
    newPassword: Yup.string()
      .min(6, "Min 6 chars")
      .required("New password required"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password required"),
  });

  const onSubmit = (values) => {
    console.log("Password Data:", values);
  };

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>Change Password</PageTitle>
          <PageSubtitle>Update your account password</PageSubtitle>
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
                  label="Current Password"
                  type="password"
                  placeholder="Enter current password"
                  required={true}
                />

                <TextInput
                  name="newPassword"
                  label="New Password"
                  type="password"
                  placeholder="Enter new password"
                  required={true}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                <TextInput
                  name="confirmNewPassword"
                  label="Confirm New Password"
                  type="password"
                  placeholder="Re-enter new password"
                  required={true}
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 transition"
              >
                Update Password
              </button>
            </Form>
          )}
        </Formik>
      </PageBody>
    </PageLayout>
  );
};

export default ChangePassword;

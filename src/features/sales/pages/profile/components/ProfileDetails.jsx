import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInput, SelectField } from "../../../common/form/index";

import {
  PageLayout,
  PageHeader,
  PageHeaderLeft,
  PageTitle,
  PageSubtitle,
  PageBody,
} from "../../../common/layout/index";

const ProfileDetails = () => {
  const initialValues = {
    employeeId: "",
    fullName: "",
    email: "",
    role: "",
    region: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    employeeId: Yup.string().required("Employee ID required"),
    fullName: Yup.string().required("Full name required"),
    email: Yup.string().email("Invalid email").required("Email required"),
    role: Yup.string().required("Role required"),
    region: Yup.string().required("Region required"),
    password: Yup.string().min(6, "Min 6 chars").required("Password required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password required"),
  });

  const onSubmit = (values) => {
    console.log("Form Data:", values);
  };

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>Update Profile</PageTitle>
          <PageSubtitle>Fill profile details</PageSubtitle>
        </PageHeaderLeft>
      </PageHeader>

      <PageBody>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                <TextInput
                  name="employeeId"
                  label="Employee ID"
                  placeholder="e.g. EMP-12345"
                  required={true}
                />

                <TextInput
                  name="fullName"
                  label="Full Name"
                  placeholder="e.g. Dr. Sarah Jenkins"
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
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                <SelectField
                  name="role"
                  label="Role"
                  placeholder="Select Role"
                  options={[
                    { label: "Admin", value: "admin" },
                    { label: "Manager", value: "manager" },
                    { label: "Employee", value: "employee" },
                  ]}
                  required={true}
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
                  name="password"
                  label="Create Password"
                  type="password"
                  placeholder="********"
                  required={true}
                />

                <TextInput
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="********"
                  required={true}
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 transition"
              >
                Save
              </button>
            </Form>
          )}
        </Formik>
      </PageBody>
    </PageLayout>
  );
};

export default ProfileDetails;

import { AuthPage } from "@refinedev/antd";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      title="BYC"
      formProps={{
        initialValues: { email: "admin@admin.com", password: "password123" },
      }}
    />
  );
};

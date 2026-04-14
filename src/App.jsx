import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./features/sales/pages/auth/Login";
import ForgotPassword from "./features/sales/pages/auth/ForgotPassword";
import CheckEmail from "./features/sales/pages/auth/CheckEmail";
// import GlobalConfirmModal from "./features/sales/common/GlobalConfirmModal";
// import ResetPassword from "./features/sales/pages/auth/ResetPassword";
// import NotFound from "./NotFound";
import Register from "./features/sales/pages/auth/Register";
import SalesRoutes from "./features/sales/routes/SalesRoutes";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/check-email" element={<CheckEmail />} />
        {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}

        {SalesRoutes}
      </Routes>
      {/* <GlobalConfirmModal /> */}
    </>
  );
};

export default App;

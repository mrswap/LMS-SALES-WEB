// components/ProtectedQuizExamRoute.jsx
import { Navigate, useNavigationType, useLocation } from "react-router-dom";

const ProtectedQuizExamRoute = ({ children }) => {
  const navigationType = useNavigationType();
  const location = useLocation();

  // Check if navigation is via direct URL or browser buttons
  // POP = browser back/forward, direct URL typing
  if (navigationType === "POP") {
    // Agar direct ya browser arrow se aa raha hai to dashboard bhej
    return <Navigate to="/" replace />;
  }

  // Agar button click se navigation hai to normally render
  return children;
};

export default ProtectedQuizExamRoute;

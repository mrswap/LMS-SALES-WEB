// import { FiMail, FiArrowLeft, FiCheckCircle } from "react-icons/fi";
// import { useNavigate, useLocation } from "react-router-dom";
// import logo from "../../../../assets/admin/AvanteMedicalLogoBlue.png";
// import successIcon from "../../../../assets/admin/success-right.png";

// const CheckEmail = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get email from registration form (passed via navigation state)
//   const userEmail = location.state?.email || "your registered email";

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 px-4">
//       {/* Logo */}
//       <div className="text-center mb-8">
//         <img
//           src={logo}
//           alt="Avante Medical"
//           className="w-[180px] h-auto mx-auto"
//         />
//       </div>

//       {/* Card */}
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
//         {/* Success Icon */}
//         <div className="flex justify-center mb-4">
//           <div className="bg-green-100 rounded-full p-3">
//             <img src={successIcon} alt="Success" className="w-16 h-16" />
//           </div>
//         </div>

//         {/* Heading */}
//         <div className="text-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">
//             Check Your Email
//           </h2>
//           <div className="w-16 h-1 bg-teal-500 mx-auto rounded-full"></div>
//         </div>

//         {/* Message */}
//         <div className="text-center mb-6">
//           <p className="text-gray-600 mb-3">
//             We've sent a verification token to your email address:
//           </p>
//           <p className="font-semibold text-teal-600 bg-teal-50 inline-block px-4 py-2 rounded-lg">
//             {userEmail}
//           </p>
//           <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
//             <p className="text-sm text-gray-700">
//               <span className="font-semibold text-blue-600">
//                 ✓ Token Sent Successfully!
//               </span>
//               <br />
//               Please check your mailbox and click the verification link to
//               activate your account.
//             </p>
//           </div>
//         </div>

//         {/* Additional Info */}
//         <div className="text-center text-sm text-gray-500 mb-6">
//           <p>⏱️ Token expires in 10 minutes</p>
//           <p className="mt-1">
//             📧 Didn't receive email? Check your spam folder
//           </p>
//         </div>

//         {/* Buttons */}
//         <div className="space-y-3">
//           <button
//             onClick={() => navigate("/login")}
//             className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2.5 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
//           >
//             Go to Login
//           </button>

//           <button
//             onClick={() => window.history.back()}
//             className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:border-teal-500 text-gray-700 hover:text-teal-600 font-medium py-2.5 rounded-lg transition-all duration-200"
//           >
//             <FiArrowLeft size={16} />
//             Back to Registration
//           </button>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="mt-8 text-center">
//         <p className="text-xs text-gray-400">
//           © 2025 Avante Medical LMS · v2.1.0
//         </p>
//       </div>
//     </div>
//   );
// };

// export default CheckEmail;

import {
  FiMail,
  FiArrowLeft,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
} from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../../../assets/admin/AvanteMedicalLogoBlue.png";

const CheckEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get email from registration form (passed via navigation state)
  const userEmail = location.state?.email || "your registered email";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 px-4">
      {/* Logo */}
      <div className="text-center mb-8">
        <img
          src={logo}
          alt="Avante Medical"
          className="w-[180px] h-auto mx-auto"
        />
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 rounded-full p-3">
            <FiCheckCircle className="w-16 h-16 text-green-500" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Check Your Email
          </h2>
          <div className="w-16 h-1 bg-teal-500 mx-auto rounded-full"></div>
        </div>

        {/* Message */}
        <div className="text-center mb-6">
          <p className="text-gray-600 mb-3">
            We've sent a verification token to your email address:
          </p>
          <p className="font-semibold text-teal-600 bg-teal-50 inline-flex items-center gap-2 px-4 py-2 rounded-lg">
            <FiMail size={16} />
            {userEmail}
          </p>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-blue-600 inline-flex items-center gap-1">
                <FiCheckCircle size={14} />
                Token Sent Successfully!
              </span>
              <br />
              Please check your mailbox and click the verification link to
              activate your account.
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center text-sm text-gray-500 mb-6 space-y-2">
          <p className="flex items-center justify-center gap-2">
            <FiClock size={14} />
            Token expires in 10 minutes
          </p>
          <p className="flex items-center justify-center gap-2">
            <FiAlertCircle size={14} />
            Didn't receive email? Check your spam folder
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2.5 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
          >
            Go to Login
          </button>

          <button
            onClick={() => window.history.back()}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:border-teal-500 text-gray-700 hover:text-teal-600 font-medium py-2.5 rounded-lg transition-all duration-200"
          >
            <FiArrowLeft size={16} />
            Back to Registration
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-400">
          © 2025 Avante Medical LMS · v2.1.0
        </p>
      </div>
    </div>
  );
};

export default CheckEmail;

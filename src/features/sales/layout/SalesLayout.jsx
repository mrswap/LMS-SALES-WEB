import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useIdleTimeout from "../../../hooks/useIdleTimeout";
import SessionModal from "../common/SessionModal";
import Navbar from "../components/Navbar";
import NavbarBottom from "../components/NavbarBottom";
import Footer from "../components/Footer";
import { logout } from "../../../redux/slice/authSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { FaCommentDots } from "react-icons/fa";

const SalesLayout = () => {
  const navigate = useNavigate();
  const mainRef = useRef(null);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Add chat handler function
  const handleChatClick = () => {
    navigate("/support");
  };

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [location.pathname]);

  const { showModal, setShowModal, resetTimer } = useIdleTimeout(
    handleLogout,
    // 10 * 1000,
  );

  return (
    <>
      <SessionModal
        open={showModal}
        onContinue={() => {
          setShowModal(false);
          resetTimer();
        }}
        onLogout={handleLogout}
      />
      <div className="h-screen flex flex-col overflow-hidden ">
        {/* Desktop Navbar */}
        <Navbar />

        <div className="flex flex-1 overflow-hidden relative">
          <main
            ref={mainRef}
            className="flex-1 overflow-auto bg-white custom-scrollbar"
          >
            {/* Centered Content with Max Width */}
            <div className=" max-w-[1500px] mx-auto p-4 sm:p-5 lg:p-6 min-h-full pb-10 sm:pb-6">
              <Outlet />
            </div>
            <Footer />
          </main>
        </div>

        {/* Mobile Bottom Navbar */}
        <NavbarBottom />

        {/* Chat Button - Added here */}
        <div className="fixed bottom-36 lg:bottom-24 right-8 z-20">
          <button
            onClick={handleChatClick}
            className="relative px-3 py-3 cursor-pointer rounded-xl text-base font-medium bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 shadow-lg transition-all duration-300 hover:scale-105 animate-pulse"
          >
            <FaCommentDots className="inline-block  text-lg" />
            {/* Pulsing dot effect */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SalesLayout;

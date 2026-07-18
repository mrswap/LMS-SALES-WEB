import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useIdleTimeout from "../../../hooks/useIdleTimeout";
import SessionModal from "../common/SessionModal";
import Navbar from "../components/Navbar";
import NavbarBottom from "../components/NavbarBottom";
import Footer from "../components/Footer";
import { logout } from "../../../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { FaCommentDots } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
// import GoogleTranslate from "../../../components/GoogleTranslate";
// import LanguageSelector from "../../../components/LanguageSelector";
// import LoadingOverlay from "../../../components/LoadingOverlay";

const SalesLayout = () => {
  const navigate = useNavigate();
  const mainRef = useRef(null);
  const dispatch = useDispatch();
  const { profile, isLoading, isError, message } = useSelector(
    (state) => state.profile,
  );

  const location = useLocation();
  const isSupportPage =
    // location.pathname === "/support";
    location.pathname === "/support" ||
    location.pathname.startsWith("/quiz/") ||
    location.pathname.startsWith("/exam-module/") ||
    location.pathname.startsWith("/topics/");

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
      {/* <LoadingOverlay /> */}
      <SessionModal
        open={showModal}
        onContinue={() => {
          setShowModal(false);
          resetTimer();
        }}
        onLogout={handleLogout}
      />
      <div className="h-screen flex flex-col overflow-hidden">
        {/* Desktop Navbar */}
        <Navbar />

        {/* <GoogleTranslate /> */}

        {/* <div className="fixed top-4 right-4 z-50">
          <LanguageSelector />
        </div> */}

        <div className="flex flex-1 overflow-hidden relative">
          {/* Sidebar - 20% width, hidden on small screens */}
          <Sidebar />

          {/* Main Content - takes remaining width */}
          <main
            ref={mainRef}
            className="flex-1 overflow-auto bg-[#F6F9FE] custom-scrollbar" //bg-[#F6F9FE]
          >
            {/* Centered Content with Max Width */}
            <div className=" max-w-[1800px] mx-auto p-4 sm:p-5 lg:p-6 min-h-full pb-10 sm:pb-6">
              <Outlet />
            </div>
            <Footer />
          </main>
        </div>

        {/* Mobile Bottom Navbar */}
        <NavbarBottom />

        {/* Chat Button */}
        {!isSupportPage && (
          <div className="fixed bottom-36 lg:bottom-24 right-8 z-20">
            <button
              onClick={handleChatClick}
              className="relative px-3 py-3 cursor-pointer rounded-xl text-base font-medium bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 shadow-lg transition-all duration-300 hover:scale-105"
            >
              <FaCommentDots className="inline-block text-lg" />

              {profile?.support_unread_count > 0 && (
                <span className="absolute -top-2 -right-2 flex">
                  <span className="animate-ping absolute inline-flex h-5 min-w-[20px] w-full rounded-full bg-red-400 opacity-75"></span>

                  <span className="relative min-w-[20px] h-5 px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-[11px] font-bold shadow-md">
                    {profile?.support_unread_count > 99
                      ? "99+"
                      : profile?.support_unread_count}
                  </span>
                </span>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SalesLayout;

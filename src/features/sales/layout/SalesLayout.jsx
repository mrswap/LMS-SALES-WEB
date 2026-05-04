import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useIdleTimeout from "../../../hooks/useIdleTimeout";
import SessionModal from "../common/SessionModal";
// import Header from "../components/Header";
import Navbar from "../components/Navbar";
import NavbarBottom from "../components/NavbarBottom";
import Footer from "../components/Footer";
import { logout } from "../../../redux/slice/authSlice";
import { useDispatch } from "react-redux";

const SalesLayout = () => {
  const navigate = useNavigate();
  const mainRef = useRef(null);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // ✅ Tab/Window close hone par auto logout
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Jab user tab close karega, immediately logout
      dispatch(logout());
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [dispatch]);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [location.pathname]);

  // useEffect(() => {
  //   if (mainRef.current) {
  //     mainRef.current.scrollTo({
  //       top: 0,
  //       behavior: "smooth",
  //     });
  //   }
  // }, [location.pathname]);

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
        {/* <Header /> */}

        {/* Desktop Navbar */}
        <Navbar />

        <div className="flex flex-1 overflow-hidden relative">
          <main
            ref={mainRef}
            className="flex-1 overflow-auto bg-white custom-scrollbar"
          >
            {/* Centered Content with Max Width */}
            <div className=" max-w-[1500px] mx-auto p-4 sm:p-5 lg:p-6 min-h-full pb-20 sm:pb-6">
              <Outlet />
            </div>
            <Footer />
          </main>
        </div>

        {/* Mobile Bottom Navbar */}
        <NavbarBottom />
      </div>
    </>
  );
};

export default SalesLayout;

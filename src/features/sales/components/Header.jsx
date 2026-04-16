import { useState, useEffect, useRef } from "react";
import {
  FiSearch,
  FiBell,
  FiMessageSquare,
  FiUser,
  FiMenu,
  FiX,
} from "react-icons/fi";
import logo from "../../../assets/admin/AvanteMedicalLogo.png";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="h-14 sm:h-16 bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] flex items-center justify-between px-3 sm:px-6 shadow-lg border-b border-[#1d3d8a] z-50 relative">
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-2 text-white font-semibold text-base sm:text-lg">
          <img src={logo} alt="Logo" className="h-7 sm:h-8" />
        </div>
      </div>
    </div>
  );
};

export default Header;

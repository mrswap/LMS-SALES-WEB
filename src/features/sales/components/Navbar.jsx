import React from "react";
import { NavLink } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { MdOutlineVideoLibrary, MdAnalytics, MdSettings } from "react-icons/md";
// import logo from "../../../assets/admin/adminAvanteMedicalLogoBlue.png";

const Navbar = () => {
  const linkClass =
    "relative px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ease-out flex items-center gap-2 overflow-hidden group";

  const activeClass =
    "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-200/50";
  const inactiveClass = "text-gray-600 hover:text-blue-600 hover:bg-blue-50";

  const navItems = [
    { path: "/dashboard", name: "Home", icon: HiHome },
    { path: "/levels", name: "My Levels", icon: MdOutlineVideoLibrary },
    { path: "/progress", name: "Analytics", icon: MdAnalytics },
    { path: "/profile", name: "Profile", icon: MdSettings },
  ];

  return (
    <nav className="hidden sm:block w-full bg-white/80 backdrop-blur-md border-b border-gray-300 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          {/* <div className="flex items-center gap-2 text-white font-semibold text-base sm:text-lg">
            <img src={logo} alt="Logo" className="h-7 sm:h-8" />
          </div> */}

          {/* Navigation Menu - Centered */}
          <div className="flex gap-2 md:gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : inactiveClass}`
                }
              >
                <item.icon className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                <span>{item.name}</span>

                {/* Animated underline for inactive items */}
                {({ isActive }) =>
                  !isActive && (
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                  )
                }
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

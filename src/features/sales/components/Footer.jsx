import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaApple,
  FaAndroid,
  FaPhone,
  FaEnvelope,
  FaArrowUp,
  FaDownload,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { getSiteSettings } from "../../../redux/slice/commonSlice";
import Loader from "../common/Loader";

const Footer = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { siteSettings, isLoading } = useSelector((state) => state.common);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    dispatch(getSiteSettings());
  }, [dispatch]);

  // Scroll to top functionality
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Destructure siteSettings
  const {
    company_logo,
    company_bio,
    social_facebook,
    social_twitter,
    social_linkedin,
    social_instagram,
    contact_heading,
    contact_text,
    contact_phone,
    contact_email,
    app_ios_store,
    app_android_store,
    app_ios_download,
    app_android_download,
    footer_text,
  } = siteSettings || {};

  // Social Links
  const socialLinks = [
    {
      icon: FaFacebookF,
      url: social_facebook,
      color: "hover:bg-[#1877F2]",
      name: t("footer.socialLinks.facebook"),
    },
    {
      icon: FaTwitter,
      url: social_twitter,
      color: "hover:bg-[#1DA1F2]",
      name: t("footer.socialLinks.twitter"),
    },
    {
      icon: FaLinkedinIn,
      url: social_linkedin,
      color: "hover:bg-[#0A66C2]",
      name: t("footer.socialLinks.linkedin"),
    },
    {
      icon: FaInstagram,
      url: social_instagram,
      color: "hover:bg-[#E4405F]",
      name: t("footer.socialLinks.instagram"),
    },
  ];

  // Quick Links
  const quickLinks = [
    { name: t("footer.aboutUs"), path: "/about-us" },
    { name: t("footer.privacy"), path: "/policy" },
    { name: t("footer.terms"), path: "/terms-conditions" },
    { name: t("footer.contactUs"), path: "/contact-us" },
  ];

  if (isLoading) {
    return <Loader />;
  }

  if (!siteSettings || Object.keys(siteSettings).length === 0) {
    return null;
  }

  return (
    <>
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-16 pb-8 relative mt-4 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* 5 Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Column 1: Company Info */}
            <div className="space-y-4">
              {company_logo && (
                <img
                  src={company_logo}
                  alt="Company Logo"
                  className="w-[160px] sm:w-[160px] h-[100px] bg-white rounded-sm"
                />
              )}
              {company_bio && (
                <p className="text-gray-300 leading-relaxed text-sm">
                  {company_bio}
                </p>
              )}

              {socialLinks.some((link) => link.url) && (
                <div className="flex space-x-3 pt-2">
                  {socialLinks.map(
                    (social, index) =>
                      social.url && (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.name}
                          className={`w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center transition-all duration-300 ${social.color} hover:scale-110 hover:shadow-lg cursor-pointer relative z-20`}
                        >
                          <social.icon className="w-4 h-4" />
                        </a>
                      ),
                  )}
                </div>
              )}
            </div>

            {/* Column 2: Contact Info */}
            {(contact_heading ||
              contact_text ||
              contact_phone ||
              contact_email) && (
              <div className="space-y-4">
                {contact_heading && (
                  <h3 className="text-lg font-semibold mb-4 relative inline-block">
                    {contact_heading}
                    <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-blue-500 rounded-full"></span>
                  </h3>
                )}
                {contact_text && (
                  <p className="text-gray-300 text-sm mb-4">{contact_text}</p>
                )}
                <div className="space-y-3">
                  {contact_phone && (
                    <div className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors">
                      <FaPhone className="w-4 h-4 text-blue-400" />
                      <a
                        href={`tel:${contact_phone}`}
                        className="text-sm relative z-20"
                      >
                        {contact_phone}
                      </a>
                    </div>
                  )}
                  {contact_email && (
                    <div className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors">
                      <FaEnvelope className="w-4 h-4 text-blue-400" />
                      <a
                        href={`mailto:${contact_email}`}
                        className="text-sm relative z-20"
                      >
                        {contact_email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Column 3: Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4 relative inline-block">
                {t("footer.quickLinks")}
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-blue-500 rounded-full"></span>
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group relative z-20"
                    >
                      <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: App Store Links */}
            {(app_ios_store || app_android_store) && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4 relative inline-block">
                  {t("footer.stores")}
                  <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-blue-500 rounded-full"></span>
                </h3>
                <div className="space-y-3">
                  {app_ios_store && (
                    <a
                      href={app_ios_store}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-gray-700 hover:bg-gray-600 rounded-lg p-3 transition-all duration-300 group hover:scale-105 cursor-pointer relative z-20"
                    >
                      <FaApple className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />
                      <div>
                        <p className="text-xs text-gray-400">
                          {t("footer.downloadOn")}
                        </p>
                        <p className="text-sm font-semibold">
                          {t("footer.appStore")}
                        </p>
                      </div>
                    </a>
                  )}
                  {app_android_store && (
                    <a
                      href={app_android_store}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-gray-700 hover:bg-gray-600 rounded-lg p-3 transition-all duration-300 group hover:scale-105 cursor-pointer relative z-20"
                    >
                      <FaAndroid className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />
                      <div>
                        <p className="text-xs text-gray-400">
                          {t("footer.downloadOn")}
                        </p>
                        <p className="text-sm font-semibold">
                          {t("footer.playStore")}
                        </p>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Column 5: Direct Download */}
            {(app_ios_download || app_android_download) && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4 relative inline-block">
                  {t("footer.directDownload")}
                  <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-blue-500 rounded-full"></span>
                </h3>
                <div className="space-y-3">
                  {app_ios_download && (
                    <a
                      href={app_ios_download}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-gray-700 hover:bg-gray-600 rounded-lg p-3 transition-all duration-300 group hover:scale-105 cursor-pointer relative z-20"
                    >
                      <FaDownload className="w-6 h-6 text-green-400 group-hover:text-green-300" />
                      <div>
                        <p className="text-xs text-gray-400">
                          {t("footer.directDownload")}
                        </p>
                        <p className="text-sm font-semibold">
                          {t("footer.iosApp")}
                        </p>
                      </div>
                    </a>
                  )}
                  {app_android_download && (
                    <a
                      href={app_android_download}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-gray-700 hover:bg-gray-600 rounded-lg p-3 transition-all duration-300 group hover:scale-105 cursor-pointer relative z-20"
                    >
                      <FaDownload className="w-6 h-6 text-green-400 group-hover:text-green-300" />
                      <div>
                        <p className="text-xs text-gray-400">
                          {t("footer.directDownload")}
                        </p>
                        <p className="text-sm font-semibold">
                          {t("footer.androidApp")}
                        </p>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer Bottom */}
          {footer_text && (
            <div className="border-t border-gray-700 pt-8 mt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-400 text-sm">{footer_text}</p>
              </div>
            </div>
          )}
        </div>

        {/* Decorative Elements - Fixed z-index aur pointer-events none */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 opacity-5 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 opacity-5 rounded-full filter blur-3xl pointer-events-none"></div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-50 group"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </button>
      )}
    </>
  );
};

export default Footer;

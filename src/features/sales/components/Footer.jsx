import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaApple,
  FaAndroid,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { getSiteSettings } from "../../../redux/slice/commonSlice";
import img from "../../../assets/admin/AvanteMedicalLogo.png";

const Footer = () => {
  const dispatch = useDispatch();
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

  // Dummy data for null values
  const dummyData = {
    company_logo: img,
    company_bio:
      "Empowering businesses with innovative solutions and cutting-edge technology. We strive to deliver excellence in every project we undertake.",
    app_ios_store: "https://apps.apple.com",
    app_ios_download: "/ios-app",
    app_android_store: "https://play.google.com",
    app_android_download: "/android-app",
    contact_heading: "Get in Touch",
    contact_text:
      "Have questions? We'd love to hear from you. Reach out to us anytime!",
    contact_phone: "+1 (555) 123-4567",
    contact_email: "info@company.com",
    social_facebook: "https://facebook.com",
    social_linkedin: "https://linkedin.com",
    social_instagram: "https://instagram.com",
    social_twitter: "https://twitter.com",
    footer_text: "© 2024 All rights reserved.",
    about_us: "/about",
    privacy_policy: "/privacy",
    terms_conditions: "/terms",
  };

  // Use API data if available, otherwise use dummy data
  const data = {
    company_logo: siteSettings?.company_logo || dummyData.company_logo,
    company_bio: siteSettings?.company_bio || dummyData.company_bio,
    app_ios_store: siteSettings?.app_ios_store || dummyData.app_ios_store,
    app_ios_download:
      siteSettings?.app_ios_download || dummyData.app_ios_download,
    app_android_store:
      siteSettings?.app_android_store || dummyData.app_android_store,
    app_android_download:
      siteSettings?.app_android_download || dummyData.app_android_download,
    contact_heading: siteSettings?.contact_heading || dummyData.contact_heading,
    contact_text: siteSettings?.contact_text || dummyData.contact_text,
    contact_phone: siteSettings?.contact_phone || dummyData.contact_phone,
    contact_email: siteSettings?.contact_email || dummyData.contact_email,
    social_facebook: siteSettings?.social_facebook || dummyData.social_facebook,
    social_linkedin: siteSettings?.social_linkedin || dummyData.social_linkedin,
    social_instagram:
      siteSettings?.social_instagram || dummyData.social_instagram,
    social_twitter: siteSettings?.social_twitter || dummyData.social_twitter,
    footer_text: siteSettings?.footer_text || dummyData.footer_text,
    about_us: siteSettings?.about_us || dummyData.about_us,
    privacy_policy: siteSettings?.privacy_policy || dummyData.privacy_policy,
    terms_conditions:
      siteSettings?.terms_conditions || dummyData.terms_conditions,
  };

  const socialLinks = [
    {
      icon: FaFacebookF,
      url: data.social_facebook,
      color: "hover:bg-[#1877F2]",
    },
    { icon: FaTwitter, url: data.social_twitter, color: "hover:bg-[#1DA1F2]" },
    {
      icon: FaLinkedinIn,
      url: data.social_linkedin,
      color: "hover:bg-[#0A66C2]",
    },
    {
      icon: FaInstagram,
      url: data.social_instagram,
      color: "hover:bg-[#E4405F]",
    },
  ];

  const appLinks = [
    {
      icon: FaApple,
      name: "App Store",
      url: data.app_ios_store,
      download: data.app_ios_download,
    },
    {
      icon: FaAndroid,
      name: "Play Store",
      url: data.app_android_store,
      download: data.app_android_download,
    },
  ];

  const quickLinks = [
    { name: "About Us", url: data.about_us },
    { name: "Privacy Policy", url: data.privacy_policy },
    { name: "Terms & Conditions", url: data.terms_conditions },
  ];

  return (
    <>
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-16 pb-8 relative mt-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info Section */}
            <div className="space-y-4">
              {data.company_logo ? (
                <img
                  src={data.company_logo}
                  alt="Company Logo"
                  className="h-12 w-auto"
                />
              ) : (
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Company Name
                </h2>
              )}
              <p className="text-gray-300 leading-relaxed text-sm">
                {data.company_bio}
              </p>

              {/* Social Links */}
              <div className="flex space-x-3 pt-2">
                {socialLinks.map(
                  (social, index) =>
                    social.url && (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center transition-all duration-300 ${social.color} hover:scale-110 hover:shadow-lg`}
                      >
                        <social.icon className="w-4 h-4" />
                      </a>
                    ),
                )}
              </div>
            </div>

            {/* Contact Info Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4 relative inline-block">
                {data.contact_heading}
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-blue-500 rounded-full"></span>
              </h3>
              <p className="text-gray-300 text-sm mb-4">{data.contact_text}</p>
              <div className="space-y-3">
                {data.contact_phone && (
                  <div className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors">
                    <FaPhone className="w-4 h-4 text-blue-400" />
                    <a href={`tel:${data.contact_phone}`} className="text-sm">
                      {data.contact_phone}
                    </a>
                  </div>
                )}
                {data.contact_email && (
                  <div className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors">
                    <FaEnvelope className="w-4 h-4 text-blue-400" />
                    <a
                      href={`mailto:${data.contact_email}`}
                      className="text-sm"
                    >
                      {data.contact_email}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-3 text-gray-300">
                  <FaMapMarkerAlt className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">
                    123 Business Avenue, Tech Park, NY 10001
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4 relative inline-block">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-blue-500 rounded-full"></span>
              </h3>
              <ul className="space-y-2">
                {quickLinks.map(
                  (link, index) =>
                    link.url && (
                      <li key={index}>
                        <Link
                          to={link.url}
                          className="text-gray-300 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group"
                        >
                          <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                          {link.name}
                        </Link>
                      </li>
                    ),
                )}
              </ul>
            </div>

            {/* Mobile Apps Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4 relative inline-block">
                Download Apps
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-blue-500 rounded-full"></span>
              </h3>
              <div className="space-y-3">
                {appLinks.map(
                  (app, index) =>
                    app.url && (
                      <a
                        key={index}
                        href={app.download || app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 bg-gray-700 hover:bg-gray-600 rounded-lg p-3 transition-all duration-300 group hover:scale-105"
                      >
                        <app.icon className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />
                        <div>
                          <p className="text-xs text-gray-400">
                            Download on the
                          </p>
                          <p className="text-sm font-semibold">{app.name}</p>
                        </div>
                      </a>
                    ),
                )}
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-700 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">{data.footer_text}</p>
              <div className="flex gap-6">
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
                >
                  Terms
                </Link>
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  to="/cookies"
                  className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
                >
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 opacity-5 rounded-full filter blur-3xl"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 opacity-5 rounded-full filter blur-3xl"></div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-50 group"
        >
          <FaArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </button>
      )}
    </>
  );
};

export default Footer;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PageBody,
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight,
  PageLayout,
  PageSubtitle,
  PageTitle,
} from "../common/layout";
import { useTranslation } from "react-i18next";
import Loader from "../common/Loader";
import { getSiteSettings } from "../../../redux/slice/commonSlice";
import {
  FiShield,
  FiLock,
  FiEye,
  FiDatabase,
  FiFileText,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const PolicyInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { siteSettings, isLoading } = useSelector((state) => state.common);

  useEffect(() => {
    dispatch(getSiteSettings());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className=" bg-gray-100">
      <div className="max-[1300px] mx-auto p-4 sm:p-5 lg:p-6 min-h-full pb-10 sm:pb-6">
        <PageLayout>
          {/* Breadcrumb */}
          <div className="mb-6">
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-blue-500 hover:text-blue-600 cursor-pointer"
            >
              ← Back to Login
            </button>
          </div>
          <PageHeader>
            <PageHeaderLeft>
              <PageTitle>{t("privacyPolicy.pageTitle")}</PageTitle>
              <PageSubtitle>{t("privacyPolicy.pageSubtitle")}</PageSubtitle>
            </PageHeaderLeft>
            <PageHeaderRight />
          </PageHeader>
          <PageBody>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
              {/* Header with Logo */}
              {siteSettings?.company_logo && (
                <div className="p-8 pb-0 border-b border-gray-100">
                  <img
                    src={siteSettings.company_logo}
                    alt="company logo"
                    className="h-12 w-auto"
                  />
                </div>
              )}

              {/* Policy Content */}
              <div className="p-8">
                {siteSettings?.privacy_policy ? (
                  <div className="prose prose-gray max-w-none">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: siteSettings.privacy_policy,
                      }}
                      className="text-gray-600 leading-relaxed space-y-4"
                    />
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FiFileText className="text-gray-400 text-5xl mx-auto mb-4" />
                    <p className="text-gray-500">
                      {t("privacyPolicy.noContent")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </PageBody>
        </PageLayout>
      </div>
    </div>
  );
};

export default PolicyInfo;

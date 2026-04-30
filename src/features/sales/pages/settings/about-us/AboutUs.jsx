import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSiteSettings } from "../../../../../redux/slice/commonSlice";
import {
  PageBody,
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight,
  PageLayout,
  PageSubtitle,
  PageTitle,
} from "../../../common/layout";
import { useTranslation } from "react-i18next";
import Loader from "../../../common/Loader";
import { FiUsers, FiAward, FiBriefcase, FiTarget } from "react-icons/fi";

const AboutUs = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { siteSettings, isLoading } = useSelector((state) => state.common);

  useEffect(() => {
    dispatch(getSiteSettings());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>{t("aboutUs.pageTitle")}</PageTitle>
          <PageSubtitle>{t("aboutUs.pageSubtitle")}</PageSubtitle>
        </PageHeaderLeft>
        <PageHeaderRight />
      </PageHeader>
      <PageBody>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
          {/* Header Image/Logo Area */}
          {siteSettings?.company_logo && (
            <div className="p-8 pb-0">
              <img
                src={siteSettings.company_logo}
                alt="company logo"
                className="h-16 w-auto"
              />
            </div>
          )}

          {/* About Content */}
          <div className="p-8">
            {siteSettings?.about_us ? (
              <div className="prose prose-gray max-w-none">
                <div
                  dangerouslySetInnerHTML={{
                    __html: siteSettings.about_us,
                  }}
                  className="text-gray-600 leading-relaxed space-y-4"
                />
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">{t("aboutUs.noContent")}</p>
              </div>
            )}
          </div>
        </div>
      </PageBody>
    </PageLayout>
  );
};

export default AboutUs;

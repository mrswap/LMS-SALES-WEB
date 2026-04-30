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
import {
  FiFileText,
  FiUserCheck,
  FiShield,
  FiAlertCircle,
  FiLock,
  FiCreditCard,
} from "react-icons/fi";

const TermsAndCondition = () => {
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
          <PageTitle>{t("termsConditions.pageTitle")}</PageTitle>
          <PageSubtitle>{t("termsConditions.pageSubtitle")}</PageSubtitle>
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

          {/* Terms Content */}
          <div className="p-8">
            {siteSettings?.terms_conditions ? (
              <div className="prose prose-gray max-w-none">
                <div
                  dangerouslySetInnerHTML={{
                    __html: siteSettings.terms_conditions,
                  }}
                  className="text-gray-600 leading-relaxed space-y-4"
                />
              </div>
            ) : (
              <div className="text-center py-12">
                <FiFileText className="text-gray-400 text-5xl mx-auto mb-4" />
                <p className="text-gray-500">
                  {t("termsConditions.noContent")}
                </p>
              </div>
            )}
          </div>
        </div>
      </PageBody>
    </PageLayout>
  );
};

export default TermsAndCondition;

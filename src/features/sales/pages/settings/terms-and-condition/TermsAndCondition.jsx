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
        <div className="container mx-auto px-4 py-8">
          {siteSettings?.terms_conditions ? (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: siteSettings.terms_conditions,
              }}
            />
          ) : (
            <p className="text-gray-500 text-center">
              {t("termsConditions.noContent")}
            </p>
          )}
        </div>
      </PageBody>
    </PageLayout>
  );
};

export default TermsAndCondition;

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
} from "../../../common/layout";
import { useTranslation } from "react-i18next";
import Loader from "../../../common/Loader";
import { getSiteSettings } from "../../../../../redux/slice/commonSlice";

const Policy = () => {
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
          <PageTitle>{t("privacyPolicy.pageTitle")}</PageTitle>
          <PageSubtitle>{t("privacyPolicy.pageSubtitle")}</PageSubtitle>
        </PageHeaderLeft>
        <PageHeaderRight />
      </PageHeader>
      <PageBody>
        <div className="container mx-auto px-4 py-8">
          {siteSettings?.privacy_policy ? (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: siteSettings.privacy_policy }}
            />
          ) : (
            <p className="text-gray-500 text-center">
              {t("privacyPolicy.noContent")}
            </p>
          )}
        </div>
      </PageBody>
    </PageLayout>
  );
};

export default Policy;

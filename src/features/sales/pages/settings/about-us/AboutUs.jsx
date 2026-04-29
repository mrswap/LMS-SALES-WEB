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
        <div className="container mx-auto px-4 py-8">
          {siteSettings?.about_us ? (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: siteSettings.about_us }}
            />
          ) : (
            <p className="text-gray-500 text-center">
              {t("aboutUs.noContent")}
            </p>
          )}
        </div>
      </PageBody>
    </PageLayout>
  );
};

export default AboutUs;

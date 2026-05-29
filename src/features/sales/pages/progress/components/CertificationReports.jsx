import { useEffect, useState } from "react";
import CustomeTable from "../../../common/table/CustomeTable";
import {
  FaEnvelope,
  FaIdCard,
  FaCertificate,
  FaCalendarAlt,
  FaPercent,
} from "react-icons/fa";
import {
  PageLayout,
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight,
  PageTitle,
  PageSubtitle,
  PageBody,
} from "../../../common/layout";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../common/Loader";
import Error from "../../../common/Error";
import { getCertifications } from "../../../../../redux/slice/reportSlice";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../common/layout/Breadcrumb";
import TruncateText from "../../../common/TruncateText";

const ITEMS_PER_PAGE = 10;

const CertificationReports = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { certifications, loadingCertifications, isError, message } =
    useSelector((state) => state.report);

  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const fetchCertifications = (pageNum) => {
    const params = {
      page: pageNum,
      per_page: ITEMS_PER_PAGE,
    };
    dispatch(getCertifications(params));
  };

  useEffect(() => {
    fetchCertifications(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const getTypeBadgeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "topic":
        return "bg-purple-100 text-purple-700";
      case "chapter":
        return "bg-blue-100 text-blue-700";
      case "module":
        return "bg-green-100 text-green-700";
      case "level":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-700";
      case "expired":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPercentageColor = (percentage) => {
    if (percentage === 100) return "text-green-600";
    if (percentage >= 70) return "text-blue-600";
    if (percentage >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getTypeDisplayText = (type) => {
    switch (type?.toLowerCase()) {
      case "topic":
        return t("certificationReports.types.topic");
      case "chapter":
        return t("certificationReports.types.chapter");
      case "module":
        return t("certificationReports.types.module");
      case "level":
        return t("certificationReports.types.level");
      default:
        return type?.toUpperCase() || "-";
    }
  };

  const columns = [
    {
      header: t("certificationReports.table.userDetails"),
      render: (row) => (
        <div className="flex items-center gap-3">
          <div>
            <p className="font-semibold text-gray-800">
              <TruncateText text={row?.user_name} maxLength={25} />
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <FaEnvelope size={10} />
              <TruncateText text={row?.email} maxLength={25} />
            </p>
          </div>
        </div>
      ),
    },
    {
      header: t("certificationReports.table.program"),
      render: (row) => (
        <div className="min-w-[120px]">
          <p className="text-sm font-medium text-gray-800">
            <TruncateText text={row?.program || "-"} maxLength={25} />
          </p>
        </div>
      ),
    },
    {
      header: t("certificationReports.table.type"),
      render: (row) => (
        <div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeBadgeColor(row?.type)}`}
          >
            {getTypeDisplayText(row?.type)}
          </span>
        </div>
      ),
    },
    // {
    //   header: t("certificationReports.table.topicModule"),
    //   render: (row) => (
    //     <div className="min-w-[150px]">
    //       {row?.type?.toLowerCase() === "topic" && (
    //         <div>
    //           <p className="text-sm text-gray-700 font-medium">
    //             {row?.topic || "-"}
    //           </p>
    //           {row?.level && (
    //             <p className="text-xs text-gray-500 mt-1">
    //               {t("certificationReports.table.level")}: {row?.module}
    //             </p>
    //           )}
    //         </div>
    //       )}
    //       {row?.type?.toLowerCase() === "level" && (
    //         <div>
    //           <p className="text-sm text-gray-700 font-medium">
    //             {row?.level || "-"}
    //           </p>
    //         </div>
    //       )}
    //     </div>
    //   ),
    // },
    {
      header: t("certificationReports.table.topicModule"),
      render: (row) => (
        <p className="font-medium text-gray-800">
          {row?.type === "topic"
            ? row?.topic
            : row?.type === "module"
              ? row?.module
              : "-"}
        </p>
      ),
    },
    {
      header: t("certificationReports.table.certificateId"),
      render: (row) => (
        <div>
          <p className="text-sm font-mono text-blue-600 font-semibold">
            {row?.certificate_id || "-"}
          </p>
        </div>
      ),
    },
    {
      header: t("certificationReports.table.scorePercentage"),
      render: (row) => (
        <div className="min-w-[120px]">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-500">
              {t("certificationReports.table.score")}
            </span>
            <span className="text-xs font-semibold text-gray-700">
              {row?.score || 0}/{row?.max_score || 100}
            </span>
          </div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <FaPercent size={10} />{" "}
              {t("certificationReports.table.percentage")}
            </span>
            <span
              className={`text-xs font-semibold ${getPercentageColor(row?.percentage)}`}
            >
              {row?.percentage}%
            </span>
          </div>
        </div>
      ),
    },
    {
      header: t("certificationReports.table.issueDate"),
      render: (row) => (
        <div className="min-w-[120px]">
          <div className="flex items-center gap-1 text-gray-600 text-sm">
            <FaCalendarAlt size={12} />
            <span>
              {row?.certificate_issue_date
                ? new Date(row?.certificate_issue_date).toLocaleDateString()
                : "-"}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: t("certificationReports.table.status"),
      render: (row) => (
        <div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(row?.certificate_status)}`}
          >
            {row?.certificate_status === "active"
              ? t("certificationReports.status.active")
              : row?.certificate_status === "expired"
                ? t("certificationReports.status.expired")
                : row?.certificate_status || "-"}
          </span>
        </div>
      ),
    },
    {
      header: t("certificationReports.table.action"),
      render: (row) => {
        const isValidCertificate = Number(row?.passed_attempt_id) > 0;

        return (
          <div>
            {isValidCertificate ? (
              <button
                onClick={() =>
                  navigate(`/certificate/${row.passed_attempt_id}`)
                }
                className="px-3 py-1 text-xs font-semibold cursor-pointer text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 hover:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-150"
              >
                {t("certificationReports.table.viewCertificate")}
              </button>
            ) : (
              <span className="text-xs text-gray-400 italic">—</span>
            )}
          </div>
        );
      },
    },
  ];

  const getTableData = () => {
    if (certifications?.data?.data) {
      return certifications.data.data;
    }
    if (certifications?.data) {
      return certifications.data;
    }
    return certifications || [];
  };

  const getPaginationData = () => {
    const data = certifications?.data || certifications || {};
    return {
      current_page: data?.current_page || 1,
      last_page: data?.last_page || 1,
      total: data?.total || 0,
    };
  };

  if (loadingCertifications && !getTableData().length) return <Loader />;
  if (isError) return <Error message={message} />;

  const pagination = getPaginationData();
  const tableData = getTableData();

  return (
    <PageLayout>
      <Breadcrumb
        items={[
          {
            label: t("navbar.reports"),
            path: `/progress`,
          },
          {
            label: t("certificationReports.pageSubtitle"),
          },
        ]}
      />

      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>{t("certificationReports.pageTitle")}</PageTitle>
          {/* <PageSubtitle>{t("certificationReports.pageSubtitle")}</PageSubtitle> */}
        </PageHeaderLeft>
        <PageHeaderRight />
      </PageHeader>

      <PageBody>
        <div className="mt-4">
          <CustomeTable
            columns={columns}
            data={tableData}
            serverSide={true}
            currentPage={pagination.current_page}
            totalPages={pagination.last_page}
            totalItems={pagination.total}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
          />
        </div>
      </PageBody>
    </PageLayout>
  );
};

export default CertificationReports;

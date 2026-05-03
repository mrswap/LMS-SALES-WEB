import { useEffect, useState } from "react";
import CustomeTable from "../../../common/table/CustomeTable";
import { FaEnvelope, FaClock } from "react-icons/fa";
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
import { getAssessmentReport } from "../../../../../redux/slice/reportSlice";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

const ExamAssessment = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { assessmentReports, isLoading, isError, message } = useSelector(
    (state) => state.report,
  );

  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const fetchAssessmentReports = (overridePage) => {
    const params = {
      page: overridePage ?? page,
      per_page: ITEMS_PER_PAGE,
      type: "level",
    };
    dispatch(getAssessmentReport(params));
  };

  useEffect(() => {
    fetchAssessmentReports(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const getStatusBadgeColor = (status) => {
    switch (status?.toLowerCase()) {
      case "passed":
        return "bg-green-100 text-green-700";
      case "failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const columns = [
    {
      header: t("assessment.examReport.table.userDetails"),
      render: (row) => (
        <div className="flex items-center gap-3">
          <div>
            <p className="font-semibold text-gray-800">{row?.user_name}</p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <FaEnvelope size={10} />
              {row?.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: t("assessment.examReport.table.assessment"),
      render: (row) => (
        <div>
          <p className="font-medium text-gray-800">{row?.assessment_name}</p>
          <p className="text-xs text-gray-500">{row?.related_name}</p>
        </div>
      ),
    },
    {
      header: t("assessment.examReport.table.scorePercentage"),
      render: (row) => (
        <div>
          <p className="text-gray-700 font-medium">
            {row?.score} / {row?.total_questions}
          </p>
          <p className="text-xs text-gray-500">{row?.percentage}%</p>
        </div>
      ),
    },
    {
      header: t("assessment.examReport.table.status"),
      render: (row) => (
        <div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(row?.status)}`}
          >
            {row?.status?.toUpperCase() === "PASSED"
              ? t("assessment.examReport.status.passed")
              : t("assessment.examReport.status.failed")}
          </span>
          <p className="text-xs text-gray-500 mt-1">
            {t("assessment.examReport.table.passing")}: {row?.passing_score}%
          </p>
        </div>
      ),
    },
    {
      header: t("assessment.examReport.table.answers"),
      render: (row) => (
        <div className="space-y-1">
          <p className="text-xs">
            <span className="text-green-600">
              ✓ {t("assessment.examReport.table.correct")}:{" "}
              {row?.correct_answers}
            </span>
          </p>
          <p className="text-xs">
            <span className="text-red-600">
              ✗ {t("assessment.examReport.table.incorrect")}:{" "}
              {row?.incorrect_answers}
            </span>
          </p>
          <p className="text-xs">
            <span className="text-gray-500">
              ⊘ {t("assessment.examReport.table.skipped")}: {row?.skipped}
            </span>
          </p>
        </div>
      ),
    },
    {
      header: t("assessment.examReport.table.attempt"),
      render: (row) => (
        <div>
          <p className="text-gray-700 font-medium">
            Attempt #{row?.attempt_count}
          </p>
        </div>
      ),
    },
    {
      header: t("assessment.examReport.table.dateTime"),
      render: (row) => (
        <div className="min-w-[120px]">
          <p className="text-gray-600 text-sm flex items-center gap-1">
            <FaClock size={12} />
            {new Date(row?.attempt_date).toLocaleDateString()}
          </p>
          <p className="text-xs text-gray-400">
            {new Date(row?.attempt_date).toLocaleTimeString()}
          </p>
        </div>
      ),
    },
    {
      header: t("assessment.examReport.table.action"),
      render: (row) => {
        const certificateAvailable =
          row?.status?.toLowerCase()?.trim() === "passed" &&
          row?.passed_attempt_id;

        return (
          <div>
            {certificateAvailable ? (
              <button
                onClick={() =>
                  navigate(`/certificate/${row?.passed_attempt_id}`)
                }
                className="px-3 py-1 text-xs font-semibold cursor-pointer text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 hover:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-150"
              >
                {t("assessment.examReport.table.viewCertificate")}
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
    if (assessmentReports?.data) {
      return assessmentReports.data;
    }
    return assessmentReports || [];
  };

  const getPaginationData = () => {
    const meta = assessmentReports || {};
    return {
      current_page: meta?.current_page || 1,
      last_page: meta?.last_page || 1,
      total: meta?.total || 0,
    };
  };

  if (isLoading && !getTableData().length) return <Loader />;
  if (isError) return <Error message={message} />;

  const pagination = getPaginationData();

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>{t("assessment.examReport.pageTitle")}</PageTitle>
          <PageSubtitle>{t("assessment.examReport.pageSubtitle")}</PageSubtitle>
        </PageHeaderLeft>
        <PageHeaderRight />
      </PageHeader>

      <PageBody>
        <CustomeTable
          columns={columns}
          data={getTableData()}
          serverSide={true}
          currentPage={pagination.current_page}
          totalPages={pagination.last_page}
          totalItems={pagination.total}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
        />
      </PageBody>
    </PageLayout>
  );
};

export default ExamAssessment;

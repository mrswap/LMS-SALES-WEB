import { useEffect, useState } from "react";
import CustomeTable from "../../../common/table/CustomeTable";
import { FaEnvelope, FaClock, FaLock, FaUnlockAlt } from "react-icons/fa";
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
import { getUserProgress } from "../../../../../redux/slice/reportSlice";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../../../common/layout/Breadcrumb";
import TruncateText from "../../../common/TruncateText";

const ITEMS_PER_PAGE = 10;

const UserProgressReports = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { userProgress, loadingUserProgress, isError, message } = useSelector(
    (state) => state.report,
  );

  const [page, setPage] = useState(1);

  const fetchUserProgress = (pageNum) => {
    const params = {
      page: pageNum,
      per_page: ITEMS_PER_PAGE,
    };
    dispatch(getUserProgress(params));
  };

  useEffect(() => {
    fetchUserProgress(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const getStatusBadgeColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "in progress":
        return "bg-yellow-100 text-yellow-700";
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

  const columns = [
    {
      header: t("userProgress.table.userDetails"),
      render: (row) => (
        <div className="flex items-center gap-3">
          <div>
            <p className="font-semibold text-gray-800">
              <TruncateText text={row?.user_name} maxLength={25} />
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <FaEnvelope size={10} />
              {row?.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: t("userProgress.table.level"),
      render: (row) => (
        <div className="min-w-[100px]">
          <p className="text-sm text-gray-700">
            <TruncateText text={row?.level || "-"} maxLength={25} />
          </p>
        </div>
      ),
    },
    {
      header: t("userProgress.table.module"),
      render: (row) => (
        <div className="min-w-[100px]">
          <p className="text-sm text-gray-700">
            <TruncateText text={row?.module || "-"} maxLength={25} />
          </p>
        </div>
      ),
    },
    {
      header: t("userProgress.table.chapter"),
      render: (row) => (
        <div className="min-w-[100px]">
          <p className="text-sm text-gray-700">
            <TruncateText text={row?.chapter || "-"} maxLength={25} />
          </p>
        </div>
      ),
    },
    {
      header: t("userProgress.table.topic"),
      render: (row) => (
        <div className="min-w-[100px]">
          <p className="text-sm text-gray-700">
            <TruncateText text={row?.topic || "-"} maxLength={25} />
          </p>
        </div>
      ),
    },
    {
      header: t("userProgress.table.progress"),
      render: (row) => (
        <div className="min-w-[120px]">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-500">
              {t("userProgress.table.completion")}
            </span>
            <span
              className={`text-xs font-semibold ${getPercentageColor(row?.completion_percentage)}`}
            >
              {row?.completion_percentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${row?.completion_percentage}%` }}
            />
          </div>
        </div>
      ),
    },
    {
      header: t("userProgress.table.status"),
      render: (row) => (
        <div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(row?.completion_status)}`}
          >
            {row?.completion_status === "completed"
              ? t("userProgress.status.completed")
              : row?.completion_status === "in progress"
                ? t("userProgress.status.inProgress")
                : row?.completion_status}
          </span>
          <div className="flex items-center gap-1 mt-1">
            {row?.is_unlocked ? (
              <FaUnlockAlt
                className="text-green-500 text-xs"
                title={t("userProgress.table.unlocked")}
              />
            ) : (
              <FaLock
                className="text-red-500 text-xs"
                title={t("userProgress.table.locked")}
              />
            )}
            <span className="text-xs text-gray-400">
              {row?.is_unlocked
                ? t("userProgress.table.unlocked")
                : t("userProgress.table.locked")}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: t("userProgress.table.lastActivity"),
      render: (row) => (
        <div className="min-w-[120px]">
          <div className="flex items-center gap-1 text-gray-600 text-sm">
            <FaClock size={12} />
            <span>
              {row?.last_activity_date
                ? new Date(row?.last_activity_date).toLocaleDateString()
                : "-"}
            </span>
          </div>
        </div>
      ),
    },
  ];

  const getTableData = () => {
    if (userProgress?.data) {
      return userProgress.data;
    }
    return userProgress || [];
  };

  const getPaginationData = () => {
    return {
      current_page: userProgress?.current_page || 1,
      last_page: userProgress?.last_page || 1,
      total: userProgress?.total || 0,
    };
  };

  if (loadingUserProgress && !getTableData().length) return <Loader />;
  if (isError) return <Error message={message} />;

  const pagination = getPaginationData();

  return (
    <PageLayout>
      <Breadcrumb
        items={[
          {
            label: t("navbar.reports"),
            path: `/progress`,
          },
          {
            label: t("userProgress.pageSubtitle"),
          },
        ]}
      />

      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>{t("userProgress.pageTitle")}</PageTitle>
          {/* <PageSubtitle>{t("userProgress.pageSubtitle")}</PageSubtitle> */}
        </PageHeaderLeft>
        <PageHeaderRight />
      </PageHeader>

      <PageBody>
        <div className="mt-4">
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
        </div>
      </PageBody>
    </PageLayout>
  );
};

export default UserProgressReports;

import { useEffect, useState } from "react";
import CustomeTable from "../../../common/table/CustomeTable";
import { FaEnvelope, FaDesktop } from "react-icons/fa";
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
import TruncateText from "../../../common/TruncateText";
import { useNavigate } from "react-router-dom";
import { getAuditLogs } from "../../../../../redux/slice/reportSlice";
import { useTranslation } from "react-i18next";

const ITEMS_PER_PAGE = 5;

const AuditLogsReports = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { auditLogs, isLoading, isError, message } = useSelector(
    (state) => state.report,
  );

  const [page, setPage] = useState(1);

  const fetchAuditLogs = (overridePage) => {
    const params = {
      page: overridePage ?? page,
      per_page: ITEMS_PER_PAGE,
    };
    dispatch(getAuditLogs(params));
  };

  useEffect(() => {
    fetchAuditLogs(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const getEventBadgeColor = (event) => {
    switch (event?.toLowerCase()) {
      case "login":
        return "bg-green-100 text-green-700";
      case "profile_viewed":
        return "bg-blue-100 text-blue-700";
      case "reset_device":
        return "bg-red-100 text-red-700";
      case "chapter_viewed":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getEventDisplayText = (event) => {
    switch (event?.toLowerCase()) {
      case "login":
        return t("auditLogs.events.login");
      case "profile_viewed":
        return t("auditLogs.events.profile_viewed");
      case "reset_device":
        return t("auditLogs.events.reset_device");
      case "chapter_viewed":
        return t("auditLogs.events.chapter_viewed");
      default:
        return event?.replaceAll("_", " ").toUpperCase() || "-";
    }
  };

  const columns = [
    // {
    //   header: t("auditLogs.table.userDetails"),
    //   render: (row) => (
    //     <div className="flex items-center gap-3">
    //       <div>
    //         <p className="font-semibold text-gray-800">{row?.user?.name}</p>
    //         <p className="text-xs text-gray-500 flex items-center gap-1">
    //           <FaEnvelope size={10} />
    //           {row?.user?.email}
    //         </p>
    //       </div>
    //     </div>
    //   ),
    // },
    {
      header: t("auditLogs.table.event"),
      render: (row) => (
        <div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${getEventBadgeColor(row?.event)}`}
          >
            {getEventDisplayText(row?.event)}
          </span>
        </div>
      ),
    },
    {
      header: t("auditLogs.table.description"),
      render: (row) => (
        <div className="min-w-[200px]">
          <p className="text-gray-700">
            <TruncateText text={row?.description || "-"} maxLength={50} />
          </p>
        </div>
      ),
    },
    {
      header: t("auditLogs.table.ipAddress"),
      render: (row) => (
        <div>
          <p className="text-gray-600 text-sm font-mono">{row?.ip || "-"}</p>
        </div>
      ),
    },
    {
      header: t("auditLogs.table.device"),
      render: (row) => (
        <div>
          <p className="text-gray-600 text-sm flex items-center gap-1">
            <FaDesktop size={12} />
            <TruncateText text={row?.device || "-"} maxLength={30} />
          </p>
        </div>
      ),
    },
    {
      header: t("auditLogs.table.dateTime"),
      render: (row) => (
        <div className="min-w-[120px]">
          <p className="text-gray-600 text-sm">
            {new Date(row.created_at).toLocaleDateString()}
          </p>
          <p className="text-xs text-gray-400">
            {new Date(row.created_at).toLocaleTimeString()}
          </p>
        </div>
      ),
    },
  ];

  const getTableData = () => {
    if (auditLogs?.data) {
      return auditLogs.data;
    }
    return auditLogs || [];
  };

  const getPaginationData = () => {
    const meta = auditLogs?.meta || {};
    return {
      current_page: meta?.current_page || 1,
      last_page: meta?.last_page || 1,
      total: meta?.total || 0,
    };
  };

  if (isLoading && !getTableData().length) return <Loader />;
  if (isError) return <Error message={message} />;

  const pagination = getPaginationData();

  console.log("Pagination Data:", pagination);

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>{t("auditLogs.pageTitle")}</PageTitle>
          <PageSubtitle>{t("auditLogs.pageSubtitle")}</PageSubtitle>
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

export default AuditLogsReports;

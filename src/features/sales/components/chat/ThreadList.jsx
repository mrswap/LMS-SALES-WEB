import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  FiSearch,
  FiX,
  FiMessageCircle,
  FiFolder,
  FiBookOpen,
  FiClock,
} from "react-icons/fi";
import { MdOutlineTopic } from "react-icons/md";
import Loader from "../../common/Loader";
import Error from "../../common/Error";
import { getInboxConversations } from "../../../../redux/slice/supportSlice";
import { getProfile } from "../../../../redux/slice/profileSlice";
import { useTranslation } from "react-i18next";

const ThreadList = ({ selectedTopicId, setSelectedTopicId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { inboxConversations, inboxLoading, error } = useSelector(
    (state) => state.support,
  );

  // ================= FILTER STATES =================
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  // ================= OPTIONS =================
  const statusOptions = [
    { value: "open", label: t("support.status.open") },
    { value: "resolved", label: t("support.status.resolved") },
    { value: "reopened", label: t("support.status.reopened") },
  ];

  // ================= API CALL =================
  useEffect(() => {
    const params = {
      per_page: 20,
    };
    if (searchQuery) {
      params.search = searchQuery;
    }
    if (selectedStatus) {
      params.status = selectedStatus.value;
    }
    if (selectedTopic) {
      params.topic_id = selectedTopic.value;
    }
    const debounce = setTimeout(() => {
      dispatch(getInboxConversations(params));
    }, 500);

    return () => clearTimeout(debounce);
  }, [dispatch, searchQuery, selectedStatus, selectedTopic]);

  useEffect(() => {
    if (!selectedTopicId && inboxConversations?.length > 0) {
      const latestThread = inboxConversations[0];

      setSelectedTopicId(latestThread.topic_id);

      // first auto selected thread unread ho to refresh karo
      if (latestThread.unread_messages_count > 0) {
        setTimeout(() => {
          dispatch(getProfile());

          dispatch(
            getInboxConversations({
              per_page: 20,
            }),
          );
        }, 500);
      }
    }
  }, [inboxConversations, selectedTopicId, setSelectedTopicId, dispatch]);

  // ================= TOPIC OPTIONS =================
  const topicOptions =
    inboxConversations?.map((item) => ({
      value: item.topic?.id,
      label: item.topic?.title,
    })) || [];

  // remove duplicates
  const uniqueTopicOptions = topicOptions.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.value === item.value),
  );

  // ================= RESET =================
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedStatus(null);
    setSelectedTopic(null);
  };

  const isFilterActive = searchQuery || selectedStatus || selectedTopic;

  // ================= SELECT STYLES =================
  const selectStyles = {
    control: (base) => ({
      ...base,
      borderRadius: "0.5rem",
      borderColor: "#e5e7eb",
      boxShadow: "none",
      minHeight: "42px",

      "&:hover": {
        borderColor: "#3b82f6",
      },
    }),

    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#eff6ff" : "white",

      color: state.isFocused ? "#1e40af" : "#374151",

      cursor: "pointer",
    }),

    placeholder: (base) => ({
      ...base,
      color: "#9ca3af",
    }),
  };

  if (inboxLoading) return <Loader />;

  if (error) {
    return (
      <Error message={error?.message || t("support.somethingWentWrong")} />
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* ================= HEADER ================= */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FiMessageCircle className="w-5 h-5 text-blue-600" />

            <h3 className="font-semibold text-gray-800">
              {t("support.supportInbox")}
            </h3>

            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {inboxConversations?.length || 0}
            </span>
          </div>

          {isFilterActive && (
            <button
              onClick={resetFilters}
              className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              <FiX className="w-3 h-3" />
              {t("support.clearAll")}
            </button>
          )}
        </div>

        {/* ================= SEARCH ================= */}
        <div className="relative mb-4">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />

          <input
            type="text"
            placeholder={t("support.searchByTopic")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <FiX className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {/* ================= FILTERS ================= */}
        <div className="grid grid-cols-2 gap-3">
          <Select
            placeholder={t("support.filterByStatus")}
            options={statusOptions}
            value={selectedStatus}
            onChange={(option) => setSelectedStatus(option)}
            isClearable
            styles={selectStyles}
            className="text-sm"
          />

          <Select
            placeholder={t("support.filterByTopic")}
            options={uniqueTopicOptions}
            value={selectedTopic}
            onChange={(option) => setSelectedTopic(option)}
            isClearable
            styles={selectStyles}
            className="text-sm"
          />
        </div>
      </div>

      {/* ================= THREAD LIST ================= */}
      <div className="flex-1 overflow-y-auto p-4">
        {!inboxConversations?.length ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <FiMessageCircle className="w-12 h-12 text-gray-300 mb-3" />

            <p className="text-gray-500 text-sm">
              {t("support.noConversations")}
            </p>

            {isFilterActive && (
              <button
                onClick={resetFilters}
                className="mt-2 text-sm text-blue-600 hover:text-blue-700"
              >
                {t("support.clearFilters")}
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {inboxConversations?.map((thread) => (
              <button
                key={thread.id}
                onClick={() => {
                  setSelectedTopicId(thread.topic_id);
                  if (thread.unread_messages_count > 0) {
                    setTimeout(() => {
                      dispatch(getProfile());
                      dispatch(
                        getInboxConversations({
                          per_page: 20,
                        }),
                      );
                    }, 500);
                  }
                }}
                className={`w-full text-left p-4 rounded-xl transition-all border ${
                  selectedTopicId === thread.topic_id
                    ? "bg-blue-50 border-blue-300 shadow-sm"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-1 flex-shrink-0 ${
                      thread.status === "resolved"
                        ? "text-green-600"
                        : thread.status === "reopened"
                          ? "text-orange-500"
                          : "text-blue-500"
                    }`}
                  >
                    <MdOutlineTopic className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* ================= TOPIC ================= */}
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-semibold text-gray-800 truncate">
                        {thread.topic?.title}
                      </h4>

                      <span
                        className={`text-[10px] px-2 py-1 rounded-full font-medium uppercase ${
                          thread.status === "resolved"
                            ? "bg-green-100 text-green-700"
                            : thread.status === "reopened"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {thread.status === "resolved"
                          ? t("support.status.resolved")
                          : thread.status === "reopened"
                            ? t("support.status.reopened")
                            : t("support.status.open")}
                      </span>
                    </div>

                    {/* ================= LATEST MESSAGE ================= */}
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {thread.latest_message?.message || t("support.noMessage")}
                    </p>

                    {/* ================= DETAILS ================= */}
                    <div className="mt-3 space-y-1">
                      <div className="text-xs text-gray-600 flex items-center gap-1">
                        <FiFolder className="w-3 h-3 text-gray-400 flex-shrink-0" />

                        <span className="truncate">
                          {thread.program?.title}
                        </span>
                      </div>

                      <div className="text-xs text-gray-600 flex items-center gap-1">
                        <FiBookOpen className="w-3 h-3 text-gray-400 flex-shrink-0" />

                        <span className="truncate">{thread.module?.title}</span>
                      </div>

                      <div className="text-xs text-gray-600 flex items-center gap-1">
                        <FiBookOpen className="w-3 h-3 text-gray-400 flex-shrink-0" />

                        <span className="truncate">
                          {thread.chapter?.title}
                        </span>
                      </div>
                    </div>

                    {/* ================= FOOTER ================= */}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">
                          {thread.messages_count} {t("support.messages")}
                        </span>

                        {thread.unread_messages_count > 0 && (
                          <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                            {thread.unread_messages_count} {t("support.unread")}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <FiClock className="w-3 h-3" />

                        <span>
                          {new Date(
                            thread.last_message_at,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreadList;

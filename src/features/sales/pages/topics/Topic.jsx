import React, { useEffect, useState } from "react";
import {
  FaEye,
  FaCheckCircle,
  FaRegCircle,
  FaArrowLeft,
  FaArrowRight,
  FaFileAlt,
  FaVideo,
  FaQuestionCircle,
  FaPlay,
  FaChevronRight,
} from "react-icons/fa";
import {
  PageBody,
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight,
  PageLayout,
  PageSubtitle,
  PageTitle,
} from "../../common/layout/index";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTopicById } from "../../../../redux/slice/coursePreviewSlice";
import Loader from "../../common/Loader";
import { useTranslation } from "react-i18next";

const Topics = () => {
  const { topicId: id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { currentTopic, isLoading, isError, message } = useSelector(
    (state) => state.course,
  );

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(getTopicById(id, currentPage));
    }
  }, [dispatch, id, currentPage]);

  // Extract topics data from paginated response
  const topicsData = currentTopic?.data || [];
  const pagination = {
    current_page: currentTopic?.current_page || 1,
    last_page: currentTopic?.last_page || 1,
    per_page: currentTopic?.per_page || 5,
    total: currentTopic?.total || 0,
    next_page_url: currentTopic?.next_page_url || null,
    prev_page_url: currentTopic?.prev_page_url || null,
  };

  // Calculate if all topics are read
  const allTopicsRead =
    topicsData.length > 0 &&
    topicsData.every((topic) => topic.is_read === 1 || topic.is_read === true);

  // Check if quiz is available for the chapter/topic
  const isQuizAvailable =
    currentTopic?.is_quiz_available === 1 ||
    currentTopic?.is_quiz_available === true;

  // Get current topic index and next topic
  const currentTopicIndex = topicsData.findIndex(
    (topic) => topic.is_read !== 1 && topic.is_read !== true,
  );

  const nextTopic =
    currentTopicIndex !== -1 ? topicsData[currentTopicIndex] : null;
  const hasMorePages = pagination.current_page < pagination.last_page;

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.last_page) {
      setCurrentPage(newPage);
    }
  };

  // Handle view button click - navigate to details page
  const handleViewClick = (id) => {
    navigate(`content/${id}`);
  };

  // Handle quiz navigation
  const handleGiveQuiz = () => {
    navigate(`/quiz/${id}`);
  };

  // Handle continue learning
  const handleContinueLearning = () => {
    if (nextTopic) {
      navigate(`content/${nextTopic.id}`);
    } else if (hasMorePages) {
      handlePageChange(pagination.current_page + 1);
    } else if (allTopicsRead && isQuizAvailable) {
      handleGiveQuiz();
    }
  };

  // Determine CTA text and action
  const getCTAButton = () => {
    if (nextTopic) {
      return {
        text: t("topics.cta.continueLearning"),
        action: handleContinueLearning,
        icon: <FaPlay className="w-4 h-4" />,
        variant: "green",
      };
    } else if (hasMorePages) {
      return {
        text: t("topics.cta.nextPage"),
        action: handleContinueLearning,
        icon: <FaArrowRight className="w-4 h-4" />,
        variant: "blue",
      };
    } else if (
      allTopicsRead
      //  && isQuizAvailable
    ) {
      return {
        text: t("topics.cta.giveQuiz"),
        action: handleGiveQuiz,
        icon: <FaQuestionCircle className="w-4 h-4" />,
        variant: "purple",
      };
    } else if (allTopicsRead && !isQuizAvailable) {
      return {
        text: t("topics.cta.allCompleted"),
        action: null,
        icon: <FaCheckCircle className="w-4 h-4" />,
        variant: "gray",
        disabled: true,
      };
    }
    return null;
  };

  const ctaButton = getCTAButton();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>{t("topics.pageTitle")}</PageTitle>
          <PageSubtitle>{t("topics.pageSubtitle")}</PageSubtitle>
        </PageHeaderLeft>
        <PageHeaderRight />
      </PageHeader>

      <PageBody>
        {/* Quiz Banner - Show when all topics are read */}
        {allTopicsRead && isQuizAvailable && (
          <div className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl overflow-hidden shadow-lg">
            <div className="px-6 py-5 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <FaQuestionCircle className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    {t("topics.quiz.title")}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {t("topics.quiz.description")}
                  </p>
                </div>
              </div>
              <button
                onClick={handleGiveQuiz}
                className="px-6 py-2.5 bg-white text-purple-600 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
              >
                <FaQuestionCircle className="text-purple-600" />
                {t("topics.quiz.giveQuizButton")}
              </button>
            </div>
          </div>
        )}

        {/* Topics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-24">
          {topicsData.map((topic) => {
            const isRead = topic.is_read === 1 || topic.is_read === true;

            return (
              <div
                key={topic.id}
                className={`group bg-white rounded-xl border-1 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl
                  ${!isRead ? "border-blue-300" : "border-gray-200"}`}
              >
                {/* Card Header with Type Badge */}
                <div className="px-5 pt-5 pb-3 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {topic.type === "text" ? (
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                          <FaFileAlt className="text-blue-600 text-sm" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                          <FaVideo className="text-purple-600 text-sm" />
                        </div>
                      )}
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {topic.type === "text"
                          ? t("topics.topicTypes.text")
                          : t("topics.topicTypes.media")}
                      </span>
                    </div>

                    {/* Read Status */}
                    {isRead ? (
                      <div className="flex items-center gap-1.5">
                        <FaCheckCircle className="text-green-500 text-sm" />
                        <span className="text-xs font-medium text-green-600">
                          {t("topics.status.read")}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <FaRegCircle className="text-gray-400 text-sm" />
                        <span className="text-xs font-medium text-gray-500">
                          {t("topics.status.unread")}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Topic Title - Main Heading */}
                  <h3 className="text-lg font-semibold text-gray-800 leading-snug line-clamp-2">
                    {topic.title}
                  </h3>

                  {/* Topic Order */}
                  <p className="text-xs text-gray-400 mt-2">
                    {t("topics.topicLabel")} {topic.order}
                  </p>
                </div>

                {/* Card Footer with View Button */}
                <div className="px-5 py-4 bg-gray-50">
                  <button
                    onClick={() => handleViewClick(topic.id)}
                    className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg cursor-pointer flex items-center justify-center gap-2 font-medium hover:bg-accent hover:text-white  transition-all duration-300 group"
                  >
                    <FaEye className="text-sm group-hover:text-white transition-colors" />
                    <span>{t("topics.buttons.viewTopic")}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Section */}
        {pagination.last_page > 1 && (
          <div className="flex justify-center items-center gap-3 mt-6 mb-4">
            <button
              onClick={() => handlePageChange(pagination.current_page - 1)}
              disabled={!pagination.prev_page_url}
              className={`px-5 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 text-sm font-medium
                  ${
                    pagination.prev_page_url
                      ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 cursor-pointer"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
            >
              <FaArrowLeft size={12} />
              {t("topics.buttons.previous")}
            </button>

            <div className="flex items-center gap-2">
              {[...Array(pagination.last_page)].map((_, index) => {
                const pageNum = index + 1;
                const isActive = pageNum === pagination.current_page;

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-9 h-9 rounded-lg font-medium text-sm transition-all duration-300
                        ${
                          isActive
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
                        }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(pagination.current_page + 1)}
              disabled={!pagination.next_page_url}
              className={`px-5 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 text-sm font-medium
                  ${
                    pagination.next_page_url
                      ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 cursor-pointer"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
            >
              {t("topics.buttons.next")}
              <FaArrowRight size={12} />
            </button>
          </div>
        )}

        {/* Showing results info */}
        {pagination.total > 0 && (
          <div className="text-center text-sm text-gray-500 mt-6 mb-4">
            {t("topics.pagination.showing")} {topicsData.length}{" "}
            {t("topics.pagination.of")} {pagination.total}{" "}
            {t("topics.pagination.topics")}
          </div>
        )}

        {/* Empty State */}
        {topicsData.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {t("topics.emptyState.title")}
            </h3>
            <p className="text-gray-500">
              {t("topics.emptyState.description")}
            </p>
          </div>
        )}
      </PageBody>

      {/* Bottom Sticky CTA - Similar to Chapters */}
      {ctaButton && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 shadow-lg z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="hidden sm:block">
                <p className="text-sm text-gray-600">
                  {nextTopic
                    ? t("topics.cta.continueJourney")
                    : hasMorePages
                      ? t("topics.cta.moreTopics")
                      : allTopicsRead
                        ? // && isQuizAvailable
                          t("topics.cta.testYourself")
                        : t("topics.cta.allCompletedMessage")}
                </p>
                <p className="text-xs text-gray-400">
                  {nextTopic
                    ? `${t("topics.cta.nextTopic")} ${nextTopic.title}`
                    : hasMorePages
                      ? t("topics.cta.nextPageMessage")
                      : allTopicsRead
                        ? //  && isQuizAvailable
                          t("topics.cta.readyForQuiz")
                        : t("topics.cta.congratulations")}
                </p>
              </div>
              <button
                onClick={ctaButton.action}
                disabled={ctaButton.disabled}
                className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2
                  ${
                    ctaButton.variant === "green"
                      ? "bg-accent hover:opacity-90 text-white shadow-md hover:cursor-pointer"
                      : ctaButton.variant === "blue"
                        ? "bg-accent hover:opacity-90 text-white shadow-md hover:cursor-pointer"
                        : ctaButton.variant === "purple"
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md hover:cursor-pointer"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                {ctaButton.icon}
                {ctaButton.text}
                <FaChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Topics;

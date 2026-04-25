// import React, { useEffect, useState } from "react";
// import {
//   FaPlay,
//   FaRedo,
//   FaChartBar,
//   FaCheck,
//   FaArrowLeft,
//   FaArrowRight,
// } from "react-icons/fa";
// import {
//   PageBody,
//   PageHeader,
//   PageHeaderLeft,
//   PageHeaderRight,
//   PageLayout,
//   PageSubtitle,
//   PageTitle,
// } from "../../common/layout/index";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getTopicById } from "../../../../redux/slice/coursePreviewSlice";

// const Topics = () => {
//   const { topicId: id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { currentTopic, isLoading, isError, message } = useSelector(
//     (state) => state.course,
//   );

//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     if (id) {
//       dispatch(getTopicById(id, currentPage));
//     }
//   }, [dispatch, id, currentPage]);

//   console.log("currentTopic", currentTopic);

//   // Extract topics data from paginated response
//   const topicsData = currentTopic?.data || [];
//   const pagination = {
//     current_page: currentTopic?.current_page || 1,
//     last_page: currentTopic?.last_page || 1,
//     per_page: currentTopic?.per_page || 5,
//     total: currentTopic?.total || 0,
//     next_page_url: currentTopic?.next_page_url || null,
//     prev_page_url: currentTopic?.prev_page_url || null,
//   };

//   // Get topic status based on is_completed only
//   const getTopicStatus = (topic) => {
//     if (topic.is_completed) return "completed";
//     return "in-progress";
//   };

//   // Calculate progress
//   const getTopicProgress = (topic) => {
//     if (topic.is_completed) return 100;
//     if (topic.progress) return topic.progress;
//     if (topic.completed_units && topic.total_units) {
//       return Math.round((topic.completed_units / topic.total_units) * 100);
//     }
//     return 0;
//   };

//   // Handle page change
//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= pagination.last_page) {
//       setCurrentPage(newPage);
//     }
//   };

//   if (isLoading) {
//     return (
//       <PageLayout>
//         <PageBody>
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           </div>
//         </PageBody>
//       </PageLayout>
//     );
//   }

//   return (
//     <PageLayout>
//       <PageHeader>
//         <PageHeaderLeft>
//           <PageTitle>All Topics</PageTitle>
//           <PageSubtitle>
//             Track your progress and continue your journey
//           </PageSubtitle>
//         </PageHeaderLeft>
//         <PageHeaderRight />
//       </PageHeader>

//       <PageBody>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Topics Grid */}
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {topicsData.map((topic) => {
//               const status = getTopicStatus(topic);
//               const progress = getTopicProgress(topic);

//               return (
//                 <div
//                   key={topic.id}
//                   className={`group bg-white rounded-2xl p-5 border transition-all duration-300 hover:shadow-md
//                     ${status === "in-progress" ? "border-2 border-blue-500 shadow-lg" : "border-gray-200"}
//                     hover:border-blue-300`}
//                 >
//                   {/* Header */}
//                   <div className="flex justify-between items-start mb-3">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2 mb-1">
//                         <p className="text-xs font-medium text-gray-500">
//                           Topic {topic.id}
//                         </p>
//                         {status === "in-progress" && (
//                           <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
//                             In Progress
//                           </span>
//                         )}
//                         {status === "completed" && (
//                           <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
//                             Completed
//                           </span>
//                         )}
//                       </div>
//                       <h2 className="font-semibold text-base sm:text-lg text-gray-800">
//                         {topic.title}
//                       </h2>
//                       {topic.description && (
//                         <p className="text-sm text-gray-600 mt-1 line-clamp-2">
//                           {topic.description}
//                         </p>
//                       )}
//                     </div>

//                     {/* Status Icon */}
//                     {status === "completed" && (
//                       <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-600">
//                         <FaCheck size={16} />
//                       </div>
//                     )}

//                     {status === "in-progress" && (
//                       <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
//                         <FaPlay size={16} />
//                       </div>
//                     )}
//                   </div>

//                   {/* Units Info */}
//                   <p className="text-sm text-gray-500 mb-3">
//                     {topic.total_units || topic.units || 0} Learning Units
//                   </p>

//                   {/* Progress Bar */}
//                   <div className="mb-5">
//                     <div className="text-xs text-gray-400 mb-1 tracking-wide">
//                       {status === "completed" ? "COMPLETED" : "IN PROGRESS"}
//                     </div>

//                     <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
//                       <div
//                         className={`h-full rounded-full transition-all duration-500 ${
//                           status === "completed"
//                             ? "bg-gradient-to-r from-green-400 to-green-600"
//                             : "bg-gradient-to-r from-blue-400 to-blue-600"
//                         }`}
//                         style={{ width: `${progress}%` }}
//                       />
//                     </div>

//                     <div className="text-right text-xs mt-1 text-gray-500">
//                       {progress}% Complete
//                     </div>
//                   </div>

//                   {/* Action Buttons */}
//                   {status === "completed" && (
//                     <>
//                       <button
//                         onClick={() => navigate(`/quiz/${topic.id}`)}
//                         className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white py-2.5 cursor-pointer rounded-xl mb-3 font-medium flex items-center justify-center gap-2 hover:opacity-90 transition transform hover:scale-105"
//                       >
//                         <FaChartBar size={12} />
//                         Attempt Quiz
//                       </button>

//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => navigate(`/topics/${topic.id}/replay`)}
//                           className="flex-1 bg-blue-100 text-blue-600 py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-200 transition"
//                         >
//                           <FaRedo size={12} />
//                           Replay
//                         </button>

//                         <button
//                           onClick={() => navigate(`/topics/${topic.id}/stats`)}
//                           className="flex-1 bg-blue-600 text-white py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition"
//                         >
//                           <FaChartBar size={12} />
//                           Stats
//                         </button>
//                       </div>
//                     </>
//                   )}

//                   {status === "in-progress" && (
//                     <button
//                       onClick={() => navigate(`/topics/${topic.id}/units`)}
//                       className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 rounded-xl cursor-pointer flex items-center justify-center gap-2 font-medium hover:opacity-90 transition transform hover:scale-105"
//                     >
//                       <FaPlay size={12} />
//                       {progress > 0 ? "Resume Topic" : "Start Topic"}
//                     </button>
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           {/* Pagination Section */}
//           {pagination.last_page > 1 && (
//             <div className="flex justify-center items-center gap-3 mt-8 mb-4">
//               <button
//                 onClick={() => handlePageChange(pagination.current_page - 1)}
//                 disabled={!pagination.prev_page_url}
//                 className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300
//                   ${
//                     pagination.prev_page_url
//                       ? "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 cursor-pointer"
//                       : "bg-gray-200 text-gray-400 cursor-not-allowed"
//                   }`}
//               >
//                 <FaArrowLeft size={12} />
//                 Previous
//               </button>

//               <div className="flex items-center gap-2">
//                 {[...Array(pagination.last_page)].map((_, index) => {
//                   const pageNum = index + 1;
//                   const isActive = pageNum === pagination.current_page;

//                   return (
//                     <button
//                       key={pageNum}
//                       onClick={() => handlePageChange(pageNum)}
//                       className={`w-10 h-10 rounded-lg font-medium transition-all duration-300
//                         ${
//                           isActive
//                             ? "bg-blue-600 text-white shadow-md scale-105"
//                             : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105"
//                         }`}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 })}
//               </div>

//               <button
//                 onClick={() => handlePageChange(pagination.current_page + 1)}
//                 disabled={!pagination.next_page_url}
//                 className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300
//                   ${
//                     pagination.next_page_url
//                       ? "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 cursor-pointer"
//                       : "bg-gray-200 text-gray-400 cursor-not-allowed"
//                   }`}
//               >
//                 Next
//                 <FaArrowRight size={12} />
//               </button>
//             </div>
//           )}

//           {/* Showing results info */}
//           {pagination.total > 0 && (
//             <div className="text-center text-sm text-gray-500 mt-4">
//               Showing {(pagination.current_page - 1) * pagination.per_page + 1}{" "}
//               to{" "}
//               {Math.min(
//                 pagination.current_page * pagination.per_page,
//                 pagination.total,
//               )}{" "}
//               of {pagination.total} topics
//             </div>
//           )}

//           {/* Empty State */}
//           {topicsData.length === 0 && !isLoading && (
//             <div className="text-center py-12">
//               <div className="text-gray-400 text-6xl mb-4">📚</div>
//               <h3 className="text-lg font-semibold text-gray-600 mb-2">
//                 No Topics Available
//               </h3>
//               <p className="text-gray-500">
//                 Check back later for new learning materials
//               </p>
//             </div>
//           )}
//         </div>
//       </PageBody>
//     </PageLayout>
//   );
// };

// export default Topics;

import React, { useEffect, useState } from "react";
import {
  FaEye,
  FaCheckCircle,
  FaRegCircle,
  FaArrowLeft,
  FaArrowRight,
  FaFileAlt,
  FaVideo,
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

const Topics = () => {
  const { topicId: id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>Learning Topics</PageTitle>
          <PageSubtitle>Browse through your learning materials</PageSubtitle>
        </PageHeaderLeft>
        <PageHeaderRight />
      </PageHeader>

      <PageBody>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Topics Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topicsData.map((topic) => {
              const isRead = topic.is_read === 1 || topic.is_read === true;

              return (
                <div
                  key={topic.id}
                  className="group bg-white rounded-xl border-1 border-blue-500 shadow-lg overflow-hidden"
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
                          {topic.type === "text" ? "Text Topic" : "Media Topic"}
                        </span>
                      </div>

                      {/* Read Status */}
                      {isRead ? (
                        <div className="flex items-center gap-1.5">
                          <FaCheckCircle className="text-green-500 text-sm" />
                          <span className="text-xs font-medium text-green-600">
                            Read
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <FaRegCircle className="text-gray-400 text-sm" />
                          <span className="text-xs font-medium text-gray-500">
                            Unread
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
                      Topic {topic.order}
                    </p>
                  </div>

                  {/* Card Footer with View Button */}
                  <div className="px-5 py-4 bg-gray-50">
                    <button
                      onClick={() => handleViewClick(topic.id)}
                      className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg cursor-pointer flex items-center justify-center gap-2 font-medium hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 group"
                    >
                      <FaEye className="text-sm group-hover:text-white transition-colors" />
                      <span>View Topic</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Section */}
          {pagination.last_page > 1 && (
            <div className="flex justify-center items-center gap-3 mt-10 mb-4">
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
                Previous
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
                Next
                <FaArrowRight size={12} />
              </button>
            </div>
          )}

          {/* Showing results info */}
          {pagination.total > 0 && (
            <div className="text-center text-sm text-gray-500 mt-6">
              Showing {topicsData.length} of {pagination.total} topics
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
                No Topics Available
              </h3>
              <p className="text-gray-500">
                Check back later for new learning materials
              </p>
            </div>
          )}
        </div>
      </PageBody>
    </PageLayout>
  );
};

export default Topics;

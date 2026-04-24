// import React, { useEffect } from "react";
// import { FaPlay, FaLock, FaRedo, FaChartBar, FaCheck } from "react-icons/fa";
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

// const topics = [
//   {
//     id: 1,
//     title: "Definition Purpose",
//     units: 6,
//     progress: 100,
//     status: "completed",
//   },
//   {
//     id: 2,
//     title: "History & Evolution",
//     units: 4,
//     progress: 50,
//     status: "in-progress",
//   },
//   {
//     id: 3,
//     title: "Label paced ECG trace",
//     units: 8,
//     progress: 0,
//     status: "locked",
//   },
// ];

// const Topics = () => {
//   const { topicId: id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { currentTopic, isLoading, isError, message } = useSelector(
//     (state) => state.course,
//   );

//   useEffect(() => {
//     if (id) {
//       dispatch(getTopicById(id));
//     }
//   }, [dispatch, id]);

//   console.log("currentTopic", currentTopic);

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
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {topics.map((topic) => (
//             <div
//               key={topic.id}
//               className="group bg-white rounded-2xl p-5 border border-gray-300 shadow-sm hover:shadow-md"
//             >
//               {/* Header */}
//               <div className="flex justify-between items-start mb-3">
//                 <h2 className="font-semibold text-base sm:text-lg text-gray-800">
//                   {topic.title}
//                 </h2>

//                 {/* Status Icon */}
//                 {topic.status === "completed" && (
//                   <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-600">
//                     <FaCheck size={12} />
//                   </div>
//                 )}

//                 {topic.status === "locked" && (
//                   <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-400">
//                     <FaLock size={12} />
//                   </div>
//                 )}
//               </div>

//               <p className="text-sm text-gray-500 mb-3">
//                 {topic.units} Learning Units
//               </p>

//               {/* Progress */}
//               <div className="mb-5">
//                 <div className="text-xs text-gray-400 mb-1 tracking-wide">
//                   {topic.status === "completed"
//                     ? "COMPLETED"
//                     : topic.status === "locked"
//                       ? "LOCKED"
//                       : "IN PROGRESS"}
//                 </div>

//                 <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
//                   <div
//                     className={`h-full rounded-full ${
//                       topic.status === "completed"
//                         ? "bg-gradient-to-r from-green-400 to-green-600"
//                         : topic.status === "in-progress"
//                           ? "bg-gradient-to-r from-blue-400 to-blue-600"
//                           : "bg-gray-300"
//                     }`}
//                     style={{ width: `${topic.progress}%` }}
//                   />
//                 </div>

//                 <div className="text-right text-xs mt-1 text-gray-500">
//                   {topic.progress}%
//                 </div>
//               </div>

//               {/* Buttons */}
//               {topic.status === "completed" && (
//                 <>
//                   <button
//                     onClick={() => navigate("/quize")}
//                     className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white py-2.5 cursor-pointer rounded-xl mb-3 font-medium flex items-center justify-center gap-2 hover:opacity-90 transition"
//                   >
//                     <FaChartBar size={12} />
//                     Attempt Quiz
//                   </button>

//                   <div className="flex gap-2">
//                     <button className="flex-1 bg-blue-100 text-blue-600 py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-200 transition">
//                       <FaRedo size={12} />
//                       Replay
//                     </button>

//                     <button className="flex-1 bg-blue-600 text-white py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition">
//                       <FaChartBar size={12} />
//                       Stats
//                     </button>
//                   </div>
//                 </>
//               )}

//               {topic.status === "in-progress" && (
//                 <button
//                   onClick={() => navigate("units")}
//                   className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 rounded-xl cursor-pointer flex items-center justify-center gap-2 font-medium hover:opacity-90 transition"
//                 >
//                   <FaPlay size={12} />
//                   Resume Topic
//                 </button>
//               )}

//               {topic.status === "locked" && (
//                 <div className="text-center text-gray-400 text-sm mt-4 flex items-center justify-center gap-2">
//                   <FaLock size={12} />
//                   Locked (Complete previous level)
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </PageBody>
//     </PageLayout>
//   );
// };

// export default Topics;

import React, { useEffect, useState } from "react";
import {
  FaPlay,
  FaRedo,
  FaChartBar,
  FaCheck,
  FaArrowLeft,
  FaArrowRight,
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

  console.log("currentTopic", currentTopic);

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

  // Get topic status based on is_completed only
  const getTopicStatus = (topic) => {
    if (topic.is_completed) return "completed";
    return "in-progress";
  };

  // Calculate progress
  const getTopicProgress = (topic) => {
    if (topic.is_completed) return 100;
    if (topic.progress) return topic.progress;
    if (topic.completed_units && topic.total_units) {
      return Math.round((topic.completed_units / topic.total_units) * 100);
    }
    return 0;
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.last_page) {
      setCurrentPage(newPage);
    }
  };

  if (isLoading) {
    return (
      <PageLayout>
        <PageBody>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </PageBody>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>All Topics</PageTitle>
          <PageSubtitle>
            Track your progress and continue your journey
          </PageSubtitle>
        </PageHeaderLeft>
        <PageHeaderRight />
      </PageHeader>

      <PageBody>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Topics Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topicsData.map((topic) => {
              const status = getTopicStatus(topic);
              const progress = getTopicProgress(topic);

              return (
                <div
                  key={topic.id}
                  className={`group bg-white rounded-2xl p-5 border transition-all duration-300 hover:shadow-md
                    ${status === "in-progress" ? "border-2 border-blue-500 shadow-lg" : "border-gray-200"}
                    hover:border-blue-300`}
                >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-xs font-medium text-gray-500">
                          Topic {topic.id}
                        </p>
                        {status === "in-progress" && (
                          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
                            In Progress
                          </span>
                        )}
                        {status === "completed" && (
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                            Completed
                          </span>
                        )}
                      </div>
                      <h2 className="font-semibold text-base sm:text-lg text-gray-800">
                        {topic.title}
                      </h2>
                      {topic.description && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {topic.description}
                        </p>
                      )}
                    </div>

                    {/* Status Icon */}
                    {status === "completed" && (
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                        <FaCheck size={16} />
                      </div>
                    )}

                    {status === "in-progress" && (
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <FaPlay size={16} />
                      </div>
                    )}
                  </div>

                  {/* Units Info */}
                  <p className="text-sm text-gray-500 mb-3">
                    {topic.total_units || topic.units || 0} Learning Units
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-5">
                    <div className="text-xs text-gray-400 mb-1 tracking-wide">
                      {status === "completed" ? "COMPLETED" : "IN PROGRESS"}
                    </div>

                    <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          status === "completed"
                            ? "bg-gradient-to-r from-green-400 to-green-600"
                            : "bg-gradient-to-r from-blue-400 to-blue-600"
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <div className="text-right text-xs mt-1 text-gray-500">
                      {progress}% Complete
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {status === "completed" && (
                    <>
                      <button
                        onClick={() => navigate(`/quiz/${topic.id}`)}
                        className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white py-2.5 cursor-pointer rounded-xl mb-3 font-medium flex items-center justify-center gap-2 hover:opacity-90 transition transform hover:scale-105"
                      >
                        <FaChartBar size={12} />
                        Attempt Quiz
                      </button>

                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/topics/${topic.id}/replay`)}
                          className="flex-1 bg-blue-100 text-blue-600 py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-200 transition"
                        >
                          <FaRedo size={12} />
                          Replay
                        </button>

                        <button
                          onClick={() => navigate(`/topics/${topic.id}/stats`)}
                          className="flex-1 bg-blue-600 text-white py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition"
                        >
                          <FaChartBar size={12} />
                          Stats
                        </button>
                      </div>
                    </>
                  )}

                  {status === "in-progress" && (
                    <button
                      onClick={() => navigate(`/topics/${topic.id}/units`)}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 rounded-xl cursor-pointer flex items-center justify-center gap-2 font-medium hover:opacity-90 transition transform hover:scale-105"
                    >
                      <FaPlay size={12} />
                      {progress > 0 ? "Resume Topic" : "Start Topic"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Pagination Section */}
          {pagination.last_page > 1 && (
            <div className="flex justify-center items-center gap-3 mt-8 mb-4">
              <button
                onClick={() => handlePageChange(pagination.current_page - 1)}
                disabled={!pagination.prev_page_url}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300
                  ${
                    pagination.prev_page_url
                      ? "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 cursor-pointer"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
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
                      className={`w-10 h-10 rounded-lg font-medium transition-all duration-300
                        ${
                          isActive
                            ? "bg-blue-600 text-white shadow-md scale-105"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105"
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
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300
                  ${
                    pagination.next_page_url
                      ? "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 cursor-pointer"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
              >
                Next
                <FaArrowRight size={12} />
              </button>
            </div>
          )}

          {/* Showing results info */}
          {pagination.total > 0 && (
            <div className="text-center text-sm text-gray-500 mt-4">
              Showing {(pagination.current_page - 1) * pagination.per_page + 1}{" "}
              to{" "}
              {Math.min(
                pagination.current_page * pagination.per_page,
                pagination.total,
              )}{" "}
              of {pagination.total} topics
            </div>
          )}

          {/* Empty State */}
          {topicsData.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📚</div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
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

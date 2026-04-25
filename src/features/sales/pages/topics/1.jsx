// import React, { useEffect, useState } from "react";
// import {
//   FaPlay,
//   FaArrowLeft,
//   FaArrowRight,
//   FaFileAlt,
//   FaVideo,
//   FaImage,
//   FaCheckCircle,
//   FaRegClock,
// } from "react-icons/fa";
// import { IoMdCheckmarkCircle } from "react-icons/io";
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

//   const contentData = currentTopic?.data || [];
//   const pagination = {
//     current_page: currentTopic?.current_page || 1,
//     last_page: currentTopic?.last_page || 1,
//     per_page: currentTopic?.per_page || 5,
//     total: currentTopic?.total || 0,
//     next_page_url: currentTopic?.next_page_url || null,
//     prev_page_url: currentTopic?.prev_page_url || null,
//   };

//   const renderContent = (item) => {
//     switch (item.type) {
//       case "text":
//         return (
//           <div className="prose prose-sm max-w-none">
//             <div
//               className="text-gray-700 leading-relaxed"
//               dangerouslySetInnerHTML={{ __html: item.content }}
//             />
//           </div>
//         );

//       case "media":
//         return (
//           <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 text-center border border-gray-200">
//             {item.meta?.shortcode ? (
//               <div>
//                 <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4">
//                   <div className="text-center">
//                     <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
//                       <FaPlay className="w-8 h-8 text-white ml-1" />
//                     </div>
//                     <p className="text-gray-300 text-sm">Video Content</p>
//                   </div>
//                 </div>
//                 <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto shadow-md hover:shadow-lg">
//                   <FaPlay size={12} />
//                   Play Media
//                 </button>
//               </div>
//             ) : (
//               <div>
//                 <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
//                   <FaImage className="w-16 h-16 text-gray-400" />
//                 </div>
//                 <p className="text-gray-500">Media Content</p>
//               </div>
//             )}
//           </div>
//         );

//       default:
//         return (
//           <div className="bg-gray-50 rounded-lg p-6 text-center">
//             <p className="text-gray-500">Content type: {item.type}</p>
//           </div>
//         );
//     }
//   };

//   const getContentIcon = (type) => {
//     switch (type) {
//       case "text":
//         return <FaFileAlt className="w-5 h-5 text-blue-500" />;
//       case "media":
//         return <FaVideo className="w-5 h-5 text-purple-500" />;
//       default:
//         return <FaFileAlt className="w-5 h-5 text-gray-500" />;
//     }
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= pagination.last_page) {
//       setCurrentPage(newPage);
//     }
//   };

//   if (isLoading) {
//     return (
//       <PageLayout>
//         <PageBody>
//           <div className="flex flex-col justify-center items-center h-96">
//             <div className="relative">
//               <div className="animate-spin rounded-full h-16 w-16 border-b-3 border-blue-600"></div>
//             </div>
//             <p className="mt-6 text-gray-600 font-medium">Loading content...</p>
//           </div>
//         </PageBody>
//       </PageLayout>
//     );
//   }

//   if (isError) {
//     return (
//       <PageLayout>
//         <PageBody>
//           <div className="text-center py-20 max-w-md mx-auto">
//             <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <svg
//                 className="w-12 h-12 text-red-500"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             </div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">
//               Unable to Load Content
//             </h3>
//             <p className="text-gray-500 mb-6">
//               {message || "There was an error loading the topic content"}
//             </p>
//             <button
//               onClick={() => dispatch(getTopicById(id, currentPage))}
//               className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Try Again
//             </button>
//           </div>
//         </PageBody>
//       </PageLayout>
//     );
//   }

//   return (
//     <PageLayout>
//       <PageHeader className="border-b border-gray-200">
//         <PageHeaderLeft>
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => navigate(-1)}
//               className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               <FaArrowLeft className="w-5 h-5 text-gray-600" />
//             </button>
//             <div>
//               <PageTitle>Learning Content</PageTitle>
//               <PageSubtitle>
//                 {contentData.length > 0
//                   ? `${contentData.length} content sections`
//                   : "No content available"}
//               </PageSubtitle>
//             </div>
//           </div>
//         </PageHeaderLeft>
//         <PageHeaderRight>
//           <div className="flex items-center gap-3">
//             <FaRegClock className="text-gray-400" />
//             <span className="text-sm text-gray-600">Self-paced learning</span>
//           </div>
//         </PageHeaderRight>
//       </PageHeader>

//       <PageBody>
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           {/* Content Blocks - No individual complete buttons */}
//           <div className="space-y-6">
//             {contentData.map((item, index) => (
//               <div
//                 key={item.id}
//                 className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
//               >
//                 {/* Content Header */}
//                 <div className="flex items-center gap-3 p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
//                   <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
//                     <span className="text-sm font-semibold text-blue-600">
//                       {index + 1}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     {getContentIcon(item.type)}
//                     <h3 className="font-semibold text-gray-800">
//                       {item.title ||
//                         `${item.type.charAt(0).toUpperCase() + item.type.slice(1)} Section`}
//                     </h3>
//                   </div>
//                   <span className="text-xs text-gray-500 capitalize px-2 py-1 bg-gray-100 rounded-full ml-auto">
//                     {item.type}
//                   </span>
//                 </div>

//                 {/* Content Body */}
//                 <div className="p-6">{renderContent(item)}</div>
//               </div>
//             ))}
//           </div>

//           {/* Pagination */}
//           {pagination.last_page > 1 && (
//             <div className="mt-10 pt-6 border-t border-gray-200">
//               <div className="flex justify-center items-center gap-2">
//                 <button
//                   onClick={() => handlePageChange(pagination.current_page - 1)}
//                   disabled={!pagination.prev_page_url}
//                   className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all
//                     ${
//                       pagination.prev_page_url
//                         ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
//                         : "bg-gray-100 text-gray-400 cursor-not-allowed"
//                     }`}
//                 >
//                   <FaArrowLeft size={12} />
//                   Previous
//                 </button>

//                 <div className="flex items-center gap-1">
//                   {[...Array(pagination.last_page)].map((_, index) => {
//                     const pageNum = index + 1;
//                     const isActive = pageNum === pagination.current_page;

//                     return (
//                       <button
//                         key={pageNum}
//                         onClick={() => handlePageChange(pageNum)}
//                         className={`w-10 h-10 rounded-lg font-medium transition-all
//                           ${
//                             isActive
//                               ? "bg-blue-600 text-white shadow-md"
//                               : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
//                           }`}
//                       >
//                         {pageNum}
//                       </button>
//                     );
//                   })}
//                 </div>

//                 <button
//                   onClick={() => handlePageChange(pagination.current_page + 1)}
//                   disabled={!pagination.next_page_url}
//                   className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all
//                     ${
//                       pagination.next_page_url
//                         ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
//                         : "bg-gray-100 text-gray-400 cursor-not-allowed"
//                     }`}
//                 >
//                   Next
//                   <FaArrowRight size={12} />
//                 </button>
//               </div>

//               <div className="text-center mt-4">
//                 <p className="text-sm text-gray-500">
//                   Page {pagination.current_page} of {pagination.last_page}
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Bottom Navigation - Only Back and Next buttons */}
//           <div className="mt-10 pt-6 border-t border-gray-200">
//             <div className="flex justify-between gap-4">
//               <button
//                 onClick={() => navigate(-1)}
//                 className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center gap-2"
//               >
//                 <FaArrowLeft size={12} />
//                 Back to Topics
//               </button>

//               {pagination.next_page_url && (
//                 <button
//                   onClick={() => handlePageChange(pagination.current_page + 1)}
//                   className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
//                 >
//                   Next Page
//                   <FaArrowRight size={12} />
//                 </button>
//               )}

//               {!pagination.next_page_url &&
//                 pagination.current_page === pagination.last_page &&
//                 contentData.length > 0 && (
//                   <button
//                     onClick={() => {
//                       // Here you can mark topic as completed in API
//                       navigate(-1);
//                     }}
//                     className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
//                   >
//                     <FaCheckCircle size={16} />
//                     Mark Topic Complete
//                     <FaArrowRight size={12} />
//                   </button>
//                 )}
//             </div>
//           </div>

//           {/* Empty State */}
//           {contentData.length === 0 && !isLoading && (
//             <div className="text-center py-20">
//               <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <FaFileAlt className="w-12 h-12 text-gray-400" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                 No Content Available
//               </h3>
//               <p className="text-gray-500 mb-6">
//                 This topic doesn't have any learning material yet
//               </p>
//               <button
//                 onClick={() => navigate(-1)}
//                 className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Return to Topics
//               </button>
//             </div>
//           )}

//           {/* Info Message */}
//           {contentData.length > 0 && (
//             <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                   <FaRegClock className="w-4 h-4 text-blue-600" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-blue-800">
//                     Review all content sections above. Click "Mark Topic
//                     Complete" after finishing all pages.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </PageBody>
//     </PageLayout>
//   );
// };

// export default Topics;

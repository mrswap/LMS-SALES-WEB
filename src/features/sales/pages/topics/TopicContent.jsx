// import React, { useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   getSingleContent,
//   markContentAsRead,
// } from "../../../../redux/slice/coursePreviewSlice";
// import {
//   FaArrowLeft,
//   FaArrowRight,
//   FaFileAlt,
//   FaVideo,
//   FaImage,
//   FaHeadphones,
//   FaBookOpen,
//   FaChevronLeft,
//   FaChevronRight,
// } from "react-icons/fa";
// import { MdPictureAsPdf } from "react-icons/md";

// const TopicContent = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { topicId, contentId } = useParams();
//   const hasMarkedRead = useRef(false); // Prevent multiple API calls

//   const { currentContent, isLoading } = useSelector((state) => state.course);

//   const content = currentContent?.current;
//   const topic = currentContent?.topic;
//   const navigation = currentContent?.navigation;

//   useEffect(() => {
//     if (topicId && contentId) {
//       dispatch(getSingleContent({ topicId, contentId }));
//       // Reset the read flag when content changes
//       hasMarkedRead.current = false;
//     }
//   }, [topicId, contentId, dispatch]);

//   // Effect to call read API when content loads and is not read
//   useEffect(() => {
//     // Check if content exists, is not read (0 or false), and hasn't been marked yet
//     if (
//       content &&
//       content.id &&
//       (content.is_read === 0 || content.is_read === false) &&
//       !hasMarkedRead.current
//     ) {
//       hasMarkedRead.current = true; // Set flag to prevent multiple calls

//       // Call the toggle-read API
//       dispatch(markContentAsRead({ contentId: content.id })).then((result) => {
//         if (result.meta.requestStatus === "fulfilled") {
//           console.log("Content marked as read successfully");
//           // Optional: Refresh content to get updated is_read status
//           dispatch(getSingleContent({ topicId, contentId }));
//         } else {
//           // If API fails, reset flag so it can retry
//           hasMarkedRead.current = false;
//         }
//       });
//     }
//   }, [content, topicId, contentId, dispatch]);

//   const navigateToContent = (newContentId) => {
//     if (newContentId) {
//       navigate(`/course/topic/${topicId}/content/${newContentId}`);
//     }
//   };

//   const getContentIcon = () => {
//     switch (content?.type) {
//       case "text":
//         return <FaBookOpen className="text-blue-600" />;
//       case "video":
//         return <FaVideo className="text-purple-600" />;
//       case "pdf":
//         return <MdPictureAsPdf className="text-red-600" />;
//       case "audio":
//         return <FaHeadphones className="text-green-600" />;
//       case "image":
//         return <FaImage className="text-pink-600" />;
//       default:
//         return <FaFileAlt className="text-gray-600" />;
//     }
//   };

//   const getTypeLabel = () => {
//     switch (content?.type) {
//       case "text":
//         return "Reading Material";
//       case "video":
//         return "Video Lecture";
//       case "pdf":
//         return "Document";
//       case "audio":
//         return "Audio Lesson";
//       case "image":
//         return "Visual Content";
//       default:
//         return content?.type;
//     }
//   };

//   const renderTextContent = () => (
//     <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
//       <div className="p-8 bg-gradient-to-br from-gray-50 to-white">
//         <div className="prose prose-lg prose-slate max-w-none">
//           <div
//             dangerouslySetInnerHTML={{
//               __html: content?.body || content?.content,
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );

//   const renderVideoContent = () => (
//     <div className="bg-black rounded-xl overflow-hidden shadow-xl">
//       <video controls className="w-full" poster={content?.thumbnail}>
//         <source src={content?.video_url || content?.content} type="video/mp4" />
//       </video>
//     </div>
//   );

//   const renderPDFContent = () => (
//     <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg border border-gray-200">
//       <div className="bg-gray-800 text-white px-4 py-2 flex items-center justify-between">
//         <span className="text-sm flex items-center gap-2">
//           <MdPictureAsPdf className="text-red-400" />
//           PDF Document
//         </span>
//         <a
//           href={content?.pdf_url || content?.content}
//           download
//           className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded transition"
//         >
//           Download PDF
//         </a>
//       </div>
//       <iframe
//         src={content?.pdf_url || content?.content}
//         className="w-full h-[650px]"
//         title={content?.title}
//       />
//     </div>
//   );

//   const renderAudioContent = () => (
//     <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 shadow-sm p-8">
//       <div className="max-w-md mx-auto text-center">
//         <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
//           <FaHeadphones className="text-4xl text-green-600" />
//         </div>
//         <audio controls className="w-full mb-4">
//           <source src={content?.audio_url || content?.content} />
//         </audio>
//         {content?.description && (
//           <p className="text-gray-600 text-sm mt-4">{content.description}</p>
//         )}
//       </div>
//     </div>
//   );

//   const renderImageContent = () => (
//     <div className="bg-gray-50 rounded-xl border border-gray-200 shadow-sm overflow-hidden">
//       <img
//         src={content?.image_url || content?.content}
//         alt={content?.title}
//         className="w-full h-auto object-contain max-h-[600px] bg-white"
//       />
//       {content?.description && (
//         <div className="p-4 bg-gray-50 border-t border-gray-200">
//           <p className="text-gray-600 text-sm">{content.description}</p>
//         </div>
//       )}
//     </div>
//   );

//   const renderContent = () => {
//     if (!content) return null;

//     switch (content?.type) {
//       case "text":
//         return renderTextContent();
//       case "video":
//         return renderVideoContent();
//       case "pdf":
//         return renderPDFContent();
//       case "audio":
//         return renderAudioContent();
//       case "image":
//       case "media":
//         return renderImageContent();
//       default:
//         return (
//           <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
//             <p className="text-yellow-800">Content type: {content?.type}</p>
//           </div>
//         );
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex flex-col justify-center items-center h-[80vh]">
//         <div className="relative">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
//         </div>
//         <p className="mt-6 text-gray-500 font-medium">Loading content...</p>
//       </div>
//     );
//   }

//   if (!content) {
//     return (
//       <div className="flex flex-col items-center justify-center h-[80vh] max-w-md mx-auto text-center">
//         <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
//           <FaFileAlt className="text-3xl text-gray-400" />
//         </div>
//         <h3 className="text-xl font-semibold text-gray-700 mb-2">
//           Content Not Found
//         </h3>
//         <p className="text-gray-500 mb-6">
//           The content you're looking for doesn't exist or has been moved.
//         </p>
//         <button
//           onClick={() => navigate(-1)}
//           className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition shadow-sm"
//         >
//           Return to Course
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Breadcrumb & Header */}
//         <div className="mb-8">
//           <nav className="flex items-center gap-2 text-sm mb-4">
//             <button
//               onClick={() => navigate(-1)}
//               className="text-gray-500 hover:text-gray-700 transition flex items-center gap-1"
//             >
//               <FaChevronLeft size={12} />
//               Back
//             </button>
//             <span className="text-gray-300">/</span>
//             <span className="text-gray-500">{topic?.title || "Course"}</span>
//             <span className="text-gray-300">/</span>
//             <span className="text-gray-900 font-medium truncate">
//               {content?.title}
//             </span>
//           </nav>

//           <div className="flex items-start justify-between flex-wrap gap-4">
//             <div className="flex-1">
//               <div className="flex items-center gap-3 mb-3">
//                 <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-200">
//                   {getContentIcon()}
//                 </div>
//                 <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
//                   {getTypeLabel()}
//                 </span>
//                 {/* Optional: Show read status badge */}
//                 {content?.is_read === 1 && (
//                   <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
//                     ✓ Read
//                   </span>
//                 )}
//               </div>
//               <h1 className="text-3xl font-bold text-gray-900 leading-tight">
//                 {content?.title}
//               </h1>
//               {topic?.description && (
//                 <p className="mt-2 text-gray-500 text-sm">
//                   {topic.description}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-8"></div>

//         {/* Content Area */}
//         <div className="mb-10">{renderContent()}</div>

//         {/* Navigation Footer */}
//         <div className="pt-6 border-t border-gray-200">
//           <div className="flex items-center justify-between gap-4">
//             <button
//               onClick={() => navigateToContent(navigation?.previous_content_id)}
//               disabled={!navigation?.has_previous}
//               className="group flex items-center gap-3 px-6 py-3 bg-white border border-gray-300 rounded-lg
//                        disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50
//                        hover:border-gray-400 transition-all duration-200 shadow-sm"
//             >
//               <FaArrowLeft
//                 size={14}
//                 className="group-hover:-translate-x-0.5 transition-transform"
//               />
//               <div className="text-left">
//                 <p className="text-xs text-gray-500">Previous</p>
//                 <p className="text-sm font-medium text-gray-700">
//                   Previous Lesson
//                 </p>
//               </div>
//             </button>

//             <div className="text-center">
//               {navigation?.has_next && (
//                 <p className="text-xs text-gray-400">Continue to next lesson</p>
//               )}
//             </div>

//             <button
//               onClick={() => navigateToContent(navigation?.next_content_id)}
//               disabled={!navigation?.has_next}
//               className="group flex items-center gap-3 px-6 py-3 bg-blue-600 border border-blue-600
//                        rounded-lg disabled:opacity-40 disabled:cursor-not-allowed
//                        hover:bg-blue-700 transition-all duration-200 shadow-sm"
//             >
//               <div className="text-right">
//                 <p className="text-xs text-blue-100">Next</p>
//                 <p className="text-sm font-medium text-white">Next Lesson</p>
//               </div>
//               <FaArrowRight
//                 size={14}
//                 className="group-hover:translate-x-0.5 transition-transform text-white"
//               />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TopicContent;

import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getSingleContent,
  markContentAsRead,
} from "../../../../redux/slice/coursePreviewSlice";
import {
  FaArrowLeft,
  FaArrowRight,
  FaFileAlt,
  FaVideo,
  FaImage,
  FaHeadphones,
  FaBookOpen,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { MdPictureAsPdf } from "react-icons/md";
import { useTranslation } from "react-i18next";

const TopicContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { topicId, contentId } = useParams();
  const hasMarkedRead = useRef(false); // Prevent multiple API calls

  const { currentContent, isLoading } = useSelector((state) => state.course);

  const content = currentContent?.current;
  const topic = currentContent?.topic;
  const navigation = currentContent?.navigation;

  useEffect(() => {
    if (topicId && contentId) {
      dispatch(getSingleContent({ topicId, contentId }));
      // Reset the read flag when content changes
      hasMarkedRead.current = false;
    }
  }, [topicId, contentId, dispatch]);

  // Effect to call read API when content loads and is not read
  useEffect(() => {
    // Check if content exists, is not read (0 or false), and hasn't been marked yet
    if (
      content &&
      content.id &&
      (content.is_read === 0 || content.is_read === false) &&
      !hasMarkedRead.current
    ) {
      hasMarkedRead.current = true; // Set flag to prevent multiple calls

      // Call the toggle-read API
      dispatch(markContentAsRead({ contentId: content.id })).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          console.log("Content marked as read successfully");
          // Optional: Refresh content to get updated is_read status
          dispatch(getSingleContent({ topicId, contentId }));
        } else {
          // If API fails, reset flag so it can retry
          hasMarkedRead.current = false;
        }
      });
    }
  }, [content, topicId, contentId, dispatch]);

  const navigateToContent = (newContentId) => {
    if (newContentId) {
      navigate(`/topics/${topicId}/content/${newContentId}`);
    }
  };

  const getContentIcon = () => {
    switch (content?.type) {
      case "text":
        return <FaBookOpen className="text-blue-600" />;
      case "video":
        return <FaVideo className="text-purple-600" />;
      case "pdf":
        return <MdPictureAsPdf className="text-red-600" />;
      case "audio":
        return <FaHeadphones className="text-green-600" />;
      case "image":
        return <FaImage className="text-pink-600" />;
      default:
        return <FaFileAlt className="text-gray-600" />;
    }
  };

  const getTypeLabel = () => {
    switch (content?.type) {
      case "text":
        return t("topicContent.contentTypes.text");
      case "video":
        return t("topicContent.contentTypes.video");
      case "pdf":
        return t("topicContent.contentTypes.pdf");
      case "audio":
        return t("topicContent.contentTypes.audio");
      case "image":
        return t("topicContent.contentTypes.image");
      default:
        return content?.type;
    }
  };

  const renderTextContent = () => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="prose prose-lg prose-slate max-w-none">
          <div
            dangerouslySetInnerHTML={{
              __html: content?.body || content?.content,
            }}
          />
        </div>
      </div>
    </div>
  );

  const renderVideoContent = () => (
    <div className="bg-black rounded-xl overflow-hidden shadow-xl">
      <video controls className="w-full" poster={content?.thumbnail}>
        <source src={content?.video_url || content?.content} type="video/mp4" />
      </video>
    </div>
  );

  const renderPDFContent = () => (
    <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg border border-gray-200">
      <div className="bg-gray-800 text-white px-4 py-2 flex items-center justify-between">
        <span className="text-sm flex items-center gap-2">
          <MdPictureAsPdf className="text-red-400" />
          {t("topicContent.pdf.title")}
        </span>
        <a
          href={content?.pdf_url || content?.content}
          download
          className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded transition"
        >
          {t("topicContent.pdf.download")}
        </a>
      </div>
      <iframe
        src={content?.pdf_url || content?.content}
        className="w-full h-[650px]"
        title={content?.title}
      />
    </div>
  );

  const renderAudioContent = () => (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 shadow-sm p-8">
      <div className="max-w-md mx-auto text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaHeadphones className="text-4xl text-green-600" />
        </div>
        <audio controls className="w-full mb-4">
          <source src={content?.audio_url || content?.content} />
        </audio>
        {content?.description && (
          <p className="text-gray-600 text-sm mt-4">{content.description}</p>
        )}
      </div>
    </div>
  );

  const renderImageContent = () => (
    <div className="bg-gray-50 rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <img
        src={content?.image_url || content?.content}
        alt={content?.title}
        className="w-full h-auto object-contain max-h-[600px] bg-white"
      />
      {content?.description && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <p className="text-gray-600 text-sm">{content.description}</p>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    if (!content) return null;

    switch (content?.type) {
      case "text":
        return renderTextContent();
      case "video":
        return renderVideoContent();
      case "pdf":
        return renderPDFContent();
      case "audio":
        return renderAudioContent();
      case "image":
      case "media":
        return renderImageContent();
      default:
        return (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
            <p className="text-yellow-800">
              {t("topicContent.fallbackMessage")} {content?.type}
            </p>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh]">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        </div>
        <p className="mt-6 text-gray-500 font-medium">
          {t("topicContent.loading")}
        </p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] max-w-md mx-auto text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <FaFileAlt className="text-3xl text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          {t("topicContent.notFound.title")}
        </h3>
        <p className="text-gray-500 mb-6">
          {t("topicContent.notFound.description")}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition shadow-sm"
        >
          {t("topicContent.notFound.button")}
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-6 py-6">
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm mb-4">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-500 hover:text-gray-700 transition flex items-center gap-1"
            >
              <FaChevronLeft size={12} />
              {t("topicContent.backButton")}
            </button>
            <span className="text-gray-300">/</span>
            <span className="text-gray-500">{topic?.title || "Course"}</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium truncate">
              {content?.title}
            </span>
          </nav>

          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-200">
                  {getContentIcon()}
                </div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {getTypeLabel()}
                </span>
                {/* Optional: Show read status badge */}
                {content?.is_read === 1 && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    ✓ {t("topicContent.readStatus")}
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                {content?.title}
              </h1>
              {topic?.description && (
                <p className="mt-2 text-gray-500 text-sm">
                  {topic.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-8"></div>

        {/* Content Area */}
        <div className="mb-10">{renderContent()}</div>

        {/* Navigation Footer */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => navigateToContent(navigation?.previous_content_id)}
              disabled={!navigation?.has_previous}
              className="group flex items-center gap-3 px-6 py-3 bg-white border border-gray-300 rounded-lg 
                       disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 
                       hover:border-gray-400 transition-all duration-200 shadow-sm"
            >
              <FaArrowLeft
                size={14}
                className="group-hover:-translate-x-0.5 transition-transform"
              />
              <div className="text-left">
                <p className="text-xs text-gray-500">
                  {t("topicContent.navigation.previous")}
                </p>
                <p className="text-sm font-medium text-gray-700">
                  {t("topicContent.navigation.previousLesson")}
                </p>
              </div>
            </button>

            <div className="text-center">
              {navigation?.has_next && (
                <p className="text-xs text-gray-400">
                  {t("topicContent.navigation.continueText")}
                </p>
              )}
            </div>

            <button
              onClick={() => navigateToContent(navigation?.next_content_id)}
              disabled={!navigation?.has_next}
              className="group flex items-center gap-3 px-6 py-3 bg-blue-600 border border-blue-600 
                       rounded-lg disabled:opacity-40 disabled:cursor-not-allowed 
                       hover:bg-blue-700 transition-all duration-200 shadow-sm"
            >
              <div className="text-right">
                <p className="text-xs text-blue-100">
                  {t("topicContent.navigation.next")}
                </p>
                <p className="text-sm font-medium text-white">
                  {t("topicContent.navigation.nextLesson")}
                </p>
              </div>
              <FaArrowRight
                size={14}
                className="group-hover:translate-x-0.5 transition-transform text-white"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicContent;

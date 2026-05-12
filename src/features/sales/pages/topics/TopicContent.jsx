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
import Loader from "../../common/Loader";
import {
  PageLayout,
  PageBody,
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight,
} from "../../common/layout";
import Breadcrumb from "../../common/layout/Breadcrumb";

// Common component for HTML content with styles
const RichTextContent = ({ htmlContent }) => {
  if (!htmlContent) return null;

  return (
    <>
      <div
        className="custom-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      <style>{`
        .custom-content p {
          margin: 0 0 16px;
          line-height: 1.8;
        }
        .custom-content h1,
        .custom-content h2,
        .custom-content h3,
        .custom-content h4,
        .custom-content h5,
        .custom-content h6 {
          margin: 24px 0 16px;
          font-weight: 700;
          line-height: 1.4;
        }
        .custom-content ul,
        .custom-content ol {
          margin: 0 0 16px;
          padding-left: 24px;
        }
        .custom-content li {
          margin-bottom: 8px;
        }
        .custom-content hr {
          margin: 24px 0;
          border: none;
          border-top: 1px solid #d1d5db;
        }
        .custom-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          border: 1px solid #d1d5db;
        }
        .custom-content td,
        .custom-content th {
          border: 1px solid #d1d5db;
          padding: 12px;
          vertical-align: top;
        }
        .custom-content th {
          background-color: #f3f4f6;
          font-weight: 600;
        }
        .custom-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
        }
      `}</style>
    </>
  );
};

// Common Content Wrapper - same layout for all content types
const ContentWrapper = ({ children }) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
    <div className="p-6">{children}</div>
  </div>
);

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

  const getEmbedUrl = (url) => {
    if (!url) return null;

    // YouTube
    if (url.includes("youtube.com/watch") || url.includes("youtu.be")) {
      let videoId = "";

      if (url.includes("youtube.com/watch")) {
        videoId = new URL(url).searchParams.get("v");
      } else {
        videoId = url.split("/").pop();
      }

      return `https://www.youtube.com/embed/${videoId}`;
    }

    // Vimeo
    if (url.includes("vimeo.com")) {
      const videoId = url.split("/").pop();
      return `https://player.vimeo.com/video/${videoId}`;
    }

    return null;
  };

  // const renderTextContent = () => (
  //   <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
  //     <div className="p-8 bg-gradient-to-br from-gray-50 to-white">
  //       <div className="max-w-none custom-content">
  //         <div
  //           dangerouslySetInnerHTML={{
  //             __html: content?.body || content?.content,
  //           }}
  //         />

  //         <style>{`
  //   .custom-content p {
  //     margin: 0 0 16px;
  //     line-height: 1.8;
  //   }

  //   .custom-content h1,
  //   .custom-content h2,
  //   .custom-content h3,
  //   .custom-content h4,
  //   .custom-content h5,
  //   .custom-content h6 {
  //     margin: 24px 0 16px;
  //     font-weight: 700;
  //     line-height: 1.4;
  //   }

  //   .custom-content ul,
  //   .custom-content ol {
  //     margin: 0 0 16px;
  //     padding-left: 24px;
  //   }

  //   .custom-content li {
  //     margin-bottom: 8px;
  //   }

  //   .custom-content hr {
  //     margin: 24px 0;
  //     border: none;
  //     border-top: 1px solid #d1d5db;
  //   }

  //   .custom-content table {
  //     width: 100%;
  //     border-collapse: collapse;
  //     margin: 20px 0;
  //     border: 1px solid #d1d5db;
  //   }

  //   .custom-content td,
  //   .custom-content th {
  //     border: 1px solid #d1d5db;
  //     padding: 12px;
  //     vertical-align: top;
  //   }

  //   .custom-content th {
  //     background-color: #f3f4f6;
  //     font-weight: 600;
  //   }

  //   .custom-content img {
  //     max-width: 100%;
  //     height: auto;
  //     border-radius: 8px;
  //   }
  // `}</style>
  //       </div>
  //     </div>
  //   </div>
  // );

  // const renderVideoContent = () => (
  //   <div className="bg-black rounded-xl overflow-hidden shadow-xl">
  //     <video controls className="w-full" poster={content?.thumbnail}>
  //       <source src={content?.video_url || content?.content} type="video/mp4" />
  //     </video>
  //   </div>
  // );

  // const renderPDFContent = () => (
  //   <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
  //     <div className="bg-gray-800 text-white px-4 py-2 flex items-center justify-between">
  //       <span className="text-sm flex items-center gap-2">
  //         <MdPictureAsPdf className="text-red-400" />
  //         {t("topicContent.pdf.title")}
  //       </span>
  //       <a
  //         href={content?.pdf_url || content?.content}
  //         download
  //         className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded transition"
  //       >
  //         {t("topicContent.pdf.download")}
  //       </a>
  //     </div>
  //     <iframe
  //       src={content?.pdf_url || content?.content}
  //       className="w-full h-[650px]"
  //       title={content?.title}
  //     />
  //   </div>
  // );

  // const renderAudioContent = () => (
  //   <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
  //     <div className="max-w-md mx-auto text-center">
  //       <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
  //         <FaHeadphones className="text-4xl text-green-600" />
  //       </div>
  //       <audio controls className="w-full mb-4">
  //         <source src={content?.audio_url || content?.content} />
  //       </audio>
  //       {content?.description && (
  //         <p className="text-gray-600 text-sm mt-4">{content.description}</p>
  //       )}
  //     </div>
  //   </div>
  // );

  // const renderImageContent = () => (
  //   <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
  //     <img
  //       src={content?.image_url || content?.content}
  //       alt={content?.title}
  //       className="w-full h-auto object-contain max-h-[600px] bg-white"
  //     />
  //     {content?.description && (
  //       <div className="p-4 bg-white border-t border-gray-200">
  //         <p className="text-gray-600 text-sm">{content.description}</p>
  //       </div>
  //     )}
  //   </div>
  // );

  // const renderContent = () => {
  //   if (!content) return null;

  //   switch (content?.type) {
  //     case "text":
  //       return renderTextContent();
  //     case "video":
  //       return renderVideoContent();
  //     case "pdf":
  //       return renderPDFContent();
  //     case "audio":
  //       return renderAudioContent();
  //     case "image":
  //     case "media":
  //       return renderImageContent();
  //     default:
  //       return (
  //         <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
  //           <p className="text-yellow-800">
  //             {t("topicContent.fallbackMessage")} {content?.type}
  //           </p>
  //         </div>
  //       );
  //   }
  // };

  const renderTextContent = () => (
    <ContentWrapper>
      <RichTextContent htmlContent={content?.body || content?.content} />
    </ContentWrapper>
  );

  const renderVideoContent = () => {
    const videoUrl = content?.meta?.full_url || content?.media?.full_url;

    const embedUrl = getEmbedUrl(videoUrl);

    const isDirectVideo = videoUrl?.match(/\.(mp4|webm|ogg)$/i);

    return (
      <ContentWrapper>
        {/* Direct Video */}
        {isDirectVideo ? (
          <video controls className="w-full rounded-lg">
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : embedUrl ? (
          /* YouTube / Vimeo */
          <iframe
            src={embedUrl}
            title={content?.title}
            className="w-full h-[500px] rounded-lg"
            allowFullScreen
          />
        ) : (
          /* Fallback */
          <iframe
            src={videoUrl}
            title={content?.title}
            className="w-full h-[500px] rounded-lg border"
          />
        )}

        {content?.content && (
          <div className="mt-6">
            <RichTextContent htmlContent={content?.body || content?.content} />
          </div>
        )}
      </ContentWrapper>
    );
  };

  const renderPDFContent = () => {
    const pdfUrl =
      content?.meta?.full_url ||
      content?.media?.full_url ||
      content?.pdf_url ||
      content?.content;

    return (
      <ContentWrapper>
        <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 h-[650px]">
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
            title={content?.title}
            className="absolute top-[-2px] left-[-2px] w-[calc(100%+4px)] h-[calc(100%+4px)] border-0"
            style={{
              border: "none",
              overflow: "hidden",
            }}
          />
        </div>

        {content?.content && (
          <div className="mt-6">
            <RichTextContent htmlContent={content?.body || content?.content} />
          </div>
        )}
      </ContentWrapper>
    );
  };

  const renderAudioContent = () => {
    const audioUrl =
      content?.meta?.full_url ||
      content?.media?.full_url ||
      content?.audio_url ||
      content?.content;

    return (
      <ContentWrapper>
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaHeadphones className="text-4xl text-green-600" />
          </div>

          <audio controls className="w-full mb-4">
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
        {content?.content && (
          <div className="mt-6 text-left">
            <RichTextContent htmlContent={content?.body || content?.content} />
          </div>
        )}
      </ContentWrapper>
    );
  };

  const renderImageContent = () => {
    const imageUrl =
      content?.meta?.full_url ||
      content?.media?.full_url ||
      content?.image_url ||
      content?.content;

    return (
      <ContentWrapper>
        <div className="flex justify-center bg-gray-100 rounded-lg p-4">
          <img
            src={imageUrl}
            alt={content?.title}
            className="max-w-full h-auto object-contain max-h-[600px] rounded-lg shadow"
            onError={(e) => {
              e.target.src =
                "https://placehold.co/600x400?text=Image+Not+Found";
            }}
          />
        </div>

        {content?.content && (
          <div className="mt-6">
            <RichTextContent htmlContent={content?.body || content?.content} />
          </div>
        )}
      </ContentWrapper>
    );
  };

  const renderContent = () => {
    if (!content) return null;

    switch (content?.type) {
      case "image":
        return renderImageContent();

      case "media":
        if (content?.meta?.type === "video") return renderVideoContent();
        if (content?.meta?.type === "audio") return renderAudioContent();
        if (content?.meta?.type === "image") return renderImageContent();
        if (content?.meta?.type === "document") return renderPDFContent();
        return renderTextContent();

      default:
        if (content?.type === "text") return renderTextContent();
        if (content?.type === "video") return renderVideoContent();
        if (content?.type === "pdf") return renderPDFContent();
        if (content?.type === "audio") return renderAudioContent();
        return renderTextContent();
    }
  };

  if (isLoading) {
    return <Loader />;
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
    <PageLayout>
      <div className="p-8 rounded-lg border border-gray-300">
        <Breadcrumb
          items={[
            {
              label: topic.title,
              path: `/topics/${topic.id}`,
            },
            {
              label: content.title,
            },
          ]}
        />
        <PageBody className="mt-4">
          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-8"></div>

          {/* Content Area */}
          <div className="mb-10">{renderContent()}</div>

          {/* Navigation Footer */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() =>
                  navigateToContent(navigation?.previous_content_id)
                }
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
                  {/* <p className="text-sm font-medium text-gray-700">
                    {t("topicContent.navigation.previousLesson")}
                  </p> */}
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
                  {/* <p className="text-sm font-medium text-white">
                    {t("topicContent.navigation.nextLesson")}
                  </p> */}
                </div>
                <FaArrowRight
                  size={14}
                  className="group-hover:translate-x-0.5 transition-transform text-white"
                />
              </button>
            </div>
          </div>
        </PageBody>
      </div>
    </PageLayout>
  );
};

export default TopicContent;

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getSingleContent,
  markContentAsRead,
} from "../../../../redux/slice/coursePreviewSlice";
import {
  FaFileAlt,
  FaVideo,
  FaImage,
  FaHeadphones,
  FaBookOpen,
  FaCode,
  FaExpand,
  FaCompress,
  FaBook,
  FaListUl,
  FaUnlockAlt,
  FaLock,
  FaChevronRight,
  FaCheckCircle,
  FaClock,
  FaCalendarAlt,
  FaCommentDots,
} from "react-icons/fa";
import { MdPictureAsPdf } from "react-icons/md";
import { useTranslation } from "react-i18next";
import Loader from "../../common/Loader";
import { PageLayout, PageBody } from "../../common/layout";
import Breadcrumb from "../../common/layout/Breadcrumb";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { HiSpeakerWave } from "react-icons/hi2";
import { FaPause, FaPlay } from "react-icons/fa";
import { PiVinylRecordFill } from "react-icons/pi";
import { GiSoundWaves } from "react-icons/gi";
import { FiPlayCircle } from "react-icons/fi";
import { IoCloseCircle } from "react-icons/io5";

// ---------- RichTextContent ----------
const RichTextContent = ({ htmlContent }) => {
  if (!htmlContent) return null;
  return (
    <>
      <div
        className="custom-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      <style>{`
        .custom-content p { margin: 0 0 16px; line-height: 1.8; }
        .custom-content h1, .custom-content h2, .custom-content h3,
        .custom-content h4, .custom-content h5, .custom-content h6 {
          margin: 24px 0 16px; font-weight: 700; line-height: 1.4;
        }
        .custom-content hr { margin: 24px 0; border: none; border-top: 1px solid #d1d5db; }
        .custom-content table { width: 100%; border-collapse: collapse; margin: 20px 0; border: 1px solid #d1d5db; }
        .custom-content td, .custom-content th { border: 1px solid #d1d5db; padding: 12px; vertical-align: top; }
        .custom-content th { background-color: #f3f4f6; font-weight: 600; }
        .custom-content img { max-width: 100%; height: auto; border-radius: 8px; }
        .custom-content ul { margin: 0 0 16px; padding-left: 24px; list-style-type: disc; list-style-position: outside; }
        .custom-content ol { margin: 0 0 16px; padding-left: 24px; list-style-type: decimal; list-style-position: outside; }
        .custom-content li { margin-bottom: 8px; display: list-item; }
      `}</style>
    </>
  );
};

// ---------- ContentWrapper ----------
const ContentWrapper = ({ children }) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
    <div className="p-6">{children}</div>
  </div>
);

// ---------- ClassicAudioPlayer ----------
const ClassicAudioPlayer = ({
  audioUrl,
  title = "Audio Lesson",
  playerKey,
}) => {
  const { t } = useTranslation();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    };
  }, [audioUrl, playerKey]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const value = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="professional-audio-player">
      <style>{`
        .professional-audio-player {
          background: linear-gradient(135deg, #f8f9fa 0%, #f1f3f5 100%);
          border-radius: 16px;
          border: 1px solid #e9ecef;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          padding: 16px 20px;
          transition: all 0.2s ease;
        }
        .professional-audio-player:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          border-color: #dee2e6;
        }
        .professional-audio-player .icon-container {
          background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
          transition: all 0.2s ease;
        }
        .professional-audio-player .play-btn {
          background: #3b82f6;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          transition: all 0.2s ease;
        }
        .professional-audio-player .play-btn:hover {
          background: #2563eb;
          transform: scale(1.02);
          box-shadow: 0 2px 6px rgba(59,130,246,0.3);
        }
        .professional-audio-player .play-btn:active {
          transform: scale(0.98);
        }
        .professional-audio-player .time-display {
          font-family: 'Courier New', monospace;
          font-size: 12px;
          font-weight: 500;
          color: #6c757d;
        }
        .professional-audio-player input[type="range"] {
          -webkit-appearance: none;
          background: #e9ecef;
          height: 4px;
          border-radius: 4px;
          cursor: pointer;
        }
        .professional-audio-player input[type="range"]:focus {
          outline: none;
        }
        .professional-audio-player input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #3b82f6;
          border: 2px solid #ffffff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .professional-audio-player input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          background: #2563eb;
        }
        .professional-audio-player .progress-bg {
          background: #e9ecef;
          border-radius: 4px;
          height: 4px;
          flex: 1;
          position: relative;
          overflow: hidden;
        }
        .professional-audio-player .progress-fill {
          background: linear-gradient(90deg, #3b82f6, #60a5fa);
          border-radius: 4px;
          height: 100%;
          width: 0%;
          transition: width 0.1s linear;
          position: relative;
        }
        .professional-audio-player .title-text {
          font-size: 13px;
          font-weight: 600;
          color: #1f2937;
          letter-spacing: -0.2px;
        }
        .professional-audio-player .subtitle {
          font-size: 11px;
          color: #9ca3af;
          font-weight: 400;
        }
        @keyframes subtlePulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        .professional-audio-player .wave-playing {
          animation: subtlePulse 1.5s ease-in-out infinite;
        }
      `}</style>

      <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
        <div className="icon-container hidden sm:flex items-center justify-center w-12 h-12 rounded-xl">
          {isPlaying ? (
            <GiSoundWaves className="text-xl text-gray-600 wave-playing" />
          ) : (
            <PiVinylRecordFill className="text-xl text-gray-500" />
          )}
        </div>

        <button
          onClick={toggleAudio}
          className="play-btn w-10 h-10 rounded-full flex items-center justify-center text-white transition-all cursor-pointer"
        >
          {isPlaying ? (
            <FaPause size={14} />
          ) : (
            <FaPlay size={14} className="ml-0.5" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="title-text truncate">{title}</h3>
            <span className="subtitle hidden sm:inline">
              {t("topicContent.audio.classicAudio")}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="time-display min-w-[40px]">
              {formatTime(currentTime)}
            </span>
            <div className="progress-bg">
              <div
                className="progress-fill"
                style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
              />
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                style={{ zIndex: 2 }}
              />
            </div>
            <span className="time-display min-w-[40px] text-right">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        >
          <source src={audioUrl} type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
};

// ---------- TopicContent ----------
const TopicContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { topicId, contentId } = useParams();
  const hasMarkedRead = useRef(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const iframeRef = useRef(null);
  const fullscreenContainerRef = useRef(null);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [flipDirection, setFlipDirection] = useState("next");
  const [pageTransitionMode, setPageTransitionMode] = useState("flip");
  const pageAreaRef = useRef(null);
  const pageContentRef = useRef(null);
  const [prevPageSnapshot, setPrevPageSnapshot] = useState(null);
  const [pageKey, setPageKey] = useState(null);
  const [pendingContentId, setPendingContentId] = useState(null);
  const [isSyncingNav, setIsSyncingNav] = useState(false);

  const { currentContent, isLoading, isMarkingRead } = useSelector(
    (state) => state.course,
  );

  const rawContent = currentContent?.current;
  const rawTopic = currentContent?.topic;
  const rawNavigation = currentContent?.navigation;
  const rawLearningNavigation = currentContent?.learning_navigation;

  const [content, setContent] = useState(rawContent ?? null);
  const [topic, setTopic] = useState(rawTopic ?? null);
  const [navigation, setNavigation] = useState(rawNavigation ?? null);
  const [learningNavigation, setLearningNavigation] = useState(
    rawLearningNavigation ?? null,
  );

  useEffect(() => {
    if (rawContent) {
      setContent(rawContent);
      setTopic(rawTopic);
      setNavigation(rawNavigation);
      setLearningNavigation(rawLearningNavigation);
    }
  }, [rawContent, rawTopic, rawNavigation, rawLearningNavigation]);

  useEffect(() => {
    const mediaType = content?.media?.type || content?.type;
    if (mediaType === "h5p" && content?.media?.full_url) {
      const scriptId = "h5p-resizer-script-topic";
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://abc10nst.h5p.com/js/h5p-resizer.js";
        script.charset = "UTF-8";
        script.async = true;
        script.onload = () => {
          console.log("H5P Resizer script loaded successfully");
          if (window.H5P && window.H5P.resize) window.H5P.resize();
        };
        document.head.appendChild(script);
      }
    }
  }, [content]);

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      };
    }
  }, [isFullscreen]);

  useEffect(() => {
    if (topicId && contentId) {
      dispatch(getSingleContent({ topicId, contentId }));
      hasMarkedRead.current = false;
    }
  }, [topicId, contentId, dispatch]);

  useEffect(() => {
    if (isLoading) return;
    if (
      content?.id &&
      String(content?.id) === String(contentId) &&
      (content?.is_read === 0 || content?.is_read === false) &&
      !hasMarkedRead.current
    ) {
      hasMarkedRead.current = true;

      const action = dispatch(markContentAsRead({ contentId: content.id }));

      const asPromise =
        action && typeof action.unwrap === "function"
          ? action.unwrap()
          : Promise.resolve(action);

      setIsSyncingNav(true);
      asPromise
        .then(() => {
          const refetch = dispatch(getSingleContent({ topicId, contentId }));
          return refetch && typeof refetch.unwrap === "function"
            ? refetch.unwrap()
            : refetch;
        })
        .catch((err) => {
          console.error("Failed to sync content-read/assessment status:", err);
        })
        .finally(() => {
          setIsSyncingNav(false);
        });
    }
  }, [content?.id, content?.is_read, contentId, isLoading, dispatch, topicId]);

  useEffect(() => {
    if (!isLoading && content?.id) {
      setPageKey((prev) => (prev === content.id ? prev : content.id));
      setIsNavigating(false);
      setShowAudioPlayer(false);
      setPendingContentId(null);
    }
  }, [isLoading, content?.id]);

  const [isFlipSettled, setIsFlipSettled] = useState(true);
  useEffect(() => {
    if (pageKey === null) return;
    setIsFlipSettled(false);
    let raf2;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setIsFlipSettled(true);
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [pageKey]);

  const captureSnapshot = () => {
    const source = pageContentRef.current;
    if (!source) return null;
    const clone = source.cloneNode(true);
    const originalMedia = source.querySelectorAll("iframe, video, audio");
    const clonedMedia = clone.querySelectorAll("iframe, video, audio");
    clonedMedia.forEach((el, idx) => {
      const original = originalMedia[idx];
      const rect = original ? original.getBoundingClientRect() : null;
      const placeholder = document.createElement("div");
      placeholder.setAttribute(
        "style",
        `width:100%;height:${rect && rect.height ? Math.round(rect.height) : 400}px;background:#f3f4f6;border-radius:8px;`,
      );
      el.replaceWith(placeholder);
    });
    return clone.innerHTML;
  };

  const navigateToContent = (
    newContentId,
    direction = "next",
    mode = "flip",
  ) => {
    if (newContentId && !isNavigating) {
      setPendingContentId(newContentId);
      setIsNavigating(true);
      setPageTransitionMode(mode);

      if (mode === "flip") {
        setFlipDirection(direction);
        setPrevPageSnapshot(captureSnapshot());
      } else {
        setPrevPageSnapshot(null);
      }

      if (pageAreaRef.current) {
        pageAreaRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      try {
        navigate(`/topics/${topicId}/content/${newContentId}`, {
          replace: true,
        });
      } catch (error) {
        console.error("Navigation error:", error);
        setIsNavigating(false);
        setPendingContentId(null);
      }
    }
  };

  const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes("youtube.com/watch") || url.includes("youtu.be")) {
      let videoId = "";
      if (url.includes("youtube.com/watch")) {
        videoId = new URL(url).searchParams.get("v");
      } else {
        videoId = url.split("/").pop();
      }
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes("vimeo.com")) {
      const videoId = url.split("/").pop();
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return null;
  };

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  const renderH5PContent = () => {
    const h5pUrl = content?.media?.full_url || content?.content;
    const cleanUrl = h5pUrl?.split("?")[0];
    if (isFullscreen) {
      return (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="h-full flex flex-col">
            <div className="flex-shrink-0 border-b border-gray-200 bg-gray-50 px-4 py-3 flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleFullscreen}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <FaCompress size={14} />
                  <span>{t("topicContent.exitFullscreen")}</span>
                </button>
                <div className="h-5 w-px bg-gray-300" />
                <span className="text-sm font-medium text-gray-700">
                  {content?.title}
                </span>
              </div>
            </div>
            <div
              ref={fullscreenContainerRef}
              className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50"
              style={{ WebkitOverflowScrolling: "touch", position: "relative" }}
            >
              <div className="min-h-full w-full p-4">
                <div className="max-w-7xl mx-auto">
                  <div className="bg-white rounded-lg shadow-lg">
                    <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 rounded-t-lg">
                      <span className="text-xs font-medium text-gray-700 flex items-center gap-2">
                        <FaCode className="text-blue-600" />
                        {t("topicContent.h5p.interactive")}
                      </span>
                    </div>
                    <div className="w-full">
                      <iframe
                        ref={iframeRef}
                        src={cleanUrl}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay *; geolocation *; microphone *; camera *; midi *; encrypted-media *"
                        title={content?.title}
                        style={{
                          display: "block",
                          minHeight: "calc(100vh - 120px)",
                          height: "auto",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 flex justify-between items-center rounded-t-lg">
          <div className="flex items-center gap-2">
            <FaCode className="text-blue-600 text-sm" />
            <span className="text-xs font-medium text-gray-700">
              {t("topicContent.h5p.interactive")}
            </span>
          </div>
          <button
            onClick={toggleFullscreen}
            className="text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1 cursor-pointer"
            title={t("topicContent.fullscreen")}
          >
            <FaExpand size={14} />
            <span className="text-xs">{t("topicContent.fullscreen")}</span>
          </button>
        </div>
        <div className="h-[600px] overflow-auto">
          <iframe
            ref={iframeRef}
            src={cleanUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            allow="autoplay *; geolocation *; microphone *; camera *; midi *; encrypted-media *"
            title={content?.title}
            style={{ minHeight: "600px", height: "100%" }}
          />
        </div>
        {content?.content && (
          <div className="p-6 border-t border-gray-200">
            <RichTextContent htmlContent={content?.content} />
          </div>
        )}
      </div>
    );
  };

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
        {isDirectVideo ? (
          <video controls className="w-full rounded-lg">
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : embedUrl ? (
          <iframe
            src={embedUrl}
            title={content?.title}
            className="w-full h-[500px] rounded-lg"
            allowFullScreen
          />
        ) : (
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
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
            title={content?.title}
            className="absolute top-0 left-0 w-full h-full border-0"
            style={{ border: "none", overflow: "auto" }}
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
      content?.audio_content ||
      content?.content;
    const audioKey = `audio-${content?.id}-${audioUrl}`;
    return (
      <ContentWrapper>
        <div className="max-w-3xl mx-auto">
          <ClassicAudioPlayer
            playerKey={audioKey}
            audioUrl={audioUrl}
            title={content?.title || t("topicContent.audio.lesson")}
          />
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
    if (content?.type === "h5p" || content?.media?.type === "h5p")
      return renderH5PContent();
    switch (content?.type) {
      case "image":
        return renderImageContent();
      case "media":
        if (content?.meta?.type === "video") return renderVideoContent();
        if (content?.meta?.type === "audio") return renderAudioContent();
        if (content?.meta?.type === "image") return renderImageContent();
        if (content?.meta?.type === "document") return renderPDFContent();
        if (content?.meta?.type === "h5p") return renderH5PContent();
        return renderTextContent();
      default:
        if (content?.type === "text") return renderTextContent();
        if (content?.type === "video") return renderVideoContent();
        if (content?.type === "pdf") return renderPDFContent();
        if (content?.type === "audio") return renderAudioContent();
        if (content?.type === "h5p") return renderH5PContent();
        return renderTextContent();
    }
  };

  const handleChatClick = () => {
    navigate(`/support?topicId=${topicId}`);
  };

  if (isLoading && !isNavigating && !isMarkingRead) return <Loader />;

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
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition shadow-sm cursor-pointer"
        >
          {t("topicContent.notFound.button")}
        </button>
      </div>
    );
  }

  const currentTopicContents = learningNavigation?.current_topic_contents || [];
  const chapterTopics = learningNavigation?.chapter_topics || [];
  const assessment = learningNavigation?.assessment;

  const handleGiveQuiz = () => {
    if (assessment?.id) navigate(`/quiz/${assessment.id}`);
  };

  const getQuizButtonProps = () => {
    if (!assessment) return null;
    const { status } = assessment;

    let label = "";
    let disabled = false;
    let color = "bg-blue-600 hover:bg-blue-700 text-white";
    let icon = null;

    if (status === "ready" || status === "completed") {
      label = t("topicContent.quiz.start");
      icon = <FiPlayCircle className="w-4 h-4" />;
    } else if (status === "failed") {
      label = t("topicContent.quiz.retry");
      icon = <IoCloseCircle className="w-4 h-4" />;
    } else if (status === "passed") {
      label = t("topicContent.quiz.passed");
      disabled = true;
      color = "bg-gray-200 text-gray-500 cursor-not-allowed hover:bg-gray-200";
      icon = <FaCheckCircle className="w-4 h-4" />;
    } else {
      return null;
    }

    return { label, disabled, color, icon };
  };

  const quizButton = getQuizButtonProps();

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const lastUpdated =
    content?.last_updated_at || content?.read_at || content?.updated_at;

  const activeContentId = pendingContentId || content?.id;

  return (
    <PageLayout>
      <div className="p-2 sm:p-8 rounded-lg border border-gray-300">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Breadcrumb
            items={[
              { label: topic?.title, path: `/topics/${topic?.id}` },
              { label: content?.title },
            ]}
          />
          <div className="flex items-center gap-2">
            <button
              className="relative px-4 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 animate-pulse flex items-center gap-2 cursor-pointer whitespace-nowrap"
              onClick={handleChatClick}
            >
              <FaCommentDots className="inline-block" />
              {t("topics.buttons.askAboutThisTopic")}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
            </button>
            {content?.audio_content && (
              <button
                onClick={() => setShowAudioPlayer(!showAudioPlayer)}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 transition shadow-sm cursor-pointer"
              >
                <HiSpeakerWave className="text-xl text-gray-600" />
              </button>
            )}
          </div>
        </div>

        <PageBody className="mt-4">
          {showAudioPlayer && content?.audio_content && (
            <div className="mb-6">
              <ClassicAudioPlayer
                playerKey={`audio-content-${content?.id}`}
                audioUrl={content?.audio_content}
                title={content?.title || t("topicContent.audio.lesson")}
              />
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
            {topic?.estimated_duration && (
              <div className="flex items-center gap-1.5">
                <FaClock className="text-blue-500" />
                <span>
                  <span className="font-medium">
                    {t("topicContent.info.duration")}
                  </span>{" "}
                  {topic.estimated_duration} min
                </span>
              </div>
            )}
            {lastUpdated && (
              <div className="flex items-center gap-1.5">
                <FaCalendarAlt className="text-purple-500" />
                <span>
                  <span className="font-medium">
                    {t("topicContent.info.lastUpdated")}
                  </span>{" "}
                  {formatDate(lastUpdated)}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <div className="col-span-12 xl:col-span-8">
              <div
                ref={pageAreaRef}
                className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent "
              />

              <div className="book-page-stage mb-10">
                {pageTransitionMode === "flip" && prevPageSnapshot && (
                  <div
                    className="book-page-behind"
                    dangerouslySetInnerHTML={{ __html: prevPageSnapshot }}
                  />
                )}
                <div
                  key={pageKey}
                  ref={pageContentRef}
                  className={
                    pageTransitionMode === "flip"
                      ? "book-page-live"
                      : "book-page-live book-page-fade"
                  }
                  style={
                    pageTransitionMode === "flip"
                      ? {
                          transformOrigin:
                            flipDirection === "next"
                              ? "right center"
                              : "left center",
                          transform: isFlipSettled
                            ? "rotateY(0deg)"
                            : flipDirection === "next"
                              ? "rotateY(94deg)"
                              : "rotateY(-94deg)",
                          transition: isFlipSettled
                            ? "transform 0.68s cubic-bezier(0.22, 1, 0.36, 1)"
                            : "none",
                        }
                      : {
                          opacity: isFlipSettled ? 1 : 0,
                          transform: isFlipSettled
                            ? "translateY(0px)"
                            : "translateY(10px)",
                          transition: isFlipSettled
                            ? "opacity 0.28s ease, transform 0.28s ease"
                            : "none",
                        }
                  }
                  onTransitionEnd={(e) => {
                    if (
                      e.propertyName === "transform" ||
                      e.propertyName === "opacity"
                    )
                      setPrevPageSnapshot(null);
                  }}
                >
                  {renderContent()}
                  {pageTransitionMode === "flip" && (
                    <div
                      aria-hidden="true"
                      className="book-page-shade"
                      style={{
                        background:
                          flipDirection === "next"
                            ? "linear-gradient(to left, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.08) 35%, rgba(0,0,0,0) 65%)"
                            : "linear-gradient(to right, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.08) 35%, rgba(0,0,0,0) 65%)",
                        opacity: isFlipSettled ? 0 : 0.9,
                        transition: isFlipSettled
                          ? "opacity 0.68s cubic-bezier(0.22, 1, 0.36, 1)"
                          : "none",
                      }}
                    />
                  )}
                </div>
              </div>

              <style>{`
                .book-page-stage { position: relative; perspective: 2200px; -webkit-perspective: 2200px; }
                .book-page-behind { position: absolute; inset: 0; z-index: 1; pointer-events: none; background: #ffffff; overflow: hidden; border-radius: 12px; }
                .book-page-live { position: relative; z-index: 2; background: #ffffff; border-radius: 12px; transform-style: preserve-3d; backface-visibility: hidden; -webkit-backface-visibility: hidden; isolation: isolate; will-change: transform; }
                .book-page-fade { will-change: opacity, transform; }
                .book-page-shade { position: absolute; inset: 0; z-index: 5; pointer-events: none; border-radius: inherit; will-change: opacity; }
                @media (prefers-reduced-motion: reduce) {
                  .book-page-live { transition: none !important; transform: none !important; }
                  .book-page-shade { display: none; }
                }
              `}</style>

              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <button
                    onClick={() =>
                      navigateToContent(
                        navigation?.previous_content_id,
                        "prev",
                        "flip",
                      )
                    }
                    disabled={!navigation?.has_previous || isNavigating}
                    className="group flex items-center gap-2 px-4 py-2 cursor-pointer bg-white border border-gray-300 rounded-lg
                           disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50
                           hover:border-gray-400 transition-all duration-200 shadow-sm"
                  >
                    {isNavigating ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                        <span className="text-sm text-gray-500">
                          {t("topicContent.navigation.loading")}
                        </span>
                      </div>
                    ) : (
                      <>
                        <IoIosArrowBack
                          size={14}
                          className="group-hover:-translate-x-0.5 transition-transform"
                        />
                        <div className="text-left">
                          <p className="text-xs text-gray-500">
                            {t("topicContent.navigation.previous")}
                          </p>
                        </div>
                      </>
                    )}
                  </button>

                  {quizButton && (
                    <button
                      onClick={handleGiveQuiz}
                      disabled={quizButton.disabled}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-sm cursor-pointer ${quizButton.color}`}
                    >
                      {quizButton.icon}
                      {quizButton.label}
                    </button>
                  )}

                  {isSyncingNav && !quizButton && (
                    <span className="text-xs text-gray-400 flex items-center gap-1.5">
                      <div className="w-3 h-3 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                      {t("topicContent.navigation.syncing")}
                    </span>
                  )}

                  {navigation?.has_next ? (
                    <button
                      onClick={() =>
                        navigateToContent(
                          navigation?.next_content_id,
                          "next",
                          "flip",
                        )
                      }
                      disabled={!navigation?.has_next || isNavigating}
                      className="group flex items-center gap-2 cursor-pointer px-4 py-2 bg-blue-600 border border-blue-600
                             rounded-lg disabled:opacity-40 disabled:cursor-not-allowed
                             hover:bg-blue-700 transition-all duration-200 shadow-sm"
                    >
                      {isNavigating ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span className="text-sm text-white">
                            {t("topicContent.navigation.loading")}
                          </span>
                        </div>
                      ) : (
                        <>
                          <div className="text-right">
                            <p className="text-xs text-blue-100">
                              {t("topicContent.navigation.next")}
                            </p>
                          </div>
                          <IoIosArrowForward
                            size={14}
                            className="group-hover:translate-x-0.5 transition-transform text-white"
                          />
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="group flex items-center gap-2 px-4 py-2 bg-gray-300 border border-gray-300
                             rounded-lg opacity-60 cursor-not-allowed shadow-sm"
                    >
                      <div className="text-right">
                        <p className="text-xs text-gray-500">
                          {t("topicContent.navigation.next")}
                        </p>
                      </div>
                      <IoIosArrowForward size={14} className="text-gray-500" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="hidden xl:block xl:col-span-4 space-y-6 sticky top-4 self-start">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 flex items-center gap-2">
                  <FaBook className="text-blue-600" />
                  <h3 className="font-semibold text-gray-800">
                    {t("topicContent.sidebar.tableOfContents")}
                  </h3>
                </div>
                <div className="p-4 max-h-96 overflow-y-auto">
                  {currentTopicContents.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      {t("topicContent.sidebar.noContents")}
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {currentTopicContents.map((item, index) => {
                        const isActive = item.id === activeContentId;
                        const isPending = item.id === pendingContentId;
                        return (
                          <li key={item.id}>
                            <button
                              onClick={() => {
                                if (!isActive && !isNavigating) {
                                  navigateToContent(item.id, "next", "fade");
                                }
                              }}
                              disabled={isNavigating}
                              className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-3 flex-nowrap cursor-pointer ${
                                isActive
                                  ? "bg-blue-50 border border-blue-200 shadow-sm text-blue-700 font-medium"
                                  : isPending
                                    ? "bg-blue-50/50 border border-blue-100 text-blue-600"
                                    : "hover:bg-gray-50 text-gray-700 hover:border-gray-200 border border-transparent"
                              } ${isNavigating ? "opacity-60 cursor-wait" : ""}`}
                            >
                              <span
                                className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                                  isActive
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-600"
                                }`}
                              >
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <span className="flex-1 min-w-0 truncate">
                                {item.title}
                              </span>
                              {item.is_read && (
                                <FaCheckCircle
                                  className={`flex-shrink-0 text-green-500 ${isActive ? "opacity-100" : "opacity-60"}`}
                                />
                              )}
                              {isActive && (
                                <FaChevronRight className="flex-shrink-0 text-blue-600 ml-auto" />
                              )}
                              {isPending && !isActive && (
                                <div className="flex-shrink-0 w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 flex items-center gap-2">
                  <FaListUl className="text-gray-700" />
                  <h3 className="font-semibold text-gray-800">
                    {t("topicContent.sidebar.otherTopics")}
                  </h3>
                </div>
                <div className="p-4 max-h-64 overflow-y-auto">
                  {chapterTopics.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      {t("topicContent.sidebar.noOtherTopics")}
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {chapterTopics.map((topicItem) => {
                        const isCurrent = topicItem.is_current;
                        const isUnlocked = topicItem.is_unlocked;
                        return (
                          <li key={topicItem.id}>
                            <button
                              onClick={() => {
                                if (isUnlocked && !isCurrent && !isNavigating) {
                                  const firstContentId =
                                    topicItem.first_content_id;
                                  if (firstContentId) {
                                    navigate(
                                      `/topics/${topicItem.id}/content/${firstContentId}`,
                                    );
                                  } else {
                                    navigate(`/topics/${topicItem.id}`);
                                  }
                                }
                              }}
                              disabled={!isUnlocked || isNavigating}
                              className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-3 flex-nowrap cursor-pointer ${
                                isCurrent
                                  ? "bg-blue-50 border border-blue-200 shadow-sm text-blue-700 font-medium"
                                  : isUnlocked
                                    ? "hover:bg-gray-50 text-gray-700 hover:border-gray-200 border border-transparent"
                                    : "text-gray-400 cursor-not-allowed border border-transparent"
                              } ${isNavigating ? "opacity-60 cursor-wait" : ""}`}
                            >
                              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                                {isCurrent ? (
                                  <FaBookOpen className="text-blue-600" />
                                ) : isUnlocked ? (
                                  <FaUnlockAlt className="text-gray-500" />
                                ) : (
                                  <FaLock className="text-gray-300" />
                                )}
                              </span>
                              <span className="flex-1 min-w-0 truncate">
                                {topicItem.title}
                              </span>
                              {topicItem.is_completed && (
                                <FaCheckCircle className="flex-shrink-0 text-green-500" />
                              )}
                              {isCurrent && (
                                <FaChevronRight className="flex-shrink-0 text-blue-600 ml-auto" />
                              )}
                              {!isUnlocked && (
                                <span className="flex-shrink-0 text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                  {t("topicContent.sidebar.locked")}
                                </span>
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </PageBody>
      </div>
    </PageLayout>
  );
};

export default TopicContent;

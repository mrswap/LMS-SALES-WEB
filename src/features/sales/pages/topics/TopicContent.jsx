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

const RichTextContent = ({ htmlContent }) => {
  if (!htmlContent) return null;
  const contentRef = useRef(null);
  const [displayHTML, setDisplayHTML] = useState(htmlContent || "");
  const [isTranslating, setIsTranslating] = useState(false);
  const isCancelledRef = useRef(false);
  const docRef = useRef(null);
  const blockElsRef = useRef([]);
  const translatedSetRef = useRef(new Set());
  const observerRef = useRef(null);

  const translateText = async (text, targetLang) => {
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
      const res = await fetch(url);
      if (!res.ok) return text;
      const data = await res.json();
      return data[0]
        .map((item) => item[0])
        .filter(Boolean)
        .join("");
    } catch {
      return text;
    }
  };

  const translateElement = async (docEl, targetLang) => {
    if (isCancelledRef.current) return;

    const textNodes = [];
    const walk = document.createTreeWalker(docEl, NodeFilter.SHOW_TEXT, null);
    let node;
    while ((node = walk.nextNode())) {
      if (node.textContent.trim()) textNodes.push(node);
    }

    for (const n of textNodes) {
      if (isCancelledRef.current) return;
      if (!n.textContent.trim()) continue;
      const translated = await translateText(n.textContent.trim(), targetLang);
      if (isCancelledRef.current) return;
      n.textContent = translated;
    }

    if (!isCancelledRef.current) {
      setDisplayHTML(docRef.current.body.innerHTML);
    }
  };

  // Step 1: htmlContent change hone pe doc prepare karo
  useEffect(() => {
    const lang = localStorage.getItem("appLanguage") || "en";
    if (!htmlContent) return;

    isCancelledRef.current = false;
    translatedSetRef.current = new Set();
    blockElsRef.current = [];

    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (lang === "en") {
      setDisplayHTML(htmlContent);
      return;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    docRef.current = doc;

    const blockEls = Array.from(
      doc.body.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li, td, th"),
    ).filter((el) => el.textContent.trim());

    if (blockEls.length === 0) {
      // Koi block nahi — poora body translate karo
      setIsTranslating(true);
      translateElement(doc.body, lang).finally(() => {
        if (!isCancelledRef.current) setIsTranslating(false);
      });
      return;
    }

    // data-tid lagao
    blockEls.forEach((el, idx) => el.setAttribute("data-tid", String(idx)));
    blockElsRef.current = blockEls;

    // data-tid wala HTML render karo
    setDisplayHTML(doc.body.innerHTML);

    return () => {
      isCancelledRef.current = true;
      if (observerRef.current) observerRef.current.disconnect();
      setIsTranslating(false);
    };
  }, [htmlContent]);

  // Step 2: displayHTML render hone ke baad observer lagao
  useEffect(() => {
    const lang = localStorage.getItem("appLanguage") || "en";
    if (lang === "en") return;
    if (!contentRef.current) return;
    if (blockElsRef.current.length === 0) return;
    if (isCancelledRef.current) return;

    // Purana observer disconnect karo
    if (observerRef.current) observerRef.current.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const tid = entry.target.getAttribute("data-tid");
          if (tid === null) return;
          if (translatedSetRef.current.has(tid)) return;

          translatedSetRef.current.add(tid);
          observer.unobserve(entry.target);

          const docEl = blockElsRef.current[Number(tid)];
          if (!docEl) return;

          setIsTranslating(true);
          translateElement(docEl, lang).finally(() => {
            if (isCancelledRef.current) return;
            if (translatedSetRef.current.size >= blockElsRef.current.length) {
              setIsTranslating(false);
            }
          });
        });
      },
      {
        root: null,
        rootMargin: "400px 0px",
        threshold: 0,
      },
    );

    observerRef.current = observer;

    // Saare data-tid elements observe karo
    const realEls = contentRef.current.querySelectorAll("[data-tid]");
    realEls.forEach((el) => {
      const tid = el.getAttribute("data-tid");
      // Already translated nahi hai toh observe karo
      if (!translatedSetRef.current.has(tid)) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [displayHTML]); // displayHTML change hone pe dobara observe lagao

  if (!htmlContent) return null;

  return (
    <>
      <div
        ref={contentRef}
        className="custom-content"
        dangerouslySetInnerHTML={{ __html: displayHTML }}
      />

      {isTranslating && (
        <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
          <div className="w-3 h-3 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
          <span>Translating...</span>
        </div>
      )}

      <style>{`
        .custom-content p { margin: 0 0 16px; line-height: 1.8; }
        .custom-content h1, .custom-content h2, .custom-content h3,
        .custom-content h4, .custom-content h5, .custom-content h6 {
          margin: 24px 0 16px; font-weight: 700; line-height: 1.4;
        }
        .custom-content ul, .custom-content ol { margin: 0 0 16px; padding-left: 24px; }
        .custom-content li { margin-bottom: 8px; }
        .custom-content hr { margin: 24px 0; border: none; border-top: 1px solid #d1d5db; }
        .custom-content table { width: 100%; border-collapse: collapse; margin: 20px 0; border: 1px solid #d1d5db; }
        .custom-content td, .custom-content th { border: 1px solid #d1d5db; padding: 12px; vertical-align: top; }
        .custom-content th { background-color: #f3f4f6; font-weight: 600; }
        .custom-content img { max-width: 100%; height: auto; border-radius: 8px; }
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

// Professional Classic Audio Player Component
const ClassicAudioPlayer = ({ audioUrl, title = "Audio Lesson" }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
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
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          padding: 16px 20px;
          transition: all 0.2s ease;
        }
        .professional-audio-player:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border-color: #dee2e6;
        }
        .professional-audio-player .icon-container {
          background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
          transition: all 0.2s ease;
        }
        .professional-audio-player .play-btn {
          background: #3b82f6;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: all 0.2s ease;
        }
        .professional-audio-player .play-btn:hover {
          background: #2563eb;
          transform: scale(1.02);
          box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
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
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
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
        {/* Icon Container */}
        <div className="icon-container hidden sm:flex items-center justify-center w-12 h-12 rounded-xl">
          {isPlaying ? (
            <GiSoundWaves className="text-xl text-gray-600 wave-playing" />
          ) : (
            <PiVinylRecordFill className="text-xl text-gray-500" />
          )}
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={toggleAudio}
          className="play-btn w-10 h-10 rounded-full flex items-center justify-center text-white transition-all"
        >
          {isPlaying ? (
            <FaPause size={14} />
          ) : (
            <FaPlay size={14} className="ml-0.5" />
          )}
        </button>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="title-text truncate">{title}</h3>
            <span className="subtitle hidden sm:inline">Classic Audio</span>
          </div>

          {/* Progress Bar */}
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

        {/* Audio element */}
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

  const { currentContent, isLoading, isMarkingRead } = useSelector(
    (state) => state.course,
  );

  const content = currentContent?.current;
  const topic = currentContent?.topic;
  const navigation = currentContent?.navigation;

  // Load H5P resizer script dynamically
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
          if (window.H5P && window.H5P.resize) {
            window.H5P.resize();
          }
        };

        document.head.appendChild(script);
      }
    }
  }, [content]);

  // Fullscreen scrolling fix
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

  // Effect to call read API when content loads and is not read
  // useEffect(() => {
  //   if (
  //     content &&
  //     content.id &&
  //     (content.is_read === 0 || content.is_read === false) &&
  //     !hasMarkedRead.current
  //   ) {
  //     hasMarkedRead.current = true;
  //     dispatch(markContentAsRead({ contentId: content.id }));
  //   }
  // }, [content, dispatch]);

  useEffect(() => {
    if (isLoading) return;

    if (
      content?.id &&
      String(content?.id) === String(contentId) &&
      (content?.is_read === 0 || content?.is_read === false) &&
      !hasMarkedRead.current
    ) {
      hasMarkedRead.current = true;

      dispatch(
        markContentAsRead({
          contentId: content.id,
        }),
      );
    }
  }, [content?.id, content?.is_read, contentId, isLoading, dispatch]);

  const navigateToContent = async (newContentId) => {
    if (newContentId && !isNavigating) {
      setIsNavigating(true);
      try {
        // await dispatch(getSingleContent({ topicId, contentId: newContentId }));
        navigate(`/topics/${topicId}/content/${newContentId}`, {
          replace: true,
        });
      } catch (error) {
        console.error("Navigation error:", error);
      } finally {
        setIsNavigating(false);
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

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

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
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
                >
                  <FaCompress size={14} />
                  <span>
                    {t("topicContent.exitFullscreen") || "Exit Fullscreen"}
                  </span>
                </button>
                <div className="h-5 w-px bg-gray-300"></div>
                <span className="text-sm font-medium text-gray-700">
                  {content?.title}
                </span>
              </div>
            </div>

            <div
              ref={fullscreenContainerRef}
              className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50"
              style={{
                WebkitOverflowScrolling: "touch",
                position: "relative",
              }}
            >
              <div className="min-h-full w-full p-4">
                <div className="max-w-7xl mx-auto">
                  <div className="bg-white rounded-lg shadow-lg">
                    <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 rounded-t-lg">
                      <span className="text-xs font-medium text-gray-700 flex items-center gap-2">
                        <FaCode className="text-blue-600" />
                        {t("topicContent.h5p.interactive") ||
                          "Interactive H5P Content"}
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
              {t("topicContent.h5p.interactive") || "Interactive H5P Content"}
            </span>
          </div>
          <button
            onClick={toggleFullscreen}
            className="text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1"
            title={t("topicContent.fullscreen") || "Fullscreen"}
          >
            <FaExpand size={14} />
            <span className="text-xs">
              {t("topicContent.fullscreen") || "Fullscreen"}
            </span>
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
            style={{
              minHeight: "600px",
              height: "100%",
            }}
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
            style={{
              border: "none",
              overflow: "auto",
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

  // Updated renderAudioContent with professional classic player
  const renderAudioContent = () => {
    const audioUrl =
      content?.meta?.full_url ||
      content?.media?.full_url ||
      content?.audio_content ||
      content?.content;

    return (
      <ContentWrapper>
        <div className="max-w-3xl mx-auto">
          <ClassicAudioPlayer
            audioUrl={audioUrl}
            title={content?.title || "Audio Lesson"}
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

    if (content?.type === "h5p" || content?.media?.type === "h5p") {
      return renderH5PContent();
    }

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

  // Initial load ke time hi full loader dikhega, read mark karne ke time nahi
  if (isLoading && !isNavigating && !isMarkingRead) {
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
        <div className="flex items-center justify-between gap-3">
          <Breadcrumb
            items={[
              {
                label: topic?.title,
                path: `/topics/${topic?.id}`,
              },
              {
                label: content?.title,
              },
            ]}
          />

          {content?.audio_content && (
            <button
              onClick={() => setShowAudioPlayer(!showAudioPlayer)}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 transition shadow-sm"
            >
              <HiSpeakerWave className="text-xl text-gray-600" />
            </button>
          )}
        </div>
        <PageBody className="mt-4">
          {/* Professional Audio Player for audio_content */}
          {showAudioPlayer && content?.audio_content && (
            <div className="mb-6">
              <ClassicAudioPlayer
                audioUrl={content?.audio_content}
                title={content?.title || "Audio Lesson"}
              />
            </div>
          )}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-8"></div>
          <div className="mb-10">{renderContent()}</div>
          {/* Navigation Footer with loading state */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() =>
                  navigateToContent(navigation?.previous_content_id)
                }
                disabled={!navigation?.has_previous || isNavigating}
                className="group flex items-center gap-2 px-4 py-2 cursor-pointer bg-white border border-gray-300 rounded-lg
                       disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50
                       hover:border-gray-400 transition-all duration-200 shadow-sm"
              >
                {isNavigating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                    <span className="text-sm text-gray-500">Loading...</span>
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
              <button
                onClick={() => navigateToContent(navigation?.next_content_id)}
                disabled={!navigation?.has_next || isNavigating}
                className="group flex items-center gap-2 cursor-pointer px-4 py-2 bg-blue-600 border border-blue-600
                       rounded-lg disabled:opacity-40 disabled:cursor-not-allowed
                       hover:bg-blue-700 transition-all duration-200 shadow-sm"
              >
                {isNavigating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm text-white">Loading...</span>
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
            </div>
          </div>
        </PageBody>
      </div>
    </PageLayout>
  );
};

export default TopicContent;

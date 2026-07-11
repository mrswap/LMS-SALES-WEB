// // import React, { useEffect, useState, useRef } from "react";
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   ScrollView,
// //   TouchableOpacity,
// //   ActivityIndicator,
// //   Image,
// //   Linking,
// //   useWindowDimensions,
// // } from "react-native";
// // import { useSafeAreaInsets } from "react-native-safe-area-context";
// // import { Ionicons } from "@expo/vector-icons";
// // import { useRouter, useLocalSearchParams } from "expo-router";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useVideoPlayer, VideoView } from "expo-video";
// // import { useTranslation } from "react-i18next";
// // import { wp, hp, ms, fs } from "../../../utils/responsive";
// // import {
// //   fetchSinglePreview,
// //   toggleTopicContentRead,
// // } from "../../../redux/slices/courseSlice";
// // import { formatImageUrl } from "../../../utils/imageUtils";
// // import HtmlContent from "../../../components/HtmlContent";
// // import i18n from "../../../i18n";

// // const HtmlRenderer = ({ html }) => {
// //   const { width } = useWindowDimensions();
// //   const availableWidth = width - wp(24) - ms(12) * 2;
// //   return <HtmlContent html={html} containerWidth={availableWidth} />;
// // };

// // // Split HTML into elements (keeping tags)
// // const splitHtmlIntoElements = (html) => {
// //   if (!html) return [];
// //   return html.split(/(<[^>]+>)/g).filter(Boolean);
// // };

// // // Group elements into chunks with proper limits
// // const groupElementsIntoChunks = (
// //   elements,
// //   firstChunkLimit = 500,
// //   remainingChunkLimit = 1200,
// // ) => {
// //   const chunks = [];
// //   let currentChunk = "";
// //   let currentLimit = firstChunkLimit;

// //   elements.forEach((element) => {
// //     const currentLength = currentChunk.replace(/<[^>]+>/g, "").length;
// //     const elementLength = element.replace(/<[^>]+>/g, "").length;

// //     if (currentLength + elementLength > currentLimit) {
// //       if (currentChunk.trim()) {
// //         chunks.push(currentChunk);
// //       }
// //       currentChunk = element;
// //       currentLimit = remainingChunkLimit;
// //     } else {
// //       currentChunk += element;
// //     }
// //   });

// //   if (currentChunk.trim()) {
// //     chunks.push(currentChunk);
// //   }

// //   return chunks;
// // };

// // // Translate a single chunk of HTML
// // const translateHtmlChunk = async (html, targetLang, signal = null) => {
// //   if (!html) return html;

// //   try {
// //     const parts = html.split(/(<[^>]+>)/g);
// //     const translatedParts = [];

// //     for (const part of parts) {
// //       if (signal && signal.aborted) {
// //         throw new Error("Translation aborted");
// //       }

// //       if ((part.startsWith("<") && part.endsWith(">")) || !part.trim()) {
// //         translatedParts.push(part);
// //         continue;
// //       }

// //       const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(part)}`;

// //       try {
// //         const response = await fetch(url, { signal });
// //         if (!response.ok)
// //           throw new Error(`API responded with status ${response.status}`);
// //         const data = await response.json();
// //         if (data && data[0]) {
// //           translatedParts.push(data[0].map((s) => s[0]).join(""));
// //         } else {
// //           translatedParts.push(part);
// //         }
// //       } catch (err) {
// //         if (err.name === "AbortError" || signal?.aborted) throw err;
// //         console.error("Error translating part:", err);
// //         translatedParts.push(part);
// //       }

// //       // Small delay to prevent rate limiting
// //       await new Promise((resolve) => setTimeout(resolve, 50));
// //     }

// //     return translatedParts.join("");
// //   } catch (error) {
// //     if (error.name === "AbortError" || signal?.aborted) throw error;
// //     console.error("Translation error:", error);
// //     return html;
// //   }
// // };

// // // ---------- Video Player (local/direct URL) ----------
// // const VideoPlayer = ({ url }) => {
// //   const player = useVideoPlayer(url, (p) => {
// //     p.play();
// //   });
// //   return (
// //     <VideoView
// //       style={styles.videoPlayer}
// //       player={player}
// //       allowsFullscreen
// //       allowsPictureInPicture
// //     />
// //   );
// // };

// // // ---------- Image Viewer ----------
// // const ImageViewer = ({ url, title, description }) => {
// //   const [imgError, setImgError] = useState(false);
// //   const { t } = useTranslation();
// //   return (
// //     <View style={styles.mediaWrapper}>
// //       {!imgError ? (
// //         <Image
// //           source={{ uri: url }}
// //           style={styles.contentImage}
// //           resizeMode="contain"
// //           onError={() => setImgError(true)}
// //         />
// //       ) : (
// //         <View style={styles.mediaErrorBox}>
// //           <Ionicons name="image-outline" size={ms(40)} color="#94A3B8" />
// //           <Text style={styles.mediaErrorText}>
// //             {t("levels.image_error", "Image could not be loaded")}
// //           </Text>
// //         </View>
// //       )}
// //       {title ? <Text style={styles.mediaTitle}>{title}</Text> : null}
// //       {description ? (
// //         <Text style={styles.mediaDescription}>{description}</Text>
// //       ) : null}
// //     </View>
// //   );
// // };

// // // ---------- Document Viewer (show link to open) ----------
// // const DocumentViewer = ({ url, title, description }) => {
// //   const { t } = useTranslation();
// //   const handleOpen = () => {
// //     if (url) {
// //       Linking.openURL(url).catch(() => {});
// //     }
// //   };
// //   return (
// //     <View style={styles.mediaWrapper}>
// //       <TouchableOpacity
// //         style={styles.documentCard}
// //         onPress={handleOpen}
// //         activeOpacity={0.8}
// //       >
// //         <View style={styles.documentIconBox}>
// //           <Ionicons name="document-text" size={ms(36)} color="#3B82F6" />
// //         </View>
// //         <View style={styles.documentInfo}>
// //           <Text style={styles.documentTitle} numberOfLines={2}>
// //             {title || t("levels.view_document", "View Document")}
// //           </Text>
// //           {description ? (
// //             <Text style={styles.documentDesc} numberOfLines={2}>
// //               {description}
// //             </Text>
// //           ) : null}
// //           <View style={styles.documentOpenBtn}>
// //             <Ionicons name="open-outline" size={ms(14)} color="#fff" />
// //             <Text style={styles.documentOpenBtnText}>
// //               {t("levels.open_document", "Open Document")}
// //             </Text>
// //           </View>
// //         </View>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // };

// // // ---------- External Link (YouTube / any URL) ----------
// // const ExternalLinkViewer = ({ url, title, description }) => {
// //   const { t } = useTranslation();
// //   const isYouTube =
// //     url && (url.includes("youtube.com") || url.includes("youtu.be"));
// //   const handleOpen = () => {
// //     if (url) Linking.openURL(url).catch(() => {});
// //   };
// //   return (
// //     <View style={styles.mediaWrapper}>
// //       <TouchableOpacity
// //         style={styles.externalCard}
// //         onPress={handleOpen}
// //         activeOpacity={0.8}
// //       >
// //         <View
// //           style={[
// //             styles.documentIconBox,
// //             { backgroundColor: isYouTube ? "#FEE2E2" : "#EFF6FF" },
// //           ]}
// //         >
// //           <Ionicons
// //             name={isYouTube ? "logo-youtube" : "link-outline"}
// //             size={ms(36)}
// //             color={isYouTube ? "#EF4444" : "#3B82F6"}
// //           />
// //         </View>
// //         <View style={styles.documentInfo}>
// //           <Text style={styles.documentTitle} numberOfLines={2}>
// //             {title ||
// //               (isYouTube
// //                 ? t("levels.watch_on_youtube", "Watch on YouTube")
// //                 : t("levels.open_external_link", "Open External Link"))}
// //           </Text>
// //           {description ? (
// //             <Text style={styles.documentDesc} numberOfLines={2}>
// //               {description}
// //             </Text>
// //           ) : null}
// //           <View
// //             style={[
// //               styles.documentOpenBtn,
// //               { backgroundColor: isYouTube ? "#EF4444" : "#3B82F6" },
// //             ]}
// //           >
// //             <Ionicons
// //               name={isYouTube ? "logo-youtube" : "open-outline"}
// //               size={ms(14)}
// //               color="#fff"
// //             />
// //             <Text style={styles.documentOpenBtnText}>
// //               {isYouTube
// //                 ? t("levels.watch_on_youtube", "Watch on YouTube")
// //                 : t("levels.open_link", "Open Link")}
// //             </Text>
// //           </View>
// //         </View>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // };

// // // ---------- Media Placeholder (black screen when no valid media) ----------
// // const MediaPlaceholder = ({ title, description }) => {
// //   const { t } = useTranslation();
// //   return (
// //     <View style={styles.mediaWrapper}>
// //       <View style={styles.mediaPlaceholderBox}>
// //         <Ionicons name="film-outline" size={ms(48)} color="#475569" />
// //         <Text style={styles.mediaPlaceholderText}>
// //           {title || t("common.media", "Media content")}
// //         </Text>
// //         {description ? (
// //           <Text style={styles.mediaPlaceholderDesc}>{description}</Text>
// //         ) : null}
// //         <Text style={styles.mediaPlaceholderHint}>
// //           {t("levels.media_not_available", "Media not available")}
// //         </Text>
// //       </View>
// //     </View>
// //   );
// // };

// // // ---------- Try Image Viewer (tries to load as image, shows placeholder on error) ----------
// // const TryImageViewer = ({ url, title, description }) => {
// //   const [imgError, setImgError] = useState(false);
// //   if (!url || imgError) {
// //     return <MediaPlaceholder title={title} description={description} />;
// //   }
// //   return (
// //     <View style={styles.mediaWrapper}>
// //       <Image
// //         source={{ uri: url }}
// //         style={styles.contentImage}
// //         resizeMode="contain"
// //         onError={() => setImgError(true)}
// //       />
// //       {title ? <Text style={styles.mediaTitle}>{title}</Text> : null}
// //       {description ? (
// //         <Text style={styles.mediaDescription}>{description}</Text>
// //       ) : null}
// //     </View>
// //   );
// // };

// // // ---------- H5P Embed ----------
// // const H5PViewer = ({ embedUrl, title, description }) => {
// //   const { t } = useTranslation();
// //   const handleOpen = () => {
// //     if (embedUrl) Linking.openURL(embedUrl).catch(() => {});
// //   };
// //   return (
// //     <View style={styles.mediaWrapper}>
// //       <TouchableOpacity
// //         style={styles.h5pCard}
// //         onPress={handleOpen}
// //         activeOpacity={0.8}
// //       >
// //         <View style={[styles.documentIconBox, { backgroundColor: "#FFF7ED" }]}>
// //           <Ionicons name="school-outline" size={ms(36)} color="#F97316" />
// //         </View>
// //         <View style={styles.documentInfo}>
// //           <Text style={styles.documentTitle} numberOfLines={2}>
// //             {title ||
// //               t("levels.interactive_content", "Interactive Content (H5P)")}
// //           </Text>
// //           {description ? (
// //             <Text style={styles.documentDesc} numberOfLines={2}>
// //               {description}
// //             </Text>
// //           ) : null}
// //           <View
// //             style={[styles.documentOpenBtn, { backgroundColor: "#F97316" }]}
// //           >
// //             <Ionicons name="play-circle-outline" size={ms(14)} color="#fff" />
// //             <Text style={styles.documentOpenBtnText}>
// //               {t("levels.open_interactive_content", "Open Interactive Content")}
// //             </Text>
// //           </View>
// //         </View>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // };

// // // ---------- Helper to format time (seconds to MM:SS) ----------
// // const formatTime = (secs) => {
// //   if (isNaN(secs) || secs === null || secs === undefined) return "0:00";
// //   const minutes = Math.floor(secs / 60);
// //   const seconds = Math.floor(secs % 60);
// //   return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
// // };

// // // ---------- Audio Player (using expo-video) ----------
// // const AudioPlayer = ({ url, title, description }) => {
// //   const player = useVideoPlayer(url, (p) => {});
// //   const [isPlaying, setIsPlaying] = useState(false);
// //   const [currentTime, setCurrentTime] = useState(0);
// //   const [duration, setDuration] = useState(0);

// //   useEffect(() => {
// //     if (!player) return;
// //     const interval = setInterval(() => {
// //       setIsPlaying(player.playing);
// //       setCurrentTime(player.currentTime || 0);
// //       setDuration(player.duration || 0);
// //     }, 250);
// //     return () => clearInterval(interval);
// //   }, [player]);

// //   const handlePlayPause = () => {
// //     if (isPlaying) {
// //       player.pause();
// //     } else {
// //       player.play();
// //     }
// //   };

// //   const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

// //   return (
// //     <View style={styles.audioWrapper}>
// //       <View style={styles.headphonesCircle}>
// //         <Ionicons name="headset" size={ms(32)} color="#10B981" />
// //       </View>
// //       <View style={styles.audioControllerPill}>
// //         <TouchableOpacity onPress={handlePlayPause} style={styles.audioPlayBtn}>
// //           <Ionicons
// //             name={isPlaying ? "pause" : "play"}
// //             size={ms(18)}
// //             color="#1E293B"
// //           />
// //         </TouchableOpacity>
// //         <Text style={styles.audioTimeText}>
// //           {formatTime(currentTime)} / {formatTime(duration)}
// //         </Text>
// //         <View style={styles.audioSliderTrack}>
// //           <View
// //             style={[styles.audioSliderFill, { width: `${progressPercent}%` }]}
// //           />
// //         </View>
// //         <View style={styles.volumeIconContainer}>
// //           <Ionicons
// //             name="volume-medium-outline"
// //             size={ms(16)}
// //             color="#64748B"
// //           />
// //         </View>
// //       </View>
// //       {title ? <Text style={styles.mediaTitle}>{title}</Text> : null}
// //       {description ? (
// //         <Text style={styles.mediaDescription}>{description}</Text>
// //       ) : null}
// //     </View>
// //   );
// // };

// // // ---------- Helper to resolve audio URLs ----------
// // const resolveAudioUrl = (url) => {
// //   if (!url) return null;
// //   if (typeof url !== "string") return null;
// //   let cleanUrl = url.trim();
// //   if (cleanUrl.startsWith("http")) {
// //     const backendUrl = "https://lms-backend.netswaptech.com";
// //     if (cleanUrl.includes("localhost") || cleanUrl.includes("127.0.0.1")) {
// //       cleanUrl = cleanUrl.replace(
// //         /http:\/\/(localhost|127.0.0.1)(:\d+)?/,
// //         backendUrl,
// //       );
// //     }
// //     return cleanUrl;
// //   }
// //   if (!cleanUrl.startsWith("/")) {
// //     cleanUrl = `/${cleanUrl}`;
// //   }
// //   return `https://lms-backend.netswaptech.com${cleanUrl}`;
// // };

// // // ---------- Header Audio Button (Speaker Icon) ----------
// // const HeaderAudioButton = ({ onPress, active }) => {
// //   return (
// //     <TouchableOpacity
// //       style={[styles.headerAudioBtn, active && styles.headerAudioBtnActive]}
// //       onPress={onPress}
// //       activeOpacity={0.7}
// //     >
// //       <Ionicons
// //         name={active ? "volume-high" : "volume-medium-outline"}
// //         size={ms(20)}
// //         color={active ? "#2563EB" : "#64748B"}
// //       />
// //     </TouchableOpacity>
// //   );
// // };

// // // ─────────────────────────────────────────────────────────────
// // // Render the correct content block based on API type
// // // ─────────────────────────────────────────────────────────────
// // const ContentBlock = ({ contentData }) => {
// //   const type = contentData?.type || "";
// //   const media = contentData?.media || null;
// //   const meta = contentData?.meta || null;

// //   const mediaType = media?.type || "";
// //   const mediaUrl = media?.full_url || media?.url || "";
// //   const externalUrl =
// //     media?.external_url || meta?.external_url || meta?.url || "";
// //   const embedUrl =
// //     meta?.embed_url ||
// //     meta?.url ||
// //     externalUrl ||
// //     media?.full_url ||
// //     media?.url ||
// //     "";

// //   if (
// //     type === "h5p" ||
// //     mediaType === "h5p" ||
// //     /\.(h5p)(\?|$)/i.test(mediaUrl) ||
// //     mediaUrl.includes("/h5p/")
// //   ) {
// //     return (
// //       <H5PViewer
// //         embedUrl={embedUrl}
// //         title={contentData.title || media?.title}
// //         description={contentData.description || media?.description}
// //       />
// //     );
// //   }

// //   if (
// //     mediaType === "audio" ||
// //     /\.(mp3|wav|aac|m4a|ogg)(\?|$)/i.test(mediaUrl) ||
// //     mediaUrl.includes("/audio/") ||
// //     type === "audio"
// //   ) {
// //     return (
// //       <AudioPlayer
// //         url={mediaUrl}
// //         title={contentData.title || media?.title}
// //         description={contentData.description || media?.description}
// //       />
// //     );
// //   }

// //   if ((type === "media" || type === "video") && media) {
// //     if (
// //       mediaUrl &&
// //       (mediaUrl.includes("youtube.com") ||
// //         mediaUrl.includes("youtu.be") ||
// //         mediaUrl.includes("vimeo.com"))
// //     ) {
// //       return (
// //         <ExternalLinkViewer
// //           url={mediaUrl}
// //           title={media.title}
// //           description={media.description}
// //         />
// //       );
// //     }

// //     if (
// //       mediaType === "image" ||
// //       (!mediaType && /\.(jpg|jpeg|png|gif|webp|svg)(\?|$)/i.test(mediaUrl))
// //     ) {
// //       return (
// //         <ImageViewer
// //           url={mediaUrl}
// //           title={media.title}
// //           description={media.description}
// //         />
// //       );
// //     }

// //     if (mediaType === "external" && (externalUrl || mediaUrl)) {
// //       const linkUrl = externalUrl || mediaUrl;
// //       if (
// //         linkUrl &&
// //         (linkUrl.includes("youtube.com") ||
// //           linkUrl.includes("youtu.be") ||
// //           linkUrl.includes("vimeo.com"))
// //       ) {
// //         return (
// //           <ExternalLinkViewer
// //             url={linkUrl}
// //             title={media.title}
// //             description={media.description}
// //           />
// //         );
// //       }
// //       return (
// //         <TryImageViewer
// //           url={linkUrl}
// //           title={media.title}
// //           description={media.description}
// //         />
// //       );
// //     }

// //     if (
// //       mediaType === "document" ||
// //       /\.(pdf|doc|docx|xls|xlsx|ppt|pptx)(\?|$)/i.test(mediaUrl)
// //     ) {
// //       return (
// //         <DocumentViewer
// //           url={mediaUrl || externalUrl}
// //           title={media.title}
// //           description={media.description}
// //         />
// //       );
// //     }

// //     if (
// //       mediaType === "video" ||
// //       /\.(mp4|mov|mkv|avi|webm|m3u8)(\?|$)/i.test(mediaUrl)
// //     ) {
// //       return (
// //         <View style={styles.videoWrapper}>
// //           <VideoPlayer url={mediaUrl} />
// //           {media.title ? (
// //             <Text style={styles.mediaTitle}>{media.title}</Text>
// //           ) : null}
// //           {media.description ? (
// //             <Text style={styles.mediaDescription}>{media.description}</Text>
// //           ) : null}
// //         </View>
// //       );
// //     }

// //     if (mediaUrl) {
// //       return (
// //         <TryImageViewer
// //           url={mediaUrl}
// //           title={media.title}
// //           description={media.description}
// //         />
// //       );
// //     }

// //     return (
// //       <MediaPlaceholder title={media.title} description={media.description} />
// //     );
// //   }

// //   if ((type === "media" || type === "video") && !media) {
// //     return (
// //       <MediaPlaceholder
// //         title={contentData?.title}
// //         description={contentData?.description}
// //       />
// //     );
// //   }

// //   if (type === "h5p") {
// //     return (
// //       <H5PViewer
// //         embedUrl={embedUrl}
// //         title={contentData.title}
// //         description={contentData.description}
// //       />
// //     );
// //   }

// //   if (type === "external" || type === "link") {
// //     const url = externalUrl || meta?.url || "";
// //     return (
// //       <ExternalLinkViewer
// //         url={url}
// //         title={contentData.title}
// //         description={contentData.description}
// //       />
// //     );
// //   }

// //   if (type === "document") {
// //     const url = mediaUrl || externalUrl || meta?.url || "";
// //     return (
// //       <DocumentViewer
// //         url={url}
// //         title={contentData.title}
// //         description={contentData.description}
// //       />
// //     );
// //   }

// //   return null;
// // };

// // // ─────────────────────────────────────────────────────────────
// // // Main Screen - OPTIMIZED TRANSLATION (Only visible chunks)
// // // ─────────────────────────────────────────────────────────────

// // export default function ContentViewerScreen() {
// //   const { t } = useTranslation();
// //   const insets = useSafeAreaInsets();
// //   const router = useRouter();
// //   const { topicId, contentId } = useLocalSearchParams();
// //   const dispatch = useDispatch();
// //   const { singlePreview, loading, error } = useSelector(
// //     (state) => state.course,
// //   );
// //   const [lastMarkedId, setLastMarkedId] = useState(null);
// //   const [loadedLang, setLoadedLang] = useState(i18n.language);

// //   // Chunk-based translation state - OPTIMIZED
// //   const [chunks, setChunks] = useState([]);
// //   const [chunksReady, setChunksReady] = useState(false); // NEW: Track if chunks are ready
// //   const [currentViewedIndex, setCurrentViewedIndex] = useState(0);

// //   // Refs for tracking
// //   const chunkLayouts = useRef({});
// //   const chunksRef = useRef([]);
// //   const isMounted = useRef(true);
// //   const abortControllerRef = useRef(null);
// //   const translationQueueRef = useRef(new Set());
// //   const isTranslatingChunkRef = useRef({});
// //   const hasInitialTranslationTriggered = useRef(false);

// //   useEffect(() => {
// //     chunksRef.current = chunks;
// //   }, [chunks]);

// //   useEffect(() => {
// //     isMounted.current = true;
// //     return () => {
// //       isMounted.current = false;
// //       if (abortControllerRef.current) {
// //         abortControllerRef.current.abort();
// //       }
// //     };
// //   }, []);

// //   // Fetch content when topicId/contentId changes
// //   useEffect(() => {
// //     if (topicId && contentId) {
// //       setLoadedLang(i18n.language);
// //       setChunksReady(false); // Reset chunks ready state
// //       setChunks([]); // Clear chunks
// //       hasInitialTranslationTriggered.current = false;
// //       chunkLayouts.current = {};
// //       translationQueueRef.current.clear();

// //       dispatch(fetchSinglePreview({ topicId, contentId, lang: i18n.language }))
// //         .unwrap()
// //         .then((res) => {
// //           const resPayload = res || {};
// //           const data = resPayload.data || resPayload;
// //           const current = data?.current || {};
// //           const isMedia =
// //             current.type === "media" ||
// //             current.type === "video" ||
// //             current.type === "h5p" ||
// //             current.type === "external" ||
// //             current.type === "link" ||
// //             current.type === "document";
// //           const hasNoContent =
// //             !current.content || current.content.trim() === "";

// //           if (
// //             (!data?.current || (hasNoContent && !isMedia)) &&
// //             i18n.language !== "en"
// //           ) {
// //             console.log(
// //               "No translated content or text found, falling back to English",
// //             );
// //             setLoadedLang("en");
// //             dispatch(fetchSinglePreview({ topicId, contentId, lang: "en" }));
// //           } else {
// //             setLoadedLang(i18n.language);
// //           }
// //         })
// //         .catch((err) => {
// //           console.log(
// //             "Error fetching single preview, trying English fallback:",
// //             err,
// //           );
// //           if (i18n.language !== "en") {
// //             setLoadedLang("en");
// //             dispatch(fetchSinglePreview({ topicId, contentId, lang: "en" }));
// //           }
// //         });
// //     }
// //   }, [dispatch, topicId, contentId, i18n.language]);

// //   const topicData = singlePreview?.topic || {};
// //   const contentData = singlePreview?.current || {};
// //   const navigation = singlePreview?.navigation || {};

// //   // Function to translate a single chunk
// //   const translateSingleChunk = async (index, originalHtml) => {
// //     if (!isMounted.current) return;
// //     if (isTranslatingChunkRef.current[index]) return;

// //     const chunk = chunksRef.current[index];
// //     if (!chunk || chunk.status === "done") return;

// //     // Mark as translating
// //     isTranslatingChunkRef.current[index] = true;

// //     setChunks((currentChunks) => {
// //       if (!currentChunks[index] || currentChunks[index].status !== "idle")
// //         return currentChunks;
// //       const updated = [...currentChunks];
// //       updated[index] = { ...updated[index], status: "translating" };
// //       return updated;
// //     });

// //     try {
// //       const translated = await translateHtmlChunk(
// //         originalHtml,
// //         i18n.language,
// //         abortControllerRef.current?.signal,
// //       );

// //       if (!isMounted.current) return;

// //       setChunks((currentChunks) => {
// //         if (!currentChunks[index]) return currentChunks;
// //         const updated = [...currentChunks];
// //         updated[index] = {
// //           ...updated[index],
// //           translatedHtml: translated,
// //           status: "done",
// //         };
// //         return updated;
// //       });
// //     } catch (err) {
// //       if (err.name === "AbortError") return;
// //       console.error(`Failed to translate chunk ${index}:`, err);
// //       if (!isMounted.current) return;

// //       setChunks((currentChunks) => {
// //         if (!currentChunks[index]) return currentChunks;
// //         const updated = [...currentChunks];
// //         updated[index] = { ...updated[index], status: "failed" };
// //         return updated;
// //       });
// //     } finally {
// //       isTranslatingChunkRef.current[index] = false;
// //     }
// //   };

// //   // Trigger translation for specific chunk (only if needed)
// //   const triggerTranslation = (index) => {
// //     if (index < 0 || index >= chunksRef.current.length) return;

// //     const chunk = chunksRef.current[index];
// //     if (
// //       chunk &&
// //       chunk.status === "idle" &&
// //       !translationQueueRef.current.has(index)
// //     ) {
// //       translationQueueRef.current.add(index);

// //       // Small delay to avoid overwhelming
// //       setTimeout(() => {
// //         if (translationQueueRef.current.has(index)) {
// //           translationQueueRef.current.delete(index);
// //           translateSingleChunk(index, chunk.originalHtml);
// //         }
// //       }, 50);
// //     }
// //   };

// //   // Handle scroll and trigger translation for visible chunks
// //   const handleScroll = (event) => {
// //     if (!chunksReady || chunks.length === 0) return;

// //     const { contentOffset } = event.nativeEvent;
// //     const scrollY = contentOffset.y;

// //     let visibleIndex = 0;
// //     Object.keys(chunkLayouts.current).forEach((key) => {
// //       const index = Number(key);
// //       if (chunkLayouts.current[index] <= scrollY + 500) {
// //         visibleIndex = index;
// //       }
// //     });

// //     if (visibleIndex !== currentViewedIndex) {
// //       setCurrentViewedIndex(visibleIndex);

// //       // Translate current and next chunk
// //       triggerTranslation(visibleIndex);
// //       triggerTranslation(visibleIndex + 1);
// //     }
// //   };

// //   const handleChunkLayout = (index, y) => {
// //     chunkLayouts.current[index] = y;
// //   };

// //   // CRITICAL FIX: Setup chunks only when content changes AND language is not English
// //   useEffect(() => {
// //     let active = true;

// //     const setupChunks = async () => {
// //       if (abortControllerRef.current) {
// //         abortControllerRef.current.abort();
// //       }
// //       abortControllerRef.current = new AbortController();

// //       const originalContent = contentData.content || "";

// //       // If no content, nothing to translate
// //       if (!originalContent) {
// //         if (active) {
// //           setChunks([]);
// //           setChunksReady(true);
// //         }
// //         return;
// //       }

// //       // If English, no translation needed - show original content
// //       if (i18n.language === "en") {
// //         if (active) {
// //           setChunks([]);
// //           setChunksReady(true);
// //         }
// //         return;
// //       }

// //       // For non-English languages, prepare chunks
// //       try {
// //         const elements = splitHtmlIntoElements(originalContent);
// //         const chunkStrings = groupElementsIntoChunks(elements, 800, 1500);

// //         const initialChunks = chunkStrings.map((html, idx) => ({
// //           id: idx,
// //           originalHtml: html,
// //           translatedHtml: "",
// //           status: "idle",
// //         }));

// //         if (active) {
// //           setChunks(initialChunks);
// //           setChunksReady(true); // Chunks are ready (even though not translated yet)
// //           setCurrentViewedIndex(0);
// //           chunkLayouts.current = {};
// //           translationQueueRef.current.clear();
// //           isTranslatingChunkRef.current = {};
// //           hasInitialTranslationTriggered.current = false;
// //         }
// //       } catch (err) {
// //         console.error("Failed to prepare chunks:", err);
// //         if (active) {
// //           setChunks([]);
// //           setChunksReady(true); // Still mark ready to show fallback
// //         }
// //       }
// //     };

// //     setupChunks();

// //     return () => {
// //       active = false;
// //     };
// //   }, [contentData.content, i18n.language]);

// //   // CRITICAL FIX: Only trigger first chunk translation after chunks are ready AND on mount
// //   useEffect(() => {
// //     if (
// //       chunksReady &&
// //       chunks.length > 0 &&
// //       !hasInitialTranslationTriggered.current
// //     ) {
// //       hasInitialTranslationTriggered.current = true;
// //       // Small delay to ensure everything is ready
// //       setTimeout(() => {
// //         triggerTranslation(0);
// //         triggerTranslation(1); // Pre-fetch next chunk too
// //       }, 100);
// //     }
// //   }, [chunksReady, chunks.length]);

// //   const type = contentData.type || "";
// //   const isMediaType = type === "media" || type === "video";
// //   const prevId = navigation.previous_content_id || null;
// //   const nextId = navigation.next_content_id || null;

// //   const isRead =
// //     contentData.is_read == 1 ||
// //     contentData.is_read == true ||
// //     contentData.is_read == "true";

// //   // Auto mark as read
// //   useEffect(() => {
// //     if (contentId && singlePreview && !isRead && lastMarkedId !== contentId) {
// //       setLastMarkedId(contentId);
// //       dispatch(toggleTopicContentRead(Number(contentId)));
// //     }
// //   }, [contentId, isRead, singlePreview]);

// //   const rawAudioUrl =
// //     contentData?.audio_content ||
// //     contentData?.audio ||
// //     (contentData?.media?.type === "audio"
// //       ? contentData?.media?.full_url || contentData?.media?.url
// //       : null) ||
// //     topicData?.audio_content ||
// //     singlePreview?.audio_content;
// //   const audioUrl = resolveAudioUrl(rawAudioUrl);

// //   const [showFloatingPlayer, setShowFloatingPlayer] = useState(false);
// //   const headerPlayer = useVideoPlayer(audioUrl || "", (p) => {
// //     p.loop = false;
// //   });
// //   const [headerIsPlaying, setHeaderIsPlaying] = useState(false);
// //   const [headerCurrentTime, setHeaderCurrentTime] = useState(0);
// //   const [headerDuration, setHeaderDuration] = useState(0);

// //   useEffect(() => {
// //     setShowFloatingPlayer(false);
// //   }, [audioUrl]);

// //   useEffect(() => {
// //     if (!headerPlayer || !audioUrl) return;
// //     const interval = setInterval(() => {
// //       setHeaderIsPlaying(headerPlayer.playing);
// //       setHeaderCurrentTime(headerPlayer.currentTime || 0);
// //       setHeaderDuration(headerPlayer.duration || 0);
// //     }, 250);
// //     return () => {
// //       clearInterval(interval);
// //       try {
// //         headerPlayer.pause();
// //       } catch (e) {}
// //     };
// //   }, [headerPlayer, audioUrl]);

// //   const handleHeaderPlayPause = () => {
// //     if (!headerPlayer) return;
// //     if (headerIsPlaying) headerPlayer.pause();
// //     else headerPlayer.play();
// //   };

// //   // Loading state
// //   if (loading.singlePreview) {
// //     return (
// //       <View style={[styles.container, styles.loaderContainer]}>
// //         <ActivityIndicator size="large" color="#1E3A8A" />
// //       </View>
// //     );
// //   }

// //   const hasError = !loading.singlePreview && !singlePreview?.current;

// //   if (hasError) {
// //     return (
// //       <View style={[styles.container, { paddingTop: insets.top }]}>
// //         <View style={styles.header}>
// //           <TouchableOpacity
// //             style={styles.breadcrumbLink}
// //             onPress={() => router.back()}
// //           >
// //             <Ionicons name="chevron-back" size={ms(16)} color="#64748B" />
// //             <Text style={styles.breadcrumbText}>
// //               {t("common.go_back", "Back")}
// //             </Text>
// //           </TouchableOpacity>
// //         </View>
// //         <View style={styles.errorContainer}>
// //           <View style={styles.errorIconBox}>
// //             <Ionicons
// //               name="alert-circle-outline"
// //               size={ms(60)}
// //               color="#EF4444"
// //             />
// //           </View>
// //           <Text style={styles.errorTitle}>
// //             {t("common.error_loading", "Error Loading Content")}
// //           </Text>
// //           <Text style={styles.errorSubtitle}>
// //             {error ||
// //               t(
// //                 "common.slow_connection",
// //                 "The request timed out or the server took too long to respond. Please try again.",
// //               )}
// //           </Text>
// //           <TouchableOpacity
// //             style={styles.retryButton}
// //             onPress={() =>
// //               dispatch(
// //                 fetchSinglePreview({ topicId, contentId, lang: loadedLang }),
// //               )
// //             }
// //             activeOpacity={0.8}
// //           >
// //             <Text style={styles.retryButtonText}>
// //               {t("common.retry", "Retry")}
// //             </Text>
// //           </TouchableOpacity>
// //         </View>
// //       </View>
// //     );
// //   }

// //   const getBadgeInfo = () => {
// //     if (type === "h5p")
// //       return { icon: "school-outline", label: "INTERACTIVE", color: "#F97316" };
// //     if (type === "document")
// //       return { icon: "document-text", label: "DOCUMENT", color: "#8B5CF6" };
// //     if (type === "external" || type === "link")
// //       return { icon: "link-outline", label: "EXTERNAL LINK", color: "#EF4444" };
// //     if (type === "media") {
// //       const mediaType = contentData?.media?.type || "";
// //       if (mediaType === "image")
// //         return { icon: "image-outline", label: "IMAGE", color: "#10B981" };
// //       if (mediaType === "document")
// //         return { icon: "document-text", label: "DOCUMENT", color: "#8B5CF6" };
// //       if (mediaType === "external")
// //         return {
// //           icon: "link-outline",
// //           label: "EXTERNAL LINK",
// //           color: "#EF4444",
// //         };
// //       if (mediaType === "video")
// //         return { icon: "videocam", label: "VIDEO", color: "#3B82F6" };
// //       return { icon: "videocam", label: "MEDIA MATERIAL", color: "#3B82F6" };
// //     }
// //     return { icon: "book", label: "READING MATERIAL", color: "#3B82F6" };
// //   };

// //   const badge = getBadgeInfo();

// //   const handlePrev = () => {
// //     if (prevId) {
// //       router.replace({
// //         pathname: "/(tabs)/levels/content-viewer",
// //         params: { topicId, contentId: prevId },
// //       });
// //     }
// //   };

// //   const handleNext = () => {
// //     if (nextId) {
// //       router.replace({
// //         pathname: "/(tabs)/levels/content-viewer",
// //         params: { topicId, contentId: nextId },
// //       });
// //     }
// //   };

// //   // ========== RENDER ==========
// //   return (
// //     <View style={[styles.container, { paddingTop: insets.top }]}>
// //       <View style={styles.header}>
// //         <TouchableOpacity
// //           style={styles.breadcrumbLink}
// //           onPress={() => router.back()}
// //         >
// //           <Ionicons name="chevron-back" size={ms(16)} color="#64748B" />
// //           <Text style={styles.breadcrumbText}>
// //             {t("common.go_back", "Back")}
// //           </Text>
// //         </TouchableOpacity>
// //         <Text style={styles.breadcrumbSeparator}>/</Text>
// //         <TouchableOpacity
// //           onPress={() => {
// //             router.push({
// //               pathname: "/(tabs)/levels/topic-details",
// //               params: { id: topicId },
// //             });
// //           }}
// //           activeOpacity={0.7}
// //         >
// //           <Text style={styles.breadcrumbText} numberOfLines={1}>
// //             {topicData.title || `Topic ${topicId}`}
// //           </Text>
// //         </TouchableOpacity>
// //         <Text style={styles.breadcrumbSeparator}>/</Text>
// //         <Text
// //           style={[styles.breadcrumbText, styles.breadcrumbActive]}
// //           numberOfLines={1}
// //         >
// //           {contentData.title || "..."}
// //         </Text>
// //         {audioUrl ? (
// //           <HeaderAudioButton
// //             onPress={() => setShowFloatingPlayer(!showFloatingPlayer)}
// //             active={showFloatingPlayer}
// //           />
// //         ) : null}
// //       </View>

// //       {showFloatingPlayer && audioUrl && (
// //         <View style={styles.floatingPlayerContainer}>
// //           <View style={styles.audioControllerPill}>
// //             <TouchableOpacity
// //               onPress={handleHeaderPlayPause}
// //               style={styles.audioPlayBtn}
// //             >
// //               <Ionicons
// //                 name={headerIsPlaying ? "pause" : "play"}
// //                 size={ms(18)}
// //                 color="#1E293B"
// //               />
// //             </TouchableOpacity>
// //             <Text style={styles.audioTimeText}>
// //               {formatTime(headerCurrentTime)} / {formatTime(headerDuration)}
// //             </Text>
// //             <View style={styles.audioSliderTrack}>
// //               <View
// //                 style={[
// //                   styles.audioSliderFill,
// //                   {
// //                     width: `${headerDuration > 0 ? (headerCurrentTime / headerDuration) * 100 : 0}%`,
// //                   },
// //                 ]}
// //               />
// //             </View>
// //             <View style={styles.volumeIconContainer}>
// //               <Ionicons
// //                 name="volume-medium-outline"
// //                 size={ms(16)}
// //                 color="#64748B"
// //               />
// //             </View>
// //           </View>
// //         </View>
// //       )}

// //       <ScrollView
// //         contentContainerStyle={[
// //           styles.scrollContent,
// //           { paddingBottom: insets.bottom + hp(30) },
// //         ]}
// //         showsVerticalScrollIndicator={false}
// //         scrollEventThrottle={128}
// //         onScroll={handleScroll}
// //       >
// //         <View style={styles.badgeRow}>
// //           <View
// //             style={[
// //               styles.typeBadge,
// //               {
// //                 borderColor: badge.color + "40",
// //                 backgroundColor: badge.color + "15",
// //               },
// //             ]}
// //           >
// //             <Ionicons name={badge.icon} size={ms(14)} color={badge.color} />
// //             <Text style={[styles.typeBadgeText, { color: badge.color }]}>
// //               {badge.label}
// //             </Text>
// //           </View>
// //           {isRead ? (
// //             <View style={styles.readBadge}>
// //               <Ionicons name="checkmark-circle" size={ms(14)} color="#10B981" />
// //               <Text style={styles.readBadgeText}>
// //                 {t("levels.read", "Read")}
// //               </Text>
// //             </View>
// //           ) : (
// //             <View style={styles.unreadBadge}>
// //               <Ionicons name="ellipse-outline" size={ms(14)} color="#94A3B8" />
// //               <Text style={styles.unreadBadgeText}>
// //                 {t("levels.unread", "Unread")}
// //               </Text>
// //             </View>
// //           )}
// //         </View>

// //         <Text style={styles.title}>
// //           {contentData.title?.replace(
// //             /^(?:(?:Module|Chapter|Topic)\s*)?[\d\.]+\s*[-:]?\s*/i,
// //             "",
// //           ) || "Untitled"}
// //         </Text>

// //         <View style={styles.contentBox}>
// //           <ContentBlock contentData={contentData} />

// //           {isMediaType && contentData?.media && contentData?.content && (
// //             <View style={styles.contentDivider} />
// //           )}

// //           {/* CRITICAL FIX: Content rendering logic */}
// //           {(() => {
// //             // English language - show original directly
// //             if (i18n.language === "en") {
// //               return contentData.content ? (
// //                 <HtmlRenderer html={contentData.content} />
// //               ) : !isMediaType &&
// //                 type !== "h5p" &&
// //                 type !== "external" &&
// //                 type !== "link" &&
// //                 type !== "document" ? (
// //                 <Text style={styles.emptyContent}>
// //                   {t("levels.no_content", "No content available.")}
// //                 </Text>
// //               ) : null;
// //             }

// //             // Non-English with chunks ready
// //             if (chunksReady) {
// //               if (chunks.length > 0) {
// //                 return (
// //                   <View>
// //                     {chunks.map((chunk, index) => (
// //                       <View
// //                         key={chunk.id}
// //                         style={styles.chunkWrapper}
// //                         onLayout={(e) =>
// //                           handleChunkLayout(index, e.nativeEvent.layout.y)
// //                         }
// //                       >
// //                         <HtmlRenderer
// //                           html={chunk.translatedHtml || chunk.originalHtml}
// //                         />
// //                         {chunk.status === "translating" && (
// //                           <View style={styles.chunkTranslatingIndicator}>
// //                             <ActivityIndicator size="small" color="#2563EB" />
// //                             <Text style={styles.chunkTranslatingText}>
// //                               Translating...
// //                             </Text>
// //                           </View>
// //                         )}
// //                       </View>
// //                     ))}
// //                   </View>
// //                 );
// //               } else {
// //                 // No chunks - show original or empty message
// //                 return contentData.content ? (
// //                   <HtmlRenderer html={contentData.content} />
// //                 ) : !isMediaType &&
// //                   type !== "h5p" &&
// //                   type !== "external" &&
// //                   type !== "link" &&
// //                   type !== "document" ? (
// //                   <Text style={styles.emptyContent}>
// //                     {t("levels.no_content", "No content available.")}
// //                   </Text>
// //                 ) : null;
// //               }
// //             }

// //             // Chunks not ready yet - show loading indicator (NOT translating all content)
// //             return (
// //               <View style={styles.translationLoadingContainer}>
// //                 <ActivityIndicator size="small" color="#2563EB" />
// //                 <Text style={styles.translationLoadingText}>
// //                   {i18n.language === "hi"
// //                     ? "सामग्री तैयार की जा रही है..."
// //                     : i18n.language === "pa"
// //                       ? "ਸਮੱਗਰੀ ਤਿਆਰ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ..."
// //                       : "Preparing content..."}
// //                 </Text>
// //               </View>
// //             );
// //           })()}
// //         </View>

// //         {!isRead && (
// //           <View style={styles.markingReadIndicator}>
// //             <ActivityIndicator size="small" color="#10B981" />
// //             <Text style={styles.markingReadText}>
// //               {t("levels.marking_progress", "Marking progress...")}
// //             </Text>
// //           </View>
// //         )}

// //         <View style={styles.navFooter}>
// //           <TouchableOpacity
// //             style={[
// //               styles.navBtn,
// //               styles.navBtnPrev,
// //               !prevId && styles.navBtnDisabled,
// //             ]}
// //             onPress={handlePrev}
// //             disabled={!prevId}
// //           >
// //             <Ionicons
// //               name="arrow-back"
// //               size={ms(18)}
// //               color={prevId ? "#64748B" : "#CBD5E1"}
// //             />
// //             <Text style={[styles.navBtnValue, !prevId && { color: "#CBD5E1" }]}>
// //               {t("exam.previous", "Previous")}
// //             </Text>
// //           </TouchableOpacity>
// //           <Text style={styles.navCenterText}>
// //             {nextId
// //               ? t("levels.next_lesson", "Next lesson") + " →"
// //               : t("levels.last_lesson", "Last lesson")}
// //           </Text>
// //           <TouchableOpacity
// //             style={[
// //               styles.navBtn,
// //               styles.navBtnNext,
// //               !nextId && styles.navBtnDisabledNext,
// //             ]}
// //             onPress={handleNext}
// //             disabled={!nextId}
// //           >
// //             <Text
// //               style={[styles.navBtnValueNext, !nextId && { color: "#BFDBFE" }]}
// //             >
// //               {t("exam.next", "Next")}
// //             </Text>
// //             <Ionicons
// //               name="arrow-forward"
// //               size={ms(18)}
// //               color={nextId ? "#FFFFFF" : "#BFDBFE"}
// //             />
// //           </TouchableOpacity>
// //         </View>
// //       </ScrollView>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: "#F8FAFC" },
// //   loaderContainer: { justifyContent: "center", alignItems: "center" },
// //   header: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     paddingHorizontal: wp(16),
// //     paddingVertical: hp(12),
// //     borderBottomWidth: 1,
// //     borderBottomColor: "#E2E8F0",
// //     backgroundColor: "#fff",
// //   },
// //   breadcrumbLink: { flexDirection: "row", alignItems: "center" },
// //   breadcrumbText: {
// //     fontSize: fs(12),
// //     color: "#64748B",
// //     fontWeight: "600",
// //     marginLeft: wp(2),
// //     maxWidth: wp(90),
// //   },
// //   breadcrumbSeparator: {
// //     fontSize: fs(12),
// //     color: "#CBD5E1",
// //     marginHorizontal: wp(6),
// //   },
// //   breadcrumbActive: { color: "#1E293B", flex: 1 },
// //   scrollContent: { padding: wp(12), paddingTop: hp(10) },
// //   badgeRow: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     marginBottom: hp(12),
// //     gap: wp(8),
// //     flexWrap: "wrap",
// //   },
// //   typeBadge: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     borderWidth: 1,
// //     borderRadius: ms(8),
// //     paddingHorizontal: wp(10),
// //     paddingVertical: hp(6),
// //   },
// //   typeBadgeText: {
// //     fontSize: fs(10),
// //     fontWeight: "700",
// //     marginLeft: wp(6),
// //     letterSpacing: 0.4,
// //   },
// //   readBadge: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     backgroundColor: "#D1FAE5",
// //     borderRadius: ms(8),
// //     paddingHorizontal: wp(10),
// //     paddingVertical: hp(6),
// //   },
// //   readBadgeText: {
// //     fontSize: fs(10),
// //     color: "#10B981",
// //     fontWeight: "700",
// //     marginLeft: wp(5),
// //     letterSpacing: 0.4,
// //   },
// //   unreadBadge: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     backgroundColor: "#F1F5F9",
// //     borderRadius: ms(8),
// //     paddingHorizontal: wp(10),
// //     paddingVertical: hp(6),
// //   },
// //   unreadBadgeText: {
// //     fontSize: fs(10),
// //     color: "#94A3B8",
// //     fontWeight: "700",
// //     marginLeft: wp(5),
// //     letterSpacing: 0.4,
// //   },
// //   title: {
// //     fontSize: fs(24),
// //     fontWeight: "800",
// //     color: "#0F172A",
// //     marginBottom: hp(4),
// //     lineHeight: fs(32),
// //   },
// //   contentBox: {
// //     backgroundColor: "#FFFFFF",
// //     borderRadius: ms(16),
// //     borderWidth: 1,
// //     borderColor: "#E2E8F0",
// //     padding: ms(12),
// //     marginBottom: hp(20),
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.05,
// //     shadowRadius: 8,
// //     elevation: 3,
// //   },
// //   emptyContent: {
// //     fontSize: fs(14),
// //     color: "#94A3B8",
// //     textAlign: "center",
// //     paddingVertical: hp(40),
// //   },
// //   mediaWrapper: {
// //     width: "100%",
// //     borderRadius: ms(12),
// //     overflow: "hidden",
// //     marginBottom: hp(8),
// //   },
// //   contentImage: {
// //     width: "100%",
// //     height: hp(250),
// //     borderRadius: ms(12),
// //     backgroundColor: "#F1F5F9",
// //   },
// //   videoWrapper: { width: "100%", borderRadius: ms(12), overflow: "hidden" },
// //   videoPlayer: {
// //     width: "100%",
// //     height: hp(220),
// //     backgroundColor: "#000",
// //     borderRadius: ms(12),
// //   },
// //   mediaTitle: {
// //     fontSize: fs(16),
// //     fontWeight: "700",
// //     color: "#1E293B",
// //     marginTop: hp(12),
// //   },
// //   mediaDescription: {
// //     fontSize: fs(13),
// //     color: "#64748B",
// //     marginTop: hp(4),
// //     lineHeight: fs(18),
// //   },
// //   mediaErrorBox: {
// //     width: "100%",
// //     height: hp(180),
// //     backgroundColor: "#F1F5F9",
// //     borderRadius: ms(12),
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   mediaErrorText: { marginTop: hp(10), fontSize: fs(13), color: "#94A3B8" },
// //   mediaPlaceholderBox: {
// //     width: "100%",
// //     height: hp(220),
// //     backgroundColor: "#0F172A",
// //     borderRadius: ms(12),
// //     justifyContent: "center",
// //     alignItems: "center",
// //     paddingHorizontal: wp(20),
// //   },
// //   mediaPlaceholderText: {
// //     marginTop: hp(12),
// //     fontSize: fs(15),
// //     color: "#94A3B8",
// //     fontWeight: "600",
// //     textAlign: "center",
// //   },
// //   mediaPlaceholderDesc: {
// //     marginTop: hp(4),
// //     fontSize: fs(12),
// //     color: "#64748B",
// //     textAlign: "center",
// //   },
// //   mediaPlaceholderHint: {
// //     marginTop: hp(12),
// //     fontSize: fs(11),
// //     color: "#475569",
// //     fontWeight: "500",
// //   },
// //   documentCard: {
// //     flexDirection: "row",
// //     backgroundColor: "#EFF6FF",
// //     borderRadius: ms(12),
// //     padding: ms(16),
// //     borderWidth: 1,
// //     borderColor: "#BFDBFE",
// //     alignItems: "center",
// //   },
// //   externalCard: {
// //     flexDirection: "row",
// //     backgroundColor: "#FFF7ED",
// //     borderRadius: ms(12),
// //     padding: ms(16),
// //     borderWidth: 1,
// //     borderColor: "#FED7AA",
// //     alignItems: "center",
// //   },
// //   h5pCard: {
// //     flexDirection: "row",
// //     backgroundColor: "#FFF7ED",
// //     borderRadius: ms(12),
// //     padding: ms(16),
// //     borderWidth: 1,
// //     borderColor: "#FED7AA",
// //     alignItems: "center",
// //   },
// //   documentIconBox: {
// //     width: ms(64),
// //     height: ms(64),
// //     borderRadius: ms(12),
// //     backgroundColor: "#DBEAFE",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     marginRight: wp(16),
// //   },
// //   documentInfo: { flex: 1 },
// //   documentTitle: {
// //     fontSize: fs(15),
// //     fontWeight: "700",
// //     color: "#1E293B",
// //     marginBottom: hp(4),
// //   },
// //   documentDesc: {
// //     fontSize: fs(12),
// //     color: "#64748B",
// //     marginBottom: hp(10),
// //     lineHeight: fs(17),
// //   },
// //   documentOpenBtn: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     backgroundColor: "#3B82F6",
// //     paddingHorizontal: wp(12),
// //     paddingVertical: hp(8),
// //     borderRadius: ms(8),
// //     alignSelf: "flex-start",
// //     gap: wp(6),
// //   },
// //   documentOpenBtnText: { fontSize: fs(12), color: "#fff", fontWeight: "700" },
// //   contentDivider: {
// //     height: 1,
// //     backgroundColor: "#E2E8F0",
// //     marginVertical: hp(16),
// //     width: "100%",
// //   },
// //   markingReadIndicator: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     backgroundColor: "#F0FDF4",
// //     borderRadius: ms(12),
// //     paddingVertical: hp(12),
// //     marginBottom: hp(25),
// //     borderWidth: 1,
// //     borderColor: "#D1FAE5",
// //   },
// //   markingReadText: {
// //     fontSize: fs(13),
// //     color: "#10B981",
// //     fontWeight: "600",
// //     marginLeft: wp(8),
// //   },
// //   navFooter: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //     paddingTop: hp(20),
// //     borderTopWidth: 1,
// //     borderTopColor: "#E2E8F0",
// //     marginTop: hp(10),
// //   },
// //   navBtn: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     paddingHorizontal: wp(12),
// //     paddingVertical: hp(12),
// //     borderRadius: ms(10),
// //     flex: 1,
// //     maxWidth: wp(140),
// //   },
// //   navBtnDisabled: {
// //     backgroundColor: "#F8FAFC",
// //     borderWidth: 1,
// //     borderColor: "#E2E8F0",
// //   },
// //   navBtnPrev: {
// //     backgroundColor: "#FFFFFF",
// //     borderWidth: 1.5,
// //     borderColor: "#E2E8F0",
// //     justifyContent: "center",
// //   },
// //   navBtnValue: {
// //     fontSize: fs(13),
// //     color: "#475569",
// //     fontWeight: "700",
// //     marginLeft: wp(8),
// //   },
// //   navCenterText: {
// //     fontSize: fs(10),
// //     color: "#94A3B8",
// //     fontWeight: "600",
// //     flex: 1,
// //     textAlign: "center",
// //     textTransform: "uppercase",
// //     letterSpacing: 0.5,
// //   },
// //   navBtnNext: {
// //     backgroundColor: "#2563EB",
// //     justifyContent: "center",
// //     shadowColor: "#2563EB",
// //     shadowOffset: { width: 0, height: 3 },
// //     shadowOpacity: 0.2,
// //     shadowRadius: 6,
// //     elevation: 4,
// //   },
// //   navBtnDisabledNext: { backgroundColor: "#94A3B8", opacity: 0.5 },
// //   navBtnValueNext: {
// //     fontSize: fs(13),
// //     color: "#FFFFFF",
// //     fontWeight: "700",
// //     marginRight: wp(8),
// //   },
// //   audioWrapper: {
// //     width: "100%",
// //     alignItems: "center",
// //     paddingVertical: hp(15),
// //     backgroundColor: "#FFFFFF",
// //     borderRadius: ms(12),
// //   },
// //   headphonesCircle: {
// //     width: ms(80),
// //     height: ms(80),
// //     borderRadius: ms(40),
// //     backgroundColor: "#D1FAE5",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     marginBottom: hp(16),
// //   },
// //   audioControllerPill: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     backgroundColor: "#F1F5F9",
// //     borderRadius: ms(24),
// //     paddingHorizontal: wp(16),
// //     paddingVertical: hp(10),
// //     width: "90%",
// //     maxWidth: wp(340),
// //   },
// //   audioPlayBtn: { marginRight: wp(10) },
// //   audioTimeText: {
// //     fontSize: fs(11),
// //     color: "#64748B",
// //     marginRight: wp(10),
// //     fontWeight: "600",
// //   },
// //   audioSliderTrack: {
// //     flex: 1,
// //     height: hp(4),
// //     backgroundColor: "#CBD5E1",
// //     borderRadius: hp(2),
// //     overflow: "hidden",
// //     marginRight: wp(10),
// //   },
// //   audioSliderFill: {
// //     height: "100%",
// //     backgroundColor: "#475569",
// //     borderRadius: hp(2),
// //   },
// //   volumeIconContainer: { justifyContent: "center", alignItems: "center" },
// //   headerAudioBtn: {
// //     width: ms(36),
// //     height: ms(36),
// //     borderRadius: ms(18),
// //     backgroundColor: "#F1F5F9",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     marginLeft: wp(8),
// //     borderWidth: 1,
// //     borderColor: "#E2E8F0",
// //   },
// //   headerAudioBtnActive: { backgroundColor: "#EFF6FF", borderColor: "#3B82F6" },
// //   floatingPlayerContainer: {
// //     width: "100%",
// //     alignItems: "center",
// //     paddingVertical: hp(8),
// //     backgroundColor: "#FFFFFF",
// //     borderBottomWidth: 1,
// //     borderBottomColor: "#E2E8F0",
// //   },
// //   errorContainer: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     paddingHorizontal: wp(30),
// //     backgroundColor: "#F8FAFC",
// //   },
// //   errorIconBox: {
// //     width: ms(80),
// //     height: ms(80),
// //     borderRadius: ms(40),
// //     backgroundColor: "#FEF2F2",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     marginBottom: hp(15),
// //   },
// //   errorTitle: {
// //     fontSize: fs(18),
// //     fontWeight: "800",
// //     color: "#1E293B",
// //     marginBottom: hp(8),
// //     textAlign: "center",
// //   },
// //   errorSubtitle: {
// //     fontSize: fs(13),
// //     color: "#64748B",
// //     textAlign: "center",
// //     lineHeight: fs(18),
// //     marginBottom: hp(24),
// //   },
// //   retryButton: {
// //     backgroundColor: "#3B82F6",
// //     paddingHorizontal: wp(30),
// //     paddingVertical: hp(12),
// //     borderRadius: ms(10),
// //     shadowColor: "#3B82F6",
// //     shadowOffset: { width: 0, height: 4 },
// //     shadowOpacity: 0.2,
// //     shadowRadius: 6,
// //     elevation: 3,
// //   },
// //   retryButtonText: { color: "#FFFFFF", fontSize: fs(14), fontWeight: "700" },
// //   translationLoadingContainer: {
// //     paddingVertical: hp(30),
// //     alignItems: "center",
// //     justifyContent: "center",
// //     backgroundColor: "#F8FAFC",
// //     borderRadius: ms(12),
// //     borderWidth: 1,
// //     borderColor: "#E2E8F0",
// //     borderStyle: "dashed",
// //     marginVertical: hp(10),
// //   },
// //   translationLoadingText: {
// //     marginTop: hp(10),
// //     fontSize: fs(13),
// //     color: "#64748B",
// //     fontWeight: "600",
// //   },
// //   chunkWrapper: { position: "relative", marginBottom: hp(10) },
// //   chunkTranslatingIndicator: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     paddingVertical: hp(8),
// //     backgroundColor: "#F8FAFC",
// //     borderRadius: ms(8),
// //     borderWidth: 1,
// //     borderColor: "#E2E8F0",
// //     marginTop: hp(6),
// //     gap: wp(8),
// //   },
// //   chunkTranslatingText: {
// //     fontSize: fs(12),
// //     color: "#64748B",
// //     fontWeight: "600",
// //   },
// // });

// import React, { useEffect, useState, useRef } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   ActivityIndicator,
//   Image,
//   Linking,
//   useWindowDimensions,
// } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter, useLocalSearchParams } from "expo-router";
// import { useDispatch, useSelector } from "react-redux";
// import { useVideoPlayer, VideoView } from "expo-video";
// import { useTranslation } from "react-i18next";
// import { wp, hp, ms, fs } from "../../../utils/responsive";
// import {
//   fetchSinglePreview,
//   toggleTopicContentRead,
// } from "../../../redux/slices/courseSlice";
// import { formatImageUrl } from "../../../utils/imageUtils";
// import HtmlContent from "../../../components/HtmlContent";
// import i18n from "../../../i18n";

// const HtmlRenderer = ({ html }) => {
//   const { width } = useWindowDimensions();
//   const availableWidth = width - wp(24) - ms(12) * 2;
//   return <HtmlContent html={html} containerWidth={availableWidth} />;
// };

// // Split HTML into elements (keeping tags)
// const splitHtmlIntoElements = (html) => {
//   if (!html) return [];
//   return html.split(/(<[^>]+>)/g).filter(Boolean);
// };

// // Group elements into chunks with proper limits
// const groupElementsIntoChunks = (
//   elements,
//   firstChunkLimit = 500,
//   remainingChunkLimit = 1200,
// ) => {
//   const chunks = [];
//   let currentChunk = "";
//   let currentLimit = firstChunkLimit;

//   elements.forEach((element) => {
//     const currentLength = currentChunk.replace(/<[^>]+>/g, "").length;
//     const elementLength = element.replace(/<[^>]+>/g, "").length;

//     if (currentLength + elementLength > currentLimit) {
//       if (currentChunk.trim()) {
//         chunks.push(currentChunk);
//       }
//       currentChunk = element;
//       currentLimit = remainingChunkLimit;
//     } else {
//       currentChunk += element;
//     }
//   });

//   if (currentChunk.trim()) {
//     chunks.push(currentChunk);
//   }

//   return chunks;
// };

// // ---------- Video Player ----------
// const VideoPlayer = ({ url }) => {
//   const player = useVideoPlayer(url, (p) => {
//     p.play();
//   });
//   return (
//     <VideoView
//       style={styles.videoPlayer}
//       player={player}
//       allowsFullscreen
//       allowsPictureInPicture
//     />
//   );
// };

// // ---------- Image Viewer ----------
// const ImageViewer = ({ url, title, description }) => {
//   const [imgError, setImgError] = useState(false);
//   const { t } = useTranslation();
//   return (
//     <View style={styles.mediaWrapper}>
//       {!imgError ? (
//         <Image
//           source={{ uri: url }}
//           style={styles.contentImage}
//           resizeMode="contain"
//           onError={() => setImgError(true)}
//         />
//       ) : (
//         <View style={styles.mediaErrorBox}>
//           <Ionicons name="image-outline" size={ms(40)} color="#94A3B8" />
//           <Text style={styles.mediaErrorText}>
//             {t("levels.image_error", "Image could not be loaded")}
//           </Text>
//         </View>
//       )}
//       {title ? <Text style={styles.mediaTitle}>{title}</Text> : null}
//       {description ? (
//         <Text style={styles.mediaDescription}>{description}</Text>
//       ) : null}
//     </View>
//   );
// };

// // ---------- Document Viewer ----------
// const DocumentViewer = ({ url, title, description }) => {
//   const { t } = useTranslation();
//   const handleOpen = () => {
//     if (url) Linking.openURL(url).catch(() => {});
//   };
//   return (
//     <View style={styles.mediaWrapper}>
//       <TouchableOpacity
//         style={styles.documentCard}
//         onPress={handleOpen}
//         activeOpacity={0.8}
//       >
//         <View style={styles.documentIconBox}>
//           <Ionicons name="document-text" size={ms(36)} color="#3B82F6" />
//         </View>
//         <View style={styles.documentInfo}>
//           <Text style={styles.documentTitle} numberOfLines={2}>
//             {title || t("levels.view_document", "View Document")}
//           </Text>
//           {description ? (
//             <Text style={styles.documentDesc} numberOfLines={2}>
//               {description}
//             </Text>
//           ) : null}
//           <View style={styles.documentOpenBtn}>
//             <Ionicons name="open-outline" size={ms(14)} color="#fff" />
//             <Text style={styles.documentOpenBtnText}>
//               {t("levels.open_document", "Open Document")}
//             </Text>
//           </View>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// };

// // ---------- External Link ----------
// const ExternalLinkViewer = ({ url, title, description }) => {
//   const { t } = useTranslation();
//   const isYouTube =
//     url && (url.includes("youtube.com") || url.includes("youtu.be"));
//   const handleOpen = () => {
//     if (url) Linking.openURL(url).catch(() => {});
//   };
//   return (
//     <View style={styles.mediaWrapper}>
//       <TouchableOpacity
//         style={styles.externalCard}
//         onPress={handleOpen}
//         activeOpacity={0.8}
//       >
//         <View
//           style={[
//             styles.documentIconBox,
//             { backgroundColor: isYouTube ? "#FEE2E2" : "#EFF6FF" },
//           ]}
//         >
//           <Ionicons
//             name={isYouTube ? "logo-youtube" : "link-outline"}
//             size={ms(36)}
//             color={isYouTube ? "#EF4444" : "#3B82F6"}
//           />
//         </View>
//         <View style={styles.documentInfo}>
//           <Text style={styles.documentTitle} numberOfLines={2}>
//             {title ||
//               (isYouTube
//                 ? t("levels.watch_on_youtube", "Watch on YouTube")
//                 : t("levels.open_external_link", "Open External Link"))}
//           </Text>
//           {description ? (
//             <Text style={styles.documentDesc} numberOfLines={2}>
//               {description}
//             </Text>
//           ) : null}
//           <View
//             style={[
//               styles.documentOpenBtn,
//               { backgroundColor: isYouTube ? "#EF4444" : "#3B82F6" },
//             ]}
//           >
//             <Ionicons
//               name={isYouTube ? "logo-youtube" : "open-outline"}
//               size={ms(14)}
//               color="#fff"
//             />
//             <Text style={styles.documentOpenBtnText}>
//               {isYouTube
//                 ? t("levels.watch_on_youtube", "Watch on YouTube")
//                 : t("levels.open_link", "Open Link")}
//             </Text>
//           </View>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// };

// // ---------- Media Placeholder ----------
// const MediaPlaceholder = ({ title, description }) => {
//   const { t } = useTranslation();
//   return (
//     <View style={styles.mediaWrapper}>
//       <View style={styles.mediaPlaceholderBox}>
//         <Ionicons name="film-outline" size={ms(48)} color="#475569" />
//         <Text style={styles.mediaPlaceholderText}>
//           {title || t("common.media", "Media content")}
//         </Text>
//         {description ? (
//           <Text style={styles.mediaPlaceholderDesc}>{description}</Text>
//         ) : null}
//         <Text style={styles.mediaPlaceholderHint}>
//           {t("levels.media_not_available", "Media not available")}
//         </Text>
//       </View>
//     </View>
//   );
// };

// // ---------- Try Image Viewer ----------
// const TryImageViewer = ({ url, title, description }) => {
//   const [imgError, setImgError] = useState(false);
//   if (!url || imgError) {
//     return <MediaPlaceholder title={title} description={description} />;
//   }
//   return (
//     <View style={styles.mediaWrapper}>
//       <Image
//         source={{ uri: url }}
//         style={styles.contentImage}
//         resizeMode="contain"
//         onError={() => setImgError(true)}
//       />
//       {title ? <Text style={styles.mediaTitle}>{title}</Text> : null}
//       {description ? (
//         <Text style={styles.mediaDescription}>{description}</Text>
//       ) : null}
//     </View>
//   );
// };

// // ---------- H5P Viewer ----------
// const H5PViewer = ({ embedUrl, title, description }) => {
//   const { t } = useTranslation();
//   const handleOpen = () => {
//     if (embedUrl) Linking.openURL(embedUrl).catch(() => {});
//   };
//   return (
//     <View style={styles.mediaWrapper}>
//       <TouchableOpacity
//         style={styles.h5pCard}
//         onPress={handleOpen}
//         activeOpacity={0.8}
//       >
//         <View style={[styles.documentIconBox, { backgroundColor: "#FFF7ED" }]}>
//           <Ionicons name="school-outline" size={ms(36)} color="#F97316" />
//         </View>
//         <View style={styles.documentInfo}>
//           <Text style={styles.documentTitle} numberOfLines={2}>
//             {title ||
//               t("levels.interactive_content", "Interactive Content (H5P)")}
//           </Text>
//           {description ? (
//             <Text style={styles.documentDesc} numberOfLines={2}>
//               {description}
//             </Text>
//           ) : null}
//           <View
//             style={[styles.documentOpenBtn, { backgroundColor: "#F97316" }]}
//           >
//             <Ionicons name="play-circle-outline" size={ms(14)} color="#fff" />
//             <Text style={styles.documentOpenBtnText}>
//               {t("levels.open_interactive_content", "Open Interactive Content")}
//             </Text>
//           </View>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// };

// // ---------- Format time ----------
// const formatTime = (secs) => {
//   if (isNaN(secs) || secs === null || secs === undefined) return "0:00";
//   const minutes = Math.floor(secs / 60);
//   const seconds = Math.floor(secs % 60);
//   return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
// };

// // ---------- Audio Player ----------
// const AudioPlayer = ({ url, title, description }) => {
//   const player = useVideoPlayer(url, (p) => {});
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);

//   useEffect(() => {
//     if (!player) return;
//     const interval = setInterval(() => {
//       setIsPlaying(player.playing);
//       setCurrentTime(player.currentTime || 0);
//       setDuration(player.duration || 0);
//     }, 250);
//     return () => clearInterval(interval);
//   }, [player]);

//   const handlePlayPause = () => {
//     if (isPlaying) player.pause();
//     else player.play();
//   };

//   const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

//   return (
//     <View style={styles.audioWrapper}>
//       <View style={styles.headphonesCircle}>
//         <Ionicons name="headset" size={ms(32)} color="#10B981" />
//       </View>
//       <View style={styles.audioControllerPill}>
//         <TouchableOpacity onPress={handlePlayPause} style={styles.audioPlayBtn}>
//           <Ionicons
//             name={isPlaying ? "pause" : "play"}
//             size={ms(18)}
//             color="#1E293B"
//           />
//         </TouchableOpacity>
//         <Text style={styles.audioTimeText}>
//           {formatTime(currentTime)} / {formatTime(duration)}
//         </Text>
//         <View style={styles.audioSliderTrack}>
//           <View
//             style={[styles.audioSliderFill, { width: `${progressPercent}%` }]}
//           />
//         </View>
//         <View style={styles.volumeIconContainer}>
//           <Ionicons
//             name="volume-medium-outline"
//             size={ms(16)}
//             color="#64748B"
//           />
//         </View>
//       </View>
//       {title ? <Text style={styles.mediaTitle}>{title}</Text> : null}
//       {description ? (
//         <Text style={styles.mediaDescription}>{description}</Text>
//       ) : null}
//     </View>
//   );
// };

// // ---------- Resolve audio URL ----------
// const resolveAudioUrl = (url) => {
//   if (!url) return null;
//   if (typeof url !== "string") return null;
//   let cleanUrl = url.trim();
//   if (cleanUrl.startsWith("http")) {
//     const backendUrl = "https://lms-backend.netswaptech.com";
//     if (cleanUrl.includes("localhost") || cleanUrl.includes("127.0.0.1")) {
//       cleanUrl = cleanUrl.replace(
//         /http:\/\/(localhost|127.0.0.1)(:\d+)?/,
//         backendUrl,
//       );
//     }
//     return cleanUrl;
//   }
//   if (!cleanUrl.startsWith("/")) cleanUrl = `/${cleanUrl}`;
//   return `https://lms-backend.netswaptech.com${cleanUrl}`;
// };

// // ---------- Header Audio Button ----------
// const HeaderAudioButton = ({ onPress, active }) => (
//   <TouchableOpacity
//     style={[styles.headerAudioBtn, active && styles.headerAudioBtnActive]}
//     onPress={onPress}
//     activeOpacity={0.7}
//   >
//     <Ionicons
//       name={active ? "volume-high" : "volume-medium-outline"}
//       size={ms(20)}
//       color={active ? "#2563EB" : "#64748B"}
//     />
//   </TouchableOpacity>
// );

// // ---------- Content Block ----------
// const ContentBlock = ({ contentData }) => {
//   const type = contentData?.type || "";
//   const media = contentData?.media || null;
//   const meta = contentData?.meta || null;
//   const mediaType = media?.type || "";
//   const mediaUrl = media?.full_url || media?.url || "";
//   const externalUrl =
//     media?.external_url || meta?.external_url || meta?.url || "";
//   const embedUrl =
//     meta?.embed_url ||
//     meta?.url ||
//     externalUrl ||
//     media?.full_url ||
//     media?.url ||
//     "";

//   if (
//     type === "h5p" ||
//     mediaType === "h5p" ||
//     /\.(h5p)(\?|$)/i.test(mediaUrl) ||
//     mediaUrl.includes("/h5p/")
//   ) {
//     return (
//       <H5PViewer
//         embedUrl={embedUrl}
//         title={contentData.title || media?.title}
//         description={contentData.description || media?.description}
//       />
//     );
//   }

//   if (
//     mediaType === "audio" ||
//     /\.(mp3|wav|aac|m4a|ogg)(\?|$)/i.test(mediaUrl) ||
//     mediaUrl.includes("/audio/") ||
//     type === "audio"
//   ) {
//     return (
//       <AudioPlayer
//         url={mediaUrl}
//         title={contentData.title || media?.title}
//         description={contentData.description || media?.description}
//       />
//     );
//   }

//   if ((type === "media" || type === "video") && media) {
//     if (
//       mediaUrl &&
//       (mediaUrl.includes("youtube.com") ||
//         mediaUrl.includes("youtu.be") ||
//         mediaUrl.includes("vimeo.com"))
//     ) {
//       return (
//         <ExternalLinkViewer
//           url={mediaUrl}
//           title={media.title}
//           description={media.description}
//         />
//       );
//     }
//     if (
//       mediaType === "image" ||
//       (!mediaType && /\.(jpg|jpeg|png|gif|webp|svg)(\?|$)/i.test(mediaUrl))
//     ) {
//       return (
//         <ImageViewer
//           url={mediaUrl}
//           title={media.title}
//           description={media.description}
//         />
//       );
//     }
//     if (mediaType === "external" && (externalUrl || mediaUrl)) {
//       const linkUrl = externalUrl || mediaUrl;
//       if (
//         linkUrl &&
//         (linkUrl.includes("youtube.com") ||
//           linkUrl.includes("youtu.be") ||
//           linkUrl.includes("vimeo.com"))
//       ) {
//         return (
//           <ExternalLinkViewer
//             url={linkUrl}
//             title={media.title}
//             description={media.description}
//           />
//         );
//       }
//       return (
//         <TryImageViewer
//           url={linkUrl}
//           title={media.title}
//           description={media.description}
//         />
//       );
//     }
//     if (
//       mediaType === "document" ||
//       /\.(pdf|doc|docx|xls|xlsx|ppt|pptx)(\?|$)/i.test(mediaUrl)
//     ) {
//       return (
//         <DocumentViewer
//           url={mediaUrl || externalUrl}
//           title={media.title}
//           description={media.description}
//         />
//       );
//     }
//     if (
//       mediaType === "video" ||
//       /\.(mp4|mov|mkv|avi|webm|m3u8)(\?|$)/i.test(mediaUrl)
//     ) {
//       return (
//         <View style={styles.videoWrapper}>
//           <VideoPlayer url={mediaUrl} />
//           {media.title ? (
//             <Text style={styles.mediaTitle}>{media.title}</Text>
//           ) : null}
//           {media.description ? (
//             <Text style={styles.mediaDescription}>{media.description}</Text>
//           ) : null}
//         </View>
//       );
//     }
//     if (mediaUrl) {
//       return (
//         <TryImageViewer
//           url={mediaUrl}
//           title={media.title}
//           description={media.description}
//         />
//       );
//     }
//     return (
//       <MediaPlaceholder title={media.title} description={media.description} />
//     );
//   }

//   if ((type === "media" || type === "video") && !media) {
//     return (
//       <MediaPlaceholder
//         title={contentData?.title}
//         description={contentData?.description}
//       />
//     );
//   }

//   if (type === "h5p") {
//     return (
//       <H5PViewer
//         embedUrl={embedUrl}
//         title={contentData.title}
//         description={contentData.description}
//       />
//     );
//   }

//   if (type === "external" || type === "link") {
//     const url = externalUrl || meta?.url || "";
//     return (
//       <ExternalLinkViewer
//         url={url}
//         title={contentData.title}
//         description={contentData.description}
//       />
//     );
//   }

//   if (type === "document") {
//     const url = mediaUrl || externalUrl || meta?.url || "";
//     return (
//       <DocumentViewer
//         url={url}
//         title={contentData.title}
//         description={contentData.description}
//       />
//     );
//   }

//   return null;
// };

// // ─────────────────────────────────────────────────────────────
// // Main Screen
// // ─────────────────────────────────────────────────────────────
// export default function ContentViewerScreen() {
//   const { t } = useTranslation();
//   const insets = useSafeAreaInsets();
//   const router = useRouter();
//   const { topicId, contentId } = useLocalSearchParams();
//   const dispatch = useDispatch();
//   const { singlePreview, loading, error } = useSelector(
//     (state) => state.course,
//   );
//   const [lastMarkedId, setLastMarkedId] = useState(null);
//   const [loadedLang, setLoadedLang] = useState(i18n.language);

//   // Chunk state
//   const [chunks, setChunks] = useState([]);
//   const [chunksReady, setChunksReady] = useState(false);

//   // Refs
//   const chunkLayouts = useRef({});
//   const chunksRef = useRef([]);
//   const isMounted = useRef(true);
//   const abortControllerRef = useRef(null);
//   const translationQueueRef = useRef(new Set());
//   const isTranslatingChunkRef = useRef({});
//   const hasInitialTranslationTriggered = useRef(false);

//   useEffect(() => {
//     chunksRef.current = chunks;
//   }, [chunks]);

//   useEffect(() => {
//     isMounted.current = true;
//     return () => {
//       isMounted.current = false;
//       if (abortControllerRef.current) abortControllerRef.current.abort();
//     };
//   }, []);

//   // Fetch content
//   useEffect(() => {
//     if (topicId && contentId) {
//       setLoadedLang(i18n.language);
//       setChunksReady(false);
//       setChunks([]);
//       hasInitialTranslationTriggered.current = false;
//       chunkLayouts.current = {};
//       translationQueueRef.current.clear();
//       isTranslatingChunkRef.current = {};

//       dispatch(fetchSinglePreview({ topicId, contentId, lang: i18n.language }))
//         .unwrap()
//         .then((res) => {
//           const resPayload = res || {};
//           const data = resPayload.data || resPayload;
//           const current = data?.current || {};
//           const isMedia =
//             current.type === "media" ||
//             current.type === "video" ||
//             current.type === "h5p" ||
//             current.type === "external" ||
//             current.type === "link" ||
//             current.type === "document";
//           const hasNoContent =
//             !current.content || current.content.trim() === "";

//           if (
//             (!data?.current || (hasNoContent && !isMedia)) &&
//             i18n.language !== "en"
//           ) {
//             setLoadedLang("en");
//             dispatch(fetchSinglePreview({ topicId, contentId, lang: "en" }));
//           } else {
//             setLoadedLang(i18n.language);
//           }
//         })
//         .catch(() => {
//           if (i18n.language !== "en") {
//             setLoadedLang("en");
//             dispatch(fetchSinglePreview({ topicId, contentId, lang: "en" }));
//           }
//         });
//     }
//   }, [dispatch, topicId, contentId, i18n.language]);

//   const topicData = singlePreview?.topic || {};
//   const contentData = singlePreview?.current || {};
//   const navigation = singlePreview?.navigation || {};

//   // ─── Translate single chunk ───
//   const translateSingleChunk = async (index, originalHtml) => {
//     if (!isMounted.current) return;
//     if (isTranslatingChunkRef.current[index]) return;

//     const chunk = chunksRef.current[index];
//     if (!chunk || chunk.status === "done") return;

//     isTranslatingChunkRef.current[index] = true;

//     setChunks((prev) => {
//       if (!prev[index] || prev[index].status !== "idle") return prev;
//       const updated = [...prev];
//       updated[index] = { ...updated[index], status: "translating" };
//       return updated;
//     });

//     try {
//       const signal = abortControllerRef.current?.signal;

//       // HTML ke text parts extract karo — tags preserve karo
//       const parts = originalHtml.split(/(<[^>]+>)/g);
//       const translatedParts = [];

//       for (const part of parts) {
//         if (signal?.aborted) throw new Error("Aborted");

//         // Tag ya empty — skip
//         if ((part.startsWith("<") && part.endsWith(">")) || !part.trim()) {
//           translatedParts.push(part);
//           continue;
//         }

//         try {
//           const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${i18n.language}&dt=t&q=${encodeURIComponent(part)}`;
//           const res = await fetch(url, { signal });
//           if (!res.ok) throw new Error("API error");
//           const data = await res.json();
//           translatedParts.push(data[0].map((s) => s[0]).join(""));
//         } catch (err) {
//           if (err.name === "AbortError" || signal?.aborted) throw err;
//           translatedParts.push(part); // fallback original
//         }

//         // Rate limit avoid karo
//         await new Promise((r) => setTimeout(r, 50));
//       }

//       if (!isMounted.current) return;

//       setChunks((prev) => {
//         if (!prev[index]) return prev;
//         const updated = [...prev];
//         updated[index] = {
//           ...updated[index],
//           translatedHtml: translatedParts.join(""),
//           status: "done",
//         };
//         return updated;
//       });
//     } catch (err) {
//       if (err.name === "AbortError") return;
//       if (!isMounted.current) return;
//       setChunks((prev) => {
//         if (!prev[index]) return prev;
//         const updated = [...prev];
//         updated[index] = { ...updated[index], status: "failed" };
//         return updated;
//       });
//     } finally {
//       isTranslatingChunkRef.current[index] = false;
//     }
//   };

//   // ─── Trigger translation for a chunk ───
//   const triggerTranslation = (index) => {
//     if (index < 0 || index >= chunksRef.current.length) return;
//     const chunk = chunksRef.current[index];
//     if (
//       chunk &&
//       chunk.status === "idle" &&
//       !translationQueueRef.current.has(index)
//     ) {
//       translationQueueRef.current.add(index);
//       setTimeout(() => {
//         if (translationQueueRef.current.has(index)) {
//           translationQueueRef.current.delete(index);
//           translateSingleChunk(index, chunk.originalHtml);
//         }
//       }, 50);
//     }
//   };

//   // ─── Scroll handler — visible + ahead chunks translate ───
//   const handleScroll = (event) => {
//     if (!chunksReady || chunksRef.current.length === 0) return;

//     const scrollY = event.nativeEvent.contentOffset.y;
//     const screenHeight = event.nativeEvent.layoutMeasurement.height;
//     const bottomEdge = scrollY + screenHeight + 400; // 400px aage preload

//     Object.keys(chunkLayouts.current).forEach((key) => {
//       const index = Number(key);
//       const chunkY = chunkLayouts.current[index];

//       // Chunk visible range mein hai
//       if (chunkY <= bottomEdge) {
//         triggerTranslation(index);
//       }
//     });
//   };

//   const handleChunkLayout = (index, y) => {
//     chunkLayouts.current[index] = y;
//   };

//   // ─── Setup chunks when content changes ───
//   useEffect(() => {
//     let active = true;

//     const setupChunks = async () => {
//       if (abortControllerRef.current) abortControllerRef.current.abort();
//       abortControllerRef.current = new AbortController();

//       const originalContent = contentData.content || "";

//       if (!originalContent) {
//         if (active) {
//           setChunks([]);
//           setChunksReady(true);
//         }
//         return;
//       }

//       if (i18n.language === "en") {
//         if (active) {
//           setChunks([]);
//           setChunksReady(true);
//         }
//         return;
//       }

//       try {
//         const elements = splitHtmlIntoElements(originalContent);
//         const chunkStrings = groupElementsIntoChunks(elements, 800, 1500);

//         const initialChunks = chunkStrings.map((html, idx) => ({
//           id: idx,
//           originalHtml: html,
//           translatedHtml: "",
//           status: "idle",
//         }));

//         if (active) {
//           setChunks(initialChunks);
//           setChunksReady(true);
//           chunkLayouts.current = {};
//           translationQueueRef.current.clear();
//           isTranslatingChunkRef.current = {};
//           hasInitialTranslationTriggered.current = false;
//         }
//       } catch (err) {
//         console.error("Failed to prepare chunks:", err);
//         if (active) {
//           setChunks([]);
//           setChunksReady(true);
//         }
//       }
//     };

//     setupChunks();
//     return () => {
//       active = false;
//     };
//   }, [contentData.content, i18n.language]);

//   // ─── Initial chunks ready — pehle 2 translate karo ───
//   useEffect(() => {
//     if (
//       chunksReady &&
//       chunks.length > 0 &&
//       !hasInitialTranslationTriggered.current
//     ) {
//       hasInitialTranslationTriggered.current = true;
//       setTimeout(() => {
//         triggerTranslation(0);
//         triggerTranslation(1);
//       }, 100);
//     }
//   }, [chunksReady, chunks.length]);

//   const type = contentData.type || "";
//   const isMediaType = type === "media" || type === "video";
//   const prevId = navigation.previous_content_id || null;
//   const nextId = navigation.next_content_id || null;
//   const isRead =
//     contentData.is_read == 1 ||
//     contentData.is_read == true ||
//     contentData.is_read == "true";

//   // Auto mark as read
//   useEffect(() => {
//     if (contentId && singlePreview && !isRead && lastMarkedId !== contentId) {
//       setLastMarkedId(contentId);
//       dispatch(toggleTopicContentRead(Number(contentId)));
//     }
//   }, [contentId, isRead, singlePreview]);

//   const rawAudioUrl =
//     contentData?.audio_content ||
//     contentData?.audio ||
//     (contentData?.media?.type === "audio"
//       ? contentData?.media?.full_url || contentData?.media?.url
//       : null) ||
//     topicData?.audio_content ||
//     singlePreview?.audio_content;
//   const audioUrl = resolveAudioUrl(rawAudioUrl);

//   const [showFloatingPlayer, setShowFloatingPlayer] = useState(false);
//   const headerPlayer = useVideoPlayer(audioUrl || "", (p) => {
//     p.loop = false;
//   });
//   const [headerIsPlaying, setHeaderIsPlaying] = useState(false);
//   const [headerCurrentTime, setHeaderCurrentTime] = useState(0);
//   const [headerDuration, setHeaderDuration] = useState(0);

//   useEffect(() => {
//     setShowFloatingPlayer(false);
//   }, [audioUrl]);

//   useEffect(() => {
//     if (!headerPlayer || !audioUrl) return;
//     const interval = setInterval(() => {
//       setHeaderIsPlaying(headerPlayer.playing);
//       setHeaderCurrentTime(headerPlayer.currentTime || 0);
//       setHeaderDuration(headerPlayer.duration || 0);
//     }, 250);
//     return () => {
//       clearInterval(interval);
//       try {
//         headerPlayer.pause();
//       } catch (e) {}
//     };
//   }, [headerPlayer, audioUrl]);

//   const handleHeaderPlayPause = () => {
//     if (!headerPlayer) return;
//     if (headerIsPlaying) headerPlayer.pause();
//     else headerPlayer.play();
//   };

//   // Loading
//   if (loading.singlePreview) {
//     return (
//       <View style={[styles.container, styles.loaderContainer]}>
//         <ActivityIndicator size="large" color="#1E3A8A" />
//       </View>
//     );
//   }

//   const hasError = !loading.singlePreview && !singlePreview?.current;
//   if (hasError) {
//     return (
//       <View style={[styles.container, { paddingTop: insets.top }]}>
//         <View style={styles.header}>
//           <TouchableOpacity
//             style={styles.breadcrumbLink}
//             onPress={() => router.back()}
//           >
//             <Ionicons name="chevron-back" size={ms(16)} color="#64748B" />
//             <Text style={styles.breadcrumbText}>
//               {t("common.go_back", "Back")}
//             </Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.errorContainer}>
//           <View style={styles.errorIconBox}>
//             <Ionicons
//               name="alert-circle-outline"
//               size={ms(60)}
//               color="#EF4444"
//             />
//           </View>
//           <Text style={styles.errorTitle}>
//             {t("common.error_loading", "Error Loading Content")}
//           </Text>
//           <Text style={styles.errorSubtitle}>
//             {error ||
//               t(
//                 "common.slow_connection",
//                 "The request timed out. Please try again.",
//               )}
//           </Text>
//           <TouchableOpacity
//             style={styles.retryButton}
//             onPress={() =>
//               dispatch(
//                 fetchSinglePreview({ topicId, contentId, lang: loadedLang }),
//               )
//             }
//             activeOpacity={0.8}
//           >
//             <Text style={styles.retryButtonText}>
//               {t("common.retry", "Retry")}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }

//   const getBadgeInfo = () => {
//     if (type === "h5p")
//       return { icon: "school-outline", label: "INTERACTIVE", color: "#F97316" };
//     if (type === "document")
//       return { icon: "document-text", label: "DOCUMENT", color: "#8B5CF6" };
//     if (type === "external" || type === "link")
//       return { icon: "link-outline", label: "EXTERNAL LINK", color: "#EF4444" };
//     if (type === "media") {
//       const mediaType = contentData?.media?.type || "";
//       if (mediaType === "image")
//         return { icon: "image-outline", label: "IMAGE", color: "#10B981" };
//       if (mediaType === "document")
//         return { icon: "document-text", label: "DOCUMENT", color: "#8B5CF6" };
//       if (mediaType === "external")
//         return {
//           icon: "link-outline",
//           label: "EXTERNAL LINK",
//           color: "#EF4444",
//         };
//       if (mediaType === "video")
//         return { icon: "videocam", label: "VIDEO", color: "#3B82F6" };
//       return { icon: "videocam", label: "MEDIA MATERIAL", color: "#3B82F6" };
//     }
//     return { icon: "book", label: "READING MATERIAL", color: "#3B82F6" };
//   };

//   const badge = getBadgeInfo();

//   const handlePrev = () => {
//     if (prevId) {
//       router.replace({
//         pathname: "/(tabs)/levels/content-viewer",
//         params: { topicId, contentId: prevId },
//       });
//     }
//   };

//   const handleNext = () => {
//     if (nextId) {
//       router.replace({
//         pathname: "/(tabs)/levels/content-viewer",
//         params: { topicId, contentId: nextId },
//       });
//     }
//   };

//   // ========== RENDER ==========
//   return (
//     <View style={[styles.container, { paddingTop: insets.top }]}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.breadcrumbLink}
//           onPress={() => router.back()}
//         >
//           <Ionicons name="chevron-back" size={ms(16)} color="#64748B" />
//           <Text style={styles.breadcrumbText}>
//             {t("common.go_back", "Back")}
//           </Text>
//         </TouchableOpacity>
//         <Text style={styles.breadcrumbSeparator}>/</Text>
//         <TouchableOpacity
//           onPress={() => {
//             router.push({
//               pathname: "/(tabs)/levels/topic-details",
//               params: { id: topicId },
//             });
//           }}
//           activeOpacity={0.7}
//         >
//           <Text style={styles.breadcrumbText} numberOfLines={1}>
//             {topicData.title || `Topic ${topicId}`}
//           </Text>
//         </TouchableOpacity>
//         <Text style={styles.breadcrumbSeparator}>/</Text>
//         <Text
//           style={[styles.breadcrumbText, styles.breadcrumbActive]}
//           numberOfLines={1}
//         >
//           {contentData.title || "..."}
//         </Text>
//         {audioUrl ? (
//           <HeaderAudioButton
//             onPress={() => setShowFloatingPlayer(!showFloatingPlayer)}
//             active={showFloatingPlayer}
//           />
//         ) : null}
//       </View>

//       {/* Floating Audio Player */}
//       {showFloatingPlayer && audioUrl && (
//         <View style={styles.floatingPlayerContainer}>
//           <View style={styles.audioControllerPill}>
//             <TouchableOpacity
//               onPress={handleHeaderPlayPause}
//               style={styles.audioPlayBtn}
//             >
//               <Ionicons
//                 name={headerIsPlaying ? "pause" : "play"}
//                 size={ms(18)}
//                 color="#1E293B"
//               />
//             </TouchableOpacity>
//             <Text style={styles.audioTimeText}>
//               {formatTime(headerCurrentTime)} / {formatTime(headerDuration)}
//             </Text>
//             <View style={styles.audioSliderTrack}>
//               <View
//                 style={[
//                   styles.audioSliderFill,
//                   {
//                     width: `${
//                       headerDuration > 0
//                         ? (headerCurrentTime / headerDuration) * 100
//                         : 0
//                     }%`,
//                   },
//                 ]}
//               />
//             </View>
//             <View style={styles.volumeIconContainer}>
//               <Ionicons
//                 name="volume-medium-outline"
//                 size={ms(16)}
//                 color="#64748B"
//               />
//             </View>
//           </View>
//         </View>
//       )}

//       {/* Scroll Content */}
//       <ScrollView
//         contentContainerStyle={[
//           styles.scrollContent,
//           { paddingBottom: insets.bottom + hp(30) },
//         ]}
//         showsVerticalScrollIndicator={false}
//         scrollEventThrottle={100}
//         onScroll={handleScroll}
//       >
//         {/* Badge Row */}
//         <View style={styles.badgeRow}>
//           <View
//             style={[
//               styles.typeBadge,
//               {
//                 borderColor: badge.color + "40",
//                 backgroundColor: badge.color + "15",
//               },
//             ]}
//           >
//             <Ionicons name={badge.icon} size={ms(14)} color={badge.color} />
//             <Text style={[styles.typeBadgeText, { color: badge.color }]}>
//               {badge.label}
//             </Text>
//           </View>
//           {isRead ? (
//             <View style={styles.readBadge}>
//               <Ionicons name="checkmark-circle" size={ms(14)} color="#10B981" />
//               <Text style={styles.readBadgeText}>
//                 {t("levels.read", "Read")}
//               </Text>
//             </View>
//           ) : (
//             <View style={styles.unreadBadge}>
//               <Ionicons name="ellipse-outline" size={ms(14)} color="#94A3B8" />
//               <Text style={styles.unreadBadgeText}>
//                 {t("levels.unread", "Unread")}
//               </Text>
//             </View>
//           )}
//         </View>

//         {/* Title */}
//         <Text style={styles.title}>
//           {contentData.title?.replace(
//             /^(?:(?:Module|Chapter|Topic)\s*)?[\d\.]+\s*[-:]?\s*/i,
//             "",
//           ) || "Untitled"}
//         </Text>

//         {/* Content Box */}
//         <View style={styles.contentBox}>
//           <ContentBlock contentData={contentData} />

//           {isMediaType && contentData?.media && contentData?.content && (
//             <View style={styles.contentDivider} />
//           )}

//           {/* ─── Content Rendering Logic ─── */}
//           {(() => {
//             // English — original directly dikhao
//             if (i18n.language === "en") {
//               return contentData.content ? (
//                 <HtmlRenderer html={contentData.content} />
//               ) : !isMediaType &&
//                 type !== "h5p" &&
//                 type !== "external" &&
//                 type !== "link" &&
//                 type !== "document" ? (
//                 <Text style={styles.emptyContent}>
//                   {t("levels.no_content", "No content available.")}
//                 </Text>
//               ) : null;
//             }

//             // Non-English — chunks ready hain
//             if (chunksReady) {
//               if (chunks.length > 0) {
//                 return (
//                   <View>
//                     {chunks.map((chunk, index) => (
//                       <View
//                         key={chunk.id}
//                         style={styles.chunkWrapper}
//                         onLayout={(e) =>
//                           handleChunkLayout(index, e.nativeEvent.layout.y)
//                         }
//                       >
//                         {/* Original ya translated — jo available ho dikhao */}
//                         <HtmlRenderer
//                           html={chunk.translatedHtml || chunk.originalHtml}
//                         />

//                         {/* Translating indicator */}
//                         {chunk.status === "translating" && (
//                           <View style={styles.chunkTranslatingIndicator}>
//                             <ActivityIndicator size="small" color="#2563EB" />
//                             <Text style={styles.chunkTranslatingText}>
//                               {i18n.language === "hi"
//                                 ? "अनुवाद हो रहा है..."
//                                 : i18n.language === "pa"
//                                   ? "ਅਨੁਵਾਦ ਹੋ ਰਿਹਾ ਹੈ..."
//                                   : "Translating..."}
//                             </Text>
//                           </View>
//                         )}
//                       </View>
//                     ))}
//                   </View>
//                 );
//               } else {
//                 // Chunks nahi hain — original dikhao
//                 return contentData.content ? (
//                   <HtmlRenderer html={contentData.content} />
//                 ) : !isMediaType &&
//                   type !== "h5p" &&
//                   type !== "external" &&
//                   type !== "link" &&
//                   type !== "document" ? (
//                   <Text style={styles.emptyContent}>
//                     {t("levels.no_content", "No content available.")}
//                   </Text>
//                 ) : null;
//               }
//             }

//             // Chunks ready nahi — loading
//             return (
//               <View style={styles.translationLoadingContainer}>
//                 <ActivityIndicator size="small" color="#2563EB" />
//                 <Text style={styles.translationLoadingText}>
//                   {i18n.language === "hi"
//                     ? "सामग्री तैयार की जा रही है..."
//                     : i18n.language === "pa"
//                       ? "ਸਮੱਗਰੀ ਤਿਆਰ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ..."
//                       : "Preparing content..."}
//                 </Text>
//               </View>
//             );
//           })()}
//         </View>

//         {/* Marking read indicator */}
//         {!isRead && (
//           <View style={styles.markingReadIndicator}>
//             <ActivityIndicator size="small" color="#10B981" />
//             <Text style={styles.markingReadText}>
//               {t("levels.marking_progress", "Marking progress...")}
//             </Text>
//           </View>
//         )}

//         {/* Navigation */}
//         <View style={styles.navFooter}>
//           <TouchableOpacity
//             style={[
//               styles.navBtn,
//               styles.navBtnPrev,
//               !prevId && styles.navBtnDisabled,
//             ]}
//             onPress={handlePrev}
//             disabled={!prevId}
//           >
//             <Ionicons
//               name="arrow-back"
//               size={ms(18)}
//               color={prevId ? "#64748B" : "#CBD5E1"}
//             />
//             <Text style={[styles.navBtnValue, !prevId && { color: "#CBD5E1" }]}>
//               {t("exam.previous", "Previous")}
//             </Text>
//           </TouchableOpacity>
//           <Text style={styles.navCenterText}>
//             {nextId
//               ? t("levels.next_lesson", "Next lesson") + " →"
//               : t("levels.last_lesson", "Last lesson")}
//           </Text>
//           <TouchableOpacity
//             style={[
//               styles.navBtn,
//               styles.navBtnNext,
//               !nextId && styles.navBtnDisabledNext,
//             ]}
//             onPress={handleNext}
//             disabled={!nextId}
//           >
//             <Text
//               style={[styles.navBtnValueNext, !nextId && { color: "#BFDBFE" }]}
//             >
//               {t("exam.next", "Next")}
//             </Text>
//             <Ionicons
//               name="arrow-forward"
//               size={ms(18)}
//               color={nextId ? "#FFFFFF" : "#BFDBFE"}
//             />
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F8FAFC" },
//   loaderContainer: { justifyContent: "center", alignItems: "center" },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: wp(16),
//     paddingVertical: hp(12),
//     borderBottomWidth: 1,
//     borderBottomColor: "#E2E8F0",
//     backgroundColor: "#fff",
//   },
//   breadcrumbLink: { flexDirection: "row", alignItems: "center" },
//   breadcrumbText: {
//     fontSize: fs(12),
//     color: "#64748B",
//     fontWeight: "600",
//     marginLeft: wp(2),
//     maxWidth: wp(90),
//   },
//   breadcrumbSeparator: {
//     fontSize: fs(12),
//     color: "#CBD5E1",
//     marginHorizontal: wp(6),
//   },
//   breadcrumbActive: { color: "#1E293B", flex: 1 },
//   scrollContent: { padding: wp(12), paddingTop: hp(10) },
//   badgeRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: hp(12),
//     gap: wp(8),
//     flexWrap: "wrap",
//   },
//   typeBadge: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderRadius: ms(8),
//     paddingHorizontal: wp(10),
//     paddingVertical: hp(6),
//   },
//   typeBadgeText: {
//     fontSize: fs(10),
//     fontWeight: "700",
//     marginLeft: wp(6),
//     letterSpacing: 0.4,
//   },
//   readBadge: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#D1FAE5",
//     borderRadius: ms(8),
//     paddingHorizontal: wp(10),
//     paddingVertical: hp(6),
//   },
//   readBadgeText: {
//     fontSize: fs(10),
//     color: "#10B981",
//     fontWeight: "700",
//     marginLeft: wp(5),
//     letterSpacing: 0.4,
//   },
//   unreadBadge: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F1F5F9",
//     borderRadius: ms(8),
//     paddingHorizontal: wp(10),
//     paddingVertical: hp(6),
//   },
//   unreadBadgeText: {
//     fontSize: fs(10),
//     color: "#94A3B8",
//     fontWeight: "700",
//     marginLeft: wp(5),
//     letterSpacing: 0.4,
//   },
//   title: {
//     fontSize: fs(24),
//     fontWeight: "800",
//     color: "#0F172A",
//     marginBottom: hp(4),
//     lineHeight: fs(32),
//   },
//   contentBox: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: ms(16),
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     padding: ms(12),
//     marginBottom: hp(20),
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   emptyContent: {
//     fontSize: fs(14),
//     color: "#94A3B8",
//     textAlign: "center",
//     paddingVertical: hp(40),
//   },
//   mediaWrapper: {
//     width: "100%",
//     borderRadius: ms(12),
//     overflow: "hidden",
//     marginBottom: hp(8),
//   },
//   contentImage: {
//     width: "100%",
//     height: hp(250),
//     borderRadius: ms(12),
//     backgroundColor: "#F1F5F9",
//   },
//   videoWrapper: { width: "100%", borderRadius: ms(12), overflow: "hidden" },
//   videoPlayer: {
//     width: "100%",
//     height: hp(220),
//     backgroundColor: "#000",
//     borderRadius: ms(12),
//   },
//   mediaTitle: {
//     fontSize: fs(16),
//     fontWeight: "700",
//     color: "#1E293B",
//     marginTop: hp(12),
//   },
//   mediaDescription: {
//     fontSize: fs(13),
//     color: "#64748B",
//     marginTop: hp(4),
//     lineHeight: fs(18),
//   },
//   mediaErrorBox: {
//     width: "100%",
//     height: hp(180),
//     backgroundColor: "#F1F5F9",
//     borderRadius: ms(12),
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   mediaErrorText: { marginTop: hp(10), fontSize: fs(13), color: "#94A3B8" },
//   mediaPlaceholderBox: {
//     width: "100%",
//     height: hp(220),
//     backgroundColor: "#0F172A",
//     borderRadius: ms(12),
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: wp(20),
//   },
//   mediaPlaceholderText: {
//     marginTop: hp(12),
//     fontSize: fs(15),
//     color: "#94A3B8",
//     fontWeight: "600",
//     textAlign: "center",
//   },
//   mediaPlaceholderDesc: {
//     marginTop: hp(4),
//     fontSize: fs(12),
//     color: "#64748B",
//     textAlign: "center",
//   },
//   mediaPlaceholderHint: {
//     marginTop: hp(12),
//     fontSize: fs(11),
//     color: "#475569",
//     fontWeight: "500",
//   },
//   documentCard: {
//     flexDirection: "row",
//     backgroundColor: "#EFF6FF",
//     borderRadius: ms(12),
//     padding: ms(16),
//     borderWidth: 1,
//     borderColor: "#BFDBFE",
//     alignItems: "center",
//   },
//   externalCard: {
//     flexDirection: "row",
//     backgroundColor: "#FFF7ED",
//     borderRadius: ms(12),
//     padding: ms(16),
//     borderWidth: 1,
//     borderColor: "#FED7AA",
//     alignItems: "center",
//   },
//   h5pCard: {
//     flexDirection: "row",
//     backgroundColor: "#FFF7ED",
//     borderRadius: ms(12),
//     padding: ms(16),
//     borderWidth: 1,
//     borderColor: "#FED7AA",
//     alignItems: "center",
//   },
//   documentIconBox: {
//     width: ms(64),
//     height: ms(64),
//     borderRadius: ms(12),
//     backgroundColor: "#DBEAFE",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: wp(16),
//   },
//   documentInfo: { flex: 1 },
//   documentTitle: {
//     fontSize: fs(15),
//     fontWeight: "700",
//     color: "#1E293B",
//     marginBottom: hp(4),
//   },
//   documentDesc: {
//     fontSize: fs(12),
//     color: "#64748B",
//     marginBottom: hp(10),
//     lineHeight: fs(17),
//   },
//   documentOpenBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#3B82F6",
//     paddingHorizontal: wp(12),
//     paddingVertical: hp(8),
//     borderRadius: ms(8),
//     alignSelf: "flex-start",
//     gap: wp(6),
//   },
//   documentOpenBtnText: { fontSize: fs(12), color: "#fff", fontWeight: "700" },
//   contentDivider: {
//     height: 1,
//     backgroundColor: "#E2E8F0",
//     marginVertical: hp(16),
//     width: "100%",
//   },
//   markingReadIndicator: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#F0FDF4",
//     borderRadius: ms(12),
//     paddingVertical: hp(12),
//     marginBottom: hp(25),
//     borderWidth: 1,
//     borderColor: "#D1FAE5",
//   },
//   markingReadText: {
//     fontSize: fs(13),
//     color: "#10B981",
//     fontWeight: "600",
//     marginLeft: wp(8),
//   },
//   navFooter: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingTop: hp(20),
//     borderTopWidth: 1,
//     borderTopColor: "#E2E8F0",
//     marginTop: hp(10),
//   },
//   navBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: wp(12),
//     paddingVertical: hp(12),
//     borderRadius: ms(10),
//     flex: 1,
//     maxWidth: wp(140),
//   },
//   navBtnDisabled: {
//     backgroundColor: "#F8FAFC",
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//   },
//   navBtnPrev: {
//     backgroundColor: "#FFFFFF",
//     borderWidth: 1.5,
//     borderColor: "#E2E8F0",
//     justifyContent: "center",
//   },
//   navBtnValue: {
//     fontSize: fs(13),
//     color: "#475569",
//     fontWeight: "700",
//     marginLeft: wp(8),
//   },
//   navCenterText: {
//     fontSize: fs(10),
//     color: "#94A3B8",
//     fontWeight: "600",
//     flex: 1,
//     textAlign: "center",
//     textTransform: "uppercase",
//     letterSpacing: 0.5,
//   },
//   navBtnNext: {
//     backgroundColor: "#2563EB",
//     justifyContent: "center",
//     shadowColor: "#2563EB",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   navBtnDisabledNext: { backgroundColor: "#94A3B8", opacity: 0.5 },
//   navBtnValueNext: {
//     fontSize: fs(13),
//     color: "#FFFFFF",
//     fontWeight: "700",
//     marginRight: wp(8),
//   },
//   audioWrapper: {
//     width: "100%",
//     alignItems: "center",
//     paddingVertical: hp(15),
//     backgroundColor: "#FFFFFF",
//     borderRadius: ms(12),
//   },
//   headphonesCircle: {
//     width: ms(80),
//     height: ms(80),
//     borderRadius: ms(40),
//     backgroundColor: "#D1FAE5",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: hp(16),
//   },
//   audioControllerPill: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F1F5F9",
//     borderRadius: ms(24),
//     paddingHorizontal: wp(16),
//     paddingVertical: hp(10),
//     width: "90%",
//     maxWidth: wp(340),
//   },
//   audioPlayBtn: { marginRight: wp(10) },
//   audioTimeText: {
//     fontSize: fs(11),
//     color: "#64748B",
//     marginRight: wp(10),
//     fontWeight: "600",
//   },
//   audioSliderTrack: {
//     flex: 1,
//     height: hp(4),
//     backgroundColor: "#CBD5E1",
//     borderRadius: hp(2),
//     overflow: "hidden",
//     marginRight: wp(10),
//   },
//   audioSliderFill: {
//     height: "100%",
//     backgroundColor: "#475569",
//     borderRadius: hp(2),
//   },
//   volumeIconContainer: { justifyContent: "center", alignItems: "center" },
//   headerAudioBtn: {
//     width: ms(36),
//     height: ms(36),
//     borderRadius: ms(18),
//     backgroundColor: "#F1F5F9",
//     justifyContent: "center",
//     alignItems: "center",
//     marginLeft: wp(8),
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//   },
//   headerAudioBtnActive: { backgroundColor: "#EFF6FF", borderColor: "#3B82F6" },
//   floatingPlayerContainer: {
//     width: "100%",
//     alignItems: "center",
//     paddingVertical: hp(8),
//     backgroundColor: "#FFFFFF",
//     borderBottomWidth: 1,
//     borderBottomColor: "#E2E8F0",
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: wp(30),
//     backgroundColor: "#F8FAFC",
//   },
//   errorIconBox: {
//     width: ms(80),
//     height: ms(80),
//     borderRadius: ms(40),
//     backgroundColor: "#FEF2F2",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: hp(15),
//   },
//   errorTitle: {
//     fontSize: fs(18),
//     fontWeight: "800",
//     color: "#1E293B",
//     marginBottom: hp(8),
//     textAlign: "center",
//   },
//   errorSubtitle: {
//     fontSize: fs(13),
//     color: "#64748B",
//     textAlign: "center",
//     lineHeight: fs(18),
//     marginBottom: hp(24),
//   },
//   retryButton: {
//     backgroundColor: "#3B82F6",
//     paddingHorizontal: wp(30),
//     paddingVertical: hp(12),
//     borderRadius: ms(10),
//     shadowColor: "#3B82F6",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   retryButtonText: { color: "#FFFFFF", fontSize: fs(14), fontWeight: "700" },
//   translationLoadingContainer: {
//     paddingVertical: hp(30),
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#F8FAFC",
//     borderRadius: ms(12),
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     borderStyle: "dashed",
//     marginVertical: hp(10),
//   },
//   translationLoadingText: {
//     marginTop: hp(10),
//     fontSize: fs(13),
//     color: "#64748B",
//     fontWeight: "600",
//   },
//   chunkWrapper: { position: "relative", marginBottom: hp(10) },
//   chunkTranslatingIndicator: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: hp(8),
//     backgroundColor: "#F8FAFC",
//     borderRadius: ms(8),
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     marginTop: hp(6),
//     gap: wp(8),
//   },
//   chunkTranslatingText: {
//     fontSize: fs(12),
//     color: "#64748B",
//     fontWeight: "600",
//   },
// });

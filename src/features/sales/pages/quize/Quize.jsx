// import React, { useState, useEffect, useCallback, useRef } from "react";
// import {
//   PageBody,
//   PageHeader,
//   PageHeaderLeft,
//   PageLayout,
//   PageSubtitle,
//   PageTitle,
// } from "../../common/layout";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   startAttempt,
//   fetchQuestions,
//   submitAnswer,
//   skipQuestion,
//   submitQuiz,
// } from "../../../../redux/slice/quizSlice";
// import {
//   FiChevronLeft,
//   FiChevronRight,
//   FiCheckCircle,
//   FiCircle,
//   FiAlertCircle,
//   FiHelpCircle,
//   FiSkipForward,
//   FiClock,
//   FiInfo,
//   FiBookOpen,
//   FiLogOut,
//   FiX,
//   FiAlertTriangle,
// } from "react-icons/fi";
// import Loader from "../../common/Loader";
// import { useTranslation } from "react-i18next";

// const Quiz = () => {
//   const navigate = useNavigate();
//   const { topicId } = useParams();
//   const dispatch = useDispatch();
//   const { t } = useTranslation();

//   const { attempt, questions, isLoading } = useSelector((state) => state.quiz);

//   const [selected, setSelected] = useState("");
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [hasAutoSubmitted, setHasAutoSubmitted] = useState(false);
//   const [showLeaveModal, setShowLeaveModal] = useState(false);

//   // Countdown timer state
//   const [timeLeft, setTimeLeft] = useState(null);
//   const [isTimeUp, setIsTimeUp] = useState(false);

//   // Refs to avoid stale closures
//   const attemptRef = useRef(attempt);
//   const topicIdRef = useRef(topicId);
//   const selectedRef = useRef(selected);
//   const currentIndexRef = useRef(currentIndex);
//   const questionsRef = useRef(questions);
//   const hasAutoSubmittedRef = useRef(hasAutoSubmitted);
//   const navigateRef = useRef(navigate);
//   const dispatchRef = useRef(dispatch);

//   // Update refs when state changes
//   useEffect(() => {
//     attemptRef.current = attempt;
//   }, [attempt]);

//   useEffect(() => {
//     topicIdRef.current = topicId;
//   }, [topicId]);

//   useEffect(() => {
//     selectedRef.current = selected;
//   }, [selected]);

//   useEffect(() => {
//     currentIndexRef.current = currentIndex;
//   }, [currentIndex]);

//   useEffect(() => {
//     questionsRef.current = questions;
//   }, [questions]);

//   useEffect(() => {
//     hasAutoSubmittedRef.current = hasAutoSubmitted;
//   }, [hasAutoSubmitted]);

//   useEffect(() => {
//     navigateRef.current = navigate;
//   }, [navigate]);

//   useEffect(() => {
//     dispatchRef.current = dispatch;
//   }, [dispatch]);

//   /* ===========================
//      CURRENT QUESTION
//   =========================== */
//   const currentQuestion =
//     questions && questions.length > 0 ? questions[currentIndex] : null;

//   /* ===========================
//      CHECK ATTEMPT REMAINING
//   =========================== */
//   useEffect(() => {
//     if (attempt && attempt.attempts_remaining === 0) {
//       alert(
//         t("quiz.noAttemptsLeft") ||
//           "No attempts left! You have exhausted all your attempts.",
//       );
//       navigate(-1);
//     }
//   }, [attempt, navigate, t]);

//   /* ===========================
//      START ATTEMPT ON MOUNT
//   =========================== */
//   useEffect(() => {
//     if (topicId) {
//       dispatch(startAttempt(topicId));
//     }
//   }, [dispatch, topicId]);

//   /* ===========================
//      FETCH QUESTIONS AFTER ATTEMPT
//   =========================== */
//   useEffect(() => {
//     if (attempt?.attempt_id && topicId && attempt?.attempts_remaining > 0) {
//       dispatch(
//         fetchQuestions({
//           topicId,
//           attemptId: attempt.attempt_id,
//         }),
//       );
//     }
//   }, [attempt, topicId, dispatch]);

//   /* ===========================
//      INITIALIZE COUNTDOWN TIMER
//   =========================== */
//   useEffect(() => {
//     if (attempt?.duration && attempt?.attempts_remaining > 0) {
//       const durationInSeconds = attempt.duration * 60;
//       setTimeLeft(durationInSeconds);
//     }
//   }, [attempt?.duration, attempt?.attempts_remaining]);

//   /* ===========================
//      AUTO SUBMIT FUNCTION
//   =========================== */
//   const performAutoSubmit = useCallback(
//     async (shouldNavigate = true, targetPath = null) => {
//       if (hasAutoSubmittedRef.current) return;

//       setHasAutoSubmitted(true);

//       console.log("Auto-submitting quiz...");

//       try {
//         const currentAttempt = attemptRef.current;
//         const currentTopicId = topicIdRef.current;
//         const currentSelected = selectedRef.current;
//         const currentQues = questionsRef.current?.[currentIndexRef.current];
//         const currentDispatch = dispatchRef.current;

//         // Submit current question if answer is selected and not yet submitted
//         if (
//           currentSelected &&
//           currentQues &&
//           currentQues.selected_option_id === null &&
//           currentAttempt?.attempt_id
//         ) {
//           await currentDispatch(
//             submitAnswer({
//               attemptId: currentAttempt.attempt_id,
//               questionId: currentQues.id,
//               optionId: currentSelected,
//             }),
//           ).unwrap();
//         }

//         // Submit entire quiz
//         if (currentAttempt?.attempt_id && currentTopicId) {
//           await currentDispatch(
//             submitQuiz({
//               attemptId: currentAttempt.attempt_id,
//               topicId: currentTopicId,
//             }),
//           ).unwrap();
//         }

//         console.log("Quiz auto-submitted successfully");
//       } catch (error) {
//         console.error("Failed to auto-submit quiz:", error);
//       } finally {
//         if (shouldNavigate) {
//           const currentNavigate = navigateRef.current;
//           if (targetPath) {
//             currentNavigate(targetPath);
//           } else if (attemptRef.current?.attempt_id) {
//             currentNavigate(`/quiz/results/${attemptRef.current.attempt_id}`);
//           } else {
//             currentNavigate(-1);
//           }
//         }
//       }
//     },
//     [],
//   );

//   /* ===========================
//      CUSTOM NAVIGATION BLOCKER
//   =========================== */
//   useEffect(() => {
//     // Store the original pushState and replaceState
//     const originalPushState = window.history.pushState;
//     const originalReplaceState = window.history.replaceState;

//     // Function to check if we should block navigation
//     const shouldBlockNavigation = () => {
//       return (
//         !hasAutoSubmittedRef.current &&
//         attemptRef.current?.attempt_id &&
//         timeLeft > 0 &&
//         !isTimeUp &&
//         !showLeaveModal
//       );
//     };

//     // Show confirmation modal
//     const showConfirmation = (callback) => {
//       if (shouldBlockNavigation()) {
//         setShowLeaveModal(true);
//         // Store the callback to execute after confirmation
//         window.__pendingNavigation = callback;
//         return false;
//       }
//       return true;
//     };

//     // Override pushState
//     window.history.pushState = function (...args) {
//       const result = originalPushState.apply(this, args);
//       return result;
//     };

//     // Override replaceState
//     window.history.replaceState = function (...args) {
//       const result = originalReplaceState.apply(this, args);
//       return result;
//     };

//     // Handle popstate (back/forward buttons)
//     const handlePopState = (event) => {
//       if (shouldBlockNavigation()) {
//         event.preventDefault();
//         setShowLeaveModal(true);
//         window.history.pushState(null, "", window.location.href);
//       }
//     };

//     window.addEventListener("popstate", handlePopState);

//     // Intercept all link clicks
//     const handleLinkClick = (event) => {
//       const target = event.target.closest("a");
//       if (target && target.href && target.href !== window.location.href) {
//         const isInternalLink = target.href.startsWith(window.location.origin);

//         if (isInternalLink && shouldBlockNavigation()) {
//           event.preventDefault();
//           event.stopPropagation();
//           setShowLeaveModal(true);
//           window.__pendingNavigation = () => {
//             window.location.href = target.href;
//           };
//           return false;
//         }
//       }
//     };

//     document.addEventListener("click", handleLinkClick, true);

//     return () => {
//       window.history.pushState = originalPushState;
//       window.history.replaceState = originalReplaceState;
//       window.removeEventListener("popstate", handlePopState);
//       document.removeEventListener("click", handleLinkClick, true);
//       delete window.__pendingNavigation;
//     };
//   }, [timeLeft, isTimeUp, showLeaveModal]);

//   /* ===========================
//      HANDLE CONFIRM LEAVE
//   =========================== */
//   const handleConfirmLeave = async () => {
//     setShowLeaveModal(false);
//     await performAutoSubmit(true);

//     // Execute pending navigation if any
//     if (window.__pendingNavigation) {
//       window.__pendingNavigation();
//       delete window.__pendingNavigation;
//     }
//   };

//   /* ===========================
//      HANDLE CANCEL LEAVE
//   =========================== */
//   const handleCancelLeave = () => {
//     setShowLeaveModal(false);
//     delete window.__pendingNavigation;
//   };

//   /* ===========================
//      COUNTDOWN TIMER LOGIC
//   =========================== */
//   useEffect(() => {
//     if (timeLeft === null || timeLeft <= 0 || isTimeUp || hasAutoSubmitted)
//       return;

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           setIsTimeUp(true);
//           performAutoSubmit(true);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft, isTimeUp, hasAutoSubmitted, performAutoSubmit]);

//   /* ===========================
//      HANDLE BROWSER REFRESH/CLOSE
//   =========================== */
//   useEffect(() => {
//     const handleBeforeUnload = (e) => {
//       if (
//         !hasAutoSubmittedRef.current &&
//         attemptRef.current?.attempt_id &&
//         timeLeft > 0 &&
//         !isTimeUp
//       ) {
//         e.preventDefault();
//         e.returnValue =
//           t("quiz.leaveWarning") ||
//           "You have an ongoing quiz! Are you sure you want to leave?";
//         performAutoSubmit(false);
//         return e.returnValue;
//       }
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);
//     return () => window.removeEventListener("beforeunload", handleBeforeUnload);
//   }, [timeLeft, isTimeUp, performAutoSubmit, t]);

//   /* ===========================
//      FORMAT TIME DISPLAY
//   =========================== */
//   const formatTime = (seconds) => {
//     if (!seconds && seconds !== 0) return "00:00";
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
//   };

//   /* ===========================
//      GET TIMER COLOR
//   =========================== */
//   const getTimerColor = () => {
//     if (!timeLeft) return "text-gray-600";
//     if (timeLeft <= 60) return "text-red-600";
//     if (timeLeft <= 300) return "text-orange-600";
//     return "text-blue-600";
//   };

//   /* ===========================
//      SUBMIT CURRENT QUESTION ANSWER
//   =========================== */
//   const submitCurrentAnswer = async () => {
//     if (!currentQuestion) return;

//     if (currentQuestion.selected_option_id !== null) {
//       return;
//     }

//     if (
//       selected &&
//       currentQuestion &&
//       attempt?.attempt_id &&
//       !isSubmitting &&
//       !isTimeUp &&
//       !hasAutoSubmitted
//     ) {
//       setIsSubmitting(true);
//       try {
//         const result = await dispatch(
//           submitAnswer({
//             attemptId: attempt.attempt_id,
//             questionId: currentQuestion.id,
//             optionId: selected,
//           }),
//         ).unwrap();

//         console.log("Answer submitted successfully:", result);

//         setAnswers((prev) => ({
//           ...prev,
//           [currentQuestion.id]: selected,
//         }));

//         return result;
//       } catch (error) {
//         console.error("Failed to submit answer:", error);
//       } finally {
//         setIsSubmitting(false);
//       }
//     }
//     return null;
//   };

//   /* ===========================
//      SKIP CURRENT QUESTION
//   =========================== */
//   const skipCurrentQuestion = async () => {
//     if (!currentQuestion) return;

//     if (currentQuestion.selected_option_id !== null) {
//       return;
//     }

//     if (
//       currentQuestion &&
//       attempt?.attempt_id &&
//       !isSubmitting &&
//       !isTimeUp &&
//       !hasAutoSubmitted
//     ) {
//       setIsSubmitting(true);
//       try {
//         const result = await dispatch(
//           skipQuestion({
//             attemptId: attempt.attempt_id,
//             questionId: currentQuestion.id,
//           }),
//         ).unwrap();

//         console.log("Question skipped successfully:", result);

//         setSelected("");
//         setAnswers((prev) => ({
//           ...prev,
//           [currentQuestion.id]: null,
//         }));

//         return result;
//       } catch (error) {
//         console.error("Failed to skip question:", error);
//       } finally {
//         setIsSubmitting(false);
//       }
//     }
//     return null;
//   };

//   /* ===========================
//      HANDLE ANSWER SELECTION
//   =========================== */
//   const handleAnswerSelect = (optionId) => {
//     if (isTimeUp || hasAutoSubmitted) return;
//     if (selected === optionId) {
//       setSelected("");
//     } else {
//       setSelected(optionId);
//     }
//   };

//   /* ===========================
//      HANDLE PREVIOUS BUTTON
//   =========================== */
//   const handlePrevious = async () => {
//     if (currentIndex > 0 && !isTimeUp && !hasAutoSubmitted) {
//       await submitCurrentAnswer();
//       setCurrentIndex((prev) => prev - 1);
//       setSelected("");
//     }
//   };

//   /* ===========================
//      HANDLE NEXT BUTTON
//   =========================== */
//   const handleNext = async () => {
//     if (currentIndex < questions.length - 1 && !isTimeUp && !hasAutoSubmitted) {
//       await submitCurrentAnswer();
//       setCurrentIndex((prev) => prev + 1);
//       setSelected("");
//     }
//   };

//   /* ===========================
//      HANDLE SKIP BUTTON
//   =========================== */
//   const handleSkip = async () => {
//     if (currentIndex < questions.length - 1 && !isTimeUp && !hasAutoSubmitted) {
//       await skipCurrentQuestion();
//       setCurrentIndex((prev) => prev + 1);
//       setSelected("");
//     }
//   };

//   /* ===========================
//      HANDLE FINAL SUBMIT
//   =========================== */
//   const handleFinalSubmit = async () => {
//     if (isTimeUp || hasAutoSubmitted) return;

//     if (attempt?.attempt_id && topicId && !isSubmitting) {
//       if (
//         selected &&
//         currentQuestion &&
//         currentQuestion.selected_option_id === null
//       ) {
//         await submitCurrentAnswer();
//       }

//       setIsSubmitting(true);
//       try {
//         const result = await dispatch(
//           submitQuiz({
//             attemptId: attempt.attempt_id,
//             topicId: topicId,
//           }),
//         ).unwrap();

//         console.log("Quiz submitted successfully:", result);
//         setHasAutoSubmitted(true);
//         navigate(`/quiz/result/${topicId}/${attempt.attempt_id}`, {
//           state: { results: result },
//         });
//       } catch (error) {
//         console.error("Failed to submit quiz:", error);
//       } finally {
//         setIsSubmitting(false);
//       }
//     }
//   };

//   /* ===========================
//      HANDLE MANUAL LEAVE BUTTON
//   =========================== */
//   const handleManualLeave = () => {
//     setShowLeaveModal(true);
//   };

//   /* ===========================
//      RESTORE SELECTED ANSWER
//   =========================== */
//   useEffect(() => {
//     if (currentQuestion) {
//       if (currentQuestion.selected_option_id !== null) {
//         setSelected(currentQuestion.selected_option_id);
//       } else {
//         const savedAnswer = answers[currentQuestion.id] || "";
//         setSelected(savedAnswer);
//       }
//     }
//   }, [currentIndex, currentQuestion, answers]);

//   // ===========================
//   // CONFIRMATION MODAL COMPONENT (Inline)
//   // ===========================
//   const ConfirmationModal = () => {
//     if (!showLeaveModal) return null;

//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
//         {/* Backdrop */}
//         <div
//           className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-all"
//           onClick={handleCancelLeave}
//         />

//         {/* Modal */}
//         <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all animate-slideUp">
//           {/* Close button */}
//           <button
//             onClick={handleCancelLeave}
//             className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
//           >
//             <FiX className="w-5 h-5" />
//           </button>

//           {/* Content */}
//           <div className="p-6">
//             {/* Icon */}
//             <div className="flex justify-center mb-4">
//               <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center animate-pulse">
//                 <FiAlertTriangle className="w-8 h-8 text-orange-600" />
//               </div>
//             </div>

//             {/* Title */}
//             <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
//               Leave Quiz?
//             </h3>

//             {/* Message */}
//             <p className="text-gray-600 text-center mb-6">
//               You have an ongoing quiz. If you leave now, your quiz will be
//               auto-submitted.
//               <span className="block mt-2 text-sm text-orange-600 font-medium">
//                 Your progress will be saved.
//               </span>
//             </p>

//             {/* Timer info */}
//             {timeLeft > 0 && !isTimeUp && (
//               <div className="mb-6 p-3 bg-gray-50 rounded-lg text-center">
//                 <span className="text-sm text-gray-600">Time remaining: </span>
//                 <span className="font-mono font-bold text-blue-600">
//                   {formatTime(timeLeft)}
//                 </span>
//               </div>
//             )}

//             {/* Buttons */}
//             <div className="flex gap-3">
//               <button
//                 onClick={handleCancelLeave}
//                 className="flex-1 px-4 py-2.5 border-2 border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleConfirmLeave}
//                 className="flex-1 px-4 py-2.5 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition-all shadow-md hover:shadow-lg"
//               >
//                 Leave & Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Add CSS animations
//   useEffect(() => {
//     const style = document.createElement("style");
//     style.textContent = `
//       @keyframes fadeIn {
//         from { opacity: 0; }
//         to { opacity: 1; }
//       }
//       @keyframes slideUp {
//         from {
//           opacity: 0;
//           transform: translateY(20px);
//         }
//         to {
//           opacity: 1;
//           transform: translateY(0);
//         }
//       }
//       .animate-fadeIn {
//         animation: fadeIn 0.2s ease-out;
//       }
//       .animate-slideUp {
//         animation: slideUp 0.3s ease-out;
//       }
//     `;
//     document.head.appendChild(style);
//     return () => {
//       document.head.removeChild(style);
//     };
//   }, []);

//   // Show loader while checking attempts
//   if (isLoading || !attempt) {
//     return (
//       <PageLayout>
//         <div className="flex justify-center items-center min-h-[60vh]">
//           <Loader />
//         </div>
//       </PageLayout>
//     );
//   }

//   // Show no attempts left message
//   if (attempt.attempts_remaining === 0) {
//     return (
//       <PageLayout>
//         <PageHeader>
//           <PageHeaderLeft>
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-red-50 rounded-lg">
//                 <FiAlertCircle className="w-6 h-6 text-red-600" />
//               </div>
//               <div>
//                 <PageTitle>
//                   {t("quiz.noAttemptsTitle") || "No Attempts Left"}
//                 </PageTitle>
//                 <PageSubtitle>
//                   {t("quiz.noAttemptsSubtitle") ||
//                     "You have exhausted all your attempts for this quiz"}
//                 </PageSubtitle>
//               </div>
//             </div>
//           </PageHeaderLeft>
//         </PageHeader>
//         <PageBody>
//           <div className="max-w-3xl mx-auto px-4">
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
//               <FiAlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                 {t("quiz.noAttemptsHeading") || "No Attempts Remaining"}
//               </h3>
//               <p className="text-gray-600 mb-6">
//                 {t("quiz.noAttemptsMessage") ||
//                   `You have used all ${attempt.total_attempts_allowed} attempts for this quiz.`}
//               </p>
//               <button
//                 onClick={() => navigate(-1)}
//                 className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//               >
//                 {t("quiz.goBack") || "Go Back"}
//               </button>
//             </div>
//           </div>
//         </PageBody>
//       </PageLayout>
//     );
//   }

//   return (
//     <>
//       <PageLayout>
//         <PageHeader>
//           <PageHeaderLeft>
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-blue-50 rounded-lg">
//                 <FiHelpCircle className="w-6 h-6 text-blue-600" />
//               </div>
//               <div>
//                 <PageTitle>{t("quiz.pageTitle") || "Quiz"}</PageTitle>
//                 <PageSubtitle>
//                   {t("quiz.pageSubtitle") || "Test your knowledge"}
//                 </PageSubtitle>
//               </div>
//             </div>
//           </PageHeaderLeft>

//           <div className="flex items-center gap-3">
//             {/* Countdown Timer */}
//             <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
//               <FiClock className={`w-5 h-5 ${getTimerColor()}`} />
//               <div className="text-center">
//                 <div
//                   className={`text-sm font-mono font-bold ${getTimerColor()}`}
//                 >
//                   {formatTime(timeLeft)}
//                 </div>
//                 <div className="text-xs text-gray-500">
//                   {t("quiz.timeLeft") || "Time Left"}
//                 </div>
//               </div>
//             </div>

//             {/* Manual Leave Button */}
//             <button
//               onClick={handleManualLeave}
//               className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
//             >
//               <FiLogOut className="w-4 h-4" />
//               <span className="text-sm font-medium">Exit Quiz</span>
//             </button>
//           </div>
//         </PageHeader>

//         <PageBody>
//           <div className="max-w-3xl mx-auto px-4">
//             {/* Topic Details Section */}
//             {attempt && (
//               <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-4">
//                 <div className="flex items-start gap-3">
//                   <div className="p-2 bg-white rounded-lg shadow-sm">
//                     <FiBookOpen className="w-5 h-5 text-blue-600" />
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
//                       <h3 className="font-semibold text-gray-800">
//                         {t("quiz.topicDetails") || "Topic Details"}
//                       </h3>
//                       <div className="flex items-center gap-3 text-sm">
//                         <span className="text-gray-600">
//                           {t("quiz.attempts") || "Attempts"}:{" "}
//                           <span className="font-semibold">
//                             {attempt.attempts_used}
//                           </span>{" "}
//                           / {attempt.total_attempts_allowed}
//                         </span>
//                         <span className="text-gray-600">
//                           {t("quiz.remaining") || "Remaining"}:{" "}
//                           <span className="font-semibold text-green-600">
//                             {attempt.attempts_remaining}
//                           </span>
//                         </span>
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
//                       <div className="flex items-center gap-2">
//                         <FiInfo className="w-4 h-4 text-gray-500" />
//                         <span className="text-gray-600">
//                           {t("quiz.duration") || "Duration"}:
//                         </span>
//                         <span className="font-medium text-gray-800">
//                           {attempt.duration} {t("quiz.minutes") || "minutes"}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <FiClock className="w-4 h-4 text-gray-500" />
//                         <span className="text-gray-600">
//                           {t("quiz.startedAt") || "Started at"}:
//                         </span>
//                         <span className="font-medium text-gray-800">
//                           {new Date(attempt.started_at).toLocaleTimeString()}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <FiAlertCircle className="w-4 h-4 text-gray-500" />
//                         <span className="text-gray-600">
//                           {t("quiz.expiresAt") || "Expires at"}:
//                         </span>
//                         <span className="font-medium text-gray-800">
//                           {new Date(attempt.expires_at).toLocaleTimeString()}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <FiHelpCircle className="w-4 h-4 text-gray-500" />
//                         <span className="text-gray-600">
//                           {t("quiz.attemptId") || "Attempt ID"}:
//                         </span>
//                         <span className="font-medium text-gray-800">
//                           #{attempt.attempt_id}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Time Up Warning Banner */}
//             {isTimeUp && (
//               <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 animate-pulse">
//                 <div className="flex items-center gap-2">
//                   <FiAlertCircle className="w-5 h-5 text-red-600" />
//                   <span className="text-red-700 font-medium">
//                     {t("quiz.timeUpWarning") ||
//                       "Time's up! Auto-submitting your quiz..."}
//                   </span>
//                 </div>
//               </div>
//             )}

//             {currentQuestion ? (
//               <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//                 {/* Question Counter & Timer Bar */}
//                 <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm text-gray-600">
//                       {t("quiz.questionOf", {
//                         current: currentIndex + 1,
//                         total: questions.length,
//                       }) ||
//                         `Question ${currentIndex + 1} of ${questions.length}`}
//                     </span>
//                     <div className="flex gap-2">
//                       {selected && !isTimeUp && !hasAutoSubmitted && (
//                         <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
//                           ✓ Answer Selected
//                         </span>
//                       )}
//                       {answers[currentQuestion.id] === null && (
//                         <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
//                           ⏭ Skipped
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   {/* Progress Bar for Time */}
//                   {timeLeft !== null && attempt?.duration && (
//                     <div className="mt-3">
//                       <div className="w-full bg-gray-200 rounded-full h-2">
//                         <div
//                           className={`h-2 rounded-full transition-all duration-1000 ${
//                             timeLeft <= 60
//                               ? "bg-red-500"
//                               : timeLeft <= 300
//                                 ? "bg-orange-500"
//                                 : "bg-blue-500"
//                           }`}
//                           style={{
//                             width: `${(timeLeft / (attempt.duration * 60)) * 100}%`,
//                           }}
//                         />
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Question Content */}
//                 <div className="p-6">
//                   {/* Question Text */}
//                   <div className="mb-6">
//                     <h2 className="text-xl font-semibold text-gray-800">
//                       {currentQuestion.question_text}
//                     </h2>
//                   </div>

//                   {/* Options */}
//                   <div className="space-y-3">
//                     {currentQuestion.options?.map((opt, idx) => {
//                       const isSelected = selected === opt.id;
//                       const isSkipped = answers[currentQuestion.id] === null;

//                       return (
//                         <div
//                           key={opt.id}
//                           onClick={() =>
//                             !isSkipped &&
//                             !isTimeUp &&
//                             !hasAutoSubmitted &&
//                             handleAnswerSelect(opt.id)
//                           }
//                           className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
//                             isSkipped || isTimeUp || hasAutoSubmitted
//                               ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
//                               : isSelected
//                                 ? "border-blue-500 bg-blue-50 shadow-md"
//                                 : "border-gray-200 hover:border-blue-300 hover:bg-gray-50 hover:shadow-sm"
//                           }`}
//                         >
//                           <div className="flex items-center gap-3">
//                             <div
//                               className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
//                                 isSelected
//                                   ? "bg-blue-500 text-white"
//                                   : "bg-gray-100 text-gray-500"
//                               }`}
//                             >
//                               {isSelected ? (
//                                 <FiCheckCircle className="w-4 h-4" />
//                               ) : (
//                                 <span className="text-sm font-medium">
//                                   {String.fromCharCode(65 + idx)}
//                                 </span>
//                               )}
//                             </div>
//                             <span className="text-gray-700 flex-1">
//                               {opt.text}
//                             </span>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>

//                   {/* Navigation Buttons */}
//                   <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200">
//                     <button
//                       disabled={
//                         currentIndex === 0 ||
//                         isSubmitting ||
//                         isTimeUp ||
//                         hasAutoSubmitted
//                       }
//                       onClick={handlePrevious}
//                       className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                         currentIndex === 0 ||
//                         isSubmitting ||
//                         isTimeUp ||
//                         hasAutoSubmitted
//                           ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                       }`}
//                     >
//                       <FiChevronLeft className="w-4 h-4" />
//                       Previous
//                     </button>

//                     <div className="flex gap-3">
//                       {/* Skip Button */}
//                       <button
//                         onClick={handleSkip}
//                         disabled={
//                           currentIndex === questions.length - 1 ||
//                           isSubmitting ||
//                           isTimeUp ||
//                           hasAutoSubmitted
//                         }
//                         className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                           currentIndex === questions.length - 1 ||
//                           isSubmitting ||
//                           isTimeUp ||
//                           hasAutoSubmitted
//                             ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                             : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                         }`}
//                       >
//                         <FiSkipForward className="w-4 h-4" />
//                         Skip
//                       </button>

//                       {/* Next/Submit Button */}
//                       {currentIndex === questions.length - 1 ? (
//                         <button
//                           onClick={handleFinalSubmit}
//                           disabled={
//                             isSubmitting || isTimeUp || hasAutoSubmitted
//                           }
//                           className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                           <FiCheckCircle className="w-4 h-4" />
//                           {isSubmitting ? "Submitting..." : "Submit Quiz"}
//                         </button>
//                       ) : (
//                         <button
//                           onClick={handleNext}
//                           disabled={
//                             isSubmitting || isTimeUp || hasAutoSubmitted
//                           }
//                           className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                           Next
//                           <FiChevronRight className="w-4 h-4" />
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
//                 <FiAlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
//                 <h3 className="text-base font-medium text-gray-700 mb-1">
//                   No questions available
//                 </h3>
//                 <p className="text-sm text-gray-500">Please try again later.</p>
//               </div>
//             )}
//           </div>
//         </PageBody>
//       </PageLayout>

//       {/* Confirmation Modal */}
//       <ConfirmationModal />
//     </>
//   );
// };

// export default Quiz;

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  PageBody,
  PageHeader,
  PageHeaderLeft,
  PageLayout,
  PageSubtitle,
  PageTitle,
} from "../../common/layout";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  startAttempt,
  fetchQuestions,
  submitAnswer,
  skipQuestion,
  submitQuiz,
} from "../../../../redux/slice/quizSlice";
import {
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,
  FiCircle,
  FiAlertCircle,
  FiHelpCircle,
  FiSkipForward,
  FiClock,
  FiInfo,
  FiBookOpen,
  FiLogOut,
  FiX,
  FiAlertTriangle,
} from "react-icons/fi";
import Loader from "../../common/Loader";
import { useTranslation } from "react-i18next";

const Quiz = () => {
  const navigate = useNavigate();
  const { topicId } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { attempt, questions, isLoading } = useSelector((state) => state.quiz);

  const [selected, setSelected] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAutoSubmitted, setHasAutoSubmitted] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState(null);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // Refs to avoid stale closures
  const attemptRef = useRef(attempt);
  const topicIdRef = useRef(topicId);
  const selectedRef = useRef(selected);
  const currentIndexRef = useRef(currentIndex);
  const questionsRef = useRef(questions);
  const hasAutoSubmittedRef = useRef(hasAutoSubmitted);
  const navigateRef = useRef(navigate);
  const dispatchRef = useRef(dispatch);
  const isTimeUpRef = useRef(isTimeUp);
  const timeLeftRef = useRef(timeLeft);

  // Update refs when state changes
  useEffect(() => {
    attemptRef.current = attempt;
  }, [attempt]);

  useEffect(() => {
    topicIdRef.current = topicId;
  }, [topicId]);

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    questionsRef.current = questions;
  }, [questions]);

  useEffect(() => {
    hasAutoSubmittedRef.current = hasAutoSubmitted;
  }, [hasAutoSubmitted]);

  useEffect(() => {
    navigateRef.current = navigate;
  }, [navigate]);

  useEffect(() => {
    dispatchRef.current = dispatch;
  }, [dispatch]);

  useEffect(() => {
    isTimeUpRef.current = isTimeUp;
  }, [isTimeUp]);

  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  /* ===========================
     CURRENT QUESTION
  =========================== */
  const currentQuestion =
    questions && questions.length > 0 ? questions[currentIndex] : null;

  /* ===========================
     CHECK ATTEMPT REMAINING
  =========================== */
  useEffect(() => {
    if (attempt && attempt.attempts_remaining === 0) {
      alert(
        t("quiz.noAttemptsLeft") ||
          "No attempts left! You have exhausted all your attempts.",
      );
      navigate(-1);
    }
  }, [attempt, navigate, t]);

  /* ===========================
     START ATTEMPT ON MOUNT
  =========================== */
  useEffect(() => {
    if (topicId) {
      dispatch(startAttempt(topicId));
    }
  }, [dispatch, topicId]);

  /* ===========================
     FETCH QUESTIONS AFTER ATTEMPT
  =========================== */
  useEffect(() => {
    if (attempt?.attempt_id && topicId && attempt?.attempts_remaining > 0) {
      dispatch(
        fetchQuestions({
          topicId,
          attemptId: attempt.attempt_id,
        }),
      );
    }
  }, [attempt, topicId, dispatch]);

  /* ===========================
     INITIALIZE COUNTDOWN TIMER
  =========================== */
  useEffect(() => {
    if (attempt?.duration && attempt?.attempts_remaining > 0) {
      const durationInSeconds = attempt.duration * 60;
      setTimeLeft(durationInSeconds);
    }
  }, [attempt?.duration, attempt?.attempts_remaining]);

  /* ===========================
     AUTO SUBMIT FUNCTION
  =========================== */
  const performAutoSubmit = useCallback(
    async (shouldNavigate = true, targetPath = null) => {
      if (hasAutoSubmittedRef.current) return;

      setHasAutoSubmitted(true);

      console.log("Auto-submitting quiz...");

      try {
        const currentAttempt = attemptRef.current;
        const currentTopicId = topicIdRef.current;
        const currentSelected = selectedRef.current;
        const currentQues = questionsRef.current?.[currentIndexRef.current];
        const currentDispatch = dispatchRef.current;

        // Submit current question if answer is selected and not yet submitted
        if (
          currentSelected &&
          currentQues &&
          currentQues.selected_option_id === null &&
          currentAttempt?.attempt_id
        ) {
          await currentDispatch(
            submitAnswer({
              attemptId: currentAttempt.attempt_id,
              questionId: currentQues.id,
              optionId: currentSelected,
            }),
          ).unwrap();
        }

        // Submit entire quiz
        if (currentAttempt?.attempt_id && currentTopicId) {
          await currentDispatch(
            submitQuiz({
              attemptId: currentAttempt.attempt_id,
              topicId: currentTopicId,
            }),
          ).unwrap();
        }

        console.log("Quiz auto-submitted successfully");
      } catch (error) {
        console.error("Failed to auto-submit quiz:", error);
      } finally {
        if (shouldNavigate) {
          const currentNavigate = navigateRef.current;
          if (targetPath) {
            currentNavigate(targetPath);
          } else if (attemptRef.current?.attempt_id) {
            currentNavigate(`/quiz/results/${attemptRef.current.attempt_id}`);
          } else {
            currentNavigate(-1);
          }
        }
      }
    },
    [],
  );

  /* ===========================
     CUSTOM NAVIGATION BLOCKER - FIXED VERSION
  =========================== */
  useEffect(() => {
    // Don't add blocker if quiz is already completed
    if (
      hasAutoSubmittedRef.current ||
      isTimeUpRef.current ||
      !attemptRef.current?.attempt_id
    ) {
      return;
    }

    // Function to check if we should block navigation
    const shouldBlockNavigation = () => {
      return (
        !hasAutoSubmittedRef.current &&
        attemptRef.current?.attempt_id &&
        timeLeftRef.current > 0 &&
        !isTimeUpRef.current &&
        !showLeaveModal
      );
    };

    // Handle popstate (back/forward buttons)
    const handlePopState = (event) => {
      if (shouldBlockNavigation()) {
        // Push current state again to prevent navigation
        window.history.pushState(null, "", window.location.href);
        // Show modal
        setShowLeaveModal(true);
        event.preventDefault();
      }
    };

    // Add popstate event listener
    window.addEventListener("popstate", handlePopState);

    // Push initial state to handle back button
    window.history.pushState(null, "", window.location.href);

    // Cleanup
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [showLeaveModal]); // Only depend on showLeaveModal

  /* ===========================
     HANDLE CONFIRM LEAVE
  =========================== */
  const handleConfirmLeave = async () => {
    setShowLeaveModal(false);
    await performAutoSubmit(true);
  };

  /* ===========================
     HANDLE CANCEL LEAVE
  =========================== */
  const handleCancelLeave = () => {
    setShowLeaveModal(false);
  };

  /* ===========================
     COUNTDOWN TIMER LOGIC
  =========================== */
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || isTimeUp || hasAutoSubmitted)
      return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimeUp(true);
          performAutoSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isTimeUp, hasAutoSubmitted, performAutoSubmit]);

  /* ===========================
     HANDLE BROWSER REFRESH/CLOSE
  =========================== */
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (
        !hasAutoSubmittedRef.current &&
        attemptRef.current?.attempt_id &&
        timeLeftRef.current > 0 &&
        !isTimeUpRef.current
      ) {
        e.preventDefault();
        e.returnValue =
          t("quiz.leaveWarning") ||
          "You have an ongoing quiz! Are you sure you want to leave?";
        performAutoSubmit(false);
        return e.returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [performAutoSubmit, t]);

  /* ===========================
     FORMAT TIME DISPLAY
  =========================== */
  const formatTime = (seconds) => {
    if (!seconds && seconds !== 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  /* ===========================
     GET TIMER COLOR
  =========================== */
  const getTimerColor = () => {
    if (!timeLeft) return "text-gray-600";
    if (timeLeft <= 60) return "text-red-600";
    if (timeLeft <= 300) return "text-orange-600";
    return "text-blue-600";
  };

  /* ===========================
     SUBMIT CURRENT QUESTION ANSWER
  =========================== */
  const submitCurrentAnswer = async () => {
    if (!currentQuestion) return;

    if (currentQuestion.selected_option_id !== null) {
      return;
    }

    if (
      selected &&
      currentQuestion &&
      attempt?.attempt_id &&
      !isSubmitting &&
      !isTimeUp &&
      !hasAutoSubmitted
    ) {
      setIsSubmitting(true);
      try {
        const result = await dispatch(
          submitAnswer({
            attemptId: attempt.attempt_id,
            questionId: currentQuestion.id,
            optionId: selected,
          }),
        ).unwrap();

        console.log("Answer submitted successfully:", result);

        setAnswers((prev) => ({
          ...prev,
          [currentQuestion.id]: selected,
        }));

        return result;
      } catch (error) {
        console.error("Failed to submit answer:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
    return null;
  };

  /* ===========================
     SKIP CURRENT QUESTION
  =========================== */
  const skipCurrentQuestion = async () => {
    if (!currentQuestion) return;

    if (currentQuestion.selected_option_id !== null) {
      return;
    }

    if (
      currentQuestion &&
      attempt?.attempt_id &&
      !isSubmitting &&
      !isTimeUp &&
      !hasAutoSubmitted
    ) {
      setIsSubmitting(true);
      try {
        const result = await dispatch(
          skipQuestion({
            attemptId: attempt.attempt_id,
            questionId: currentQuestion.id,
          }),
        ).unwrap();

        console.log("Question skipped successfully:", result);

        setSelected("");
        setAnswers((prev) => ({
          ...prev,
          [currentQuestion.id]: null,
        }));

        return result;
      } catch (error) {
        console.error("Failed to skip question:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
    return null;
  };

  /* ===========================
     HANDLE ANSWER SELECTION
  =========================== */
  const handleAnswerSelect = (optionId) => {
    if (isTimeUp || hasAutoSubmitted) return;
    if (selected === optionId) {
      setSelected("");
    } else {
      setSelected(optionId);
    }
  };

  /* ===========================
     HANDLE PREVIOUS BUTTON
  =========================== */
  const handlePrevious = async () => {
    if (currentIndex > 0 && !isTimeUp && !hasAutoSubmitted) {
      await submitCurrentAnswer();
      setCurrentIndex((prev) => prev - 1);
      setSelected("");
    }
  };

  /* ===========================
     HANDLE NEXT BUTTON
  =========================== */
  const handleNext = async () => {
    if (currentIndex < questions.length - 1 && !isTimeUp && !hasAutoSubmitted) {
      await submitCurrentAnswer();
      setCurrentIndex((prev) => prev + 1);
      setSelected("");
    }
  };

  /* ===========================
     HANDLE SKIP BUTTON
  =========================== */
  const handleSkip = async () => {
    if (currentIndex < questions.length - 1 && !isTimeUp && !hasAutoSubmitted) {
      await skipCurrentQuestion();
      setCurrentIndex((prev) => prev + 1);
      setSelected("");
    }
  };

  /* ===========================
     HANDLE FINAL SUBMIT
  =========================== */
  const handleFinalSubmit = async () => {
    if (isTimeUp || hasAutoSubmitted) return;

    if (attempt?.attempt_id && topicId && !isSubmitting) {
      if (
        selected &&
        currentQuestion &&
        currentQuestion.selected_option_id === null
      ) {
        await submitCurrentAnswer();
      }

      setIsSubmitting(true);
      try {
        const result = await dispatch(
          submitQuiz({
            attemptId: attempt.attempt_id,
            topicId: topicId,
          }),
        ).unwrap();

        console.log("Quiz submitted successfully:", result);
        setHasAutoSubmitted(true);
        navigate(`/quiz/result/${topicId}/${attempt.attempt_id}`, {
          state: { results: result },
        });
      } catch (error) {
        console.error("Failed to submit quiz:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  /* ===========================
     HANDLE MANUAL LEAVE BUTTON
  =========================== */
  const handleManualLeave = () => {
    setShowLeaveModal(true);
  };

  /* ===========================
     RESTORE SELECTED ANSWER
  =========================== */
  useEffect(() => {
    if (currentQuestion) {
      if (currentQuestion.selected_option_id !== null) {
        setSelected(currentQuestion.selected_option_id);
      } else {
        const savedAnswer = answers[currentQuestion.id] || "";
        setSelected(savedAnswer);
      }
    }
  }, [currentIndex, currentQuestion, answers]);

  // ===========================
  // CONFIRMATION MODAL COMPONENT (Inline)
  // ===========================
  const ConfirmationModal = () => {
    if (!showLeaveModal) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-all"
          onClick={handleCancelLeave}
        />

        {/* Modal */}
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all animate-slideUp">
          {/* Close button */}
          <button
            onClick={handleCancelLeave}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <FiX className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="p-6">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center animate-pulse">
                <FiAlertTriangle className="w-8 h-8 text-orange-600" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
              Leave Quiz?
            </h3>

            {/* Message */}
            <p className="text-gray-600 text-center mb-6">
              You have an ongoing quiz. If you leave now, your quiz will be
              auto-submitted.
              <span className="block mt-2 text-sm text-orange-600 font-medium">
                Your progress will be saved.
              </span>
            </p>

            {/* Timer info */}
            {timeLeft > 0 && !isTimeUp && (
              <div className="mb-6 p-3 bg-gray-50 rounded-lg text-center">
                <span className="text-sm text-gray-600">Time remaining: </span>
                <span className="font-mono font-bold text-blue-600">
                  {formatTime(timeLeft)}
                </span>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCancelLeave}
                className="flex-1 px-4 py-2.5 border-2 border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLeave}
                className="flex-1 px-4 py-2.5 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition-all shadow-md hover:shadow-lg"
              >
                Leave & Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Add CSS animations
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from { 
          opacity: 0;
          transform: translateY(20px);
        }
        to { 
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-fadeIn {
        animation: fadeIn 0.2s ease-out;
      }
      .animate-slideUp {
        animation: slideUp 0.3s ease-out;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Show loader while checking attempts
  if (isLoading || !attempt) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader />
        </div>
      </PageLayout>
    );
  }

  // Show no attempts left message
  if (attempt.attempts_remaining === 0) {
    return (
      <PageLayout>
        <PageHeader>
          <PageHeaderLeft>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 rounded-lg">
                <FiAlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <PageTitle>
                  {t("quiz.noAttemptsTitle") || "No Attempts Left"}
                </PageTitle>
                <PageSubtitle>
                  {t("quiz.noAttemptsSubtitle") ||
                    "You have exhausted all your attempts for this quiz"}
                </PageSubtitle>
              </div>
            </div>
          </PageHeaderLeft>
        </PageHeader>
        <PageBody>
          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <FiAlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {t("quiz.noAttemptsHeading") || "No Attempts Remaining"}
              </h3>
              <p className="text-gray-600 mb-6">
                {t("quiz.noAttemptsMessage") ||
                  `You have used all ${attempt.total_attempts_allowed} attempts for this quiz.`}
              </p>
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {t("quiz.goBack") || "Go Back"}
              </button>
            </div>
          </div>
        </PageBody>
      </PageLayout>
    );
  }

  return (
    <>
      <PageLayout>
        <PageHeader>
          <PageHeaderLeft>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FiHelpCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <PageTitle>{t("quiz.pageTitle") || "Quiz"}</PageTitle>
                <PageSubtitle>
                  {t("quiz.pageSubtitle") || "Test your knowledge"}
                </PageSubtitle>
              </div>
            </div>
          </PageHeaderLeft>

          <div className="flex items-center gap-3">
            {/* Countdown Timer */}
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <FiClock className={`w-5 h-5 ${getTimerColor()}`} />
              <div className="text-center">
                <div
                  className={`text-sm font-mono font-bold ${getTimerColor()}`}
                >
                  {formatTime(timeLeft)}
                </div>
                <div className="text-xs text-gray-500">
                  {t("quiz.timeLeft") || "Time Left"}
                </div>
              </div>
            </div>

            {/* Manual Leave Button */}
            <button
              onClick={handleManualLeave}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
            >
              <FiLogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Exit Quiz</span>
            </button>
          </div>
        </PageHeader>

        <PageBody>
          <div className="max-w-3xl mx-auto px-4">
            {/* Topic Details Section */}
            {attempt && (
              <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <FiBookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                      <h3 className="font-semibold text-gray-800">
                        {t("quiz.topicDetails") || "Topic Details"}
                      </h3>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-gray-600">
                          {t("quiz.attempts") || "Attempts"}:{" "}
                          <span className="font-semibold">
                            {attempt.attempts_used}
                          </span>{" "}
                          / {attempt.total_attempts_allowed}
                        </span>
                        <span className="text-gray-600">
                          {t("quiz.remaining") || "Remaining"}:{" "}
                          <span className="font-semibold text-green-600">
                            {attempt.attempts_remaining}
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <FiInfo className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">
                          {t("quiz.duration") || "Duration"}:
                        </span>
                        <span className="font-medium text-gray-800">
                          {attempt.duration} {t("quiz.minutes") || "minutes"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiClock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">
                          {t("quiz.startedAt") || "Started at"}:
                        </span>
                        <span className="font-medium text-gray-800">
                          {new Date(attempt.started_at).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiAlertCircle className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">
                          {t("quiz.expiresAt") || "Expires at"}:
                        </span>
                        <span className="font-medium text-gray-800">
                          {new Date(attempt.expires_at).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiHelpCircle className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">
                          {t("quiz.attemptId") || "Attempt ID"}:
                        </span>
                        <span className="font-medium text-gray-800">
                          #{attempt.attempt_id}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Time Up Warning Banner */}
            {isTimeUp && (
              <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 animate-pulse">
                <div className="flex items-center gap-2">
                  <FiAlertCircle className="w-5 h-5 text-red-600" />
                  <span className="text-red-700 font-medium">
                    {t("quiz.timeUpWarning") ||
                      "Time's up! Auto-submitting your quiz..."}
                  </span>
                </div>
              </div>
            )}

            {currentQuestion ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {/* Question Counter & Timer Bar */}
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {t("quiz.questionOf", {
                        current: currentIndex + 1,
                        total: questions.length,
                      }) ||
                        `Question ${currentIndex + 1} of ${questions.length}`}
                    </span>
                    <div className="flex gap-2">
                      {selected && !isTimeUp && !hasAutoSubmitted && (
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          ✓ Answer Selected
                        </span>
                      )}
                      {answers[currentQuestion.id] === null && (
                        <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                          ⏭ Skipped
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar for Time */}
                  {timeLeft !== null && attempt?.duration && (
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            timeLeft <= 60
                              ? "bg-red-500"
                              : timeLeft <= 300
                                ? "bg-orange-500"
                                : "bg-blue-500"
                          }`}
                          style={{
                            width: `${(timeLeft / (attempt.duration * 60)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Question Content */}
                <div className="p-6">
                  {/* Question Text */}
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {currentQuestion.question_text}
                    </h2>
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    {currentQuestion.options?.map((opt, idx) => {
                      const isSelected = selected === opt.id;
                      const isSkipped = answers[currentQuestion.id] === null;

                      return (
                        <div
                          key={opt.id}
                          onClick={() =>
                            !isSkipped &&
                            !isTimeUp &&
                            !hasAutoSubmitted &&
                            handleAnswerSelect(opt.id)
                          }
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                            isSkipped || isTimeUp || hasAutoSubmitted
                              ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
                              : isSelected
                                ? "border-blue-500 bg-blue-50 shadow-md"
                                : "border-gray-200 hover:border-blue-300 hover:bg-gray-50 hover:shadow-sm"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                                isSelected
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {isSelected ? (
                                <FiCheckCircle className="w-4 h-4" />
                              ) : (
                                <span className="text-sm font-medium">
                                  {String.fromCharCode(65 + idx)}
                                </span>
                              )}
                            </div>
                            <span className="text-gray-700 flex-1">
                              {opt.text}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200">
                    <button
                      disabled={
                        currentIndex === 0 ||
                        isSubmitting ||
                        isTimeUp ||
                        hasAutoSubmitted
                      }
                      onClick={handlePrevious}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        currentIndex === 0 ||
                        isSubmitting ||
                        isTimeUp ||
                        hasAutoSubmitted
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <FiChevronLeft className="w-4 h-4" />
                      Previous
                    </button>

                    <div className="flex gap-3">
                      {/* Skip Button */}
                      <button
                        onClick={handleSkip}
                        disabled={
                          currentIndex === questions.length - 1 ||
                          isSubmitting ||
                          isTimeUp ||
                          hasAutoSubmitted
                        }
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          currentIndex === questions.length - 1 ||
                          isSubmitting ||
                          isTimeUp ||
                          hasAutoSubmitted
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <FiSkipForward className="w-4 h-4" />
                        Skip
                      </button>

                      {/* Next/Submit Button */}
                      {currentIndex === questions.length - 1 ? (
                        <button
                          onClick={handleFinalSubmit}
                          disabled={
                            isSubmitting || isTimeUp || hasAutoSubmitted
                          }
                          className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FiCheckCircle className="w-4 h-4" />
                          {isSubmitting ? "Submitting..." : "Submit Quiz"}
                        </button>
                      ) : (
                        <button
                          onClick={handleNext}
                          disabled={
                            isSubmitting || isTimeUp || hasAutoSubmitted
                          }
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next
                          <FiChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <FiAlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-base font-medium text-gray-700 mb-1">
                  No questions available
                </h3>
                <p className="text-sm text-gray-500">Please try again later.</p>
              </div>
            )}
          </div>
        </PageBody>
      </PageLayout>

      {/* Confirmation Modal */}
      <ConfirmationModal />
    </>
  );
};

export default Quiz;

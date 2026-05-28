// import React, { useState, useEffect, useCallback, useRef, memo } from "react";
// import {
//   PageBody,
//   PageHeader,
//   PageHeaderLeft,
//   PageLayout,
//   PageSubtitle,
//   PageTitle,
// } from "../../common/layout";
// import { useNavigate, useParams, useBlocker } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   startAttempt,
//   fetchQuestions,
//   submitAnswer,
//   skipQuestion,
//   submitQuiz,
//   resetFeedbackState,
//   clearQuizData,
// } from "../../../../redux/slice/quizSlice";
// import {
//   FiChevronLeft,
//   FiChevronRight,
//   FiCheckCircle,
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
// import Error from "../../common/Error";
// import ConfirmationModal from "./ConfirmationModal";

// const EXAM_ACTIVE_KEY = "exam_active_attempt";

// const ExamModule = () => {
//   const navigate = useNavigate();
//   const { topicId } = useParams();
//   const dispatch = useDispatch();
//   const { t } = useTranslation();

//   const { attempt, questions, isLoading, isError, message } = useSelector(
//     (state) => state.quiz,
//   );

//   const [selected, setSelected] = useState("");
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [hasAutoSubmitted, setHasAutoSubmitted] = useState(false);
//   const [showLeaveModal, setShowLeaveModal] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(null);
//   const [isTimeUp, setIsTimeUp] = useState(false);
//   const [isInitializing, setIsInitializing] = useState(true);
//   const [isReloadSubmitting, setIsReloadSubmitting] = useState(false);

//   // Refs
//   const attemptRef = useRef(attempt);
//   const topicIdRef = useRef(topicId);
//   const selectedRef = useRef(selected);
//   const currentIndexRef = useRef(currentIndex);
//   const questionsRef = useRef(questions);
//   const hasAutoSubmittedRef = useRef(hasAutoSubmitted);
//   const navigateRef = useRef(navigate);
//   const dispatchRef = useRef(dispatch);
//   const timeLeftRef = useRef(timeLeft);
//   const isTimeUpRef = useRef(isTimeUp);
//   const showLeaveModalRef = useRef(showLeaveModal);

//   // Sync refs
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
//   useEffect(() => {
//     timeLeftRef.current = timeLeft;
//   }, [timeLeft]);
//   useEffect(() => {
//     isTimeUpRef.current = isTimeUp;
//   }, [isTimeUp]);
//   useEffect(() => {
//     showLeaveModalRef.current = showLeaveModal;
//   }, [showLeaveModal]);

//   const shouldBlockNavigation =
//     !hasAutoSubmitted &&
//     !isReloadSubmitting &&
//     !isTimeUp &&
//     !!attempt?.attempt_id &&
//     !attempt?.is_submitted;

//   const blocker = useBlocker(shouldBlockNavigation);

//   useEffect(() => {
//     if (blocker.state === "blocked") {
//       setShowLeaveModal(true);
//     }
//   }, [blocker]);

//   useEffect(() => {
//     if (
//       attempt?.is_submitted ||
//       attempt?.status === "failed" ||
//       attempt?.status === "passed"
//     ) {
//       sessionStorage.removeItem(EXAM_ACTIVE_KEY);
//     }
//   }, [attempt]);

//   useEffect(() => {
//     if (attempt?.attempt_id && attempt?.attempts_remaining > 0) {
//       sessionStorage.setItem(EXAM_ACTIVE_KEY, attempt.attempt_id);
//     }
//   }, [attempt?.attempt_id, attempt?.attempts_remaining]);

//   useEffect(() => {
//     if (attempt && attempt.attempts_remaining === 0) {
//       alert(t("examModule.noAttemptsLeft"));
//       navigate(-1);
//     }
//   }, [attempt, navigate, t]);

//   useEffect(() => {
//     dispatch(clearQuizData());
//     setSelected("");
//     setCurrentIndex(0);
//     setAnswers({});
//     setHasAutoSubmitted(false);
//     setIsTimeUp(false);
//     setShowLeaveModal(false);
//     setTimeLeft(null);
//     sessionStorage.removeItem(EXAM_ACTIVE_KEY);
//   }, [topicId, dispatch]);

//   // Bootstrap
//   useEffect(() => {
//     const initExam = async () => {
//       setIsInitializing(true);
//       if (!topicId) return;
//       dispatch(resetFeedbackState());
//       try {
//         dispatch(clearQuizData());
//         const res = await dispatch(startAttempt(topicId)).unwrap();
//         if (res.attempts_remaining === 0) {
//           console.log("No attempts remaining");
//           return;
//         }
//         console.log(
//           "Valid exam attempt started/resumed with ID:",
//           res.attempt_id,
//         );
//       } catch (err) {
//         console.error("Failed to start exam attempt:", err);
//         if (
//           err?.message?.includes("rate limit") ||
//           err?.response?.status === 429
//         ) {
//           alert("Please wait before starting a new attempt");
//           navigate(-1);
//         }
//       } finally {
//         setIsInitializing(false);
//       }
//     };
//     initExam();
//   }, [dispatch, topicId, navigate]);

//   useEffect(() => {
//     if (
//       attempt?.attempt_id &&
//       topicId &&
//       attempt?.attempts_remaining > 0 &&
//       !attempt?.is_submitted
//     ) {
//       dispatch(
//         fetchQuestions({
//           topicId,
//           attemptId: attempt.attempt_id,
//         }),
//       );
//     }
//   }, [attempt, topicId, dispatch]);

//   useEffect(() => {
//     if (attempt?.duration && attempt?.attempts_remaining > 0) {
//       setTimeLeft(attempt.duration * 60);
//     }
//   }, [attempt?.duration, attempt?.attempts_remaining]);

//   const performAutoSubmit = useCallback(
//     async (shouldNavigate = true, targetPath = null) => {
//       if (hasAutoSubmittedRef.current) return;
//       setHasAutoSubmitted(true);
//       sessionStorage.removeItem(EXAM_ACTIVE_KEY);

//       try {
//         const currentAttempt = attemptRef.current;
//         const currentTopicId = topicIdRef.current;
//         const currentSelected = selectedRef.current;
//         const currentQues = questionsRef.current?.[currentIndexRef.current];
//         const currentDispatch = dispatchRef.current;

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

//         if (currentAttempt?.attempt_id && currentTopicId) {
//           await currentDispatch(
//             submitQuiz({
//               attemptId: currentAttempt.attempt_id,
//               topicId: currentTopicId,
//             }),
//           ).unwrap();
//         }
//       } catch (error) {
//         console.error("Failed to auto-submit exam:", error);
//       } finally {
//         if (shouldNavigate) {
//           const nav = navigateRef.current;
//           if (targetPath) {
//             nav(targetPath);
//           } else if (attemptRef.current?.attempt_id) {
//             nav(`/exam-module/result/${attemptRef.current.attempt_id}`);
//           } else {
//             nav(-1);
//           }
//         }
//       }
//     },
//     [],
//   );

//   useEffect(() => {
//     const handleBeforeUnload = (e) => {
//       if (
//         !hasAutoSubmittedRef.current &&
//         !isTimeUpRef.current &&
//         attemptRef.current?.attempt_id
//       ) {
//         sessionStorage.setItem("exam_refresh_detected", "true");
//         localStorage.setItem(
//           "exam_reload_submit",
//           JSON.stringify({
//             attemptId: attemptRef.current.attempt_id,
//             topicId: topicIdRef.current,
//           }),
//         );
//         e.preventDefault();
//         e.returnValue = "";
//       }
//     };
//     window.addEventListener("beforeunload", handleBeforeUnload);
//     return () => window.removeEventListener("beforeunload", handleBeforeUnload);
//   }, []);

//   useEffect(() => {
//     const refreshDetected =
//       sessionStorage.getItem("exam_refresh_detected") === "true";
//     const pendingExam = localStorage.getItem("exam_reload_submit");

//     if (!refreshDetected || !pendingExam) return;

//     sessionStorage.removeItem("exam_refresh_detected");
//     const data = JSON.parse(pendingExam);
//     localStorage.removeItem("exam_reload_submit");

//     if (data?.attemptId && data?.topicId) {
//       setIsReloadSubmitting(true);
//       setHasAutoSubmitted(true);
//       dispatch(
//         submitQuiz({
//           attemptId: data.attemptId,
//           topicId: data.topicId,
//         }),
//       )
//         .unwrap()
//         .then((result) => {
//           navigate(`/exam-module/result/${data.topicId}/${data.attemptId}`, {
//             state: { results: result },
//           });
//         })
//         .catch((err) => {
//           console.error("Auto submit failed:", err);
//           setIsReloadSubmitting(false);
//         });
//     }
//   }, [dispatch, navigate]);

//   const handleConfirmLeave = useCallback(async () => {
//     setShowLeaveModal(false);
//     sessionStorage.removeItem(EXAM_ACTIVE_KEY);
//     await performAutoSubmit(false);
//     if (blocker.state === "blocked") {
//       blocker.proceed();
//     } else {
//       navigate(-1);
//     }
//   }, [performAutoSubmit, blocker, navigate]);

//   const handleCancelLeave = useCallback(() => {
//     setShowLeaveModal(false);
//     if (blocker.state === "blocked") {
//       blocker.reset();
//     }
//   }, [blocker]);

//   useEffect(() => {
//     if (timeLeft === null || timeLeft <= 0 || isTimeUp || hasAutoSubmitted)
//       return;

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           setIsTimeUp(true);
//           sessionStorage.removeItem(EXAM_ACTIVE_KEY);
//           performAutoSubmit(true);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft, isTimeUp, hasAutoSubmitted, performAutoSubmit]);

//   useEffect(() => {
//     const handler = (e) => {
//       const activeAttempt = sessionStorage.getItem(EXAM_ACTIVE_KEY);
//       if (
//         !hasAutoSubmittedRef.current &&
//         activeAttempt &&
//         !isTimeUpRef.current
//       ) {
//         e.preventDefault();
//         e.returnValue = t("examModule.leaveWarning");
//         return e.returnValue;
//       }
//     };
//     window.addEventListener("beforeunload", handler);
//     return () => window.removeEventListener("beforeunload", handler);
//   }, [t]);

//   const formatTime = (seconds) => {
//     if (!seconds && seconds !== 0) return "00:00";
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
//   };

//   const getTimerColor = () => {
//     if (!timeLeft) return "text-gray-600";
//     if (timeLeft <= 60) return "text-red-600";
//     if (timeLeft <= 300) return "text-orange-600";
//     return "text-blue-600";
//   };

//   const submitCurrentAnswer = async () => {
//     if (
//       !currentQuestion ||
//       currentQuestion.selected_option_id !== null ||
//       !selected ||
//       !attempt?.attempt_id ||
//       isSubmitting ||
//       isTimeUp ||
//       hasAutoSubmitted
//     )
//       return null;

//     setIsSubmitting(true);
//     try {
//       const result = await dispatch(
//         submitAnswer({
//           attemptId: attempt.attempt_id,
//           questionId: currentQuestion.id,
//           optionId: selected,
//         }),
//       ).unwrap();
//       setAnswers((prev) => ({ ...prev, [currentQuestion.id]: selected }));
//       return result;
//     } catch (err) {
//       console.error("Failed to submit answer:", err);
//     } finally {
//       setIsSubmitting(false);
//     }
//     return null;
//   };

//   const skipCurrentQuestion = async () => {
//     if (
//       !currentQuestion ||
//       currentQuestion.selected_option_id !== null ||
//       !attempt?.attempt_id ||
//       isSubmitting ||
//       isTimeUp ||
//       hasAutoSubmitted
//     )
//       return null;

//     setIsSubmitting(true);
//     try {
//       const result = await dispatch(
//         skipQuestion({
//           attemptId: attempt.attempt_id,
//           questionId: currentQuestion.id,
//         }),
//       ).unwrap();
//       setSelected("");
//       setAnswers((prev) => ({ ...prev, [currentQuestion.id]: null }));
//       return result;
//     } catch (err) {
//       console.error("Failed to skip question:", err);
//     } finally {
//       setIsSubmitting(false);
//     }
//     return null;
//   };

//   const handleAnswerSelect = (optionId) => {
//     if (isTimeUp || hasAutoSubmitted) return;
//     setSelected((prev) => (prev === optionId ? "" : optionId));
//   };

//   const handlePrevious = async () => {
//     if (currentIndex > 0 && !isTimeUp && !hasAutoSubmitted) {
//       await submitCurrentAnswer();
//       setCurrentIndex((prev) => prev - 1);
//       setSelected("");
//     }
//   };

//   const handleNext = async () => {
//     if (currentIndex < questions.length - 1 && !isTimeUp && !hasAutoSubmitted) {
//       await submitCurrentAnswer();
//       setCurrentIndex((prev) => prev + 1);
//       setSelected("");
//     }
//   };

//   const handleSkip = async () => {
//     if (currentIndex < questions.length - 1 && !isTimeUp && !hasAutoSubmitted) {
//       await skipCurrentQuestion();
//       setCurrentIndex((prev) => prev + 1);
//       setSelected("");
//     }
//   };

//   const handleFinalSubmit = async () => {
//     if (isTimeUp || hasAutoSubmitted || isSubmitting) return;
//     if (!attempt?.attempt_id || !topicId) return;

//     if (
//       selected &&
//       currentQuestion &&
//       currentQuestion.selected_option_id === null
//     ) {
//       await submitCurrentAnswer();
//     }

//     setIsSubmitting(true);
//     setHasAutoSubmitted(true);
//     try {
//       const result = await dispatch(
//         submitQuiz({ attemptId: attempt.attempt_id, topicId }),
//       ).unwrap();
//       setHasAutoSubmitted(true);
//       sessionStorage.removeItem(EXAM_ACTIVE_KEY);
//       navigate(`/exam-module/result/${topicId}/${attempt.attempt_id}`, {
//         state: { results: result },
//       });
//     } catch (err) {
//       console.error("Failed to submit exam:", err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const currentQuestion =
//     questions && questions.length > 0 ? questions[currentIndex] : null;

//   useEffect(() => {
//     if (!currentQuestion) return;
//     if (currentQuestion.selected_option_id !== null) {
//       setSelected(currentQuestion.selected_option_id);
//     } else {
//       setSelected(answers[currentQuestion.id] || "");
//     }
//   }, [currentIndex, currentQuestion, answers]);

//   // Content protection
//   useEffect(() => {
//     const disableRightClick = (e) => e.preventDefault();
//     const preventCopyActions = (e) => e.preventDefault();
//     const preventKeys = (e) => {
//       const key = e.key.toLowerCase();
//       if (e.ctrlKey && ["c", "a", "u", "s", "p", "x", "v"].includes(key)) {
//         e.preventDefault();
//       }
//       if (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(key)) {
//         e.preventDefault();
//       }
//       if (e.key === "F12") e.preventDefault();
//     };
//     const preventSelection = (e) => e.preventDefault();
//     const preventDrag = (e) => e.preventDefault();

//     document.addEventListener("contextmenu", disableRightClick);
//     document.addEventListener("copy", preventCopyActions);
//     document.addEventListener("cut", preventCopyActions);
//     document.addEventListener("paste", preventCopyActions);
//     document.addEventListener("keydown", preventKeys);
//     document.addEventListener("selectstart", preventSelection);
//     document.addEventListener("dragstart", preventDrag);
//     document.body.style.userSelect = "none";
//     document.body.style.webkitUserSelect = "none";

//     return () => {
//       document.removeEventListener("contextmenu", disableRightClick);
//       document.removeEventListener("copy", preventCopyActions);
//       document.removeEventListener("cut", preventCopyActions);
//       document.removeEventListener("paste", preventCopyActions);
//       document.removeEventListener("keydown", preventKeys);
//       document.removeEventListener("selectstart", preventSelection);
//       document.removeEventListener("dragstart", preventDrag);
//       document.body.style.userSelect = "auto";
//       document.body.style.webkitUserSelect = "auto";
//     };
//   }, []);

//   if (isError) {
//     return <Error message={message} />;
//   }

//   if (isLoading || !attempt || isInitializing) {
//     return (
//       <PageLayout>
//         <div className="flex justify-center items-center min-h-[60vh]">
//           <Loader />
//         </div>
//       </PageLayout>
//     );
//   }

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
//                 <PageTitle>{t("examModule.noAttemptsTitle")}</PageTitle>
//                 <PageSubtitle>
//                   {t("examModule.noAttemptsSubtitle")}
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
//                 {t("examModule.noAttemptsHeading")}
//               </h3>
//               <p className="text-gray-600 mb-6">
//                 {t("examModule.noAttemptsMessage", {
//                   total: attempt.total_attempts_allowed,
//                 })}
//               </p>
//               <button
//                 onClick={() => navigate(-1)}
//                 className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//               >
//                 {t("examModule.goBack")}
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
//                 <PageTitle>{t("examModule.pageTitle")}</PageTitle>
//                 <PageSubtitle>{t("examModule.pageSubtitle")}</PageSubtitle>
//               </div>
//             </div>
//           </PageHeaderLeft>

//           <div className="flex items-center gap-3">
//             <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
//               <FiClock className={`w-5 h-5 ${getTimerColor()}`} />
//               <div className="text-center">
//                 <div
//                   className={`text-sm font-mono font-bold ${getTimerColor()}`}
//                 >
//                   {formatTime(timeLeft)}
//                 </div>
//                 <div className="text-xs text-gray-500">
//                   {t("examModule.timeLeft")}
//                 </div>
//               </div>
//             </div>

//             <button
//               onClick={() => setShowLeaveModal(true)}
//               className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
//             >
//               <FiLogOut className="w-4 h-4" />
//               <span className="text-sm font-medium">
//                 {t("examModule.exitExam")}
//               </span>
//             </button>
//           </div>
//         </PageHeader>

//         <PageBody>
//           <div className="max-w-3xl mx-auto px-4">
//             <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-4">
//               <div className="flex items-start gap-3">
//                 <div className="p-2 bg-white rounded-lg shadow-sm">
//                   <FiBookOpen className="w-5 h-5 text-blue-600" />
//                 </div>
//                 <div className="flex-1">
//                   <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
//                     <h3 className="font-semibold text-gray-800">
//                       {t("examModule.moduleDetails")}
//                     </h3>
//                     <div className="flex items-center gap-3 text-sm">
//                       <span className="text-gray-600">
//                         {t("examModule.attempts")}:{" "}
//                         <span className="font-semibold">
//                           {attempt.attempts_used}
//                         </span>{" "}
//                         / {attempt.total_attempts_allowed}
//                       </span>
//                       <span className="text-gray-600">
//                         {t("examModule.remaining")}:{" "}
//                         <span className="font-semibold text-green-600">
//                           {attempt.attempts_remaining}
//                         </span>
//                       </span>
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
//                     <div className="flex items-center gap-2">
//                       <FiInfo className="w-4 h-4 text-gray-500" />
//                       <span className="text-gray-600">
//                         {t("examModule.duration")}:
//                       </span>
//                       <span className="font-medium text-gray-800">
//                         {attempt.duration} {t("examModule.minutes")}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <FiClock className="w-4 h-4 text-gray-500" />
//                       <span className="text-gray-600">
//                         {t("examModule.startedAt")}:
//                       </span>
//                       <span className="font-medium text-gray-800">
//                         {new Date(attempt.started_at).toLocaleTimeString()}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <FiAlertCircle className="w-4 h-4 text-gray-500" />
//                       <span className="text-gray-600">
//                         {t("examModule.expiresAt")}:
//                       </span>
//                       <span className="font-medium text-gray-800">
//                         {new Date(attempt.expires_at).toLocaleTimeString()}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <FiHelpCircle className="w-4 h-4 text-gray-500" />
//                       <span className="text-gray-600">
//                         {t("examModule.attemptId")}:
//                       </span>
//                       <span className="font-medium text-gray-800">
//                         #{attempt.attempt_id}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {isTimeUp && (
//               <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
//                 <div className="flex items-center gap-2">
//                   <FiAlertCircle className="w-5 h-5 text-red-600" />
//                   <span className="text-red-700 font-medium">
//                     {t("examModule.timeUpWarning")}
//                   </span>
//                 </div>
//               </div>
//             )}

//             {currentQuestion ? (
//               <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//                 <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm text-gray-600">
//                       {t("examModule.question")} {currentIndex + 1}{" "}
//                       {t("examModule.of")}{" "}
//                       {attempt?.total_questions ?? questions?.length ?? 0}
//                     </span>
//                     <div className="flex gap-2">
//                       {selected && !isTimeUp && !hasAutoSubmitted && (
//                         <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
//                           ✓ {t("examModule.answerSelected")}
//                         </span>
//                       )}
//                       {answers[currentQuestion.id] === null && (
//                         <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
//                           ⏭ {t("examModule.skipped")}
//                         </span>
//                       )}
//                     </div>
//                   </div>

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

//                 <div className="p-6">
//                   {/* Case Section - Show only when type is module and is_case is true */}
//                   {attempt?.type === "module" &&
//                     currentQuestion.is_case === true &&
//                     currentQuestion.case_title &&
//                     currentQuestion.case_text && (
//                       <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
//                         <div className="flex items-start gap-3">
//                           <div className="flex-shrink-0">
//                             <FiBookOpen className="w-5 h-5 text-blue-600 mt-0.5" />
//                           </div>
//                           <div className="flex-1">
//                             {currentQuestion.case_title && (
//                               <h3 className="font-semibold text-blue-800 text-lg mb-2">
//                                 {currentQuestion.case_title}
//                               </h3>
//                             )}
//                             {currentQuestion.case_text && (
//                               <p className="text-blue-700 text-sm leading-relaxed">
//                                 {currentQuestion.case_text}
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     )}

//                   <div className="mb-6">
//                     <h2 className="text-xl font-semibold text-gray-800">
//                       {currentQuestion.question_text}
//                     </h2>
//                   </div>

//                   <div className="space-y-3">
//                     {currentQuestion.options?.map((opt, idx) => {
//                       const isSelected = selected === opt.id;
//                       const isSkipped = answers[currentQuestion.id] === null;
//                       const isLocked =
//                         isSkipped || isTimeUp || hasAutoSubmitted;

//                       return (
//                         <div
//                           key={opt.id}
//                           onClick={() =>
//                             !isLocked && handleAnswerSelect(opt.id)
//                           }
//                           className={`p-4 border-2 rounded-lg transition-all duration-200 ${
//                             isLocked
//                               ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
//                               : isSelected
//                                 ? "border-blue-500 bg-blue-50 shadow-md cursor-pointer"
//                                 : "border-gray-200 hover:border-blue-300 hover:bg-gray-50 hover:shadow-sm cursor-pointer"
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

//                   <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200 quiz-allowed">
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
//                       {t("examModule.previous")}
//                     </button>

//                     <div className="flex gap-3">
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
//                         {t("examModule.skip")}
//                       </button>

//                       {currentIndex === questions.length - 1 ? (
//                         <button
//                           onClick={handleFinalSubmit}
//                           disabled={
//                             isSubmitting || isTimeUp || hasAutoSubmitted
//                           }
//                           className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                           <FiCheckCircle className="w-4 h-4" />
//                           {isSubmitting
//                             ? t("examModule.submitting")
//                             : t("examModule.submitExam")}
//                         </button>
//                       ) : (
//                         <button
//                           onClick={handleNext}
//                           disabled={
//                             isSubmitting || isTimeUp || hasAutoSubmitted
//                           }
//                           className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                           {t("examModule.next")}
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
//                   {t("examModule.noQuestionsTitle")}
//                 </h3>
//                 <p className="text-sm text-gray-500">
//                   {t("examModule.noQuestionsDescription")}
//                 </p>
//               </div>
//             )}
//           </div>
//         </PageBody>
//       </PageLayout>

//       <ConfirmationModal
//         show={showLeaveModal}
//         timeLeft={timeLeft}
//         isTimeUp={isTimeUp}
//         onConfirm={handleConfirmLeave}
//         onCancel={handleCancelLeave}
//       />
//     </>
//   );
// };

// export default ExamModule;

import React, { useState, useEffect } from "react";
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
  resetFeedbackState,
  clearQuizData,
} from "../../../../redux/slice/quizSlice";
import { FiAlertCircle, FiHelpCircle, FiLogOut } from "react-icons/fi";
import Loader from "../../common/Loader";
import { useTranslation } from "react-i18next";
import Error from "../../common/Error";
import ConfirmationModal from "./ConfirmationModal";
import { useQuizSession } from "../quize/common/useQuizSession";
import { useContentProtection } from "../quize/common/useContentProtection";
import McqRenderer from "../quize/common/McqRenderer";
import TimerDisplay from "../quize/common/TimerDisplay";
import QuizInfoPanel from "../quize/common/QuizInfoPanel";

const ExamModule = () => {
  const navigate = useNavigate();
  const { topicId } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { attempt, questions, isLoading, isError, message } = useSelector(
    (state) => state.quiz,
  );

  const [isInitializing, setIsInitializing] = useState(true);

  // Content protection
  useContentProtection(true);

  // Exam session hook
  const {
    selected,
    currentIndex,
    answers,
    isSubmitting,
    hasAutoSubmitted,
    showLeaveModal,
    timeLeft,
    isTimeUp,
    currentQuestion,
    handleAnswerSelect,
    handlePrevious,
    handleNext,
    handleSkip,
    handleFinalSubmit,
    handleConfirmLeave,
    handleCancelLeave,
    setShowLeaveModal,
  } = useQuizSession({
    sessionKey: "exam_active_attempt",
    storagePrefix: "exam-module",
    attempt,
    questions,
    topicId,
  });

  // Bootstrap
  useEffect(() => {
    const initExam = async () => {
      setIsInitializing(true);
      if (!topicId) return;
      dispatch(resetFeedbackState());
      try {
        dispatch(clearQuizData());
        const res = await dispatch(startAttempt(topicId)).unwrap();
        if (res.attempts_remaining === 0) {
          console.log("No attempts remaining");
          return;
        }
      } catch (err) {
        console.error("Failed to start exam attempt:", err);
        if (
          err?.message?.includes("rate limit") ||
          err?.response?.status === 429
        ) {
          alert("Please wait before starting a new attempt");
          navigate(-1);
        }
      } finally {
        setIsInitializing(false);
      }
    };
    initExam();
  }, [dispatch, topicId, navigate]);

  useEffect(() => {
    if (
      attempt?.attempt_id &&
      topicId &&
      attempt?.attempts_remaining > 0 &&
      !attempt?.is_submitted
    ) {
      dispatch(fetchQuestions({ topicId, attemptId: attempt.attempt_id }));
    }
  }, [attempt, topicId, dispatch]);

  useEffect(() => {
    if (attempt && attempt.attempts_remaining === 0) {
      alert(t("examModule.noAttemptsLeft"));
      navigate(-1);
    }
  }, [attempt, navigate, t]);

  useEffect(() => {
    dispatch(clearQuizData());
    sessionStorage.removeItem("exam_active_attempt");
  }, [topicId, dispatch]);

  if (isError) {
    return <Error message={message} />;
  }

  if (isLoading || !attempt || isInitializing) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader />
        </div>
      </PageLayout>
    );
  }

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
                <PageTitle>{t("examModule.noAttemptsTitle")}</PageTitle>
                <PageSubtitle>
                  {t("examModule.noAttemptsSubtitle")}
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
                {t("examModule.noAttemptsHeading")}
              </h3>
              <p className="text-gray-600 mb-6">
                {t("examModule.noAttemptsMessage", {
                  total: attempt.total_attempts_allowed,
                })}
              </p>
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {t("examModule.goBack")}
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
                <PageTitle>{t("examModule.pageTitle")}</PageTitle>
                <PageSubtitle>{t("examModule.pageSubtitle")}</PageSubtitle>
              </div>
            </div>
          </PageHeaderLeft>

          <div className="flex items-center gap-3">
            <TimerDisplay
              timeLeft={timeLeft}
              label={t("examModule.timeLeft")}
            />

            <button
              onClick={() => setShowLeaveModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
            >
              <FiLogOut className="w-4 h-4" />
              <span className="text-sm font-medium">
                {t("examModule.exitExam")}
              </span>
            </button>
          </div>
        </PageHeader>

        <PageBody>
          <div className="max-w-3xl mx-auto px-4">
            <QuizInfoPanel attempt={attempt} type="exam" />

            {isTimeUp && (
              <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <FiAlertCircle className="w-5 h-5 text-red-600" />
                  <span className="text-red-700 font-medium">
                    {t("examModule.timeUpWarning")}
                  </span>
                </div>
              </div>
            )}

            <McqRenderer
              currentQuestion={currentQuestion}
              currentIndex={currentIndex}
              totalQuestions={
                attempt?.total_questions ?? questions?.length ?? 0
              }
              selected={selected}
              answers={answers}
              timeLeft={timeLeft}
              duration={attempt?.duration}
              isTimeUp={isTimeUp}
              hasAutoSubmitted={hasAutoSubmitted}
              isSubmitting={isSubmitting}
              attemptType="exam"
              onAnswerSelect={handleAnswerSelect}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onSkip={handleSkip}
              onFinalSubmit={handleFinalSubmit}
            />
          </div>
        </PageBody>
      </PageLayout>

      <ConfirmationModal
        show={showLeaveModal}
        timeLeft={timeLeft}
        isTimeUp={isTimeUp}
        onConfirm={handleConfirmLeave}
        onCancel={handleCancelLeave}
      />
    </>
  );
};

export default ExamModule;

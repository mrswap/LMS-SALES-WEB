// import React, { useState, useEffect } from "react";
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
// } from "react-icons/fi";
// import Loader from "../../common/Loader";

// const Quiz = () => {
//   const navigate = useNavigate();
//   const { topicId } = useParams();
//   const dispatch = useDispatch();

//   const { attempt, questions, isLoading } = useSelector((state) => state.quiz);

//   const [selected, setSelected] = useState("");
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Countdown timer state
//   const [timeLeft, setTimeLeft] = useState(null); // in seconds
//   const [isTimeUp, setIsTimeUp] = useState(false);

//   /* ===========================
//      START ATTEMPT ON MOUNT
//   =========================== */
//   useEffect(() => {
//     if (topicId) {
//       dispatch(startAttempt(topicId));
//     }
//   }, [dispatch, topicId]);

//   // console.log("attamp", attempt);

//   /* ===========================
//      FETCH QUESTIONS AFTER ATTEMPT
//   =========================== */
//   useEffect(() => {
//     if (attempt?.attempt_id && topicId) {
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
//     if (attempt?.duration) {
//       // Convert minutes to seconds
//       const durationInSeconds = attempt.duration * 60;
//       setTimeLeft(durationInSeconds);
//     }
//   }, [attempt?.duration]);

//   /* ===========================
//      COUNTDOWN TIMER LOGIC
//   =========================== */
//   useEffect(() => {
//     if (timeLeft === null || timeLeft <= 0 || isTimeUp) return;

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           setIsTimeUp(true);
//           // Auto-submit quiz when time is up
//           handleAutoSubmit();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft, isTimeUp]);

//   /* ===========================
//      AUTO SUBMIT ON TIME UP
//   =========================== */
//   const handleAutoSubmit = async () => {
//     console.log("Time's up! Auto-submitting quiz...");
//     // Submit current question if answer is selected
//     if (selected && currentQuestion) {
//       await submitCurrentAnswer();
//     }
//     // Navigate to results page
//     navigate(`/quiz/results/${attempt?.attempt_id}`);
//   };

//   /* ===========================
//      FORMAT TIME DISPLAY (MM:SS)
//   =========================== */
//   const formatTime = (seconds) => {
//     if (!seconds && seconds !== 0) return "00:00";
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
//   };

//   /* ===========================
//      GET TIMER COLOR BASED ON TIME LEFT
//   =========================== */
//   const getTimerColor = () => {
//     if (!timeLeft) return "text-gray-600";
//     if (timeLeft <= 60) return "text-red-600"; // Last 1 minute
//     if (timeLeft <= 300) return "text-orange-600"; // Last 5 minutes
//     return "text-blue-600";
//   };

//   /* ===========================
//      SUBMIT CURRENT QUESTION ANSWER TO BACKEND
//   =========================== */
//   const submitCurrentAnswer = async () => {
//     if (currentQuestion?.selected_option_id !== null) {
//       return;
//     }
//     if (
//       selected &&
//       currentQuestion &&
//       attempt?.attempt_id &&
//       !isSubmitting &&
//       !isTimeUp
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
//     if (currentQuestion?.selected_option_id !== null) {
//       return;
//     }
//     if (currentQuestion && attempt?.attempt_id && !isSubmitting && !isTimeUp) {
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
//     if (isTimeUp) return; // Disable if time is up
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
//     if (currentIndex > 0 && !isTimeUp) {
//       await submitCurrentAnswer();
//       setCurrentIndex((prev) => prev - 1);
//     }
//   };

//   /* ===========================
//      HANDLE NEXT BUTTON
//   =========================== */
//   const handleNext = async () => {
//     if (currentIndex < questions.length - 1 && !isTimeUp) {
//       await submitCurrentAnswer();
//       setCurrentIndex((prev) => prev + 1);
//     }
//   };

//   /* ===========================
//      HANDLE SKIP BUTTON
//   =========================== */
//   const handleSkip = async () => {
//     if (currentIndex < questions.length - 1 && !isTimeUp) {
//       await skipCurrentQuestion();
//       setCurrentIndex((prev) => prev + 1);
//     }
//   };

//   /* ===========================
//      HANDLE FINAL SUBMIT
//   =========================== */

//   const handleFinalSubmit = async () => {
//     if (isTimeUp) return;
//     //  direct quiz submit
//     if (attempt?.attempt_id && topicId && !isSubmitting) {
//       setIsSubmitting(true);
//       try {
//         const result = await dispatch(
//           submitQuiz({
//             attemptId: attempt.attempt_id,
//             topicId: topicId,
//           }),
//         ).unwrap();

//         console.log("Quiz submitted successfully:", result);

//         // navigate(`/quiz/results/${attempt?.attempt_id}`);s
//       } catch (error) {
//         console.error("Failed to submit quiz:", error);
//       } finally {
//         setIsSubmitting(false);
//       }
//     }
//   };

//   /* ===========================
//      CURRENT QUESTION
//   =========================== */
//   const currentQuestion = questions[currentIndex];

//   useEffect(() => {
//     if (currentQuestion) {
//       // agar backend se selected_option_id aayi hai to use karo
//       if (currentQuestion.selected_option_id !== null) {
//         setSelected(currentQuestion.selected_option_id);
//       } else {
//         const savedAnswer = answers[currentQuestion.id] || "";
//         setSelected(savedAnswer);
//       }
//     }
//   }, [currentIndex, currentQuestion, answers]);

//   if (isLoading) {
//     return (
//       <PageLayout>
//         <div className="flex justify-center items-center min-h-[60vh]">
//           <Loader />
//         </div>
//       </PageLayout>
//     );
//   }

//   return (
//     <PageLayout>
//       <PageHeader>
//         <PageHeaderLeft>
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-blue-50 rounded-lg">
//               <FiHelpCircle className="w-6 h-6 text-blue-600" />
//             </div>
//             <div>
//               <PageTitle>Quiz Assessment</PageTitle>
//               <PageSubtitle>Test your knowledge</PageSubtitle>
//             </div>
//           </div>
//         </PageHeaderLeft>

//         {/* Countdown Timer Display */}
//         <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
//           <FiClock className={`w-5 h-5 ${getTimerColor()}`} />
//           <div className="text-center">
//             <div className={`text-sm font-mono font-bold ${getTimerColor()}`}>
//               {formatTime(timeLeft)}
//             </div>
//             <div className="text-xs text-gray-500">Time Left</div>
//           </div>
//         </div>
//       </PageHeader>

//       <PageBody>
//         <div className="max-w-3xl mx-auto px-4">
//           {/* Time Up Warning Banner */}
//           {isTimeUp && (
//             <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
//               <div className="flex items-center gap-2">
//                 <FiAlertCircle className="w-5 h-5 text-red-600" />
//                 <span className="text-red-700 font-medium">
//                   Time's up! Your quiz has been automatically submitted.
//                 </span>
//               </div>
//             </div>
//           )}

//           {currentQuestion ? (
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//               {/* Question Counter & Timer Bar */}
//               <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-600">
//                     Question {currentIndex + 1} of {questions.length}
//                   </span>
//                   <div className="flex gap-2">
//                     {selected && !isTimeUp && (
//                       <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
//                         Answer selected
//                       </span>
//                     )}
//                     {answers[currentQuestion.id] === null && (
//                       <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
//                         Skipped
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Progress Bar for Time */}
//                 {timeLeft !== null && attempt?.duration && (
//                   <div className="mt-3">
//                     <div className="w-full bg-gray-200 rounded-full h-1.5">
//                       <div
//                         className={`h-1.5 rounded-full transition-all duration-1000 ${
//                           timeLeft <= 60
//                             ? "bg-red-500"
//                             : timeLeft <= 300
//                               ? "bg-orange-500"
//                               : "bg-blue-500"
//                         }`}
//                         style={{
//                           width: `${(timeLeft / (attempt.duration * 60)) * 100}%`,
//                         }}
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Question Content */}
//               <div className="p-6">
//                 {/* Question Text */}
//                 <div className="mb-6">
//                   <h2 className="text-lg font-semibold text-gray-800">
//                     {currentQuestion.question_text}
//                   </h2>
//                 </div>

//                 {/* Options */}
//                 <div className="space-y-3">
//                   {currentQuestion.options?.map((opt, idx) => {
//                     const isSelected = selected === opt.id;
//                     const isSkipped = answers[currentQuestion.id] === null;

//                     return (
//                       <div
//                         key={opt.id}
//                         onClick={() =>
//                           !isSkipped && !isTimeUp && handleAnswerSelect(opt.id)
//                         }
//                         className={`p-3 border rounded-lg cursor-pointer transition-colors ${
//                           isSkipped || isTimeUp
//                             ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
//                             : isSelected
//                               ? "border-blue-500 bg-blue-50"
//                               : "border-gray-300 hover:border-blue-300 hover:bg-gray-50"
//                         }`}
//                       >
//                         <div className="flex items-center gap-3">
//                           {isSelected ? (
//                             <FiCheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
//                           ) : (
//                             <FiCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
//                           )}
//                           <span className="text-gray-700">
//                             {String.fromCharCode(65 + idx)}. {opt.text}
//                           </span>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>

//                 {/* Navigation Buttons */}
//                 <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200">
//                   <button
//                     disabled={currentIndex === 0 || isSubmitting || isTimeUp}
//                     onClick={handlePrevious}
//                     className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//                       currentIndex === 0 || isSubmitting || isTimeUp
//                         ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                     }`}
//                   >
//                     <FiChevronLeft className="w-4 h-4" />
//                     Previous
//                   </button>

//                   <div className="flex gap-3">
//                     {/* Skip Button */}
//                     <button
//                       onClick={handleSkip}
//                       disabled={
//                         currentIndex === questions.length - 1 ||
//                         isSubmitting ||
//                         isTimeUp
//                       }
//                       className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//                         currentIndex === questions.length - 1 ||
//                         isSubmitting ||
//                         isTimeUp
//                           ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                       }`}
//                     >
//                       <FiSkipForward className="w-4 h-4" />
//                       Skip
//                     </button>

//                     {/* Next/Submit Button */}
//                     {currentIndex === questions.length - 1 ? (
//                       <button
//                         onClick={handleFinalSubmit}
//                         disabled={isSubmitting || isTimeUp}
//                         className="flex items-center gap-2 px-5 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
//                       >
//                         <FiCheckCircle className="w-4 h-4" />
//                         {isSubmitting ? "Submitting..." : "Submit Quiz"}
//                       </button>
//                     ) : (
//                       <button
//                         onClick={handleNext}
//                         disabled={isSubmitting || isTimeUp}
//                         className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
//                       >
//                         Next
//                         <FiChevronRight className="w-4 h-4" />
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
//               <FiAlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
//               <h3 className="text-base font-medium text-gray-700 mb-1">
//                 No Questions Found
//               </h3>
//               <p className="text-sm text-gray-500">
//                 This quiz doesn't have any questions yet.
//               </p>
//             </div>
//           )}
//         </div>
//       </PageBody>
//     </PageLayout>
//   );
// };

// export default Quiz;

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

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState(null); // in seconds
  const [isTimeUp, setIsTimeUp] = useState(false);

  /* ===========================
     START ATTEMPT ON MOUNT
  =========================== */
  useEffect(() => {
    if (topicId) {
      dispatch(startAttempt(topicId));
    }
  }, [dispatch, topicId]);

  // console.log("attamp", attempt);

  /* ===========================
     FETCH QUESTIONS AFTER ATTEMPT
  =========================== */
  useEffect(() => {
    if (attempt?.attempt_id && topicId) {
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
    if (attempt?.duration) {
      // Convert minutes to seconds
      const durationInSeconds = attempt.duration * 60;
      setTimeLeft(durationInSeconds);
    }
  }, [attempt?.duration]);

  /* ===========================
     COUNTDOWN TIMER LOGIC
  =========================== */
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || isTimeUp) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimeUp(true);
          // Auto-submit quiz when time is up
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isTimeUp]);

  /* ===========================
     AUTO SUBMIT ON TIME UP
  =========================== */
  const handleAutoSubmit = async () => {
    console.log("Time's up! Auto-submitting quiz...");
    // Submit current question if answer is selected
    if (selected && currentQuestion) {
      await submitCurrentAnswer();
    }
    // Navigate to results page
    navigate(`/quiz/results/${attempt?.attempt_id}`);
  };

  /* ===========================
     FORMAT TIME DISPLAY (MM:SS)
  =========================== */
  const formatTime = (seconds) => {
    if (!seconds && seconds !== 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  /* ===========================
     GET TIMER COLOR BASED ON TIME LEFT
  =========================== */
  const getTimerColor = () => {
    if (!timeLeft) return "text-gray-600";
    if (timeLeft <= 60) return "text-red-600"; // Last 1 minute
    if (timeLeft <= 300) return "text-orange-600"; // Last 5 minutes
    return "text-blue-600";
  };

  /* ===========================
     SUBMIT CURRENT QUESTION ANSWER TO BACKEND
  =========================== */
  const submitCurrentAnswer = async () => {
    if (currentQuestion?.selected_option_id !== null) {
      return;
    }
    if (
      selected &&
      currentQuestion &&
      attempt?.attempt_id &&
      !isSubmitting &&
      !isTimeUp
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
    if (currentQuestion?.selected_option_id !== null) {
      return;
    }
    if (currentQuestion && attempt?.attempt_id && !isSubmitting && !isTimeUp) {
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
    if (isTimeUp) return; // Disable if time is up
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
    if (currentIndex > 0 && !isTimeUp) {
      await submitCurrentAnswer();
      setCurrentIndex((prev) => prev - 1);
    }
  };

  /* ===========================
     HANDLE NEXT BUTTON
  =========================== */
  const handleNext = async () => {
    if (currentIndex < questions.length - 1 && !isTimeUp) {
      await submitCurrentAnswer();
      setCurrentIndex((prev) => prev + 1);
    }
  };

  /* ===========================
     HANDLE SKIP BUTTON
  =========================== */
  const handleSkip = async () => {
    if (currentIndex < questions.length - 1 && !isTimeUp) {
      await skipCurrentQuestion();
      setCurrentIndex((prev) => prev + 1);
    }
  };

  /* ===========================
     HANDLE FINAL SUBMIT
  =========================== */

  const handleFinalSubmit = async () => {
    if (isTimeUp) return;
    //  direct quiz submit
    if (attempt?.attempt_id && topicId && !isSubmitting) {
      setIsSubmitting(true);
      try {
        const result = await dispatch(
          submitQuiz({
            attemptId: attempt.attempt_id,
            topicId: topicId,
          }),
        ).unwrap();

        console.log("Quiz submitted successfully:", result);

        // navigate(`/quiz/results/${attempt?.attempt_id}`);s
      } catch (error) {
        console.error("Failed to submit quiz:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  /* ===========================
     CURRENT QUESTION
  =========================== */
  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (currentQuestion) {
      // agar backend se selected_option_id aayi hai to use karo
      if (currentQuestion.selected_option_id !== null) {
        setSelected(currentQuestion.selected_option_id);
      } else {
        const savedAnswer = answers[currentQuestion.id] || "";
        setSelected(savedAnswer);
      }
    }
  }, [currentIndex, currentQuestion, answers]);

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FiHelpCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <PageTitle>{t("quiz.pageTitle")}</PageTitle>
              <PageSubtitle>{t("quiz.pageSubtitle")}</PageSubtitle>
            </div>
          </div>
        </PageHeaderLeft>

        {/* Countdown Timer Display */}
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
          <FiClock className={`w-5 h-5 ${getTimerColor()}`} />
          <div className="text-center">
            <div className={`text-sm font-mono font-bold ${getTimerColor()}`}>
              {formatTime(timeLeft)}
            </div>
            <div className="text-xs text-gray-500">{t("quiz.timeLeft")}</div>
          </div>
        </div>
      </PageHeader>

      <PageBody>
        <div className="max-w-3xl mx-auto px-4">
          {/* Time Up Warning Banner */}
          {isTimeUp && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <FiAlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-700 font-medium">
                  {t("quiz.timeUpWarning")}
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
                    })}
                  </span>
                  <div className="flex gap-2">
                    {selected && !isTimeUp && (
                      <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                        {t("quiz.answerSelected")}
                      </span>
                    )}
                    {answers[currentQuestion.id] === null && (
                      <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                        {t("quiz.skipped")}
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress Bar for Time */}
                {timeLeft !== null && attempt?.duration && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-1000 ${
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
                  <h2 className="text-lg font-semibold text-gray-800">
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
                          !isSkipped && !isTimeUp && handleAnswerSelect(opt.id)
                        }
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          isSkipped || isTimeUp
                            ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
                            : isSelected
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-300 hover:border-blue-300 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {isSelected ? (
                            <FiCheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          ) : (
                            <FiCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          )}
                          <span className="text-gray-700">
                            {String.fromCharCode(65 + idx)}. {opt.text}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200">
                  <button
                    disabled={currentIndex === 0 || isSubmitting || isTimeUp}
                    onClick={handlePrevious}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentIndex === 0 || isSubmitting || isTimeUp
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <FiChevronLeft className="w-4 h-4" />
                    {t("quiz.buttons.previous")}
                  </button>

                  <div className="flex gap-3">
                    {/* Skip Button */}
                    <button
                      onClick={handleSkip}
                      disabled={
                        currentIndex === questions.length - 1 ||
                        isSubmitting ||
                        isTimeUp
                      }
                      className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        currentIndex === questions.length - 1 ||
                        isSubmitting ||
                        isTimeUp
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <FiSkipForward className="w-4 h-4" />
                      {t("quiz.buttons.skip")}
                    </button>

                    {/* Next/Submit Button */}
                    {currentIndex === questions.length - 1 ? (
                      <button
                        onClick={handleFinalSubmit}
                        disabled={isSubmitting || isTimeUp}
                        className="flex items-center gap-2 px-5 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                      >
                        <FiCheckCircle className="w-4 h-4" />
                        {isSubmitting
                          ? t("quiz.buttons.submitting")
                          : t("quiz.buttons.submitQuiz")}
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        disabled={isSubmitting || isTimeUp}
                        className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                      >
                        {t("quiz.buttons.next")}
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
                {t("quiz.emptyState.title")}
              </h3>
              <p className="text-sm text-gray-500">
                {t("quiz.emptyState.description")}
              </p>
            </div>
          )}
        </div>
      </PageBody>
    </PageLayout>
  );
};

export default Quiz;

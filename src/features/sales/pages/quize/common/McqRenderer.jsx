import React, { useState, useEffect } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,
  FiAlertCircle,
  FiSkipForward,
  FiBookOpen,
} from "react-icons/fi";
import { useTranslation } from "react-i18next";

const McqRenderer = ({
  currentQuestion,
  currentIndex,
  totalQuestions,
  selected,
  answers,
  timeLeft,
  duration,
  isTimeUp,
  hasAutoSubmitted,
  isSubmitting,
  attemptType,
  onAnswerSelect,
  onPrevious,
  onNext,
  onSkip,
  onFinalSubmit,
}) => {
  const { t } = useTranslation();
  const [localSelected, setLocalSelected] = useState(selected);

  useEffect(() => {
    setLocalSelected(selected);
  }, [selected]);

  const handleAnswerSelect = (optionId) => {
    if (isTimeUp || hasAutoSubmitted) return;
    setLocalSelected(optionId);
    onAnswerSelect(optionId);
  };

  const formatTime = (seconds) => {
    if (!seconds && seconds !== 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getTimerColor = () => {
    if (!timeLeft) return "bg-blue-500";
    if (timeLeft <= 60) return "bg-red-500";
    if (timeLeft <= 300) return "bg-orange-500";
    return "bg-blue-500";
  };

  const tKey = (key) => {
    const prefix = attemptType === "exam" ? "examModule" : "quiz";
    return t(`${prefix}.${key}`);
  };

  if (!currentQuestion) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <FiAlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <h3 className="text-base font-medium text-gray-700 mb-1">
          {tKey("noQuestionsTitle")}
        </h3>
        <p className="text-sm text-gray-500">
          {tKey("noQuestionsDescription")}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">
            {tKey("question")} {currentIndex + 1} {tKey("of")} {totalQuestions}
          </span>
          <div className="flex gap-2">
            {localSelected && !isTimeUp && !hasAutoSubmitted && (
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                ✓ {tKey("answerSelected")}
              </span>
            )}
            {answers[currentQuestion.id] === null && (
              <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                ⏭ {tKey("skipped")}
              </span>
            )}
          </div>
        </div>

        {timeLeft !== null && duration && (
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-1000 ${getTimerColor()}`}
                style={{
                  width: `${(timeLeft / (duration * 60)) * 100}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Case Section - Only for exam modules with case study */}
        {attemptType === "exam" &&
          currentQuestion.is_case === true &&
          currentQuestion.case_title &&
          currentQuestion.case_text && (
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <FiBookOpen className="w-5 h-5 text-blue-600 mt-0.5" />
                </div>
                <div className="flex-1">
                  {currentQuestion.case_title && (
                    <h3 className="font-semibold text-blue-800 text-lg mb-2">
                      {currentQuestion.case_title}
                    </h3>
                  )}
                  {currentQuestion.case_text && (
                    <p className="text-blue-700 text-sm leading-relaxed">
                      {currentQuestion.case_text}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {currentQuestion.question_text}
          </h2>
        </div>

        <div className="space-y-3">
          {currentQuestion.options?.map((opt, idx) => {
            const isSelected = localSelected === opt.id;
            const isSkipped = answers[currentQuestion.id] === null;
            const isLocked = isSkipped || isTimeUp || hasAutoSubmitted;

            return (
              <div
                key={opt.id}
                onClick={() => !isLocked && handleAnswerSelect(opt.id)}
                className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                  isLocked
                    ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
                    : isSelected
                      ? "border-blue-500 bg-blue-50 shadow-md cursor-pointer"
                      : "border-gray-200 hover:border-blue-300 hover:bg-gray-50 hover:shadow-sm cursor-pointer"
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
                  <span className="text-gray-700 flex-1">{opt.text}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200">
          <button
            disabled={
              currentIndex === 0 || isSubmitting || isTimeUp || hasAutoSubmitted
            }
            onClick={onPrevious}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              currentIndex === 0 || isSubmitting || isTimeUp || hasAutoSubmitted
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FiChevronLeft className="w-4 h-4" />
            {tKey("previous")}
          </button>

          <div className="flex gap-3">
            <button
              onClick={onSkip}
              disabled={
                currentIndex === totalQuestions - 1 ||
                isSubmitting ||
                isTimeUp ||
                hasAutoSubmitted
              }
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentIndex === totalQuestions - 1 ||
                isSubmitting ||
                isTimeUp ||
                hasAutoSubmitted
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FiSkipForward className="w-4 h-4" />
              {tKey("skip")}
            </button>

            {currentIndex === totalQuestions - 1 ? (
              <button
                onClick={onFinalSubmit}
                disabled={isSubmitting || isTimeUp || hasAutoSubmitted}
                className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiCheckCircle className="w-4 h-4" />
                {isSubmitting ? tKey("submitting") : tKey("submitQuiz")}
              </button>
            ) : (
              <button
                onClick={onNext}
                disabled={isSubmitting || isTimeUp || hasAutoSubmitted}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {tKey("next")}
                <FiChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default McqRenderer;

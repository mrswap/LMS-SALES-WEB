import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { FiX, FiAlertTriangle } from "react-icons/fi";

const ConfirmationModal = memo(
  ({ show, timeLeft, isTimeUp, onConfirm, onCancel }) => {
    const { t } = useTranslation();

    if (!show) return null;

    const formatTime = (seconds) => {
      if (!seconds && seconds !== 0) return "00:00";
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={onCancel}
        />
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 modal-allowed">
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <FiX className="w-5 h-5" />
          </button>
          <div className="p-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <FiAlertTriangle className="w-8 h-8 text-orange-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
              {t("quiz.confirmationModal.title")}
            </h3>
            <p className="text-gray-600 text-center mb-6">
              {t("quiz.confirmationModal.description")}
              <span className="block mt-2 text-sm text-orange-600 font-medium">
                {t("quiz.confirmationModal.progressSaved")}
              </span>
            </p>
            {timeLeft > 0 && !isTimeUp && (
              <div className="mb-6 p-3 bg-gray-50 rounded-lg text-center">
                <span className="text-sm text-gray-600">
                  {t("quiz.confirmationModal.timeRemaining")}{" "}
                </span>
                <span className="font-mono font-bold text-blue-600">
                  {formatTime(timeLeft)}
                </span>
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 px-4 py-2.5 border-2 border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all"
              >
                {t("quiz.confirmationModal.cancel")}
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 px-4 py-2.5 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition-all shadow-md hover:shadow-lg"
              >
                {t("quiz.confirmationModal.confirm")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

ConfirmationModal.displayName = "ConfirmationModal";

export default ConfirmationModal;

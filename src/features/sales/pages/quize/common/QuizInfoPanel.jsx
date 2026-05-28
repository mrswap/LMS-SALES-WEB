import React from "react";
import {
  FiBookOpen,
  FiInfo,
  FiClock,
  FiAlertCircle,
  FiHelpCircle,
} from "react-icons/fi";
import { useTranslation } from "react-i18next";

const QuizInfoPanel = ({ attempt, type = "quiz" }) => {
  const { t } = useTranslation();
  const prefix = type === "exam" ? "examModule" : "quiz";

  return (
    <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-white rounded-lg shadow-sm">
          <FiBookOpen className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
            <h3 className="font-semibold text-gray-800">
              {type === "exam"
                ? t(`${prefix}.moduleDetails`)
                : t(`${prefix}.topicDetails`)}
            </h3>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-600">
                {t(`${prefix}.attempts`)}:{" "}
                <span className="font-semibold">{attempt.attempts_used}</span> /{" "}
                {attempt.total_attempts_allowed}
              </span>
              <span className="text-gray-600">
                {t(`${prefix}.remaining`)}:{" "}
                <span className="font-semibold text-green-600">
                  {attempt.attempts_remaining}
                </span>
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <FiInfo className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">{t(`${prefix}.duration`)}:</span>
              <span className="font-medium text-gray-800">
                {attempt.duration} {t(`${prefix}.minutes`)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FiClock className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">{t(`${prefix}.startedAt`)}:</span>
              <span className="font-medium text-gray-800">
                {new Date(attempt.started_at).toLocaleTimeString()}
              </span>
            </div>
            {type === "quiz" && (
              <>
                <div className="flex items-center gap-2">
                  <FiAlertCircle className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">
                    {t(`${prefix}.expiresAt`)}:
                  </span>
                  <span className="font-medium text-gray-800">
                    {new Date(attempt.expires_at).toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FiHelpCircle className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">
                    {t(`${prefix}.attemptId`)}:
                  </span>
                  <span className="font-medium text-gray-800">
                    #{attempt.attempt_id}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizInfoPanel;

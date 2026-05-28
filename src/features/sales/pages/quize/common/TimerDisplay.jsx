import React from "react";
import { FiClock } from "react-icons/fi";

const TimerDisplay = ({ timeLeft, label = "timeLeft" }) => {
  const formatTime = (seconds) => {
    if (!seconds && seconds !== 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getTimerColor = () => {
    if (!timeLeft) return "text-gray-600";
    if (timeLeft <= 60) return "text-red-600";
    if (timeLeft <= 300) return "text-orange-600";
    return "text-blue-600";
  };

  return (
    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
      <FiClock className={`w-5 h-5 ${getTimerColor()}`} />
      <div className="text-center">
        <div className={`text-sm font-mono font-bold ${getTimerColor()}`}>
          {formatTime(timeLeft)}
        </div>
        <div className="text-xs text-gray-500">{label}</div>
      </div>
    </div>
  );
};

export default TimerDisplay;

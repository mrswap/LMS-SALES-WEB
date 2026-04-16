import React from "react";
import { FaPlay, FaLock, FaRedo, FaChartBar, FaCheck } from "react-icons/fa";
import {
  PageBody,
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight,
  PageLayout,
  PageSubtitle,
  PageTitle,
} from "../../common/layout/index";
import { useNavigate } from "react-router-dom";

const topics = [
  {
    id: 1,
    title: "Definition Purpose",
    units: 6,
    progress: 100,
    status: "completed",
  },
  {
    id: 2,
    title: "History & Evolution",
    units: 4,
    progress: 50,
    status: "in-progress",
  },
  {
    id: 3,
    title: "Label paced ECG trace",
    units: 8,
    progress: 0,
    status: "locked",
  },
];

const Topics = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>All Topics</PageTitle>
          <PageSubtitle>
            Track your progress and continue your journey
          </PageSubtitle>
        </PageHeaderLeft>
        <PageHeaderRight />
      </PageHeader>

      <PageBody>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="group bg-white rounded-2xl p-5 border border-gray-300 shadow-sm hover:shadow-md"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <h2 className="font-semibold text-base sm:text-lg text-gray-800">
                  {topic.title}
                </h2>

                {/* Status Icon */}
                {topic.status === "completed" && (
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                    <FaCheck size={12} />
                  </div>
                )}

                {topic.status === "locked" && (
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-400">
                    <FaLock size={12} />
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-500 mb-3">
                {topic.units} Learning Units
              </p>

              {/* Progress */}
              <div className="mb-5">
                <div className="text-xs text-gray-400 mb-1 tracking-wide">
                  {topic.status === "completed"
                    ? "COMPLETED"
                    : topic.status === "locked"
                      ? "LOCKED"
                      : "IN PROGRESS"}
                </div>

                <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      topic.status === "completed"
                        ? "bg-gradient-to-r from-green-400 to-green-600"
                        : topic.status === "in-progress"
                          ? "bg-gradient-to-r from-blue-400 to-blue-600"
                          : "bg-gray-300"
                    }`}
                    style={{ width: `${topic.progress}%` }}
                  />
                </div>

                <div className="text-right text-xs mt-1 text-gray-500">
                  {topic.progress}%
                </div>
              </div>

              {/* Buttons */}
              {topic.status === "completed" && (
                <>
                  <button
                    onClick={() => navigate("/quize")}
                    className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white py-2.5 cursor-pointer rounded-xl mb-3 font-medium flex items-center justify-center gap-2 hover:opacity-90 transition"
                  >
                    <FaChartBar size={12} />
                    Attempt Quiz
                  </button>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-100 text-blue-600 py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-200 transition">
                      <FaRedo size={12} />
                      Replay
                    </button>

                    <button className="flex-1 bg-blue-600 text-white py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition">
                      <FaChartBar size={12} />
                      Stats
                    </button>
                  </div>
                </>
              )}

              {topic.status === "in-progress" && (
                <button
                  onClick={() => navigate("units")}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 rounded-xl cursor-pointer flex items-center justify-center gap-2 font-medium hover:opacity-90 transition"
                >
                  <FaPlay size={12} />
                  Resume Topic
                </button>
              )}

              {topic.status === "locked" && (
                <div className="text-center text-gray-400 text-sm mt-4 flex items-center justify-center gap-2">
                  <FaLock size={12} />
                  Locked (Complete previous level)
                </div>
              )}
            </div>
          ))}
        </div>
      </PageBody>
    </PageLayout>
  );
};

export default Topics;

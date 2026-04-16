import React from "react";
import {
  PageBody,
  PageHeader,
  PageHeaderLeft,
  PageLayout,
  PageSubtitle,
  PageTitle,
} from "../../common/layout";

import { FaBookOpen, FaClock, FaChartLine, FaFlask } from "react-icons/fa";

const ProgressStats = () => {
  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>Progress</PageTitle>
          <PageSubtitle>Track your learning journey</PageSubtitle>
        </PageHeaderLeft>
      </PageHeader>

      <PageBody>
        <div className="max-w-6xl mx-auto space-y-8">
          {/* ================= TOP STATS ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <StatCard
              icon={<FaBookOpen />}
              title="Levels"
              value="1"
              subtitle="Completed"
              green
            />

            <StatCard
              icon={<FaClock />}
              title="Pending Levels"
              value="2"
              subtitle="Incomplete"
              red
            />

            <StatCard
              icon={<FaChartLine />}
              title="Avg. Score"
              value="92%"
              subtitle="Top 5% of class"
              progress
            />
          </div>

          {/* ================= CURRENT PROGRESS ================= */}
          <div className="space-y-5">
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-gray-800">
                Current Progress
              </h3>

              <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm shadow hover:bg-blue-700 transition">
                Past Level
              </button>
            </div>

            {/* GRID (IMPORTANT) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <ProgressCard
                title="Definition & Purpose"
                module="Module 4: Pathophysiology"
                progress={100}
                button="View Certificate"
              />

              <ProgressCard
                title="History & Evolution"
                module="Module 4: Pathophysiology"
                progress={75}
                button="Continue Learning"
              />
            </div>
          </div>
        </div>
      </PageBody>
    </PageLayout>
  );
};

/* ================= STAT CARD ================= */
const StatCard = ({ icon, title, value, subtitle, green, red, progress }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
    <div className="flex items-center justify-between mb-4">
      <p className="text-xs text-gray-400 uppercase tracking-wide">{title}</p>

      <div className="bg-gray-100 p-2 rounded-lg text-blue-600">{icon}</div>
    </div>

    <h2 className="text-3xl font-semibold text-gray-800">{value}</h2>

    <p
      className={`text-sm mt-1 ${
        green ? "text-green-500" : red ? "text-red-500" : "text-gray-500"
      }`}
    >
      {subtitle}
    </p>

    {progress && (
      <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 rounded-full"
          style={{ width: value }}
        />
      </div>
    )}
  </div>
);

/* ================= PROGRESS CARD ================= */
const ProgressCard = ({ title, module, progress, button }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col justify-between">
    {/* TOP */}
    <div>
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-3">
          <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
            <FaFlask />
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 leading-tight">
              {title}
            </h4>
            <p className="text-sm text-gray-500">{module}</p>
          </div>
        </div>

        <span className="text-blue-600 font-semibold text-sm">{progress}%</span>
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-4">
        <div
          className="bg-blue-600 h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>

    {/* BUTTON */}
    <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2.5 rounded-xl font-medium transition">
      {button}
    </button>
  </div>
);

export default ProgressStats;

import React from "react";
import {
  PageBody,
  PageHeader,
  PageHeaderLeft,
  PageLayout,
  PageSubtitle,
  PageTitle,
} from "../../common/layout";

import {
  FaBookOpen,
  FaClock,
  FaChartLine,
  FaFlask,
  FaClipboardList,
  FaUserGraduate,
  FaCertificate,
  FaArrowRight,
  FaArrowUp,
  FaTrophy,
  FaCalendarAlt,
  FaMousePointer,
  FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProgressStats = () => {
  const navigate = useNavigate();

  const navigateToAuditLogs = () => {
    navigate("/audit-logs");
  };

  const navigateToUserProgress = () => {
    navigate("/user-progress");
  };

  const navigateToCertification = () => {
    navigate("/certification");
  };

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>Progress</PageTitle>
          <PageSubtitle>Track your learning journey</PageSubtitle>
        </PageHeaderLeft>
      </PageHeader>

      <PageBody>
        {/* ================= TOP STATS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
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

        {/* ================= REPORTS SECTION WITH 3 CARDS ================= */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Reports & Analytics
              </h3>
              <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                <FaMousePointer size={12} className="text-blue-500" />
                Click any card to view detailed insights
              </p>
            </div>
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <FaChartLine className="text-blue-500" size={12} />
              <span>Live Reports</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Report Card 1: Audit Logs */}
            <ReportCard
              icon={<FaClipboardList />}
              title="Audit Logs"
              description="Track system activities, user actions, and security events"
              onClick={navigateToAuditLogs}
              iconBg="bg-purple-100"
              iconColor="text-purple-600"
              hoverBorder="hover:border-purple-300"
              hoverBg="hover:bg-purple-50"
            />

            {/* Report Card 2: User Progress */}
            <ReportCard
              icon={<FaUserGraduate />}
              title="User Progress"
              description="Monitor learner achievements, completion rates, and milestones"
              onClick={navigateToUserProgress}
              iconBg="bg-blue-100"
              iconColor="text-blue-600"
              hoverBorder="hover:border-blue-300"
              hoverBg="hover:bg-blue-50"
            />

            {/* Report Card 3: Certification */}
            <ReportCard
              icon={<FaCertificate />}
              title="Certification Reports"
              description="View certificates issued, pending, and expiration status"
              onClick={navigateToCertification}
              iconBg="bg-emerald-100"
              iconColor="text-emerald-600"
              hoverBorder="hover:border-emerald-300"
              hoverBg="hover:bg-emerald-50"
            />
          </div>
        </div>

        {/* ================= CURRENT PROGRESS ================= */}
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Current Progress
            </h3>

            <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm shadow hover:bg-blue-700 transition">
              Past Level
            </button>
          </div>

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
      className={`text-sm mt-1 ${green ? "text-green-500" : red ? "text-red-500" : "text-gray-500"}`}
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

/* ================= REPORT CARD (CLICKABLE WITH CLEAR INDICATORS) ================= */
const ReportCard = ({
  icon,
  title,
  description,
  reportCount,
  reportLabel,
  trendIcon,
  trendValue,
  onClick,
  iconBg,
  iconColor,
  hoverBorder,
  hoverBg,
}) => (
  <div
    className={`bg-white rounded-2xl shadow-sm border-2 border-gray-100 cursor-pointer transition-all duration-300 hover:shadow-xl ${hoverBorder} ${hoverBg} group`}
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        onClick();
      }
    }}
  >
    <div className="p-5">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`${iconBg} p-3 rounded-xl transition-all duration-300 group-hover:scale-110`}
        >
          <div className={`text-xl ${iconColor}`}>{icon}</div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-800">{reportCount}</p>
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            {reportLabel}
          </p>
        </div>
      </div>

      <h3 className="text-base font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed mb-4">
        {description}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1 text-xs">
          {trendIcon}
          <span className="text-gray-500">{trendValue}</span>
        </div>

        {/* CLEAR CLICK INDICATOR */}
        <div className="flex items-center gap-2 text-blue-600">
          <span className="text-sm font-medium group-hover:underline">
            Click to view
          </span>
          <div className="bg-blue-600 rounded-full p-1 text-white group-hover:translate-x-1 transition-transform duration-300">
            <FaChevronRight size={10} />
          </div>
        </div>
      </div>
    </div>

    {/* HOVER EFFECT - BOTTOM BORDER INDICATOR */}
    <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
  </div>
);

/* ================= PROGRESS CARD ================= */
const ProgressCard = ({ title, module, progress, button }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col justify-between">
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
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-4">
        <div
          className="bg-blue-600 h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
    <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2.5 rounded-xl font-medium transition">
      {button}
    </button>
  </div>
);

export default ProgressStats;

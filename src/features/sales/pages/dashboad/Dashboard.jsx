import React from "react";
import {
  PageBody,
  PageHeader,
  PageHeaderLeft,
  PageLayout,
  PageSubtitle,
  PageTitle,
} from "../../common/layout";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { FaMedal, FaShieldAlt } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

// Assigned Card
const CourseCard = ({ title, days, progress, status, statusColor }) => (
  <div className="rounded-xl shadow-sm p-4 flex items-center justify-between bg-white">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
        <FaShieldAlt className="text-blue-600 text-xl" />
      </div>

      <div>
        <h2 className="text-sm sm:text-base font-semibold text-gray-800">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500">Due in {days} days</p>

        <div className="w-full h-1 bg-gray-200 rounded-full mt-2">
          <div
            className="h-full rounded-full"
            style={{ width: `${progress}%`, background: statusColor }}
          />
        </div>
      </div>
    </div>

    <span
      className="text-xs font-semibold px-3 py-1 rounded-md"
      style={{
        color: statusColor,
        background: `${statusColor}20`,
      }}
    >
      {status}
    </span>
  </div>
);

// Activity Item
const ActivityItem = ({ icon, bg, color, title, time }) => (
  <div className="flex items-start gap-4">
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center ${bg}`}
    >
      {React.cloneElement(icon, { className: `${color} text-xl` })}
    </div>

    <div>
      <h3 className="text-gray-800 font-semibold text-sm sm:text-base">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-gray-500 mt-1">{time}</p>
    </div>
  </div>
);

// Level Card
const LevelCard = ({ icon, title, status, active }) => (
  <div
    className={`flex-1 bg-white shadow-sm rounded-lg p-3 text-center ${
      !active && "opacity-60"
    }`}
  >
    <div className="flex justify-center mb-1">
      <span className="p-2 rounded-full bg-gray-100 text-lg">{icon}</span>
    </div>

    <p className="text-xs font-bold">{title}</p>
    <p className="text-[10px] font-semibold">{status}</p>
  </div>
);

/* ---------------- Main Component ---------------- */

export default function Dashboard() {
  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>Welcome back, Dr. Sarah</PageTitle>
          <PageSubtitle>You have 3 courses to finish this week.</PageSubtitle>
        </PageHeaderLeft>
      </PageHeader>

      <PageBody>
        {/* Banner */}
        <div className="bg-green-100 text-green-700 text-center text-xs sm:text-sm py-2 rounded-md mb-4 font-semibold">
          Welcome! Successfully Signup To The Platform
        </div>

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Main Card */}
          <div className="bg-[#1e63ff] text-white rounded-xl p-5 lg:col-span-1">
            <p className="text-yellow-300 text-xs font-semibold mb-1">
              LEVEL 1: PACEMAKER TRAINING CURRICULUM
            </p>

            <h2 className="text-lg font-semibold">
              Level 1: Device Introduction & Core Concepts
            </h2>

            <p className="text-sm opacity-80 mt-1">
              Last Topic: History & Evolution
            </p>

            <div className="mt-3">
              <div className="w-full h-2 bg-blue-300 rounded-full">
                <div className="h-2 bg-white rounded-full w-[65%]" />
              </div>
              <p className="text-right text-xs mt-1">65%</p>
            </div>

            <button className="mt-4 px-6 bg-white text-blue-600 text-sm py-2 rounded-full font-medium">
              Resume Lesson ▶
            </button>
          </div>

          {/* Learning Path */}
          <div className="border border-gray-300 rounded-lg p-3">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">Learning Path</h3>
              <span className="text-blue-600 text-xs cursor-pointer">
                View All
              </span>
            </div>

            <div className="flex gap-3">
              <LevelCard
                icon={<IoCheckmarkCircleOutline className="text-green-500" />}
                title="Level 1"
                status="COMPLETED"
                active
              />
              <LevelCard icon={<CiLock />} title="Level 2" status="LOCKED" />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Assigned */}
          <div className="border border-gray-300 rounded-lg p-3">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">Assigned User</h3>
              <span className="text-blue-600 text-xs cursor-pointer">
                View All
              </span>
            </div>

            <div className="space-y-3">
              <CourseCard
                title="What Is a Pacemaker?"
                days={4}
                progress={30}
                status="PENDING"
                statusColor="#f97316"
              />
              <CourseCard
                title="Key Terminology?"
                days={6}
                progress={60}
                status="STARTED"
                statusColor="#16a34a"
              />
            </div>
          </div>

          {/* Analytics */}
          <div className="border border-gray-300 rounded-lg p-3">
            <h3 className="font-semibold mb-4">Analytics</h3>

            <div className="flex gap-3">
              <div className="flex-1 bg-white rounded-lg p-3 text-center shadow-sm">
                <div className="w-14 h-14 rounded-full border-4 border-blue-500 flex items-center justify-center">
                  75%
                </div>
                <p className="text-xs mt-1">AVG SCORE</p>
              </div>

              <div className="flex-1 bg-white rounded-lg p-3 flex items-end gap-1 h-20 shadow-sm">
                {[20, 40, 60, 35].map((h, i) => (
                  <div
                    key={i}
                    className="w-2 bg-blue-500"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Activity */}
          <div className="border border-gray-300 rounded-lg p-3">
            <h3 className="font-semibold mb-4">Latest Updates</h3>

            <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
              <ActivityItem
                icon={<FiPlus />}
                bg="bg-blue-100"
                color="text-blue-600"
                title="New Course: Introduction to CRISPR-Cas9 Genomics"
                time="2 hours ago"
              />

              <div className="border-t border-gray-300" />

              <ActivityItem
                icon={<FaMedal />}
                bg="bg-green-100"
                color="text-green-600"
                title="Certificate earned: Patient Privacy Regulations"
                time="Yesterday"
              />
            </div>
          </div>
        </div>
      </PageBody>
    </PageLayout>
  );
}

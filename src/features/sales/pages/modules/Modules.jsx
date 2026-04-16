import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  PageLayout,
  PageBody,
  PageHeader,
  PageHeaderLeft,
  PageTitle,
  PageSubtitle,
  PageHeaderRight,
} from "../../common/layout/index";
import img from "../../../../assets/sales/pacemaker.jpg";

export default function Modules() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>Module Details</PageTitle>
          <PageSubtitle>
            Track your progress and continue your journey
          </PageSubtitle>
        </PageHeaderLeft>
        <PageHeaderRight />
      </PageHeader>
      <PageBody>
        {/* 🔹 Banner */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <img src={img} className="w-full h-56 sm:h-64 lg:h-80 object-cover" />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

          <div className="absolute bottom-5 left-5 right-5 text-white">
            <p className="text-xs sm:text-sm opacity-80 tracking-wide">
              LEVEL 1 • FOUNDATION
            </p>
            <h1 className="text-xl sm:text-3xl font-semibold leading-tight">
              Device Introduction & Core Concepts
            </h1>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-md text-sm border border-gray-300 shadow-sm hover:bg-white transition"
          >
            ← Back
          </button>
        </div>

        {/* 🔹 Progress Card */}
        <div className="bg-white rounded-2xl p-5 mt-5 shadow-md border border-gray-300">
          <p className="text-xs text-gray-500 tracking-wide">
            OVERALL COMPLETION
          </p>

          <div className="flex justify-between items-end mt-2">
            <h2 className="text-3xl font-bold text-blue-600">60%</h2>
            <p className="text-xs text-gray-500">2 of 3 Modules Complete</p>
          </div>

          <div className="w-full h-2.5 bg-gray-200 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-[60%]" />
          </div>
        </div>

        {/* 🔹 About */}
        <div className="bg-white rounded-2xl p-5 mt-5 shadow-md border border-gray-300">
          <h3 className="font-semibold text-gray-800 mb-2 text-lg">
            About this Level
          </h3>

          <p className="text-sm text-gray-600 leading-relaxed">
            A comprehensive, interactive self-paced program designed to build
            practical knowledge of pacemaker technology, implantation basics,
            and patient management.
          </p>

          <button className="text-blue-600 text-sm mt-3 font-medium hover:underline">
            Read more →
          </button>
        </div>

        {/* 🔹 Chapters */}
        <div className="mt-6">
          <h3 className="font-semibold text-gray-800 mb-4 text-lg">
            All Chapters
          </h3>

          {/* Module Card */}
          <div className="space-y-3">
            {/* Completed */}
            <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm border border-gray-300 hover:shadow-md transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                  ✓
                </div>

                <div>
                  <p className="text-xs text-gray-500">Chapter 1</p>
                  <h4 className="text-sm font-medium">
                    Pacemaker Fundamentals
                  </h4>
                </div>
              </div>

              <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
                Completed
              </span>
            </div>

            {/* Active */}
            <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow-md border border-blue-500 hover:shadow-lg transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  ▶
                </div>

                <div>
                  <p className="text-xs text-gray-500">Chapter 2 • Current</p>
                  <h4 className="text-sm font-medium">
                    Basic ECG Interpretation
                  </h4>
                </div>
              </div>

              <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md transition">
                Resume
              </button>
            </div>
          </div>
        </div>

        {/* 🔹 Bottom CTA */}
        <div>
          <button
            onClick={() => navigate("/chapters/id")}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 cursor-pointer text-white py-3 rounded-xl font-semibold shadow-md hover:opacity-90 transition"
          >
            Continue Learning
          </button>
        </div>
      </PageBody>
    </PageLayout>
  );
}

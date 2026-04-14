import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageLayout, PageBody } from "../../../common/layout/index";

export default function LevelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <PageLayout>
      <PageBody>
        {/* 🔹 Top Banner */}
        <div className="relative rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1581090700227-1e8c1f8f0c0d"
            className="w-full h-52 sm:h-64 object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Text */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <p className="text-xs sm:text-sm opacity-80">
              Level 1 — Foundation
            </p>
            <h1 className="text-lg sm:text-2xl font-semibold leading-tight">
              Device Introduction & Core Concepts
            </h1>
          </div>

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-3 left-3 bg-white/80 px-3 py-1 rounded text-sm"
          >
            ← Back
          </button>
        </div>

        {/* 🔹 Progress Section */}
        <div className="bg-white rounded-xl p-4 mt-4 shadow-sm border">
          <p className="text-xs text-gray-500">OVERALL COMPLETION</p>

          <div className="flex justify-between items-center mt-1">
            <h2 className="text-2xl font-bold text-blue-600">60%</h2>
            <p className="text-xs text-gray-500">2 of 3 Modules Complete</p>
          </div>

          <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
            <div className="h-full bg-blue-600 rounded-full w-[60%]" />
          </div>
        </div>

        {/* 🔹 About */}
        <div className="bg-white rounded-xl p-4 mt-4 shadow-sm border">
          <h3 className="font-semibold text-gray-800 mb-2">About this Level</h3>

          <p className="text-sm text-gray-600 leading-relaxed">
            A comprehensive, interactive self-paced program designed to build
            practical knowledge of pacemaker technology, implantation basics,
            and patient management. Learners progress through structured modules
            combining clinical concepts, device functionality, and real-world
            case scenarios.
          </p>

          <button className="text-blue-600 text-sm mt-2">Read more</button>
        </div>

        {/* 🔹 Modules */}
        <div className="mt-4">
          <h3 className="font-semibold text-gray-800 mb-3">All Modules</h3>

          {/* Module 1 */}
          <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm border mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                ✓
              </div>

              <div>
                <p className="text-xs text-gray-500">Module 1</p>
                <h4 className="text-sm font-medium">Pacemaker Fundamentals</h4>
              </div>
            </div>

            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
              Completed
            </span>
          </div>

          {/* Module 2 (Active) */}
          <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm border-2 border-blue-500">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                ▶
              </div>

              <div>
                <p className="text-xs text-gray-500">Module 2 (Current)</p>
                <h4 className="text-sm font-medium">
                  Basic ECG Interpretation
                </h4>
              </div>
            </div>

            <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded">
              RESUME
            </button>
          </div>
        </div>

        {/* 🔹 Bottom Sticky Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3">
          <button className="w-full bg-green-500 text-white py-3 rounded-lg font-medium">
            Continue Learning
          </button>
        </div>
      </PageBody>
    </PageLayout>
  );
}

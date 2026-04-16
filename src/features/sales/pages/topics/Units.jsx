import React from "react";
import { FaPlay, FaArrowLeft, FaArrowRight, FaList } from "react-icons/fa";
import img from "../../../../assets/sales/pacemaker.jpg";
import { useNavigate } from "react-router-dom";

const Units = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
        {/* ================= HERO ================= */}
        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 space-y-6">
          {/* ROW */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT (COL 1) → TEXT + IMAGE */}
            <div className="space-y-4">
              {/* TEXT */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
                  Definition & Purpose
                </h1>
                <p className="text-gray-500 mt-3 leading-relaxed">
                  A pacemaker is a small medical device implanted in the chest
                  to regulate abnormal heart rhythms. It sends electrical
                  impulses to ensure the heart beats at a normal and steady
                  rate.
                </p>
              </div>

              {/* IMAGE */}
              <div className="rounded-xl overflow-hidden">
                <img
                  src={img}
                  alt="heart"
                  className="w-full h-60 object-cover"
                />
              </div>
            </div>

            {/* RIGHT (COL 2-3) → VIDEO */}
            <div className="lg:col-span-2">
              <div className="relative rounded-xl overflow-hidden group h-full min-h-[250px]">
                <img
                  src={img}
                  alt="video"
                  className="w-full h-80 object-cover"
                />

                {/* PLAY BUTTON */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-orange-500 p-4 rounded-full text-white shadow-lg group-hover:scale-110 transition">
                    <FaPlay size={18} />
                  </div>
                </div>

                {/* VIDEO BAR */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs flex justify-between px-3 py-2">
                  <span>08:42</span>
                  <span>24:15</span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= BUTTON ROW ================= */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-4">
            <button className="flex items-center gap-2 text-gray-600 hover:text-black">
              <FaArrowLeft />
              Previous
            </button>

            <button className="bg-blue-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 shadow hover:bg-blue-700 transition">
              <FaList />
              All Topics
            </button>

            <button className="flex items-center gap-2 text-gray-600 hover:text-black">
              Next
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* ================= BELOW CONTENT ================= */}
        <div className="space-y-6">
          {/* QUIZ CARD */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <p className="text-sm text-gray-500">UNIT 2 OF 4</p>
            <h3 className="font-semibold text-gray-800 mt-1">
              Advanced Cardiac Life Support
            </h3>

            <button
              onClick={() => navigate("/quize")}
              className="mt-4 border border-blue-500 text-blue-600 py-2 px-4 rounded-xl hover:bg-blue-50 transition cursor-pointer"
            >
              Attempt a Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Units;

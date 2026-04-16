import React, { useState } from "react";
import {
  PageBody,
  PageHeader,
  PageHeaderLeft,
  PageLayout,
  PageSubtitle,
  PageTitle,
} from "../../common/layout";
import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaArrowLeft,
  FaArrowRight,
  FaForward,
} from "react-icons/fa";

const Exam = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("B");

  const options = [
    { id: "A", text: "Right Coronary Artery (RCA)" },
    { id: "B", text: "Left Anterior Descending (LAD)" },
    { id: "C", text: "Left Circumflex Artery (LCx)" },
    { id: "D", text: "Posterior Descending Artery (PDA)" },
  ];

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>Level Exam</PageTitle>
          <PageSubtitle>Final assessment</PageSubtitle>
        </PageHeaderLeft>
      </PageHeader>

      <PageBody>
        <div className="max-w-6xl mx-auto">
          {/* GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ================= LEFT ================= */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-300 p-6">
              {/* BADGE */}
              <span className="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
                LEVEL EXAM
              </span>

              {/* QUESTION */}
              <h2 className="mt-4 text-xl font-semibold text-gray-800 leading-relaxed">
                A 54-year-old patient presents with acute chest pain. The ECG
                shows ST-segment elevation in leads V1-V4. Which coronary artery
                is most likely occluded?
              </h2>

              {/* OPTIONS */}
              <div className="mt-6 space-y-4">
                {options.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setSelected(opt.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                      selected === opt.id
                        ? "border-blue-500 bg-blue-50 shadow-sm"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 flex items-center justify-center rounded-full border font-semibold ${
                        selected === opt.id
                          ? "bg-blue-600 text-white border-blue-600"
                          : "text-gray-500"
                      }`}
                    >
                      {opt.id}
                    </div>

                    <span className="text-gray-700 flex-1">{opt.text}</span>

                    {selected === opt.id && (
                      <FaCheckCircle className="text-blue-600" />
                    )}
                  </div>
                ))}
              </div>

              {/* SUBMIT */}
              <button
                onClick={() => navigate("/quize/result")}
                className="w-full mt-8 bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-semibold shadow transition"
              >
                Submit Exam
              </button>

              {/* Note */}
              <div className="bg-[#D2EBDF7D] p-6 rounded-md my-4">
                <h2 className="text-[#0b7285] font-semibold text-lg mb-4 flex items-center gap-2">
                  📘 <span>Important Note</span>
                </h2>

                <div className="space-y-4 text-[#0b7285] text-[15px] leading-relaxed font-medium">
                  <p className="flex gap-2">
                    👉{" "}
                    <span>
                      Firstly, You Need To Complete The Quick Assessments For
                      Each Topic. These Are Designed To Help You Understand The
                      Content Step By Step. 📝✨
                    </span>
                  </p>

                  <p className="flex gap-2">
                    👉{" "}
                    <span>
                      Once You Finish All The Topics In A Level, You Will Need
                      To Take A Final Exam. 🎯
                    </span>
                  </p>

                  <p className="flex gap-2">
                    🏆{" "}
                    <span>
                      After Successfully Passing The Final Exam, You Will Earn
                      Your Certificate. 🎓
                    </span>
                  </p>

                  <p className="flex gap-2">
                    💡{" "}
                    <span>
                      Stay Consistent, Complete Each Step, And You’ll Achieve
                      Your Goal Smoothly! 🚀
                    </span>
                  </p>
                </div>
              </div>

              {/* FOOTER NAV */}
              <div className="flex items-center justify-between mt-6 text-sm">
                <button className="flex items-center gap-2 text-gray-600 hover:text-black">
                  <FaArrowLeft />
                  Previous
                </button>

                <button className="flex items-center gap-2 bg-orange-400 text-white px-4 py-1.5 rounded-lg hover:bg-orange-500">
                  Skip
                  <FaForward />
                </button>

                <button className="flex items-center gap-2 text-gray-600 hover:text-black">
                  Next
                  <FaArrowRight />
                </button>
              </div>
            </div>

            {/* ================= RIGHT PANEL ================= */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-300 p-5 h-fit sticky top-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                Exam Progress
              </h3>

              <p className="text-sm text-gray-500 mb-2">Question 1 of 20</p>

              {/* PROGRESS BAR */}
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-4">
                <div className="bg-purple-600 h-full w-[5%]" />
              </div>

              <button
                onClick={() => navigate("/quize/result")}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl text-sm"
              >
                Finish Exam
              </button>
            </div>
          </div>
        </div>
      </PageBody>
    </PageLayout>
  );
};

export default Exam;

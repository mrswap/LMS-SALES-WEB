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

const Quiz = () => {
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
          <PageTitle>Quiz</PageTitle>
          <PageSubtitle>Test your knowledge</PageSubtitle>
        </PageHeaderLeft>
      </PageHeader>

      <PageBody>
        <div className="max-w-6xl mx-auto">
          {/* GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ================= LEFT ================= */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-300 p-6">
              {/* BADGE */}
              <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                TOPIC EXAM
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
                onClick={() => navigate("result")}
                className="w-full mt-8 bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-semibold shadow transition"
              >
                Submit Answer
              </button>

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
                Quiz Progress
              </h3>

              <p className="text-sm text-gray-500 mb-2">Question 1 of 10</p>

              {/* PROGRESS BAR */}
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-4">
                <div className="bg-blue-600 h-full w-[10%]" />
              </div>

              <button
                onClick={() => navigate("result")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm"
              >
                Finish Quiz
              </button>
            </div>
          </div>
        </div>
      </PageBody>
    </PageLayout>
  );
};

export default Quiz;

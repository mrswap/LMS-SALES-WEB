import { FaCheck, FaTimes, FaAward } from "react-icons/fa";
import {
  PageBody,
  PageHeader,
  PageHeaderLeft,
  PageLayout,
  PageSubtitle,
  PageTitle,
} from "../../common/layout";
import { useNavigate } from "react-router-dom";

const QuizResult = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>Quiz Result</PageTitle>
          <PageSubtitle>Your performance summary</PageSubtitle>
        </PageHeaderLeft>
      </PageHeader>

      <PageBody>
        <div className="max-w-4xl mx-auto">
          {/* MAIN CARD */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-300 p-6 sm:p-8 text-center space-y-6">
            {/* ================= SCORE ================= */}
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <div className="w-full h-full rounded-full border-[12px] border-teal-500 flex items-center justify-center text-3xl font-bold text-gray-800">
                  85%
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">SCORE</p>
            </div>

            {/* ================= SUCCESS ================= */}
            <div className="bg-green-50 text-green-700 p-4 rounded-xl">
              <h3 className="font-semibold text-lg flex items-center justify-center gap-2">
                <FaAward /> Congratulations!
              </h3>
              <p className="text-sm mt-1">
                You have successfully passed the Cardiology Module Quiz.
              </p>
            </div>

            {/* ================= STATS ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                icon={<FaCheck />}
                value="17"
                label="Correct"
                color="text-green-600"
                bg="bg-green-50"
              />

              <StatCard
                icon={<FaTimes />}
                value="3"
                label="Incorrect"
                color="text-red-500"
                bg="bg-red-50"
              />

              <StatCard value="2" label="Attempts" bg="bg-gray-50" />
            </div>

            {/* ================= BUTTONS ================= */}
            <div className="space-y-3">
              <button
                onClick={() => navigate("/certificate")}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-semibold shadow transition flex items-center justify-center gap-2"
              >
                <FaAward />
                Earn Your Certificate
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button className="border border-gray-300 hover:bg-gray-50 py-2 rounded-xl transition">
                  Review
                </button>
                <button className="border border-gray-300 hover:bg-gray-50 py-2 rounded-xl transition">
                  Retry
                </button>
              </div>
            </div>

            {/* ================= FOOTER ================= */}
            <p className="text-xs text-gray-400 pt-2">
              Quiz ID: #CAR-1092-24 • Completed on Oct 24, 2023
            </p>
          </div>
        </div>
      </PageBody>
    </PageLayout>
  );
};

/* ================= STAT CARD ================= */
const StatCard = ({ icon, value, label, color, bg }) => (
  <div className={`p-4 rounded-xl flex items-center justify-between ${bg}`}>
    <div className={`flex items-center gap-2 font-semibold ${color}`}>
      {icon}
      {value}
    </div>

    <span className="text-sm text-gray-500">{label}</span>
  </div>
);

export default QuizResult;

// import React, { useState } from "react";
// import { FiFileText, FiHelpCircle } from "react-icons/fi";
// import ExamAssessment from "./components/ExamAssessment";
// import QuizAssessment from "./components/QuizAssessment";
// import {
//   PageBody,
//   PageHeader,
//   PageHeaderLeft,
//   PageHeaderRight,
//   PageLayout,
//   PageSubtitle,
//   PageTitle,
// } from "../../common/layout";
// import { useTranslation } from "react-i18next";

// const Assessment = () => {
//   const [activeTab, setActiveTab] = useState("quiz");
//   const { t } = useTranslation();

//   return (
//     <PageLayout>
//       <PageBody>
//         {/* Tabs */}
//         <div className="mb-6">
//           <div className="border-b border-stone-200">
//             <nav className="flex gap-8" aria-label="Tabs">
//               <button
//                 onClick={() => setActiveTab("quiz")}
//                 className={`
//                   group flex items-center gap-2 py-3 px-1  text-base transition-all duration-300
//                   ${
//                     activeTab === "quiz"
//                       ? "text-stone-800 border-b-2 border-amber-600"
//                       : "text-stone-500 hover:text-stone-700 border-b-2 border-transparent hover:border-stone-300"
//                   }
//                 `}
//               >
//                 <FiHelpCircle
//                   className={`text-lg transition-transform duration-300 ${
//                     activeTab === "quiz"
//                       ? "text-amber-600"
//                       : "group-hover:scale-105"
//                   }`}
//                 />
//                 <span>{t("assessment.tabs.quiz")}</span>
//               </button>
//               <button
//                 onClick={() => setActiveTab("exam")}
//                 className={`
//                   group flex items-center gap-2 py-3 px-1  text-base transition-all duration-300
//                   ${
//                     activeTab === "exam"
//                       ? "text-stone-800 border-b-2 border-amber-600"
//                       : "text-accent-500 hover:text-stone-700 border-b-2 border-transparent hover:border-stone-300"
//                   }
//                 `}
//               >
//                 <FiFileText
//                   className={`text-lg transition-transform duration-300 ${
//                     activeTab === "exam"
//                       ? "text-amber-600"
//                       : "group-hover:scale-105"
//                   }`}
//                 />
//                 <span>{t("assessment.tabs.exam")}</span>
//               </button>
//             </nav>
//           </div>
//         </div>

//         {/* Tab Content */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-stone-200 shadow-xl shadow-stone-200/30 p-6 md:p-8">
//           {activeTab === "exam" ? <ExamAssessment /> : <QuizAssessment />}
//         </div>
//       </PageBody>
//     </PageLayout>
//   );
// };

// export default Assessment;

import React, { useState } from "react";
import { FiFileText, FiHelpCircle } from "react-icons/fi";
import ExamAssessment from "./components/ExamAssessment";
import QuizAssessment from "./components/QuizAssessment";
import {
  PageBody,
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight,
  PageLayout,
  PageSubtitle,
  PageTitle,
} from "../../common/layout";
import { useTranslation } from "react-i18next";

const Assessment = () => {
  const [activeTab, setActiveTab] = useState("quiz");
  const { t } = useTranslation();

  return (
    <PageLayout>
      <PageBody>
        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-stone-200">
            <nav className="flex gap-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("quiz")}
                className={`
                  group flex items-center gap-2 py-3 px-1 font-[400] transition-all duration-300
                  ${
                    activeTab === "quiz"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-stone-500 hover:text-stone-700 border-b-2 border-transparent hover:border-stone-300"
                  }
                `}
              >
                <FiHelpCircle
                  className={`text-lg transition-transform duration-300 ${
                    activeTab === "quiz"
                      ? "text-blue-600"
                      : "group-hover:scale-105"
                  }`}
                />
                <span>{t("assessment.tabs.quiz")}</span>
              </button>
              <button
                onClick={() => setActiveTab("exam")}
                className={`
                  group flex items-center gap-2 py-3 px-1 font-[400] transition-all duration-300
                  ${
                    activeTab === "exam"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-accent-500 hover:text-stone-700 border-b-2 border-transparent hover:border-stone-300"
                  }
                `}
              >
                <FiFileText
                  className={`text-lg transition-transform duration-300 ${
                    activeTab === "exam"
                      ? "text-blue-600"
                      : "group-hover:scale-105"
                  }`}
                />
                <span>{t("assessment.tabs.exam")}</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-stone-200 shadow-xl shadow-stone-200/30 p-6 md:p-8">
          {activeTab === "exam" ? <ExamAssessment /> : <QuizAssessment />}
        </div>
      </PageBody>
    </PageLayout>
  );
};

export default Assessment;

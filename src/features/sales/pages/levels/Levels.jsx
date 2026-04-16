// import React, { useState } from "react";
// import {
//   PageBody,
//   PageHeader,
//   PageHeaderLeft,
//   PageHeaderRight,
//   PageLayout,
//   PageSubtitle,
//   PageTitle,
// } from "../../common/layout";
// import { useNavigate } from "react-router-dom";
// import img from "../../../../assets/sales/pacemaker.jpg";

// /* ---------------- Data ---------------- */
// const levelsData = [
//   {
//     id: 1,
//     title: "Level 1 — Device Introduction & Core Concepts",
//     lessons: "4.5 Hours • 2 Modules",
//     progress: 100,
//     status: "COMPLETED",
//     button: "Take an Exam",
//     img: img,
//   },
//   {
//     id: 2,
//     title: "Level 2 — System Components & Basic Operation",
//     lessons: "4.5 Hours • 2 Modules",
//     progress: 60,
//     status: "RUNNING",
//     button: "Continue",
//     img: img,
//   },
//   {
//     id: 3,
//     title: "Intermediate: Procedural Workflows",
//     lessons: "6.2 Hours • 2 Modules",
//     progress: 0,
//     status: "LOCKED",
//     button: "Start Level",
//     img: img,
//   },
// ];

// /* ---------------- Styles ---------------- */
// const statusStyles = {
//   COMPLETED: "bg-green-100 text-green-600",
//   RUNNING: "bg-blue-100 text-blue-600",
//   LOCKED: "bg-gray-200 text-gray-500",
// };

// const buttonStyles = {
//   COMPLETED: "bg-blue-600 text-white",
//   RUNNING: "bg-green-500 text-white",
//   LOCKED: "bg-gray-200 text-gray-500 cursor-not-allowed",
// };

// /* ---------------- Card ---------------- */
// const LevelCard = ({ item }) => {
//   const navigate = useNavigate();

//   return (
//     <div
//       // onClick={() => navigate(`/levels/${item.id}`)}
//       className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-300 cursor-pointer hover:shadow-md transition"
//     >
//       <div className="relative">
//         <img src={item.img} className="w-full h-40 object-cover" />

//         <span
//           className={`absolute top-2 right-2 text-xs px-2 py-1 rounded ${statusStyles[item.status]}`}
//         >
//           {item.status}
//         </span>
//       </div>

//       <div className="p-4">
//         <h3 className="font-semibold text-sm sm:text-base text-gray-800">
//           {item.title}
//         </h3>

//         <p className="text-xs text-gray-500 mt-1">{item.lessons}</p>

//         <div className="mt-3">
//           <div className="flex justify-between text-xs text-gray-500 mb-1">
//             <span>Level Progress</span>
//             <span>{item.progress}%</span>
//           </div>

//           <div className="w-full h-2 bg-gray-200 rounded-full">
//             <div
//               className="h-full bg-blue-500 rounded-full"
//               style={{ width: `${item.progress}%` }}
//             />
//           </div>
//         </div>

//         <button
//           onClick={(e) => {
//             e.stopPropagation();

//             if (item.button === "Continue") {
//               navigate(`/levels/${item.id}`);
//             } else if (item.button === "Take an Exam") {
//               // navigate(`/exam/${item.id}`);
//             }
//           }}
//           className={`mt-4 w-full py-2 rounded-lg cursor-pointer text-sm font-medium ${buttonStyles[item.status]}`}
//           disabled={item.status === "LOCKED"}
//         >
//           {item.button}
//         </button>
//       </div>
//     </div>
//   );
// };

// /* ---------------- Main ---------------- */
// export default function LevelsPage() {
//   const [activeTab, setActiveTab] = useState("ALL");

//   // 🔥 Filter logic
//   const filteredLevels =
//     activeTab === "COMPLETED"
//       ? levelsData.filter((item) => item.status === "COMPLETED")
//       : levelsData;

//   return (
//     <PageLayout>
//       <PageHeader>
//         <PageHeaderLeft>
//           <PageTitle>Levels</PageTitle>
//           <PageSubtitle>
//             Master your journey through structured learning levels
//           </PageSubtitle>
//         </PageHeaderLeft>
//         <PageHeaderRight></PageHeaderRight>
//       </PageHeader>
//       <PageBody>
//         {/* Tabs */}
//         <div className="flex items-center gap-2 mb-6">
//           <button
//             onClick={() => setActiveTab("ALL")}
//             className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
//           ${
//             activeTab === "ALL"
//               ? "bg-primary text-white shadow-sm"
//               : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//           }`}
//           >
//             All Levels
//           </button>

//           <button
//             onClick={() => setActiveTab("COMPLETED")}
//             className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
//           ${
//             activeTab === "COMPLETED"
//               ? "bg-primary text-white shadow-sm"
//               : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//           }`}
//           >
//             Completed
//           </button>
//         </div>

//         {/* Grid */}
//         {filteredLevels.length > 0 ? (
//           <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             {filteredLevels.map((item) => (
//               <LevelCard key={item.id} item={item} />
//             ))}
//           </div>
//         ) : (
//           <div className="flex flex-col items-center justify-center py-16 text-center">
//             <div className="text-4xl mb-2">📚</div>
//             <p className="text-gray-500 text-sm">No completed levels yet</p>
//           </div>
//         )}
//       </PageBody>
//     </PageLayout>
//   );
// }

import React, { useState } from "react";
import {
  PageBody,
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight,
  PageLayout,
  PageSubtitle,
  PageTitle,
} from "../../common/layout";
import { useNavigate } from "react-router-dom";
import img from "../../../../assets/sales/pacemaker.jpg";

/* ---------------- Data ---------------- */
const levelsData = [
  {
    id: 1,
    title: "Level 1 — Device Introduction & Core Concepts",
    lessons: "4.5 Hours • 2 Modules",
    progress: 100,
    status: "COMPLETED",
    button: "Take an Exam",
    img: img,
  },
  {
    id: 2,
    title: "Level 2 — System Components & Basic Operation",
    lessons: "4.5 Hours • 2 Modules",
    progress: 60,
    status: "RUNNING",
    button: "Continue",
    img: img,
  },
  {
    id: 3,
    title: "Intermediate: Procedural Workflows",
    lessons: "6.2 Hours • 2 Modules",
    progress: 0,
    status: "LOCKED",
    button: "Start Level",
    img: img,
  },
];

/* ---------------- Card ---------------- */
const LevelCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-300 shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="relative">
        <img
          src={item.img}
          className="w-full h-44 object-cover group-hover:scale-105 transition duration-300"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <span className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full bg-white/90 text-gray-700 shadow">
          {item.status}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-sm sm:text-base text-gray-800 line-clamp-2">
          {item.title}
        </h3>

        <p className="text-xs text-gray-500 mt-1">{item.lessons}</p>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{item.progress}%</span>
          </div>

          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
              style={{ width: `${item.progress}%` }}
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();

            if (item.button === "Continue") {
              navigate(`/levels/${item.id}`);
            } else if (item.button === "Take an Exam") {
              navigate(`/levels/exam/${item.id}`);
            }
          }}
          disabled={item.status === "LOCKED"}
          className={`mt-5 w-full py-2.5 rounded-xl text-sm font-medium transition 
            ${
              item.status === "LOCKED"
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : item.status === "RUNNING"
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90"
                  : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:opacity-90"
            }`}
        >
          {item.button}
        </button>
      </div>
    </div>
  );
};

/* ---------------- Main ---------------- */
export default function LevelsPage() {
  const [activeTab, setActiveTab] = useState("ALL");

  const filteredLevels =
    activeTab === "COMPLETED"
      ? levelsData.filter((item) => item.status === "COMPLETED")
      : levelsData;

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>Learning Levels</PageTitle>
          <PageSubtitle>
            Track your progress and continue your journey
          </PageSubtitle>
        </PageHeaderLeft>
        <PageHeaderRight />
      </PageHeader>

      <PageBody>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex items-center gap-3 mb-6">
            {["ALL", "COMPLETED"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-1.5 rounded-full text-sm font-medium transition
                  ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {tab === "ALL" ? "All Levels" : "Completed"}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filteredLevels.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredLevels.map((item) => (
                <LevelCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="text-5xl mb-3">📚</div>
              <p className="text-gray-500 text-sm">No completed levels yet</p>
            </div>
          )}
        </div>
      </PageBody>
    </PageLayout>
  );
}

// import React, { useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   PageLayout,
//   PageBody,
//   PageHeader,
//   PageHeaderLeft,
//   PageTitle,
//   PageSubtitle,
//   PageHeaderRight,
// } from "../../common/layout/index";
// import img from "../../../../assets/sales/pacemaker.jpg";
// import { useDispatch, useSelector } from "react-redux";
// import { getChapterById } from "../../../../redux/slice/coursePreviewSlice";

// export default function Chapters() {
//   const { chapterId: id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { currentChapter, isLoading, isError, message } = useSelector(
//     (state) => state.course,
//   );

//   useEffect(() => {
//     if (id) {
//       dispatch(getChapterById(id));
//     }
//   }, [dispatch, id]);

//   console.log("currentChapter", currentChapter);

//   return (
//     <PageLayout>
//       <PageHeader>
//         <PageHeaderLeft>
//           <PageTitle>Chapter Details</PageTitle>
//           <PageSubtitle>
//             Track your progress and continue your journey
//           </PageSubtitle>
//         </PageHeaderLeft>
//         <PageHeaderRight />
//       </PageHeader>
//       <PageBody>
//         {/* 🔹 Banner */}
//         <div className="relative rounded-2xl overflow-hidden shadow-lg">
//           <img src={img} className="w-full h-56 sm:h-64 lg:h-80 object-cover" />

//           {/* Gradient Overlay */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

//           <div className="absolute bottom-5 left-5 right-5 text-white">
//             <p className="text-xs sm:text-sm opacity-80 tracking-wide">
//               LEVEL 1 • FOUNDATION
//             </p>
//             <h1 className="text-xl sm:text-3xl font-semibold leading-tight">
//               Device Introduction & Core Concepts
//             </h1>
//           </div>

//           <button
//             onClick={() => navigate(-1)}
//             className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-md text-sm border border-gray-300 shadow-sm hover:bg-white transition"
//           >
//             ← Back
//           </button>
//         </div>

//         {/* 🔹 Progress Card */}
//         <div className="bg-white rounded-2xl p-5 mt-5 shadow-md border border-gray-300">
//           <p className="text-xs text-gray-500 tracking-wide">
//             OVERALL COMPLETION
//           </p>

//           <div className="flex justify-between items-end mt-2">
//             <h2 className="text-3xl font-bold text-blue-600">60%</h2>
//             <p className="text-xs text-gray-500">2 of 3 Modules Complete</p>
//           </div>

//           <div className="w-full h-2.5 bg-gray-200 rounded-full mt-3 overflow-hidden">
//             <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-[60%]" />
//           </div>
//         </div>

//         {/* 🔹 About */}
//         <div className="bg-white rounded-2xl p-5 mt-5 shadow-md border border-gray-300">
//           <h3 className="font-semibold text-gray-800 mb-2 text-lg">
//             About this Level
//           </h3>

//           <p className="text-sm text-gray-600 leading-relaxed">
//             A comprehensive, interactive self-paced program designed to build
//             practical knowledge of pacemaker technology, implantation basics,
//             and patient management.
//           </p>

//           <button className="text-blue-600 text-sm mt-3 font-medium hover:underline">
//             Read more →
//           </button>
//         </div>

//         {/* 🔹 Chapters */}
//         <div className="mt-6">
//           <h3 className="font-semibold text-gray-800 mb-4 text-lg">
//             All Topics
//           </h3>

//           {/* Module Card */}
//           <div className="space-y-3">
//             {/* Completed */}
//             <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm border border-gray-300 hover:shadow-md transition">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
//                   ✓
//                 </div>

//                 <div>
//                   <p className="text-xs text-gray-500">Topic 1</p>
//                   <h4 className="text-sm font-medium">XXXXXXXXXX</h4>
//                 </div>
//               </div>

//               <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
//                 Completed
//               </span>
//             </div>

//             {/* Active */}
//             <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow-md border border-blue-500 hover:shadow-lg transition">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
//                   ▶
//                 </div>

//                 <div>
//                   <p className="text-xs text-gray-500">Chapter 2 • Current</p>
//                   <h4 className="text-sm font-medium">XXXXXXX</h4>
//                 </div>
//               </div>

//               <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md transition">
//                 Resume
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* 🔹 Bottom CTA */}
//         <div>
//           <button
//             onClick={() => navigate("/topics")}
//             className="w-full bg-gradient-to-r from-green-500 to-emerald-600 cursor-pointer text-white py-3 rounded-xl font-semibold shadow-md hover:opacity-90 transition"
//           >
//             Continue Learning
//           </button>
//         </div>
//       </PageBody>
//     </PageLayout>
//   );
// }

import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getChapterById } from "../../../../redux/slice/coursePreviewSlice";
import {
  IoArrowBack,
  IoBookOutline,
  IoChevronForward,
  IoPlayCircle,
  IoCheckmarkCircle,
  IoLockClosed,
  IoTrendingUp,
  IoRibbonOutline,
  IoTimeOutline,
  IoPlay,
  IoListOutline,
} from "react-icons/io5";

export default function Chapters() {
  const { chapterId: id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentChapter, isLoading, isError, message } = useSelector(
    (state) => state.course,
  );

  useEffect(() => {
    if (id) {
      dispatch(getChapterById(id));
    }
  }, [dispatch, id]);

  console.log("currentChapter", currentChapter);

  // Your current topics data
  const topics = [
    {
      id: 1,
      title: "Topic 1",
      description: "Topic 1 explanation",
      thumbnail: null,
      is_unlocked: true,
      is_completed: false,
    },
    {
      id: 2,
      title: "Topic 2",
      description: "Topic 2 explanation",
      thumbnail: null,
      is_unlocked: false,
      is_completed: false,
    },
    {
      id: 3,
      title: "Topic 3",
      description: "Topic 3 explanation",
      thumbnail: null,
      is_unlocked: false,
      is_completed: false,
    },
    {
      id: 30,
      title: "Topic 1",
      description: null,
      thumbnail: null,
      is_unlocked: false,
      is_completed: false,
    },
    {
      id: 31,
      title: "Topic 1",
      description: null,
      thumbnail: null,
      is_unlocked: false,
      is_completed: false,
    },
  ];

  // Calculate progress
  const completedTopics = topics.filter((t) => t.is_completed).length;
  const totalTopics = topics.length;
  const progress = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;

  // Calculate total estimated time (example: 10 min per topic)
  const totalTime = totalTopics * 10;

  // Get current topic (first unlocked and not completed)
  const currentTopic =
    topics.find((t) => t.is_unlocked && !t.is_completed) ||
    topics.find((t) => t.is_unlocked);

  // Get next topic for CTA
  const nextTopic = topics.find((t) => !t.is_completed && t.is_unlocked);

  if (isLoading) {
    return (
      <PageLayout>
        <PageBody>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </PageBody>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>Chapter Details</PageTitle>
          <PageSubtitle>Track your progress through topics</PageSubtitle>
        </PageHeaderLeft>
        <PageHeaderRight />
      </PageHeader>
      <PageBody>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
          {/* 🔹 Hero Banner */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl group">
            <img
              src={img}
              className="w-full h-56 sm:h-72 lg:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
              alt="Chapter Banner"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-500/80 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium">
                  Chapter {currentChapter?.chapter_number || 1} •{" "}
                  {currentChapter?.name || "Core Topics"}
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs flex items-center gap-1">
                  <IoTimeOutline className="w-3 h-3" /> Self-paced
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                {currentChapter?.name || "Device Introduction & Core Concepts"}
              </h1>
              <p className="text-sm sm:text-base text-white/80 mt-2 max-w-2xl">
                {currentChapter?.description ||
                  "Master the fundamentals through interactive topics"}
              </p>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm hover:bg-white px-3 py-1.5 rounded-xl text-sm font-medium transition-all hover:shadow-lg flex items-center gap-1"
            >
              <IoArrowBack className="w-4 h-4" /> Back
            </button>
          </div>

          {/* 🔹 Stats & Progress Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-blue-600 font-medium">PROGRESS</p>
                  <h2 className="text-3xl font-bold text-blue-700 mt-1">
                    {Math.round(progress)}%
                  </h2>
                </div>
                <IoTrendingUp className="text-blue-400 w-8 h-8" />
              </div>
              <div className="w-full h-2 bg-blue-200 rounded-full mt-3">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-purple-600 font-medium">
                    COMPLETED
                  </p>
                  <h2 className="text-3xl font-bold text-purple-700 mt-1">
                    {completedTopics}/{totalTopics}
                  </h2>
                </div>
                <IoRibbonOutline className="text-purple-400 w-8 h-8" />
              </div>
              <p className="text-xs text-purple-600 mt-2">Topics completed</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-green-600 font-medium">
                    EST. TIME
                  </p>
                  <h2 className="text-3xl font-bold text-green-700 mt-1">
                    {totalTime} min
                  </h2>
                </div>
                <IoTimeOutline className="text-green-400 w-8 h-8" />
              </div>
              <p className="text-xs text-green-600 mt-2">Total learning time</p>
            </div>
          </div>

          {/* 🔹 About Section */}
          <div className="bg-white rounded-xl p-5 mt-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <IoBookOutline className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-2">
                  About this Chapter
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {currentChapter?.description ||
                    "A comprehensive, interactive chapter designed to build practical knowledge through structured topics and hands-on learning experiences."}
                </p>
                <button className="text-blue-600 text-sm mt-2 font-medium hover:text-blue-700 transition-colors flex items-center gap-1">
                  Read more <IoChevronForward className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* 🔹 Topics Section */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                <IoListOutline className="text-blue-600" />
                All Topics
              </h3>
              <p className="text-xs text-gray-500">
                {completedTopics} of {totalTopics} completed
              </p>
            </div>

            <div className="space-y-3">
              {topics.map((topic, index) => (
                <div
                  key={topic.id}
                  className={`bg-white rounded-xl p-4 transition-all duration-300 hover:shadow-md cursor-pointer
                    ${topic.is_unlocked && !topic.is_completed ? "border-2 border-blue-500 shadow-lg" : "border border-gray-200 hover:border-blue-300"}`}
                  onClick={() => {
                    if (topic.is_unlocked) {
                      navigate(`/topics/${topic.id}`);
                    }
                  }}
                >
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all
                          ${topic.is_completed ? "bg-green-100" : topic.is_unlocked ? "bg-blue-100" : "bg-gray-100"}`}
                      >
                        {topic.is_completed ? (
                          <IoCheckmarkCircle className="w-6 h-6 text-green-600" />
                        ) : topic.is_unlocked ? (
                          <IoPlay className="w-6 h-6 text-blue-600" />
                        ) : (
                          <IoLockClosed className="w-6 h-6 text-gray-400" />
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-xs font-medium text-gray-500">
                            Topic {index + 1}
                          </p>
                          {topic.is_unlocked && !topic.is_completed && (
                            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
                              Current
                            </span>
                          )}
                          {topic.is_completed && (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                              Completed
                            </span>
                          )}
                          {!topic.is_unlocked && (
                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                              <IoLockClosed className="w-3 h-3" /> Locked
                            </span>
                          )}
                        </div>
                        <h4 className="text-base font-semibold text-gray-800 mt-0.5">
                          {topic.title}
                        </h4>
                        {topic.description && (
                          <p className="text-xs text-gray-500 mt-1">
                            {topic.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {topic.is_completed ? (
                      <div className="text-green-600 text-sm font-medium flex items-center gap-1">
                        <IoCheckmarkCircle className="w-4 h-4" /> Completed
                      </div>
                    ) : (
                      <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105
                          ${
                            topic.is_unlocked
                              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg"
                              : "bg-gray-100 text-gray-500 cursor-not-allowed"
                          }`}
                        disabled={!topic.is_unlocked}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (topic.is_unlocked) {
                            navigate(`/topics/${topic.id}`);
                          }
                        }}
                      >
                        {topic.is_unlocked ? "Start Topic" : "Locked"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🔹 Bottom Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 shadow-lg z-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="hidden sm:block">
                <p className="text-sm text-gray-600">
                  Continue your learning journey
                </p>
                <p className="text-xs text-gray-400">
                  {nextTopic
                    ? `Next: ${nextTopic.title}`
                    : "All topics completed! 🎉"}
                </p>
              </div>
              <button
                onClick={() => {
                  if (nextTopic) {
                    navigate(`/topics/${nextTopic.id}`);
                  }
                }}
                disabled={!nextTopic}
                className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2
                  ${
                    nextTopic
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md hover:shadow-lg"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                <IoPlayCircle className="w-5 h-5" />
                {nextTopic ? "Continue Learning" : "All Completed 🎉"}
                <IoChevronForward className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </PageBody>
    </PageLayout>
  );
}

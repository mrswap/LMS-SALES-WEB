// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getDashboardData } from "../../../../redux/slice/dashboardSlice";
// import Loader from "../../common/Loader";
// import Error from "../../common/Error";
// import Select from "react-select";
// import {
//   FiSearch,
//   FiX,
//   FiCheckCircle,
//   FiMessageCircle,
//   FiFolder,
//   FiBookOpen,
// } from "react-icons/fi";
// import { MdOutlineTopic } from "react-icons/md";

// const ThreadList = ({ selectedTopicId, setSelectedTopicId }) => {
//   const dispatch = useDispatch();
//   const { dashboardData, isLoading, isError, message } = useSelector(
//     (state) => state.dashboard,
//   );

//   const [allTopics, setAllTopics] = useState([]);
//   const [filteredTopics, setFilteredTopics] = useState([]);

//   // Filter states
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedLevel, setSelectedLevel] = useState(null);
//   const [selectedModule, setSelectedModule] = useState(null);
//   const [selectedChapter, setSelectedChapter] = useState(null);
//   const [selectedStatus, setSelectedStatus] = useState(null);

//   // Filter options
//   const [availableLevels, setAvailableLevels] = useState([]);
//   const [availableModules, setAvailableModules] = useState([]);
//   const [availableChapters, setAvailableChapters] = useState([]);

//   const statusOptions = [
//     { value: "completed", label: "Completed" },
//     { value: "pending", label: "Pending" },
//   ];

//   useEffect(() => {
//     dispatch(getDashboardData());
//   }, [dispatch]);

//   useEffect(() => {
//     if (dashboardData?.data?.levels) {
//       const topics = extractAllTopics(dashboardData.data.levels);
//       setAllTopics(topics);
//       setFilteredTopics(topics);
//       extractFilterOptions(dashboardData.data.levels);
//     }
//   }, [dashboardData]);

//   const extractAllTopics = (levels) => {
//     const topicsList = [];
//     levels.forEach((level) => {
//       level.modules?.forEach((module) => {
//         module.chapters?.forEach((chapter) => {
//           for (let i = 1; i <= chapter.total_topics; i++) {
//             topicsList.push({
//               id: parseInt(`${chapter.chapter_id}${i}`),
//               title: `Topic ${i}`,
//               chapter_id: chapter.chapter_id,
//               chapter_title: chapter.chapter_title,
//               module_id: module.module_id,
//               module_title: module.module_title,
//               level_id: level.id,
//               level_title: level.title,
//               completed: i <= (chapter.completed_topics || 0),
//             });
//           }
//         });
//       });
//     });
//     return topicsList;
//   };

//   const extractFilterOptions = (levels) => {
//     const levelsList = [];
//     const modulesList = [];
//     const chaptersList = [];

//     levels.forEach((level) => {
//       levelsList.push({ value: level.id, label: level.title });
//       level.modules?.forEach((module) => {
//         modulesList.push({
//           value: module.module_id,
//           label: module.module_title,
//           levelId: level.id,
//         });
//         module.chapters?.forEach((chapter) => {
//           chaptersList.push({
//             value: chapter.chapter_id,
//             label: chapter.chapter_title,
//             moduleId: module.module_id,
//           });
//         });
//       });
//     });

//     setAvailableLevels(levelsList);
//     setAvailableModules(modulesList);
//     setAvailableChapters(chaptersList);
//   };

//   // Apply filters
//   useEffect(() => {
//     let filtered = [...allTopics];

//     if (searchQuery) {
//       filtered = filtered.filter(
//         (topic) =>
//           topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           topic.chapter_title
//             .toLowerCase()
//             .includes(searchQuery.toLowerCase()) ||
//           topic.module_title
//             .toLowerCase()
//             .includes(searchQuery.toLowerCase()) ||
//           topic.level_title.toLowerCase().includes(searchQuery.toLowerCase()),
//       );
//     }

//     if (selectedLevel) {
//       filtered = filtered.filter(
//         (topic) => topic.level_id === selectedLevel.value,
//       );
//     }

//     if (selectedModule) {
//       filtered = filtered.filter(
//         (topic) => topic.module_id === selectedModule.value,
//       );
//     }

//     if (selectedChapter) {
//       filtered = filtered.filter(
//         (topic) => topic.chapter_id === selectedChapter.value,
//       );
//     }

//     if (selectedStatus) {
//       if (selectedStatus.value === "completed") {
//         filtered = filtered.filter((topic) => topic.completed === true);
//       } else if (selectedStatus.value === "pending") {
//         filtered = filtered.filter((topic) => topic.completed === false);
//       }
//     }

//     setFilteredTopics(filtered);
//   }, [
//     searchQuery,
//     selectedLevel,
//     selectedModule,
//     selectedChapter,
//     selectedStatus,
//     allTopics,
//   ]);

//   const resetFilters = () => {
//     setSearchQuery("");
//     setSelectedLevel(null);
//     setSelectedModule(null);
//     setSelectedChapter(null);
//     setSelectedStatus(null);
//     setFilteredTopics(allTopics);
//   };

//   const handleTopicSelect = (topic) => {
//     setSelectedTopicId(topic.id);
//   };

//   const isFilterActive =
//     searchQuery ||
//     selectedLevel ||
//     selectedModule ||
//     selectedChapter ||
//     selectedStatus;

//   // Get filtered modules based on selected level
//   const getFilteredModules = () => {
//     if (!selectedLevel) return [];
//     return availableModules.filter(
//       (module) => module.levelId === selectedLevel.value,
//     );
//   };

//   // Get filtered chapters based on selected module
//   const getFilteredChapters = () => {
//     if (!selectedModule) return [];
//     return availableChapters.filter(
//       (chapter) => chapter.moduleId === selectedModule.value,
//     );
//   };

//   // Custom styles for react-select
//   const selectStyles = {
//     control: (base) => ({
//       ...base,
//       borderRadius: "0.5rem",
//       borderColor: "#e5e7eb",
//       boxShadow: "none",
//       "&:hover": {
//         borderColor: "#3b82f6",
//       },
//     }),
//     option: (base, state) => ({
//       ...base,
//       backgroundColor: state.isFocused ? "#eff6ff" : "white",
//       color: state.isFocused ? "#1e40af" : "#374151",
//       cursor: "pointer",
//     }),
//     placeholder: (base) => ({
//       ...base,
//       color: "#9ca3af",
//     }),
//   };

//   if (isLoading) return <Loader />;
//   if (isError) return <Error message={message} />;

//   return (
//     <div className="flex flex-col h-full bg-white">
//       {/* Header */}
//       <div className="p-4 border-b border-gray-200 bg-white">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center gap-2">
//             <FiMessageCircle className="w-5 h-5 text-blue-600" />
//             <h3 className="font-semibold text-gray-800">Topics</h3>
//             <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
//               {filteredTopics.length} / {allTopics.length}
//             </span>
//           </div>
//           {isFilterActive && (
//             <button
//               onClick={resetFilters}
//               className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1"
//             >
//               <FiX className="w-3 h-3" />
//               Clear All
//             </button>
//           )}
//         </div>

//         {/* Search */}
//         <div className="relative mb-4">
//           <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
//           <input
//             type="text"
//             placeholder="Search topics..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//           {searchQuery && (
//             <button
//               onClick={() => setSearchQuery("")}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2"
//             >
//               <FiX className="w-4 h-4 text-gray-400 hover:text-gray-600" />
//             </button>
//           )}
//         </div>

//         {/* Filters - 2 in a row without icons */}
//         <div className="space-y-3">
//           {/* Row 1: Level and Module */}
//           <div className="grid grid-cols-2 gap-3">
//             <Select
//               placeholder="Select Level"
//               options={availableLevels}
//               value={selectedLevel}
//               onChange={(option) => {
//                 setSelectedLevel(option);
//                 setSelectedModule(null);
//                 setSelectedChapter(null);
//               }}
//               isClearable
//               styles={selectStyles}
//               className="text-sm"
//             />

//             <Select
//               placeholder="Select Module"
//               options={getFilteredModules()}
//               value={selectedModule}
//               onChange={(option) => {
//                 setSelectedModule(option);
//                 setSelectedChapter(null);
//               }}
//               isClearable
//               isDisabled={!selectedLevel}
//               styles={selectStyles}
//               className="text-sm"
//             />
//           </div>

//           {/* Row 2: Chapter and Status */}
//           <div className="grid grid-cols-2 gap-3">
//             <Select
//               placeholder="Select Chapter"
//               options={getFilteredChapters()}
//               value={selectedChapter}
//               onChange={(option) => setSelectedChapter(option)}
//               isClearable
//               isDisabled={!selectedModule}
//               styles={selectStyles}
//               className="text-sm"
//             />

//             <Select
//               placeholder="Select Status"
//               options={statusOptions}
//               value={selectedStatus}
//               onChange={(option) => setSelectedStatus(option)}
//               isClearable
//               styles={selectStyles}
//               className="text-sm"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Topics List */}
//       <div className="flex-1 overflow-y-auto p-4">
//         {filteredTopics.length === 0 ? (
//           <div className="flex flex-col items-center justify-center h-full text-center">
//             <FiBookOpen className="w-12 h-12 text-gray-300 mb-3" />
//             <p className="text-gray-500 text-sm">No topics found</p>
//             <button
//               onClick={resetFilters}
//               className="mt-2 text-sm text-blue-600 hover:text-blue-700"
//             >
//               Clear filters
//             </button>
//           </div>
//         ) : (
//           <div className="space-y-2">
//             {filteredTopics.map((topic) => (
//               <button
//                 key={topic.id}
//                 onClick={() => handleTopicSelect(topic)}
//                 className={`w-full text-left p-3 rounded-lg transition-all border ${
//                   selectedTopicId === topic.id
//                     ? "bg-blue-50 border-blue-300 shadow-sm"
//                     : topic.completed
//                       ? "bg-green-50 border-green-200 hover:bg-green-100"
//                       : "bg-white border-gray-200 hover:bg-gray-50"
//                 }`}
//               >
//                 <div className="flex items-start gap-3">
//                   {topic.completed ? (
//                     <FiCheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
//                   ) : (
//                     <MdOutlineTopic className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
//                   )}

//                   <div className="flex-1">
//                     <p
//                       className={`font-medium ${
//                         selectedTopicId === topic.id
//                           ? "text-blue-700"
//                           : "text-gray-800"
//                       }`}
//                     >
//                       {topic.title}
//                     </p>

//                     <div className="mt-2 space-y-1">
//                       <div className="text-xs text-gray-600 flex items-center gap-1">
//                         <FiFolder className="w-3 h-3 text-gray-400 flex-shrink-0" />
//                         <span className="break-words">{topic.level_title}</span>
//                       </div>

//                       <div className="text-xs text-gray-600 flex items-center gap-1">
//                         <FiBookOpen className="w-3 h-3 text-gray-400 flex-shrink-0" />
//                         <span className="break-words">
//                           {topic.module_title}
//                         </span>
//                       </div>

//                       <div className="text-xs text-gray-600 flex items-center gap-1">
//                         <FiBookOpen className="w-3 h-3 text-gray-400 flex-shrink-0" />
//                         <span className="break-words">
//                           {topic.chapter_title}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {selectedTopicId === topic.id && (
//                     <span className="text-xs font-medium text-blue-600 bg-blue-200 px-2 py-1 rounded-full flex-shrink-0">
//                       Active
//                     </span>
//                   )}
//                 </div>
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ThreadList;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import {
  FiSearch,
  FiX,
  FiMessageCircle,
  FiFolder,
  FiBookOpen,
  FiClock,
} from "react-icons/fi";

import { MdOutlineTopic } from "react-icons/md";

import Loader from "../../common/Loader";
import Error from "../../common/Error";

import { getInboxConversations } from "../../../../redux/slice/supportSlice";
import { getProfile } from "../../../../redux/slice/profileSlice";

const ThreadList = ({ selectedTopicId, setSelectedTopicId }) => {
  const dispatch = useDispatch();

  const { inboxConversations, inboxLoading, error } = useSelector(
    (state) => state.support,
  );

  // ================= FILTER STATES =================
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  // ================= OPTIONS =================
  const statusOptions = [
    { value: "open", label: "Open" },
    { value: "resolved", label: "Resolved" },
    { value: "reopened", label: "Reopened" },
  ];

  // ================= API CALL =================
  useEffect(() => {
    const params = {
      per_page: 20,
    };

    if (searchQuery) {
      params.search = searchQuery;
    }

    if (selectedStatus) {
      params.status = selectedStatus.value;
    }

    if (selectedTopic) {
      params.topic_id = selectedTopic.value;
    }

    const debounce = setTimeout(() => {
      dispatch(getInboxConversations(params));
    }, 500);

    return () => clearTimeout(debounce);
  }, [dispatch, searchQuery, selectedStatus, selectedTopic]);

  //   useEffect(() => {
  //     // agar koi topic already selected nahi hai
  //     // to first/latest thread ko active kar do

  //     if (!selectedTopicId && inboxConversations?.length > 0) {
  //       const latestThread = inboxConversations[0];

  //       setSelectedTopicId(latestThread.topic_id);
  //     }
  //   }, [inboxConversations, selectedTopicId, setSelectedTopicId]);

  useEffect(() => {
    if (!selectedTopicId && inboxConversations?.length > 0) {
      const latestThread = inboxConversations[0];

      setSelectedTopicId(latestThread.topic_id);

      // first auto selected thread unread ho to refresh karo
      if (latestThread.unread_messages_count > 0) {
        setTimeout(() => {
          dispatch(getProfile());

          dispatch(
            getInboxConversations({
              per_page: 20,
            }),
          );
        }, 500);
      }
    }
  }, [inboxConversations, selectedTopicId, setSelectedTopicId, dispatch]);

  // ================= TOPIC OPTIONS =================
  const topicOptions =
    inboxConversations?.map((item) => ({
      value: item.topic?.id,
      label: item.topic?.title,
    })) || [];

  // remove duplicates
  const uniqueTopicOptions = topicOptions.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.value === item.value),
  );

  // ================= RESET =================
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedStatus(null);
    setSelectedTopic(null);
  };

  const isFilterActive = searchQuery || selectedStatus || selectedTopic;

  // ================= SELECT STYLES =================
  const selectStyles = {
    control: (base) => ({
      ...base,
      borderRadius: "0.5rem",
      borderColor: "#e5e7eb",
      boxShadow: "none",
      minHeight: "42px",

      "&:hover": {
        borderColor: "#3b82f6",
      },
    }),

    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#eff6ff" : "white",

      color: state.isFocused ? "#1e40af" : "#374151",

      cursor: "pointer",
    }),

    placeholder: (base) => ({
      ...base,
      color: "#9ca3af",
    }),
  };

  if (inboxLoading) return <Loader />;

  if (error) {
    return <Error message={error?.message || "Something went wrong"} />;
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* ================= HEADER ================= */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FiMessageCircle className="w-5 h-5 text-blue-600" />

            <h3 className="font-semibold text-gray-800">Support Inbox</h3>

            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {inboxConversations?.length || 0}
            </span>
          </div>

          {isFilterActive && (
            <button
              onClick={resetFilters}
              className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              <FiX className="w-3 h-3" />
              Clear All
            </button>
          )}
        </div>

        {/* ================= SEARCH ================= */}
        <div className="relative mb-4">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />

          <input
            type="text"
            placeholder="Search by topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <FiX className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {/* ================= FILTERS ================= */}
        <div className="grid grid-cols-2 gap-3">
          <Select
            placeholder="Filter by status"
            options={statusOptions}
            value={selectedStatus}
            onChange={(option) => setSelectedStatus(option)}
            isClearable
            styles={selectStyles}
            className="text-sm"
          />

          <Select
            placeholder="Filter by topic"
            options={uniqueTopicOptions}
            value={selectedTopic}
            onChange={(option) => setSelectedTopic(option)}
            isClearable
            styles={selectStyles}
            className="text-sm"
          />
        </div>
      </div>

      {/* ================= THREAD LIST ================= */}
      <div className="flex-1 overflow-y-auto p-4">
        {!inboxConversations?.length ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <FiMessageCircle className="w-12 h-12 text-gray-300 mb-3" />

            <p className="text-gray-500 text-sm">No conversations found</p>

            {isFilterActive && (
              <button
                onClick={resetFilters}
                className="mt-2 text-sm text-blue-600 hover:text-blue-700"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {inboxConversations?.map((thread) => (
              <button
                key={thread.id}
                // onClick={() => setSelectedTopicId(thread.topic_id)}
                // onClick={() => {
                //   setSelectedTopicId(thread.topic_id);

                //   if (thread.unread_messages_count > 0) {
                //     dispatch(getProfile());
                //   }
                // }}

                // onClick={() => {
                //   setSelectedTopicId(thread.topic_id);

                //   // unread thread open hua
                //   if (thread.unread_messages_count > 0) {
                //     // profile unread count refresh
                //     dispatch(getProfile());

                //     // inbox refresh taaki unread badge hat jaye
                //     dispatch(
                //       getInboxConversations({
                //         per_page: 20,
                //       }),
                //     );
                //   }
                // }}

                onClick={() => {
                  setSelectedTopicId(thread.topic_id);

                  // unread thread open hua
                  if (thread.unread_messages_count > 0) {
                    // thoda delay do taaki backend read mark kar de
                    setTimeout(() => {
                      dispatch(getProfile());

                      dispatch(
                        getInboxConversations({
                          per_page: 20,
                        }),
                      );
                    }, 500);
                  }
                }}
                className={`w-full text-left p-4 rounded-xl transition-all border ${
                  selectedTopicId === thread.topic_id
                    ? "bg-blue-50 border-blue-300 shadow-sm"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-1 flex-shrink-0 ${
                      thread.status === "resolved"
                        ? "text-green-600"
                        : thread.status === "reopened"
                          ? "text-orange-500"
                          : "text-blue-500"
                    }`}
                  >
                    <MdOutlineTopic className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* ================= TOPIC ================= */}
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-semibold text-gray-800 truncate">
                        {thread.topic?.title}
                      </h4>

                      <span
                        className={`text-[10px] px-2 py-1 rounded-full font-medium uppercase ${
                          thread.status === "resolved"
                            ? "bg-green-100 text-green-700"
                            : thread.status === "reopened"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {thread.status}
                      </span>
                    </div>

                    {/* ================= LATEST MESSAGE ================= */}
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {thread.latest_message?.message || "No message"}
                    </p>

                    {/* ================= DETAILS ================= */}
                    <div className="mt-3 space-y-1">
                      <div className="text-xs text-gray-600 flex items-center gap-1">
                        <FiFolder className="w-3 h-3 text-gray-400 flex-shrink-0" />

                        <span className="truncate">
                          {thread.program?.title}
                        </span>
                      </div>

                      <div className="text-xs text-gray-600 flex items-center gap-1">
                        <FiBookOpen className="w-3 h-3 text-gray-400 flex-shrink-0" />

                        <span className="truncate">{thread.module?.title}</span>
                      </div>

                      <div className="text-xs text-gray-600 flex items-center gap-1">
                        <FiBookOpen className="w-3 h-3 text-gray-400 flex-shrink-0" />

                        <span className="truncate">
                          {thread.chapter?.title}
                        </span>
                      </div>
                    </div>

                    {/* ================= FOOTER ================= */}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">
                          {thread.messages_count} messages
                        </span>

                        {thread.unread_messages_count > 0 && (
                          <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                            {thread.unread_messages_count} unread
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <FiClock className="w-3 h-3" />

                        <span>
                          {new Date(
                            thread.last_message_at,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default ThreadList;

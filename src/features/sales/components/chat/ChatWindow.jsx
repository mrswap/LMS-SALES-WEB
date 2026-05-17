// import { useSelector, useDispatch } from "react-redux";
// import { useEffect, useRef, useState } from "react";
// import ChatInput from "./ChatInput";
// import MessageBubble from "./MessageBubble";
// import useSupportSocket from "../../../../hooks/useSupportSocket";
// import {
//   FiUser,
//   FiMail,
//   FiBookOpen,
//   FiFolder,
//   FiTag,
//   FiMessageSquare,
//   FiChevronUp,
//   FiChevronDown,
// } from "react-icons/fi";
// import { useParams } from "react-router-dom";
// import {
//   addRealtimeMessage,
//   getOrCreateThread,
// } from "../../../../redux/slice/supportSlice";
// import Loader from "../../common/Loader";

// const ChatWindow = () => {
//   const dispatch = useDispatch();
//   const { topicId } = useParams();
//   const { thread, messages, loading } = useSelector((state) => state.support);
//   const [isMetadataOpen, setIsMetadataOpen] = useState(false);
//   const messagesEndRef = useRef(null);
//   const messagesContainerRef = useRef(null);

//   useEffect(() => {
//     if (topicId) {
//       console.log("Fetching thread for topic:", topicId);
//       dispatch(getOrCreateThread(topicId));
//     }
//   }, [dispatch, topicId]);

//   useSupportSocket({
//     threadId: thread?.id,
//     onMessageReceived: (message) => {
//       console.log("📨 Real-time message received:", message);
//       dispatch(addRealtimeMessage(message));
//     },
//   });

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       messagesEndRef.current?.scrollIntoView({
//         behavior: "smooth",
//         block: "end",
//       });
//     }, 100);

//     return () => clearTimeout(timer);
//   }, [messages]);

//   if (loading) {
//     return <Loader />;
//   }

//   if (!thread) {
//     return (
//       <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
//         <div className="text-center max-w-sm">
//           <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
//             <FiMessageSquare className="w-10 h-10 text-gray-400" />
//           </div>
//           <h3 className="text-gray-700 font-semibold mb-1">
//             No topic selected
//           </h3>
//           <p className="text-gray-400 text-sm">
//             Select a topic from the list to start chatting
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const { program, level, module: moduleData, chapter, topic, status } = thread;

//   return (
//     // 🔥 CRITICAL: Outer div ko fixed height chahiye
//     <div className="flex-1 flex flex-col h-[calc(100vh-100px)] max-w-[700px] mx-auto min-h-0 overflow-hidden border border-gray-300 rounded-lg bg-white">
//       {/* NON-SCROLLABLE HEADER SECTION - Fixed at top */}
//       <div className="flex-shrink-0">
//         {/* Header */}
//         <div className="border-b border-gray-300 bg-white px-5 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3 min-w-0 flex-1">
//               <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
//                 <FiUser className="text-blue-600" size={18} />
//               </div>
//               <div className="min-w-0 flex-1">
//                 <h2 className="font-semibold text-gray-800 truncate">
//                   Support Conversation
//                 </h2>
//                 <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
//                   <span>Topic: {topic?.title || "N/A"}</span>
//                 </div>
//               </div>
//             </div>

//             <div
//               className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
//                 status === "open"
//                   ? "bg-green-50 text-green-700 border border-green-200"
//                   : status === "resolved"
//                     ? "bg-blue-50 text-blue-700 border border-blue-200"
//                     : status === "reopened"
//                       ? "bg-orange-50 text-orange-700 border border-orange-200"
//                       : "bg-gray-50 text-gray-600 border border-gray-200"
//               }`}
//             >
//               {status?.toUpperCase() || "OPEN"}
//             </div>
//           </div>
//         </div>

//         {/* Metadata Section */}
//         <div className="border-b border-gray-300 bg-gray-50">
//           <button
//             onClick={() => setIsMetadataOpen(!isMetadataOpen)}
//             className="w-full px-5 py-2.5 flex items-center justify-between hover:bg-gray-100 transition-colors"
//           >
//             <div className="flex items-center gap-2">
//               <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
//                 Course Details
//               </span>
//               <span className="text-xs text-gray-400">
//                 ({isMetadataOpen ? "Hide" : "Show"})
//               </span>
//             </div>
//             {isMetadataOpen ? (
//               <FiChevronUp className="text-gray-400" size={14} />
//             ) : (
//               <FiChevronDown className="text-gray-400" size={14} />
//             )}
//           </button>

//           {isMetadataOpen && (
//             <div className="px-5 pb-4 space-y-2 bg-gradient-to-b from-gray-50 to-white">
//               <div className="flex items-baseline gap-2 text-sm">
//                 <FiBookOpen className="text-blue-600" size={12} />
//                 <span className="text-gray-500 w-16">Program:</span>
//                 <span className="text-gray-800">{program?.title || "N/A"}</span>
//               </div>
//               <div className="flex items-baseline gap-2 text-sm">
//                 <FiFolder className="text-purple-600" size={12} />
//                 <span className="text-gray-500 w-16">Level:</span>
//                 <span className="text-gray-800">{level?.title || "N/A"}</span>
//               </div>
//               <div className="flex items-baseline gap-2 text-sm">
//                 <FiTag className="text-green-600" size={12} />
//                 <span className="text-gray-500 w-16">Module:</span>
//                 <span className="text-gray-800">
//                   {moduleData?.title || "N/A"}
//                 </span>
//               </div>
//               <div className="flex items-baseline gap-2 text-sm">
//                 <FiMail className="text-orange-600" size={12} />
//                 <span className="text-gray-500 w-16">Chapter:</span>
//                 <span className="text-gray-800">{chapter?.title || "N/A"}</span>
//               </div>
//               <div className="flex items-baseline gap-2 text-sm">
//                 <FiMessageSquare className="text-purple-600" size={12} />
//                 <span className="text-gray-500 w-16">Topic:</span>
//                 <span className="text-blue-600 font-medium">
//                   {topic?.title || "N/A"}
//                 </span>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* 🔥 ONLY THIS PART SCROLLS - Messages */}
//       <div
//         ref={messagesContainerRef}
//         className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-br from-gray-50 to-white"
//         style={{ minHeight: 0 }} // 🔥 CRITICAL: Ye ensure karta hai ki overflow kaam kare
//       >
//         {messages.length === 0 ? (
//           <div className="flex items-center justify-center h-full">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
//                 <FiMessageSquare className="text-gray-400" size={24} />
//               </div>
//               <p className="text-gray-500 font-medium">No messages yet</p>
//               <p className="text-xs text-gray-400 mt-1">
//                 Send a message to start the conversation
//               </p>
//             </div>
//           </div>
//         ) : (
//           <>
//             {messages.map((msg, index) => (
//               <MessageBubble
//                 key={msg.tempId || msg.id || index}
//                 message={msg}
//               />
//             ))}
//             <div ref={messagesEndRef} />
//           </>
//         )}
//       </div>

//       {/* FIXED INPUT AT BOTTOM */}
//       <div className="flex-shrink-0 border-t border-gray-300 bg-white">
//         <ChatInput threadId={thread.id} />
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import useSupportSocket from "../../../../hooks/useSupportSocket";
import {
  FiUser,
  FiMail,
  FiBookOpen,
  FiFolder,
  FiTag,
  FiMessageSquare,
  FiChevronUp,
  FiChevronDown,
} from "react-icons/fi";
import { useParams } from "react-router-dom";
import {
  addRealtimeMessage,
  getOrCreateThread,
} from "../../../../redux/slice/supportSlice";
import Loader from "../../common/Loader";

const ChatWindow = () => {
  const dispatch = useDispatch();
  const { topicId } = useParams();
  const { thread, messages, loading } = useSelector((state) => state.support);
  const [isMetadataOpen, setIsMetadataOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (topicId) {
      console.log("Fetching thread for topic:", topicId);
      dispatch(getOrCreateThread(topicId));
    }
  }, [dispatch, topicId]);

  useSupportSocket({
    threadId: thread?.id,
    onMessageReceived: (message) => {
      console.log("📨 Real-time message received:", message);
      dispatch(addRealtimeMessage(message));
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [messages]);

  if (loading) {
    return <Loader />;
  }

  if (!thread) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
            <FiMessageSquare className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-gray-700 font-semibold mb-1">
            No topic selected
          </h3>
          <p className="text-gray-400 text-sm">
            Select a topic from the list to start chatting
          </p>
        </div>
      </div>
    );
  }

  const { program, level, module: moduleData, chapter, topic, status } = thread;

  // Course Details Component (reusable)
  const CourseDetails = ({
    isCollapsible = false,
    isOpen = true,
    onToggle,
  }) => {
    const detailsContent = (
      <div className="space-y-3">
        <div className="flex items-baseline gap-2 text-sm">
          <FiBookOpen className="text-blue-600" size={14} />
          <span className="text-gray-500 w-20">Program:</span>
          <span className="text-gray-800 flex-1">
            {program?.title || "N/A"}
          </span>
        </div>
        <div className="flex items-baseline gap-2 text-sm">
          <FiFolder className="text-purple-600" size={14} />
          <span className="text-gray-500 w-20">Level:</span>
          <span className="text-gray-800 flex-1">{level?.title || "N/A"}</span>
        </div>
        <div className="flex items-baseline gap-2 text-sm">
          <FiTag className="text-green-600" size={14} />
          <span className="text-gray-500 w-20">Module:</span>
          <span className="text-gray-800 flex-1">
            {moduleData?.title || "N/A"}
          </span>
        </div>
        <div className="flex items-baseline gap-2 text-sm">
          <FiMail className="text-orange-600" size={14} />
          <span className="text-gray-500 w-20">Chapter:</span>
          <span className="text-gray-800 flex-1">
            {chapter?.title || "N/A"}
          </span>
        </div>
        <div className="flex items-baseline gap-2 text-sm">
          <FiMessageSquare className="text-purple-600" size={14} />
          <span className="text-gray-500 w-20">Topic:</span>
          <span className="text-blue-600 font-medium flex-1">
            {topic?.title || "N/A"}
          </span>
        </div>
      </div>
    );

    if (!isCollapsible) {
      return (
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <FiBookOpen className="text-blue-600" size={16} />
            <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
              Course Details
            </h3>
          </div>
          {detailsContent}
        </div>
      );
    }

    return (
      <div className="border-b border-gray-300 bg-gray-50 lg:hidden">
        <button
          onClick={onToggle}
          className="w-full px-5 py-2.5 flex items-center justify-between hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Course Details
            </span>
            <span className="text-xs text-gray-400">
              ({isOpen ? "Hide" : "Show"})
            </span>
          </div>
          {isOpen ? (
            <FiChevronUp className="text-gray-400" size={14} />
          ) : (
            <FiChevronDown className="text-gray-400" size={14} />
          )}
        </button>

        {isOpen && (
          <div className="px-5 pb-4 bg-gradient-to-b from-gray-50 to-white">
            {detailsContent}
          </div>
        )}
      </div>
    );
  };

  return (
    // Main container - 2 column layout on desktop
    <div className="flex-1 flex flex-col lg:flex-row gap-4 h-[calc(100vh-100px)] min-h-0 overflow-hidden">
      {/* LEFT SIDE - Course Details (Desktop) */}
      <div className="hidden lg:block lg:w-80 xl:w-96 flex-shrink-0 overflow-y-auto">
        <div className="sticky top-0">
          {/* Status Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Status</span>
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  status === "open"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : status === "resolved"
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : status === "reopened"
                        ? "bg-orange-50 text-orange-700 border border-orange-200"
                        : "bg-gray-50 text-gray-600 border border-gray-200"
                }`}
              >
                {status?.toUpperCase() || "OPEN"}
              </div>
            </div>
          </div>

          {/* Course Details */}
          <CourseDetails isCollapsible={false} />
        </div>
      </div>

      {/* RIGHT SIDE - Chat Section */}
      <div className="flex-1 flex flex-col min-w-0 bg-white rounded-lg border border-gray-300 overflow-hidden">
        {/* Header - Mobile/Desktop */}
        <div className="flex-shrink-0 border-b border-gray-300 bg-white px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <FiUser className="text-blue-600" size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-gray-800 truncate">
                  Support Conversation
                </h2>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                  <span>Topic: {topic?.title || "N/A"}</span>
                </div>
              </div>
            </div>

            {/* Desktop mein status upar dikhega, mobile mein yahan */}
            <div className="lg:hidden">
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                  status === "open"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : status === "resolved"
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : status === "reopened"
                        ? "bg-orange-50 text-orange-700 border border-orange-200"
                        : "bg-gray-50 text-gray-600 border border-gray-200"
                }`}
              >
                {status?.toUpperCase() || "OPEN"}
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Course Details - Only Mobile */}
        <CourseDetails
          isCollapsible={true}
          isOpen={isMetadataOpen}
          onToggle={() => setIsMetadataOpen(!isMetadataOpen)}
        />

        {/* Messages Section */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-br from-gray-50 to-white"
          style={{ minHeight: 0 }}
        >
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <FiMessageSquare className="text-gray-400" size={24} />
                </div>
                <p className="text-gray-500 font-medium">No messages yet</p>
                <p className="text-xs text-gray-400 mt-1">
                  Send a message to start the conversation
                </p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, index) => (
                <MessageBubble
                  key={msg.tempId || msg.id || index}
                  message={msg}
                />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Chat Input
        <div className="flex-shrink-0 border-t border-gray-300 bg-white">
          <ChatInput threadId={thread.id} />
        </div> */}
        {/* Disable Chat Input for Resolved Threads */}
        {status === "resolved" ? (
          <div className="border-t border-gray-200 bg-gray-50 p-4 text-center">
            <p className="text-sm text-gray-500">
              This conversation has been successfully resolved and closed.
            </p>
          </div>
        ) : (
          <ChatInput threadId={thread.id} />
        )}
      </div>
    </div>
  );
};

export default ChatWindow;

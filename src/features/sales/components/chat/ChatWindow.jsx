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
  FiLoader,
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

  // Fetch thread on mount and when topic changes
  useEffect(() => {
    if (topicId) {
      console.log("Fetching thread for topic:", topicId);
      dispatch(getOrCreateThread(topicId));
    }
  }, [dispatch, topicId]);

  // 🔥 ONLY SOCKET - NO POLLING
  useSupportSocket({
    threadId: thread?.id,
    onMessageReceived: (message) => {
      console.log("📨 Real-time message received:", message);
      dispatch(addRealtimeMessage(message));
    },
  });

  const messagesContainerRef = useRef(null);

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

  return (
    <div className="flex-1 flex flex-col h-full min-h-0  border border-gray-300 rounded-lg">
      {/* 🟢 STICKY HEADER - Yeh upar hi rahega */}
      <div className="sticky top-0 z-20 border-b border-gray-300 bg-white px-5 py-4">
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

      {/* 🟡 STICKY METADATA SECTION - Yeh bhi upar hi rahega, header ke niche */}
      <div className="sticky top-[73px] z-10 border-b border-gray-300 bg-gray-50 ">
        <button
          onClick={() => setIsMetadataOpen(!isMetadataOpen)}
          className="w-full px-5 py-2.5 flex items-center justify-between hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Course Details
            </span>
            <span className="text-xs text-gray-400">
              ({isMetadataOpen ? "Hide" : "Show"})
            </span>
          </div>
          {isMetadataOpen ? (
            <FiChevronUp className="text-gray-400" size={14} />
          ) : (
            <FiChevronDown className="text-gray-400" size={14} />
          )}
        </button>

        {isMetadataOpen && (
          <div className="px-5 pb-4 space-y-2 bg-gradient-to-b from-gray-50 to-white">
            <div className="flex items-baseline gap-2 text-sm">
              <FiBookOpen className="text-blue-600" size={12} />
              <span className="text-gray-500 w-16">Program:</span>
              <span className="text-gray-800">{program?.title || "N/A"}</span>
            </div>
            <div className="flex items-baseline gap-2 text-sm">
              <FiFolder className="text-purple-600" size={12} />
              <span className="text-gray-500 w-16">Level:</span>
              <span className="text-gray-800">{level?.title || "N/A"}</span>
            </div>
            <div className="flex items-baseline gap-2 text-sm">
              <FiTag className="text-green-600" size={12} />
              <span className="text-gray-500 w-16">Module:</span>
              <span className="text-gray-800">
                {moduleData?.title || "N/A"}
              </span>
            </div>
            <div className="flex items-baseline gap-2 text-sm">
              <FiMail className="text-orange-600" size={12} />
              <span className="text-gray-500 w-16">Chapter:</span>
              <span className="text-gray-800">{chapter?.title || "N/A"}</span>
            </div>
            <div className="flex items-baseline gap-2 text-sm">
              <FiMessageSquare className="text-purple-600" size={12} />
              <span className="text-gray-500 w-16">Topic:</span>
              <span className="text-blue-600 font-medium">
                {topic?.title || "N/A"}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 🔵 ONLY MESSAGES SCROLLABLE */}
      <div
        ref={messagesContainerRef}
        className="flex-1 min-h-0 overflow-y-auto p-5 space-y-4"
      >
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <FiMail className="text-gray-400" size={24} />
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

      {/* 🔻 FIXED INPUT */}
      <div className="shrink-0 border-t bg-white">
        <ChatInput threadId={thread.id} />
      </div>
    </div>
  );
};

export default ChatWindow;

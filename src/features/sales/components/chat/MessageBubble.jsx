// // import { formatDistanceToNow } from "date-fns";
// // import { FiUser, FiHelpCircle, FiPaperclip } from "react-icons/fi";
// // import { useTranslation } from "react-i18next";

// // const MessageBubble = ({ message }) => {
// //   const { t } = useTranslation();
// //   const isAdmin = message.is_admin === true;

// //   return (
// //     <div className={`flex ${isAdmin ? "justify-start" : "justify-end"}`}>
// //       <div className={`max-w-[70%] ${message.pending ? "opacity-70" : ""}`}>
// //         <div
// //           className={`flex items-center gap-2 mb-1.5 ${
// //             !isAdmin && "justify-end"
// //           }`}
// //         >
// //           {isAdmin ? (
// //             <>
// //               <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
// //                 <FiHelpCircle size={12} className="text-gray-600" />
// //               </div>
// //               <span className="text-xs font-medium text-gray-600">
// //                 {t("support.supportTeam")}
// //               </span>
// //             </>
// //           ) : (
// //             <>
// //               <span className="text-xs font-medium text-blue-600">
// //                 {message.sender?.name || t("support.you")}
// //               </span>
// //               <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
// //                 <FiUser size={12} className="text-blue-600" />
// //               </div>
// //             </>
// //           )}
// //         </div>

// //         <div
// //           className={`rounded-2xl px-4 py-2.5 shadow-sm ${
// //             isAdmin
// //               ? "bg-white border border-gray-200 text-gray-800"
// //               : "bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-md"
// //           }`}
// //         >
// //           <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
// //             {message.message}
// //           </p>

// //           {message.attachment && (
// //             <div className="mt-2">
// //               {message.attachment.match(/\.(jpeg|jpg|gif|png|webp)$/) ? (
// //                 <img
// //                   src={message.attachment}
// //                   alt={t("support.attachment")}
// //                   className="max-w-[200px] max-h-[150px] rounded-lg cursor-pointer hover:opacity-90 transition border"
// //                   onClick={() => window.open(message.attachment, "_blank")}
// //                 />
// //               ) : (
// //                 <a
// //                   href={message.attachment}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className={`text-xs inline-flex items-center gap-1.5 mt-1 ${
// //                     isAdmin ? "text-blue-600" : "text-white/90"
// //                   }`}
// //                 >
// //                   <FiPaperclip size={12} />
// //                   {t("support.viewAttachment")}
// //                 </a>
// //               )}
// //             </div>
// //           )}
// //         </div>

// //         {message.created_at && (
// //           <div
// //             className={`text-xs text-gray-400 mt-1 ${!isAdmin && "text-right"}`}
// //           >
// //             {formatDistanceToNow(new Date(message.created_at), {
// //               addSuffix: true,
// //             })}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default MessageBubble;

// import { formatDistanceToNow } from "date-fns";
// import { FiUser, FiHelpCircle, FiPaperclip, FiCpu } from "react-icons/fi";
// import { useTranslation } from "react-i18next";

// const MessageBubble = ({ message }) => {
//   const { t } = useTranslation();
//   const isAdmin = message.is_admin === true;
//   const isAI = message.is_ai === true;

//   // AI Messages - Purple highlight
//   if (isAI) {
//     return (
//       <div className="flex justify-start">
//         <div className="max-w-[70%]">
//           <div className="flex items-center gap-2 mb-1.5">
//             <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
//               <FiCpu size={12} className="text-purple-600" />
//             </div>
//             <span className="text-xs font-medium text-purple-600">
//               AVANTE-AI
//             </span>
//           </div>
//           <div className="rounded-2xl px-4 py-2.5 shadow-sm bg-purple-50 border border-purple-200 text-gray-800">
//             <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
//               {message.message}
//             </p>
//             {message.attachment && (
//               <div className="mt-2">
//                 {message.attachment.match(/\.(jpeg|jpg|gif|png|webp)$/) ? (
//                   <img
//                     src={message.attachment}
//                     alt={t("support.attachment")}
//                     className="max-w-[200px] max-h-[150px] rounded-lg cursor-pointer hover:opacity-90 transition border"
//                     onClick={() => window.open(message.attachment, "_blank")}
//                   />
//                 ) : (
//                   <a
//                     href={message.attachment}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-xs inline-flex items-center gap-1.5 mt-1 text-purple-600"
//                   >
//                     <FiPaperclip size={12} />
//                     {t("support.viewAttachment")}
//                   </a>
//                 )}
//               </div>
//             )}
//           </div>
//           {message.created_at && (
//             <div className="text-xs text-gray-400 mt-1">
//               {formatDistanceToNow(new Date(message.created_at), {
//                 addSuffix: true,
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }

//   // Admin Messages - Same as before
//   if (isAdmin) {
//     return (
//       <div className="flex justify-start">
//         <div className="max-w-[70%]">
//           <div className="flex items-center gap-2 mb-1.5">
//             <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
//               <FiHelpCircle size={12} className="text-gray-600" />
//             </div>
//             <span className="text-xs font-medium text-gray-600">
//               {message.sender?.name || "Support Team"}
//             </span>
//           </div>
//           <div className="rounded-2xl px-4 py-2.5 shadow-sm bg-white border border-gray-200 text-gray-800">
//             <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
//               {message.message}
//             </p>
//             {message.attachment && (
//               <div className="mt-2">
//                 {message.attachment.match(/\.(jpeg|jpg|gif|png|webp)$/) ? (
//                   <img
//                     src={message.attachment}
//                     alt={t("support.attachment")}
//                     className="max-w-[200px] max-h-[150px] rounded-lg cursor-pointer hover:opacity-90 transition border"
//                     onClick={() => window.open(message.attachment, "_blank")}
//                   />
//                 ) : (
//                   <a
//                     href={message.attachment}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-xs inline-flex items-center gap-1.5 mt-1 text-blue-600"
//                   >
//                     <FiPaperclip size={12} />
//                     {t("support.viewAttachment")}
//                   </a>
//                 )}
//               </div>
//             )}
//           </div>
//           {message.created_at && (
//             <div className="text-xs text-gray-400 mt-1">
//               {formatDistanceToNow(new Date(message.created_at), {
//                 addSuffix: true,
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }

//   // User Messages - Same as before (right side)
//   return (
//     <div className="flex justify-end">
//       <div className="max-w-[70%]">
//         <div className="flex items-center gap-2 mb-1.5 justify-end">
//           <span className="text-xs font-medium text-blue-600">
//             {message.sender?.name || t("support.you")}
//           </span>
//           <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
//             <FiUser size={12} className="text-blue-600" />
//           </div>
//         </div>
//         <div className="rounded-2xl px-4 py-2.5 shadow-sm bg-gradient-to-br from-blue-600 to-blue-500 text-white">
//           <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
//             {message.message}
//           </p>
//           {message.attachment && (
//             <div className="mt-2">
//               {message.attachment.match(/\.(jpeg|jpg|gif|png|webp)$/) ? (
//                 <img
//                   src={message.attachment}
//                   alt={t("support.attachment")}
//                   className="max-w-[200px] max-h-[150px] rounded-lg cursor-pointer hover:opacity-90 transition border"
//                   onClick={() => window.open(message.attachment, "_blank")}
//                 />
//               ) : (
//                 <a
//                   href={message.attachment}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-xs inline-flex items-center gap-1.5 mt-1 text-white/90"
//                 >
//                   <FiPaperclip size={12} />
//                   {t("support.viewAttachment")}
//                 </a>
//               )}
//             </div>
//           )}
//         </div>
//         {message.created_at && (
//           <div className="text-xs text-gray-400 mt-1 text-right">
//             {formatDistanceToNow(new Date(message.created_at), {
//               addSuffix: true,
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MessageBubble;

import { formatDistanceToNow } from "date-fns";
import {
  FiUser,
  FiHelpCircle,
  FiPaperclip,
  FiCpu,
  FiStar,
} from "react-icons/fi";
import { useTranslation } from "react-i18next";

const MessageBubble = ({ message }) => {
  const { t } = useTranslation();

  const isAI = message.is_ai === true;
  const isSuperAdmin =
    message.sender?.role_id === 1 && message.is_admin === true;
  const isAdmin = message.is_admin === true && !isSuperAdmin && !isAI;

  // AI Messages - Purple highlight
  if (isAI) {
    return (
      <div className="flex justify-start">
        <div className="max-w-[70%]">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
              <FiCpu size={12} className="text-purple-600" />
            </div>
            <span className="text-xs font-medium text-purple-600">
              AVANTE-AI
            </span>
          </div>
          <div className="rounded-2xl px-4 py-2.5 shadow-sm bg-purple-50 border border-purple-200 text-gray-800">
            <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
              {message.message}
            </p>
            {message.attachment && (
              <div className="mt-2">
                {message.attachment.match(/\.(jpeg|jpg|gif|png|webp)$/) ? (
                  <img
                    src={message.attachment}
                    alt={t("support.attachment")}
                    className="max-w-[200px] max-h-[150px] rounded-lg cursor-pointer hover:opacity-90 transition border"
                    onClick={() => window.open(message.attachment, "_blank")}
                  />
                ) : (
                  <a
                    href={message.attachment}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs inline-flex items-center gap-1.5 mt-1 text-purple-600"
                  >
                    <FiPaperclip size={12} />
                    {t("support.viewAttachment")}
                  </a>
                )}
              </div>
            )}
          </div>
          {message.created_at && (
            <div className="text-xs text-gray-400 mt-1">
              {formatDistanceToNow(new Date(message.created_at), {
                addSuffix: true,
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Super Admin Messages - Light Blue highlight with gradient icon
  if (isSuperAdmin) {
    return (
      <div className="flex justify-start">
        <div className="max-w-[70%]">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center">
              <FiStar size={12} className="text-blue-600" />
            </div>
            <span className="text-xs font-medium text-blue-600">
              {message.sender?.name || "Super Admin"}
            </span>
            <span className="text-[10px] bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 px-1.5 py-0.5 rounded-full">
              Super Admin
            </span>
          </div>
          <div className="rounded-2xl px-4 py-2.5 shadow-sm bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-200 text-blue-600">
            <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
              {message.message}
            </p>
            {message.attachment && (
              <div className="mt-2">
                {message.attachment.match(/\.(jpeg|jpg|gif|png|webp)$/) ? (
                  <img
                    src={message.attachment}
                    alt={t("support.attachment")}
                    className="max-w-[200px] max-h-[150px] rounded-lg cursor-pointer hover:opacity-90 transition border"
                    onClick={() => window.open(message.attachment, "_blank")}
                  />
                ) : (
                  <a
                    href={message.attachment}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs inline-flex items-center gap-1.5 mt-1 text-blue-600"
                  >
                    <FiPaperclip size={12} />
                    {t("support.viewAttachment")}
                  </a>
                )}
              </div>
            )}
          </div>
          {message.created_at && (
            <div className="text-xs text-gray-400 mt-1">
              {formatDistanceToNow(new Date(message.created_at), {
                addSuffix: true,
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Normal Admin/Staff Messages - Default style
  if (isAdmin) {
    return (
      <div className="flex justify-start">
        <div className="max-w-[70%]">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
              <FiHelpCircle size={12} className="text-gray-600" />
            </div>
            <span className="text-xs font-medium text-gray-600">
              {message.sender?.name || "Support Team"}
            </span>
          </div>
          <div className="rounded-2xl px-4 py-2.5 shadow-sm bg-white border border-gray-200 text-gray-800">
            <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
              {message.message}
            </p>
            {message.attachment && (
              <div className="mt-2">
                {message.attachment.match(/\.(jpeg|jpg|gif|png|webp)$/) ? (
                  <img
                    src={message.attachment}
                    alt={t("support.attachment")}
                    className="max-w-[200px] max-h-[150px] rounded-lg cursor-pointer hover:opacity-90 transition border"
                    onClick={() => window.open(message.attachment, "_blank")}
                  />
                ) : (
                  <a
                    href={message.attachment}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs inline-flex items-center gap-1.5 mt-1 text-blue-600"
                  >
                    <FiPaperclip size={12} />
                    {t("support.viewAttachment")}
                  </a>
                )}
              </div>
            )}
          </div>
          {message.created_at && (
            <div className="text-xs text-gray-400 mt-1">
              {formatDistanceToNow(new Date(message.created_at), {
                addSuffix: true,
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // User Messages - Same as before (right side)
  return (
    <div className="flex justify-end">
      <div className="max-w-[70%]">
        <div className="flex items-center gap-2 mb-1.5 justify-end">
          <span className="text-xs font-medium text-blue-600">
            {message.sender?.name || t("support.you")}
          </span>
          <div className="w-6 h-6 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center">
            <FiUser size={12} className="text-blue-600" />
          </div>
        </div>
        <div className="rounded-2xl px-4 py-2.5 shadow-sm bg-gradient-to-br from-blue-600 to-blue-500 text-white">
          <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
            {message.message}
          </p>
          {message.attachment && (
            <div className="mt-2">
              {message.attachment.match(/\.(jpeg|jpg|gif|png|webp)$/) ? (
                <img
                  src={message.attachment}
                  alt={t("support.attachment")}
                  className="max-w-[200px] max-h-[150px] rounded-lg cursor-pointer hover:opacity-90 transition border"
                  onClick={() => window.open(message.attachment, "_blank")}
                />
              ) : (
                <a
                  href={message.attachment}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs inline-flex items-center gap-1.5 mt-1 text-white/90"
                >
                  <FiPaperclip size={12} />
                  {t("support.viewAttachment")}
                </a>
              )}
            </div>
          )}
        </div>
        {message.created_at && (
          <div className="text-xs text-gray-400 mt-1 text-right">
            {formatDistanceToNow(new Date(message.created_at), {
              addSuffix: true,
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;

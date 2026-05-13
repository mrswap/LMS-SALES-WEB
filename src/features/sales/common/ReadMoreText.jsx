import React, { useState } from "react";

const ReadMoreText = ({ text, maxLength = 120, className = "" }) => {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  const shouldTruncate = text.length > maxLength;

  const displayedText = expanded ? text : text.slice(0, maxLength);

  return (
    <p className={` ${className}`}>
      {displayedText}

      {shouldTruncate && !expanded && "... "}

      {shouldTruncate && (
        <span
          onClick={() => setExpanded(!expanded)}
          className="ml-1 cursor-pointer text-blue-500 whitespace-nowrap hover:underline text-xs font-medium"
        >
          {expanded ? "See less" : "See more"}
        </span>
      )}
    </p>
  );
};

export default ReadMoreText;

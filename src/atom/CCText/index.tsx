"use client";
import localFont from "next/font/local";
import React, { useMemo, useState } from "react";

type CCTextProp = {
  children:
    | string
    | string[]
    | JSX.Element
    | JSX.Element[]
    | number
    | (string | JSX.Element)[];
  className?: string;
  style?: React.CSSProperties;
  lines?: number; // Optional number of lines to display when truncated
  fontFamily?: "thunder" | "dm-sans";
};

export const thunderFont = localFont({
  src: "../../app/fonts/THUNDER/Fonts/Web-TT/Thunder-LC.woff", // Adjust to the correct font file path
  variable: "--font-thunder",
});
function CCText({
  children,
  lines,
  className = "",
  style,
  fontFamily = "dm-sans",
  ...rest
}: CCTextProp) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle between expanded and collapsed states
  const toggleExpand = () => setIsExpanded(!isExpanded);
  const isFontThunder = useMemo(() => fontFamily === "thunder", [fontFamily]);
  return (
    <div
      className={`${
        isFontThunder ? thunderFont.className : ""
      } ${className} text-textColor-default `}
      style={style}
      {...rest}
    >
      <div
        className={`${className} overflow-hidden ${
          !isExpanded && lines ? `line-clamp-${lines}` : ""
        }`}
        style={
          lines && !isExpanded
            ? {
                display: "-webkit-box",
                WebkitLineClamp: lines,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }
            : {}
        }
        onClick={toggleExpand}
      >
        {children}
      </div>
      {/* Show more/less button */}
      {/* {lines && (
        <button onClick={toggleExpand} className="text-blue-500 mt-2">
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      )} */}
    </div>
  );
}

export default CCText;

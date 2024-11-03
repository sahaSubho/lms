import React, { useState, useRef, useEffect } from "react";
import CCCard from "../CCCard";
import CCText from "../CCText";
import Spacer from "../Spacer";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

interface CCExpandableCardProps {
  children: JSX.Element | JSX.Element[];
  className?: string;
  maxHeight?: number | null; // If null, the card will show full content by default
}

function CCExpandableCard({
  children,
  className,
  maxHeight = null,
}: CCExpandableCardProps) {
  const [isExpanded, setIsExpanded] = useState(!maxHeight); // If maxHeight is null, start expanded
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    // Adjust the maxHeight when expanding or collapsing
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isExpanded
        ? `${contentRef.current.scrollHeight}px`
        : `${maxHeight}px`;
    }
  }, [isExpanded, maxHeight]);

  return (
    <CCCard className={`relative ${className ? className : ""}`}>
      <div
        ref={contentRef}
        className={`overflow-hidden transition-max-height duration-500 ease-in-out relative ${
          maxHeight ? "" : "max-h-none"
        }`}
        style={{
          maxHeight: maxHeight && !isExpanded ? `${maxHeight}px` : "none",
        }}
      >
        {children}

        {/* Blurred overlay if not expanded and maxHeight is set */}
        {!isExpanded && maxHeight && (
          <div
            className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))",
            }}
          ></div>
        )}
      </div>

      {/* Show More / Show Less Button */}
      {maxHeight ? (
        <>
          <Spacer spacing={25} />
          <button
            onClick={toggleExpand}
            style={{ left: "3vw" }}
            className="absolute bottom-5 "
          >
            <CCText className="text-brand-aqua text-base font-medium flex justify-center items-center gap-2">
              {isExpanded ? "Show Less" : "Show More"}
              {isExpanded ? (
                <FaAngleUp size={16} className="text-brand-aqua" />
              ) : (
                <FaAngleDown size={16} className="text-brand-aqua" />
              )}
            </CCText>
          </button>
        </>
      ) : (
        <></>
      )}
    </CCCard>
  );
}

export default CCExpandableCard;

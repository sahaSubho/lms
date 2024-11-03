import React from "react";

function CCCard({
  children,
  className,
}: {
  children: JSX.Element | JSX.Element[];
  className?: string;
}) {
  return (
    <div
      className={`flex shadow-default bg-white mt-6 mb-4 rounded-lg w-full h-1/4 ${
        className && className
      }`}
    >
      {children}
    </div>
  );
}

export default CCCard;

// "use client";
// import React, { useState, useRef, useEffect } from "react";

// function CCCard({
//   children,
//   className,
//   maxHeight = null, // Default maxHeight is null, meaning no height limit
// }: {
//   children: JSX.Element | JSX.Element[];
//   className?: string;
//   maxHeight?: number | null;
// }) {
//   const [isExpanded, setIsExpanded] = useState(!maxHeight); // If maxHeight is null, start expanded
//   const contentRef = useRef<HTMLDivElement>(null);

//   const toggleExpand = () => {
//     setIsExpanded((prev) => !prev);
//   };

//   useEffect(() => {
//     // Adjust the maxHeight when expanding or collapsing
//     if (contentRef.current) {
//       contentRef.current.style.maxHeight = isExpanded
//         ? `${contentRef.current.scrollHeight}px`
//         : `${maxHeight}px`;
//     }
//   }, [isExpanded, maxHeight]);

//   return (
//     <div
//       className={`flex shadow-default bg-white mt-6 mb-4 rounded-lg w-full relative ${
//         className ? className : ""
//       }`}
//     >
//       <div
//         ref={contentRef}
//         className={`flex overflow-hidden transition-max-height duration-500 ease-in-out relative ${
//           maxHeight ? "" : "max-h-none"
//         }
//         ${className ? className : ""}`}
//         style={{
//           maxHeight: maxHeight && !isExpanded ? `${maxHeight}px` : "none",
//         }}
//       >
//         {children}

//         {/* Blurred overlay if not expanded and maxHeight is set */}
//         {!isExpanded && maxHeight && (
//           <div
//             className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"
//             style={{
//               background:
//                 "linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))",
//             }}
//           ></div>
//         )}
//       </div>

//       {/* Show More / Show Less Button */}
//       {maxHeight && (
//         <button
//           onClick={toggleExpand}
//           className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-brand-yellow text-white rounded-full px-4 py-1 shadow-md focus:outline-none"
//         >
//           {isExpanded ? "Show Less" : "Show More"}
//         </button>
//       )}
//     </div>
//   );
// }

// export default CCCard;

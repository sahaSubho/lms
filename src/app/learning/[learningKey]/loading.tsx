"use client";

import Spacer from "@/atom/Spacer";
import React from "react";

function LearnPageLoader() {
  return (
    <div className="flex justify-between items-start animate-pulse space-x-4 min-h-screen h-full p-4">
      {/* Left Section */}
      <div className="flex-[0.73] flex flex-col gap-4 h-full">
        {/* Header Section */}
        <div className="flex items-center gap-3 bg-white h-[60px] p-4 rounded-md">
          <div className="flex-[0.1] h-full bg-gray-300 rounded-md" />
          <div className="flex-[0.6] flex flex-col gap-2">
            <div className="w-3/4 h-4 bg-gray-300 rounded-md"></div>
            <div className="w-1/2 h-4 bg-gray-300 rounded-md"></div>
          </div>
          <div className="flex-[0.3] flex flex-col items-end">
            <div className="w-full h-3 bg-gray-300 rounded-md mb-2"></div>
            <div className="w-12 h-4 bg-gray-300 rounded-md"></div>
          </div>
        </div>

        {/* Course Content */}
        <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-start justify-start flex-1 h-full">
          <div className="w-1/2 h-4 bg-gray-300 rounded-md mb-4"></div>
          {[...Array(15)].map((_, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center py-3 px-4"
            >
              <div className="w-3/4 h-4 bg-gray-300 rounded-md"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-[0.27] flex flex-col space-y-4 h-full">
        {/* Title and Jump to Section */}
        <div className="flex justify-between items-center mb-4">
          <div className="w-3/4 h-6 bg-gray-300 rounded-md"></div>
          <Spacer spacing={5} horizontal />
          <div className="w-1/4 h-6 bg-gray-300 rounded-md"></div>
        </div>

        {/* Main Content Placeholder */}
        <div className="w-full h-[60vh] bg-gray-300 rounded-md mb-4"></div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-300 mb-4"></div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-auto">
          <div className="flex flex-col items-start space-y-2">
            <div className="w-24 h-8 bg-gray-300 rounded-md"></div>
            <div className="w-3/4 h-4 bg-gray-300 rounded-md"></div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <div className="w-24 h-8 bg-gray-300 rounded-md"></div>
            <div className="w-3/4 h-4 bg-gray-300 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearnPageLoader;

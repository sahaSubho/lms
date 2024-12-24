"use client";
import CCCard from "@/atom/CCCard";
import Spacer from "@/atom/Spacer";
import React from "react";

function EachLearningCardSkeleton() {
  return (
    <div>
      <CCCard className="gap-5 h-28 animate-pulse">
        {/* Image Placeholder */}
        <div className="flex-[0.1] flex justify-center items-center bg-gradient-to-b from-gray-200 to-gray-300 rounded-md">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </div>
        <div className="flex-[0.9] flex justify-between items-center">
          {/* Title and Subtitle Placeholder */}
          <div className="flex-col justify-center items-center flex-[0.5]">
            <div className="w-3/4 h-4 bg-gray-300 rounded-md"></div>
            <Spacer spacing={6} />
            <div className="flex items-center gap-2">
              <div className="w-20 h-4 bg-gray-300 rounded-full"></div>
              <Spacer spacing={8} horizontal />
              <div className="w-32 h-4 bg-gray-300 rounded-md"></div>
            </div>
          </div>

          {/* Progress and Percentage Placeholder */}
          <div className="flex-[0.3] flex flex-col justify-end items-end w-3/12">
            <div className="w-full h-3 bg-gray-300 rounded-md mb-2"></div>
            <Spacer spacing={6} />
            <div className="w-12 h-4 bg-gray-300 rounded-md"></div>
          </div>

          {/* Button Placeholder */}
          <div className="flex-[0.2] flex justify-center">
            <div className="w-20 h-8 bg-gray-300 rounded-md"></div>
          </div>
        </div>
      </CCCard>
    </div>
  );
}

export default EachLearningCardSkeleton;

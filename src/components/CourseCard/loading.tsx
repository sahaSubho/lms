import React from "react";
import CCDivider from "@/atom/CCDivider";

const ShimmerEffect = ({ className }: { className: string }) => (
  <div
    className={`bg-gray-300 rounded-md ${className}`}
    style={{
      background: `linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0) 100%)`,
      backgroundSize: "200% 100%",
      animation: "shimmerAnimation 1.5s infinite",
    }}
  />
);

function CourseCardShimmer() {
  return (
    <div className="flex flex-col rounded-lg border border-grey w-72 h-[500px] my-5 animate-pulse">
      {/* Top Image Placeholder with Shimmer */}
      <div className="relative flex-[0.4] rounded-t-lg border-b bg-gradient-to-b from-white to-gray-200">
        <div className="absolute top-0 left-0 m-4 py-[6px] px-[10px] w-12 h-5 bg-gray-300 rounded animate-pulse"></div>
        <div className="absolute top-0 right-0 m-4 py-[6px] px-[10px] w-12 h-5 bg-gray-300 rounded animate-pulse"></div>
      </div>

      {/* Text and Details Placeholders with Shimmer */}
      <div className="flex-[0.45] px-5 py-6 space-y-4">
        <ShimmerEffect className="w-1/2 h-4" />
        <ShimmerEffect className="w-3/4 h-5" />
        <div className="flex gap-2 mt-4">
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded-full bg-gray-300 animate-pulse"></div>
            <ShimmerEffect className="w-16 h-4" />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded-full bg-gray-300 animate-pulse"></div>
            <ShimmerEffect className="w-16 h-4" />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <ShimmerEffect className="w-10 h-4" />
          <ShimmerEffect className="w-10 h-4" />
        </div>
      </div>

      {/* Price and Button Placeholders with Shimmer */}
      <div className="flex-[0.15] border-b">
        <CCDivider />
        <div className="p-5 flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <ShimmerEffect className="w-16 h-5" />
            <ShimmerEffect className="w-20 h-4" />
          </div>
          <div className="w-20 h-8 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default CourseCardShimmer;

import React from "react";
import Image from "next/image"; // Import Next.js Image component for optimized image loading
import BarBackground from "@/assets/Components/BarGraph/bar-background.svg";
import CCText from "../CCText";
import LeftRightArrow from "@/assets/arrows/left-right-curve-arrow.svg";
type PercentageBoxProps = {
  from: number; // percentage for the from bar
  to: number; // percentage for the to bar
};

function PercentageBox({ from, to }: PercentageBoxProps) {
  // Scale percentage values to pixel heights (e.g., 1% = 3px)
  const scaleFactor = 1;
  const fromHeight = from * scaleFactor;
  const toHeight = to * scaleFactor;

  // Calculate the arrow's vertical position
  const maxHeight = Math.max(fromHeight, toHeight); // max height to properly position the arrow

  return (
    <div
      className="flex items-end  justify-center relative m-5"
      style={{ height: "90%" }}
    >
      {/* Left Box */}
      <div className="flex flex-col  items-center mx-2 relative h-full justify-end">
        {/* Background Image */}
        <Image
          src={BarBackground}
          alt="Bar Background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 "
        />
        <CCText className="mt-1 text-sm font-semibold relative">{`${from}%`}</CCText>
        {/* Color Overlay */}
        <div
          className="w-12 bg-orange-500 rounded flex items-center justify-center text-white relative "
          style={{ height: `${fromHeight}%` }}
        >
          {/* {from}% */}
        </div>
        {/* <p className="mt-1 text-sm relative">{from}%</p> */}
      </div>

      {/* Arrow */}
      <div
        className="absolute flex items-center justify-center  "
        style={{
          top: `${to + 20 < 100 ? 100 - to - 20 : 0}%`, // Adjust top position to be above the taller bar
        }}
      >
        <Image
          src={LeftRightArrow}
          alt="Bar Background"
          //   layout="fill"
          //   objectFit="cover"
          //   className="absolute inset-0 "
        />
        {/* <svg width="120" height={maxHeight + 40}>
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="0"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#6B5032" />
            </marker>
          </defs>
          <path
            d={`M0 ${fromHeight} Q60 ${
              (fromHeight + toHeight) / 2
            } 120 ${toHeight}`}
            stroke="#6B5032"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowhead)"
          />
        </svg> */}
      </div>

      {/* Right Box */}
      <div className="flex flex-col items-center mx-2 relative  h-full  justify-end">
        {/* Background Image */}
        <Image
          src={BarBackground}
          alt="Bar Background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 "
        />
        {/* Color Overlay */}
        <CCText className="mt-1 text-sm font-semibold relative">{`${to}%`}</CCText>
        <div
          className="w-12 bg-yellow-600 rounded flex items-center justify-center text-white relative"
          style={{ height: `${toHeight}%` }}
        >
          {/* {to}% */}
        </div>
        {/* <p className="mt-1 text-sm relative">{to}%</p> */}
      </div>
    </div>
  );
}

export default PercentageBox;

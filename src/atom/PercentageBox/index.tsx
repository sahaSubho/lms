import React from "react";

type PercentageBoxProps = {
  from: number;
  to: number;
};

function PercentageBox({ from, to }: PercentageBoxProps) {
  return (
    <div className="flex items-end justify-center relative">
      {/* Left Box */}
      <div className="flex flex-col items-center mx-2">
        <div className="w-12 h-8 bg-orange-500 rounded-sm"></div>
        <p className="mt-1 text-sm">{from}%</p>
      </div>

      {/* Arrow */}
      <div
        className="absolute flex items-center justify-center"
        style={{ top: "-1rem" }}
      >
        <svg width="60" height="30">
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
            d="M10 20 Q30 5 50 20"
            stroke="#6B5032"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowhead)"
          />
        </svg>
      </div>

      {/* Right Box */}
      <div className="flex flex-col items-center mx-2">
        <div className="w-12 h-16 bg-yellow-600 rounded-sm"></div>
        <p className="mt-1 text-sm">{to}%</p>
      </div>
    </div>
  );
}

export default PercentageBox;

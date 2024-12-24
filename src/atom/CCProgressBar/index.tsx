import React from "react";

type CCProgressBarProps = {
  percentage: number;
  isCircular?: boolean;
  width?: number;
  height?: number;
  hideText?: boolean;
};

const CCProgressBar = ({
  percentage,
  isCircular = false,
  width = 120,
  height = 120,
  hideText = false,
}: CCProgressBarProps) => {
  if (isCircular) {
    const size = Math.min(width, height);
    const radius = (size - 10) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    const strokeWidth = 4;
    return (
      <svg width={width} height={height} className="progress-circle">
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          style={{
            stroke: "#26232233",
          }}
        />
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          style={{
            stroke: "#3DAB9E",
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            transition: "stroke-dashoffset 0.5s ease",
            transform: `rotate(-90deg)`,
            transformOrigin: "center",
          }}
        />
        {!hideText && (
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".3em"
            fontSize="20px"
            fill="#333"
          >
            {`${percentage}%`}
          </text>
        )}
      </svg>
    );
  }

  // Linear progress bar as fallback
  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-brand-aqua h-4 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default CCProgressBar;

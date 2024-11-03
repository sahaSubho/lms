import React from "react";

type CCProgressBarProps = {
  percentage: number;
};
const CCProgressBar = ({ percentage }: CCProgressBarProps) => {
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

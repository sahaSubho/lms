// components/Divider.tsx
import React from "react";

type DividerProps = {
  className?: string;
  style?: React.CSSProperties;
  text?: string;
};

const CCDivider: React.FC<DividerProps> = ({ className = "", style = {}, text = '' }) => {
  return (
    <div
      className={`w-full h-px relative ${className}`}
      style={{
        background: "var(--stroke, #26232233)",
        ...style,
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="px-4 bg-white text-gray-600">{text}</h2>
      </div>
      </div>
  );
};

export default CCDivider;

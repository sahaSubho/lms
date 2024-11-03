// components/Divider.tsx
import React from "react";

type DividerProps = {
  className?: string;
  style?: React.CSSProperties;
};

const CCDivider: React.FC<DividerProps> = ({ className = "", style = {} }) => {
  return (
    <div
      className={`w-full h-px ${className}`}
      style={{
        background: "var(--stroke, #26232233)",
        ...style,
      }}
    />
  );
};

export default CCDivider;

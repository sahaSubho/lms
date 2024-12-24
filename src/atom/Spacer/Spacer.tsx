"use client"; // If using in a Next.js App Router

import React from "react";

export interface ISpacerProps {
  spacing?: number;
  horizontal?: boolean;
  className?: string;
}

export default function Spacer({
  spacing = 8,
  horizontal = false,
  className = "",
}: ISpacerProps) {
  return (
    <div
      className={className}
      style={{
        display: horizontal ? "inline-block" : "block", // Ensure the spacer takes the correct layout
        width: horizontal ? spacing : "auto", // Apply horizontal spacing as width
        height: horizontal ? "auto" : spacing, // Apply vertical spacing as height
      }}
    />
  );
}

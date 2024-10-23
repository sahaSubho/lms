"use client"; // If using in a Next.js App Router

import React from "react";

export interface ISpacerProps {
  spacing?: number;
  horizontal?: boolean;
}

export default function Spacer({
  spacing = 8,
  horizontal = false,
}: ISpacerProps) {
  return (
    <div
      style={{
        display: horizontal ? "inline-block" : "block", // Ensure the spacer takes the correct layout
        width: horizontal ? spacing : "auto", // Apply horizontal spacing as width
        height: horizontal ? "auto" : spacing, // Apply vertical spacing as height
      }}
    />
  );
}

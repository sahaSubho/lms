"use client";
import React, { useMemo } from "react";

type CCButtonProps = {
  type?: "submit" | "button";
  children: string | string[] | JSX.Element | JSX.Element[];
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  textColor?: "white" | "black" | "grey";
  buttonType?:
    | "grey"
    | "yellow"
    | "white"
    | "aqua"
    | "darkRed"
    | "darkYellow"
    | "darkBrown";
  buttonStyle?: "circle" | "square" | "none";
  className?: string;
  icon?: JSX.Element;
  textStyle?: object;
};

function CCButton(props: CCButtonProps) {
  const {
    type = "button",
    children,
    onClick,
    textColor = "black",
    className,
    buttonType = "yellow",
    buttonStyle = "circle",
    icon,
    textStyle,
  } = props;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
  };
  const isTextWhite = useMemo(() => textColor === "white", [textColor]);
  // const isButtonGrey = useMemo(() => buttonType === "grey", [buttonType]);
  // const isButtonWhite = useMemo(() => buttonType === "white", [buttonType]);
  // const isButtonYellow = useMemo(() => buttonType === "yellow", [buttonType]);
  // const isButtonAqua = useMemo(() => buttonType === "aqua", [buttonType]);
  const isbuttonStyleSquare = useMemo(
    () => buttonStyle === "square",
    [buttonStyle]
  );
  const isbuttonStyleNone = useMemo(
    () => buttonStyle === "none",
    [buttonStyle]
  );
  // const isTextWhite=useMemo(() => textColor==='white', [textColor])
  return (
    <button
      type={type}
      className={`rounded-full py-2 ${
        className?.includes("px") ? "" : "px-8"
      } transition-all duration-300 shadow-md hover:shadow-lg active:shadow-inner ${
        isTextWhite ? "text-textColor-white" : "text-textColor-default"
      } bg-brand-${buttonType} ${
        isbuttonStyleSquare ? "rounded-lg border border-1 border-grey" : ""
      } ${
        isbuttonStyleNone
          ? "shadow-none text-brand-blue hover:shadow-none bg-transparent border-0"
          : ""
      } ${className && className}`}
      onClick={handleClick}
    >
      <div className="flex gap-2 justify-center items-center" style={textStyle}>
        {icon}
        {children}
      </div>
    </button>
  );
}

export default CCButton;

"use client";
import React, { useMemo } from "react";

type CCButtonProps = {
  children: string | string[] | JSX.Element | JSX.Element[];
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  textColor?: "white" | "black" | "grey";
  buttonType?: "grey" | "yellow" | "white";
  buttonStyle?: "circle" | "square" | "none";
  className?: string;
};

function CCButton(props: CCButtonProps) {
  const {
    children,
    onClick,
    textColor = "black",
    className,
    buttonType = "yellow",
    buttonStyle = "circle",
  } = props;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
  };
  const isTextWhite = useMemo(() => textColor === "white", [textColor]);
  const isButtonGrey = useMemo(() => buttonType === "grey", [buttonType]);
  const isButtonWhite = useMemo(() => buttonType === "white", [buttonType]);
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
      className={`rounded-full py-2 px-8 transition-all duration-300 shadow-md hover:shadow-lg active:shadow-inner ${
        isTextWhite ? "text-textColor-white" : "text-textColor-default"
      } ${isButtonGrey ? "bg-brand-background" : "bg-brand-yellow"} 
      ${isbuttonStyleSquare && "rounded-lg border border-1 border-grey"} 
      ${
        isbuttonStyleNone &&
        "shadow-none text-brand-blue hover:shadow-none bg-transparent border-0"
      } 
      ${isButtonWhite ? "bg-white " : ""} ${className && className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default CCButton;

"use client";
import React, { useMemo } from "react";

type CCButtonProps = {
  type?: "submit" | "button";
  children: string | string[] | JSX.Element | JSX.Element[];
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  textColor?: "white" | "black" | "grey";
  buttonType?: "grey" | "yellow" | "white";
  buttonStyle?: "circle" | "square" | "none";
  className?: string;
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
  } = props;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
  };
  const isTextWhite = useMemo(() => textColor === "white", [textColor]);
  console.log("isTextWhite", isTextWhite);
  const isButtonGrey = useMemo(() => buttonType === "grey", [buttonType]);
  const isButtonWhite = useMemo(() => buttonType === "white", [buttonType]);
  const isButtonYellow = useMemo(() => buttonType === "yellow", [buttonType]);
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
      className={`rounded-full py-2 px-8 transition-all duration-300 shadow-md hover:shadow-lg active:shadow-inner ${
        isTextWhite ? "text-textColor-white" : "text-textColor-default"
      } ${isButtonGrey && "bg-brand-background"} ${
        isButtonYellow && "bg-brand-yellow"
      }
      ${isbuttonStyleSquare && "rounded-lg border border-1 border-grey"} 
      ${
        isbuttonStyleNone &&
        "shadow-none text-brand-blue hover:shadow-none bg-transparent border-0"
      } 
      ${isButtonWhite && "bg-white "} ${className && className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default CCButton;

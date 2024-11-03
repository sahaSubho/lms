"use client";
import React, { useMemo } from "react";

type CCButtonProps = {
  children: string | string[] | JSX.Element | JSX.Element[];
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  textColor?: "white" | "black" | "grey";
  buttonType?: "grey" | "yellow";
  className?: string;
};

function CCButton(props: CCButtonProps) {
  const {
    children,
    onClick,
    textColor = "black",
    className,
    buttonType = "yellow",
  } = props;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
  };
  const isWhite = useMemo(() => textColor === "white", [textColor]);
  const isButtonGrey = useMemo(() => buttonType === "grey", [buttonType]);
  // const isWhite=useMemo(() => textColor==='white', [textColor])
  return (
    <button
      className={`rounded-full py-2 px-8 transition-all duration-300 shadow-md hover:shadow-lg active:shadow-inner ${
        isWhite ? "text-textColor-white" : "text-textColor-default"
      } ${isButtonGrey ? "bg-brand-background" : "bg-brand-yellow"} ${
        className && className
      }`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default CCButton;

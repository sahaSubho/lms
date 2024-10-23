"use client";
import React from "react";

type CCButtonProps = {
  children: string | string[] | JSX.Element | JSX.Element[];
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function CCButton(props: CCButtonProps) {
  const { children, onClick } = props;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
  };

  return (
    <button
      className="bg-brand-yellow rounded-full py-2 px-8 transition-all duration-300 shadow-md hover:shadow-lg active:shadow-inner "
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default CCButton;

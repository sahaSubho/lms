"use client";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import CCText from "../CCText";
import CCDivider from "../CCDivider";

type CCModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: "side" | "center"; // CCModal types
  children: React.ReactNode;
  header?: string | JSX.Element;
};

const CCModal: React.FC<CCModalProps> = ({
  isOpen,
  onClose,
  type,
  children,
  header,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      // Trigger the open animation
      setTimeout(() => setIsVisible(true), 10); // Small delay to ensure the animation plays
    } else {
      // Trigger the close animation
      setIsVisible(false);
      // Wait for the animation to complete before unmounting
      const timer = setTimeout(() => setIsMounted(false), 300); // Adjust timing to match the animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* CCModal Content */}
      <div
        className={`${
          type === "side"
            ? `ml-auto w-80 h-full bg-white transform transition-transform duration-300 ${
                isVisible ? "translate-x-0" : "translate-x-full"
              }`
            : `bg-white rounded-lg transform transition-transform duration-300 ${
                isVisible ? "scale-100" : "scale-95"
              } ${type === "center" ? "m-auto" : ""}`
        }  relative w-full sm:w-11/12 sm:max-w-md ${
          type === "center" ? "h-full sm:h-auto" : "h-full"
        }`}
      >
        {!!header && (
          <div className="top-0 static ">
            <div className=" p-8 flex justify-between items-center ">
              <CCText fontFamily="thunder" className="font-bold text-4xl ">
                {`${header}`}
              </CCText>
              <button
                className="text-gray-500 hover:text-gray-700 bg-background p-2 rounded-full"
                onClick={onClose}
              >
                <IoClose size={20} className="text-textColor-default" />
              </button>
            </div>
            <CCDivider />
          </div>
        )}
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default CCModal;

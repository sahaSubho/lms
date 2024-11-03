import React, { FC } from "react";
import { IconType } from "react-icons";

interface CCInputProps {
  icon?: IconType; // Optional icon component from react-icons
  placeholder?: string;
  rightText?: string;
}

const CCInput: FC<CCInputProps> = ({ icon: Icon, placeholder, rightText }) => {
  return (
    <div
      style={{ border: "1px solid #26232233" }}
      className="w-full bg-white flex items-center border border-1 border-gray-200/20 rounded-lg overflow-hidden"
    >
      {/* Icon on the left */}
      {Icon && (
        <div className="p-2">
          <Icon className="text-gray-500" />
        </div>
      )}

      {/* Input field */}
      <input
        type="text"
        placeholder={placeholder}
        className="text-textColor-default flex-1 py-2  outline-none border-none text-sm"
      />
    </div>
  );
};

export default CCInput;

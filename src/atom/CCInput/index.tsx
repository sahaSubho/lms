import React, { FC } from "react";
import { IconType } from "react-icons";

interface CCInputProps {
  icon?: IconType; // Optional icon component from react-icons
  placeholder?: string;
  rightText?: string;
  type?: string;
  name?: string;
  value?: string;
  onChange?: (e: { target: { value: string } }) => void;
}

const CCInput: FC<CCInputProps> = ({ name, value, type = "text", onChange,  icon: Icon, placeholder, rightText }) => {
  return (
    <div
      style={{ border: "1px solid #26232233" }}
      className="w-full px-4 bg-white flex items-center border border-1 border-gray-200/20 rounded-lg overflow-hidden"
    >
      {/* Icon on the left */}
      {Icon && (
        <div className="p-2">
          <Icon className="text-gray-500" />
        </div>
      )}

      {/* Input field */}
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className="text-textColor-default flex-1 py-2  outline-none border-none text-sm"
        onChange={onChange}
      />
    </div>
  );
};

export default CCInput;

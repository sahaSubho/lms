"use client";

import React, { useState } from "react";
import Image from "next/image";
import chessboardBgLeft from "@/assets/explore/selected-chessboard-bg-left.svg";
import chessboardBgRight from "@/assets/explore/selected-chessboard-bg-right.svg";

interface Tab {
  name: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  active?: number;
}

const CCTabs: React.FC<TabsProps> = ({ tabs, active = 1 }) => {
  const [activeTab, setActiveTab] = useState<number>(active); // Manage active tab here

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="w-full">
      <div className="flex justify-center items-center w-full">
        <div className="flex justify-evenly border-2 border-solid border-custom-border w-11/12 rounded-lg bg-white">
          {tabs?.map((tab, index) => (
            <button
              key={index}
              style={{ flexBasis: `${100 / tabs.length}%` }}
              onClick={() => handleTabClick(index)}
              className={`flex justify-between items-center text-gray-600 focus:outline-none ${
                activeTab === index
                  ? "bg-brand-orange text-white"
                  : "hover:text-brand-orange"
              } 
              ${index === 0 ? "rounded-tl-lg rounded-bl-lg" : ""} 
              ${index !== 0 ? "border-l-2 border-solid" : ""} 
              ${
                index === tabs.length - 1 ? "rounded-tr-lg rounded-br-lg " : ""
              }`}
            >
              <div className="flex-[0.2] ">
                <Image
                  alt="icon"
                  src={chessboardBgLeft}
                  width={65}
                  height={65}
                />
              </div>
              <div className="flex flex-[0.6] justify-center items-center ">
                <span className="mr-2">{tab.icon}</span>
                <span>{tab.name}</span>
              </div>
              <div className="flex-[0.2] flex justify-end">
                <Image
                  alt="icon"
                  src={chessboardBgRight}
                  width={65}
                  height={65}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Render the active tab's content */}
      <div className="w-11/12 m-auto mt-8">{tabs?.[activeTab]?.content}</div>
    </div>
  );
};

export default CCTabs;

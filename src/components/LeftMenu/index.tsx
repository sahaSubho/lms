"use client"; // Mark the file as a client component

import React, { useState } from "react";
import { usePathname } from "next/navigation"; // Use usePathname instead of useRouter
import { FiHome, FiSettings } from "react-icons/fi"; // Example icons from react-icons
import Link from "next/link";
import CCText from "@/atom/CCText";
import Spacer from "@/atom/Spacer";

function LeftMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get the current route

  // Guard to ensure pathname is available
  if (!pathname) {
    return null; // Or a loading spinner can be placed here if needed
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    {
      name: "",
      path: "/",
      icon: (color = "white") => <FiHome size={24} color={color} />,
    },
    {
      name: "",
      path: "/explore",
      icon: (color = "white") => <FiSettings size={24} color={color} />,
    },
    // Add more menu items as needed
  ];

  return (
    <>
      {/* <button
        className="fixed top-4 left-4 z-50 block lg:hidden"
        onClick={toggleMenu}
      >
        <FiMenu size={24} />
      </button> */}

      <div className=" lg:flex flex-col w-30 h-full p-3.5 bg-brand-darkBrown text-white fixed">
        <Spacer spacing={20} />
        {menuItems?.map((item) => (
          <Link href={item.path} key={item.name}>
            <div
              className={`flex flex-col justify-center items-center ${
                item.name && "space-x-2 gap-2"
              } mb-4 p-2 rounded-md cursor-pointer ${
                pathname === item.path
                  ? //   ? "bg-grey text-white"
                    ""
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {item?.icon?.(pathname === item.path ? "#FACF47" : "white")}
              {item?.name && (
                <CCText className="text-xs text-white">{item?.name}</CCText>
              )}
            </div>
          </Link>
        ))}
      </div>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-gray-900 bg-opacity-90 z-50">
          <div className="flex flex-col w-64 h-full p-4 text-white">
            {/* Close button */}
            <button className="self-end text-white mb-8" onClick={toggleMenu}>
              Close
            </button>
            {menuItems.map((item) => (
              <Link href={item.path} key={item.name}>
                <div
                  className={`flex items-center space-x-2 mb-4 p-2 rounded-md cursor-pointer ${
                    pathname === item.path
                      ? "bg-blue-500 text-white"
                      : "text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
                  onClick={toggleMenu} // Close modal when navigating
                >
                  {item?.icon?.(pathname === item.path ? "#FACF47" : "white")}
                  {item?.name && (
                    <CCText className="text-xs text-white">{item?.name}</CCText>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default LeftMenu;

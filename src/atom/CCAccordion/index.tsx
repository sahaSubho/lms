// components/CCAccordion.tsx
import React, { useState } from "react";
// import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import CCText from "../CCText";
import CCDivider from "../CCDivider";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

type CCAccordionSection = {
  heading: string;
  options?: { label: string; value: string }[];
  content?: string | JSX.Element | JSX.Element[];
};

type CCAccordionProps = {
  sections: CCAccordionSection[];
};

const CCAccordion: React.FC<CCAccordionProps> = ({ sections }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleCCAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-5">
      {sections?.map((section, index) => (
        <>
          <div key={index} className="overflow-hidden ">
            {/* CCAccordion Header */}
            <div
              className="flex  px-9 justify-between items-center"
              onClick={() => toggleCCAccordion(index)}
            >
              <CCText className="font-medium text-lg cursor-pointer">
                {section?.heading}
              </CCText>
              {openIndex === index ? (
                <FaAngleUp
                  size={18}
                  className="font-medium text-xl text-textColor-default"
                />
              ) : (
                <FaAngleDown
                  size={18}
                  className="font-medium text-xl text-textColor-default"
                />
              )}
            </div>

            {/* CCAccordion Content */}
            <div
              className={`transition-all duration-300 ${
                openIndex === index
                  ? "max-h-screen opacity-100"
                  : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <div className="py-4 px-9">
                {section?.content}
                {section?.options?.map((option) => (
                  <div key={option.value} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={option.value}
                      value={option.value}
                      className="mr-2 w-4 h-4  text-textColor-default accent-brand-yellow"
                    />
                    <CCText
                      className="text-textColor-default"
                      //@ts-ignore
                      htmlFor={option.value}
                    >
                      {option.label}
                    </CCText>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <CCDivider />
        </>
      ))}
    </div>
  );
};

export default CCAccordion;

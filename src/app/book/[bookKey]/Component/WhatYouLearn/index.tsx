import CCCard from "@/atom/CCCard";
import CCText from "@/atom/CCText";
import Spacer from "@/atom/Spacer";
import DynamicIcon from "@/utils/DynamicIcon";
import React from "react";
import { LiaBookMedicalSolid } from "react-icons/lia";
import { BookDetails } from "../../types";
import Image from "next/image";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FaCheck } from "react-icons/fa6";
import CCExpandableCard from "@/atom/CCExpandableCard";

function WhatYouLearn({ bookDetails }: { bookDetails: BookDetails }) {
  return (
    <CCExpandableCard maxHeight={250} className="p-8 flex-col">
      <div className="flex justify-start items-center gap-4">
        <div className="p-2 flex justify-center items-center rounded-full bg-brand-blue">
          <HiOutlineLightBulb className="text-white" size={26} />
        </div>
        <CCText className="font-medium text-xl">What you'll learn</CCText>
      </div>
      <Spacer spacing={20} />

      <div className="grid grid-cols-2 gap-2">
        {bookDetails?.WhatYouLearn?.map((learnDetail, index) => {
          return (
            <div key={index} className="p-2 flex items-start gap-2">
              <div className="p-2 flex justify-center items-center rounded-full bg-brand-aqua-lighter">
                <FaCheck className="text-brand-aqua" size={18} />
              </div>
              <CCText className="text-base text-textColor-lightBrown">
                {learnDetail}
              </CCText>
            </div>
          );
        })}
      </div>
    </CCExpandableCard>
  );
}

export default WhatYouLearn;

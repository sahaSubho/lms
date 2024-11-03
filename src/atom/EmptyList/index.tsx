import React from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineLightBulb } from "react-icons/hi";
import CCButton from "../CCButton";
import CCCard from "../CCCard";
import CCText from "../CCText";
import Spacer from "../Spacer";
import No_course_found from "@/assets/explore/no_course_found.svg";
import Image from "next/image";

function EmptyList() {
  return (
    <CCCard>
      <div className="w-9/12 gap-10 m-auto mt-10 mb-10 flex justify-center items-center">
        <div className="w-4/12">
          <Image
            src={No_course_found}
            layout="responsive"
            alt="no course icon"
          />
        </div>
        <div>
          <CCText className="text-base font-medium">No course found</CCText>
          <Spacer spacing={10} />
          <CCText className="text-sm text-textColor-grey">
            Click the recommended CTA to view your personalised learning path,
            or explore courses by clicking the Explore Courses CTA
          </CCText>
          <Spacer spacing={32} />
          <div className="flex flex-start gap-4">
            <CCButton
              className="flex justify-center items-center gap-2 font-medium"
              buttonType="grey"
            >
              <>
                <FiSearch size={18} />
                Explore Courses
              </>
            </CCButton>
            <CCButton className="flex justify-center items-center gap-2 font-medium">
              <>
                <HiOutlineLightBulb size={20} />
                Recommended
              </>
            </CCButton>
          </div>
        </div>
      </div>
    </CCCard>
  );
}

export default EmptyList;

import CCCard from "@/atom/CCCard";
import CCText from "@/atom/CCText";
import Spacer from "@/atom/Spacer";
import DynamicIcon from "@/utils/DynamicIcon";
import React from "react";
import { LiaBookMedicalSolid } from "react-icons/lia";
import { BookDetails } from "../../types";
import Image from "next/image";

function CourseIncludes({ bookDetails }: { bookDetails: BookDetails }) {
  return (
    <CCCard className="p-8 flex-col ">
      <div className="flex justify-start items-center gap-4">
        <div className="p-2 flex justify-center items-center rounded-full bg-brand-orange">
          <LiaBookMedicalSolid className="text-white" size={26} />
        </div>
        <CCText className="font-medium text-xl">This course includes</CCText>
      </div>
      <Spacer spacing={20} />

      {/* Render the course includes with icons */}
      <div className="grid grid-cols-2 gap-2">
        {bookDetails?.course_include?.map((course) => {
          // Check if the icon is a string (for react-icons) or an imported SVG
          const IconElement = !course?.icon?.includes("https") ? (
            <DynamicIcon
              icon={course?.icon}
              // color="currentColor"
              size="22px"
              className="text-textColor-default"
              fallback={<div>...</div>}
            />
          ) : (
            <Image
              src={course?.icon || ""}
              alt={course?.description || ""}
              width={22}
              height={22}
              className="text-textColor-default"
            />
          );

          return (
            <div key={course?.id} className="p-2 flex items-center gap-2">
              {IconElement}
              <CCText>{course?.description}</CCText>
            </div>
          );
        })}
      </div>
    </CCCard>
  );
}

export default CourseIncludes;

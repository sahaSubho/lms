import CCText from "@/atom/CCText";
import Spacer from "@/atom/Spacer";
import React, { useMemo } from "react";
import { BookDetails } from "../../types";
import Image from "next/image";
import { FiStar } from "react-icons/fi";
import CCRatingStars from "@/atom/CCRatingStars";
import CCDivider from "@/atom/CCDivider";
import { getInitials, getRelativeTime } from "@/utils/commonUtils";
import CCExpandableCard from "@/atom/CCExpandableCard";

function CourseRating({ bookDetails }: { bookDetails: BookDetails }) {
  const courseRating = useMemo(
    () => bookDetails?.CourseRating,
    [bookDetails?.CourseRating]
  );
  return (
    <CCExpandableCard maxHeight={300} className="p-8 flex-col ">
      <div className="flex justify-start items-center gap-4">
        <div className="p-2 flex justify-center items-center rounded-full bg-brand-purple">
          <FiStar className="text-white" size={24} />
        </div>
        <CCText className="font-medium text-xl">
          <>Course rating&nbsp;({courseRating?.avgRating})</>
        </CCText>
      </div>
      <Spacer spacing={20} />
      <>
        {courseRating?.allRating?.map((i) => (
          <>
            <div className="flex-col justify-start items-start">
              <div className="flex justify-start items-center gap-2">
                <div>
                  {i?.img ? (
                    <Image
                      src={i?.img}
                      alt="display pic"
                      width={48}
                      height={48}
                      className="w-10 h-10 rounded-full"
                      // style={{ borderRadius: "50%" }} // Enforces the circular shape
                    />
                  ) : (
                    <div className="w-10 h-10 flex justify-center items-center rounded-full bg-grey">
                      <CCText className="text-white">
                        {getInitials(i?.name)}
                      </CCText>
                    </div>
                  )}
                </div>
                <div className="flex-col justify-between items-start">
                  <CCText className="text-textColor-lightBrown">
                    {i?.name}
                  </CCText>
                  <div className="flex justify-start items-center gap-2">
                    <CCRatingStars
                      starSize={15}
                      className="m-0"
                      rating={i?.rating}
                    />
                    <CCText className="text-xs">
                      {getRelativeTime(i?.createdAt)}
                    </CCText>
                  </div>
                </div>
              </div>
              <CCText className="text-base font-medium mt-4 mb-4">
                {i?.reviewMessage}
              </CCText>
            </div>
            <CCDivider />
            <Spacer spacing={24} />
          </>
        ))}
      </>
      {/* Render the course includes with icons */}
      <div className="grid grid-cols-2 gap-2">
        {/* {bookDetails?.CourseRating?.map((course) => {
          // Check if the icon is a string (for react-icons) or an imported SVG
          const IconElement =
            typeof course?.icon === "string" ? (
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
        })} */}
      </div>
    </CCExpandableCard>
  );
}

export default CourseRating;

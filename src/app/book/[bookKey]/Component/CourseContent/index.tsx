import CCText from "@/atom/CCText";
import Spacer from "@/atom/Spacer";
import React, { useMemo, useState } from "react";
import { BookDetails, chapterDetails } from "../../types";
import CCExpandableCard from "@/atom/CCExpandableCard";
import { TbNotes } from "react-icons/tb";
import CCChipList, { chipItem } from "@/atom/CCChipList";
import { FiBook } from "react-icons/fi";
import CCDivider from "@/atom/CCDivider";
import CCCard from "@/atom/CCCard";
import { formatSecondsToTime } from "@/utils/commonUtils";

type SelectedDayType = chipItem & {
  chapters: chapterDetails[];
};

function CourseContent({ bookDetails }: { bookDetails: BookDetails }) {
  const [selectedDay, setSelectedDay] = useState<SelectedDayType | null>(null);

  const courseContent = useMemo(
    () => bookDetails?.CourseContent,
    [bookDetails]
  );

  const courseDays = useMemo(() => {
    const refactoredDays = bookDetails?.CourseContent?.map((i) => ({
      id: i?.id,
      name: `Day ${i?.day}`,
      key: i?.day,
      chapters: i.chapters,
    }));
    setSelectedDay(refactoredDays?.[0] || null);
    return refactoredDays;
  }, [bookDetails?.CourseContent]);

  return (
    <CCCard className="p-8 flex-col ">
      <div className="flex justify-start items-center gap-4">
        <div className="p-2 flex justify-center items-center rounded-full bg-brand-aqua">
          <TbNotes className="text-white" size={26} />
        </div>
        <CCText className="font-medium text-xl">Course content</CCText>
      </div>
      <Spacer spacing={20} />
      <div className="flex justify-start items-center">
        {/* @ts-ignore */}
        <CCChipList items={courseDays} onChange={(e) => setSelectedDay(e)} />
      </div>
      <>
        {selectedDay?.chapters?.map((i) => (
          <>
            <Spacer spacing={20} />
            <div className="flex justify-between items-start gap-5">
              <div className="flex-[0.9] flex justify-start items-start gap-5">
                <FiBook className="text-textColor-default mt-1" size={20} />
                <div className=" flex-col justify-start items-start">
                  <CCText className="text-base">{`${i?.id}. Chapter ${i?.id} - ${i?.title}`}</CCText>
                  <CCText className="flex text-textColor-lightBrown">
                    <CCText className="text-base text-white">
                      {`${i?.id}.`}&nbsp;
                    </CCText>
                    {i?.subTitle}
                  </CCText>
                </div>
              </div>
              <div className="flex-[0.1]">
                <CCText>{formatSecondsToTime(i?.time)}</CCText>
              </div>
            </div>
            <Spacer spacing={20} />
            <CCDivider />
          </>
        ))}
      </>
      {/* <div className="grid grid-cols-2 gap-2">
        {bookDetails?.CourseContent?.map((learnDetail, index) => {
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
      </div> */}
    </CCCard>
  );
}

export default CourseContent;

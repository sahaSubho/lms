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
import { RiQuestionnaireLine } from "react-icons/ri";
import CCAccordion from "@/atom/CCAccordion";

type SelectedDayType = chipItem & {
  chapters: chapterDetails[];
};

function FAQContent({ bookDetails }: { bookDetails: BookDetails }) {
  const FAQContent = useMemo(
    () =>
      bookDetails?.FAQContent?.map((i) => ({
        id: i?.id,
        heading: i?.question,
        content: (
          <CCText className="text-base text-textColor-lightBrown">
            {i?.answer}
          </CCText>
        ),
      })),
    [bookDetails]
  );

  return (
    <CCCard className="p-8 flex-col ">
      <div className="flex justify-start items-center gap-4">
        <div className="p-2 flex justify-center items-center rounded-full bg-brand-purple">
          <RiQuestionnaireLine className="text-white" size={26} />
        </div>
        <CCText className="font-medium text-xl">FAQ's</CCText>
      </div>
      <Spacer spacing={20} />

      <CCAccordion sections={FAQContent} />
    </CCCard>
  );
}

export default FAQContent;

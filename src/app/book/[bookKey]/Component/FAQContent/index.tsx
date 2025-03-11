import CCText from "@/atom/CCText";
import Spacer from "@/atom/Spacer";
import React, { useMemo, useState } from "react";
import { BookDetails, chapterDetails } from "../../types";
import CCCard from "@/atom/CCCard";
import { RiQuestionnaireLine } from "react-icons/ri";
import CCAccordion from "@/atom/CCAccordion";

function FAQContent({ bookDetails }: { bookDetails?: BookDetails }) {
  const FAQContent = useMemo(
    () =>
      [1, 2]?.map((i) => ({
        id: i,
        heading: "How to earn more points",
        content: (
          <CCText className="text-base text-textColor-lightBrown">
            Earn points by solving the board and questions
          </CCText>
        ),
      })),
    []
  );

  return (
    <CCCard className="p-8 flex-col h-full">
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

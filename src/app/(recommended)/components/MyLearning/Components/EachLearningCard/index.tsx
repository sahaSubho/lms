import CCButton from "@/atom/CCButton";
import CCCard from "@/atom/CCCard";
import CCCoin from "@/atom/CCCoin";
import CCProgressBar from "@/atom/CCProgressBar";
import CCText from "@/atom/CCText";
import Spacer from "@/atom/Spacer";
import React from "react";

type EachLearningCardProp = {
  completedPercentage: number;
  title: string;
  chapterNumber: number;
  subTitle: string;
  points: number;
  bookImg?: string | JSX.Element;
};

function EachLearningCard(props: EachLearningCardProp) {
  const {
    completedPercentage = 0,
    title,
    chapterNumber,
    subTitle,
    points,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    bookImg,
  } = props;
  return (
    <div>
      <CCCard className="gap-5 h-28">
        <div className="flex-[0.1] flex justify-center items-center bg-gradient-to-b from-white to-brand-lightYellow">
          <CCText>img</CCText>
        </div>
        <div className="flex-[0.9] flex justify-between items-center">
          <div className="flex-col justify-center items-center flex-[0.5]">
            <CCText className="text-base font-medium">{title}</CCText>
            <Spacer spacing={6} />
            <div className="flex justify-start items-center">
              <div className="rounded-full bg-brand-background px-[10px] py-[4px]">
                <CCText className="text-[12px] font-bold">
                  Chapter {`${chapterNumber}`}
                </CCText>
              </div>
              <Spacer spacing={8} horizontal />
              <CCText className="flex justify-start items-center">
                <>
                  {subTitle} (&nbsp;
                  <CCCoin />
                  &nbsp;{points} pts )
                </>
              </CCText>
            </div>
          </div>
          <div className="flex-[0.3] flex flex-col justify-end items-end w-3/12">
            <CCProgressBar percentage={completedPercentage} />
            <Spacer spacing={6} />
            <CCText>{`${completedPercentage}`}% complete</CCText>
          </div>
          <div className="flex-[0.2] flex justify-center">
            <CCButton>Resume</CCButton>
          </div>
        </div>
      </CCCard>
    </div>
  );
}

export default EachLearningCard;

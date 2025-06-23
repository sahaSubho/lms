/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CCButton from "@/atom/CCButton";
import CCCard from "@/atom/CCCard";
import CCCoin from "@/atom/CCCoin";
import CCProgressBar from "@/atom/CCProgressBar";
import CCText from "@/atom/CCText";
import Spacer from "@/atom/Spacer";
import { getRandomBookUrl } from "@/utils/commonUtils";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

type Chapter = {
  id: number;
  points: number;
  title: string;
  time_required: number;
  pages: {
    heading: string;
    text: string;
    content: string;
    content_type: string;
    position_order: number;
  }[];
  practice_tests: {
    question: string;
    solution: string;
    position_order: number;
  }[];
};

type EachLearningCardProp = {
  completedPercentage: number;
  title: string;
  chapterNumber: number;
  chapterId?: number;
  subTitle: string;
  points: number;
  bookImg?: string | JSX.Element;
  learningKey?: string;
  courseKey?: string;
  chapters?: Chapter[];
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
    // learningKey,
    courseKey,
    chapterId,
    chapters,
  } = props;
  const router = useRouter();

  const handleResume = () => {
    if (chapterId) {
      router.push(`/learning/${courseKey}?chapter=${chapterId}`);
    } else {
      router.push(`/learning/${courseKey}`);
    }
  };
  const randomBookUrl = getRandomBookUrl();

  return (
    <div>
      <CCCard className="gap-5 h-28">
        <div className="flex-[0.1] flex justify-center items-center bg-gradient-to-b from-white to-brand-lightYellow">
          <div className="w-full m-auto">
            <Image
              src={randomBookUrl} // Dynamic image URL
              alt="Random Book Cover"
              // className="w-full"
              layout="responsive"
              width={50} // Set the desired width
              height={60} // Set the desired height
              priority // Optional: ensures the image loads quickly
            />
          </div>
        </div>
        <div className="flex-[0.9] flex justify-between items-center">
          <div className="flex-col justify-center items-center flex-[0.5]">
            <CCText className="text-base font-medium">{title}</CCText>
            <Spacer spacing={6} />
            <div className="flex justify-start items-center">
              <div className="flex justify-center rounded-full w-32 bg-brand-background px-[10px] py-[4px]">
                <CCText className="text-[12px] font-bold">
                  Chapter {`${chapterNumber}`}
                </CCText>
              </div>
              <Spacer spacing={8} horizontal />
              <CCText>
                {subTitle}&nbsp;
                <CCText className="inline-flex justify-start items-center">
                  (&nbsp;
                  <CCCoin />
                  &nbsp;
                  {(
                    points ||
                    chapters?.find((c) => c?.id === chapterId)?.points ||
                    0
                  ).toString()}{" "}
                  pts )
                </CCText>
              </CCText>
            </div>
          </div>
          <div className="flex-[0.3] flex flex-col justify-end items-end w-3/12">
            <CCProgressBar percentage={completedPercentage} />
            <Spacer spacing={6} />
            <CCText>{`${completedPercentage?.toFixed(0)}`}% complete</CCText>
          </div>
          <div className="flex-[0.2] flex justify-center">
            <CCButton onClick={handleResume}>
              {Number(completedPercentage?.toFixed(0)) === 100
                ? "Revise"
                : Number(completedPercentage?.toFixed(0)) > 0
                ? "Resume"
                : "Start"}
            </CCButton>
          </div>
        </div>
      </CCCard>
    </div>
  );
}

export default EachLearningCard;

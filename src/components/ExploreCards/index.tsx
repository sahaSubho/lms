import React from "react";
import Image from "next/image";
import LearningStrategy from "@/assets/explore/Learning-Strategy.svg";
import CCText from "@/atom/CCText";
import { FiBook } from "react-icons/fi";
import { LuPuzzle } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";
import { GrChapterAdd } from "react-icons/gr";
import Spacer from "@/atom/Spacer";
import { CiVideoOn } from "react-icons/ci";
import { badge } from "./helper";
import CCButton from "@/atom/CCButton";
import PercentageBox from "@/atom/PercentageBox";

type badges = "lifetime-access" | "verified-circlechess";
type ExploreCardsProps = {
  id: number;
  image?: string;
  title: string;
  description?: string | string[] | JSX.Element | JSX.Element[];
  booksCount?: number;
  puzzlesCount?: number;
  studentsCount?: number;
  videosCount?: number;
  chaptersCount?: number;
  badges?: badges[];
  price: number;
  percentageDetails: { from: number; to: number };
};

export const CCText12px = ({ children }: { children: string }) => {
  return (
    <CCText className="text-sm text-textColor-lightBrown">
      &nbsp;&nbsp;{children}
    </CCText>
  );
};

function ExploreCards(props: ExploreCardsProps) {
  const {
    // id,
    // image,
    title,
    booksCount,
    puzzlesCount,
    studentsCount,
    videosCount,
    chaptersCount,
    badges,
    price,
    // percentageDetails,
  } = props;
  return (
    <div className="flex justify-between  shadow-default bg-white mt-8 mb-4 rounded-lg w-full h-1/4">
      <div className="flex-[0.2] h-1/4 m-2">
        <Image
          src={LearningStrategy}
          alt="strategy"
          layout="intrinsic" // This ensures the image keeps its aspect ratio and resizes accordingly
          objectFit="contain" // Keeps the image within its container while maintaining aspect ratio
          className="rounded-lg"
        />
      </div>
      <div className="flex-[0.6] flex pt-8 flex-col items-start">
        <CCText className="text-lg font-medium">{title}</CCText>
        <Spacer spacing={14} />
        <div className="flex items-center justify-start">
          <FiBook size={16} className="text-textColor-default" />
          <CCText12px>{`${booksCount} Books`}</CCText12px>
          <Spacer spacing={12} horizontal />
          <LuPuzzle size={16} className="text-textColor-default" />
          <CCText12px>{`${puzzlesCount} Puzzles`}</CCText12px>
          <Spacer spacing={12} horizontal />
          <IoPersonOutline size={16} className="text-textColor-default" />
          <CCText12px>{`${studentsCount} Students`}</CCText12px>
          <Spacer spacing={12} horizontal />
          <CiVideoOn size={16} className="text-textColor-default" />
          <CCText12px>{`${videosCount} Videos`}</CCText12px>
          <Spacer spacing={12} horizontal />
        </div>
        <Spacer spacing={8} />
        <div className="flex items-center justify-start">
          <GrChapterAdd size={16} className="text-textColor-default" />
          <CCText12px>{`${chaptersCount} Chapters`}</CCText12px>
          <Spacer spacing={12} horizontal />
        </div>
        <Spacer spacing={28} />

        <div className="flex items-center justify-start">
          {badges?.map((i, index) => (
            <Image
              key={index}
              alt={i}
              src={badge?.[i]}
              width={56}
              height={56}
              className="mr-5"
            />
          ))}
          <CCButton>
            <CCText>Enroll Now ({`${price}`})</CCText>
          </CCButton>
        </div>
      </div>
      <div className="flex-[0.2] flex flex-col items-center justify-end">
        <PercentageBox from={5.9} to={26} />
      </div>
    </div>
  );
}

export default ExploreCards;

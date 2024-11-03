import React from "react";
import Image from "next/image";
import LearningStrategy from "@/assets/explore/Learning-Strategy.svg";
import CCText from "@/atom/CCText";
import { FiBook } from "react-icons/fi";
import { LuPuzzle } from "react-icons/lu";
import { GrChapterAdd } from "react-icons/gr";
import { BiVideo } from "react-icons/bi";
import Spacer from "@/atom/Spacer";
import { badge } from "./helper";
import CCButton from "@/atom/CCButton";
import PercentageBox from "@/atom/PercentageBox";
import { MdOutlinePerson } from "react-icons/md";
import CCCard from "@/atom/CCCard";
import { formatCurrency } from "@/utils/commonUtils";

export type badges = "lifetime-access" | "verified-circlechess";
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
  price?: number;
  percentageDetails: { from: number; to: number };
};

export const CCText12px = ({ children }: { children: string }) => {
  return (
    <CCText className="text-sm text-textColor-lightBrown">
      &nbsp;&nbsp;{children}
    </CCText>
  );
};

export const Badges = ({ badges }: { badges: badges[] | undefined }) => {
  return (
    <div className="flex justify-start items-center">
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
    </div>
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
    percentageDetails,
  } = props;
  return (
    <CCCard>
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
          <MdOutlinePerson size={16} className="text-textColor-default" />
          <CCText12px>{`${studentsCount} Students`}</CCText12px>
          <Spacer spacing={12} horizontal />
          <BiVideo size={16} className="text-textColor-default" />
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
          <Badges badges={badges} />
          <CCButton>
            <CCText>
              <>
                Enroll Now <b>({formatCurrency(price)})</b>
              </>
            </CCText>
          </CCButton>
        </div>
      </div>
      <div className="flex-[0.2] flex flex-col items-center justify-end">
        <PercentageBox
          from={percentageDetails?.from}
          to={percentageDetails?.to}
        />
      </div>
    </CCCard>
  );
}

export default ExploreCards;

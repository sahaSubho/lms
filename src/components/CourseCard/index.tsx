import CCText from "@/atom/CCText";
import Spacer from "@/atom/Spacer";
import React from "react";
import { FaStar } from "react-icons/fa";
import { LuBookCopy } from "react-icons/lu";
import { FiClock } from "react-icons/fi";
import CCDivider from "@/atom/CCDivider";
import CCButton from "@/atom/CCButton";
import { badges, Badges } from "../ExploreCards";
import { formatCurrency } from "@/utils/commonUtils";

type CourseCardProp = {
  title: string;
  courseKey?: string;
  author: string;
  chapters?: number;
  timeLength?: string;
  price: number;
  mrp: number;
  onClick?: (a: unknown) => void;
  rating?: number;
  badges?: badges[];
  cardClassName?: string;
};

const Rating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex justify-center items-center gap-1 bg-brand-darkYellow w-fit rounded m-4 py-[6px] px-[10px]">
      <FaStar className="text-brand-yellow" size={12} />
      <CCText className="text-xs text-white">{`${rating}`}</CCText>
    </div>
  );
};

const NewTag = () => {
  return (
    <div className="flex justify-center items-center gap-1 bg-brand-orange w-fit rounded m-4 py-[6px] px-[10px]">
      <CCText className="text-xs text-white">New</CCText>
    </div>
  );
};

function CourseCard(props: CourseCardProp) {
  const {
    courseKey,
    title = "",
    author = "",
    chapters,
    timeLength = "",
    price = 0,
    mrp = 0,
    onClick = () => {},
    rating = 5,
    badges,
    cardClassName,
  } = props;
  return (
    <div
      className={`flex flex-col rounded-lg border border-grey w-80 h-[500px] my-5 ${
        cardClassName && cardClassName
      }`}
    >
      <div
        className="cursor-pointer relative flex-[0.4] rounded-t-lg border-b bg-gradient-to-b from-white to-brand-lightYellow"
        onClick={() => onClick(courseKey)}
      >
        <div className="absolute top-0 left-0">
          <Rating rating={3.5} />
        </div>
        <div className="absolute top-0 right-0  ">
          <NewTag />
        </div>
      </div>
      <div className="flex-[0.45]">
        <div className=" px-5 py-6">
          <CCText className="text-opacity-80 font-medium">{author}</CCText>
          <CCText className="text-base font-medium" lines={2}>
            {title}
          </CCText>
          <Spacer spacing={16} />
          <div className="flex justify-start items-center gap-2">
            {chapters && (
              <div className="flex justify-start items-center gap-1">
                <LuBookCopy className="text-textColor-default" size={14} />
                <CCText className="text-sm text-opacity-80 font-medium">
                  {`${chapters}`} Chapters
                </CCText>
              </div>
            )}
            {timeLength && (
              <div className="flex justify-start items-center gap-1">
                <FiClock className="text-textColor-default" size={14} />
                <CCText className="text-sm text-opacity-80 font-medium">
                  {`${timeLength}`}
                </CCText>
              </div>
            )}
          </div>
          {badges && badges?.length > 0 && (
            <>
              <Spacer spacing={10} />
              <Badges badges={badges} />
            </>
          )}
        </div>
      </div>
      <div className="flex-[0.15] border-b">
        <CCDivider />
        <div className="p-5 flex justify-between items-center">
          <div className="flex flex-col justify-center items-start">
            <CCText className="font-medium text-base">
              {formatCurrency(price)}
            </CCText>
            <CCText className="font-medium text-opacity-80 text-base text-textColor-grey line-through">
              <>MRP: {formatCurrency(mrp)}</>
            </CCText>
          </div>
          <CCButton>Buy Now</CCButton>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;

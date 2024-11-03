import CCChipList from "@/atom/CCChipList";
import React from "react";
import CCText from "@/atom/CCText";
import ExploreCards from "@/components/ExploreCards";
import { filterItems, learningCourses } from "./helper";
import CCCard from "@/atom/CCCard";
import Image from "next/image";
import BookSearch from "@/assets/explore/search-book.svg";
import Spacer from "@/atom/Spacer";
import CCButton from "@/atom/CCButton";

async function RecommendedSection() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <CCText className="text-lg">Recommended learning path</CCText>
          <CCText className="text-textColor-lightBrown text-xs">
            Personalized learning path based on your game assessment
          </CCText>
        </div>
        <CCChipList items={filterItems} />
      </div>
      <div className="flex justify-between gap-4 items-start">
        <div className="flex-[0.8] flex-wrap">
          {learningCourses?.map((i) => (
            // eslint-disable-next-line react/jsx-key
            <ExploreCards {...i} />
          ))}
        </div>
        <div className=" flex-[0.2]">
          <CCCard className="w-full flex-col justify-center items-center">
            <div className="w-4/5 h-1/2 mt-4">
              <Image
                alt="search-book"
                src={BookSearch}
                width={50}
                height={50}
                layout="responsive"
              />
              <Spacer spacing={8} />
              <CCText
                style={{ width: "83%" }}
                className=" m-auto font-medium text-center text-sm"
              >
                Explore 350+ chess books, crafted for every skill level
              </CCText>
              <Spacer spacing={24} />
              <CCButton className="w-full">Explore now</CCButton>
              <Spacer spacing={24} />
            </div>
          </CCCard>
        </div>
      </div>
    </div>
  );
}

export default RecommendedSection;

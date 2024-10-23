import CCChipList from "@/atom/CCChipList";
import React from "react";
import CCText from "@/atom/CCText";
import ExploreCards from "@/components/ExploreCards";
import { filterItems, learningCourses } from "./helper";

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
      <div className="flex justify-between items-center">
        <div className="flex-[0.8]">
          {learningCourses?.map((i) => (
            <ExploreCards {...i} />
          ))}
        </div>
        <div className=""></div>
      </div>
    </div>
  );
}

export default RecommendedSection;

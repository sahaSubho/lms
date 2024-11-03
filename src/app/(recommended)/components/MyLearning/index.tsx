import CCText from "@/atom/CCText";
import React, { useMemo } from "react";
import EmptyList from "@/atom/EmptyList";
import EachLearningCard from "./Components/EachLearningCard";
import { myLearningData } from "./helper";

function MyLearning() {
  const isListEmpty = useMemo(
    () => myLearningData?.length === 0,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [myLearningData]
  );
  return (
    <div>
      <CCText className="text-lg font-medium">My Learnings</CCText>
      {isListEmpty ? (
        <EmptyList />
      ) : (
        <>
          {myLearningData?.map((i, index) => (
            <div key={index}>
              <EachLearningCard {...i} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default MyLearning;

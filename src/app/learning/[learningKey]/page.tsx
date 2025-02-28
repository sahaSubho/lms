/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import React, { useEffect, useState, useRef } from "react";
import LeftComponent from "./Component/LeftComponent";
import RightComponent from "./Component/RightComponent";
import { useParams } from "next/navigation";
import {
  GetUserCourseLearning,
  RegisteredCourseDetails,
} from "@/APIHooks/GetUserCourseLearning/GetUserCourseLearning";
import { useUpdateUserProgress } from "@/APIHooks/UpdateUserProgress/useUpdateUserProgress";
import LearnPageLoader from "./loading";
import useChessStore from "@/store/chessStore";
import { applyMoveAndGetNewFEN } from "@/utils/commonUtils";

export type Page = {
  id: number;
  heading: string;
  text: string;
  content: string;
  content_type: "chess_position" | "video" | "img";
  position_order: number;
  is_solved: boolean;
  chapterId?: string | number;
  pageId?: string | number;
  mcq: {
    question: string;
    options: string[];
    answer: string;
  };
};

// type Chapter = {
//   id: number;
//   title: string;
//   time_required: number;
//   pages: Page[];
//   practice_tests?: {
//     question: string;
//     solution: string;
//     position_order: number;
//     is_solved: boolean;
//   }[];
// };

// // @ts-ignore
// type LearningDataType = {
//   title: string;
//   author: string;
//   price: number;
//   mrp: number;
//   rating: number;
//   badges: string[];
//   points: number;
//   chapters: Chapter[];
// };

function LearningPage() {
  const { learningKey } = useParams();
  const chessFen = useChessStore((state) => state.fen);
  const updateFen = useChessStore((state) => state.updateFen);

  const {
    data: learningData,
    isLoading,
    // error,
    // refetch,
    // @ts-ignore
  } = GetUserCourseLearning(learningKey);

  const {
    updateProgress,
    // error: progressError,
    success: progressUpdated,
  } = useUpdateUserProgress();
  const [learningDataFormatted, setLearningDataFormatted] =
    useState<RegisteredCourseDetails | null>(null);
  const [pageSelected, setPageSelected] = useState<Page | undefined>(undefined);

  // Initialize `pageSelected` only once, when `learningData` first loads
  const isInitialized = useRef(false);
  const pageIdProgressUpdate = useRef<null | number | string>(null);

  useEffect(() => {
    if (!isInitialized.current && learningData) {
      setLearningDataFormatted(learningData);
    }
  }, [learningData]);

  useEffect(() => {
    if (learningDataFormatted && !isInitialized.current) {
      // debugger;
      // @ts-ignore
      setPageSelected({
        ...learningDataFormatted?.chapters?.[0]?.pages?.[0],
        chapterId: learningDataFormatted?.chapters?.[0]?.id,
      });
      isInitialized.current = true; // Mark as initialized to prevent further resetting
    }
  }, [learningDataFormatted]);

  // Refetch data when progress is updated, but retain `pageSelected`
  useEffect(() => {
    if (progressUpdated) {
      // pageIdProgressUpdate.current;
      const pageIdToUpdate = pageIdProgressUpdate?.current;
      // @ts-ignore
      setLearningDataFormatted((prev) => {
        const tempChapters = prev?.chapters;
        let returnData = tempChapters?.reduce((last, curr) => {
          const tempPages = curr?.pages?.map((i) =>
            i?.id === pageIdToUpdate ? { ...i, is_solved: true } : i
          );
          // @ts-ignore
          last?.push({ ...curr, pages: tempPages });
          return last;
        }, []);

        // @ts-ignore
        returnData = { ...prev, chapters: returnData };
        return returnData;
      });

      // refetch();
    }
  }, [progressUpdated]);

  const handleMarkComplete = (
    contentType: string,
    pageId: number,
    move?: string
  ) => {
    // debugger;
    pageIdProgressUpdate.current = pageId;
    // return;
    if (contentType === "img") {
      updateProgress({ pageId, contentType });
    } else if (contentType === "video") {
      updateProgress({ pageId, contentType, videoWatched: true });
    } else if (contentType === "chess_position") {
      updateProgress({ pageId, contentType, move });
    }
  };

  // Mark as complete when `pageSelected` changes, only on actual selection
  useEffect(() => {
    if (pageSelected?.content_type === "img") {
      handleMarkComplete(pageSelected?.content_type, pageSelected?.id);
    }
  }, [pageSelected]);

  const handlePageChange = (selectPage: Page) => {
    setPageSelected(selectPage);
  };
  if (isLoading) {
    return <LearnPageLoader />;
  }

  const handleMove = (val: string) => {
    const newFen = applyMoveAndGetNewFEN(chessFen, val);
    updateFen(newFen);
  };
  return (
    <div
      className="flex justify-between items-start w-full"
      style={{ height: "91vh" }}
    >
      <div className="flex-[0.73] flex flex-col">
        <LeftComponent
          learningData={learningDataFormatted}
          onChange={handlePageChange}
          handleMarkComplete={handleMarkComplete}
          pageSelected={pageSelected}
        />
      </div>
      <div
        className="flex-[0.27] p-8 flex-shrink-0 overflow-auto"
        style={{ width: "30%" }}
      >
        {/* <CCText>{chessFen}</CCText> */}
        <RightComponent
          learningData={learningDataFormatted}
          pageSelected={pageSelected}
          onChange={handlePageChange}
          handleMove={handleMove}
          handleMarkComplete={handleMarkComplete}
        />
      </div>
    </div>
  );
}

export default LearningPage;

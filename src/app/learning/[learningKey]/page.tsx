/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import LeftComponent from "./Component/LeftComponent";
import RightComponent from "./Component/RightComponent";
import { useParams, useSearchParams } from "next/navigation";
import {
  GetUserCourseLearning,
  RegisteredCourseDetails,
} from "@/APIHooks/GetUserCourseLearning/GetUserCourseLearning";
import { useUpdateUserProgress } from "@/APIHooks/UpdateUserProgress/useUpdateUserProgress";
import LearnPageLoader from "./loading";
import useChessStore from "@/store/chessStore";
import { applyMoveAndGetNewFEN } from "@/utils/commonUtils";
import useUserStore from "@/store/userStore";
import { getS3Link } from "@/utils/getS3SignedUrl";
import Image from "next/image";
import bg from "@/assets/Components/complete_bg.png";
import book from "@/assets/Components/Book.png";
import rectangle from "@/assets/Components/Rectangle.png";
import rectangle_2 from "@/assets/Components/Rectangle_2.png";
import star_border from "@/assets/Components/Union.png";
import CCButton from "@/atom/CCButton";
import StarRating from "@/atom/StarRating";
import CCModal from "@/atom/CCModal";
import CCText from "@/atom/CCText";
import { useRouter } from "next/navigation";
import Coin from "@/assets/Components/Coin.png";

export type Page = {
  id: number;
  heading: string;
  text: string;
  content: string;
  content_type: "chess_position" | "video" | "img";
  position_order: number;
  points: number;
  is_solved: boolean;
  chapterId?: string | number;
  pageId?: string | number;
  mcq?: {
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
  const router = useRouter();
  const chessFen = useChessStore((state) => state.fen);
  const updateFen = useChessStore((state) => state.updateFen);

  const updateScore = useUserStore((state) => state.updateScore);

  const [showCompletePopup, setShowCompletePopup] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const chapter = searchParams.get("chapter");

  const [showCoin, setShowCoin] = useState(false);

  const collectCoin = async (pageSelected: Page) => {
    if (showCoin) return; // Prevent multiple coins at once

    setShowCoin(true);
    setTimeout(async () => {
      setShowCoin(false);
      updateScore(pageSelected.points);
      const res: { url?: string | undefined; error?: unknown | undefined } =
        await getS3Link("sounds/collect_coins.wav");
      if (res.url) {
        const collectCoinSound = new Audio(res.url);
        collectCoinSound.play();
      }
    }, 2000); // Match animation duration
  };

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
      let filterLearningData = learningData;
      if (Number(chapter) > 0) {
        const chapters = filterLearningData.chapters[Number(chapter) - 1];
        filterLearningData = {
          ...filterLearningData,
          chapters: [chapters],
        };
      }
      setLearningDataFormatted(filterLearningData);
    }
  }, [learningData, chapter]);

  useEffect(() => {
    if (learningDataFormatted && !isInitialized.current) {
      // debugger;
      // @ts-ignore
      const currentPage: Page =
        learningDataFormatted?.chapters?.[0]?.pages.find((p) => !p.is_solved) ||
        learningDataFormatted?.chapters?.[0]?.pages?.[0];
      setPageSelected({
        ...currentPage,
        chapterId: learningDataFormatted?.chapters?.[0]?.id,
        pageId: currentPage?.id,
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

  const handleMarkComplete = async (contentType: string, pageId: number) => {
    // debugger;
    pageIdProgressUpdate.current = pageId;
    // return;
    if (contentType === "img") {
      updateProgress({ pageId, contentType });
    } else if (contentType === "video") {
      updateProgress({ pageId, contentType, videoWatched: true });
    } else if (contentType === "chess_position") {
      updateProgress({ pageId, contentType });
    }
    const res: { url?: string | undefined; error?: unknown | undefined } =
      await getS3Link("sounds/page_complete.wav");
    if (res.url) {
      const pageCompleteSound = new Audio(res.url);
      pageCompleteSound.play();
    }
    if (!pageSelected?.is_solved && pageSelected) {
      if (pageSelected.points > 0) {
        await collectCoin(pageSelected);
      }
    }
    const pageNotSolved = learningDataFormatted?.chapters?.[0]?.pages.filter(
      (p) => !p.is_solved
    );
    if (pageNotSolved?.length === 1) {
      setShowCompletePopup(true);
    }
  };

  // Mark as complete when `pageSelected` changes, only on actual selection
  useEffect(() => {
    if (pageSelected?.content_type === "img" && !pageSelected.is_solved) {
      handleMarkComplete(pageSelected?.content_type, pageSelected?.id);
    }
  }, [pageSelected]);

  const handlePageChange = (selectPage: Page, type?: "prev" | "next") => {
    const pageId =
      type === "next"
        ? selectPage.id + 1
        : type === "prev"
        ? selectPage.id - 1
        : selectPage.id;
    const currentPage: Page =
      learningDataFormatted?.chapters?.[0]?.pages?.find(
        (p) => p.id === pageId
      ) || selectPage;
    if (currentPage)
      setPageSelected({
        ...currentPage,
        chapterId: learningDataFormatted?.chapters?.[0]?.id,
        pageId: currentPage?.id,
      });
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
      <div className="flex-[0.73] h-full flex flex-col">
        <LeftComponent
          learningData={learningDataFormatted}
          onChange={handlePageChange}
          handleMarkComplete={handleMarkComplete}
          pageSelected={pageSelected}
        />
      </div>
      <div
        className="flex-[0.27] h-full border-l-2 flex-shrink-0 overflow-auto"
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
      {showCompletePopup && (
        <CCModal isOpen={showCompletePopup} type="center" onClose={() => {}}>
          <div className="flex flex-col items-center">
            <Image
              src={star_border}
              alt="Star"
              // layout="responsive"
              width={100}
              height={100}
              style={{
                maxWidth: "102%",
                width: "102%",
                height: "122%",
                top: -75,
              }}
              className="w-full absolute -left-1 -z-10"
            />
            <div
              className="relative flex flex-col justify-center items-center"
              style={{
                backgroundImage: `url(${bg.src})`,
                top: 5,
                left: 0,
                width: "109%",
                backgroundSize: "100%",
                height: 120,
              }}
            >
              <div
                className="absolute flex justify-center items-center"
                style={{ gap: 22 , top: -68 }}
              >
                <StarRating percentage={100} />
                <StarRating percentage={100} />
                <StarRating percentage={100} />
              </div>
              <Image
                src={rectangle}
                alt="rect 1"
                // layout="responsive"
                width={60}
                height={400}
                style={{
                  position: "absolute",
                  left: 80,
                  height: 124,
                }}
              />
              <Image
                src={rectangle_2}
                alt="rect 2"
                // layout="responsive"
                width={40}
                height={400}
                style={{
                  position: "absolute",
                  left: 133,
                  height: 124,
                }}
              />
              <CCText style={{ color: "#fff", fontSize: 28 }}>Completed</CCText>
            </div>
            <Image
              src={book}
              alt="Book"
              // layout="responsive"
              width={400}
              height={400}
              // style={{ height: "100%" }}
              className="mt-5 m-auto"
            />
            <CCButton
              onClick={async () => {
                const chapterCount = learningData?.chapters?.length || 0;
                setShowCompletePopup(false);
                const res: {
                  url?: string | undefined;
                  error?: unknown | undefined;
                } = await getS3Link("sounds/new_chapter.wav");
                if (res.url) {
                  const newChapterSound = new Audio(res.url);
                  newChapterSound.play();
                }
                if (chapterCount > Number(chapter) + 1)
                  router.push(
                    `learning/${learningKey}?chapter=${Number(chapter) + 1}`
                  );
                else router.push("/");
              }}
              className="w-3/4 relative m-auto -top-5 border-4 border-white-500"
            >
              Continue
            </CCButton>
          </div>
        </CCModal>
      )}
      {showCoin && (
        <motion.div
          className="absolute w-60 h-60 flex items-center justify-center z-[9999]"
          initial={{ x: "40vw", y: "70vh", opacity: 1, scale: 1 }} // Starting position
          animate={{
            x: ["40vw", "78vw"], // Moves smoothly right
            y: ["80vh", "-150px"], // Peaks at 20vh, lands at -40px
            opacity: [1, 1, 0.4], // Fades out at the end
            scale: [1, 0.5, 0.1], // Shrinks as it moves
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <Image src={Coin} width={150} height={150} alt="Coin" />
        </motion.div>
      )}
    </div>
  );
}

export default LearningPage;

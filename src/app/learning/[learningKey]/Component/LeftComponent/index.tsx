/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import CCProgressBar from "@/atom/CCProgressBar";
import CCText from "@/atom/CCText";
import React, { useMemo } from "react";
import MiddleComponent from "../MiddleComponent";
import { FiBook } from "react-icons/fi";
import { HiOutlinePlayCircle } from "react-icons/hi2";
import { LuPuzzle } from "react-icons/lu";
import CCDivider from "@/atom/CCDivider";
import { FaCircleCheck } from "react-icons/fa6";
import { getRandomBookUrl } from "@/utils/commonUtils";
import Image from "next/image";
import { Page } from "../../page";
import { useRouter } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5";

type EachPageTileProp = {
  id: number;
  is_solved: boolean;
  index?: string | number;
  heading: string;
  content_type: "chess_position" | "video" | "img";
  isSelected?: boolean;
  chapterId: number;
  currentPageContent?: any; // Add a specific type if needed
  handleSelectContent: (
    id: number,
    type: "chapter" | "page",
    content: any,
    index: number | string
  ) => void;
  selectedContent: { chapterId: number; pageId: number };
};

type PracticeTest = {
  question: string;
  solution: string;
  position_order?: string | number;
  is_solved: boolean;
};

type EachChapterTileProps = {
  id: number;
  title: string;
  index: number | string;
  pages: EachPageTileProp[];
  practice_tests?: PracticeTest[];
  isSelected?: boolean;
  handleSelectContent: (
    id: number,
    type: "chapter" | "page",
    content: any,
    index: number | string
  ) => void;
  selectedContent: { chapterId: number; pageId: number };
  chapterContent: any;
};

const EachPageTile = ({
  id,
  handleSelectContent,
  selectedContent,
  isSelected = false,
  is_solved = false,
  heading = "",
  index,
  content_type = "chess_position",
  // chapterId,
  currentPageContent,
}: EachPageTileProp) => {
  const iconToShow = useMemo(() => {
    switch (content_type) {
      case "chess_position":
        return <LuPuzzle className="text-textColor-default" size={16} />;
      case "video":
        return (
          <HiOutlinePlayCircle className="text-textColor-default" size={16} />
        );
      case "img":
        return <FiBook className="text-textColor-default" size={16} />;
      default:
        return null;
    }
  }, [content_type]);
  // const handleSelectContent = (
  //   selectedTileId: number,
  //   selectedSection: "chapter" | "page",
  //   selectedContent: any,
  //   index: number | string
  return (
    <div
      className={`flex justify-between items-center cursor-pointer hover:opacity-60 py-3 px-4 ${
        !isSelected ? "bg-background" : "bg-white"
      } ${isSelected ? "border-l-4 border-brand-yellow" : ""}`}
      onClick={() =>
        handleSelectContent(
          id,
          "page",
          { ...selectedContent, ...currentPageContent },
          // @ts-ignore
          index
        )
      }
    >
      <div className="flex-[0.9] flex justify-between items-center">
        <div className="flex-[0.1]">{iconToShow}</div>&nbsp;&nbsp;
        <CCText
          className={`flex-[0.9] ${
            is_solved ? "line-through text-textColor-lightBrown" : ""
          }`}
          isLineExpandable={false}
          lines={1}
        >
          {`${index}. ${heading}`}
        </CCText>
      </div>
      <div className="flex-[0.1]">
        <div className="w-[20px] h-[20px] rounded-full bg-background">
          {is_solved && <FaCircleCheck size={20} className="text-brand-aqua" />}
        </div>
      </div>
    </div>
  );
};

const EachChapterTile = ({
  id,
  isSelected,
  title,
  pages,
  practice_tests,
  index,
  handleSelectContent,
  selectedContent,
  chapterContent,
}: EachChapterTileProps) => {
  // const isChapterSelected = useMemo(
  //   () => selectedContent?.chapterId === id,
  //   [selectedContent?.chapterId, id]
  // );

  const completedPercentage = useMemo(
    () => (pages?.filter((i) => i?.is_solved).length / pages?.length) * 100,
    [pages]
  );

  return (
    <>
      {/* <Spacer spacing={17} /> */}
      <div
        className={`flex justify-between items-center px-3 py-3 cursor-pointer hover:opacity-60 `}
        onClick={() =>
          handleSelectContent(id, "chapter", chapterContent, index)
        }
      >
        <div className={`  flex-[0.8] flex`}>
          <CCText
            className={` ${
              completedPercentage === 100 &&
              "line-through text-textColor-lightBrown"
            } font-medium`}
            lines={1}
            isLineExpandable={false}
          >
            {`${index}. ${title}`}
          </CCText>
        </div>
        <div className="flex-[0.2]">
          {selectedContent?.chapterId === id && (
            <CCProgressBar
              width={35}
              height={35}
              isCircular
              percentage={completedPercentage}
              hideText
            />
          )}
        </div>
      </div>
      {/* {selectedContent?.chapterId !== id && <CCDivider />} */}
      {selectedContent?.chapterId === id && (
        <>
          {/* <Spacer spacing={17} /> */}
          {pages?.map((page, i) => (
            <React.Fragment key={page?.id}>
              <CCDivider />
              <EachPageTile
                {...page}
                index={i + 1}
                handleSelectContent={handleSelectContent}
                selectedContent={selectedContent}
                isSelected={selectedContent?.pageId === page?.id}
                currentPageContent={page}
              />
            </React.Fragment>
          ))}
        </>
      )}
      <CCDivider />
    </>
  );
};

type CourseContentComponentProps = {
  learningDataFormated: any; // Add a specific type if needed
  handleSelectContent: (
    id: number,
    type: "chapter" | "page",
    content: any,
    index: number | string
  ) => void;
  selectedContent: { chapterId: number; pageId: number };
  learningId: string;
};

const CourseContentComponent = ({
  learningDataFormated,
  handleSelectContent,
  selectedContent,
  learningId,
}: CourseContentComponentProps) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push(`/learning/${learningId}`);
  };

  return (
    <div className="flex-col items-start justify-start">
      <div className="flex items-center bg-white uppercase font-medium text-sm px-2 py-2 text-start gap-2 cursor-pointer">
        <IoChevronBackOutline
          size={18}
          className="text-textColor-default"
          onClick={handleGoBack}
        />
        <CCText className="bg-white uppercase font-medium text-sm px-2 py-2 text-start">
          Course Content
        </CCText>
      </div>
      <CCDivider />
      <div
        className="flex-col items-start justify-start overflow-auto h-[calc(100vh-250px)]"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* @ts-ignore  */}
        {learningDataFormated?.chapters?.map((chapter, i) => (
          <EachChapterTile
            key={chapter?.id}
            {...chapter}
            index={i + 1}
            handleSelectContent={handleSelectContent}
            selectedContent={selectedContent}
            chapterContent={chapter}
          />
        ))}
      </div>
    </div>
  );
};

type LeftComponentProps = {
  learningData: any; // Add a specific type if needed
  onChange: (data: any) => void;
  pageSelected: Page | undefined;
  handleMarkComplete: (
    contentType: string,
    pageId: number,
    move?: string
  ) => void;
  learningId: string;
};

const LeftComponent = ({
  learningData,
  onChange,
  pageSelected,
  handleMarkComplete,
  learningId,
}: LeftComponentProps) => {
  // const [selectedContent, setSelectedContent] = useState<{
  //   chapterId: number;
  //   pageId: number;
  // }>({
  //   chapterId: 1,
  //   pageId: 1,
  // });
  // useEffect(() => {
  //   if (learningData) {
  //     const selectedChapterDetails = learningData?.chapters?.[0];
  //     // setSelectedContent({
  //     //   chapterId: selectedChapterDetails?.id,
  //     //   pageId: selectedChapterDetails?.pages?.[0]?.id,
  //     //   ...selectedChapterDetails?.pages?.[0],
  //     // });
  //     onChange({
  //       index: 1,
  //       chapterId: selectedChapterDetails?.id,
  //       pageId: selectedChapterDetails?.pages?.[0]?.id,
  //       ...selectedChapterDetails?.pages?.[0],
  //     });
  //   }
  // }, [learningData]);

  const handleSelectContent = (
    selectedTileId: number,
    selectedSection: "chapter" | "page",
    selectedContent: any,
    index: number | string
  ) => {
    if (selectedSection === "chapter") {
      const selectedChapterDetails = learningData?.chapters?.filter(
        // @ts-ignore
        (i) => i?.id === selectedTileId
      )?.[0];
      // setSelectedContent({
      //   chapterId: selectedTileId,
      //   pageId: selectedChapterDetails?.pages?.[0]?.id,
      //   ...selectedChapterDetails?.pages?.[0],
      // });
      onChange({
        ...selectedChapterDetails?.pages?.[0],
        index,
        chapterId: selectedTileId,
        pageId: selectedChapterDetails?.pages?.[0]?.id,
      });
    } else {
      onChange({
        ...selectedContent,
        index,
        chapterId: selectedContent?.chapterId,
        pageId: selectedTileId,
      });
      // setSelectedContent((prev) => ({
      //   chapterId: prev?.chapterId,
      //   pageId: selectedTileId,
      //   ...selectedContent,
      // }));
    }
  };

  const courseCompletedPercentage = useMemo(() => {
    const totalCount = learningData?.chapters?.reduce(
      // @ts-ignore
      (prev, curr) => ({
        totalPages: prev?.totalPages + curr?.pages?.length,
        completedPages:
          prev?.completedPages +
          // @ts-ignore
          curr?.pages?.filter((i) => i?.is_solved)?.length,
      }),
      { totalPages: 0, completedPages: 0 }
    );
    const percentage =
      (totalCount?.completedPages / totalCount?.totalPages) * 100;
    return percentage?.toFixed(0) || 0;
  }, [learningData]);
  const randomBookUrl = useMemo(() => getRandomBookUrl(), []);
  return (
    <>
      <div className="border-y-2 flex justify-start items-center gap-3 bg-white h-[80px]">
        <div className="flex-[0.1] h-full flex justify-center items-center bg-gradient-to-b from-white to-brand-lightYellow">
          <div className="m-auto">
            <Image
              src={randomBookUrl} // Dynamic image URL
              alt="Random Book Cover"
              // className="w-full"
              width={80} // Set the desired width
              height={100} // Set the desired height
              priority // Optional: ensures the image loads quickly
            />
          </div>
        </div>
        <div className="flex-[0.6] py-2 flex-col justify-center items-center">
          <CCText className="text-xs text-textColor-light-brown">
            {learningData?.author}
          </CCText>
          <CCText lines={1}>{learningData?.title}</CCText>
        </div>
        <div className="flex-[0.3] flex-col m-auto mr-5 justify-center items-center">
          {/* @ts-ignore  */}
          <CCProgressBar percentage={courseCompletedPercentage} />
          <CCText className="text-xs font-medium text-end">
            {`${courseCompletedPercentage}% completed`}
          </CCText>
        </div>
      </div>
      <div className="flex h-full justify-between items-start">
        <div className="flex-[0.3]">
          <CourseContentComponent
            learningDataFormated={learningData}
            handleSelectContent={handleSelectContent}
            // @ts-ignore
            selectedContent={pageSelected}
            learningId={learningId}
          />
        </div>
        <div className="flex-[0.7] h-full border-l-2">
          <MiddleComponent
            // @ts-ignore
            selectedContent={pageSelected}
            handleMarkComplete={handleMarkComplete}
          />
        </div>
      </div>
    </>
  );
};

export default LeftComponent;

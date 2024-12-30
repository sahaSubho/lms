/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import CCDivider from "@/atom/CCDivider";
import CCModal from "@/atom/CCModal";
import CCText from "@/atom/CCText";
import Spacer from "@/atom/Spacer";
import React, { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoBookOutline } from "react-icons/io5";
// @ts-ignore
function JumpToModal({ learningData, onChange, pageSelected }) {
  //   const [selectedChapterId, setSelectedChapterId] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  //   index,
  //   chapterId: selectedTileId,
  //   pageId: selectedChapterDetails?.pages?.[0]?.id,
  //   ...selectedChapterDetails?.pages?.[0],

  // @ts-ignore
  const handleSelectContent = (chapterDetail) => {
    onChange({
      index: 1,
      chapterId: chapterDetail?.id,
      pageId: chapterDetail?.pages?.[0]?.id,
      ...chapterDetail?.pages?.[0],
    });
  };

  return (
    <div>
      <CCText
        className="cursor-pointer flex justify-center items-center text-brand-aqua"
        // @ts-ignore
        onClick={() => setOpenModal(true)}
      >
        Jump To
        <Spacer spacing={2} horizontal />
        <IoBookOutline className="text-brand-aqua" size={18} />
      </CCText>
      <CCModal
        header="Chapter List"
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        type="side"
      >
        {console.log(learningData, "learningData in modal")}
        {/* @ts-ignore */}
        {learningData?.chapters?.map((i, index) => {
          const isSolved = !i?.pages?.some(
            (j: { is_solved: boolean }) => !j?.is_solved
          );
          return (
            <>
              <div
                className={`flex justify-between px-10 items-center cursor-pointer hover:opacity-60 py-3 px-4 ${
                  pageSelected?.chapterId === i?.id
                    ? "bg-brand-lightYellow"
                    : "bg-white"
                }`}
                onClick={() => handleSelectContent(i)}
              >
                <div className="flex justify-between items-center">
                  {/* <div className="flex-[0.1]">{iconToShow}</div>&nbsp;&nbsp; */}
                  <CCText
                    className={`
                    ${
                      isSolved
                        ? "line-through text-textColor-grey opacity-70"
                        : ""
                    }
                     ${pageSelected?.chapterId === i?.id ? "font-bold" : ""}
                `}
                    isLineExpandable={false}
                    lines={1}
                  >
                    {`${index + 1}. ${i?.title}`}
                  </CCText>
                </div>
                <div className="flex">
                  <div className="rounded-full bg-background">
                    {isSolved && (
                      <FaCircleCheck size={20} className="text-brand-aqua" />
                    )}
                    {pageSelected?.chapterId === i?.id && !isSolved && (
                      <div className="rounded-sm px-2 py-1 bg-white">
                        <CCText className="text-brand-aqua">ONGOING</CCText>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <CCDivider />
            </>
          );
        })}
        {/* <div
      className={`flex justify-between items-center cursor-pointer hover:opacity-60 py-3 px-4 ${
        !isSelected ? "bg-background" : "bg-white"
      } ${isSelected ? "border-l-4 border-brand-yellow" : ""}`}
      onClick={() => handleSelectContent(id, "page", currentPageContent, index)}
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
    </div> */}
      </CCModal>
    </div>
  );
}

export default JumpToModal;

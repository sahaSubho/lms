"use client";
import React from "react";
import Image from "next/image";
import CCText from "@/atom/CCText";
import bannerImg from "@/assets/explore/explore_banner.svg";
import Cookies from "js-cookie";
import CCButton from "@/atom/CCButton";
import { AiFillCheckCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";

const cards = [
  {
    title: "Play any game",
    url: "https://learn.circlechess.com/playChess",
    completed: false,
  },
  {
    title: "Complete chapter",
    completed: false,
  },
  {
    title: "Solve positions",
    url: "https://learn.circlechess.com/positions",
    completed: false,
  },
];

const Banner = ({ learningDataFormatted }: { learningDataFormatted?: any }) => {
  const router = useRouter();
  const isBeginnerPlayer = Cookies.get("isBeginnerPlayer");

  const getLastUnlockedChapter = () => {
    const unlockedChapters = learningDataFormatted.chapters.filter(
      (chapter: { is_locked: boolean }) => chapter.is_locked === false
    );
    if (unlockedChapters.length > 0) {
      const lastChapter = unlockedChapters[unlockedChapters.length - 1];
      const chapterIndex = learningDataFormatted.chapters.findIndex(
        (chapter: { id: string }) => chapter.id === lastChapter.id
      );
      router.push(
        `/learning/${learningDataFormatted.courseKey}?chapter=${
          chapterIndex + 1
        }`
      );
    }
    return null;
  };

  const handleCardClick = (cardTitle: string): string | null => {
    if (cardTitle === "Complete chapter") {
      return getLastUnlockedChapter();
    } else {
      const selectedCard = cards.find((card) => card.title === cardTitle);
      return selectedCard?.url || null;
    }
  };

  return (
    <div className="h-1/4 bg-brand-brown w-full flex items-center justify-between bg-[#262322]">
      <div className="flex-col items-center justify-center ml-8 pt-[30px] pb-[70px]">
        <CCText className="text-textColor-yellow text-sm">Welcome to</CCText>
        <CCText className="text-white text-3xl ">CircleChess Academy</CCText>
        {isBeginnerPlayer === "true" && (
          <div className="flex flex-wrap gap-4 mt-4">
            {cards.map((card, index) => (
              <div
                key={index}
                className="w-[240px] p-4 rounded-lg bg-[#4D3F37] flex items-center justify-between border border-[#FAF6EB1F]"
              >
                <div>
                  <CCText
                    className={`${
                      card.completed
                        ? "line-through text-gray-400"
                        : "text-white"
                    } text-base`}
                  >
                    {card.title}
                  </CCText>
                </div>
                {card.completed ? (
                  <AiFillCheckCircle color="#3DAB9E" size={20} />
                ) : (
                  <CCButton
                    onClick={() => {
                      const url = handleCardClick(card.title);
                      window.parent.postMessage({ type: "REDIRECT", url }, "*");
                    }}
                    className="bg-[#F5C344] text-black text-xs font-bold px-3 py-1 rounded-full"
                  >
                    GO
                  </CCButton>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-full md:w-2/5 max-w-[400px]">
        <Image
          src={bannerImg}
          alt="circle-chess"
          layout="responsive"
          priority
          //   width={100}
          //   height={300}
        />
      </div>
    </div>
  );
};

export default Banner;

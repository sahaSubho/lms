"use client";
import CCCard from "@/atom/CCCard";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import EachLearningCard from "../MyLearning/Components/EachLearningCard";
import EachLearningCardSkeleton from "../MyLearning/Components/EachLearningCard/loading";
import CCDivider from "@/atom/CCDivider";
import { RiQuestionnaireLine } from "react-icons/ri";
import CCAccordion from "@/atom/CCAccordion";
import CCText from "@/atom/CCText";
import Spacer from "@/atom/Spacer";
import { useGetBeginnerCourseDetails } from "@/APIHooks/GetBeginnerCourse/useGetBeginnerCourse";
import bg from "@/assets/Components/complete_bg.png";
import book from "@/assets/Components/Book.png";
import rectangle from "@/assets/Components/Rectangle.png";
import rectangle_2 from "@/assets/Components/Rectangle_2.png";
import star_border from "@/assets/Components/Union.png";
import lock from "@/assets/Components/lock.png";
import CoinBg from "@/assets/Components/Coin_bg.png";
import Coin from "@/assets/Components/Coin.png";
import Point from "@/assets/Components/point.svg";

import Image from "next/image";
import StarRating from "@/atom/StarRating";
import CCButton from "@/atom/CCButton";
import { LeaderBoard } from "@/components/LeaderBoard";

const BeginnerLMS = () => {
  const { data: course, isLoading } = useGetBeginnerCourseDetails();
  const router = useRouter();

  const FAQContent = useMemo(
    () =>
      [1, 2]?.map((i) => ({
        id: i,
        heading: "How to earn more points",
        content: (
          <CCText className="text-base text-textColor-lightBrown">
            Earn points by solving the board and questions
          </CCText>
        ),
      })),
    []
  );

  const getStarPercentage = (total: number, score: number, key: number) => {
    let perValue = (score / total) * 300;
    const result = [0, 0, 0];
    let i = 0;
    while (i < 3) {
      if (perValue > 100) {
        result[i] = 100;
        perValue -= 100;
      } else {
        result[i] = perValue;
        break;
      }
      i += 1;
    }
    return result[key];
  };

  return (
    <div className="px-10 my-6 flex flex-row gap-14">
      <div className="basis-3/4">
        <CCCard className="mt-0 flex-col h-auto w-full p-10">
          {isLoading ? <EachLearningCardSkeleton /> : <></>}
          {course ? <EachLearningCard {...course} /> : <></>}
          <CCDivider className="my-3" />
          <div className="my-5 flex gap-16">
            {course?.chapters?.map((chapter, i) => (
              <div
                key={chapter.id}
                className="relative flex flex-col justify-center items-center"
                onClick={() => {
                  // if (!chapter.is_locked) {
                    router.push(
                      `learning/${course.courseKey}?chapter=${i + 1}`
                    );
                  // }
                }}
              >
                {chapter.is_locked && (
                  <Image
                    className="absolute z-10"
                    src={lock}
                    alt="lock"
                    width={36}
                    height={48}
                  />
                )}
                <div
                  className="relative flex flex-col justify-center items-center"
                  style={{
                    backgroundImage: `url(${star_border.src})`,
                    bottom: 5,
                    left: 0,
                    backgroundSize: "100% 100%",
                    width: 200,
                    height: 220,
                    filter: chapter.is_locked ? "grayscale(1)" : "unset",
                  }}
                >
                  <div
                    className="absolute flex justify-center items-center"
                    style={{ gap: 13, top: 6 }}
                  >
                    <StarRating
                      percentage={getStarPercentage(
                        chapter.points,
                        chapter.user_point,
                        0
                      )}
                      size={40}
                    />
                    <StarRating
                      percentage={getStarPercentage(
                        chapter.points,
                        chapter.user_point,
                        1
                      )}
                      size={40}
                    />
                    <StarRating
                      percentage={getStarPercentage(
                        chapter.points,
                        chapter.user_point,
                        2
                      )}
                      size={40}
                    />
                  </div>

                  <Image
                    src={book}
                    alt="Book"
                    // layout="responsive"
                    width={170}
                    height={150}
                    // style={{ height: "100%" }}
                    className="mt-20 m-auto z-2"
                  />
                  <div
                    className="relative flex items-center"
                    style={{
                      backgroundImage: `url(${bg.src})`,
                      bottom: 5,
                      left: 0,
                      width: "109%",
                      backgroundSize: "100% 100%",
                      height: 55,
                    }}
                  >
                    <Image
                      src={rectangle}
                      alt="rect 1"
                      // layout="responsive"
                      width={30}
                      height={400}
                      style={{
                        position: "absolute",
                        left: 60,
                        height: 60,
                      }}
                    />
                    <Image
                      src={rectangle_2}
                      alt="rect 2"
                      // layout="responsive"
                      width={20}
                      height={400}
                      style={{
                        position: "absolute",
                        left: 90,
                        height: 60,
                      }}
                    />
                    <CCText
                      style={{ color: "#fff", fontSize: 14, paddingLeft: 20 }}
                      lines={1}
                    >
                      {chapter.title}
                    </CCText>
                    <CCButton
                      className="absolute font-bold -top-5 right-5 w-[40px] h-[40px] px-0 py-0"
                      buttonStyle="circle"
                      buttonType={
                        course.chapterNumber === i + 1 ? "aqua" : "yellow"
                      }
                      textColor={
                        course.chapterNumber === i + 1 ? "white" : "black"
                      }
                      textStyle={{ transform: "rotate(-8deg)" }}
                    >
                      {String(i + 1)}
                    </CCButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CCCard>
      </div>
      <div className="basis-1/4">
        <div className="mt-6 relative px-6 py-3 flex justify-between items-center bg-brand-aqua rounded">
          <div>
            <CCText className="text-white">Your Points</CCText>
            <div className="flex gap-1">
              <Image src={Point} alt="Point" width={22} height={22} />
              <CCText className="text-white text-4xl font-bold">
                {String(course?.user_score?.toLocaleString() || 0)}
              </CCText>
            </div>
          </div>
          <Image src={Coin} alt="Coin" width={100} height={100} />
          <Image
            src={CoinBg}
            alt="Coin Bg"
            width={100}
            height={100}
            className="h-full absolute right-0"
          />
        </div>
        <LeaderBoard data={course?.leaderboard} />
        <div className="mt-6 flex justify-start items-center gap-4">
          <CCText className="font-medium text-xl">FAQ&apos;s</CCText>
        </div>
        <Spacer spacing={20} />
        <CCAccordion sections={FAQContent} />
      </div>
    </div>
  );
};

export default BeginnerLMS;

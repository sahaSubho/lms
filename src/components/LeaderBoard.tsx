import CCCard from "@/atom/CCCard";
import CCText from "@/atom/CCText";
import React from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import first from "@/assets/badges/1st.svg";
import second from "@/assets/badges/2nd.svg";
import third from "@/assets/badges/3rd.svg";
import Image from "next/image";

export const LeaderBoard = ({
  data,
}: {
  data:
    | Array<{
        user_id: number;
        name: string;
        total_score: number;
      }>
    | undefined;
}) => {
  const getRankBadge = (key: number) => {
    switch (key) {
      case 0:
        return <Image width={30} height={30} src={first} alt="first" />;
      case 1:
        return <Image width={30} height={30} src={second} alt="second" />;
      case 2:
        return <Image width={30} height={30} src={third} alt="third" />;
      default:
        return <CCText>{String(key + 1)}.</CCText>;
    }
  };

  return (
    <CCCard className="flex flex-col p-5 h-auto">
      <CCText className="text-center mt-2">DAILY SCORECARD</CCText>
      <div className="flex flex-col mt-5">
        {data?.map((i, index) => (
          <div
            key={index}
            className="flex justify-between items-center"
            style={{
              background:
                i.name !== "YOU"
                  ? "#fff"
                  : "linear-gradient(90deg, #FFFFFF 5.5%, #F6E5B6 52.5%, #FFFFFF 95%)",
            }}
          >
            <div className="flex justify-center items-center gap-1">
              <div className="w-[20px] text-center">{getRankBadge(index)}</div>
              <div className="w-[30px]">
                <IoPersonCircleSharp fontSize={30} />
              </div>
              <CCText>{i.name}</CCText>
            </div>
            <CCText>{i.total_score.toLocaleString()}</CCText>
          </div>
        ))}
      </div>
    </CCCard>
  );
};

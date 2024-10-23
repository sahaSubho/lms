import React from "react";
import Image from "next/image";
import CCText from "@/atom/CCText";
import bannerImg from "@/assets/explore/explore_banner.svg";

async function Banner() {
  return (
    <div className="h-1/4 bg-brand-brown w-full flex items-center justify-between">
      <div className="flex-col items-center justify-center ml-8">
        <CCText className="text-textColor-yellow text-sm">Welcome to</CCText>
        <CCText className="text-white text-3xl ">CircleChess Academy</CCText>
      </div>
      <div className="w-2/5">
        <Image
          src={bannerImg}
          alt="circle-chess"
          layout="responsive"
          //   width={100}
          //   height={300}
        />
      </div>
    </div>
  );
}

export default Banner;

"use client";
import CCText from "@/atom/CCText";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import circlechessLogo from "@/assets/logos/cc-logo-full.png";
import CCCoin from "@/atom/CCCoin";
import Coin from "@/assets/Components/Coin.png";
import { useGetBeginnerUserDetails } from "@/APIHooks/GetBeginnerUser/useGetBeginnerUser";
import useUserStore from "@/store/userStore";

function Header() {
  const { data: user } = useGetBeginnerUserDetails();
  const userName = useUserStore((state) => state.name);
  const score = useUserStore((state) => state.score);
  const [animateBox, setAnimateBox] = useState(false);

  const updateName = useUserStore((state) => state.updateName);
  const updateScore = useUserStore((state) => state.updateScore);

  useEffect(() => {
    if (user && score === 0) {
      updateName(user?.name);
      updateScore(user?.total_score);
    }
  }, [user]);

  useEffect(() => {
    if (score > 0 && score !== user?.total_score) {
      setAnimateBox(true);
      setTimeout(() => {
        setAnimateBox(false);
      }, 2000);
    }
  }, [score]);

  return (
    <header className="sticky top-0 z-10">
      <div className="bg-white w-full p-2.5 flex justify-between">
        <div style={{ width: "12%" }}>
          <Image
            src={circlechessLogo}
            alt="circle-chess"
            layout="responsive"
            width={100}
            height={300}
          />
        </div>
        <div className="flex justify-end items-center">
          <motion.div
            className="flex relative rounded-full py-1 px-10 bg-brand-darkBrown text-white"
            animate={animateBox ? { scale: 1.3 } : { scale: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Image
              src={Coin}
              width={40}
              height={40}
              alt="Coin"
              className="absolute"
              style={{ left: -10, top: -5 }}
            />
            {score}
          </motion.div>

          <div className="flex-col mx-3">
            <CCText className="text-right">{userName}</CCText>
          </div>
          <div className="flex items-center">
            <div className="rounded-full w-10 h-10 bg-grey"></div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

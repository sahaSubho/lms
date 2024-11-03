import React from "react";
import Image from "next/image";
import cccoin from "@/assets/currency/cc-coin.svg";

function CCCoin() {
  return <Image src={cccoin} alt="coin" height={14} width={14} />;
}

export default CCCoin;

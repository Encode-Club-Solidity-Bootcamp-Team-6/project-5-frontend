"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { ClaimPrizes } from "~~/components/ClaimPrizes";
import { Info } from "~~/components/Info";
import { PlaceBets } from "~~/components/PlaceBets";
import { PurchaseTokens } from "~~/components/PurchaseTokens";
import { AddressInput } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const [lotteryAddress, setLotteryAddress] = useState<`0x${string}`>("0x3B0DAf0D790c8c850Fb94Cdce290188745f0dAcf");
  const header = (
    <div className="flex flex-col px-5 gap-3 w-full max-w-lg">
      <h1 className="text-center">
        <span className="block text-4xl font-bold">🔥 Lottery 🔥</span>
      </h1>
      <AddressInput
        value={lotteryAddress}
        onChange={newVal => setLotteryAddress(newVal as `0x${string}`)}
        placeholder="Lottery Address"
      />
    </div>
  );

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        {header}
        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12 space-y-10">
          <div className="grid grid-cols-2 justify-center items-center gap-12 grid-flow">
            <Info lotteryAddress={lotteryAddress} />
            <PurchaseTokens lotteryAddress={lotteryAddress} />
            <PlaceBets lotteryAddress={lotteryAddress} />
            <ClaimPrizes lotteryAddress={lotteryAddress} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

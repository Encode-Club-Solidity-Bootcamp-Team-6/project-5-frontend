import { FC } from "react";
import useLottery from "./useLottery";
import { formatEther } from "viem";

export const Info: FC<{ lotteryAddress: `0x${string}` }> = ({ lotteryAddress }) => {
  const { lottery } = useLottery(lotteryAddress);

  return (
    <div className="flex flex-col bg-base-100 px-10 py-5 rounded-3xl h-[100%] align-center">
      <p className="text-lg font-bold text-center align-top">
        Lottery <span>{lottery.betsOpen ? "Open 🔥" : "Closed ❌"}</span>
      </p>
      <div className="flex flex-wrap justify-start flex-col gap-4">
        <p className="text-xl text-center">
          Prize Pool: {formatEther(lottery.prizePool)} ${lottery.ticker}
        </p>
        <p className="text-md mb-0 text-center">
          1 Bet = {formatEther(lottery.betPrice)} ${lottery.ticker} (+ {formatEther(lottery.betFee)} ${lottery.ticker}{" "}
          bet fee)
        </p>
        <p className="text-sm m-0 text-center">
          1 ETH = {lottery.purchaseRatio} ${lottery.ticker}
        </p>
      </div>
    </div>
  );
};

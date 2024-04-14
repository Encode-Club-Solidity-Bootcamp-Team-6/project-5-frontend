// user should be able to see their bets and place new bets
import { FC, useState } from "react";
import { EtherInput } from "./scaffold-eth";
import useLottery from "./useLottery";
import { formatEther } from "viem";

export const PlaceBets: FC<{ lotteryAddress: `0x${string}` }> = ({ lotteryAddress }) => {
  const [betAmount, setBetAmount] = useState("");
  const [bets, setBets] = useState(0);

  const { lottery } = useLottery(lotteryAddress);

  // place bets on the lottery
  // check if the lottery is still open and input amount is valid
  // if so, place the bet and update the number of bets
  const placeBets = () => {
    // TODO
  };

  return (
    <div className="flex flex-col bg-base-100 px-10 py-5 rounded-3xl h-[100%]">
      <p className="text-sm font-bold text-left align-top">Place and View Bets</p>
      <div className="flex flex-col gap-4">
        <EtherInput value={betAmount} onChange={setBetAmount} placeholder={`1 ${lottery.ticker}`} />
        <div className="flex flex-row justify-between">
          <p className="text-xs m-2">
            1 Bet = {formatEther(lottery.betPrice)} ${lottery.ticker}
          </p>
          <p className="text-xs m-2">
            Bet Fee: {formatEther(lottery.betFee)} ${lottery.ticker}
          </p>
        </div>
        <button className="btn btn-primary w-48 self-center" onClick={placeBets}>
          Place Bet(s)
        </button>
        <p className="text-sm text-center">Your bets: {bets}</p>
      </div>
    </div>
  );
};

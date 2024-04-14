// user should be able to see their bets and place new bets
import { FC, useState } from "react";
import { IntegerInput } from "./scaffold-eth";
import useLottery from "./useLottery";

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
        <IntegerInput
          value={betAmount}
          onChange={val => setBetAmount(val.toString())}
          disableMultiplyBy1e18
          placeholder="Bet amount"
        />
        <div className="flex flex-row justify-between">
          <p className="text-xs m-2">
            1 Bet = {lottery.betPrice.toString()} ${lottery.ticker}
          </p>
          <p className="text-xs m-2">
            Bet Fee: {lottery.betFee.toString()} ${lottery.ticker}
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

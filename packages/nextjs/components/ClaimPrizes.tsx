// users should be able to see their prizes and claim new prizes
// if the lottery is still open, users should be able to see that
// // if the lottery is closed, users should be able to see the results
import { FC, useState } from "react";
import useLottery from "./useLottery";

export const ClaimPrizes: FC<{ lotteryAddress: `0x${string}` }> = ({ lotteryAddress }) => {
  const bets = 0;
  const [unclaimedPrizes, setUnclaimedPrizes] = useState(0);
  const [claimedPrizes, setPrizes] = useState(0);

  const { lottery } = useLottery(lotteryAddress);

  // check if user has any bets AND if the lottery is closed
  // return the number of unclaimed prizes
  const checkPrizes = () => {
    // TODO
  };

  // check if user has any unclaimed prizes
  // if so, claim them
  const claimPrizes = () => {
    // TODO
  };

  return (
    <div className="flex flex-col bg-base-100 px-10 py-5 rounded-3xl h-[100%]">
      <p className="text-sm font-bold text-left align-top">Check and Claim Prizes</p>
      {lottery.betsOpen && <p className="text-xs text-rose-400 m-0">The lottery is still ongoing.</p>}
      {bets === 0 && <p className="text-xs text-rose-400 m-0">You haven&apos;t made any bets.</p>}
      <div className="flex flex-row gap-4 justify-between align-center mt-8">
        <div className="flex flex-col gap-8 justify-center h-[100%]">
          <button
            className="btn btn-primary w-48 self-center"
            disabled={!bets || lottery.betsOpen}
            onClick={checkPrizes}
          >
            Check Prizes
          </button>
          <p className="text-sm text-center">Unclaimed Prizes: {unclaimedPrizes} ETH</p>
        </div>
        <div className="flex flex-col gap-8 justify-center h-[100%]">
          <button className="btn btn-primary w-48 self-center" disabled={unclaimedPrizes === 0} onClick={claimPrizes}>
            Claim Prizes
          </button>
          <p className="text-sm text-center">Claimed Prizes: {claimedPrizes} ETH</p>
        </div>
      </div>
    </div>
  );
};

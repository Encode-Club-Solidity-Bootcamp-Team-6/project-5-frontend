// users should be able to see their prizes and claim new prizes
// if the lottery is still open, users should be able to see that
// // if the lottery is closed, users should be able to see the results
import { FC, useEffect, useState } from "react";
import { abi } from "../../hardhat/artifacts/contracts/Lottery.sol/Lottery.json";
import { useContractReads } from "wagmi";

export const ClaimPrizes: FC<{ lotteryAddress: `0x${string}` }> = ({ lotteryAddress }) => {
  const bets = 0;
  const [isLotteryClosed, setLotteryClosed] = useState(false);
  const [unclaimedPrizes, setUnclaimedPrizes] = useState(0);
  const [claimedPrizes, setPrizes] = useState(0);

  const lotteryContract = {
    address: lotteryAddress,
    abi: abi as any,
  };

  interface ContractReadsOutput {
    data: any[] | undefined;
    isError: boolean;
    isLoading: boolean;
  }

  const { data, isError, isLoading }: ContractReadsOutput = useContractReads({
    contracts: [
      {
        ...lotteryContract,
        functionName: "betFee",
      },
      {
        ...lotteryContract,
        functionName: "betsOpen",
      },
      {
        ...lotteryContract,
        functionName: "prizePool",
      },
      {
        ...lotteryContract,
        functionName: "purchaseRatio",
      },
      {
        ...lotteryContract,
        functionName: "betPrice",
      },
    ],
  });

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

  // update lottery status when data is fetched
  useEffect(() => {
    if (data && data[1].status === "success") {
      setLotteryClosed(data[1].result.toString() === "false" ? true : false);
    }
  }, [data]);

  return (
    <div className="flex flex-col bg-base-100 px-10 py-5 rounded-3xl h-[100%]">
      <p className="text-sm font-bold text-left align-top">Check and Claim Prizes</p>
      {!isLotteryClosed && <p className="text-xs text-rose-400 m-0">The lottery is still ongoing.</p>}
      {bets === 0 && <p className="text-xs text-rose-400 m-0">You haven&apos;t made any bets.</p>}
      <div className="flex flex-row gap-4 justify-between align-center mt-8">
        <div className="flex flex-col gap-8 justify-center h-[100%]">
          <button
            className="btn btn-primary w-48 self-center"
            disabled={!bets || !isLotteryClosed}
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

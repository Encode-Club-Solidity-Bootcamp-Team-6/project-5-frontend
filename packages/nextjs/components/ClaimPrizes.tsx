// users should be able to see their prizes and claim new prizes
// if the lottery is still open, users should be able to see that
// // if the lottery is closed, users should be able to see the results
import { FC } from "react";
import { abi } from "../../hardhat/artifacts/contracts/Lottery.sol/Lottery.json";
import useLottery from "./useLottery";
import { useContractWrite } from "wagmi";

export const ClaimPrizes: FC<{ lotteryAddress: `0x${string}` }> = ({ lotteryAddress }) => {
  const { lottery } = useLottery(lotteryAddress);

  const lotteryContract = {
    address: lotteryAddress,
    abi: abi as any,
  };

  const yourPrizes = lottery.prize;

  const {
    data: dataWithdraw,
    isError: isErrorWithdraw,
    error: errorWithdraw,
    isLoading: isLoadingWithdraw,
    isSuccess: isSuccessWithdraw,
    write,
  } = useContractWrite({
    address: lotteryAddress,
    abi,
    functionName: "prizeWithdraw",
    args: [yourPrizes],
  });

  let statusMessage = "";
  if (isLoadingWithdraw) statusMessage = "Loading...";
  else if (isErrorWithdraw) statusMessage = `Error: ${errorWithdraw?.message}`;
  else if (isSuccessWithdraw) statusMessage = `Success: ${JSON.stringify(dataWithdraw)}`;

  return (
    <div className="flex flex-col bg-base-100 px-10 py-5 rounded-3xl h-[100%]">
      <p className="text-sm font-bold text-left align-top">Claim Prizes</p>
      {lottery.betsOpen && <p className="text-xs text-rose-400 m-0">The lottery is still ongoing.</p>}

      <div className="flex flex-col gap-8 justify-center h-[100%]">
        <p className="text-sm text-center">
          Your Prizes: {yourPrizes} {lottery.ticker}
        </p>
        <button
          className="btn btn-primary w-48 self-center"
          disabled={!yourPrizes || yourPrizes.toString() === "0" || lottery.betsOpen}
          onClick={() => write()}
        >
          Claim Prizes
        </button>
        <span className="text-wrap max-w-xs">{statusMessage}</span>
      </div>
    </div>
  );
};

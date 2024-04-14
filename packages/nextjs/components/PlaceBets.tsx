// user should be able to see their bets and place new bets
import { FC, useState } from "react";
import { abi } from "../../hardhat/artifacts/contracts/Lottery.sol/Lottery.json";
import { EtherInput } from "./scaffold-eth";
import useLottery from "./useLottery";
import { formatEther, parseEther } from "viem";
import { useContractRead, useContractReads, useContractWrite } from "wagmi";

export const PlaceBets: FC<{ lotteryAddress: `0x${string}` }> = ({ lotteryAddress }) => {
  const [betAmount, setBetAmount] = useState("");
  const [bets, setBets] = useState(0);

  const { lottery } = useLottery(lotteryAddress);

  const {
    data: dataBet,
    isError: isErrorBet,
    error: errorBet,
    isLoading: isLoadingBet,
    isSuccess: isSuccessBet,
    write,
  } = useContractWrite({
    address: lotteryAddress,
    abi,
    functionName: "bet",
    value: parseEther(betAmount),
  });

  let statusMessage = "";
  if (isLoadingBet) statusMessage = "Loading...";
  else if (isErrorBet) statusMessage = `Error: ${errorBet?.message}`;
  else if (isSuccessBet) statusMessage = `Success: ${JSON.stringify(dataBet)}`;

  return (
    <div className="flex flex-col bg-base-100 px-10 py-5 rounded-3xl h-[100%]">
      <p className="text-sm font-bold text-left align-top">Place Bets</p>
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
        <button
          className="btn btn-primary w-48 self-center"
          onClick={() => write()}
          disabled={lottery && lottery.betPrice}
        >
          Place Bet(s)
        </button>
        <p className="text-sm text-center">{statusMessage}</p>
      </div>
    </div>
  );
};

// user should be able to see their bets and place new bets
import { FC, useState } from "react";
import { abi } from "../../hardhat/artifacts/contracts/Lottery.sol/Lottery.json";
import { abi as tokenAbi } from "../../hardhat/artifacts/contracts/LotteryToken.sol/LotteryToken.json";
import { EtherInput } from "./scaffold-eth";
import { formatEther, parseEther } from "viem";
import { useContractRead, useContractReads, useContractWrite } from "wagmi";

export const PlaceBets: FC<{ lotteryAddress: `0x${string}` }> = ({ lotteryAddress }) => {
  const [betAmount, setBetAmount] = useState("");
  const [bets, setBets] = useState(0);

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
      {
        ...lotteryContract,
        functionName: "paymentToken",
      },
    ],
  });

  const {
    data: dataToken,
    isError: isErrorToken,
    isLoading: isLoadingToken,
  } = useContractRead({
    address: data && data[5].status === "success" ? data[5].result : "",
    abi: tokenAbi,
    functionName: "symbol",
  });

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

  const ticker = `${dataToken}` || "Unknown";
  let statusMessage = "";
  if (isLoadingBet) statusMessage = "Loading...";
  else if (isErrorBet) statusMessage = `Error: ${errorBet?.message}`;
  else if (isSuccessBet) statusMessage = `Success: ${JSON.stringify(data)}`;

  return (
    <div className="flex flex-col bg-base-100 px-10 py-5 rounded-3xl h-[100%]">
      <p className="text-sm font-bold text-left align-top">Place Bets</p>
      <div className="flex flex-col gap-4">
        <EtherInput
          value={betAmount}
          onChange={setBetAmount}
          placeholder={`1 ${ticker}`}
          disabled={data && !data[1].result}
        />
        <div className="flex flex-row justify-between">
          <p className="text-xs m-2">
            1 Bet = {data && data[0].status === "success" && formatEther(data[4].result.toString())} ${ticker}
          </p>
          <p className="text-xs m-2">
            Bet Fee: {data && data[0].status === "success" && formatEther(data[0].result.toString())} ${ticker}
          </p>
        </div>
        <button className="btn btn-primary w-48 self-center" onClick={() => write()} disabled={data && !data[1].result}>
          Place Bet(s)
        </button>
        <p className="text-sm text-center">{statusMessage}</p>
      </div>
    </div>
  );
};

import { FC } from "react";
import { abi } from "../../hardhat/artifacts/contracts/Lottery.sol/Lottery.json";
import { abi as tokenAbi } from "../../hardhat/artifacts/contracts/LotteryToken.sol/LotteryToken.json";
import { useContractRead, useContractReads } from "wagmi";

export const Info: FC<{ lotteryAddress: `0x${string}` }> = ({ lotteryAddress }) => {
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

  const ticker = `${dataToken}` || "Unknown";

  return (
    <div className="flex flex-col bg-base-100 px-10 py-5 rounded-3xl h-[100%] align-center">
      <p className="text-lg font-bold text-center align-top">
        Lottery {data && data[0].status === "success" && <span>{data[1].result ? "Open 🔥" : "Closed ❌"}</span>}
      </p>
      <div className="flex flex-wrap justify-start flex-col gap-4">
        {data && data[2].status === "success" && (
          <p className="text-xl text-center">
            Prize Pool: {data[2].result.toString()} ${ticker}
          </p>
        )}
        {data && data[4].status === "success" && (
          <p className="text-md mb-0 text-center">
            1 Bet = {data[4].result.toString()} ${ticker} (+ {data[0].result.toString()} ${ticker} bet fee)
          </p>
        )}
        {data && data[3].status === "success" && (
          <p className="text-sm m-0 text-center">
            1 ETH = {data[3].result.toString()} ${ticker}
          </p>
        )}
      </div>
    </div>
  );
};

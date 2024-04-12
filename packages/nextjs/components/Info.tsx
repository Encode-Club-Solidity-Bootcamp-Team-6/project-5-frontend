import { FC } from "react";
import { abi } from "../../hardhat/artifacts/contracts/Lottery.sol/Lottery.json";
import { useContractReads } from "wagmi";

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
    ],
  });

  console.log(data);

  return (
    <div className="flex flex-col bg-base-100 px-10 pb-5 rounded-3xl">
      <p className="text-lg font-bold text-left align-top">Info</p>
      <div className="flex flex-wrap justify-start gap-4">
        {data && data[0].status === "success" && <p className="text-sm">Bet Fee: {data[0].result.toString()}</p>}
        {data && data[1].status === "success" && <p className="text-sm">Bets Opened: {data[1].result.toString()}</p>}
        {data && data[2].status === "success" && <p className="text-sm">Prize Pool: {data[2].result.toString()}</p>}
        {data && data[3].status === "success" && <p className="text-sm">Purchase Ratio: {data[3].result.toString()}</p>}
        {data && data[4].status === "success" && <p className="text-sm">Bets Prize: {data[4].result.toString()}</p>}
      </div>
    </div>
  );
};

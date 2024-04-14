import { abi } from "../../hardhat/artifacts/contracts/Lottery.sol/Lottery.json";
import { useContractReads } from "wagmi";

type ContractReadsOutput = {
  data?: any[];
  isError: boolean;
  isLoading: boolean;
};

const useLottery = (lotteryAddress: string) => {
  const lotteryContract = {
    address: lotteryAddress,
    abi: abi as any,
  };

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

  const ticker = "FIRE"; // TODO get from contract

  const lottery = {
    betFee: data && data[0].status === "success" ? data[0].result : 0,
    betsOpen: data && data[1].status === "success" ? data[1].result : false,
    prizePool: data && data[2].status === "success" ? data[2].result : 0,
    purchaseRatio: data && data[3].status === "success" ? data[3].result : 0,
    betPrice: data && data[4].status === "success" ? data[4].result : 0,
    paymentToken: data && data[5].status === "success" ? data[5].result : null,
    ticker,
  };

  return { lottery, isError, isLoading };
};

export default useLottery;

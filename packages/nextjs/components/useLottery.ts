import { abi } from "../../hardhat/artifacts/contracts/Lottery.sol/Lottery.json";
import { abi as tokenAbi } from "../../hardhat/artifacts/contracts/LotteryToken.sol/LotteryToken.json";
import { useAccount, useContractReads } from "wagmi";

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

  const account = useAccount();

  const tokenContract = {
    address: data?.[5].result as string,
    abi: tokenAbi as any,
  };

  const { data: dataToken } = useContractReads({
    contracts: [
      {
        ...tokenContract,
        functionName: "symbol",
      },
      {
        ...tokenContract,
        functionName: "balanceOf",
        args: [account.address],
      },
    ],
  });

  const lottery = {
    betFee: data && data[0].status === "success" ? data[0].result : 0,
    betsOpen: data && data[1].status === "success" ? data[1].result : false,
    prizePool: data && data[2].status === "success" ? data[2].result : 0,
    purchaseRatio: data && data[3].status === "success" ? data[3].result : 0,
    betPrice: data && data[4].status === "success" ? data[4].result : 0,
    paymentToken: data && data[5].status === "success" ? data[5].result : null,
    ticker: dataToken && dataToken[0].status === "success" ? dataToken[0].result : "Unknown",
  };

  const balance = dataToken && dataToken[1].status === "success" ? dataToken[1].result : 0;

  return { lottery, balance, isError, isLoading };
};

export default useLottery;

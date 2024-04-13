// user should be able to see their bets and place new bets
import { FC, useState } from "react";
import { abi } from "../../hardhat/artifacts/contracts/Lottery.sol/Lottery.json";
import { IntegerInput } from "./scaffold-eth";
import { useContractReads } from "wagmi";

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

  const ticker = "FIRE"; // TODO get from contract

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
            1 Bet = {data && data[0].status === "success" && data[4].result.toString()} ${ticker}
          </p>
          <p className="text-xs m-2">
            Bet Fee: {data && data[0].status === "success" && data[0].result.toString()} ${ticker}
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

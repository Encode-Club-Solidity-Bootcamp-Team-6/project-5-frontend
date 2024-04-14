// admin should be able to see the bets and close the lottery
// admin should be able to see the results
// admin should be able to see the winners
// admin should be able to run the lottery
// admin should be able to see and adjust the lottery parameters
// users should be able to see their prizes and claim new prizes
// if the lottery is still open, users should be able to see that
// // if the lottery is closed, users should be able to see the results
import { FC, useState } from "react";
import { abi } from "../../hardhat/artifacts/contracts/Lottery.sol/Lottery.json";
import { IntegerInput } from "./scaffold-eth";
import { useAccount, useContractReads, useContractWrite } from "wagmi";

export const LotteryAdmin: FC<{ lotteryAddress: `0x${string}` }> = ({ lotteryAddress }) => {
  const account = useAccount();
  const [openBetsUnixTimestamp, setOpenBetsUnixTimestamp] = useState<bigint | string>(0n);

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
        functionName: "prize",
        args: [account.address],
      },
      {
        ...lotteryContract,
        functionName: "betsOpen",
      },
      {
        ...lotteryContract,
        functionName: "paymentToken",
      },
    ],
  });

  const {
    data: dataOpenBets,
    isError: isErrorOpenBets,
    error: errorOpenBets,
    isLoading: isLoadingOpenBets,
    isSuccess: isSuccessOpenBets,
    write: writeOpenBets,
  } = useContractWrite({
    address: lotteryAddress,
    abi,
    functionName: "openBets",
    args: [openBetsUnixTimestamp],
  });

  const {
    data: dataCloseBets,
    isError: isErrorCloseBets,
    error: errorCloseBets,
    isLoading: isLoadingCloseBets,
    isSuccess: isSuccessCloseBets,
    write: writeCloseBets,
  } = useContractWrite({
    address: lotteryAddress,
    abi,
    functionName: "closeLottery",
  });

  const betsOpen = data && data[1].status === "success" ? data[1].result : false;
  let statusMessage = "";
  if (isLoadingOpenBets || isLoadingCloseBets) statusMessage = "Loading...";
  else if (isErrorOpenBets || isErrorCloseBets)
    statusMessage = `Error: ${errorOpenBets?.message} ${errorCloseBets?.message}`;
  else if (isSuccessOpenBets || isSuccessCloseBets)
    statusMessage = `Success: ${JSON.stringify(dataOpenBets)} ${JSON.stringify(dataCloseBets)}`;

  console.log(openBetsUnixTimestamp);

  return (
    <div className="flex flex-col bg-base-100 px-10 py-5 rounded-3xl h-[100%]">
      <p className="text-sm font-bold text-left align-top">Admin Dashboard</p>

      <div className="flex flex-col gap-8 justify-center h-[100%]">
        <div className="flex flex-col gap-2">
          <IntegerInput
            value={openBetsUnixTimestamp}
            onChange={newVal => setOpenBetsUnixTimestamp(newVal)}
            placeholder="Unix Timestamp"
            disableMultiplyBy1e18
          />
          <button className="btn btn-primary w-48 self-center" disabled={betsOpen} onClick={() => writeOpenBets()}>
            Open Lottery
          </button>
        </div>
        <div className="w-40 h-1 bg-slate-700 rounded-sm self-center" />
        <button className="btn btn-primary w-48 self-center" onClick={() => writeCloseBets()}>
          Close Lottery
        </button>
        <span className="text-wrap max-w-xs">{statusMessage}</span>
      </div>
    </div>
  );
};

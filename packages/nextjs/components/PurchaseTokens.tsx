import { FC, useState } from "react";
import { abi } from "../../hardhat/artifacts/contracts/Lottery.sol/Lottery.json";
import { abi as tokenAbi } from "../../hardhat/artifacts/contracts/LotteryToken.sol/LotteryToken.json";
import { Address, EtherInput } from "./scaffold-eth";
import { formatEther, parseEther } from "viem";
import { useAccount, useContractRead, useContractReads, useContractWrite } from "wagmi";

export const PurchaseTokens: FC<{ lotteryAddress: `0x${string}` }> = ({ lotteryAddress }) => {
  const account = useAccount();
  const [value, setValue] = useState("");

  const {
    data: paymentToken,
    isError: isErrorPaymentToken,
    isLoading: isLoadingPaymentToken,
  } = useContractRead({
    address: lotteryAddress,
    abi,
    functionName: "paymentToken",
  });

  const tokenContract = {
    address: (paymentToken as string) || "",
    abi: tokenAbi as any,
  };

  const {
    data: tokenData,
    isError: tokenIsError,
    isLoading: tokenIsLoading,
  } = useContractReads({
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

  const { data, isError, error, isLoading, isSuccess, write } = useContractWrite({
    address: lotteryAddress,
    abi,
    functionName: "purchaseTokens",
    value: parseEther(value),
  });

  let statusMessage = "";
  if (isLoading) statusMessage = "Loading...";
  else if (isError) statusMessage = `Error: ${error?.message}`;
  else if (isSuccess) statusMessage = `Success: ${JSON.stringify(data)}`;

  const ticker = tokenData && tokenData[0].status === "success" ? tokenData[0].result : "Unknown";
  const lotteryTokens =
    tokenData && tokenData[1].status === "success" ? (tokenData[1].result as unknown as bigint) : 0n;

  return (
    <div className="flex flex-col bg-base-100 px-10 py-5 rounded-3xl h-[100%]">
      <p className="text-sm font-bold text-left align-top">Purchase Lottery Tokens</p>
      <div className="flex flex-col gap-4">
        {(paymentToken as string) && !isErrorPaymentToken && <Address size="xs" address={paymentToken as string} />}
        <EtherInput value={value} onChange={setValue} placeholder="1 ETH" />
        <button className="btn btn-primary w-48 self-center" disabled={isLoading || !value} onClick={() => write()}>
          Purchase
        </button>
        <span className="text-wrap max-w-xs">{statusMessage}</span>
        <p className="text-sm">
          Your Tokens: {formatEther(lotteryTokens)} ${ticker}
        </p>
      </div>
    </div>
  );
};

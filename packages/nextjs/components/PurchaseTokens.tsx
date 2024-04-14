import { FC, useState } from "react";
import { abi } from "../../hardhat/artifacts/contracts/Lottery.sol/Lottery.json";
import { Address, EtherInput } from "./scaffold-eth";
import useLottery from "./useLottery";
import { parseEther } from "viem";
import { useContractWrite } from "wagmi";

export const PurchaseTokens: FC<{ lotteryAddress: `0x${string}` }> = ({ lotteryAddress }) => {
  const [value, setValue] = useState("");

  // TODO implement function to get user's lottery tokens
  const [lotteryTokens, setLotteryTokens] = useState(0);

  const { lottery, balance } = useLottery(lotteryAddress);

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

  return (
    <div className="flex flex-col bg-base-100 px-10 py-5 rounded-3xl h-[100%]">
      <p className="text-sm font-bold text-left align-top">Purchase Lottery Tokens</p>
      <div className="flex flex-col gap-4">
        <Address size="xs" address={lottery.paymentToken as string} />
        <EtherInput value={value} onChange={setValue} placeholder="1 ETH" />
        <button className="btn btn-primary w-48 self-center" disabled={isLoading || !value} onClick={() => write()}>
          Purchase
        </button>
        <span className="text-wrap max-w-xs">{statusMessage}</span>
        <p className="text-sm">
          Your Tokens: {balance} ${lottery.ticker}
        </p>
      </div>
    </div>
  );
};

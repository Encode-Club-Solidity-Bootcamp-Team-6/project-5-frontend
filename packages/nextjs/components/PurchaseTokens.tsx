import { FC, useState } from "react";
import { abi } from "../../hardhat/artifacts/contracts/Lottery.sol/Lottery.json";
import { EtherInput } from "./scaffold-eth";
import { parseEther } from "viem";
import { useContractWrite } from "wagmi";

export const PurchaseTokens: FC<{ lotteryAddress: `0x${string}` }> = ({ lotteryAddress }) => {
  const [value, setValue] = useState("0");

  const { data, isError, error, isLoading, isSuccess, write } = useContractWrite({
    address: lotteryAddress,
    abi,
    functionName: "purchaseTokens",
    args: [parseEther(value)],
  });

  let statusMessage = "";
  if (isLoading) statusMessage = "Loading...";
  else if (isError) statusMessage = `Error: ${error?.message}`;
  else if (isSuccess) statusMessage = `Success: ${JSON.stringify(data)}`;

  return (
    <div className="flex flex-col bg-base-100 px-10 py-5 rounded-3xl">
      <p className="text-sm font-bold text-left align-top">Purchase Lottery Tokens</p>
      <div className="flex flex-col gap-4">
        <EtherInput value={value} onChange={setValue} />
        <button className="btn btn-primary w-48 self-center" disabled={isLoading || !value} onClick={() => write()}>
          Purchase
        </button>
        <span className="text-wrap max-w-xs">{statusMessage}</span>
      </div>
    </div>
  );
};

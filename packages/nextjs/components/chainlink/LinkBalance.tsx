"use client";

import { Address, formatEther } from "viem";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { useWatchBalance } from "~~/hooks/scaffold-eth/useWatchBalance";
import { useGlobalState } from "~~/services/store/store";
import { ccipAddresses } from "~~/utils/chainlink/networks";

type BalanceProps = {
  address?: Address;
  className?: string;
};

/**
 * Display LINK balance of an ETH address.
 */
export const LinkBalance = ({ address, className = "" }: BalanceProps) => {
  const { targetNetwork } = useTargetNetwork();

  const linkTokenAddress =
    targetNetwork?.name && ccipAddresses[targetNetwork.name] ? ccipAddresses[targetNetwork.name].link : null;

  const {
    data: balance,
    isError,
    isLoading,
  } = useWatchBalance({
    address,
    token: linkTokenAddress!,
  });

  if (!address || isLoading || balance === null) {
    return (
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-md bg-slate-300 h-6 w-6"></div>
        <div className="flex items-center space-y-6">
          <div className="h-2 w-28 bg-slate-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`border-2 border-gray-400 rounded-md px-2 flex flex-col items-center max-w-fit cursor-pointer`}>
        <div className="text-warning">Error</div>
      </div>
    );
  }

  const formattedBalance = balance ? Number(formatEther(balance.value)) : 0;

  return (
    <button className={`btn btn-sm btn-ghost flex flex-col font-normal items-center hover:bg-transparent ${className}`}>
      <div className="w-full flex items-center justify-center">
        <>
          <span>{formattedBalance.toFixed(4)}</span>
          <span className="text-[0.8em] font-bold ml-1">LINK</span>
        </>
      </div>
    </button>
  );
};

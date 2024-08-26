"use client";

import { useState } from "react";
import Link from "next/link";
import Receiver from "./_components/Receiver";
// Import the network configuration
import Sender from "./_components/Sender";
import type { NextPage } from "next";
import { useAccount, useSwitchChain } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { NetworkOptions } from "~~/components/scaffold-eth/RainbowKitCustomConnectButton/NetworkOptions";
import networks from "~~/utils/chainlink/networks";

const CcipPage: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <div className="px-5">
        <h1 className="text-center">
          <span className="block text-2xl mb-2">CCIP</span>
        </h1>
      </div>

      <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
        <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
          <Sender />
          <Receiver />
        </div>
      </div>
    </div>
  );
};

export default CcipPage;

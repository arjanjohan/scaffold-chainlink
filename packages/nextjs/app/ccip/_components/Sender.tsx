"use client";

import { useRef, useState } from "react";
import { useAccount } from "wagmi";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { NetworkOptions } from "~~/components/scaffold-eth/RainbowKitCustomConnectButton/NetworkOptions";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract, useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import networks from "~~/utils/chainlink/networks";
import { LinkBalance } from "~~/components/chainlink/LinkBalance";

const Sender: React.FC = () => {
    const contractName = "Sender";
  const { address, chain } = useAccount();
  const [message, setMessage] = useState("");
  const [destinationNetwork, setDestinationNetwork] = useState("");
  const [ccipChainId, setCcipChainId] = useState<number | undefined>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setIsDropdownOpen(false));

  const { data: deployedContractData, isLoading: deployedContractLoading } = useDeployedContractInfo(contractName);
  const handleNetworkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = networks.find(network => network.name === e.target.value);
    setDestinationNetwork(selected?.name);
    setCcipChainId(selected?.ccipChainId);
  };

  const { writeContractAsync: writeSender, isPending: isPendingSender } = useScaffoldWriteContract(contractName);

  const sendMessage = async () => {
    if (!address) {
      console.log("No address available");
      return;
    }
    if (!ccipChainId) {
        console.log("No ccipChainId available");
        return;
    }

    try {
      console.log("Sending message...");
        console.log("destinationNetwork message...", ccipChainId);
      await writeSender({
        functionName: "sendMessage",
        args: [BigInt(ccipChainId), address, message],
      });
      console.log("Message sent!");
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
      <h2 className="text-2xl font-bold mb-4">Sender</h2>
      <div className="flex gap-1 items-center">
        <span className="font-bold text-sm">Balance:</span>
        {isPendingSender && <span className="loading loading-spinner loading-xs"></span>}

        {!deployedContractLoading && deployedContractData &&
        <LinkBalance address={deployedContractData.address} className="px-0 h-1.5 min-h-[0.375rem]" />
        }
    </div>
      <input
        type="text"
        placeholder="Enter your message"
        value={message}
        onChange={e => setMessage(e.target.value)}
        className="input input-bordered w-full mb-4"
      />
      <select
        value={destinationNetwork || ""}
        onChange={handleNetworkChange}
        className="select select-bordered w-full mb-4"
      >
        <option value="" disabled>
          Select destination network
        </option>
        {networks.map(network => (
          <option key={network.chainId} value={network.name}>
            {network.name}
          </option>
        ))}
      </select>
      <div className="mb-4 w-full">
        <label className="block text-left font-medium mb-2">Current Network</label>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="select select-bordered w-full text-left flex items-center justify-between"
          >
            <span>{chain?.name || "Unknown"}</span>
            <ChevronDownIcon className="h-5 w-5" />
          </button>
          <ul
            className={`absolute left-0 right-0 mt-1 bg-base-100 border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto ${
              isDropdownOpen ? "block" : "hidden"
            }`}
          >
            <NetworkOptions hidden={false} />
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-3 py-5 first:pt-0 last:pb-1">
        <div className="flex justify-between gap-2 flex-wrap">
          <button className={`btn btn-accent btn-sm`} disabled={isPendingSender} onClick={sendMessage}>
            {isPendingSender && <span className="loading loading-spinner loading-xs"></span>}
            {isPendingSender ? "Sending message" : "Send message"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sender;

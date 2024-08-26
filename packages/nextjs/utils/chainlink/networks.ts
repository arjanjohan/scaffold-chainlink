// networks.ts
interface NetworkConfig {
  name: string;
  chainId: number;
  ccipChainId: number;
}

const networks: NetworkConfig[] = [
  {
    name: "Sepolia",
    chainId: 11155111,
    ccipChainId: 16015286601757825753,
  },
  {
    name: "OP Sepolia",
    chainId: 5224473277236331295,
    ccipChainId: 3,
  },
  {
    name: "Avalanche Fuji",
    chainId: 43113,
    ccipChainId: 14767482510784806043,
  },
];

export default networks;

// networks.ts
interface NetworkConfig {
  name: string;
  chainId: number;
  ccipChainId: number;
}

export const networks: NetworkConfig[] = [
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

// ccipAddresses.ts
interface CcipAddresses {
  [network: string]: {
    router: string;
    link: string;
  };
}

export const ccipAddresses: CcipAddresses = {
  "Avalanche Fuji": {
    router: "0xF694E193200268f9a4868e4Aa017A0118C9a8177",
    link: "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846",
  },
  "OP Sepolia": {
    router: "0x114A20A10b43D4115e5aeef7345a1A71d2a60C57",
    link: "0xE4aB69C077896252FAFBD49EFD26B5D171A32410",
  },
  Sepolia: {
    router: "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59",
    link: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
  },
};

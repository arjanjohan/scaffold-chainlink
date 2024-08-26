import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";
import ccipAddresses from "../ccipAddresses";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployCcipContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const networkName = hre.network.name;
  console.log("Network name", networkName);

  const addresses = ccipAddresses[networkName];

  if (!addresses) {
    throw new Error(`No router and link addresses configured for network: ${networkName}`);
  }

  const router = "0xF694E193200268f9a4868e4Aa017A0118C9a8177";
  const link = "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846";

  await deploy("Sender", {
    from: deployer,
    // Contract constructor arguments
    args: [router, link],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  await deploy("Receiver", {
    from: deployer,
    // Contract constructor arguments
    args: [router],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  // Get the deployed contracts to interact with it after deploying.
  const sender = await hre.ethers.getContract<Contract>("Sender", deployer);
  const receiver = await hre.ethers.getContract<Contract>("Receiver", deployer);
  // console.log("👋 Initial greeting:", await yourContract.greeting());
};

export default deployCcipContracts;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployCcipContracts.tags = ["CcipContracts"];

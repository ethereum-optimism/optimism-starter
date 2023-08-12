import { ethers } from "ethers";
import {
  EthersAdapter,
  SafeAccountConfig,
  SafeFactory,
} from "@safe-global/protocol-kit";
import SafeApiKit from "@safe-global/api-kit";

function createWalletSignerandOwner() {
  // init signer, provider, eth adapter
  const RPC_URL = "https://base-goerli.public.blastapi.io";
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  console.log(process.env.OWNER_1_PRIVATE_KEY);

  const owner1Signer = new ethers.Wallet(
    process.env.OWNER_1_PRIVATE_KEY,
    provider
  );
  const ethAdapterOwner1 = new EthersAdapter({
    ethers,
    signerOrProvider: owner1Signer,
  });

  return { owner1Signer, ethAdapterOwner1 };
}

export const ceateSafe = async (): Promise<string> => {
  const { owner1Signer, ethAdapterOwner1 } = createWalletSignerandOwner();
  // init Protocol Kit
  const safeFactory = await SafeFactory.create({
    ethAdapter: ethAdapterOwner1,
  });

  // create Safe Wallet
  const safeAccountConfig: SafeAccountConfig = {
    owners: [await owner1Signer.getAddress()],
    threshold: 1,
    // ... (Optional params)
  };

  //    This Safe is tied to owner 1 because the factory was initialized with
  // an adapter that had owner 1 as the signer.
  const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig });

  const safeAddress = await safeSdkOwner1.getAddress();

  console.log("Your Safe has been deployed:");
  console.log(`https://goerli.basescan.org/address/${safeAddress}`);
  console.log(`https://app.safe.global/base-gor::${safeAddress}`);

  return safeAddress;
};

// init SafeAPI
// const txServiceUrl = "https://safe-transaction-base-testnet.safe.global";
// const safeService = new SafeApiKit({
//   txServiceUrl,
//   ethAdapter: ethAdapterOwner1,
// });

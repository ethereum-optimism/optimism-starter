// Required libraries and contracts
import { ethers } from "ethers";
import UniswapV2generator from "./UniswapV2generator.ts"; // Your GroupGenerator implementation
import { UniswapV2DataProvider } from "./data-collection/uniswapv2.ts"; // Your Uniswap data provider
import DataGroupABI from "./DataGroupABI.json"; // Your DataGroup contract ABI

// Connect to the Ethereum node
const provider = new ethers.providers.JsonRpcProvider(
  process.env.ETHEREUM_RPC_URL,
);
const signer = provider.getSigner();

// Initialize the Uniswap data provider
const uniswapDataProvider = new UniswapV2DataProvider(
  process.env.UNISWAP_V2_SUBGRAPH_URL,
);

// Initialize the GroupGenerator with the data provider
const groupGenerator = new GroupGenerator(uniswapDataProvider);

// Initialize the DataGroup contract
const dataGroupContract = new ethers.Contract(
  process.env.DATAGROUP_CONTRACT_ADDRESS,
  DataGroupABI,
  signer,
);

async function generateGroups(address: string) {
  try {
    // Fetch the user data from Uniswap
    const userData = await uniswapDataProvider.getUserData(address);

    // Generate the groups based on the user data
    const groups = groupGenerator.generateGroups(userData);

    // For each group, call the addGroup method on the DataGroup contract
    for (const group of groups) {
      const tx = await dataGroupContract.addGroup(
        group.id,
        group.symbol,
        group.members,
        group.metadata,
      );
      const receipt = await tx.wait();

      // Log the transaction receipt
      console.log(
        `Group ${group.symbol} added with transaction hash: ${receipt.transactionHash}`,
      );
    }
  } catch (error) {
    console.error(`Failed to generate groups for address ${address}: ${error}`);
  }
}

// Generate groups for a given Ethereum address
generateGroups("0xYourEthereumAddressHere")
  .then(() => console.log("Group generation completed"))
  .catch((error) => console.error("Group generation failed:", error));

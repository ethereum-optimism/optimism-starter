import { ethers } from 'ethers';
import { SismoSDK } from '@sismo/sdk';

// initialize the Sismo SDK
const sismo = new SismoSDK(ethers.provider);

// Instantiate the operator contract
const operatorContract = sismo.getOperatorContract();

// Define a function to store data in a data group
async function storeData(operatorContract, dataGroupAddress, data) {
try {
// Batch data to minimize gas costs
// Note: This is a simple batching strategy. Depending on your data size and structure,
// you may need to implement a more complex batching algorithm.
const batchSize = 100;
for (let i = 0; i < data.length; i += batchSize) {
const dataBatch = data.slice(i, i + batchSize);

// Call the addData method on the operator contract
  const addDataTx = await operatorContract.addData(dataGroupAddress, dataBatch);

  // Wait for the transaction to be mined
  const receipt = await addDataTx.wait();

  // Log the receipt for debugging purposes
  console.log(receipt);
}

} catch (error) {
console.error(Failed to store data in data group ${dataGroupAddress}: ${error});
}
}

// Now we can store the fetched data in the corresponding data groups
await storeData(operatorContract, uniswapSwapsDataGroupAddress, uniswapSwapsData);
await storeData(operatorContract, uniswapLiquidityPositionsDataGroupAddress, uniswapLiquidityPositionsData);
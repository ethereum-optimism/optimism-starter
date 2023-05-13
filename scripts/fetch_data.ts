import { ethers } from 'ethers';
import { SismoSDK } from '@sismo/sdk';

// initialize the Sismo SDK
const sismo = new SismoSDK(ethers.provider);

// Define a function to create a data group
async function createDataGroup(factoryContract, name, symbol, metaData) {
try {
// Call the createDataGroup method on the factory contract
const createDataGroupTx = await factoryContract.createDataGroup(name, symbol, metaData);

// Wait for the transaction to be mined
const receipt = await createDataGroupTx.wait();

// Log the receipt for debugging purposes
console.log(receipt);

// The DataGroupCreated event is emitted upon successful creation of a data group.
// We can extract the address of the newly created data group from the event logs.
const dataGroupCreatedEvent = receipt.events?.find((e) => e.event === 'DataGroupCreated');
const dataGroupAddress = dataGroupCreatedEvent?.args?.dataGroup;

console.log(`Data group ${name} created at address: ${dataGroupAddress}`);

return dataGroupAddress;

} catch (error) {
console.error(Failed to create data group ${name}: ${error});
}
}

// Now we can create data groups for Uniswap v2 data
const uniswapSwapsDataGroupAddress = await createDataGroup(sismo.factory, 'Uniswap V2 Swaps Data', 'UNIV2SWAPS', 'Swaps data from Uniswap V2 subgraph');
const uniswapLiquidityPositionsDataGroupAddress = await createDataGroup(sismo.factory, 'Uniswap V2 Liquidity Positions Data', 'UNIV2LP', 'Liquidity positions data from Uniswap V2 subgraph');

// Store the data group addresses for later use
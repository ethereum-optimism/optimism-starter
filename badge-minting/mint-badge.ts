import { ethers } from 'ethers';
import { SismoSDK } from '@sismo/sdk';

// Initialize the Sismo SDK
const sismo = new SismoSDK(ethers.provider);

// Badge tiers
const BADGE_TIERS = ['Bronze', 'Silver', 'Gold', 'Platinum'];

// Function to create a new Soulbound token (badge)
async function createBadge(factoryContract, name, symbol, metadata) {
try {
const createBadgeTx = await factoryContract.createSoulboundToken(name, symbol, metadata);
const receipt = await createBadgeTx.wait();
const badgeCreatedEvent = receipt.events?.find((e) => e.event === 'SoulboundTokenCreated');
const badgeAddress = badgeCreatedEvent?.args?.soulboundToken;
console.log(Badge ${name} created at address: ${badgeAddress});
return badgeAddress;
} catch (error) {
console.error(Failed to create badge ${name}: ${error});
}
}

// Function to mint a badge
async function mintBadge(operatorContract, badgeAddress, recipient, tokenId) {
try {
const mintBadgeTx = await operatorContract.mint(badgeAddress, recipient, tokenId);
const receipt = await mintBadgeTx.wait();
console.log(Minted badge for user ${recipient} with token ID ${tokenId}:, receipt);
} catch (error) {
console.error(Failed to mint badge: ${error});
}
}

// Function to fetch user data
async function getUserData(address) {
// Fetch and process the data for a user's Ethereum address
const userData = await fetchUserData(address);
console.log('User Data:', userData);
return userData;
}

// Function to check the eligibility of a user for a badge, create the badge if not exists, and mint the badge
async function createBadgeIfEligible(badge, userData, userAddress) {
const badges = calculateBadges(userData);
if (badges.includes(badge)) {
const badgeName = badge.split(' ')[0];  // e.g., 'Bronze Trader'
const badgeSymbol = badgeName.replace(' ', '_').toUpperCase();  // e.g., 'BRONZE_TRADER'
const badgeAddress = await createBadge(sismo.factory, badgeName, badgeSymbol, { description: Earned for <span class="math-inline">\{badgeName\.toLowerCase\(\)\}\ });
// Mint the badge for the user
const tokenId = BADGE_TIERS.indexOf(badgeName.split(' ')[0]);  // e.g., 0 for 'Bronze', 1 for 'Silver', etc.
await mintBadge(sismo.operator, badgeAddress, userAddress, tokenId);
}
}
// Fetch and process the data for a user's Ethereum address
getUserData('0xYourEthereumAddressHere')
.then(userData => {
// Trader Badges
['Bronze Trader', 'Silver Trader', 'Gold Trader', 'Platinum Trader'].forEach(badge => {
createBadgeIfEligible(`{badge} Badge`, userData, '0xYourEthereumAddressHere');
});
// Active Trader Badges
['Bronze Active Trader', 'Silver Active Trader', 'Gold Active Trader'].forEach(badge => {
  createBadgeIfEligible(`${badge} Badge`, userData, '0xYourEthereumAddressHere');
// Provider Badges
    ['Bronze Provider', 'Silver Provider', 'Gold Provider', 'Platinum Provider'].forEach(badge => {
      createBadgeIfEligible(`${badge} Badge`, userData, '0xYourEthereumAddressHere');
    });

    // First Trade Badge
    if (userData.firstTradeTimestamp) {
      createBadgeIfEligible('First Trade Badge', userData, '0xYourEthereumAddressHere');
    }

    // Remember that for now, Early Liquidity Provider and Diversified Provider badges are ignored.
  })
  .catch(error => console.error('Error fetching data:', error));
}
// Badge criteria constants
const VOLUME_TIERS = [1000, 10000, 100000, 1000000];
const TRADE_TIERS = [10, 100, 1000];
const LIQUIDITY_TIERS = [1000, 10000, 100000, 1000000];

function calculateBadges(userData) {
  const badges = [];

  // First Trade Badge
  if (userData.firstTradeTimestamp) {
    badges.push("First Trade Badge");
  }

  // Volume Badges
  const volumeBadgeIndex = VOLUME_TIERS.findIndex(
    (tier) => userData.totalTradeVolume < tier,
  );
  if (volumeBadgeIndex !== -1) {
    badges.push(
      ["Bronze Trader", "Silver Trader", "Gold Trader", "Platinum Trader"][
        volumeBadgeIndex
      ] + " Badge",
    );
  }

  // Active Trader Badge
  const tradeBadgeIndex = TRADE_TIERS.findIndex(
    (tier) => userData.totalTrades < tier,
  );
  if (tradeBadgeIndex !== -1) {
    badges.push(
      ["Bronze Active Trader", "Silver Active Trader", "Gold Active Trader"][
        tradeBadgeIndex
      ] + " Badge",
    );
  }

  // Liquidity Provider Badges
  const liquidityBadgeIndex = LIQUIDITY_TIERS.findIndex(
    (tier) => userData.totalLiquidityProvided < tier,
  );
  if (liquidityBadgeIndex !== -1) {
    badges.push(
      [
        "Bronze Provider",
        "Silver Provider",
        "Gold Provider",
        "Platinum Provider",
      ][liquidityBadgeIndex] + " Badge",
    );
  }

  return badges;
}

// Fetch and process the data for a user's Ethereum address
fetchUserData("0xYourEthereumAddressHere")
  .then((userData) => {
    console.log("User Data:", userData);
    const badges = calculateBadges(userData);
    console.log("User Badges:", badges);
  })
  .catch((error) => console.error("Error fetching data:", error));

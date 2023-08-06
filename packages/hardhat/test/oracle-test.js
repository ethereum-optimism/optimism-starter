const { expect } = require("chai");
const { ethers } = require("hardhat");
const { WrapperBuilder } = require("redstone-evm-connector");

// You can find more details about RedStone oracles here: https://tinyurl.com/redstone-celo-docs

describe("Oracle", function () {
  it("Should correctly calculate CELO tokens amount for $100", async function () {
    const Oracle = await ethers.getContractFactory("Oracle");
    const oracle = await Oracle.deploy();
    await oracle.deployed();

    const usdAmount = ethers.utils.parseEther("100");
    const wrappedContract = WrapperBuilder
      .wrapLite(oracle)
      .usingPriceFeed("redstone", { asset: "CELO" });
    const celoAmount = await wrappedContract.getCELOAmountForUSDAmount(usdAmount);
    const humanFriendlyCeloAmount = ethers.utils.formatEther(celoAmount);

    expect(Number(humanFriendlyCeloAmount)).to.be.lessThan(100); // It means that CELO price is higher than $1

    // Print celo amount
    console.log(`Celo amount for $100: ${humanFriendlyCeloAmount} CELO`);
  });
});

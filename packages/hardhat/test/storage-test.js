const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Storage", function () {
  it("Should return the new storaged value once it's changed", async function () {
    const Storage = await ethers.getContractFactory("Storage");
    const storage = await Storage.deploy();
    await storage.deployed();

    expect(await storage.retrieve()).to.equal(1);

    const setStorageTx = await storage.store(42220);

    // wait until the transaction is mined
    await setStorageTx.wait();

    expect(await storage.retrieve()).to.equal(42220);
  });
});

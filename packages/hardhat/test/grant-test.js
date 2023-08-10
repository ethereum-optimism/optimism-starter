const utils = require("@gnosis.pm/safe-contracts/test/utils/general");

const truffleContract = require("@truffle/contract");

const GnosisSafeBuildInfo = require("@gnosis.pm/safe-contracts/build/contracts/GnosisSafe.json");
const GnosisSafe = truffleContract(GnosisSafeBuildInfo);
GnosisSafe.setProvider(web3.currentProvider);
const GnosisSafeProxyBuildInfo = require("@gnosis.pm/safe-contracts/build/contracts/GnosisSafeProxy.json");
const GnosisSafeProxy = truffleContract(GnosisSafeProxyBuildInfo);
GnosisSafeProxy.setProvider(web3.currentProvider);

const GrantModule = artifacts.require("./Grant.sol");
const TestToken = artifacts.require("./TestToken.sol");

contract("GrantModule delegate", function (accounts) {
  let lw;
  let gnosisSafe;
  let safeModule;

  const CALL = 0;
  const ADDRESS_0 = "0x0000000000000000000000000000000000000000";

  beforeEach(async function () {
    // Create lightwallet
    lw = await utils.createLightwallet();

    // Create Master Copies
    let gmodule = await GrantModule.deployed();
    console.log(gmodule.address);
    safeModule = await GrantModule.new();

    const gnosisSafeMasterCopy = await GnosisSafe.new({ from: accounts[0] });
    const proxy = await GnosisSafeProxy.new(gnosisSafeMasterCopy.address, {
      from: accounts[0],
    });
    gnosisSafe = await GnosisSafe.at(proxy.address);
    await gnosisSafe.setup(
      [lw.accounts[0], lw.accounts[1], accounts[1]],
      2,
      ADDRESS_0,
      "0x",
      ADDRESS_0,
      ADDRESS_0,
      0,
      ADDRESS_0,
      { from: accounts[0] }
    );
  });

  let execTransaction = async function (to, value, data, operation, message) {
    let nonce = await gnosisSafe.nonce();
    let transactionHash = await gnosisSafe.getTransactionHash(
      to,
      value,
      data,
      operation,
      0,
      0,
      0,
      ADDRESS_0,
      ADDRESS_0,
      nonce
    );
    let sigs = utils.signTransaction(
      lw,
      [lw.accounts[0], lw.accounts[1]],
      transactionHash
    );
    utils.logGasUsage(
      "execTransaction " + message,
      await gnosisSafe.execTransaction(
        to,
        value,
        data,
        operation,
        0,
        0,
        0,
        ADDRESS_0,
        ADDRESS_0,
        sigs,
        { from: accounts[0] }
      )
    );
  };

  it("Create grant", async () => {
    let enableModuleData = await gnosisSafe.contract.methods
      .enableModule(safeModule.address)
      .encodeABI();
    await execTransaction(
      gnosisSafe.address,
      0,
      enableModuleData,
      CALL,
      "enable module"
    );
    let modules = await gnosisSafe.getModules();
    assert.equal(1, modules.length);
    assert.equal(safeModule.address, modules[0]);

    // Add delegates
    let creatGrant1 = await safeModule.contract.methods
      .setGrant(lw.accounts[4], lw.accounts[1], 20, 2, "abcde")
      .encodeABI();
    await execTransaction(
      safeModule.address,
      0,
      creatGrant,
      CALL,
      "create Grant 1"
    );

    let creatGrant2 = await safeModule.contract.methods
      .setGrant(lw.accounts[5], lw.accounts[1], 40, 2, "fghij")
      .encodeABI();
    await execTransaction(
      safeModule.address,
      0,
      creatGrant2,
      CALL,
      "create Grant 1"
    );

    let grant = await safeModule.getGrant(lw.accounts[4]);
    assert.equal(grant[_granteeAddress].delegate, lw.accounts[1]);
    assert.equal(grant[_granteeAddress].amount, 20);
    assert.equal(grant[_granteeAddress].milestoneAmount, 2);
  });
});

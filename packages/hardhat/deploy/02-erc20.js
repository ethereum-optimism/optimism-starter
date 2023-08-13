const { ethers } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
    // Named Accounts are for improving developer experience, can be configured in hardhat.config.js
    const { deployer, alice } = await getNamedAccounts();
    const { deploy } = deployments;

    let ERC20 = await deploy("ERC20 Token", {
        from: deployer,
        contract: "ERC20",
        args: ["Test Token", "TT"],
        log: true,
    });

    let erc20 = await ethers.getContractAt("ERC20", ERC20.address);

    let allowance = await erc20.allowance(erc20.address, alice);
    console.log(allowance);
};

module.exports.tags = ["ERC20"];

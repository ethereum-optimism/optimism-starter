module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("Grant", {
    from: deployer,
    log: true,
  });
};

// deployed address: 0xd9145CCE52D386f254917e481eB44e9943F39138

/**
 * Use tags to run specific deploy scripts
 * For example:- npx hardhat deploy --tags Storage will run only this script
 */
module.exports.tags = ["Grant"];

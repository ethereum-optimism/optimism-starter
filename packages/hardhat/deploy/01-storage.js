module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    await deploy("Storage", {
        // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
        from: deployer,
        //args: [ "Hello", ethers.utils.parseEther("1.5") ],
        log: true,
    });
};

/**
 * Use tags to run specific deploy scripts
 * For example:- npx hardhat deploy --tags Storage will run only this script
 */
module.exports.tags = ["Storage"];

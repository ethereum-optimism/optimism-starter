module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts();
    const { deploy } = deployments;

    await deploy("ERC1155 Token", {
        from: deployer,
        contract: "ERC1155",
        args: ["some uri"],
        log: true,
    });
};

module.exports.tags = ["ERC1155"];

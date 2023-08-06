module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts();
    const { deploy } = deployments;

    await deploy("ERC721 Token", {
        from: deployer,
        contract: "ERC721",
        args: ["Test Token", "TT"],
        log: true,
    });
};

module.exports.tags = ["ERC721"];

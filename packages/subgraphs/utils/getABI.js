const fs = require('fs');
const path = require('path');

const networks = {
    "alfajores": "44787",
    "celo": "42220",
}

function getDeploymentData(network, contractName) {
    try {
        network = network.toLowerCase()
        const data = fs.readFileSync('../hardhat/deployments/hardhat_contracts.json', 'utf8');
        const contractData = JSON.parse(data)
        const abi = contractData[networks[network]][network].contracts[contractName].abi
        const address = contractData[networks[network]][network].contracts[contractName].address
        console.log(`${contractName} is deployed at ${address} on ${network}`)
        if(!fs.existsSync(path.join(__dirname, '..',  `abis/${network}`))){
            fs.mkdirSync(path.join(__dirname, '..',  `abis/${network}`))
        }
        fs.writeFileSync(path.join(__dirname, '..', `abis/${network}/${contractName}.json`), JSON.stringify(abi), { flag: 'w+' })
        console.log(`${contractName} ABI written to abis/${network}/${contractName}.json`)
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = getDeploymentData
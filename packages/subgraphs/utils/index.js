// import the readline module for work with stdin, or stdout.
const readline = require("readline");
const getDeploymentData = require("./getABI");

// create a readline object to work with the stream.
// pass the stdin, or stdout in the current process.
const prompts = readline.createInterface(process.stdin, process.stdout);

// create a question or there handler.
prompts.question("Enter network name (ie 'alfajores'): ", (network) => {
  prompts.question("Enter contract name (case sensitive, ie 'Storage'): ", (contractName) => {
    getDeploymentData(network, contractName);
    prompts.close();
    // after the all work is done want to terminate this process.
    process.exit();
  });
});

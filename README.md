This is a [wagmi](https://wagmi.sh) + [Foundry](https://book.getfoundry.sh/) + [Vite](https://vitejs.dev/) project bootstrapped with [`create-wagmi`](https://github.com/wagmi-dev/wagmi/tree/main/packages/create-wagmi)

# Getting Started

Run `npm run dev` in your terminal, and then open [localhost:5173](http://localhost:5173) in your browser.

Once the webpage has loaded, changes made to files inside the `src/` directory (e.g. `src/App.tsx`) will automatically update the webpage.

# Generating ABIs & React Hooks

This project comes with `@wagmi/cli` built-in, which means you can generate wagmi-compatible (type safe) ABIs & React Hooks straight from the command line.

To generate ABIs & Hooks, follow the steps below.

## Install Foundry

First, you will need to install [Foundry](https://book.getfoundry.sh/getting-started/installation) in order to build your smart contracts. This can be done by running the following command:

```
curl -L https://foundry.paradigm.xyz | bash
```

## Generate code

To generate ABIs & React Hooks from your Foundry project (in `./contracts`), you can run:

```
npm run wagmi
```

This will use the wagmi config (`wagmi.config.ts`) to generate a `src/generated.ts` file which will include your ABIs & Hooks that you can start using in your project.

[Here is an example](./src/components/Counter.tsx) of where Hooks from the generated file is being used.

# Deploying Contracts

To deploy your contracts to a network, you can use Foundry's [Forge](https://book.getfoundry.sh/forge/) – a command-line tool to tests, build, and deploy your smart contracts.

You can read a more in-depth guide on using Forge to deploy a smart contract [here](https://book.getfoundry.sh/forge/deploying), but we have included a simple script in the `package.json` to get you started.

Below are the steps to deploying a smart contract to Ethereum Mainnet using Forge:

## Install Foundry

Make sure you have Foundry installed & set up.

[See the above instructions](#install-foundry).

## Set up environment

You will first need to set up your `.env` to tell Forge where to deploy your contract.

Go ahead and open up your `.env` file, and enter the following env vars:

- `ETHERSCAN_API_KEY`: Your Etherscan API Key.
- `FORGE_RPC_URL`: The RPC URL of the network to deploy to.
- `FORGE_PRIVATE_KEY`: The private key of the wallet you want to deploy from.

## Deploy contract

You can now deploy your contract!

```
npm run deploy
```

# Developing with Anvil (Mainnet Fork)

Let's combine the above sections and use Anvil alongside our development environment to use our contracts (`./contracts`) against an Ethereum Mainnet fork.

## Install Foundry

Make sure you have Foundry installed & set up.

[See the above instructions](#install-foundry).

## Start dev server

Run the command:

```
npm run dev:foundry
```

This will:

- Start a Next.js dev server,
- Start the `@wagmi/cli` in [**watch mode**](https://wagmi.sh/cli/commands/generate#options) to listen to changes in our contracts, and instantly generate code,
- Start an Anvil instance (Mainnet Fork) on an RPC URL.

## Deploy our contract to Anvil

Now that we have an Anvil instance up and running, let's deploy our smart contract to the Anvil network:

```
pnpm run deploy:anvil
```

## Start developing

Now that your contract has been deployed to Anvil, you can start playing around with your contract straight from the web interface!

Head to [localhost:5173](http://localhost:5173) in your browser, connect your wallet, and try increment the counter on the Foundry chain.

> Tip: If you import an Anvil private key into your browser wallet (MetaMask, Coinbase Wallet, etc) – you will have 10,000 ETH to play with 😎. The private key is found in the terminal under "Private Keys" when you start up an Anvil instance with `npm run dev:foundry`.

# Learn more

To learn more about [Vite](https://vitejs.dev/), [Foundry](https://book.getfoundry.sh/) or [wagmi](https://wagmi.sh), check out the following resources:

- [Foundry Documentation](https://book.getfoundry.sh/) – learn more about the Foundry stack (Anvil, Forge, etc).
- [wagmi Documentation](https://wagmi.sh) – learn about wagmi Hooks and API.
- [wagmi Examples](https://wagmi.sh/examples/connect-wallet) – a suite of simple examples using wagmi.
- [@wagmi/cli Documentation](https://wagmi.sh/cli) – learn more about the wagmi CLI.
- [Vite Documentation](https://vitejs.dev/) – learn about Vite features and API.

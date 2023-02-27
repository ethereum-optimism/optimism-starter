<div align="center">
  <a href="https://www.ethdenver.com"><img alt="EthDenver" src="https://user-images.githubusercontent.com/35039927/221527216-7f3733d4-761b-43fa-aa99-5539a2a4720f.png" width=600></a>
  <br />
  <br />
  <a href="https://optimism.io"><img alt="Optimism" src="https://raw.githubusercontent.com/ethereum-optimism/brand-kit/main/assets/svg/OPTIMISM-R.svg" width=600></a>
  <br />
  <h3><a href="https://optimism.io">Optimism</a> ETH Denver hackathon starterkit.</h3>
  <br />
</div>

This is a [Optimism](https://github.com/ethereum-optimism) + [wagmi](https://wagmi.sh) + [Foundry](https://book.getfoundry.sh/) + + [Rainbowkit](https://www.rainbowkit.com/) + [Vite](https://vitejs.dev/) project originally bootstrapped with [`create-wagmi`](https://github.com/wagmi-dev/wagmi/tree/main/packages/create-wagmi) built with ❤️ for [Eth Denver](https://www.ethdenver.com/) hackers

# Who is this for

- Hackers hacking on [optimism](https://www.optimism.io/)
- Hackers hacking on the [attestation station](https://community.optimism.io/docs/governance/attestation-station/)
- Hackers interested in using [the most modern and robust web3 full stack development stack](https://twitter.com/gakonst/status/1630038261941796866)

## [Optimism in Denver!](https://oplabs.notion.site/Optimism-in-Denver-5f3f32a7469b4bbb94c11cf71ada8529)

# Getting Started

Run `npm run dev` in your terminal, and then open [localhost:5173](http://localhost:5173) in your browser.

Once the webpage has loaded, changes made to files inside the `src/` directory (e.g. `src/App.tsx`) will automatically update the webpage.

See below for general usage instructions or [FAQ](https://github.com/ethereum-optimism/optimism-starter/blob/main/FAQ.md) for answers to general questions such as

- where to get goerli eth
- how to deploy to vercel/fleek

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

[Here is an example](https://github.com/ethereum-optimism/optimism-starter/blob/main/src/components/Attestoooooor.tsx#L77) of where Hooks from the generated file is being used.

# Deploying Contracts

To deploy your contracts to a network, you can use Foundry's [Forge](https://book.getfoundry.sh/forge/) – a command-line tool to tests, build, and deploy your smart contracts.

You can read a more in-depth guide on using Forge to deploy a smart contract [here](https://book.getfoundry.sh/forge/deploying), but we have included a simple script in the `package.json` to get you started.

Below are the steps to deploying a smart contract to Optimism Goerli using Forge:

## Install Foundry

Make sure you have Foundry installed & set up.

[See the above instructions](#install-foundry).

## Set up environment

You will first need to set up your `.env` to tell Forge where to deploy your contract.

Go ahead and open up your `.env` file, and enter the following env vars:

- `ETHERSCAN_API_KEY`: Your Etherscan API Key.
- `FORGE_RPC_URL`: The RPC URL of the network to deploy to.
- `FORGE_PRIVATE_KEY`: The private key of the wallet you want to deploy from.

_note_ Optimism goerli requires signing up for an etherscan key on optimism goerli etherscan rather than mainnet etherscan

## Deploy contract

You can now deploy your contract!

```bash
npm run deploy
```

# Developing with Anvil (Goerli Fork)

Let's combine the above sections and use Anvil alongside our development environment to use our contracts (`./contracts`) against an Optimism fork.

## Install Foundry

Make sure you have Foundry installed & set up.

[See the above instructions](#install-foundry).

## Start dev server

Run the command:

```
npm run dev:foundry
```

This will:

- Start a vite dev server,
- Start the `@wagmi/cli` in [**watch mode**](https://wagmi.sh/cli/commands/generate#options) to listen to changes in our contracts, and instantly generate code,
- Start an Anvil instance (Optimism Goerli Fork) on an RPC URL.

## Deploy our contract to Anvil

Now that we have an Anvil instance up and running, let's deploy our smart contract to the Anvil network:

```
pnpm run deploy:anvil
```

## Start developing

Now that your contract has been deployed to Anvil, you can start playing around with your contract straight from the web interface!

Head to [localhost:5173](http://localhost:5173) in your browser, connect your wallet, and try increment the counter on the Foundry chain.

> Tip: If you import an Anvil private key into your browser wallet (MetaMask, Coinbase Wallet, etc) – you will have 10,000 ETH to play with 😎. The private key is found in the terminal under "Private Keys" when you start up an Anvil instance with `npm run dev:foundry`.

## ATST

To interact with the attestation station this library uses the minimal [@eth-optimism/atst](todo.todo.todo) package currently in beta as well as it's accompioning cli. Feel free to open up issues for ideas of improvements for atst. We are also happy to give you ideas of how you could build an even better version of ATST or make it better for your hack!

## ATST indexers

TODO document what you can use for backends for atst

## Alternatives

Looking to use burner wallets? Prefer hardhat? Prefer NEXT.js? Check out these amazing alternatives:

- [create wagmi cli](https://wagmi.sh/cli/create-wagmi) - A flexible cli with many templates (this starterkit was started from vite-react-cli-foundry)
- [scaffold-eth](https://github.com/scaffold-eth/se-2) - The new 2nd version of a popular NEXT.js based starter including hardhat, burner wallets, great documentation, and an active telegram for support
- [Awesome wagmi](https://github.com/wagmi-dev/awesome-wagmi#templates) - Has other alternative examples
- [Create Eth App](https://usedapp-docs.netlify.app/docs/Getting%20Started/Create%20Eth%20App) - Uses a wagmi alternative called useDapp that is used at OP Labs

# Learn more

To learn more about [Optimism](https://optimism.io) [Vite](https://vitejs.dev/), [Foundry](https://book.getfoundry.sh/), [Rainbow kit](https://www.rainbowkit.com/) or [wagmi](https://wagmi.sh), check out the following resources:

- [Foundry Documentation](https://book.getfoundry.sh/) – learn more about the Foundry stack (Anvil, Forge, etc).
- [wagmi Documentation](https://wagmi.sh) – learn about wagmi Hooks and API.
- [wagmi Examples](https://wagmi.sh/examples/connect-wallet) – a suite of simple examples using wagmi.
- [@wagmi/cli Documentation](https://wagmi.sh/cli) – learn more about the wagmi CLI.
- [Vite Documentation](https://vitejs.dev/) – learn about Vite features and API.

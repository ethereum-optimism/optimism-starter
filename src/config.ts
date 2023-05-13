// TODO: Modifiy the config from arbitrum to Optimism

interface AppConfig {
  jsonRpcUri: string;
  wsRpcUri: string;
  subgraphApiUri: string;
}

export enum ChainId {
  Mainnet = 1,
  Goerli = 5,
  Polygon = 137,
  Localhost = 1337,
  Hardhat = 31337,
  Arbitrum = 42161,
  ArbitrumGoerli = 421613,
}

type SupportedChains =
  | ChainId.Arbitrum
  | ChainId.ArbitrumGoerli
  | ChainId.Hardhat;

export const ETHERSCAN_API_KEY =
  import.meta.env.VITE_REACT_APP_ETHERSCAN_API_KEY ||
  process.env.VITE_REACT_APP_ETHERSCAN_API_KEY;

const ALCHEMY_API_KEY =
  import.meta.env.VITE_ALCHEMY_API_KEY || process.env.VITE_ALCHEMY_API_KEY;

const VITE_HARDHAT_NETWORK_JSON_RPC =
  import.meta.env.VITE_HARDHAT_NETWORK_JSON_RPC ||
  process.env.VITE_HARDHAT_NETWORK_JSON_RPC!;

const VITE_HARDHAT_NETWORK_WEBSOCKET =
  import.meta.env.VITE_HARDHAT_NETWORK_WEBSOCKET ||
  process.env.VITE_HARDHAT_NETWORK_WEBSOCKET;

const VITE_HARDHAT_NETWORK_SUBGRAPH =
  import.meta.env.VITE_HARDHAT_NETWORK_SUBGRAPH ||
  process.env.VITE_HARDHAT_NETWORK_SUBGRAPH!;

export const getChainRPC = (chainId: SupportedChains): AppConfig => {
  if (chainId == ChainId.Arbitrum)
    return {
      jsonRpcUri: `https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      wsRpcUri: `wss://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      subgraphApiUri:
        "https://api.thegraph.com/subgraphs/name/yanuar-ar/factor-arbitrum",
    } as AppConfig;

  // Goerli
  if (chainId == ChainId.ArbitrumGoerli)
    return {
      jsonRpcUri: `https://arb-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      wsRpcUri: `wss://arb-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      subgraphApiUri:
        "https://api.thegraph.com/subgraphs/name/factordao/factor-arbitrum-goerli",
    } as AppConfig;

  // Hardhat
  if (chainId == ChainId.Hardhat && VITE_HARDHAT_NETWORK_JSON_RPC)
    return {
      jsonRpcUri: VITE_HARDHAT_NETWORK_JSON_RPC,
      wsRpcUri: VITE_HARDHAT_NETWORK_WEBSOCKET,
      subgraphApiUri: VITE_HARDHAT_NETWORK_SUBGRAPH,
    } as AppConfig;

  // Hardhat
  if (chainId == ChainId.Hardhat) {
    return {
      jsonRpcUri: `http://localhost:8545`,
      wsRpcUri: `wss://localhost:8545`,
      subgraphApiUri:
        "http://localhost:8000/subgraphs/name/factordao/factor-hardhat",
    } as AppConfig;
  }

  return {
    jsonRpcUri: `https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    wsRpcUri: `wss://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    subgraphApiUri:
      "https://api.thegraph.com/subgraphs/name/yanuar-ar/factor-arbitrum",
  } as AppConfig;
};

export const config = () => ({
  app: getChainRPC(window.CHAIN_ID),
});

export default config;

import {
  GroupGenerator,
  GenerationFrequency,
  GenerationContext,
  GroupWithData,
  ValueType,
  Tags,
} from "sismo-types";
import { UniswapV2DataProvider } from "./data-collection/uniswapv2.ts";
import { calculateBadges } from "./eligibility-verification/verify-eligibility.ts";

// Badge criteria constants
const VOLUME_TIERS = [1000, 10000, 100000, 1000000];
const TRADE_TIERS = [10, 100, 1000];
const LIQUIDITY_TIERS = [1000, 10000, 100000, 1000000];

// Define Uniswap v2 subgraph URL
const UNISWAP_V2_SUBGRAPH_URL =
  "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2";

// Initialize Uniswap v2 data provider
const uniswapV2DataProvider = new UniswapV2DataProvider(
  UNISWAP_V2_SUBGRAPH_URL,
);

const UniswapV2generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const data = {};
    const addresses = context.addresses || []; // The list of Ethereum addresses you want to fetch data for

    for (const address of addresses) {
      const userData = await uniswapV2DataProvider.getUserData(address);
      const badges = calculateBadges(userData);

      // Here, the value associated with each Ethereum address in the group is the number of badges earned by the user
      data[address.toLowerCase()] = badges.length;
    }

    return [
      {
        name: "uniswap-v2-group",
        timestamp: context.timestamp,
        description: "description of uniswap-v2-group",
        specs: "specs",
        data: data,
        valueType: ValueType.Info,
        tags: [Tags.Mainnet, Tags.User],
      },
    ];
  },
};

export default UniswapV2generator;

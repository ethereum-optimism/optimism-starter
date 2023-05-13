import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Define GraphQL endpoint
const UNISWAP_GRAPHQL_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2';

// Initialize GraphQL client
const uniswapClient = new ApolloClient({
  uri: UNISWAP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

// Define the query using gql tag
const USER_DATA_QUERY = gql`
  query GetUserData($address: Bytes!, $skip: Int!) {
    swaps(first: 1000, skip: $skip, where: { to: $address }) {
      id
      timestamp
      amount0In
      amount1In
      amount0Out
      amount1Out
    }
    liquidityPositions(first: 1000, skip: $skip, where: { user: $address }) {
      id
      liquidityTokenBalance
      timestamp
    }
  }
`;

// Recursive function to fetch a page of data and process it
async function fetchUserData(address: string, skip: number = 0) {
  try {
    const { data } = await uniswapClient.query({
      query: USER_DATA_QUERY,
      variables: {
        address: address.toLowerCase(),
        skip: skip,
      },
      fetchPolicy: 'network-only',
    });

    const tradeData = data.swaps;
    const liquidityPositionData = data.liquidityPositions;

    const userData = {
      firstTradeTimestamp: tradeData.length > 0 ? tradeData[0].timestamp : null,
      totalTrades: tradeData.length,
      totalTradeVolume: tradeData.reduce((total, trade) => total + parseFloat(trade.amount0In) + parseFloat(trade.amount1In), 0),
      firstLiquidityPositionTimestamp: liquidityPositionData.length > 0 ? liquidityPositionData[0].timestamp : null,
      totalLiquidityPositions: liquidityPositionData.length,
      totalLiquidityProvided: liquidityPositionData.reduce((total, position) => total + parseFloat(position.liquidityTokenBalance), 0),
    };

    // If there's more data, fetch and process it
    if (data.swaps.length === 1000 || data.liquidityPositions.length === 1000) {
      const nextPageData = await fetchUserData(address, skip + 1000);
      userData.totalTrades += nextPageData.totalTrades;
      userData.totalTradeVolume += nextPageData.totalTradeVolume;
      userData.totalLiquidityPositions += nextPageData.totalLiquidityPositions;
      userData.totalLiquidityProvided += nextPageData.totalLiquidityProvided;
    }

    return userData;
  } catch (error) {
    console.error(error);
  }
}

// Fetch and process the data for a user's Ethereum address
fetchUserData('0xYourEthereumAddressHere')
  .then(userData => console.log('User Data:', userData))
  .catch(error => console.error('Error fetching data:', error));
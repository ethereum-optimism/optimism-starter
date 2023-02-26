import { configureChains, createClient } from "wagmi";
import { foundry, goerli, mainnet } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";

const { chains, provider, webSocketProvider } = configureChains(
	[
		mainnet,
		...(import.meta.env?.MODE === "development" ? [goerli, foundry] : []),
	],
	[
		alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_API_KEY! }),
		jsonRpcProvider({
			rpc: (chain) => {
				if (chain.id === foundry.id) {
					return { http: "http://localhost:8545" };
				}
				return null;
			},
		}),
	],
);

export { chains };

const { connectors } = getDefaultWallets({
	appName: "Optimism attestation station + Forge + Wagmi + RainbowKit App",
	chains,
});

export const client = createClient({
	autoConnect: true,
	connectors: connectors,
	provider,
	webSocketProvider,
});

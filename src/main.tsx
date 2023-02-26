import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { WagmiConfig } from "wagmi";

import { App } from "./App";
import { chains, client } from "./wagmi";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<WagmiConfig client={client}>
			<RainbowKitProvider chains={chains}>
				<App />
			</RainbowKitProvider>
		</WagmiConfig>
	</React.StrictMode>,
);

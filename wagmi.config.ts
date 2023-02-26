import { defineConfig } from '@wagmi/cli'
import { foundry, react } from '@wagmi/cli/plugins'
import * as chains from 'wagmi/chains'
import {ATTESTATION_STATION_ADDRESS} from '@eth-optimism/atst'

export default defineConfig({
  out: 'src/generated.ts',
  plugins: [
    foundry({
      deployments: {
        Counter: {
          [chains.mainnet.id]: '0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac',
          [chains.goerli.id]: '0x78991BB1D194C1235fe285240af8489CFA552151',
          [chains.foundry.id]: '0xbe18A1B61ceaF59aEB6A9bC81AB4FB87D56Ba167',
        },
        AttestationStation: {
          [chains.optimism.id]: ATTESTATION_STATION_ADDRESS,
          [chains.optimismGoerli.id]: ATTESTATION_STATION_ADDRESS,
          [chains.foundry.id]: ATTESTATION_STATION_ADDRESS,
        }
      },
    }),
    react(),
  ],
})

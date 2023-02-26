import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

import { Account, Attestooooooor} from './components'

export function App() {
  const { isConnected } = useAccount()

  return (
    <>
      <h1>OP Eth Denver Hackathon</h1>

      <ConnectButton />

      {isConnected && (
        <>
          <Account />
          <hr />
          <Attestooooooor />
          <hr />
        </>
      )}
    </>
  )
}

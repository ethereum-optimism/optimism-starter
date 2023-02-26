import { parseAttestationBytes } from '@eth-optimism/atst'
import { stringifyAttestationBytes } from '@eth-optimism/atst/src/lib/stringifyAttestationBytes'
import { BigNumber } from 'ethers'
import { useState } from 'react'
import { useAccount, useNetwork, useWaitForTransaction } from 'wagmi'

import {
  useAttestationStationAttest,
  usePrepareAttestationStationAttest,
  useAttestationStationAttestations,
} from '../generated'

export function Counter() {
  return (
    <div>
      <Attest />
    </div>
  )
}

function Attest() {
  const {address} = useAccount()
  const [value, setValue] = useState('')

  const { config } = usePrepareAttestationStationAttest({
    args: [[
      {
        about: '0x000000',
        key: '0x000000',
        /**
         * TODO update stringifyAttestationBytes to return a string instead of Uint8Array
         */
        val: BigNumber.from(stringifyAttestationBytes(value)).toHexString() as `0x${string}`,
      }
    ]],
    enabled: Boolean(value && address),
  })
  const { data, write } = useAttestationStationAttest({
    ...config,
    onSuccess: () => setValue(''),
  })

  const { refetch, data: attestation } = useAttestationStationAttestations()
  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => refetch(),
  })

  return (
    <div>
      Attestor:
      <div>
        Current attestation: {parseAttestationBytes(data, 'string')}
      </div>
      <input
        disabled={isLoading}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <button disabled={!write || isLoading} onClick={() => write?.()}>
        Set
      </button>
      {isLoading && <ProcessingMessage hash={data?.hash} />}
    </div>
  )
}

function ProcessingMessage({ hash }: { hash?: `0x${string}` }) {
  const { chain } = useNetwork()
  const etherscan = chain?.blockExplorers?.etherscan
  return (
    <span>
      Processing transaction...{' '}
      {etherscan && (
        <a href={`${etherscan.url}/tx/${hash}`}>{etherscan.name}</a>
      )}
    </span>
  )
}

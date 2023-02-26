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

export function Attestooooooor() {
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
        val: '0x0',
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
      <h2>Attestoooor</h2>
      <div>
        Current attestation: {attestation ? parseAttestationBytes(attestation, 'string') : 'none'}
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
      <div>
        Gas fee: <span>{config.request?.gasLimit.toString()}</span>
      </div>
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

import { parseAttestationBytes } from '@eth-optimism/atst'
import { stringifyAttestationBytes } from '@eth-optimism/atst/src/lib/stringifyAttestationBytes'
import { BigNumber } from 'ethers'
import { formatBytes32String, toUtf8Bytes } from 'ethers/lib/utils.js'
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

  const key = 'example_key'

  const { config } = usePrepareAttestationStationAttest({
    args: [[
      {
        about: address!,
        key: formatBytes32String(key) as `0x${string}`,
        /**
         * TODO update stringifyAttestationBytes to return a string instead of Uint8Array
         */
        val: stringifyAttestationBytes(value) as unknown as `0x${string}`,
      }
    ]],
    enabled: Boolean(value && address),
  })
  const { data, write } = useAttestationStationAttest({
    ...config,
    onSuccess: () => setValue(''),
  })

  const { refetch, data: attestation } = useAttestationStationAttestations({
    args: [address!, address!, formatBytes32String(key) as `0x${string}`],
  })
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

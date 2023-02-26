import { BigNumber } from 'ethers'
import { useState } from 'react'
import { useNetwork, useWaitForTransaction } from 'wagmi'

import {
  useCounterIncrement,
  useCounterNumber,
  useCounterSetNumber,
  usePrepareCounterIncrement,
  usePrepareCounterSetNumber,
} from '../generated'

export function Counter() {
  return (
    <div>
      <Count />
      <SetNumber />
      <Increment />
    </div>
  )
}

function Count() {
  const { data: count } = useCounterNumber()
  return <div>Count: {count?.toString()}</div>
}

function SetNumber() {
  const [value, setValue] = useState('')

  const { config } = usePrepareCounterSetNumber({
    args: value ? [BigNumber.from(value)] : undefined,
    enabled: Boolean(value),
  })
  const { data, write } = useCounterSetNumber({
    ...config,
    onSuccess: () => setValue(''),
  })

  const { refetch } = useCounterNumber()
  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => refetch(),
  })

  return (
    <div>
      Set Number:
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

function Increment() {
  const { config } = usePrepareCounterIncrement()
  const { data, write } = useCounterIncrement(config)

  const { refetch } = useCounterNumber()
  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => refetch(),
  })

  return (
    <div>
      <button disabled={!write || isLoading} onClick={() => write?.()}>
        Increment
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

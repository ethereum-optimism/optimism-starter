import { parseAttestationBytes } from "@eth-optimism/atst";
import { stringifyAttestationBytes } from "@eth-optimism/atst/src/lib/stringifyAttestationBytes";
import { formatBytes32String, toUtf8Bytes } from "ethers/lib/utils.js";
import { useState } from "react";
import { useAccount, useNetwork, useWaitForTransaction } from "wagmi";

/**
 * These react hooks are generated with the wagmi cli via `wagmi generate`
 * @see ROOT/wagmi.config.ts
 */
import {
  useAttestationStationAttest,
  usePrepareAttestationStationAttest,
  useAttestationStationAttestations,
} from "../generated";

/**
 * An example component using the attestation station
 */
export function Attestooooooor() {
  /**
   * @see https://wagmi.sh/docs/hooks/useAccount
   */
  const { address } = useAccount();
  /**
   * @see https://reactjs.org/docs/hooks-state.html
   */
  const [value, setValue] = useState("Hello world");

  /**
   * The key of the attestation
   * @see https://www.npmjs.com/package/@eth-optimism/atst
   */
  const key = formatBytes32String("eth-denver");
  /**
   * Value of the attestation
   * stringifyAttestationBytes can take the following datatypes
   * - string
   * - number
   * - boolean
   * - hexString
   * @see https://www.npmjs.com/package/@eth-optimism/atst
   */
  const newAttestation = stringifyAttestationBytes(value) as `0x${string}`;

  /**
   * Automatically generated hook to prepare the transaction
   * @see https://wagmi.sh/react/prepare-hooks/usePrepareContractWrite
   */
  const { config } = usePrepareAttestationStationAttest({
    args: [
      [
        {
          about: address!,
          key: key as `0x${string}`,
          val: newAttestation,
        },
      ],
    ],
    /**
     * Don't run the transaction if the value is empty or the user is not connected
     */
    enabled: Boolean(value && address),
  });

  /**
   * Automatically generated hook to execute the transaction
   * @see https://wagmi.sh/react/execute-hooks/useContractWrite
   */
  const { data, write } = useAttestationStationAttest({
    ...config,
    onSuccess: () => setValue(""),
  });

  /**
   * Automatically generated hook to read the attestation
   * @see https://wagmi.sh/react/execute-hooks/useContractRead
   */
  const { refetch, data: attestation } = useAttestationStationAttestations({
    args: [address!, address!, formatBytes32String(key) as `0x${string}`],
  });

  /**
   * Wagmi hook to wait for the transaction to be complete
   * @see https://wagmi.sh/docs/hooks/useWaitForTransaction
   */
  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => refetch(),
  });

  return (
    <div>
      <h2>Attestoooooor</h2>
      <div>
        Current attestation:{" "}
        {attestation ? parseAttestationBytes(attestation, "string") : "none"}
      </div>
      <input
        disabled={isLoading}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <button disabled={!write || isLoading} onClick={() => write?.()}>
        Attest
      </button>
      {isLoading && <ProcessingMessage hash={data?.hash} />}
      <div>
        Gas fee: <span>{config.request?.gasLimit.toString()}</span>
      </div>
    </div>
  );
}

function ProcessingMessage({ hash }: { hash?: `0x${string}` }) {
  const { chain } = useNetwork();
  const etherscan = chain?.blockExplorers?.etherscan;
  return (
    <span>
      Processing transaction...{" "}
      {etherscan && (
        <a href={`${etherscan.url}/tx/${hash}`}>{etherscan.name}</a>
      )}
    </span>
  );
}

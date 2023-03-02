# How does this work?

## main.tsx

[This file](src/main.tsx) is the main part of the program.
The way React works, we need to [`render`](https://reactjs.org/docs/rendering-elements.html) a top level object.


```typescript
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
);
```

Inside the [`React.StrictMode`](https://reactjs.org/docs/strict-mode.html) there is a single element, `WagmiConfig`. 
This element uses [wagmi](https://wagmi.sh/), a library for using Ethereum from React.
Inside *that* element there is also a single element, [`RainbowKitProvider`](https://www.rainbowkit.com/).
This element provides the connection between the application and the wallet, and inside it we finally have our application.


## App.tsx

[This file](src/App.tsx) is to top level frame of the application.
It exports a single function, `App`, which returns a React component.

```typescript
const { isConnected } = useAccount();
```

The wagmi [`useAccount()`](https://wagmi.sh/react/hooks/useAccount) function returns the status of the wallet connection to the page.
We only care about whether we are connected or not.

```typescript
return (
<>
```

The empty element (`<>...</>`) tells the system that the code inside is React components, not JavaScript or TypeScript.

```typescript
    <h1>OP Eth Denver Hackathon</h1>
```

Within the React component you can use normal HTML code.

```typescript
    {/** @see https://www.rainbowkit.com/docs/connect-button */}
```

You can also use this syntax: `{ <code goes here> }` to embed JavaScript code to run inside the browser when the component is displayed.
The expression in the curly brackets is evaluated and then becomes part of the component.
[See here for more information](https://beta.reactjs.org/learn/javascript-in-jsx-with-curly-braces).


```typescript
    <ConnectButton />
```

This [Rainbow Kit component](https://www.rainbowkit.com/docs/connect-button) only shows up when the page is not connected to a wallet, and provides the user interface to connect. 

```typescript

    {isConnected && (
```

This code uses [short-circuit evaluation](https://www.tutorialspoint.com/short-circuit-evaluation-in-javascript). 
If `isConnected` is false the entire expression has to be false, and there is no need to calculate the rest of the expression.

```typescript
    <>
        <hr />
        <Attestooooooor />
        <hr />
```

The rest of the expression is two horizonal lines, and an `Attestooooooor` component between them.
[See below](#attestooooooortsx) for an explanation of that component.

```typescript    
    </>
    )}    
</>
);
```

Close everything up:
1. The inner `<> ... </>` that denotes the inner React component. 
1. The parenthesis `(...)` that go around the React component.
1. The curly brackets `{...}` that denote a JavaScript inside a React component.
1. The outer `<> ... </>`  that denotes the outer React component.
1. The parenthesis that go over the entire `return` value. 


## Attestooooooor.tsx

[This file](src/components/Attestoooooor.tsx) is where we finally get into the part of the application that actually deals with attestations.

```typescript
import {
  useAttestationStationAttest,
  usePrepareAttestationStationAttest,
  useAttestationStationAttestations,
} from "../generated";
```

These functions are generated using `node_modules/.bin/wagmi generate` based on the ABI for the contracts in the application, they include the necessary code to call the contract on a blockchain.
If you are interested, you can see them [here](src/generated.ts).

```typescript
  const { address } = useAccount();
```

Get the wallet address from [wagmi](https://wagmi.sh/docs/hooks/useAccount).

```typescript
  const [value, setValue] = useState("Hello world");
```

In React the data of a component is stored in the component state. 
The initial value is the parameter to [`useState`](https://beta.reactjs.org/reference/react/useState).
When the component function is called again, `value` gets the up to date value of the state. 
The `setValue` function is how you modify this state.


```typescript
  const key = formatBytes32String("eth-denver");
```

This is the attestation key. 
It is converted to a 256 bit value.

  /**
   * Value of the attestation
   * @see https://www.npmjs.com/package/@eth-optimism/atst
   * TODO make this less janky with atst
   */
  const newAttestation = toUtf8Bytes(value) as unknown as `0x${string}`;

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
    args: [address!, address!, key as `0x${string}`],
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
        Current attestation: {attestation ? toUtf8String(attestation) : "none"}
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

```
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


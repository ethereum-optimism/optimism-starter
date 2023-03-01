# Attestation Station (ATST)

This starter comes preloaded with the [attestation station](https://community.optimism.io/docs/governance/attestation-station/).

- [@eth-optimism/atst](https://www.npmjs.com/package/@eth-optimism/atst) JavaScript SDK
- [Attestation station contract](contracts/src/AttestationStation.sol) included for convenience
- Automatically generated react hooks

## Usage

The attestation station is meant to be as simple as possible so you, the community, lead the direction it takes. Every attestation has the following properties:

1. Creator - the address making the attestation
2. About - An address the attestation is about
3. Key - A 32 byte key
4. Val - An arbitrary value in bytes

See the [official documentation](https://community.optimism.io/docs/governance/attestation-station/#technical-specifications) for more.

## Contracts

The attestation station is deterministically deployed to `0xEE36eaaD94d1Cc1d0eccaDb55C38bFfB6Be06C77` on both [Optimism](https://explorer.optimism.io/address/0xEE36eaaD94d1Cc1d0eccaDb55C38bFfB6Be06C77) and [Optimism Goerli](https://goerli-explorer.optimism.io/address/0xEE36eaaD94d1Cc1d0eccaDb55C38bFfB6Be06C77).


## ATST SDK

To interact with the attestation station this library uses the minimal [@eth-optimism/atst](https://www.npmjs.com/package/@eth-optimism/atst) package currently in beta as well as it's accompanying cli. Feel free to open up issues for ideas of improvements for atst. We are also happy to give you ideas of how you could build an even better version of ATST or make it better for your hack!

## ATST CLI

For convenience we also include the atst cli. It's a great way to interact with the atst from command line. To get started try reading an attestation

```bash
npx atst read --key "optimist.base-uri" --about 0x2335022c740d17c2837f9C884Bfe4fFdbf0A95D5 --creator 0x60c5C9c98bcBd0b0F2fD89B24c16e533BaA8CdA3
```

For more information run the help page

```bash
npx atst --help
```

## Attestation station indexers

- [nxyz attestation station](https://docs.n.xyz/reference/attestation-station)
- Graphql api: [ponder attestation station](https://attestation-station-api-production.up.railway.app/graphql?query=%7B%0A%20%20attestations(where%3A%20%7B%20creator%3A%20%220x60c5C9c98bcBd0b0F2fD89B24c16e533BaA8CdA3%22%20%7D)%20%7B%0A%20%20%20%20id%0A%20%20%20%20creator%0A%20%20%20%20about%0A%20%20%20%20key%0A%20%20%20%20val%0A%20%20%7D%0A%7D%0A%0A)

Many hackers are building their own as well!

import { useEffect, useState } from "react";
import { Client, cacheExchange, fetchExchange, gql, useQuery } from "urql";
import { useAccount } from "wagmi";
import { getNetwork } from "@wagmi/core";
import Table from "@/components/Table";

const { chain } = getNetwork();
console.log(chain);

// export const EASContractAddress = "0x4200000000000000000000000000000000000021"; // GoerliOptimism v0.26
export const EASContractAddress =
  chain && chain.network === "base-goerli"
    ? "0xAcfE09Fd03f7812F022FBf636700AdEA18Fd2A7A" // GoerliBase v0.26
    : "0x4200000000000000000000000000000000000021";

export default function GrantsListPage() {
  const headerCells = [
    "ID",
    "Title",
    "Recipient",
    "Multisig Wallet",
    "Milestones",
    "Amount",
  ];
  const { chain, chains } = getNetwork();

  const { address } = useAccount();
  const client = new Client({
    url: `https://${chain?.network}.easscan.org/graphql`,
    exchanges: [cacheExchange, fetchExchange],
  });

  const [attestations, setAttestations] = useState<
    Array<{
      refUID: string;
      grantRecipient: string;
      multisigWallet: string;
      title: string;
      milestones: BigInt;
      amount: BigInt;
    }>
  >([]);

  const getAttestations = async () => {
    const query = gql`
    query() {
      attestations(take: 25, orderBy: {time: desc}) {
        id
        attester
        recipient
        refUID
        revocable
        revocationTime
        expirationTime
        data
      }
    }
  `;

    const result = await client.query(query, {}).toPromise();
    const attestationList = result.data?.attestations.map((att: any) => ({
      refUID: att.id,
      grantRecipient: att.recipient,
      multisigWallet: att.data.multisigWallet,
      title: att.data.grantTitle,
      milestones: att.data.numberOfMilestones,
      amount: att.data.grantAmount,
    }));
    console.log(attestationList);

    if (result.error) throw result.error;
    if (result.data?.attestations) setAttestations(attestationList);
  };

  useEffect(() => {
    attestations.length === 0 && getAttestations();
  }, [getAttestations]);
  return (
    <div>
      <div className="h1 -ml-8 mb-10 font-Telegraf text-4xl text-lena">
        {" "}
        <h1>Grants List</h1>
      </div>
      <Table columns={headerCells} rows={attestations} chain={chain} />
    </div>
  );
}

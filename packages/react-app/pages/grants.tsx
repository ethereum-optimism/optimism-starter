import { useEffect, useState } from "react";
import { Client, cacheExchange, fetchExchange, gql, useQuery } from "urql";
import { useAccount } from "wagmi";
import Table from "@/components/Table";

export default function GrantsListPage() {
  const headerCells = [
    "refUID",
    "grantRecipient",
    "multisigWallet",
    "title",
    "milestones",
    "amount",
  ];

  const { address } = useAccount();
  const client = new Client({
    url: "https://optimism-goerli.easscan.org/graphql",
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

    console.log(result.data);

    if (result.error) throw result.error;
    if (result.data?.attestations) setAttestations(result.data.attestations);
  };

  useEffect(() => {
    getAttestations();
  }, []);
  return (
    <div>
      <div className="h1 font-Telegraf text-4xl text-lena">
        {" "}
        <h1>Grants List</h1>
      </div>
      <Table columns={headerCells} rows={attestations} />
    </div>
  );
}

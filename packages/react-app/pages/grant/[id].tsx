"use client";

import { useRouter } from "next/router";
import {
  Attestation,
  EAS,
  SchemaEncoder,
} from "@ethereum-attestation-service/eas-sdk";
import { useEffect, useState } from "react";
import { getNetwork } from "@wagmi/core";
import { useEthersSigner } from "../../utils/ethers";
import { EASContractAddress } from "../grants";
import { ethers } from "ethers";
import MilestoneTable from "@/components/MilestoneTable";

export default function GrantDetailPage() {
  const signer = useEthersSigner();
  const [attestation, setAttestation] = useState<{
    ID: string;
    grantTitle: string;
    grantDescription: string;
    numberOfMilestones: number;
    grantAmount: number;
  }>({});
  const RPC_URL = "https://base-goerli.public.blastapi.io";
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

  const router = useRouter();
  const { id } = router.query as { id: string };
  // const id =
  //   "0xb8106c50b334a974b863df6dfa095eddaa5017e29c6b70e124593854c3069d10";

  const eas = new EAS(EASContractAddress);
  signer && eas.connect(provider);
  console.log(EASContractAddress);

  const headerCells = [
    "ID",
    "Grant Title",
    " Grant UID",
    "Milestone Number",
    "Description",
  ];

  const schemaEncoder = new SchemaEncoder(
    "string grantTitle,string grantDescription,string numberOfMilestones,uint256 grantAmount"
  );

  const getAttestation = async () => {
    console.log(id);

    const result =
      id &&
      (await eas.getAttestation(
        id ||
          "0xb8106c50b334a974b863df6dfa095eddaa5017e29c6b70e124593854c3069d10"
      ));
    const decoded = schemaEncoder.decodeData(result?.data);
    console.log(decoded);

    result &&
      decoded &&
      setAttestation({
        ID: result.uid,
        grantTitle: decoded[0].value.value,
        grantDescription: decoded[0].value.value,
        numberOfMilestones: decoded[0].value.value,
        grantAmount: decoded[0].value.value,
      });
    console.log(attestation);
  };

  useEffect(() => {
    attestation.ID || getAttestation();
  });

  return (
    <div>
      <div className="h1 -ml-8 mb-10 font-Telegraf text-4xl text-lena">
        {" "}
        <h1>{`Grant Details `}</h1>
      </div>
      <div>Grant Details - TODO</div>
      <MilestoneTable columns={headerCells} rows={attestation}></MilestoneTable>
    </div>
  );
}

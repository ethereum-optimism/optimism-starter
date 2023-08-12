"use client";

import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { EASContractAddress } from "../grants";
import { useEthersSigner } from "@/utils/ethers";

export default function MilestoneDetailPage() {
  const signer = useEthersSigner();
  const [attestation, setAttestation] = useState<{
    ID: string;
    grantTitle: string;
    grantDescription: string;
    numberOfMilestones: number;
    grantAmount: number;
  }>({});
  const router = useRouter();
  const { id } =
    (router?.query as { id: string }) ||
    "0xf1ce87603985c991360d3a72dafa47789c8dd0b664c83f9937762c32897d3506";

  const eas = new EAS(EASContractAddress);
  signer && eas.connect(signer);
  console.log(EASContractAddress);

  const schemaEncoder = new SchemaEncoder(
    "string grantTitle,uint256 milestoneNumber,string milestoneDescription"
  );

  const getAttestation = async () => {
    console.log(id);

    const result = await eas.getAttestation(id);
    console.log(result);

    const decoded = schemaEncoder.decodeData(result?.data);
    console.log(decoded[0].value.value);

    // setAttestation({
    //   ID: result.uid,
    //   grantTitle: decoded[0].value.value,
    //   milestoneNumber: decoded[1].value.value,
    //   milestoneDescription: decoded[2].value.value,
    //   grantUID: result.refUID,
    // });
    console.log(attestation);
  };

  useEffect(() => {
    attestation.ID || getAttestation();
  });

  return (
    <div>
      <div className="h1">Milestone Page</div>
    </div>
  );
}

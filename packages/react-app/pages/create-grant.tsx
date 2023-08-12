import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { useState } from "react";
import { useEthersSigner } from "../utils/ethers";
import Link from "next/link";

import { ethers } from "ethers";

import { ceateSafe } from "../utils/safe";
import { EASContractAddress } from "./grants";

export default function CreateApprovedGrantPage() {
  const signer = useEthersSigner();

  const [grantRecipient, setGrantRecipient] = useState(
    "0x99B551F0Bb2e634D726d62Bb2FF159a34964976C"
  );
  const [grantTitle, setGrantTitle] = useState("");
  const [grantDescription, setGrantDescription] = useState("");
  const [numberOfMilestones, setNumberOfMilestones] = useState("");
  const [grantAmount, setGrantAmount] = useState(0); // eth => BigNumber???
  const [attestation, setAttestation] = useState("");

  const eas = new EAS(EASContractAddress);
  signer && eas.connect(signer);
  console.log(EASContractAddress);

  // TODO:add multisgWallet to schema
  const schemaEncoder = new SchemaEncoder(
    "string grantTitle,string grantDescription,string numberOfMilestones,uint256 grantAmount"
  );

  const schemaUID =
    "0x40f3d426f8aef71e7426b6bdd8b858f865e716cfb8d0a1b32df80056079e49dc";

  const createAttestation = async () => {
    // TODO: create multisig wallet
    // const multisigWallet = await ceateSafe();

    const result = await eas.attest(
      {
        schema: schemaUID,
        data: {
          recipient: grantRecipient,
          // Unix timestamp of when attestation expires. (0 for no expiration)
          /* eslint-disable-next-line */
          expirationTime: BigInt(0),
          revocable: false,
          data: schemaEncoder.encodeData([
            // { name: "multisigWallet", value: multisigWallet, type: "address" },
            { name: "grantTitle", value: grantTitle, type: "string" },
            {
              name: "grantDescription",
              value: grantDescription,
              type: "string",
            },
            {
              name: "numberOfMilestones",
              value: numberOfMilestones,
              type: "string",
            },
            { name: "grantAmount", value: grantAmount, type: "uint256" },
          ]),
        },
      },
      { gasLimit: 2500000 }
    );

    setAttestation(result.tx.hash);
    console.log("New attestation UID:", result.tx.hash);
  };

  return (
    <div>
      <div className="h1 -ml-8 mb-10 font-Telegraf text-4xl text-lena">
        {" "}
        <h1>Create Grant </h1>
      </div>
      <div className="flex flex-col justify-center items-center">
        <form
          className="bg-lena border border-black p-12 rounded-xl space-y-6"
          action="#"
          method="POST"
        >
          <div>
            <div className="mt-2 mr-4 flex flex-row ">
              <label className="block w-80  text-m mr-4 mt-2 leading-6 font-medium text-gray-900">
                Grant Title
              </label>
              <input
                id="grantTitle"
                name="grantTitle"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setGrantTitle(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="mt-2 mr-4 flex flex-row ">
              <label className="block w-80  text-m mr-4 mt-2 leading-6 font-medium text-gray-900">
                Grant Recipient
              </label>
              <input
                id="grantRecipient"
                name="grantRecipient"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setGrantRecipient(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="mt-2 mr-4 flex flex-row ">
              <label className="block w-80  text-m mr-4 mt-2 leading-6 font-medium text-gray-900">
                Grant Description
              </label>
              <input
                id="grant description"
                name="grantDescription"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setGrantDescription(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="mt-2 mr-4 flex flex-row ">
              <label className="block w-80  text-m mr-4 mt-2 leading-6 font-medium text-gray-900">
                Number of Milestones
              </label>
              <input
                id="numberOfMilestones"
                name="numberOfMilestones"
                type="number"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setNumberOfMilestones(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="mt-2 mr-4 flex flex-row ">
              <label className="block w-80  text-m mr-4 mt-2 leading-6 font-medium text-gray-900">
                Grant Amount
              </label>
              <input
                id="grantAmount"
                name="grantAmount"
                type="number"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setGrantAmount(Number(e.target.value))}
              />
            </div>
          </div>
        </form>
        <div>
          <button
            className="inline-flex w-80 justify-center rounded-full border px-5 my-5 py-2 text-md font-medium border-wood bg-gypsum text-black hover:bg-snow"
            onClick={() => createAttestation()}
          >
            {"Create"}
          </button>
        </div>
        <div>
          Check out your{" "}
          <Link
            href="/grants"
            className="inline-flex items-center   px-1 pt-1 text-sm font-medium font-Garet text-blessing"
          >
            Grants
          </Link>
        </div>
      </div>
    </div>
  );
}

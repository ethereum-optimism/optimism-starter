import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { useState } from "react";
import { useWalletClient } from "wagmi";
import { useEthersSigner } from "../utils/ethers";

export const EASContractAddress = "0x4200000000000000000000000000000000000021"; // GoerliOptimism v0.26

export default function CreateApprovedGrantPage() {
  const { data: walletClient } = useWalletClient();
  const signer = useEthersSigner();

  const [grantRecipient, setGrantRecipient] = useState(
    "0x99B551F0Bb2e634D726d62Bb2FF159a34964976C"
  );
  const [file, setFile] = useState("");

  const eas = new EAS(EASContractAddress);
  eas.connect(signer);

  const schemaEncoder = new SchemaEncoder("string file, ");

  //string RefUID,string grantTitle,uint256 milestoneNumber,string milestoneDescription,uint256 date,string status
  const encodedData = schemaEncoder.encodeData([
    { name: "file", value: file, type: "string" },
  ]);

  const schemaUID =
    "0xda8a2d9619a05ffcb8dd6fb663777b2bd355c99b7b83a957c3eec3f8ba850709";

  const createAttestation = async () => {
    const offchainAttestation = await eas.attest(
      {
        schema: schemaUID,
        data: {
          recipient: grantRecipient,
          // Unix timestamp of when attestation expires. (0 for no expiration)
          /* eslint-disable-next-line */
          expirationTime: BigInt(0),
          revocable: false,
          data: encodedData,
        },
      },
      {
        gasLimit: 2500000,
      }
    );

    console.log("New attestation UID:", offchainAttestation);
  };

  return (
    <div>
      <div className="h1">Create Approved Grant Page</div>
      <form className="space-y-6" action="#" method="POST">
        <div>
          <div className="mt-2 mr-4 flex flex-row">
            <label className="block text-m mr-4 mt-2 leading-6 font-medium text-gray-900">
              File
            </label>
            <input
              id="file"
              name="file"
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setFile(e.target.value)}
            />
          </div>
        </div>
      </form>
      <div>
        <button
          className="inline-flex w-60 justify-center rounded-full border px-5 my-5 py-2 text-md font-medium border-wood bg-gypsum text-black hover:bg-snow"
          onClick={() => createAttestation()}
        >
          {"Create Attestation"}
        </button>
      </div>
    </div>
  );
}

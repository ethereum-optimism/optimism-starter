import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { useState } from "react";
import { useEthersSigner } from "../utils/ethers";

// export const EASContractAddress = "0x1a5650d0ecbca349dd84bafa85790e3e6955eb84"; // GoerliOptimism v0.26
export const EASContractAddress = " 0xAcfE09Fd03f7812F022FBf636700AdEA18Fd2A7A"; // GoerliBase v0.26

export default function CreateApprovedGrantPage() {
  const signer = useEthersSigner();

  const [grantRecipient, setGrantRecipient] = useState(
    "0x99B551F0Bb2e634D726d62Bb2FF159a34964976C"
  );
  const [RefUID, setRefUID] = useState("");
  const [grantTitle, setGrantTitle] = useState("");
  const [milestoneNumber, setMileStoneNumber] = useState(0);
  const [milestoneDescription, setMilestoneDescription] = useState("");
  const [date, setDate] = useState(0);
  const [status, setStatus] = useState("");

  const eas = new EAS(EASContractAddress);
  eas.connect(signer);

  const schemaEncoder = new SchemaEncoder(
    "string RefUID,string grantTitle,uint256 milestoneNumber,string milestoneDescription,uint256 date,string status"
  );

  //string RefUID,string grantTitle,uint256 milestoneNumber,string milestoneDescription,uint256 date,string status
  const encodedData = schemaEncoder.encodeData([
    { name: "RefUID", value: RefUID, type: "string" },
    { name: "grantTitle", value: grantTitle, type: "string" },
    { name: "milestoneNumber", value: milestoneNumber, type: "uint256" },
    {
      name: "milestoneDescription",
      value: milestoneDescription,
      type: "string",
    },
    { name: "date", value: date, type: "uint256" },
    { name: "status", value: status, type: "string" },
  ]);

  const schemaUID =
    "0xfcdd634433b8be51c4c171791f603be2b8417ed90d648a075de83f405dcfa911";

  const attestationUID =
    "0x6dfce2a2f96d4c2c1e6f5ee34a3c79cf62c0033c6c4db18a9917bbec0dd7a722";

  const createAttestation = async () => {
    const offchainAttestation = await eas.attest(
      {
        schema: schemaUID,
        data: {
          recipient: grantRecipient,
          // Unix timestamp of when attestation expires. (0 for no expiration)
          /* eslint-disable-next-line */
          refUID: attestationUID,
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
      <div className="h1 font-Telegraf text-4xl text-lena">
        {" "}
        <h1>Create Milestone </h1>
      </div>{" "}
      <div className="flex flex-col justify-center items-center">
        <form
          className="bg-lena border border-black p-2 rounded-md space-y-6"
          action="#"
          method="POST"
        >
          {" "}
          <div>
            <div className="mt-2 mr-4 flex flex-row">
              <label className="w-60 block text-m mr-4 mt-2 leading-6 font-medium font-Garet text-gray-900">
                Grant UID
              </label>
              <input
                id="RefUID"
                name="RefUID"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setRefUID(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="mt-2 mr-4 flex flex-row ">
              <label className="w-60 block text-m mr-4 mt-2 leading-6 font-medium font-Garet text-gray-900">
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
              <label className="w-60 block text-m mr-4 mt-2 leading-6 font-medium font-Garet text-gray-900">
                Milestone Description
              </label>
              <input
                id="milestoneDescription"
                name="milestoneDescription"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setMilestoneDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-row">
            <div>
              <div className="mt-2 mr-4 flex flex-row ">
                <label className="w-60 block text-m mr-4 mt-2 leading-6 font-medium font-Garet text-gray-900">
                  Milestone Number
                </label>
                <input
                  id="milestoneNumber"
                  name="milestoneNumber"
                  type="number"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setMileStoneNumber(Number(e.target.value))}
                />
              </div>
            </div>
            <div>
              <div className="mt-2 mr-4 flex flex-row ">
                <label className="w-60 block text-m mr-4 mt-2 leading-6 font-medium font-Garet text-gray-900">
                  Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setDate(new Date(e.target.value).getTime())}
                />
              </div>
            </div>
            <div>
              <div className="mt-2 mr-4 flex flex-row ">
                <label className="w-60 block text-m mr-4 mt-2 leading-6 font-medium font-Garet text-gray-900">
                  Status
                </label>
                <input
                  id="status"
                  name="status"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setStatus(e.target.value)}
                />
              </div>
            </div>
          </div>
        </form>
        <div>
          <button
            className="bg-lena2 inline-flex w-60 justify-center rounded-full border px-5 my-5 py-2 text-md font-medium font-Garet border-wood bg-gypsum text-black hover:bg-snow"
            onClick={() => createAttestation()}
          >
            {"Create Attestation"}
          </button>
        </div>
      </div>
    </div>
  );
}

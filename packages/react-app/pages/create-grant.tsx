import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { useState } from "react";
import { useWalletClient } from "wagmi";

export const EASContractAddress = "0x1a5650d0ecbca349dd84bafa85790e3e6955eb84"; // GoerliOptimism v0.26

export default function CreateApprovedGrantPage() {
  const { data: walletClient } = useWalletClient();

  const [grantRecipient, setGrantRecipient] = useState(
    "0x99B551F0Bb2e634D726d62Bb2FF159a34964976C"
  );
  const [grantTitle, setGrantTitel] = useState("");
  const [bannerURL, setBannerURL] = useState("");
  const [startDate, setStartDate] = useState(0); // date => timestamp
  const [endDate, setEndDate] = useState(0);
  const [numberOfMilestones, setNumberOfMilestones] = useState(0);
  const [grantAmount, setGrantAmount] = useState(0); // eth => BigNumber???

  const eas = new EAS(EASContractAddress);
  eas.connect(walletClient);

  const schemaEncoder = new SchemaEncoder(
    "address grantRecipient,string grantTitle,string bannerURL,uint256 startDate,uint256 endDate,uint256 numberOfMilestones,uint256 grantAmount"
  );
  const encodedData = schemaEncoder.encodeData([
    { name: "grantRecipient", value: grantRecipient, type: "address" },
    { name: "grantTitle", value: grantTitle, type: "string" },
    { name: "bannerURL", value: bannerURL, type: "string" },
    { name: "startDate", value: startDate, type: "uint256" },
    { name: "endDate", value: endDate, type: "uint256" },
    { name: "numberOfMilestones", value: numberOfMilestones, type: "uint256" },
    { name: "grantAmount", value: grantAmount, type: "uint256" },
  ]);

  const schemaUID =
    "0xca41e9d72f7190f0c47f590388930c46c4229f6284f4ca07d59e37f4d5df53e7";

  const createAttestation = async () => {
    const offchain = await eas.getOffchain();

    const offchainAttestation = await offchain.signOffchainAttestation(
      {
        recipient: grantRecipient,
        // Unix timestamp of when attestation expires. (0 for no expiration)
        /* eslint-disable-next-line */
        expirationTime: 0,
        // Unix timestamp of current time
        /* eslint-disable-next-line */
        time: 1671219636,
        revocable: false,
        version: 1,
        /* eslint-disable-next-line */
        nonce: 0,
        schema: schemaUID,
        refUID:
          "0x0000000000000000000000000000000000000000000000000000000000000000",
        data: encodedData,
      },
      walletClient
    );

    console.log("New attestation UID:", offchainAttestation.uid);
  };

  return (
    <div>
      <div className="h1">Create Approved Grant Page</div>
      <form className="space-y-6" action="#" method="POST">
        <div>
          <div className="mt-2 mr-4 flex flex-row">
            <label className="block text-m mr-4 mt-2 leading-6 font-medium text-gray-900">
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
            <label className="block text-m mr-4 mt-2 leading-6 font-medium text-gray-900">
              Grant Titel
            </label>
            <input
              id="grantTitel"
              name="grantTitel"
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setGrantTitel(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="mt-2 mr-4 flex flex-row ">
            <label className="block text-m mr-4 mt-2 leading-6 font-medium text-gray-900">
              Banner URL
            </label>
            <input
              id="bannerURL"
              name="bannerURL"
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setBannerURL(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="mt-2 mr-4 flex flex-row ">
            <label className="block text-m mr-4 mt-2 leading-6 font-medium text-gray-900">
              Start Date
            </label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="mt-2 mr-4 flex flex-row ">
            <label className="block text-m mr-4 mt-2 leading-6 font-medium text-gray-900">
              End Date
            </label>
            <input
              id="endDate"
              name="endDate"
              type="date"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="mt-2 mr-4 flex flex-row ">
            <label className="block text-m mr-4 mt-2 leading-6 font-medium text-gray-900">
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
            <label className="block text-m mr-4 mt-2 leading-6 font-medium text-gray-900">
              Grant Amount
            </label>
            <input
              id="grantAmount"
              name="grantAmount"
              type="number"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setGrantAmount(e.target.value)}
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

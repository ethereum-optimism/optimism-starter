import { useState } from "react";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { useEthersSigner } from "../utils/ethers";

export const EASContractAddress = "0x1a5650d0ecbca349dd84bafa85790e3e6955eb84"; // GoerliOptimism v0.26

export default function CreateApprovedGrantPage() {
  const signer = useEthersSigner();

  const [grantRecipient, setGrantRecipient] = useState(
    "0x99B551F0Bb2e634D726d62Bb2FF159a34964976C"
  );
  const [RefUID, setRefUID] = useState("");
  const [bannerURL, setBannerURL] = useState("");
  const [grantTitle, setGrantTitle] = useState("");
  const [startDate, setStartDate] = useState(0); // date => timestamp
  const [endDate, setEndDate] = useState(0);
  const [numberOfMilestones, setNumberOfMilestones] = useState(0);
  const [grantAmount, setGrantAmount] = useState("");
  const [milestoneDescription, setMilestoneDescription] = useState("");
  
 

  const eas = new EAS(EASContractAddress);
  eas.connect(signer);

  //MULTISIG ON SCHEME//
  const schemaEncoder = new SchemaEncoder(
    "string RefUID,address grantRecipient,string grantTitle,string bannerURL,string milestoneDescription,uint256 startDate,uint256 endDate,uint256 numberOfMilestones,uint256 grantAmount"
  );

  //string RefUID,string grantTitle,uint256 milestoneNumber,string milestoneDescription,uint256 date,string status
  const encodedData = schemaEncoder.encodeData([
    { name: "RefUID", value: RefUID, type: "string" },
    { name: "grantRecipient", value: grantRecipient, type: "address" },
    { name: "grantTitle", value: grantTitle, type: "string" },
    { name: "bannerURL", value: bannerURL, type: "string" },
    { name: "numberOfMilestones", value: numberOfMilestones, type: "uint256" },
    { name: "grantAmount", value: grantAmount, type: "uint256" },
    {name: "milestoneDescription", value: milestoneDescription, type: "string" },
  ]);

  const schemaUID =
    "0xca41e9d72f7190f0c47f590388930c46c4229f6284f4ca07d59e37f4d5df53e7";

  const createAttestation = async () => {
    const offchainAttestation = await eas.attest(
      {
        schema: schemaUID,
        data: {
          recipient: RefUID,
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
      <div className="h1 font-Telegraf text-4xl text-lena">
        {" "}
        <h1>Grant Approval </h1>
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
            <div className="w-80 mt-2 mr-4 flex flex-row">
              <label className="w-60 block text-m mr-4 mt-2 leading-6 font-medium font-Garet text-gray-900">
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

              <div className="flex flex-row">
            <div>
              <div className="mt-2 mr-4 flex flex-row ">
                <label className="w-60 block text-m mr-4 mt-2 leading-6 font-medium font-Garet text-gray-900">
                  Start Date
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    setStartDate(new Date(e.target.value).getTime())
                  }
                />
              </div>
            </div>
            <div>
              <div className="mt-2 mr-4 flex flex-row ">
                <label className="w-60 block text-m mr-4 mt-2 leading-6 font-medium font-Garet text-gray-900">
                  End Date
                </label>
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    setEndDate(new Date(e.target.value).getTime())
                  }
                />
              </div>


              <div className="flex flex-row">
            <div>
              <div className="mt-2 mr-4 flex flex-row ">
                <label className="w-60 block text-m mr-4 mt-2 leading-6 font-medium font-Garet text-gray-900">
                  Nō Milestones
                </label>
                <input
                  id="numberOfMilestones"
                  name="numberOfMilestones"
                  type="number"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    setNumberOfMilestones(Number(e.target.value))
                  }
                />
              </div>


              <div className="mt-2 mr-4 flex flex-row ">
                <label className="w-60 block text-m mr-4 mt-2 leading-6 font-medium font-Garet text-gray-900">
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



</div></div>

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

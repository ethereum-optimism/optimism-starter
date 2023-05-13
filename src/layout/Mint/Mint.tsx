import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { useAccount } from "wagmi";
import Badget from "../../assets/badger.svg";
import Badge from "../../components/UI/Badge";

const Mint = () => {
  const { isConnected, address } = useAccount();

  const badgeList = [
    {
      title: "Trader",
      icon: "",
      subTitle: "Trader",
      description: "Trader",
    },
    {
      title: "Trader",
      icon: "",
      subTitle: "Trader",
      description: "Trader",
    },
  ];

  return (
    <div className="page-container">
      <div>
        <div className="flex flex-row">
          <div className="flex flex-col mr-4">
            <h1 className="mb-7 title">How Fresh Are You?</h1>
            <p className="sub-title">
              Aggregate, analyze, and showcase your DeFi trader performance
              while maintaining your privacy.
            </p>
            <p className="mb-8 sub-title">Mint your zkProof badge today</p>
            {isConnected ? (
              <button className="inverse-base-btn">Check Eligibility</button>
            ) : (
              <ConnectButton />
            )}
          </div>
          <div>
            <img src={Badget} alt="Badger" />
          </div>
        </div>
      </div>
      <div>
        <h1 className="mb-7 title">Badges Available</h1>
        <p className="sub-title">
          Aggregate, analyze, and showcase your DeFi trader performance while
          maintaining your privacy.
        </p>
      </div>
      <div className="flex flex-row gap-4">
        {badgeList.map((badge, index) => (
          <Badge key={index} {...badge} />
        ))}
      </div>
    </div>
  );
};

export default Mint;

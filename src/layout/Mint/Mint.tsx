import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { useAccount } from "wagmi";
import Badget from "../../assets/badger.svg";

const Mint = () => {
  const { isConnected } = useAccount();

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
      <div></div>
    </div>
  );
};

export default Mint;

import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { useAccount } from "wagmi";
import Raccon from "../../assets/raccon.svg";

const Mint = () => {
  const { isConnected } = useAccount();

  return (
    <div className="page-container">
      <div className="flex flex-row">
        <div className="flex flex-col">
          <h1>Unlock your DeFi potential with MintyBadger!</h1>
          <p>
            Aggregate, analyze, and showcase your DeFi trader performance while
            maintaining your privacy.
          </p>
          <p>Mint your zkProof badge today</p>
          {isConnected ? (
            <button className="mint-btn">Check Eligibility</button>
          ) : (
            <ConnectButton />
          )}
        </div>
        <div>
          <img src={Raccon} alt="" className="w-[647px] h-[466px]" />
        </div>
      </div>
    </div>
  );
};

export default Mint;

import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { useAccount } from "wagmi";
import Badger from "../../assets/badger.svg";

// Assets
import JustSproutedSvg from "../../assets/tiers/just-sprouted.svg";
import BreezyMintSvg from "../../assets/tiers/breezy-mint.svg";
import FreshlyPickedSvg from "../../assets/tiers/freshly-picked.svg";
import CoolingSensationSvg from "../../assets/tiers/cooling-sensation.svg";
import SuperFreshSvg from "../../assets/tiers/super-fresh.svg";
import Badge from "../../components/UI/Badge";

const Mint = () => {
  const { isConnected, address } = useAccount();

  const tierData = [
    {
      title: "Just Sprouted",
      icon: JustSproutedSvg,
      subTitle: "Tier 1",
      description: "You've just started your journey towards freshness!",
    },
    {
      title: "Breezy Mint",
      icon: BreezyMintSvg,
      subTitle: "Tier 2",
      description: "You're experiencing a gentle breeze of minty freshness!",
    },
    {
      title: "Freshly Picked",
      icon: FreshlyPickedSvg,
      subTitle: "Tier 3",
      description:
        "You're enjoying the crispness of freshly picked refreshment!",
    },
    {
      title: "Cooling Sensation",
      icon: CoolingSensationSvg,
      subTitle: "Tier 4",
      description: "You've reached a new level of invigorating coolness!",
    },
    {
      title: "SuperFresh",
      icon: SuperFreshSvg,
      subTitle: "Tier 5",
      description: "Congratulations! You've achieved the ultimate freshness!",
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
            <img src={Badger} alt="Badger" />
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
        {tierData.map((badge, index) => (
          <Badge key={index} {...badge} />
        ))}
      </div>
    </div>
  );
};

export default Mint;

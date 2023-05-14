import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { useAccount } from "wagmi";
import Badger from "../../assets/badger.svg";
import Carousel from "nuka-carousel";

// Assets
import JustSproutedSvg from "../../assets/tiers/just-sprouted.svg";
import BreezyMintSvg from "../../assets/tiers/breezy-mint.svg";
import FreshlyPickedSvg from "../../assets/tiers/freshly-picked.svg";
import CoolingSensationSvg from "../../assets/tiers/cooling-sensation.svg";
import SuperFreshSvg from "../../assets/tiers/super-fresh.svg";
import Badge from "../../components/UI/Badge";
import { BadgeData } from "../../state/badges/types";

const carouselItemStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  borderRadius: "10px",
  padding: "20px",
  margin: "10px",
};

const Mint = () => {
  const { isConnected, address } = useAccount();

  const badgeData: BadgeData[] = [
    {
      badgeId: 1,
      name: "First Swap",
      imageUri: JustSproutedSvg,
      tier: "Tier 1",
      protocolId: 1,
      description: "First swap on Uniswap.",
      eligibilityStatus: "idle",
    },
    {
      badgeId: 2,
      name: "Liquidity Providing",
      imageUri: JustSproutedSvg,
      tier: "Tier 1",
      protocolId: 1,
      description: "First time you provided liquidity to a pool on Uniswap.",
      eligibilityStatus: "idle",
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
      <Carousel
        autoplay
        autoplayInterval={3000}
        pauseOnHover
        wrapAround
        renderCenterLeftControls={({ previousSlide }) => (
          <button onClick={previousSlide}>&lt;</button>
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <button onClick={nextSlide}>&gt;</button>
        )}
      >
        {badgeData.map((badge, index) => (
          <div key={index} style={carouselItemStyles}>
            <Badge {...badge} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Mint;

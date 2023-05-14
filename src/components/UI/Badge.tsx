import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { useAccount } from "wagmi";
import { useCheckUserEligibility } from "../../state/badges/hooks";
import { BadgeData, HexAddress } from "../../state/badges/types";
import ProtocolImage from "./ProtocolImage";

const Badge = (props: BadgeData) => {
  const { isConnected, address } = useAccount();

  const {
    eligibilityStatus,
    isLoading,
    error,
    refetch: checkUserEligibility,
  } = useCheckUserEligibility(
    address as HexAddress,
    props.badgeId,
    props.protocolId,
  );
  const generatButton = () => {
    if (eligibilityStatus && isConnected) {
      return <button className="inverse-base-btn">Mint Badge</button>;
    } else if (!eligibilityStatus && isConnected) {
      return (
        <button
          className="inverse-base-btn"
          onClick={() => checkUserEligibility()}
        >
          Check Eligibility
        </button>
      );
    } else if (eligibilityStatus && !isConnected) {
      return <ConnectButton />;
    } else {
      return <button className="inverse-base-btn">Check Eligibility</button>;
    }
  };

  return (
    <div className="badge">
      <div className="badge-icon">
        <ProtocolImage protocolId={props.protocolId} />
      </div>
      <div className="badge-content">
        <h2 className="badge-title">{props.name}</h2>
        <h3 className="badge-subtitle">{props.tier}</h3>
        <p className="badge-description">{props.description}</p>
        <p className="badge-eligibility">{props.protocolId}</p>
      </div>
      <div className="badge-button">{generatButton()}</div>
    </div>
  );
};

export default Badge;

import React from "react";
import mainlogo from "../../assets/main-logo.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Navbar from "./Navbar";

const Header = () => {
  const { isConnected } = useAccount();
  return (
    <div className="flex flex-row justify-between bg-primary">
      <img src={mainlogo} alt="" />
      <Navbar />
      <ConnectButton />
    </div>
  );
};

export default Header;

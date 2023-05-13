import React from 'react'
import mainlogo from '../../assets/main-logo.svg'
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <div>
      <img src={mainlogo} alt="" />
      <ConnectButton />
    </div>
  )
}

export default Header
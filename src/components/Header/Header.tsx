import React from 'react'
import mainlogo from '../../assets/main-logo.svg'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi';

const Header = () => {
  const { isConnected } = useAccount();
  return (
    <div className='flex flex-row justify-between'>
      <img src={mainlogo} alt="" />

      <ConnectButton />
    </div>
  )
}

export default Header
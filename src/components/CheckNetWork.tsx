'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useChainId } from 'wagmi'

const CheckNetWork = ({ children }: { children: React.ReactNode }) => {
  const chainId = useChainId()

  if (chainId !== 11155111) {
    return (
      <div className='flex flex-col h-screen items-center justify-center'>
        <p className='p-4'>please connect to sepolia testnet!!!</p>
        <ConnectButton />
      </div>
    )
  }
  return <>{children}</>
}

export default CheckNetWork

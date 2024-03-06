import { ConnectButton } from '@rainbow-me/rainbowkit'
import { FC } from 'react'
import { useChainId } from 'wagmi'
import { useIsMounted } from './useIsMounted'

const CheckNetWork: FC<any> = ({ children }) => {
  const isMounted = useIsMounted()
  const chainId = useChainId()
  if (!isMounted) {
    return <></>
  }
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

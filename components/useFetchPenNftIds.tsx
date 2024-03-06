import { Address } from 'viem'
import { useAccount, useReadContract } from 'wagmi'
import { nftContractObj } from '../utils/contracts/nftContract'

const useFetchPenNftIds = () => {
  const { address: currentAccount } = useAccount()

  const { data: tokenIds } = useReadContract({
    ...nftContractObj,
    account: currentAccount,
    functionName: 'getTokenIds',
    args: [currentAccount] as [Address],
    query: {
      enabled: !!currentAccount,
    },
  })

  return tokenIds
}

export default useFetchPenNftIds

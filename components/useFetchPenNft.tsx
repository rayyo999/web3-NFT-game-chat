import { Result } from 'ethers/lib/utils'
import { useAccount, useContractRead, useContractReads } from 'wagmi'
import { nftContractObj } from '../utils/contracts/nftContract'
import { Inft } from '../utils/types/Inft'

const useFetchPenNft = () => {
  const { address: currentAccount } = useAccount()
  const { data: tokenIds, isLoading: isLoadingPenNfts } = useContractRead({
    ...nftContractObj,
    functionName: 'getTokenIds',
    args: [currentAccount!],
    select: (tokenIds) => tokenIds.map((tokenId) => tokenId.toNumber()),
    watch: true,
    overrides: { from: currentAccount },
    enabled: !!currentAccount,
  })
  const { data: rawPenNfts } = useContractReads({
    contracts:
      tokenIds?.map((tokenId) => {
        return {
          ...nftContractObj,
          functionName: 'penOfTokenId',
          args: [tokenId],
        }
      }) || [],
    enabled: !!tokenIds,
    watch: true,
  })
  const transfromNFTData = (characterData: Result, index: number): Inft => {
    return {
      tokenId: tokenIds![index],
      name: characterData.name,
      imageURI: characterData.imageURI,
      hp: characterData.hp.toString(),
      maxHp: characterData.maxHp.toString(),
      attackDamage: characterData.attackDamage.toString(),
    }
  }
  const penNfts = rawPenNfts?.map((rawPenNft, index) => {
    return transfromNFTData(rawPenNft, index)
  })

  return penNfts
}

export default useFetchPenNft

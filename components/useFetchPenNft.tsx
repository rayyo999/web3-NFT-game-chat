import { useReadContract } from 'wagmi'
import { nftContractObj } from '../utils/contracts/nftContract'

interface UseFetchPanNft {
  tokenId: bigint
}

const useFetchPenNft = ({ tokenId }: UseFetchPanNft) => {
  const { data: rawPenNft } = useReadContract({
    ...nftContractObj,
    functionName: 'penOfTokenId',
    args: [tokenId],
  })

  function transfromNFTData(characterData: NonNullable<typeof rawPenNft>) {
    return {
      tokenId: characterData[0],
      name: characterData[1],
      imageURI: characterData[2],
      hp: characterData[3].toString(),
      maxHp: characterData[4].toString(),
      attackDamage: characterData[5].toString(),
    }
  }

  if (!rawPenNft) return

  return transfromNFTData(rawPenNft)
}

export default useFetchPenNft

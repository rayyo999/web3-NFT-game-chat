import { useReadContract } from 'wagmi'

import { nftContractObj } from '~/utils/contracts/nftContract'

const useFetchBossNft = () => {
  const { data: bossRawNft } = useReadContract({
    ...nftContractObj,
    functionName: 'boss',
  })

  function transfromNFTData(characterData: NonNullable<typeof bossRawNft>) {
    return {
      name: characterData[0],
      imageURI: characterData[1],
      hp: characterData[2].toString(),
      maxHp: characterData[3].toString(),
      attackDamage: characterData[4].toString(),
    }
  }

  if (!bossRawNft) return

  return transfromNFTData(bossRawNft)
}

export default useFetchBossNft

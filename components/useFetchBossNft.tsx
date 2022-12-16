import { Result } from 'ethers/lib/utils'
import { useMemo } from 'react'
import { useContractRead } from 'wagmi'
import { nftContractObj } from '../utils/contracts/nftContract'

const useFetchBossNft = () => {
  const { data: bossRawNft }: { data: Result | undefined } = useContractRead({
    ...nftContractObj,
    functionName: 'boss',
    watch: true,
  })
  const transfromNFTData = (characterData: Result | undefined) => {
    return {
      name: characterData?.name,
      imageURI: characterData?.imageURI,
      hp: characterData?.hp.toString(),
      maxHp: characterData?.maxHp.toString(),
      attackDamage: characterData?.attackDamage.toString(),
    }
  }
  const bossNft = useMemo(() => {
    if (!bossRawNft) {
      return
    }
    return transfromNFTData(bossRawNft)
  }, [bossRawNft])
  return bossNft
}

export default useFetchBossNft

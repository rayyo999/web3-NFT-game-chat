import { useWriteContract } from 'wagmi'

import { nftContractObj } from '~/utils/contracts/nftContract'

type UseAttackBoss = {
  tokenId: bigint
}

const useAttackBoss = ({ tokenId }: UseAttackBoss) => {
  const { writeContract, status } = useWriteContract()

  return {
    attack: () =>
      writeContract({
        ...nftContractObj,
        functionName: 'attack',
        args: [tokenId],
      }),
    status,
  }
}

export default useAttackBoss

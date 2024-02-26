import { useContractWrite } from 'wagmi'
import { nftContractObj } from '../utils/contracts/nftContract'
// import nftContractInterface from '../utils/contracts/nftContract.json'

const useAttackBoss = () => {
  // const {config} = usePrepareContractWrite({
  //   ...nftContractObj,
  //   functionName: 'attack',
  // });
  // return useContractWrite(config)
  return useContractWrite({
    ...nftContractObj,
    mode: 'recklesslyUnprepared',
    functionName: 'attack',
  })
}

export default useAttackBoss

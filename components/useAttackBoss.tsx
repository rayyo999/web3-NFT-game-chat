import { useContractWrite } from 'wagmi';
import nftContractInterface from '../utils/contracts/nftContract.json';

const nftContractAddress = '0x5AB0eA47065F07420Aed2271C798Ba2d4f1Cf8c0';
const nftContractABI = nftContractInterface.abi;
const nftContractObj = {
  addressOrName: nftContractAddress,
  contractInterface: nftContractABI,
};

const useAttackBoss = () => {
  const result = useContractWrite({
    ...nftContractObj,
    functionName: 'attack',
  });
  return result;
};

export default useAttackBoss;

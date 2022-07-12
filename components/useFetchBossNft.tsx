import { Result } from 'ethers/lib/utils';
import { useMemo } from 'react';
import { useContractRead } from 'wagmi';
import nftContractInterface from '../utils/contracts/nftContract.json';

const nftContractAddress = '0x5AB0eA47065F07420Aed2271C798Ba2d4f1Cf8c0';
const nftContractABI = nftContractInterface.abi;
const nftContractObj = {
  addressOrName: nftContractAddress,
  contractInterface: nftContractABI,
};

const useFetchBossNft = () => {
  const { data: bossRawNft } = useContractRead({
    ...nftContractObj,
    functionName: 'boss',
    watch: true,
  });
  const transfromNFTData = (characterData: Result) => {
    return {
      name: characterData.name,
      imageURI: characterData.imageURI,
      hp: characterData.hp.toString(),
      maxHp: characterData.maxHp.toString(),
      attackDamage: characterData.attackDamage.toString(),
    };
  };
  const bossNft = useMemo(() => {
    if (!bossRawNft) {
      return;
    }
    return transfromNFTData(bossRawNft);
  }, [bossRawNft]);
  return bossNft;
};

export default useFetchBossNft;

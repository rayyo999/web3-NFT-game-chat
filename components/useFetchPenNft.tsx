import { Result } from 'ethers/lib/utils';
import { useAccount, useContractRead, useContractReads } from 'wagmi';
import nftContractInterface from '../utils/contracts/nftContract.json';
import { Inft } from '../utils/types/Inft';

const nftContractAddress = '0x5AB0eA47065F07420Aed2271C798Ba2d4f1Cf8c0';
const nftContractABI = nftContractInterface.abi;
const nftContractObj = {
  addressOrName: nftContractAddress,
  contractInterface: nftContractABI,
};

const useFetchPenNft = () => {
  const { address: currentAccount } = useAccount();
  const { data: tokenIds, isLoading: isLoadingTokenIds } = useContractRead({
    ...nftContractObj,
    functionName: 'getTokenIds',
    args: currentAccount,
    select: (tokenIds) => tokenIds.map((tokenId) => tokenId.toNumber()),
    watch: true,
    overrides: { from: currentAccount },
    enabled: !!currentAccount,
  });
  const { data: rawPenNfts } = useContractReads({
    contracts:
      tokenIds?.map((tokenId) => {
        return {
          ...nftContractObj,
          functionName: 'penOfTokenId',
          args: tokenId,
        };
      }) || [],
    enabled: !!tokenIds,
    watch: true,
  });
  const transfromNFTData = (characterData: Result, index: number): Inft => {
    return {
      tokenId: tokenIds?.[index],
      name: characterData.name,
      imageURI: characterData.imageURI,
      hp: characterData.hp.toString(),
      maxHp: characterData.maxHp.toString(),
      attackDamage: characterData.attackDamage.toString(),
    };
  };
  const penNfts = rawPenNfts?.map((rawPenNft, index) => {
    return transfromNFTData(rawPenNft, index);
  });

  return penNfts;
};

export default useFetchPenNft;

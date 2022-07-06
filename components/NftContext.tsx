import {
  useState,
  useEffect,
  useLayoutEffect,
  createContext,
  FC,
  useContext,
} from 'react';
// import twitterLogo from './assets/twitter-logo.svg';
import { Contract, providers, BigNumber } from 'ethers';
import nftContractInterface from '../utils/contracts/nftContract.json';
import { useChatroomContext } from './ChatroomContext';
import { IrawNft } from '../utils/types/IrawNft';
import { Inft } from '../utils/types/Inft';
declare var window: any;

// Constants
const nftContractAddress = '0xF2598A056E78b09c500F7EdC3Ee2E6e2D26d9c4a';
const nftContractABI = nftContractInterface.abi;

const NftContext: any = createContext(null);
export const useNftContext = () => useContext(NftContext);

const NftProvider: FC<any> = ({ children }) => {
  const { currentAccount }: any = useChatroomContext();
  const [nftContract, setNftContract] = useState<Contract | undefined>();
  // const [characterNFT, setcharacterNFT] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenIds, setTokenIds] = useState<number[]>([]); ////////
  const [tokenIdToNFT, setTokenIdToNFT] = useState<Map<number, Inft>>(
    new Map()
  ); ///////
  let ethereum: any;
  if (typeof window !== 'undefined') {
    ethereum = window.ethereum;
  }
  useLayoutEffect(() => {
    ////
    setTokenIds([]);
    setTokenIdToNFT(new Map());
  }, [currentAccount]);

  const getNftContract = async () => {
    try {
      if (!ethereum) {
        console.log("u don't get ethereum object");
        return;
      }
      const provider = new providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contractInstance = new Contract(
        nftContractAddress,
        nftContractABI,
        signer
      );
      console.log('Get nftContract!', contractInstance.address);
      setNftContract(contractInstance);
    } catch (error) {
      console.error(error);
    }
  };

  const transfromNFTData = (characterData: IrawNft): Inft => {
    return {
      name: characterData.name,
      imageURI: characterData.imageURI,
      hp: characterData.hp.toString(),
      maxHp: characterData.maxHp.toString(),
      attackDamage: characterData.attackDamage.toString(),
    };
  };

  const getCharacterNFT = async () => {
    try {
      if (!nftContract) {
        console.log('nftContract no found');
        return;
      }
      // const ids = [];
      const tokenIds = await nftContract.getTokenIds(currentAccount);
      if (tokenIds.length > 0) {
        tokenIds.forEach(async (item: BigNumber) => {
          const tokenId = item.toNumber();
          // ids.push(tokenId); ////
          const character = await nftContract.penOfTokenId(tokenId);
          const transfromCharacter = transfromNFTData(character);
          await setMap(tokenId, { ...transfromCharacter, tokenId }); //////////
          setTokenIds((prev) => [...prev, tokenId]); ////////////////////
        });
        // setTokenIds(ids); ////////
      } else {
        console.log('no NFT found!!!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setMap = async (tokenId: number, NFT: Inft) => {
    setTokenIdToNFT(tokenIdToNFT.set(tokenId, NFT));
  };

  useEffect(() => {
    getNftContract();
    // setIsLoading(true);
    getCharacterNFT();
    // setIsLoading(false);
  }, [currentAccount]);

  return (
    <NftContext.Provider
      value={{
        nftContract,
        isLoading,
        tokenIds,
        transfromNFTData,
        getCharacterNFT,
        tokenIdToNFT,
        setMap,
      }}
    >
      {children}
    </NftContext.Provider>
  );
};

export default NftProvider;

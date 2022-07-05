import { useState, useEffect, FC } from 'react';
import { useNftContext } from './NftContext';
import { IrawNft } from '../utils/types/IrawNft';
import Image from 'next/image';
import LoadingIndicator from './LoadingIndicator';
import { BigNumber } from 'ethers';

const SelectNft: FC = () => {
  const { nftContract, transfromNFTData, getCharacterNFT }: any =
    useNftContext();
  const [characters, setcharacters] = useState<IrawNft[]>([]);
  const [isMinting, setIsMinting] = useState(false);

  const getNFTTemplate = async () => {
    try {
      if (nftContract) {
        const NFTTemplate = await nftContract.getTemplate();
        const transfromNFTs = NFTTemplate.map((item: IrawNft) => {
          return transfromNFTData(item);
        });
        setcharacters(transfromNFTs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const mint = async (index: number) => {
    try {
      if (nftContract) {
        setIsMinting(true);
        console.log('Minting.... May take a while.....');
        const mintTxn = await nftContract.mint(index);
        await mintTxn.wait();
        console.log('Minted!!!!!!');
        setIsMinting(false);
      }
    } catch (error) {
      setIsMinting(false);
      console.log(error);
    }
  };

  const onMintEvent = async (
    sender: string,
    tokenId: BigNumber,
    Pen: IrawNft
  ) => {
    console.log(
      `Mint Complete!  sender: ${sender}, tokenId: ${tokenId.toNumber()}, Pen: ${Pen} `
    );
    getCharacterNFT();
  };

  const renderCharacter = () => {
    return characters.map((character, index) => {
      return (
        <div className='character-item' key={character.name}>
          <div className='name-container'>
            <p>{character.name}</p>
          </div>
          <img
            src={character.imageURI}
            alt={character.name}
          />
          <button
            type='button'
            className='character-mint-button'
            onClick={() => mint(index)}
          >{`Mint ${character.name}`}</button>
        </div>
      );
    });
  };

  useEffect(() => {
    getNFTTemplate();
    if (!nftContract) {
      return;
    }
    nftContract.on('mintEvent', onMintEvent);
    return () => {
      nftContract.off('mintEvent', onMintEvent);
    };
  }, [nftContract]);

  return (
    <div className='select-character-container'>
      <h2>Mint your Pen. Choose wisely.</h2>
      {characters.length > 0 && (
        <div className='character-grid'>{renderCharacter()}</div>
      )}
      {isMinting && (
        <div className='loading'>
          <div className='indicator'>
            <LoadingIndicator />
            <p>Minting In Progress...</p>
          </div>
          <img
            src='https://media2.giphy.com/media/61tYloUgq1eOk/giphy.gif?cid=ecf05e47dg95zbpabxhmhaksvoy8h526f96k4em0ndvx078s&rid=giphy.gif&ct=g'
            alt='Minting loading indicator'
          />
        </div>
      )}
    </div>
  );
};

export default SelectNft;

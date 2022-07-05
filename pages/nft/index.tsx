import Image from 'next/image';
import { FC } from 'react';
import BattleNft from '../../components/BattleNft';
import { useChatroomContext } from '../../components/ChatroomContext';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useNftContext } from '../../components/NftContext';
import SelectNft from '../../components/SelectNft';

const Nft: FC = () => {
  const { currentAccount, getAccount }: any = useChatroomContext();
  const { isLoading, tokenIds }: any = useNftContext();
  const renderContent = () => {
    if (isLoading) {
      return <LoadingIndicator />;
    }
    if (currentAccount === null) {
      return (
        <div className='connect-wallet-container'>
          <img
            src='https://64.media.tumblr.com/tumblr_mbia5vdmRd1r1mkubo1_500.gifv'
            alt='Monty Python Gif'
          />
          <button
            className='cta-button connect-wallet-button'
            onClick={getAccount}
          >
            Connect Wallet
          </button>
        </div>
      );
      // } else if (currentAccount && characterNFT === null) {
    } else if (currentAccount && tokenIds.length === 0) {
      return <SelectNft />;
    } else if (currentAccount && tokenIds.length > 0) {
      return <BattleNft />;
    }
  };
  return (
    <div className=''>
      <div className=''>
        <div className=''>
          <p className=''>⚔️ Metaverse Slayer ⚔️</p>
          <p className=''>Team up to protect the Metaverse!</p>
          <button>123asd456</button>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
export default Nft;

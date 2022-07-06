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
    if (!currentAccount) {
      return (
        <div className='flex flex-col items-center'>
          <img
            src='https://64.media.tumblr.com/tumblr_mbia5vdmRd1r1mkubo1_500.gifv'
            alt='Monty Python Gif'
          />
          <p className='pt-2'>Connect Wallet first, then be a Hero !!!!</p>
        </div>
      );
    } else if (currentAccount && tokenIds.length === 0) {
      return <SelectNft />;
    } else if (currentAccount && tokenIds.length > 0) {
      return <BattleNft />;
    }
  };
  return (
    <div className='h-full bg-red-500 text-center pt-16'>
      <div className='flex flex-col overflow-x-hidden'>
        <p className='text-4xl'>⚔️ Metaverse Slayer ⚔️</p>
        <p className='py-4'>Team up to protect the Metaverse!</p>
        {renderContent()}
      </div>
    </div>
  );
};
export default Nft;

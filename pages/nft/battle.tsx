import { FC } from 'react';
import { useIsMounted } from '../../components/useIsMounted';
import BossCard from '../../components/Nft/BossCard';
import PenCards from '../../components/Nft/PenCards';
import useFetchPenNft from '../../components/useFetchPenNft';

const Battle: FC = () => {
  const isMounted = useIsMounted();
  const penNfts = useFetchPenNft();
  
  if (!isMounted) {
    return <></>;
  }
  return (
    <div className='bg-red-800 p-4'>
      <BossCard />
      <PenCards penNfts={penNfts} isBattle={true} />
    </div>
  );
};
export default Battle;

import { nanoid } from 'nanoid';
import { FC } from 'react';
import useFetchPenNft from '../useFetchPenNft';
import PenCard from './PenCard';

interface Props {
  isBattle: boolean;
}
const PenCards: FC<Props> = ({ isBattle }) => {
  const penNfts = useFetchPenNft();

  return (
    <div className='text-center grid grid-cols-3 gap-1  md:grid-cols-4 lg:grid-cols-5'>
      {penNfts?.map((penNft) => {
        return <PenCard key={nanoid()} penNft={penNft} isBattle={isBattle} />;
      })}
    </div>
  );
};

export default PenCards;

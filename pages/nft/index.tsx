import { FC } from 'react';
import { useIsMounted } from '../../components/useIsMounted';
import Link from 'next/link';
import PenCards from '../../components/Nft/PenCards';

const NftProvider: FC = () => {
  console.log('NFTProvider rendering');
  const isMounted = useIsMounted();

  if (!isMounted) {
    return <></>;
  }
  return (
    <div className='bg-stone-400 h-full px-4 text-center'>
      <div className='flex justify-evenly h-24 gap-3'>
        <Link href='/nft/mint'>
          <div className='bg-stone-500 rounded-lg p-4 w-1/2'>
            <p>enpower your army! link to select page</p>
          </div>
        </Link>
        <Link href='/nft/battle'>
          <div className='bg-stone-600 rounded-lg p-4 w-1/2'>
            <p>battle field link to battle page</p>
          </div>
        </Link>
      </div>
      <h3 className='p-4'>Your Army</h3>
      <PenCards isBattle={false} />
    </div>
  );
};

export default NftProvider;

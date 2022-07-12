import { FC } from 'react';
import { useIsMounted } from '../../components/useIsMounted';
import Link from 'next/link';
import PenCards from '../../components/Nft/PenCards';
import { motion } from 'framer-motion';
import useFetchPenNft from '../../components/useFetchPenNft';

const NftProvider: FC = () => {
  const isMounted = useIsMounted();
  const penNfts = useFetchPenNft();

  if (!isMounted) {
    return <></>;
  }
  return (
    <div className='bg-stone-400 h-full px-4 py-2'>
      <div className='flex justify-evenly h-20 gap-3'>
        <Link href='/nft/mint'>
          <motion.button
            className='bg-emerald-600 rounded-lg p-4 w-1/2 flex items-center justify-center'
            whileHover={{ scale: 1.02 }}
          >
            <p>enpower your army!</p>
          </motion.button>
        </Link>
        <Link href='/nft/battle'>
          <motion.button
            className='bg-red-800 rounded-lg p-4 w-1/2 flex items-center justify-center'
            whileHover={{ scale: 1.02 }}
            disabled={!penNfts}
          >
            {penNfts && <p>battle field</p>}
            {!penNfts && <p>battle field is not available before getting a warrior</p>}
          </motion.button>
        </Link>
      </div>
      <h3 className='p-2 text-3xl text-center'>Your Army</h3>
      <PenCards penNfts={penNfts} isBattle={false} />
    </div>
  );
};

export default NftProvider;

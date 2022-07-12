import { FC, useState } from 'react';
import { useContractRead, useContractWrite } from 'wagmi';
import { useIsMounted } from '../../components/useIsMounted';
import nftContractInterface from '../../utils/contracts/nftContract.json';
import { motion } from 'framer-motion';
import { nanoid } from 'nanoid';
import Link from 'next/link';

const nftContractAddress = '0x5AB0eA47065F07420Aed2271C798Ba2d4f1Cf8c0';
const nftContractABI = nftContractInterface.abi;
const nftContractObj = {
  addressOrName: nftContractAddress,
  contractInterface: nftContractABI,
};

const Mint: FC = () => {
  const [selectNftId, setSelectNftId] = useState(0);
  const isMounted = useIsMounted();
  const { data: templateNfts } = useContractRead({
    ...nftContractObj,
    functionName: 'getTemplate',
  });
  const { write: mint } = useContractWrite({
    ...nftContractObj,
    functionName: 'mint',
  });
  if (!isMounted) {
    return <></>;
  }
  return (
    <div className='bg-emerald-600 h-full p-4'>
      <Link href='/nft'>
        <motion.button
          className='p-4 bg-stone-400 rounded-lg'
          whileHover={{ scale: 1.05 }}
        >
          back to Nft page
        </motion.button>
      </Link>
      <div className='flex justify-center gap-2 mt-4'>
        {templateNfts?.map((templateNft, index) => {
          return (
            <motion.div
              className='relative basis-1/3 md:basis-1/4 lg:basis-1/5'
              key={templateNft.name}
              onClick={() => {
                setSelectNftId(index);
              }}
              whileHover={{ scale: 1.05 }}
            >
              {selectNftId === index && (
                <motion.div
                  layoutId='border'
                  className='absolute inset-0 outline outline-4 outline-black rounded-lg z-10'
                ></motion.div>
              )}
              <div className='relative overflow-hidden rounded-t-lg'>
                <img
                  src={templateNft.imageURI}
                  alt={templateNft.name}
                  className='w-full aspect-square object-cover'
                />
              </div>
              <button
                type='button'
                className='relative w-full py-1 text-white bg-blue-600 rounded-b-lg z-20'
                onClick={() => mint({ args: [index] })}
              >{`Mint ${templateNft.name}`}</button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Mint;

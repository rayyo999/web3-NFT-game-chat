import { motion } from 'framer-motion'
import Link from 'next/link'
import { FC, useState } from 'react'
import { useReadContract, useWriteContract } from 'wagmi'
import { useIsMounted } from '../../components/useIsMounted'
import { nftContractObj } from '../../utils/contracts/nftContract'

const Mint: FC = () => {
  const [selectNftId, setSelectNftId] = useState(0)
  const isMounted = useIsMounted()
  const { data: templateNfts } = useReadContract({
    ...nftContractObj,
    functionName: 'getTemplate',
  })
  const { writeContract: mint } = useWriteContract()

  if (!isMounted) {
    return <></>
  }

  return (
    <div className='bg-emerald-600 h-full p-4'>
      <Link href='/nft'>
        <motion.button className='p-4 bg-stone-400 rounded-lg' whileHover={{ scale: 1.05 }}>
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
                setSelectNftId(index)
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
                onClick={() =>
                  mint({
                    ...nftContractObj,
                    functionName: 'mint',
                    args: [index],
                  })
                }
                disabled={!mint}
              >{`Mint ${templateNft.name}`}</button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default Mint

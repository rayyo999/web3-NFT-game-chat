'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { useWriteContract } from 'wagmi'

import { nftContractObj } from '~/utils/contracts/nftContract'

export default function MintOption({
  templateNft,
  templateNumber,
}: {
  templateNft: {
    index: bigint
    name: string
    imageURI: string
    hp: bigint
    maxHp: bigint
    attackDamage: bigint
  }

  templateNumber: number
}) {
  const [selectNftId, setSelectNftId] = useState(0)
  const { writeContract: mint } = useWriteContract()

  return (
    <motion.div
      className='relative basis-1/3 md:basis-1/4 lg:basis-1/5'
      key={templateNft.name}
      onClick={() => {
        setSelectNftId(templateNumber)
      }}
      whileHover={{ scale: 1.05 }}
    >
      {selectNftId === templateNumber && (
        <motion.div
          layoutId='border'
          className='absolute inset-0 outline outline-4 outline-black rounded-lg z-10'
        ></motion.div>
      )}
      <div className='relative overflow-hidden rounded-t-lg'>
        <Image
          src={templateNft.imageURI}
          alt={templateNft.name}
          width={400}
          height={400}
          className='aspect-square object-cover w-full'
        />
      </div>
      <button
        type='button'
        className='relative w-full py-1 text-white bg-blue-600 rounded-b-lg z-20'
        onClick={() =>
          mint({
            ...nftContractObj,
            functionName: 'mint',
            args: [templateNumber],
          })
        }
        disabled={!mint}
      >{`Mint ${templateNft.name}`}</button>
    </motion.div>
  )
}

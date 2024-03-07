'use client'

import { useReadContract } from 'wagmi'

import { nanoid } from 'nanoid'
import { nftContractObj } from '~/utils/contracts/nftContract'
import MintOption from './mintOption'

export default function MintOptions() {
  const { data: templateNfts } = useReadContract({
    ...nftContractObj,
    functionName: 'getTemplate',
  })

  return (
    <div className='flex justify-center gap-2 mt-4'>
      {templateNfts?.map((templateNft, index) => {
        return <MintOption key={nanoid()} templateNft={templateNft} templateNumber={index} />
      })}
    </div>
  )
}

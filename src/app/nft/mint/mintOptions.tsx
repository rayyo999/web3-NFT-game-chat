'use client'

import { useState } from 'react'
import { useReadContract } from 'wagmi'

import { nftContractObj } from '~/utils/contracts/nftContract'
import MintOption from './mintOption'

export default function MintOptions() {
  const [selectNftId, setSelectNftId] = useState(0)

  const { data: templateNfts } = useReadContract({
    ...nftContractObj,
    functionName: 'getTemplate',
  })

  return (
    <div className='flex justify-center gap-2 mt-4'>
      {templateNfts?.map((templateNft, index) => {
        return (
          <MintOption
            key={index}
            templateNft={templateNft}
            templateNumber={index}
            selectNftId={selectNftId}
            setSelectNftId={setSelectNftId}
          />
        )
      })}
    </div>
  )
}

'use client'

import { nanoid } from 'nanoid'
import { FC } from 'react'

import PenCard from '~/components/Nft/PenCard'
import useFetchPenNftIds from '~/hooks/useFetchPenNftIds'

interface Props {
  isBattle: boolean
}
const PenCards: FC<Props> = ({ isBattle }) => {
  const penNftIds = useFetchPenNftIds()

  return (
    <div className='text-center grid grid-cols-3 gap-1  md:grid-cols-4 lg:grid-cols-5'>
      {penNftIds?.map((tokenId) => {
        return <PenCard key={nanoid()} tokenId={tokenId} isBattle={isBattle} />
      })}
    </div>
  )
}

export default PenCards

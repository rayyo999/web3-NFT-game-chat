import { nanoid } from 'nanoid'
import { FC } from 'react'
import { Inft } from '../../utils/types/Inft'
import PenCard from './PenCard'

interface Props {
  penNfts: Inft[] | undefined
  isBattle: boolean
}
const PenCards: FC<Props> = ({ penNfts, isBattle }) => {
  return (
    <div className='text-center grid grid-cols-3 gap-1  md:grid-cols-4 lg:grid-cols-5'>
      {!isBattle &&
        penNfts?.map((penNft) => {
          return <PenCard key={nanoid()} penNft={penNft} isBattle={isBattle} />
        })}
      {isBattle &&
        penNfts
          ?.filter((penNft) => Number(penNft.hp) > 0)
          .map((penNft) => {
            return <PenCard key={nanoid()} penNft={penNft} isBattle={isBattle} />
          })}
    </div>
  )
}

export default PenCards

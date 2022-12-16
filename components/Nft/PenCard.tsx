import { BigNumber } from 'ethers'
import Image from 'next/image'
import { FC } from 'react'
import { Inft } from '../../utils/types/Inft'
import useAttackBoss from '../useAttackBoss'

interface Props {
  penNft: Inft
  isBattle: boolean
}
const PenCard: FC<Props> = ({ penNft, isBattle }) => {
  const { write: attack, isLoading } = useAttackBoss()
  return (
    <div className='bg-orange-300 px-2 pb-2 rounded-xl md:px-4'>
      <h2 className='py-2'>{penNft.name}</h2>
      <div className='rounded-xl overflow-hidden'>
        <Image
          width={400}
          height={400}
          src={penNft.imageURI}
          alt={`Character ${penNft.name}`}
          className='aspect-square object-cover'
        />
        {/* <img
          src={penNft.imageURI}
          alt={`Character ${penNft.name}`}
          className='aspect-square object-cover'
        /> */}
        <div className='relative'>
          <progress value={penNft.hp} max={penNft.maxHp} className='absolute inset-0 w-full h-6' />
          <p className='relative h-6'>{`${penNft.hp} / ${penNft.maxHp} HP`}</p>
        </div>
      </div>
      <div className='py-4'>
        <h4>{`⚔️ Attack Damage: ${penNft.attackDamage}`}</h4>
      </div>
      {isBattle && (
        <button
          className='w-full h-10 rounded-md bg-gradient-to-r from-orange-600 via-amber-400 to-red-600'
          onClick={() => {
            attack?.({ recklesslySetUnpreparedArgs: [BigNumber.from(penNft.tokenId)] })
          }}
        >{`💥 Attack `}</button>
      )}
    </div>
  )
}

export default PenCard

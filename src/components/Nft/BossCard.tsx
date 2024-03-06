import Image from 'next/image'
import { FC } from 'react'

import useFetchBossNft from '~/hooks/useFetchBossNft'

const BossCard: FC = () => {
  const bossNft = useFetchBossNft()
  if (!bossNft) {
    return <></>
  }
  return (
    <div className='w-3/5 m-auto md:w-1/3 lg:w-1/4 text-center'>
      <div className='bg-stone-400 rounded-xl py-3 px-6'>
        <h2 className='text-2xl'>🔥 {bossNft.name} 🔥</h2>
        <div className='rounded-xl overflow-hidden my-3'>
          <Image
            width={400}
            height={400}
            src={bossNft.imageURI}
            alt={`bossNft ${bossNft.name}`}
            className='aspect-square object-cover'
            priority
          />
          {/* <img
            src={bossNft.imageURI}
            alt={`bossNft ${bossNft.name}`}
            className='aspect-square object-cover'
          /> */}
          <div className='relative'>
            <progress
              value={bossNft.hp}
              max={bossNft.maxHp}
              className='absolute inset-0 w-full h-6'
            />
            <p className='relative h-6'>{`${bossNft.hp} / ${bossNft.maxHp} HP`}</p>
          </div>
        </div>
        <h4 className='font-bold'>{`⚔️ Attack Damage: ${bossNft.attackDamage}`}</h4>
      </div>
    </div>
  )
}

export default BossCard

import PenCards from '~/components/Nft/PenCards'

import BattleButton from './battleButton'
import MintButton from './mintButton'

export default function NftPage() {
  return (
    <div className='bg-stone-400 h-full px-4 py-2'>
      <div className='grid grid-flow-col grid-cols-2 justify-items-stretch gap-4 text-xl'>
        <MintButton />
        <BattleButton />
      </div>
      <h3 className='p-2 text-3xl text-center'>Your Army</h3>
      <PenCards isBattle={false} />
    </div>
  )
}

import BossCard from '~/components/Nft/BossCard'
import PenCards from '~/components/Nft/PenCards'

export default function BattlePage() {
  return (
    <div className='bg-red-800 p-4'>
      <BossCard />
      <PenCards isBattle={true} />
    </div>
  )
}

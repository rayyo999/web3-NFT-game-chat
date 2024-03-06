import { FC } from 'react'
import BossCard from '../../components/Nft/BossCard'
import PenCards from '../../components/Nft/PenCards'
import useFetchPenNftIds from '../../components/useFetchPenNftIds'
import { useIsMounted } from '../../components/useIsMounted'

const Battle: FC = () => {
  const isMounted = useIsMounted()
  const penNftIds = useFetchPenNftIds()

  if (!isMounted) {
    return <></>
  }
  return (
    <div className='bg-red-800 p-4'>
      <BossCard />
      <PenCards isBattle={true} />
    </div>
  )
}
export default Battle

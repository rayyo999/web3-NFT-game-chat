import { motion } from 'framer-motion'
import Link from 'next/link'
import { FC } from 'react'
import PenCards from '../../components/Nft/PenCards'
import useFetchPenNftIds from '../../components/useFetchPenNftIds'
import { useIsMounted } from '../../components/useIsMounted'

const NftProvider: FC = () => {
  const isMounted = useIsMounted()
  const penNftIds = useFetchPenNftIds()

  if (!isMounted) {
    return <></>
  }
  return (
    <div className='bg-stone-400 h-full px-4 py-2'>
      <div className='grid grid-flow-col grid-cols-2 justify-items-stretch gap-4 text-xl'>
        <Link href='/nft/mint'>
          <motion.div
            className='bg-emerald-600 rounded-lg grid place-items-center p-6'
            whileHover={{ scale: 1.02 }}
          >
            <p>enpower your army!</p>
          </motion.div>
        </Link>
        {penNftIds?.length ? (
          <Link href='/nft/battle'>
            <motion.div
              className='bg-red-800 rounded-lg p-6 grid place-items-center'
              whileHover={{ scale: 1.02 }}
              // disabled={!penNfts?.length}
            >
              <p>battle field</p>
            </motion.div>
          </Link>
        ) : (
          <div className='bg-red-800 rounded-lg p-6 grid place-items-center'>
            <p>battle field is not available before getting a warrior</p>
          </div>
        )}
      </div>
      <h3 className='p-2 text-3xl text-center'>Your Army</h3>
      <PenCards isBattle={false} />
    </div>
  )
}

export default NftProvider

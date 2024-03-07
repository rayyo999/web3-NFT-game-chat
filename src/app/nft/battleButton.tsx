'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

import useFetchPenNftIds from '~/hooks/useFetchPenNftIds'

export default function BattleButton() {
  const penNftIds = useFetchPenNftIds()

  return penNftIds?.length ? (
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
  )
}

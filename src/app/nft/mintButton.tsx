'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function MintButton() {
  return (
    <Link href='/nft/mint'>
      <motion.div
        className='bg-emerald-600 rounded-lg grid place-items-center p-6'
        whileHover={{ scale: 1.02 }}
      >
        <p>enpower your army!</p>
      </motion.div>
    </Link>
  )
}

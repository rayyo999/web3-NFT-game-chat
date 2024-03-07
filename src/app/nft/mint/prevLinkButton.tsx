'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function PrevLinkButton() {
  return (
    <Link href='/nft'>
      <motion.button className='p-4 bg-stone-400 rounded-lg' whileHover={{ scale: 1.05 }}>
        back to Nft page
      </motion.button>
    </Link>
  )
}

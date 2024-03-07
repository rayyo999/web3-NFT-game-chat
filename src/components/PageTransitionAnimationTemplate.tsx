'use client'

import { motion } from 'framer-motion'

export default function PageTransitionAnimationTemplate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className='h-full'
      variants={pagesAnimation}
      initial='init'
      animate='animate'
      exit='exit'
    >
      {children}
    </motion.div>
  )
}

const pagesAnimation = {
  init: {
    opacity: 0,
    // x: '-100vw',
  },
  animate: {
    opacity: 1,
    // x: 0,
    transition: {
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    // x: '100vw',
    // filter: `invert()`, //cool~
  },
}

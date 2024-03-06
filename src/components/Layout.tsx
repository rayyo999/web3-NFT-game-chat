import { AnimatePresence, motion } from 'framer-motion'
import { FC } from 'react'

import CheckNetWork from '~/components/CheckNetWork'
import Navbar from '~/components/Navbar'
import WalletProvider from '~/components/WalletProvider'

const Layout: FC<any> = ({ router, children }) => {
  return (
    <WalletProvider>
      <CheckNetWork>
        <div className='text-black h-screen flex flex-col'>
          <Navbar />
          <AnimatePresence initial={false} mode='wait'>
            <motion.div
              className='flex-1'
              key={router.pathname}
              // key={router.route}
              variants={pagesAnimation}
              initial='init'
              animate='animate'
              exit='exit'
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </CheckNetWork>
    </WalletProvider>
  )
}
export default Layout

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

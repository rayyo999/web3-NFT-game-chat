'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FC, useMemo } from 'react'

const Navbar: FC = () => {
  const navContent = useMemo(() => ['Home', 'ChatRoom', 'NFT'], [])
  return (
    <nav className='flex-initial bg-black text-white flex flex-wrap justify-center items-center gap-4 pr-1 py-1 sm:justify-end'>
      {navContent.map((item, index) => {
        return (
          <Link href={`/${index !== 0 ? item.toLowerCase() : ''}`} key={index}>
            <motion.button whileHover={{ scale: 1.1 }}>{item}</motion.button>
          </Link>
        )
      })}
      <ConnectButton
        accountStatus={{ smallScreen: 'avatar', largeScreen: 'full' }}
        showBalance={{ smallScreen: false, largeScreen: true }}
      />
    </nav>
  )
}

export default Navbar

// const btnMotion = {
//   init: {
//     scale: 1,
//   },
//   hover: {
//     scale: 0.9,
//     transition: {
//       ease: 'easeOut',
//       duration: 0.2,
//       repeat: Infinity,
//     },
//   },
// };
// const btnRotate = {
//   init: { rotateZ: 0, originX: 0.5, originY: 0.5, y: -50, x: -60 },
//   show: { rotateZ: 360, transition: { duration: 10, repeat: Infinity } },
// };

//  <nav className=' bg-black text-white flex justify-end items-center gap-4'>
// <Link href='/'>
// <motion.button whileHover={{ scale: 1.1 }}>Home</motion.button>
// </Link>
// <Link href='/chatroom'>
//   <motion.button whileHover={{ scale: 1.1 }}>Chatroom</motion.button>
// </Link>
// <Link href='/control'>
//   <motion.button whileHover={{ scale: 1.1 }}>Control</motion.button>
// </Link>
// <motion.button
//   className=' relative px-5 py-3 rounded-xl cursor-pointer overflow-hidden'
//   variants={btnMotion}
//   initial='init'
//   whileHover='hover'
//   onClick={getAccount}
// >
//   <motion.div
//     className='absolute w-64  h-64  bg-gradient-to-r from-slate-700 via-lime-700 to-orange-500'
//     variants={btnRotate}
//     initial='init'
//     animate='show'
//   ></motion.div>
//   <motion.div className=' text-white' style={{ z: 1 }}>
//     {currentAccount
//       ? currentAccount.slice(0, 4) + ' . . . ' + currentAccount.slice(-4)
//       : 'connect wallet'}
// </motion.div>
// </motion.button>
// </nav>;

{
  /* <motion.button
        className=' relative px-5 py-3 rounded-xl cursor-pointer overflow-hidden'
        variants={btnMotion}
        initial='init'
        whileHover='hover'
        onClick={getAccount}
      >
        <motion.div
          className='absolute w-64  h-64  bg-gradient-to-r from-slate-700 via-lime-700 to-orange-500'
          variants={btnRotate}
          initial='init'
          animate='show'
        ></motion.div>
        <motion.div className=' text-white' style={{ z: 1 }}>
          {currentAccount
            ? currentAccount.slice(0, 4) + ' . . . ' + currentAccount.slice(-4)
            : 'connect wallet'}
        </motion.div>
      </motion.button>  */
}

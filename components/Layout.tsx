import { FC } from 'react';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
// import AccountProvider from './AccountContext';
import WalletProvider from './WalletProvider';

const Layout: FC<any> = ({ router, children }) => {
  console.log('Layout rendering');

  return (
      <WalletProvider>
        <div className='text-black h-screen flex flex-col'>
          <Navbar />
          <AnimatePresence initial={false} exitBeforeEnter>
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
      </WalletProvider>
  );
};
export default Layout;

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
};

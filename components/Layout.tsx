import { FC } from 'react';
import InfoProvier from './ChatroomContext';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import NftProvider from './NftContext';

const Layout: FC<any> = ({ router, children }) => {
  return (
    <div className='text-black h-screen flex flex-col'>
      <InfoProvier>
        <NftProvider>
          <Navbar />
          <AnimatePresence initial={false} exitBeforeEnter>
            <motion.div
              className='flex-1'
              key={router.route}
              variants={pagesAnimation}
              initial='init'
              animate='animate'
              exit='exit'
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </NftProvider>
      </InfoProvier>
    </div>
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

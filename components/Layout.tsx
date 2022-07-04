import { FC } from 'react';
import InfoProvier from '../components/InfoContext';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';

const Layout: FC<any> = ({ router, children }) => {
  return (
    <div className=' text-black bg-gray-500 h-screen'>
      <InfoProvier>
        <Navbar />
        <AnimatePresence initial={false} exitBeforeEnter>
          <motion.div
            key={router.route}
            variants={pagesAnimation}
            initial='init'
            animate='animate'
            exit='exit'
          >
            {children}
          </motion.div>
        </AnimatePresence>
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

import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useChatroomContext } from './ChatroomContext';
import { Ichat } from '../utils/types/Ichat';

const toggleTypes = ['Public', 'All', 'Private'];
// enum messageType {PUBLIC, ALL, PRIVATE}

const ChatMessages: FC = () => {
  const { chats, setChats, defaultMessageReceiver, currentAccount }: any =
    useChatroomContext();
  const [showType, setShowType] = useState(toggleTypes[1]);
  const [showChats, setShowChats] = useState(chats);
  const handleShortenAddress = (id: number) => {
    setChats((prev: Ichat[]) =>
      prev.map((chat) => {
        return chat.index === id
          ? { ...chat, isAddressShort: !chat.isAddressShort }
          : { ...chat };
      })
    );
  };

  useEffect(() => {
    let filteredChats = chats;
    if (showType === toggleTypes[2]) {
      filteredChats = chats.filter(
        (chat: Ichat) =>
          chat.to.toLowerCase() !== defaultMessageReceiver.toLowerCase() &&
          (chat.to.toLowerCase() === currentAccount.toLowerCase() ||
            chat.from.toLowerCase() === currentAccount.toLowerCase())
      );
    } else if (showType === toggleTypes[0]) {
      filteredChats = chats.filter(
        (chat: Ichat) =>
          chat.to.toLowerCase() === defaultMessageReceiver.toLowerCase()
      );
    }
    setShowChats(filteredChats);
  }, [showType, chats, currentAccount, defaultMessageReceiver]);

  return (
    <div className='m-auto flex flex-col md:w-1/2'>
      <div className='flex px-2'>
        {toggleTypes.map((type, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setShowType(type);
              }}
              className='relative basis-1/3 text-center p-2 text-cyan-300 cursor-pointer'
            >
              {showType === type && (
                <motion.div
                  layoutId='toggle'
                  className='absolute inset-0 bg-slate-700 z-1 rounded-xl'
                ></motion.div>
              )}
              <div className='relative'>{type}</div>
            </div>
          );
        })}
      </div>
      <motion.div layout>
        {showChats.map((chat: Ichat, index: number, array: Ichat[]) => {
          let hide = true;
          let longAddress: JSX.Element | null = null;
          let shortAddress: JSX.Element | null = null;
          if (
            index === 0 ||
            (index > 0 && chat.from !== array[index - 1].from)
          ) {
            hide = false;
            longAddress = <div>{chat.from}</div>;
            shortAddress = (
              <div>
                {chat.from.slice(0, 4) + ' . . . ' + chat.from.slice(-4)}
              </div>
            );
          }
          const showAddress = (
            <div className='flex items-center'>
              <motion.svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                viewBox='0 0 16 16'
                onClick={() => {
                  handleShortenAddress(chat.index);
                }}
                whileHover={{ scaleX: 1.5, originX: 0 }}
              >
                <path
                  // fillRule="evenodd"
                  d='M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z'
                />
              </motion.svg>
              <motion.div layout>
                {chat.isAddressShort ? shortAddress : longAddress}
              </motion.div>
            </div>
          );
          const blockStyle =
            chat.from.toLowerCase() === currentAccount.toLowerCase()
              ? 'relative p-4 m-2 bg-cyan-700 text-stone-900 rounded-xl'
              : 'relative p-4 m-2 bg-cyan-900 text-cyan-400 rounded-xl';
          return (
            //items-start
            //items-end
            <div key={chat.index} className={blockStyle}>
              {!hide && showAddress}
              <div className='text-white'>{chat.message}</div>
              <div className='absolute right-2 bottom-1 text-sm text-stone-400'>
                {new Date(chat.time * 1000).toLocaleString('en-US', {
                  timeZone: 'Asia/Taipei',
                })}
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ChatMessages;

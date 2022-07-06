import { FC, useState } from 'react';
import { ethers } from 'ethers';
import ChatMessages from '../../components/ChatMessages';
import { useChatroomContext } from '../../components/ChatroomContext';

const ChatRoom: FC = () => {
  const { sendMessage }: any = useChatroomContext();
  const [message, setMessage] = useState('');
  const [receiver, setReceiver] = useState('');
  const [receiverIsValid, setReceiverIsValid] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  const send = () => {
    if (message.length === 0) {
      alert('type something in it !');
      return;
    }
    if (!isPrivate) {
      sendMessage(message);
    }
    if (isPrivate && receiverIsValid) {
      sendMessage(message, receiver);
    }
    if (isPrivate && !receiverIsValid) {
      alert('invalid address to send message!! check again or send by public');
      return;
    }
  };
  return (
    <div className='h-full bg-gray-500'>
      <div className='p-4 m-auto md:w-1/2'>
        <div className='w-full flex rounded-xl overflow-hidden'>
          <input
            type='text'
            className='flex-auto h-12 p-2 text-xl'
            placeholder={isPrivate ? 'private message' : 'public message'}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button
            className={
              isPrivate
                ? receiverIsValid
                  ? 'w-20 p-2 bg-green-400'
                  : 'w-20 p-2 bg-rose-300'
                : 'flex-none w-20 p-2 bg-green-100'
            }
            onClick={send}
          >
            send
          </button>
        </div>
        {!isPrivate && (
          <button
            onClick={() => {
              setIsPrivate(!isPrivate);
            }}
          >
            click me to send private
          </button>
        )}
        {isPrivate && (
          <div className='flex w-full'>
            <button
              onClick={() => {
                setIsPrivate(!isPrivate);
              }}
            >
              back to public send
            </button>
            <input
              type='text'
              className={
                receiverIsValid
                  ? 'flex-grow bg-green-400 h-8 pl-2 rounded-lg'
                  : 'flex-grow bg-rose-300 h-8 pl-2 rounded-lg'
              }
              placeholder='address'
              value={receiver}
              onChange={(e) => {
                setReceiver(e.target.value);
                if (ethers.utils.isAddress(e.target.value)) {
                  setReceiverIsValid(true);
                } else {
                  setReceiverIsValid(false);
                }
              }}
            />
          </div>
        )}
      </div>
      <ChatMessages />
    </div>
  );
};
export default ChatRoom;

const a = {
  init: { x: 500, opacity: 0 },
  show: {
    x: 100,
    opacity: 1,
    transition: {
      ease: 'backOut',
      duration: 2,
      // type:'tween',
      // delayChildren: 10,
      // staggerChildren:1
      // when:false,
      // repeat:3,
      // repeatType: "reverse" as any,
    },
  },
};
const b = {
  init: { x: 200, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
  },
};

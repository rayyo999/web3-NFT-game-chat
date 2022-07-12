import { utils } from 'ethers';
import { FC, useReducer, useState } from 'react';
import { useContractWrite } from 'wagmi';
import chatContractInterface from '../../utils/contracts/chatContract.json';
import { useIsMounted } from '../useIsMounted';
import { motion } from 'framer-motion';
import ChatReducer from './ChatReducer';

export const chatContractAddress =
  '0x8b4E564967E54a8f7a6A493D5EDE1759e78DfD53'.toLowerCase();
export const chatContractABI = chatContractInterface.abi;
const defaultMessageReceiver =
  '0x8b4E564967E54a8f7a6A493D5EDE1759e78DfD53'.toLowerCase();
// const from = '0x93e726D9e9629A1cb0eD8ff4Ffd4123cbcb95373'.toLowerCase();
// const to = '0xbe61E58374B311E1266c1A2c100736A2D3c88789'.toLowerCase();
// const admain = '0xD23Fe32da86644edE2B9c3b8c3e80Bc95D429e02'.toLowerCase();
const chatContractConfig = {
  addressOrName: chatContractAddress,
  contractInterface: chatContractABI,
};
// const inputChatStateInit = {
//   message: '',
//   receiver: '',
//   receiverIsValid: false,
//   isPrivate: false,
// };
const InputChats: FC = () => {
  const isMounted = useIsMounted();
  const [message, setMessage] = useState('');
  const [receiver, setReceiver] = useState('');
  const [receiverIsValid, setReceiverIsValid] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  // const [inputChatState, dispatch] = useReducer(
    // ChatReducer
    // inputChatStateInit
  // );

  const { write } = useContractWrite({
    ...chatContractConfig,
    functionName: 'chat',
    args: [isPrivate ? receiver : defaultMessageReceiver, message],
  });
  const send = () => {
    if (message.length === 0) {
      alert('type something in it !');
      return;
    }
    if (isPrivate && !receiverIsValid) {
      alert('invalid address to send message!! check again or send by public');
      return;
    }
    write();
  };

  return (
    <motion.div layout className='p-4 m-auto md:w-1/2'>
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
        {isMounted && (
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
        )}
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
              if (utils.isAddress(e.target.value)) {
                setReceiverIsValid(true);
              } else {
                setReceiverIsValid(false);
              }
            }}
          />
        </div>
      )}
    </motion.div>
  );
};

export default InputChats;

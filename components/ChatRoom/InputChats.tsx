import { utils } from 'ethers'
import { motion } from 'framer-motion'
import { FC, useState } from 'react'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { chatContractObj, defaultMessageReceiver } from '../../utils/contracts/chatContract'
import Loader from '../Loader'
import { useIsMounted } from '../useIsMounted'

// const from = '0x93e726D9e9629A1cb0eD8ff4Ffd4123cbcb95373'.toLowerCase();
// const to = '0xbe61E58374B311E1266c1A2c100736A2D3c88789'.toLowerCase();
// const admain = '0xD23Fe32da86644edE2B9c3b8c3e80Bc95D429e02'.toLowerCase();

// const inputChatStateInit = {
//   message: '',
//   receiver: '',
//   receiverIsValid: false,
//   isPrivate: false,
// };
const InputChats: FC = () => {
  const isMounted = useIsMounted()
  const [message, setMessage] = useState('')
  const [receiver, setReceiver] = useState<`0x${string}`>(
    '0x93e726D9e9629A1cb0eD8ff4Ffd4123cbcb95373'
  )
  const [receiverIsValid, setReceiverIsValid] = useState(true)
  const [isPrivate, setIsPrivate] = useState(false)
  // const [inputChatState, dispatch] = useReducer(
  // ChatReducer
  // inputChatStateInit
  // );
  const { config } = usePrepareContractWrite({
    ...chatContractObj,
    functionName: 'chat',
    args: [isPrivate ? receiver : defaultMessageReceiver, message],
    // args: [receiver, message],
  })
  const { write, isLoading } = useContractWrite(config)
  const send = () => {
    if (message.length === 0) {
      alert('type something in it !')
      return
    }
    if (isPrivate && !receiverIsValid) {
      alert('invalid address to send message!! check again or send by public')
      return
    }
    write?.()
  }
  if (!isMounted) {
    return <></>
  }
  return (
    <motion.div layout className='p-4 m-auto md:w-1/2'>
      <div className='w-full flex rounded-xl overflow-hidden'>
        <input
          type='text'
          className='flex-auto h-12 p-2 text-xl'
          placeholder={isPrivate ? 'private message' : 'public message'}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
          }}
        />
        <button
          className={
            isPrivate
              ? receiverIsValid
                ? 'w-20 p-2 bg-green-400'
                : 'w-20 p-2 bg-rose-300'
              : 'flex-none w-20 p-2 bg-green-100 '
          }
          onClick={send}
          disabled={!write}
        >
          send
        </button>
      </div>
      {!isPrivate && (
        <button
          onClick={() => {
            setIsPrivate(!isPrivate)
          }}
        >
          click me to send private
        </button>
      )}
      {isPrivate && (
        <div className='flex w-full'>
          <button
            onClick={() => {
              setIsPrivate(!isPrivate)
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
              setReceiver(e.target.value as `0x${string}`)
              if (utils.isAddress(e.target.value)) {
                setReceiverIsValid(true)
              } else {
                setReceiverIsValid(false)
              }
            }}
          />
        </div>
      )}
    </motion.div>
  )
}

export default InputChats

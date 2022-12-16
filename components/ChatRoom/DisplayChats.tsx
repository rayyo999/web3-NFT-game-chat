import { motion } from 'framer-motion'
import { FC, useEffect, useMemo, useState } from 'react'
import { Ichat } from '../../utils/types/Ichat'
// import { useAccountContext } from '../AccountContext';
import { Result } from 'ethers/lib/utils'
import { useAccount, useContractRead } from 'wagmi'
import { chatContractObj, defaultMessageReceiver } from '../../utils/contracts/chatContract'
import { useIsMounted } from '../useIsMounted'

const transformMessageAndReverse = (chats: Result | undefined) => {
  return chats
    ?.map((chat) => {
      return {
        index: chat.index,
        from: chat.from,
        to: chat.to,
        message: chat.message,
        time: chat.time,
        isAddressShort: true,
      }
    })
    .reverse()
}

enum showTypes {
  PUBLIC = 'Public',
  ALL = 'All',
  PRIVATE = 'Private',
}
const showTypeList = Object.entries(showTypes).map(([, value]) => value)

const DisplayChats: FC = () => {
  const isMounted = useIsMounted()
  const { address } = useAccount()
  const currentAccount = useMemo(() => address?.toLowerCase(), [address])
  const { data }: { data: Result | undefined } = useContractRead({
   ...chatContractObj,
    functionName: 'getAllChats',
    watch: true,
  })
  const chats = useMemo(() => transformMessageAndReverse(data), [data])
  const [showType, setShowType] = useState(showTypes.PRIVATE)
  const [showChats, setShowChats] = useState(chats)
  const handleShortenAddress = (id: number) => {
    setShowChats((prev) =>
      prev?.map((chat) => {
        return chat.index === id ? { ...chat, isAddressShort: !chat.isAddressShort } : { ...chat }
      })
    )
  }
  const toggleShowTypes = (type: string) => {
    switch (type) {
      case showTypes.ALL:
        setShowType(showTypes.ALL)
        break
      case showTypes.PUBLIC:
        setShowType(showTypes.PUBLIC)
        break
      case showTypes.PRIVATE:
        setShowType(showTypes.PRIVATE)
        break
      default:
        throw new Error(`no such toggle type: ${type}`)
    }
  }

  // useContractEvent({
  //   addressOrName: chatContractAddress,
  //   contractInterface: chatContractABI,
  //   eventName: 'chatEvent',
  //   listener: (event:Event[]) => console.log(event),
  //   // once: true,
  // });
  useEffect(() => {
    let filteredChats = chats
    if (showType === showTypes.PRIVATE) {
      filteredChats = chats?.filter(
        (chat: Ichat) =>
          chat.to.toLowerCase() !== defaultMessageReceiver &&
          (chat.to.toLowerCase() === currentAccount || chat.from.toLowerCase() === currentAccount)
      )
    } else if (showType === showTypes.PUBLIC) {
      filteredChats = chats?.filter(
        (chat: Ichat) => chat.to.toLowerCase() === defaultMessageReceiver
      )
    }
    setShowChats(filteredChats)
  }, [showType, chats])

  if (!isMounted) {
    return <></>
  }

  return (
    <div className='m-auto flex flex-col md:w-1/2'>
      <motion.div layout className='flex px-2'>
        {showTypeList.map((value, index) => {
          return (
            <div
              key={index}
              // key={uuidv4()}
              // key={nanoid()}
              onClick={() => {
                toggleShowTypes(value)
              }}
              className='relative basis-1/3 text-center p-2 text-cyan-300 cursor-pointer'
            >
              {showType === value && (
                <motion.div
                  layoutId='toggle'
                  className='absolute inset-0 bg-slate-700 z-1 rounded-xl'
                ></motion.div>
              )}
              <div className='relative'>{value}</div>
            </div>
          )
        })}
      </motion.div>
      <motion.div layout>
        {showChats?.map((chat: Ichat, index: number, array: Ichat[]) => {
          let hide = true
          let longAddress: JSX.Element | null = null
          let shortAddress: JSX.Element | null = null
          if (index === 0 || (index > 0 && chat.from !== array[index - 1].from)) {
            hide = false
            longAddress = <div>{chat.from}</div>
            shortAddress = <div>{chat.from.slice(0, 4) + ' . . . ' + chat.from.slice(-4)}</div>
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
                  handleShortenAddress(chat.index)
                }}
                whileHover={{ scaleX: 1.5, originX: 0 }}
              >
                <path d='M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z' />
              </motion.svg>
              <motion.div layout className='pl-2'>
                {chat.isAddressShort ? shortAddress : longAddress}
              </motion.div>
            </div>
          )
          const blockStyle =
            chat.from.toLowerCase() === currentAccount?.toLowerCase()
              ? 'relative p-4 m-2 bg-cyan-700 text-stone-900 rounded-xl'
              : 'relative p-4 m-2 bg-cyan-900 text-cyan-400 rounded-xl'
          return (
            <div key={index} className={blockStyle}>
              {!hide && showAddress}
              <div className='text-white pb-3'>{chat.message}</div>
              <div className='absolute right-2 bottom-1 text-sm text-stone-400'>
                {new Date(chat.time * 1000).toLocaleString('en-US', {
                  timeZone: 'Asia/Taipei',
                })}
              </div>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default DisplayChats

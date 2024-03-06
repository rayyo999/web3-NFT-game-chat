import { FC } from 'react'

import DisplayChats from '~/components/ChatRoom/DisplayChats'
import InputChats from '~/components/ChatRoom/InputChats'

const ChatRoom: FC = () => {
  return (
    <div className='h-full bg-gray-500'>
      <InputChats />
      <DisplayChats />
    </div>
  )
}
export default ChatRoom

// const a = {
//   init: { x: 500, opacity: 0 },
//   show: {
//     x: 100,
//     opacity: 1,
//     transition: {
//       ease: 'backOut',
//       duration: 2,
//       // type:'tween',
//       // delayChildren: 10,
//       // staggerChildren:1
//       // when:false,
//       // repeat:3,
//       // repeatType: "reverse" as any,
//     },
//   },
// };
// const b = {
//   init: { x: 200, opacity: 0 },
//   show: {
//     x: 0,
//     opacity: 1,
//   },
// };

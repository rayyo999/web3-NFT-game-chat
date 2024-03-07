import DisplayChats from '~/components/ChatRoom/DisplayChats'
import InputChats from '~/components/ChatRoom/InputChats'

export default function ChatroomPage() {
  return (
    <div className='h-full bg-gray-500'>
      <InputChats />
      <DisplayChats />
    </div>
  )
}

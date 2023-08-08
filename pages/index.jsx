import Chat from '@/components/Chat'
import Sidebar from '@/components/Sidebar'
import '@/styles/globals.scss'

export default function Home() {
  return (
    <div className='homeContainer'>
      <Sidebar/>
      <Chat />
    </div>
  )
}

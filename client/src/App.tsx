import './App.css'
import Sidebar from './sidebar'
import Contacts from './contacts'
import Chat from './chat'
import { ChatProvider } from './chatContext'


function App() {
  

  return (
  <>
  <ChatProvider>
  <Sidebar/>
  <Contacts/>
  <Chat/>
  </ChatProvider>
  </>)
}

export default App

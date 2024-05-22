import './App.css'
import Sidebar from './sidebar'
import Contacts from './contacts'
import Chat from './chat'
import { UserProvider } from './userContext';

function App() {
  

  return (
  <>
  <UserProvider>
  <Sidebar/>
  <Contacts/>
  <Chat/>
  </UserProvider>
  </>)
}

export default App

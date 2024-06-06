import 'dotenv/config'
import Icon from '@mdi/react';
import { mdiSend } from '@mdi/js';
import { mdiAccountCircle } from '@mdi/js';
import WelcomeComponent from './testcomp';
import { useChat } from './chatContext';
import { mdiDotsVertical } from '@mdi/js';
import axios from 'axios';
import { useContext, useState, useEffect} from 'react';
import { UserContext } from './userContext';
import { mdiAlphaA } from '@mdi/js';
import { mdiCog } from '@mdi/js';
import { Link } from 'react-router-dom';


function Chat(){
    const { user } = useContext(UserContext);
    const {chat} = useChat();
    const [mess, setMess] = useState('');
    const [data, setData] = useState();
    const [messages, setMessages] = useState([]);

    const API = process.env.SERVER_API
    
  
    
    const handleClick = async() => {
        try{
            const res = await axios.post(`${API}/${user._id}/message`, {mess, chat})
            setData(res)
        }catch(e){
            console.log(e)
        }
        
        setMess('')
    }

    const fetchData = async() => {
        try{
            const res = await axios(`${API}/${user._id}/message`)
            
            setMessages(res.data)
        }catch(e){
            console.log(e)
        }
    }
   

    useEffect(()=>{
        fetchData()
    },[mess])
    
    return (
        <div className="w-full h-screen max-sm:flex max-sm:flex-col items-center ">
        <div className="h-1/6 flex items-center px-6 justify-between max-md:pl-2 max-sm:w-10/12">
            <div className='flex gap-2 items-center'>
        <Icon path={mdiAccountCircle} color="black" size={2}/>
        <WelcomeComponent></WelcomeComponent>
        </div>
        <Link to="/profile">
        <Icon path={mdiCog} size={1.5} className='text-gray-700' />
        </Link>
        </div>

        {chat ? (<div className="h-5/6 flex flex-col items-center justify-center bg-slate-200 mx-5 max-sm:mx-1 rounded-lg max-sm:w-10/12">
        
        <div className="w-full h-4/5">
            <div className='w-full h-16 bg-slate-400 flex items-center px-7 gap-3 rounded-t-md justify-between'>
                <div className='flex gap-3 items-center'>
            <Icon path={mdiAccountCircle} color="black" size={1.5} />
            {chat &&
            <h2>{chat}</h2>
            }
            </div>
            <Icon path={mdiDotsVertical} size={1} className='cursor-pointer'/>
            </div>
            <div className="p-8 overflow-scroll overflow-x-hidden cc">
                        {messages && messages.length > 0 ? (
                            messages.filter(i => (i.to.username === chat && i.from.username === user.username) || (i.from.username === chat && i.to.username === user.username)).length > 0 ? (
                                messages.filter(i => (i.to.username === chat && i.from.username === user.username) || (i.from.username === chat && i.to.username === user.username)).map((i) => (
                                    <div key={i._id} >
                                        {i.from.username === user.username ? (
                                            <div className='w-full  flex flex-col items-end'>
                                                <div>{new Date(i.date).toLocaleString()}</div>
                                                <div className='flex w-1/2 max-sm:w-1/2 justify-end'><p className='bg-kombu overflow-hidden flex over text-white py-2 px-3 self-end rounded-es-lg' >{i.content}</p></div>
                                                
                                            </div>
                                        ) : (
                                            <div className='flex flex-col items-start '>
                                                <div>{new Date(i.date).toLocaleString()}</div>
                                                <div><p className='bg-white flex flex-wrap overflow-hidden py-2 px-3 rounded-ee-lg max-w-md '>{i.content}</p></div>
                                                
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div>No messages yet</div>
                            )
                        ) : (
                            <div>No messages yet</div>
                        )}
                    </div>
               


        </div>
        <div className="w-full h-1/5 bg-kombu flex items-center justify-center gap-5 ">
            <div className='relative w-4/5 flex items-center justify-center h-4/5 relative max-sm:w-full'>
            <input type="text" name='message'
             placeholder="Message..." className="w-full h-1/2 rounded-xl pl-3 pr-12 border-2 border-black border-sol max-sm:mx-1"
             onChange={(e)=>setMess(e.target.value)}
             value={mess}
             minLength={1}
             maxLength={150}
             />
            <div onClick={handleClick} className='absolute top-19 right-3'>
            <Icon path={mdiSend} size={1.3} className="text-kombu" />
            </div>
            </div>
        </div>
        </div>):(
            <div className='flex flex-col items-center justify-center h-5/6 '>
                <div className='flex flex-col border-4 border-kombu items-center justify-center p-14 shadow-2xl shadow-black mb-16 sm: w-4/5'>
                <Icon path={mdiAlphaA} size={6} className='text-kombu'/>
                <p className='fam'>Welcome to Robnite! Start chatting by adding some users.</p>
                </div>
            </div>
        )}

        
        </div>
    )
}
export default Chat
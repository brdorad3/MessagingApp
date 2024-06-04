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




function Chat(){
    const { user } = useContext(UserContext);
    const {chat} = useChat();
    const [mess, setMess] = useState('');
    const [data, setData] = useState();
    const [messages, setMessages] = useState([]);
    
    const handleClick = async() => {
        try{
            const res = await axios.post(`http://localhost:3000/${user._id}/message`, {mess, chat})
            setData(res)
        }catch(e){
            console.log(e)
        }
        console.log(mess)
        setMess('')
    }

    const fetchData = async() => {
        try{
            const res = await axios(`http://localhost:3000/${user._id}/message`)
            console.log(res.data)
            setMessages(res.data)
        }catch(e){
            console.log(e)
        }
    }
    console.log(messages)
    console.log(mess)

    useEffect(()=>{
        fetchData()
    },[mess])
    
    return (
        <div className="w-full h-screen">
        <div className="h-1/6 flex items-center pl-10 gap-2">
        <Icon path={mdiAccountCircle} color="black" size={2}/>
        <WelcomeComponent></WelcomeComponent>
        </div>

        {chat ? (<div className="h-5/6 flex flex-col items-center justify-center bg-slate-200 mx-5 rounded-lg">
        
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
            <div className="p-8">
                        {messages && messages.length > 0 ? (
                            messages.filter(i => (i.to.username === chat && i.from.username === user.username) || (i.from.username === chat && i.to.username === user.username)).length > 0 ? (
                                messages.filter(i => (i.to.username === chat && i.from.username === user.username) || (i.from.username === chat && i.to.username === user.username)).map((i) => (
                                    <div key={i._id} className={i.from.username === user.username ? 'message-from' : 'message-to'}>
                                        {i.from.username === user.username ? (
                                            <div className='w-full text-right flex flex-col justify-end'>
                                                <div>{new Date(i.date).toLocaleString()}</div>
                                                <div ><p className='bg-white p-3 self-end' >{i.content}</p></div>
                                                
                                            </div>
                                        ) : (
                                            <div className='flex gap-5 w-full text-left'>
                                                <div>{i.content}</div>
                                                <div>{new Date(i.date).toLocaleString()}</div>
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
        <div className="w-full h-1/5 bg-kombu flex items-center justify-center gap-5">
            <input type="text" name='message'
             placeholder="Message..." className="w-4/5 h-1/3 rounded-xl px-3"
             onChange={(e)=>setMess(e.target.value)}
             value={mess}
             minLength={1}
             maxLength={150}
             />
            <div onClick={handleClick}>
            <Icon path={mdiSend} size={1.3} color="white" />
            </div>
        </div>
        </div>):(
            <div className='flex flex-col items-center justify-center h-5/6 '>
                <div className='flex flex-col border-4 border-kombu items-center justify-center p-14 shadow-2xl shadow-black mb-16 sm: w-4/5'>
                <Icon path={mdiAlphaA} size={5} className='text-kombu'/>
                <p>Welcome to Robnite! Start chatting by adding some users.</p>
                </div>
            </div>
        )}

        
        </div>
    )
}
export default Chat
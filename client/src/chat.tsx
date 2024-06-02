import Icon from '@mdi/react';
import { mdiSend } from '@mdi/js';
import { mdiAccountCircle } from '@mdi/js';
import WelcomeComponent from './testcomp';
import { useChat } from './chatContext';
import { mdiDotsVertical } from '@mdi/js';




function Chat(){
    const {chat} = useChat();
    
    
    return (
        <div className="w-full h-screen">
        <div className="h-1/6 flex items-center pl-10 gap-2">
        <Icon path={mdiAccountCircle} color="black" size={2}/>
        <WelcomeComponent></WelcomeComponent>
        </div>
        <div className="h-5/6 flex flex-col items-center justify-center bg-slate-200 mx-5 rounded-lg">
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
        </div>
        <div className="w-full h-1/5 bg-kombu flex items-center justify-center gap-5">
            <input type="text" placeholder="Message..." className="w-4/5 h-1/3 rounded-xl pl-3" />
            <Icon path={mdiSend} size={1.3} color="white" />
        </div>
        </div>
        </div>
    )
}
export default Chat
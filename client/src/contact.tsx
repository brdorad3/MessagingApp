import { useContext, useState, useEffect} from 'react';
import { UserContext } from './userContext';
import axios from 'axios';
import { useChat } from './chatContext';
import Icon from '@mdi/react';
import { mdiAccountCircle } from '@mdi/js';
import { mdiCheckAll } from '@mdi/js';


function Contact({contactInfo, loading}){
    const { user } = useContext(UserContext);
    const [info, setInfo] = useState({});
    const { setChat } = useChat();

    const handleClick = async() => {
        await axios.post(`http://localhost:3000/${user._id}/update`, {contactInfo})
    }

    const fetchData = async() => {
        try{
            const res = await fetch(`http://localhost:3000/${user._id}/fetch`)
            const data = await res.json()
            setInfo(data)
        }
        catch(e){
            console.log(e)
        }
    }
    const handleChats = (e) => {
setChat(e.target.innerText)

    }
    
    useEffect(()=>{
        fetchData()
    }, [contactInfo])


    return(
        
        <div className="flex flex-col  w-full justify-center items-center ">
           {loading ? (
                <p></p>
            ) : contactInfo.length > 0 ? (
                contactInfo.map((i) => (
                    <div key={i._id} className="w-4/5 bg h-20 rounded-xl flex justify-between items-center">
                        <p>{i.username}</p>
                        <button onClick={handleClick}>chat</button>
                    </div>
                ))
            ) : (
                <p>No user found</p>
            )}
            {info.contacts && info.contacts.length > 0 ? (
                info.contacts.map((i) => (
                    
                    <div key={i._id} className="w-full flex items-center gap-3 border-t-2 border-grey h-20 px-6 justify-between py-10" >
                       <div className='flex gap-2 items-center'>
                        <Icon path={mdiAccountCircle} className='min-w-14 max-w-14'></Icon>
                        <div className='w-4/5'>
                        <p className='text-lg' onClick={(e)=>handleChats(e)}>{i.username}</p>
                        <p className='text-xs truncate text-gray-700'>{i.about_me}</p>
                        </div>
                        </div>
                        <Icon path={mdiCheckAll} size={0.8} className='text-kombu' />
                        
                    </div>
                ))
            ) : (
                <p>No contacts found</p>
            )}
        </div>
    )
}
export default Contact
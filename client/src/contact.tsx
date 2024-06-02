import { useContext, useState, useEffect} from 'react';
import { UserContext } from './userContext';
import axios from 'axios';
import { useChat } from './chatContext';

function Contact({contactInfo}){
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
        
        <div className="flex flex-col gap-10 w-full justify-center items-center ">
            {contactInfo.length > 0 ? (
                contactInfo.map((i) => (
                    <div key={i._id} className="w-4/5 gb h-20 rounded-xl flex justify-between items-center">
                        <p>{i.username}</p>
                        <button onClick={handleClick}>chat</button>
                    </div>
                ))
            ) : (
                <p>No user found</p>
            )}
            {info.contacts && info.contacts.length > 0 ? (
                info.contacts.map((i) => (
                    <div key={i._id} className="w-4/5 gb h-20 rounded-xl" onClick={(e)=>handleChats(e)}>
                        <p>{i.username}</p>
                    </div>
                ))
            ) : (
                <p>No contacts found</p>
            )}
        </div>
    )
}
export default Contact
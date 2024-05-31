import { useContext, useState, useEffect} from 'react';
import { UserContext } from './userContext';

function Contact({contactInfo}){
    const { user } = useContext(UserContext);
    const [info, setInfo] = useState({})

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
    
    useEffect(()=>{
        fetchData()
    }, [])

contactInfo && console.log(contactInfo)
    return(
        <div className="flex flex-col gap-10 w-full justify-center items-center ">
            {info.contacts && info.contacts.length > 0 ? (
                info.contacts.map((i) => (
                    <div key={i._id} className="w-4/5 gb h-20 rounded-xl">
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
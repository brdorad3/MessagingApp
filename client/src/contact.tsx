import { useContext, useState, useEffect} from 'react';
import { UserContext } from './userContext';

function Contact(){
    const { user } = useContext(UserContext);
    const [info, setInfo] = useState()

    const fetchData = async() => {
        try{
            const res = await fetch(`http://localhost:3000/${user._id}/fetch`)
            const data = await res.json()
            setInfo(data.contacts)
            console.log(info)
        }
        catch(e){
            console.log(e)
        }
    }
    
    useEffect(()=>{
        fetchData()
    }, [])
console.log(info)

    return(
        <div className="flex flex-col gap-10 w-full justify-center items-center ">
{info &&
        info.map((i)=>{
            {console.log(i)}
            <div className="w-4/5 gb h-20 rounded-xl"><p>{i.username}</p></div>
            
        })
        }
        <div className="w-4/5 gb h-20 rounded-xl">Brdorad 3</div>
        
        <div className="w-4/5 gb h-20 rounded-xl"></div>
        <div className="w-4/5 gb h-20 rounded-xl"></div>
        <div className="w-4/5 gb h-20 rounded-xl"></div>
        <div className="w-4/5 gb h-20 rounded-xl"></div>
        <div className="w-4/5 gb h-20 rounded-xl"></div>
        <div className="w-4/5 gb h-20 rounded-xl"></div>
        <div className="w-4/5 gb h-20 rounded-xl"></div>
        <div className="w-4/5 gb h-20 rounded-xl"></div>
        <div className="w-4/5 gb h-20 rounded-xl"></div>
        <div className="w-4/5 gb h-20 rounded-xl"></div>
        <div className="w-4/5 gb h-20 rounded-xl"></div>
        </div>
    )
}
export default Contact
import Icon from '@mdi/react';
import { mdiAccountCircle } from '@mdi/js';
import { useContext, useState} from 'react';
import { UserContext } from './userContext';
import Sidebar from './sidebar';
import { mdiPencil } from '@mdi/js';
import axios from 'axios';
import { mdiCloseBoxOutline } from '@mdi/js';
import Image from './image';





const Profile = () => {
    const { user, setUser } = useContext(UserContext);
    const [toggle, setToggle] = useState(false)
    const [about, setAbout] = useState('')
    
    
    const handleClick = () => {
        setToggle(!toggle)
    }
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        const formData = {about}
        setToggle(!toggle)
        try{
           const response =  await axios.post(`http://localhost:3000/${user._id}/about`, formData)
           setUser((prevUser) => {
            if (prevUser) {
                return { ...prevUser, about_me: about };
            }
            return prevUser;
        });

        }
        catch(e)
        {
            console.log(e)
        }
    }

    return(
        <>
    <div className={`flex w-screen h-screen relative   ${toggle ? "blur-sm" : "blur-none"}`}>
            <Sidebar></Sidebar>
            
            <div className='w-screen p-16 flex flex-col gap-14'>
            <Image  ></Image>
    <div className='flex flex-col gap-10'>
        <h1 className='font-black text-3xl border-b-2 border-black'>About me</h1>
        <div className='w-2/3 sm:w-4/5 flex gap-8'>
            {user.about_me ? <p>{user.about_me}</p>: <p>Write something about yourself</p>}
        
        <div onClick={handleClick}>
        <Icon path={mdiPencil} size={1}  className='self-start'/>
        </div>
        </div>
    </div>
        </div>

        </div>
        <form className={toggle ? 'normal' : 'none'} onSubmit={handleSubmit} >
        <div className='w-full px-5 border-b-2 flex items-center h-1/3 justify-between'>
        <h2 className='text-2xl text-white'>About me</h2>
        <div onClick={handleClick}>
        <Icon path={mdiCloseBoxOutline} size={1.2} color="white" className='mr-2' /> 
        </div>
        </div>
        <div className='w-full h-1/3 flex items-center justify-center'>
<input type="text" placeholder='Write...' className=' w-2/3 h-1/2 rounded-xl px-3' 
value={about}
minLength={2}
maxLength={40}
onChange={(e)=>setAbout(e.target.value)}
/>
</div>
<div className='w-full flex items-center justify-center'>
<button className='bg-white px-10 py-2 rounded-xl text-kombu text-lg font-black' type='submit'>Submit</button>
</div>    
    </form>
    </>
    )
}
export default Profile
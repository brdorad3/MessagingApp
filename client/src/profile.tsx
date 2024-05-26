import Icon from '@mdi/react';
import { mdiAccountCircle } from '@mdi/js';
import { useContext, useState } from 'react';
import { UserContext } from './userContext';
import Sidebar from './sidebar';
import { mdiPencil } from '@mdi/js';

const Profile = () => {
    const { user } = useContext(UserContext);
    const [toggle, setToggle] = useState(false)
    const [about, setAbout] = useState('')

    const handleClick = () => {
        setToggle(!toggle)
    }



    return(
        
        <div className='flex w-screen h-screen relative'>
            <Sidebar></Sidebar>
            
            <div className='w-screen p-16 flex flex-col gap-14'>
                <div className='flex gap-7'>
    <Icon path={mdiAccountCircle} color="black" size={4} />
    {user &&
    <p className='text-2xl pb-7 self-end'>{user.username}</p>
    }
    </div>
    <div className='flex flex-col gap-10'>
        <h1 className='font-black text-3xl border-b-2 border-black'>About me</h1>
        <div className='w-2/3 sm:w-4/5 flex gap-8'>
            {about ? <p>{about}</p>: <p>Write something about yourself</p>}
        
        <div onClick={handleClick}>
        <Icon path={mdiPencil} size={1}  className='self-start'/>
        </div>
        </div>
    </div>
        </div>


        <form action="#" className={toggle ? 'normal' : 'none'} onSubmit={handleClick} >
    <input type="text" placeholder='Write...' className='self-start w-2/3 h-1/5 rounded-xl px-3' 
    value={about}
    maxLength={250}
    onChange={(e)=>setAbout(e.target.value)}
    />
    <button type='submit'>sub</button>
        </form>

        </div>
    )
}
export default Profile
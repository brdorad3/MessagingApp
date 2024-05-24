import Icon from '@mdi/react';
import { mdiAccountCircle } from '@mdi/js';
import { mdiArrowLeft } from '@mdi/js';
import { useContext } from 'react';
import { UserContext } from './userContext';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { user } = useContext(UserContext);
    return(
        <div className='my-16 mx-20'>
            <Link to="/"><Icon path={mdiArrowLeft} size={2} color="black" /></Link>
            
            <div className='flex items-center gap-5'>
    <Icon path={mdiAccountCircle} color="black" className='w-1/3 ' />
    {user &&
    <p className='text-2xl pb-16'>{user.username}</p>
    }
        </div>
        </div>
    )
}
export default Profile
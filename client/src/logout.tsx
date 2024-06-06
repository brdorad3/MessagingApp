import React, { useContext } from 'react';
import { UserContext } from './userContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiLogout } from '@mdi/js';



const Logout = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3000/logout');
            setUser(null);
            navigate('/login'); 
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };

    return (
        <button onClick={handleLogout} className='flex justify-center'>
            <Icon path={mdiLogout} color="white" className='w-2/5 hover:scale-110 '/>
        </button>
    );
};

export default Logout;

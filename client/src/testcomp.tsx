import { useContext } from 'react';
import { UserContext } from './userContext';

const WelcomeComponent = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <p>Loading...</p>;
  }

  return <div className='custom'>
    <h1 className=''>Welcome, {user.username}!</h1>
    </div>;
};

export default WelcomeComponent;

import React, { useContext } from 'react';
import { UserContext } from './userContext';

const WelcomeComponent = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <p>Loading...</p>;
  }

  return <h1>Welcome, {user.username}!</h1>;
};

export default WelcomeComponent;

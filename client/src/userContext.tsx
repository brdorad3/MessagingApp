import React, { createContext, useState, useEffect, ReactNode, FC } from 'react';

interface User {
  username: string;
}

interface UserContextValue {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const defaultValue: UserContextValue = {
  user: null,
  setUser: () => {}
};

export const UserContext = createContext<UserContextValue>(defaultValue);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setUser({ username });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

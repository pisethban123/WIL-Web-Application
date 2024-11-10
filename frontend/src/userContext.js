import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUsername, setLoggedInUsername] = useState('');

  return (
    <UserContext.Provider value={{ loggedInUsername, setLoggedInUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

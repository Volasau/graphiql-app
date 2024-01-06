import { User } from '@firebase/auth';
import React, { ReactNode, createContext, useContext, useState } from 'react';

/// User
export type UserContextType = {
  user: User | null;
  setUser: (userValue: User | null) => void;
};

export const userContextState = {
  user: null,
  setUser: () => {},
};

export const UserContext = createContext<UserContextType>(userContextState);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUserValue] = useState<User | null>(null);

  const setUser = (userValue: User | null) => {
    setUserValue(userValue);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
};

import React, { ReactNode, createContext, useContext, useState } from 'react';

/// User
export type LoginContextType = {
  login: boolean;
  setLogin: (loginValue: boolean) => void;
};

export const loginContextState = {
  login: false,
  setLogin: () => {},
};

export const LoginContext = createContext<LoginContextType>(loginContextState);

type LoginProviderProps = {
  children: ReactNode;
};

export const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  const [login, setLoginValue] = useState<boolean>(false);

  const setLogin = (loginValue: boolean) => {
    setLoginValue(loginValue);
  };

  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => {
  const context = useContext(LoginContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
};

import React, { createContext } from 'react';

/// LoginEmail
export type LoginEmailContextType = {
  loginEmail: string;
  setLoginEmail: React.Dispatch<React.SetStateAction<string>>;
};

export const loginEmailContextState = {
  loginEmail: '',
  setLoginEmail: () => '',
};

export const LoginEmailContext = createContext<LoginEmailContextType>(
  loginEmailContextState
);

/// LoginPassword
export type LoginPasswordContextType = {
  loginPassword: string;
  setLoginPassword: React.Dispatch<React.SetStateAction<string>>;
};

export const loginPasswordContextState = {
  loginPassword: '',
  setLoginPassword: () => '',
};

export const LoginPasswordContext = createContext<LoginPasswordContextType>(
  loginPasswordContextState
);

/// RegisterPassword
export type RegisterPasswordContextType = {
  registerPassword: string;
  setRegisterPassword: React.Dispatch<React.SetStateAction<string>>;
};

export const registerPasswordContextState = {
  registerPassword: '',
  setRegisterPassword: () => '',
};

export const RegisterPasswordContext =
  createContext<RegisterPasswordContextType>(registerPasswordContextState);

/// RegisterEmail
export type RegisterEmailContextType = {
  registerEmail: string;
  setRegisterEmail: React.Dispatch<React.SetStateAction<string>>;
};

export const registerEmailContextState = {
  registerEmail: '',
  setRegisterEmail: () => '',
};

export const RegisterEmailContext = createContext<RegisterEmailContextType>(
  registerEmailContextState
);

/// User
export type UserContextType = {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
};

export const userContextState = {
  user: '',
  setUser: () => '',
};

export const UserContext = createContext<UserContextType>(userContextState);

/// Username
export type UserNameContextType = {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
};

export const userNameContextState = {
  userName: '',
  setUserName: () => '',
};

export const UserNameContext =
  createContext<UserNameContextType>(userNameContextState);

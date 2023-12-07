import React, { useState, useContext, ReactNode } from 'react';

interface LanguageContextProps {
  lan: string;
  setLanguage: (language: string) => void;
}

const LanguageContext = React.createContext<LanguageContextProps | undefined>(
  undefined
);
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [lan, setLan] = useState('en');

  const setLanguage = (language: string) => {
    setLan(language);
  };

  return (
    <LanguageContext.Provider value={{ lan, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
};

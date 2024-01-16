import React, {
  useState,
  useContext,
  ReactNode,
  Dispatch,
  useMemo,
} from 'react';

export enum SupportedLanguages {
  EN = 'en',
  RU = 'ru',
}

interface LanguageContextProps {
  lan: SupportedLanguages;
  setLanguage: Dispatch<SupportedLanguages>;
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
  const [lan, setLang] = useState(SupportedLanguages.EN);

  const contextValue = useMemo(() => {
    const setLanguage = (language: SupportedLanguages) => {
      setLang(language);
    };

    return { lan, setLanguage };
  }, [lan]);

  return (
    <LanguageContext.Provider value={contextValue}>
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

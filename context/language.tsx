import React, { useState, createContext, useEffect } from "react";
import * as config from "../config/constant";
import cookies from "js-cookie";
import { AppProviderProps } from "../types/app";

interface LanguageContextInterface {
  currentLocale: string;
  changeLocale: (locale?: string) => void;
}

export const LanguageContext = createContext<LanguageContextInterface>({
  currentLocale: config.DEFAULT_LANGUAGE,
  changeLocale: () => {},
});

const LanguageProvider = ({ children }: AppProviderProps) => {
  const [currentLocale, setCurrentLocale] = useState(config.DEFAULT_LANGUAGE);

  useEffect(() => {
    console.log("getCurrentLocale", getCurrentLocale());
    setCurrentLocale(getCurrentLocale());
  }, []);

  const getCurrentLocale = (): string => {
    var oldLocale = cookies.get(config.KEY_LANGUAGE);
    return oldLocale ? oldLocale : config.DEFAULT_LANGUAGE;
  };

  const changeLocale = (locale?: string): void => {
    if (locale && locale != currentLocale) {
      console.log("changeLocale", locale);
      setCurrentLocale(locale);
      cookies.set(config.KEY_LANGUAGE, locale);
    }
  };

  const languageValue: LanguageContextInterface = {
    currentLocale,
    changeLocale,
  };

  return (
    <LanguageContext.Provider value={languageValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;

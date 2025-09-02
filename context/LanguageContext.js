import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRef } from 'react';
import { I18nManager } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Languages } from '@/constants/Languages';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isRTL, setIsRTL] = useState(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    loadSavedLanguage();
    
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const loadSavedLanguage = async () => {
    try {
      const savedLanguage = await SecureStore.getItemAsync('selectedLanguage');
      if (savedLanguage && Languages[savedLanguage]) {
        if (isMountedRef.current) {
          setCurrentLanguage(savedLanguage);
          setIsRTL(savedLanguage === 'ar');
        }
        I18nManager.forceRTL(savedLanguage === 'ar');
      }
    } catch (error) {
      console.error('Error loading saved language:', error);
    }
  };

  const changeLanguage = async (languageCode) => {
    try {
      await SecureStore.setItemAsync('selectedLanguage', languageCode);
      if (isMountedRef.current) {
        setCurrentLanguage(languageCode);
        setIsRTL(languageCode === 'ar');
      }
      I18nManager.forceRTL(languageCode === 'ar');
      
      // Note: In a real app, you might want to restart the app here
      // to fully apply RTL changes
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const t = (key, params = {}) => {
    let translation = Languages[currentLanguage]?.[key] || Languages.en[key] || key;
    
    // Replace parameters in translation
    Object.keys(params).forEach(param => {
      translation = translation.replace(`{${param}}`, params[param]);
    });
    
    return translation;
  };

  const value = {
    currentLanguage,
    isRTL,
    changeLanguage,
    t,
    availableLanguages: [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'ar', name: 'Arabic', nativeName: 'العربية' }
    ]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
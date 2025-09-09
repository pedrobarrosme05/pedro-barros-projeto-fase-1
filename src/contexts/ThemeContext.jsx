import React, { createContext, useContext, useState, useEffect } from 'react';
import { lightTheme, darkTheme } from '../theme';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Verificar preferência salva no localStorage ou usar preferência do sistema
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('themeMode');
    if (savedTheme) {
      return savedTheme;
    }
    
    // Detectar preferência do sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  };

  const [themeMode, setThemeMode] = useState(getInitialTheme);
  const [currentTheme, setCurrentTheme] = useState(
    themeMode === 'dark' ? darkTheme : lightTheme
  );

  // Atualizar tema quando o modo mudar
  useEffect(() => {
    setCurrentTheme(themeMode === 'dark' ? darkTheme : lightTheme);
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  // Escutar mudanças na preferência do sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Só muda automaticamente se não há preferência salva
      if (!localStorage.getItem('themeMode')) {
        setThemeMode(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  const toggleTheme = () => {
    setThemeMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  const setLightTheme = () => setThemeMode('light');
  const setDarkTheme = () => setThemeMode('dark');

  const value = {
    themeMode,
    currentTheme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    isDark: themeMode === 'dark',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
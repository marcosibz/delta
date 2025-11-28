import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(null);

const lightTheme = {
  background: '#e9f2ff',
  cardBackground: '#e9f2ff',
  cardBorder: '#b0d0ff',
  text: '#003366',
  textSecondary: '#666',
  primary: '#007bff',
  header: '#cfe4ff',
  headerBorder: '#a8cfff',
  button: '#007bff',
  buttonText: '#fff',
  danger: 'red',
  success: '#28a745',
  containerBg: '#f5f5f5',
  itemBg: '#fff',
  statusBar: 'dark'
};

const darkTheme = {
  background: '#1a1a2e',
  cardBackground: '#16213e',
  cardBorder: '#0f3460',
  text: '#eee',
  textSecondary: '#aaa',
  primary: '#00d4ff',
  header: '#0f3460',
  headerBorder: '#1a1a2e',
  button: '#00d4ff',
  buttonText: '#000',
  danger: '#ff6b6b',
  success: '#51cf66',
  containerBg: '#16213e',
  itemBg: '#1a1a2e',
  statusBar: 'light'
};

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}

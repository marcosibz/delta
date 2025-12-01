import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    nombre: '',
    correo: '',
    foto: null,
  });

  // Debug: log cuando cambia el estado de autenticación
  useEffect(() => {
    console.log('🔐 Estado de autenticación cambió:', isAuthenticated);
    console.log('👤 Usuario actual:', user);
  }, [isAuthenticated, user]);

  const login = (userData) => {
    console.log('✅ LOGIN llamado con:', userData);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const updateUser = (newData) => {
    console.log('📝 UPDATE USER:', newData);
    setUser((prev) => ({ ...prev, ...newData }));
  };

  const logout = () => {
    console.log('🚪 LOGOUT llamado');
    setUser({ nombre: '', correo: '', foto: null });
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated, login, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside UserProvider');
  return ctx;
}
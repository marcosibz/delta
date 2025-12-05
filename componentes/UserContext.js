import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    id: null,
    nombre: '',
    correo: '',
    foto: null,
    esAdmin: false,
  });

  // Cargar sesión al iniciar la app
  useEffect(() => {
    loadSession();
  }, []);

  const loadSession = async () => {
    try {
      const userJson = await AsyncStorage.getItem('@user_session');
      if (userJson) {
        const userData = JSON.parse(userJson);
        setUser(userData);
        setIsAuthenticated(true);
        console.log('✅ Sesión cargada desde AsyncStorage');
      }
    } catch (error) {
      console.error('Error cargando sesión:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSession = async (userData) => {
    try {
      await AsyncStorage.setItem('@user_session', JSON.stringify(userData));
      console.log('💾 Sesión guardada en AsyncStorage');
    } catch (error) {
      console.error('Error guardando sesión:', error);
    }
  };

  const clearSession = async () => {
    try {
      await AsyncStorage.removeItem('@user_session');
      console.log('🗑️ Sesión eliminada de AsyncStorage');
    } catch (error) {
      console.error('Error eliminando sesión:', error);
    }
  };

  // Debug: log cuando cambia el estado de autenticación
  useEffect(() => {
    console.log('🔐 Estado de autenticación cambió:', isAuthenticated);
    console.log('👤 Usuario actual:', user);
  }, [isAuthenticated, user]);

  const login = async (userData) => {
    console.log('✅ LOGIN llamado con:', userData);
    setUser(userData);
    setIsAuthenticated(true);
    await saveSession(userData);
  };

  const updateUser = async (newData) => {
    console.log('📝 UPDATE USER:', newData);
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    await saveSession(updatedUser);
  };

  const logout = async () => {
    console.log('🚪 LOGOUT llamado');
    try {
      setIsAuthenticated(false);
      setUser({ id: null, nombre: '', correo: '', foto: null, esAdmin: false });
      await clearSession();
      console.log('✅ Logout completado');
    } catch (error) {
      console.error('❌ Error en logout:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated, isLoading, login, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside UserProvider');
  return ctx;
}
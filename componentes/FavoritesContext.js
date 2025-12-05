import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from './UserContext';

const FavoritesContext = createContext();

const BASE_URL = 'http://192.168.100.7:3000';

export function FavoritesProvider({ children }) {
  const { user, isAuthenticated } = useUser();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar favoritos al iniciar o cuando cambia el usuario
  useEffect(() => {
    if (isAuthenticated && user.id) {
      loadFavorites();
    } else {
      setFavorites([]);
    }
  }, [isAuthenticated, user.id]);

  const loadFavorites = async () => {
    if (!user.id) return;
    
    setLoading(true);
    try {
      // Intentar cargar desde el servidor
      const response = await fetch(`${BASE_URL}/favoritos/user/${user.id}`);
      const data = await response.json();
      
      if (data.ok) {
        setFavorites(data.favorites);
        // Guardar en AsyncStorage como backup
        await AsyncStorage.setItem(`@favorites_${user.id}`, JSON.stringify(data.favorites));
      }
    } catch (error) {
      console.error('Error cargando favoritos:', error);
      // Si falla, intentar cargar desde AsyncStorage
      try {
        const cached = await AsyncStorage.getItem(`@favorites_${user.id}`);
        if (cached) {
          setFavorites(JSON.parse(cached));
        }
      } catch (e) {
        console.error('Error cargando favoritos del cache:', e);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (product) => {
    if (!isAuthenticated || !user.id) {
      console.log('Usuario no autenticado');
      return false;
    }

    const isFav = favorites.some(fav => fav.id === product.id);

    try {
      if (isFav) {
        // Remover de favoritos
        const response = await fetch(`${BASE_URL}/favoritos/remove`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, productId: product.id }),
        });

        if (response.ok) {
          setFavorites(prev => prev.filter(fav => fav.id !== product.id));
          return true;
        }
      } else {
        // Agregar a favoritos
        const response = await fetch(`${BASE_URL}/favoritos/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, productId: product.id }),
        });

        if (response.ok) {
          setFavorites(prev => [...prev, product]);
          return true;
        }
      }
    } catch (error) {
      console.error('Error toggle favorite:', error);
      return false;
    }
  };

  const isFavorite = (productId) => {
    return favorites.some(fav => fav.id === productId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, loading, toggleFavorite, isFavorite, loadFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites debe usarse dentro de FavoritesProvider');
  return ctx;
}

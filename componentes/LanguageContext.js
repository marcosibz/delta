import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguageContext = createContext();

export const translations = {
  es: {
    // Home
    home: 'Inicio',
    catalog: 'Catálogo',
    favorites: 'Favoritos',
    profile: 'Mi Perfil',
    cart: 'Carrito',
    search: 'Buscar productos...',
    addToCart: 'Añadir',
    addedToCart: 'Añadido al carrito',
    remove: 'Eliminar',
    
    // Cart
    myCart: 'Mi Carrito',
    subtotal: 'Subtotal',
    buyNow: 'Comprar ahora',
    emptyCart: 'Vaciar carrito',
    emptyCartMessage: 'Tu carrito está vacío',
    confirmPurchase: 'Confirmar compra',
    totalToPay: 'Total a pagar',
    cancel: 'Cancelar',
    buy: 'Comprar',
    areYouSure: '¿Estás seguro/a?',
    removeAllProducts: 'Se eliminarán todos los productos del carrito',
    yes: 'Sí',
    thanksForPurchase: '¡Gracias por tu compra!',
    orderProcessed: 'Tu pedido ha sido procesado correctamente',
    accept: 'Aceptar',
    
    // Profile
    account: 'Mi cuenta',
    purchases: 'Mis compras',
    viewCart: 'Ver carrito',
    purchaseHistory: 'Historial de compras',
    closeSession: 'Cerrar sesión',
    changeUser: 'Cambiar Usuario',
    editEmail: 'Editar correo',
    changePhoto: 'Cambiar foto',
    changePassword: 'Cambiar contraseña',
    deleteAccount: 'Eliminar cuenta',
    
    // Settings
    settings: 'Ajustes',
    notifications: 'Notificaciones',
    language: 'Idioma',
    spanish: 'Español',
    english: 'Inglés',
    
    // Favorites
    myFavorites: 'Mis Favoritos',
    noFavorites: 'No tienes productos favoritos aún',
    
    // Admin
    adminPanel: 'Panel Admin',
    addProduct: 'Agregar Producto',
    editProducts: 'Editar Productos',
    
    // Login
    login: 'Iniciar Sesión',
    register: 'Registrarse',
    email: 'Correo',
    password: 'Contraseña',
    username: 'Usuario',
  },
  en: {
    // Home
    home: 'Home',
    catalog: 'Catalog',
    favorites: 'Favorites',
    profile: 'My Profile',
    cart: 'Cart',
    search: 'Search products...',
    addToCart: 'Add',
    addedToCart: 'Added to cart',
    remove: 'Remove',
    
    // Cart
    myCart: 'My Cart',
    subtotal: 'Subtotal',
    buyNow: 'Buy now',
    emptyCart: 'Empty cart',
    emptyCartMessage: 'Your cart is empty',
    confirmPurchase: 'Confirm purchase',
    totalToPay: 'Total to pay',
    cancel: 'Cancel',
    buy: 'Buy',
    areYouSure: 'Are you sure?',
    removeAllProducts: 'All products will be removed from cart',
    yes: 'Yes',
    thanksForPurchase: 'Thank you for your purchase!',
    orderProcessed: 'Your order has been processed successfully',
    accept: 'Accept',
    
    // Profile
    account: 'My account',
    purchases: 'My purchases',
    viewCart: 'View cart',
    purchaseHistory: 'Purchase history',
    closeSession: 'Close session',
    changeUser: 'Change User',
    editEmail: 'Edit email',
    changePhoto: 'Change photo',
    changePassword: 'Change password',
    deleteAccount: 'Delete account',
    
    // Settings
    settings: 'Settings',
    notifications: 'Notifications',
    language: 'Language',
    spanish: 'Spanish',
    english: 'English',
    
    // Favorites
    myFavorites: 'My Favorites',
    noFavorites: "You don't have favorite products yet",
    
    // Admin
    adminPanel: 'Admin Panel',
    addProduct: 'Add Product',
    editProducts: 'Edit Products',
    
    // Login
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    username: 'Username',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('@language');
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const changeLanguage = async (lang) => {
    try {
      await AsyncStorage.setItem('@language', lang);
      setLanguage(lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

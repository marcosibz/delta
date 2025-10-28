import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const DUMMY_PRODUCTS = [
    { id: '1', name: 'Polo boxy fit oscuro', price: 89.99, image: 'https://placehold.co/150x180/007bff/ffffff?text=ZAP+PRO' },
    { id: '2', name: 'Jean baggy camuflado', price: 59.90, image: 'https://placehold.co/150x180/dc3545/ffffff?text=CHAQ+LIG' },
    { id: '3', name: 'Mochila Urbana Minimalista', price: 35.50, image: 'https://placehold.co/150x180/28a745/ffffff?text=MOCHILA' },
    { id: '4', name: 'Gorra Clásica de Algodón', price: 15.00, image: 'https://placehold.co/150x180/ffc107/333333?text=GORRA' },
    { id: '5', name: 'Hoodie boxy fit', price: 120.00, image: 'https://placehold.co/150x180/6f42c1/ffffff?text=AURICUL' },
    { id: '6', name: 'Polar zip ovezide', price: 199.99, image: 'https://placehold.co/150x180/fd7e14/ffffff?text=RELOJ+V2' },
  ];

  const getProducts = () => DUMMY_PRODUCTS;

  const updateItemQuantity = (productId, change) => {
    setCartItems(prevItems => {
      const existing = prevItems.find(i => i.id === productId);
      if (existing) {
        const newQty = existing.quantity + change;
        if (newQty <= 0) return prevItems.filter(i => i.id !== productId);
        return prevItems.map(i => i.id === productId ? { ...i, quantity: newQty } : i);
      }
      if (change > 0) {
        const product = DUMMY_PRODUCTS.find(p => p.id === productId);
        if (product) return [...prevItems, { ...product, quantity: change }];
      }
      return prevItems;
    });
  };

  const addToCart = (product) => updateItemQuantity(product.id, 1);
  const removeFromCart = (productId) => updateItemQuantity(productId, -1);
  const clearCart = () => setCartItems([]);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, it) => sum + (it.price * (it.quantity || 0)), 0),
    [cartItems]
  );

  return (
    <CartContext.Provider value={{ cartItems, subtotal, getProducts, addToCart, updateItemQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider');
  return ctx;
};

export default CartContext;
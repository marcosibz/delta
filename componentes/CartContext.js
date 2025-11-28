// ...existing code...
import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateItemQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, quantity: (p.quantity || 1) + delta } : p))
        .filter((p) => p.quantity > 0)
    );
  };

  const removeFromCart = (id) => setCartItems((prev) => prev.filter((p) => p.id !== id));
  const clearCart = () => setCartItems([]);

  const subtotal = useMemo(
    () => cartItems.reduce((s, it) => s + (it.price || 0) * (it.quantity || 1), 0),
    [cartItems]
  );

  const getProducts = () => [
    { id: 1, name: 'Remera básica', price: 19.99, image: 'https://via.placeholder.com/400x300' },
    { id: 2, name: 'Pantalón Jeans', price: 39.99, image: 'https://via.placeholder.com/400x300' },
  ];

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateItemQuantity, removeFromCart, clearCart, subtotal, getProducts }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
// ...existing code...
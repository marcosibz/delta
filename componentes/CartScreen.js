import React, { createContext, useContext, useState, useMemo } from 'react';

// 1. Crea el Contexto
const CartContext = createContext();

// Productos de ejemplo
const DUMMY_PRODUCTS = [
  { id: '1', name: 'Zapatillas Running Pro', price: 89.99, image: 'https://placehold.co/150x180/007bff/ffffff?text=ZAP+PRO' },
  { id: '2', name: 'Chaqueta Deportiva Ligera', price: 59.90, image: 'https://placehold.co/150x180/dc3545/ffffff?text=CHAQ+LIG' },
  { id: '3', name: 'Mochila Urbana Minimalista', price: 35.50, image: 'https://placehold.co/150x180/28a745/ffffff?text=MOCHILA' },
  { id: '4', name: 'Gorra Clásica de Algodón', price: 15.00, image: 'https://placehold.co/150x180/ffc107/333333?text=GORRA' },
  { id: '5', name: 'Auriculares Inalámbricos', price: 120.00, image: 'https://placehold.co/150x180/6f42c1/ffffff?text=AURICUL' },
  { id: '6', name: 'Reloj Inteligente V2', price: 199.99, image: 'https://placehold.co/150x180/fd7e14/ffffff?text=RELOJ+V2' },
];

// 2. Componente Proveedor (Provider)
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Función para obtener la lista de productos (para HomeScreen)
  const getProducts = () => DUMMY_PRODUCTS;

  // Función para añadir o actualizar la cantidad de un producto
  const updateItemQuantity = (productId, change) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productId);

      if (existingItem) {
        const newQuantity = existingItem.quantity + change;
        
        if (newQuantity <= 0) {
          // Eliminar el artículo si la cantidad es 0 o menos
          return prevItems.filter(item => item.id !== productId);
        } else {
          // Actualizar la cantidad
          return prevItems.map(item =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
          );
        }
      } 
      
      // Si el artículo no existe y el cambio es positivo, se asume que es una adición.
      if (change > 0) {
        const product = DUMMY_PRODUCTS.find(p => p.id === productId);
        if (product) {
            return [...prevItems, { ...product, quantity: change }];
        }
      }

      return prevItems;
    });
  };

  // Función de acceso rápido para añadir un nuevo producto desde HomeScreen
  const addToCart = (product) => {
    updateItemQuantity(product.id, 1); 
  };

  // Cálculo del subtotal
  const subtotal = useMemo(() => 
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0), 
    [cartItems]
  );

  // Valores proporcionados por el contexto
  const contextValue = {
    cartItems,
    subtotal,
    getProducts,
    addToCart,
    updateItemQuantity,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// 3. Hook Personalizado para usar el Carrito
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe ser utilizado dentro de un CartProvider');
  }
  return context;
};

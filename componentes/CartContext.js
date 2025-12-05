import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';

const CartContext = createContext();
const BASE_URL = 'http://192.168.100.7:3000';

// Mapeo de imágenes locales
const imageMap = {
  'Polo.jpg': require('../image/Polo.jpg'),
  'Jean.jpg': require('../image/Jean.jpg'),
  'Jorts.jpeg': require('../image/Jorts.jpeg'),
  'Bermuda.jpg': require('../image/Bermuda.jpg'),
  'Hoodie.jpeg': require('../image/Hoodie.jpeg'),
  'Polar.jpg': require('../image/Polar.jpg'),
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/productos`);
      const data = await response.json();
      
      if (data.ok) {
        // Mapear productos con imágenes locales
        const mappedProducts = data.products.map(p => ({
          id: p.id.toString(),
          name: p.nombre,
          price: parseFloat(p.precio),
          image: imageMap[p.imagen] || require('../image/Polo.jpg'),
          categoria: p.categoria,
          stock: p.stock,
        }));
        setProducts(mappedProducts);
      }
    } catch (error) {
      console.error('Error cargando productos:', error);
      // Usar productos por defecto si falla
      setProducts([
        { id: '1', name: 'Polo boxy fit oscuro', price: 89.99, image: require('../image/Polo.jpg') },
        { id: '2', name: 'Jean baggy camuflado', price: 59.90, image: require('../image/Jean.jpg') },
        { id: '3', name: 'jorts baggy', price: 35.50, image: require('../image/Jorts.jpeg') },
        { id: '4', name: 'bermuda baggy cargo', price: 15.00, image: require('../image/Bermuda.jpg') },
        { id: '5', name: 'Hoodie boxy fit', price: 120.00, image: require('../image/Hoodie.jpeg') },
        { id: '6', name: 'Polar zip ovezide', price: 199.99, image: require('../image/Polar.jpg') },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getProducts = () => products;

  const updateItemQuantity = (productId, change) => {
    setCartItems(prevItems => {
      const existing = prevItems.find(i => i.id === productId);
      if (existing) {
        const newQty = existing.quantity + change;
        if (newQty <= 0) return prevItems.filter(i => i.id !== productId);
        return prevItems.map(i => i.id === productId ? { ...i, quantity: newQty } : i);
      }
      if (change > 0) {
        const product = products.find(p => p.id === productId);
        if (product) return [...prevItems, { ...product, quantity: change }];
      }
      return prevItems;
    });
  };

  const addToCart = (product) => updateItemQuantity(product.id, 1);
  const removeFromCart = (productId) => updateItemQuantity(productId, -1);
  const clearCart = () => setCartItems([]);

  const completePurchase = async (userId) => {
    if (cartItems.length === 0) return false;
    if (!userId) return false;
    
    try {
      // Guardar compra en el backend
      const response = await fetch(`${BASE_URL}/compras`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario_id: userId,
          total: subtotal,
          items: cartItems.map(item => ({
            producto_id: item.id,
            cantidad: item.quantity || 1,
            precio_unitario: item.price
          }))
        }),
      });
      
      const data = await response.json();
      
      if (data.ok) {
        const purchase = {
          id: data.compraId || Date.now().toString(),
          items: [...cartItems],
          total: subtotal,
          date: new Date().toISOString(),
        };
        
        setPurchaseHistory(prev => [purchase, ...prev]);
        setCartItems([]);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error al guardar compra:', error);
      return false;
    }
  };

  const subtotal = useMemo(
    () => cartItems.reduce((sum, it) => sum + (it.price * (it.quantity || 0)), 0),
    [cartItems]
  );

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      subtotal, 
      getProducts, 
      addToCart, 
      updateItemQuantity, 
      removeFromCart, 
      clearCart, 
      loading, 
      refreshProducts: loadProducts,
      completePurchase,
      purchaseHistory
    }}>
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
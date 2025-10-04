import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native'; 
import { useTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
// Importa el hook para acceder a los datos y funciones del carrito
import { useCart } from './CartContext'; 

// --- Componente de la Tarjeta de Artículo del Carrito ---
const CartItemCard = ({ item, colors, updateItemQuantity, confirmRemoveItem }) => {
  return (
    <View style={[styles.itemCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      
      {/* Imagen del Producto */}
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      
      {/* Detalles y Controles */}
      <View style={styles.detailsContainer}>
        <Text style={[styles.itemName, { color: colors.text }]} numberOfLines={2}>
          {item.name}
        </Text>
        
        {/* Precio total por artículo (Precio unitario * Cantidad) */}
        <Text style={[styles.itemPrice, { color: colors.primary }]}>
          ${(item.price * item.quantity).toFixed(2)}
        </Text>
        
        {/* Control de Cantidad */}
        <View style={styles.quantityControl}>
          <TouchableOpacity 
            style={[styles.qtyButton, { backgroundColor: colors.notification, borderColor: colors.border }]} 
            // Disminuir cantidad
            onPress={() => updateItemQuantity(item.id, -1)}
            disabled={item.quantity <= 1} // Deshabilita si la cantidad es 1
          >
            <Text style={{ color: colors.background, fontWeight: 'bold' }}>-</Text>
          </TouchableOpacity>
          
          <Text style={[styles.qtyText, { color: colors.text }]}>{item.quantity}</Text>
          
          <TouchableOpacity 
            style={[styles.qtyButton, { backgroundColor: colors.notification, borderColor: colors.border }]} 
            // Aumentar cantidad
            onPress={() => updateItemQuantity(item.id, 1)}
          >
            <Text style={{ color: colors.background, fontWeight: 'bold' }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Botón de Eliminar - Llama a la función de confirmación */}
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => confirmRemoveItem(item)} // Llama a la función de alerta
      >
        <Ionicons name="trash-outline" size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
};

// --- Componente Principal de la Pantalla de Carrito ---
export default function CartScreen() {
  const { colors, dark } = useTheme();
  
  // 1. Obtiene el estado y las funciones del carrito del contexto
  const { cartItems, subtotal, updateItemQuantity } = useCart();

  // Función interna para la eliminación real
  const removeItem = (id) => {
    // Para eliminar completamente, establecemos el cambio como el negativo de la cantidad actual.
    const itemToRemove = cartItems.find(item => item.id === id);
    if (itemToRemove) {
      updateItemQuantity(id, -itemToRemove.quantity);
    }
  };

  // 2. Función que muestra la alerta de confirmación (USANDO Alert)
  const confirmRemoveItem = (item) => {
    Alert.alert(
      "Confirmar Eliminación",
      `¿Estás seguro de que quieres eliminar ${item.name} del carrito?`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { 
          text: "Eliminar", 
          onPress: () => removeItem(item.id), // Llama a la función de eliminación si el usuario confirma
          style: "destructive"
        }
      ],
      { cancelable: true }
    );
  };

  // Determina el estilo de la barra de estado para adaptabilidad
  const statusBarStyle = dark ? 'light' : 'dark';

  const renderItem = ({ item }) => (
    <CartItemCard 
      item={item} 
      colors={colors} 
      updateItemQuantity={updateItemQuantity} 
      confirmRemoveItem={confirmRemoveItem} // Pasa la función de confirmación a la tarjeta
    />
  );

  return (
    <View style={[styles.fullContainer, { backgroundColor: colors.background }]}>
      
      {/* Encabezado */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Mi Carrito ({cartItems.length})
        </Text>
      </View>
      
      {/* Lista de Artículos */}
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        // Mensaje si el carrito está vacío
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ionicons name="cart-outline" size={64} color={colors.text} />
            <Text style={[styles.emptyText, { color: colors.text }]}>
              Tu carrito está vacío. ¡Añade algunos productos!
            </Text>
          </View>
        )}
      />
      
      {/* Resumen y Botón de Pago (solo si hay artículos) */}
      {cartItems.length > 0 && (
        <View style={[styles.summaryContainer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryText, { color: colors.text }]}>Subtotal:</Text>
            <Text style={[styles.summaryTotal, { color: colors.text }]}>
              ${subtotal.toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity style={[styles.checkoutButton, { backgroundColor: colors.primary }]}>
            <Text style={styles.checkoutText}>
              Pagar (${(subtotal * 1.05).toFixed(2)}) {/* Simulación de cálculo total con impuesto del 5% */}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <StatusBar style={statusBarStyle} />
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
  },
  header: {
    paddingTop: 40, // Espacio para el notch/barra de estado
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 10,
  },
  // Estilos de la tarjeta de artículo
  itemCard: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
    alignItems: 'center',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  // Control de Cantidad
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  qtyText: {
    marginHorizontal: 15,
    fontSize: 16,
  },
  deleteButton: {
    padding: 5,
    marginLeft: 10,
  },
  // Estilos del resumen
  summaryContainer: {
    padding: 20,
    borderTopWidth: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 18,
  },
  summaryTotal: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Carrito vacío
  emptyContainer: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    marginTop: 15,
    fontSize: 18,
    textAlign: 'center',
  },
});

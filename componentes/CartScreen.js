import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { useCart } from './CartContext';

export default function CartScreen() {
  const { cartItems, subtotal, updateItemQuantity, removeFromCart, clearCart } = useCart();

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${(item.price).toFixed(2)}</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => updateItemQuantity(item.id, -1)}>
            <Text style={styles.qtyText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qty}>{item.quantity || 1}</Text>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => updateItemQuantity(item.id, 1)}>
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.remove}>
            <Text style={{ color: 'red' }}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito ({cartItems.length})</Text>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>El carrito está vacío</Text>}
      />
      <View style={styles.footer}>
        <Text style={styles.subtotal}>Subtotal: ${subtotal.toFixed(2)}</Text>
        <Button title="Vaciar carrito" onPress={clearCart} disabled={cartItems.length === 0} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    backgroundColor: '#fff',
    color: '#003366',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 8,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  qtyBtn: {
    width: 30,
    height: 30,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  qtyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  qty: {
    marginHorizontal: 15,
    fontSize: 16,
    fontWeight: '600',
  },
  remove: {
    marginLeft: 'auto',
    padding: 5,
  },
  empty: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  subtotal: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#003366',
  },
});
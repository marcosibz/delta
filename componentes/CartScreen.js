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
        keyExtractor={item => item.id}
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
  container: { flex: 1, padding: 12 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  empty: { textAlign: 'center', marginTop: 20, color: '#666' },
  item: { flexDirection: 'row', marginBottom: 12, backgroundColor: '#fff', padding: 8, borderRadius: 8, elevation: 1 },
  image: { width: 64, height: 64, borderRadius: 6, marginRight: 8 },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: '500' },
  price: { color: '#333', marginTop: 4 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  qtyBtn: { width: 30, height: 30, borderRadius: 4, backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center' },
  qtyText: { fontSize: 18 },
  qty: { marginHorizontal: 8 },
  remove: { marginLeft: 12 },
  footer: { borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 10, marginTop: 8 },
  subtotal: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
});
import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { useCart } from './CartContext';
import { useTheme } from './ThemeContext';

export default function CartScreen() {
  const { cartItems, subtotal, updateItemQuantity, removeFromCart, clearCart } = useCart();
  const { theme } = useTheme();

  const renderItem = ({ item }) => (
    <View style={[styles.item, { backgroundColor: theme.itemBg }]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
        <Text style={[styles.price, { color: theme.primary }]}>${(item.price).toFixed(2)}</Text>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.qtyBtn, { backgroundColor: theme.button }]} onPress={() => updateItemQuantity(item.id, -1)}>
            <Text style={[styles.qtyText, { color: theme.buttonText }]}>-</Text>
          </TouchableOpacity>
          <Text style={[styles.qty, { color: theme.text }]}>{item.quantity || 1}</Text>
          <TouchableOpacity style={[styles.qtyBtn, { backgroundColor: theme.button }]} onPress={() => updateItemQuantity(item.id, 1)}>
            <Text style={[styles.qtyText, { color: theme.buttonText }]}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.remove}>
            <Text style={{ color: theme.danger }}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.containerBg }]}>
      <Text style={[styles.title, { backgroundColor: theme.itemBg, color: theme.text }]}>Carrito ({cartItems.length})</Text>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={[styles.empty, { color: theme.textSecondary }]}>El carrito está vacío</Text>}
      />
      <View style={[styles.footer, { backgroundColor: theme.itemBg, borderTopColor: theme.cardBorder }]}>
        <Text style={[styles.subtotal, { color: theme.text }]}>Subtotal: ${subtotal.toFixed(2)}</Text>
        <Button title="Vaciar carrito" onPress={clearCart} disabled={cartItems.length === 0} color={theme.button} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
  },
  item: {
    flexDirection: 'row',
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
  },
  price: {
    fontSize: 16,
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
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  qtyText: {
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
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
  },
  subtotal: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});
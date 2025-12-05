import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';
import { useCart } from './CartContext';

export default function MyPurchasesScreen({ navigation }) {
  const { theme } = useTheme();
  const { cart } = useCart();

  const renderProductItem = ({ item }) => (
    <View
      style={[
        styles.productCard,
        {
          backgroundColor: theme.itemBg,
          borderColor: theme.primary,
        },
      ]}
    >
      <Image
        source={{ uri: item.imagen || 'https://via.placeholder.com/100' }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={[styles.productName, { color: theme.text }]}>
          {item.nombre}
        </Text>
        <Text style={[styles.productPrice, { color: theme.primary }]}>
          ${item.precio.toFixed(2)}
        </Text>
        <Text style={[styles.productQuantity, { color: theme.textSecondary }]}>
          Cantidad: {item.cantidad}
        </Text>
        <Text style={[styles.productTotal, { color: theme.text }]}>
          Total: ${(item.precio * item.cantidad).toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.removeButton, { backgroundColor: theme.danger }]}
        onPress={() => Alert.alert('Eliminar', 'Producto eliminado del carrito')}
      >
        <Ionicons name="trash" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  const emptyComponent = (
    <View style={styles.emptyContainer}>
      <Ionicons name="cart" size={60} color={theme.textSecondary} />
      <Text style={[styles.emptyText, { color: theme.text }]}>
        {cart.length === 0 ? 'Tu carrito está vacío' : 'No hay productos'}
      </Text>
      <Text style={[styles.emptySubtext, { color: theme.textSecondary }]}>
        {cart.length === 0 
          ? 'Comienza a agregar productos' 
          : 'Revisa tu historial de compras'}
      </Text>
    </View>
  );

  const totalAmount = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.itemBg, borderBottomColor: theme.primary }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Mis Compras
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
          {cart.length} producto{cart.length !== 1 ? 's' : ''} en carrito
        </Text>
      </View>

      <FlatList
        data={cart}
        renderItem={renderProductItem}
        keyExtractor={(item, idx) => idx.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={emptyComponent}
        scrollEnabled={true}
      />

      {cart.length > 0 && (
        <View style={[styles.footer, { backgroundColor: theme.itemBg, borderTopColor: theme.primary }]}>
          <View style={styles.totalSection}>
            <Text style={[styles.totalLabel, { color: theme.textSecondary }]}>
              Total del carrito:
            </Text>
            <Text style={[styles.totalAmount, { color: theme.primary }]}>
              ${totalAmount.toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.checkoutButton, { backgroundColor: theme.button }]}
            onPress={() => Alert.alert('Compra', 'Procesando compra...')}
          >
            <Ionicons name="checkmark-circle" size={20} color={theme.buttonText} />
            <Text style={[styles.checkoutText, { color: theme.buttonText }]}>
              Finalizar compra
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  listContent: {
    padding: 15,
    paddingBottom: 100,
  },
  productCard: {
    flexDirection: 'row',
    marginBottom: 15,
    borderRadius: 12,
    borderWidth: 2,
    overflow: 'hidden',
    elevation: 2,
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    margin: 10,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    paddingRight: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  productQuantity: {
    fontSize: 12,
    marginTop: 2,
  },
  productTotal: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },
  removeButton: {
    padding: 10,
    marginRight: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderTopWidth: 2,
    elevation: 10,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
    elevation: 3,
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

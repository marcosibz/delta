import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from './FavoritesContext';
import { useCart } from './CartContext';

export default function FavoritesScreen({ isDarkMode = false, onClose }) {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  const renderItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: isDarkMode ? '#1f1f1f' : '#fff' }]}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.info}>
        <Text style={[styles.name, { color: isDarkMode ? '#fff' : '#003366' }]} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={[styles.price, { color: isDarkMode ? '#03DAC6' : '#007bff' }]}>
          ${item.price?.toFixed(2)}
        </Text>
        <View style={styles.buttons}>
          <TouchableOpacity 
            style={[styles.btn, styles.addBtn]} 
            onPress={() => addToCart(item)}
          >
            <Ionicons name="cart-outline" size={18} color="#fff" />
            <Text style={styles.btnText}>Añadir</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.btn, styles.removeBtn]} 
            onPress={() => toggleFavorite(item)}
          >
            <Ionicons name="heart-dislike" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#0d1117' : '#f5f5f5' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#003366' }]}>
          Mis Favoritos ({favorites.length})
        </Text>
        {onClose && (
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={28} color={isDarkMode ? '#fff' : '#003366'} />
          </TouchableOpacity>
        )}
      </View>
      
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="heart-outline" size={64} color="#ccc" />
            <Text style={[styles.emptyText, { color: isDarkMode ? '#888' : '#666' }]}>
              No tienes favoritos aún
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 15,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 15,
    borderRadius: 12,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
  },
  price: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 4,
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    gap: 4,
  },
  addBtn: {
    backgroundColor: '#007bff',
    flex: 1,
  },
  removeBtn: {
    backgroundColor: '#dc3545',
  },
  btnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
  },
});

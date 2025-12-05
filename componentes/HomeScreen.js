import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from './CartContext';
import { useFavorites } from './FavoritesContext';
import { useLanguage } from './LanguageContext';
import FavoritesScreen from './FavoritesScreen';

const ProductCard = ({ product, addToCart, isDarkMode }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { t } = useLanguage();
  const [localFav, setLocalFav] = useState(isFavorite(product.id));

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleToggleFavorite = async () => {
    const success = await toggleFavorite(product);
    if (success !== false) {
      setLocalFav(!localFav);
    }
  };

  return (
    <View style={[styles.card, { backgroundColor: isDarkMode ? '#1f1f1f' : '#e9f2ff', borderColor: isDarkMode ? '#2a2a2a' : '#b0d0ff' }]}>
      <TouchableOpacity 
        style={styles.favoriteBtn}
        onPress={handleToggleFavorite}
      >
        <Ionicons 
          name={localFav ? "heart" : "heart-outline"} 
          size={22} 
          color={localFav ? "#ff4757" : (isDarkMode ? '#888' : '#666')} 
        />
      </TouchableOpacity>
      <Image 
        source={product.image} 
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={[styles.productName, { color: isDarkMode ? '#fff' : '#003366' }]} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={[styles.productPrice, { color: isDarkMode ? '#03DAC6' : '#007bff' }]}>
          ${product.price.toFixed(2)}
        </Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddToCart}
        >
          <Ionicons name="cart-outline" size={20} color="#fff" />
          <Text style={styles.addText}>{t('addToCart')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function HomeScreen({ isDarkMode = false }) {
  const { addToCart, getProducts } = useCart();
  const { favorites } = useFavorites();
  const { t } = useLanguage();
  const [showFavorites, setShowFavorites] = useState(false);
  const DUMMY_PRODUCTS = getProducts();

  const renderItem = ({ item }) => (
    <ProductCard product={item} addToCart={addToCart} isDarkMode={isDarkMode} />
  );

  return (
    <View style={[styles.fullContainer, { backgroundColor: isDarkMode ? '#0d1117' : '#e9f2ff' }]}>
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#1f1f1f' : '#cfe4ff', borderBottomColor: isDarkMode ? '#2a2a2a' : '#a8cfff' }]}>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#fff' : '#003366' }]}>DELTASTYLE Store</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => setShowFavorites(true)}
          >
            <Ionicons name="heart" size={24} color={isDarkMode ? '#ff4757' : '#ff4757'} />
            {favorites.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{favorites.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={showFavorites}
        animationType="slide"
        onRequestClose={() => setShowFavorites(false)}
      >
        <FavoritesScreen 
          isDarkMode={isDarkMode} 
          onClose={() => setShowFavorites(false)} 
        />
      </Modal>

      <FlatList
        data={DUMMY_PRODUCTS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={() => (
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#003366' }]}>Nuevos Productos</Text>
        )}
      />
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: '#e9f2ff',
    paddingTop: 0,
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#cfe4ff',
    borderBottomColor: '#a8cfff',
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  iconButton: {
    padding: 5,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ff4757',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    marginTop: 10,
    paddingHorizontal: 10,
    color: '#003366',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  card: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    marginBottom: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    position: 'relative',
  },
  favoriteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 6,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 180,
    marginBottom: 5,
  },
  infoContainer: {
    padding: 8,
    alignItems: 'center',
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 5,
  },
  addText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: 'bold',
  },
});
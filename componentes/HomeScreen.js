import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from './CartScreen'; 

const ProductCard = ({ product, addToCart, colors }) => {
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <View style={[styles.card, { backgroundColor: '#e9f2ff', borderColor: '#b0d0ff' }]}>
      <Image 
        source={{ uri: product.image }} 
        style={styles.productImage} 
        onError={(e) => console.log('Error loading image', e.nativeEvent.error)}
      />
      <View style={styles.infoContainer}>
        <Text style={[styles.productName, { color: '#003366' }]} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={[styles.productPrice, { color: '#007bff' }]}>
          ${product.price.toFixed(2)}
        </Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddToCart}
        >
          <Ionicons name="cart-outline" size={20} color="#fff" />
          <Text style={styles.addText}>Añadir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function HomeScreen() {
  const { addToCart, getProducts } = useCart();
  const DUMMY_PRODUCTS = getProducts();

  const renderItem = ({ item }) => (
    <ProductCard product={item} addToCart={addToCart} />
  );

  return (
    <View style={styles.fullContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>DELTASTYLE Store</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search-outline" size={24} color="#003366" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={DUMMY_PRODUCTS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={() => (
            <Text style={styles.sectionTitle}>Nuevos Productos</Text>
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
  searchButton: {
    padding: 5,
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
  },
  productImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
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
  }
});


/* filepath: c:\Users\SOY DE RIVER\OneDrive\Escritorio\delta\componentes\HomeScreen.js */
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from './CartContext';
import { useTheme } from './ThemeContext';
import ProductModal from './ProductModal';

const ProductCard = ({ product, addToCart, onPress, theme }) => {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}
      onPress={() => onPress(product)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: product.image }}
        style={styles.productImage}
      />

      <View style={styles.infoContainer}>
        <Text style={[styles.productName, { color: theme.text }]} numberOfLines={2}>
          {product.name}
        </Text>

        <Text style={[styles.productPrice, { color: theme.primary }]}>
          ${product.price.toFixed(2)}
        </Text>

        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: theme.button }]}
          onPress={() => addToCart(product)}
        >
          <Ionicons name="cart-outline" size={20} color={theme.buttonText} />
          <Text style={[styles.addText, { color: theme.buttonText }]}>Añadir</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const { addToCart, getProducts } = useCart();
  const { theme } = useTheme();
  const DUMMY_PRODUCTS = getProducts();

  // 🟦 Estado para manejar la modal del producto
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const renderItem = ({ item }) => (
    <ProductCard
      product={item}
      addToCart={addToCart}
      onPress={openModal}
      theme={theme}
    />
  );

  return (
    <View style={[styles.fullContainer, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.header, borderBottomColor: theme.headerBorder }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>DELTASTYLE Store</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search-outline" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={DUMMY_PRODUCTS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={() => (
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Nuevos Productos</Text>
        )}
      />

      {/* 🟦 Modal del producto */}
      <ProductModal
        visible={modalVisible}
        product={selectedProduct}
        onClose={closeModal}
        addToCart={addToCart}
      />

      <StatusBar style={theme.statusBar} />
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    paddingTop: 0,
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchButton: { padding: 5 },
  listContainer: { paddingHorizontal: 10, paddingBottom: 20 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  columnWrapper: { justifyContent: 'space-between', marginBottom: 10 },
  card: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    marginBottom: 15,
    elevation: 4,
  },
  productImage: { width: '100%', height: 180, resizeMode: 'cover', marginBottom: 5 },
  infoContainer: { padding: 8, alignItems: 'center' },
  productName: { fontSize: 14, fontWeight: '500', marginBottom: 4, textAlign: 'center' },
  productPrice: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 5,
  },
  addText: {
    marginLeft: 5,
    fontWeight: 'bold',
  },
});

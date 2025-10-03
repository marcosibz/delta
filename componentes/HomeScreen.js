import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
// Importamos useTheme de react-navigation para acceder a los colores y la propiedad 'dark'
import { useTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

// Datos de productos simulados
const DUMMY_PRODUCTS = [
  { id: '1', name: 'Camiseta Básica Oversize', price: '25.00', image: 'https://placehold.co/150x200/525252/FFFFFF?text=CAMISETA' },
  { id: '2', name: 'Jeans Slim Fit Negro', price: '55.50', image: 'https://placehold.co/150x200/262626/FFFFFF?text=JEANS' },
  { id: '3', name: 'Sudadera con Capucha', price: '45.99', image: 'https://placehold.co/150x200/94A3B8/000000?text=SUDADERA' },
  { id: '4', name: 'Chaqueta de Mezclilla', price: '79.99', image: 'https://placehold.co/150x200/3B82F6/FFFFFF?text=CHAQUETA' },
  { id: '5', name: 'Vestido Floral Verano', price: '60.00', image: 'https://placehold.co/150x200/F472B6/FFFFFF?text=VESTIDO' },
];

// Componente para la tarjeta de producto
const ProductCard = ({ product }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => console.log('Ver detalle de: ', product.name)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.infoContainer}>
        <Text style={[styles.productName, { color: colors.text }]} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.productPrice} style={{ color: colors.primary }}>
          ${product.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};


export default function HomeScreen() {
  // Obtenemos los colores y la propiedad 'dark' del tema actual
  const { colors, dark } = useTheme();

  // El estilo de la StatusBar debe ser 'light' cuando el tema es oscuro (dark === true)
  const statusBarStyle = dark ? 'light' : 'dark';

  const renderItem = ({ item }) => <ProductCard product={item} />;

  return (
    <View style={[styles.fullContainer, { backgroundColor: colors.background }]}>
      
      {/* --- Encabezado de la Tienda --- */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          DELTASTYLE Store
        </Text>
        <TouchableOpacity style={styles.searchButton}>
          {/* Aquí podrías usar Ionicons para un icono de búsqueda */}
          <Text style={{ color: colors.primary, fontSize: 16 }}>Buscar</Text>
        </TouchableOpacity>
      </View>
      {/* --- Fin Encabezado --- */}

      {/* --- Lista de Productos --- */}
      <FlatList
        data={DUMMY_PRODUCTS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={() => (
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Nuevos Productos
            </Text>
        )}
      />
      {/* --- Fin Lista de Productos --- */}

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchButton: {
    padding: 5,
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  card: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    marginBottom: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

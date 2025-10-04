import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
// Importa el hook del carrito para acceder a las funciones globales (addToCart, getProducts)
import { useCart } from './CartContext'; 

// Componente para la tarjeta de producto individual
const ProductCard = ({ product, addToCart, colors }) => {

  // La función addToCart se recibe de HomeScreen y usa el contexto
  const handleAddToCart = () => {
    addToCart(product);
    // Opcional: Podrías añadir una pequeña notificación aquí (e.g., Toast)
  };

  return (
    <View 
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
    >
      <Image 
        source={{ uri: product.image }} 
        style={styles.productImage} 
        // Fallback de imagen por si la URL no carga (opcional, pero buena práctica)
        onError={(e) => console.log('Error loading image', e.nativeEvent.error)}
      />
      <View style={styles.infoContainer}>
        <Text style={[styles.productName, { color: colors.text }]} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={[styles.productPrice, { color: colors.primary }]}>
          ${product.price.toFixed(2)}
        </Text>
        
        {/* Botón de Añadir al Carrito: Llama a la función del contexto */}
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: colors.notification }]}
          onPress={handleAddToCart}
        >
          <Ionicons name="cart-outline" size={20} color={colors.background} />
          <Text style={styles.addText}>Añadir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default function HomeScreen() {
  // Obtiene colores y estado de modo oscuro del tema de navegación
  const { colors, dark } = useTheme();
  
  // Obtenemos las funciones y datos necesarios del contexto del carrito
  const { addToCart, getProducts } = useCart();

  // Obtenemos la lista de productos base (del CartContext)
  const DUMMY_PRODUCTS = getProducts();

  // Ajusta el color de la barra de estado (hora, batería) según el tema
  const statusBarStyle = dark ? 'light' : 'dark';

  const renderItem = ({ item }) => (
    <ProductCard 
        product={item} 
        addToCart={addToCart} // Pasamos la función del contexto
        colors={colors}
    />
  );

  return (
    <View style={[styles.fullContainer, { backgroundColor: colors.background }]}>
      
      {/* --- Encabezado de la Tienda --- */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          DELTASTYLE Store
        </Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      {/* --- Fin Encabezado --- */}

      {/* --- Lista de Productos --- */}
      <FlatList
        data={DUMMY_PRODUCTS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2} // Muestra 2 productos por fila
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
    paddingTop: 0, 
  },
  header: {
    paddingTop: 40, // Margen superior para la barra de estado (notch)
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
    paddingBottom: 20,
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
    elevation: 5, // Android shadow
    paddingBottom: 10,
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

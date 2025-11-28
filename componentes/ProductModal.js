import React from 'react';
import { View, Text, Modal, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProductModal({ visible, product, onClose, addToCart }) {
  // No renderizar si no hay producto o no es visible
  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    Alert.alert('Añadido', `${product.name} ha sido añadido al carrito.`);
    onClose(); // Cerrar el modal después de añadir al carrito
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          
          {/* Botón de cerrar */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close-circle" size={30} color="#003366" />
          </TouchableOpacity>

          {/* Imagen del producto */}
          <Image 
            source={{ uri: product.image }} 
            style={styles.productImage} 
            onError={(e) => console.log('Error loading image', e.nativeEvent.error)}
          />
          
          {/* Detalles del producto */}
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
          
          {/* Descripción (ejemplo, ya que tus datos no la incluyen) */}
          <Text style={styles.productDescription}>
            Detalle: Este artículo es parte de nuestra nueva colección. Cuenta con un diseño moderno, ajuste perfecto y está fabricado con materiales sostenibles de alta durabilidad. ¡No te quedes sin el tuyo!
          </Text>

          {/* Botón para añadir al carrito */}
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddToCart}
          >
            <Ionicons name="cart" size={20} color="#fff" />
            <Text style={styles.addText}>Añadir al Carrito</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fondo oscuro y semi-transparente
  },
  modalView: {
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    width: '90%',
    maxWidth: 450,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    padding: 5,
  },
  productImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    borderRadius: 15,
    marginBottom: 15,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#003366',
  },
  productPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 15,
  },
  productDescription: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 3,
  },
  addText: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
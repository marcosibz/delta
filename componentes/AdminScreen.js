import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BASE_URL = 'http://192.168.100.7:3000';

export default function AdminScreen({ isDarkMode = false }) {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    imagen: '',
    categoria: '',
    stock: '',
    descripcion: '',
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/productos`);
      const data = await response.json();
      if (data.ok) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Error cargando productos:', error);
    }
  };

  const handleSave = async () => {
    if (!formData.nombre || !formData.precio || !formData.imagen) {
      Alert.alert('Error', 'Completa los campos obligatorios');
      return;
    }

    try {
      const url = editingProduct
        ? `${BASE_URL}/productos/${editingProduct.id}`
        : `${BASE_URL}/productos`;
      
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.ok) {
        Alert.alert('Éxito', editingProduct ? 'Producto actualizado' : 'Producto creado');
        setShowModal(false);
        resetForm();
        loadProducts();
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el producto');
    }
  };

  const handleDelete = async (id) => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de eliminar este producto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`${BASE_URL}/productos/${id}`, {
                method: 'DELETE',
              });
              const data = await response.json();
              if (data.ok) {
                Alert.alert('Éxito', 'Producto eliminado');
                loadProducts();
              }
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar');
            }
          },
        },
      ]
    );
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      nombre: product.nombre,
      precio: product.precio.toString(),
      imagen: product.imagen,
      categoria: product.categoria || '',
      stock: product.stock?.toString() || '0',
      descripcion: product.descripcion || '',
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      nombre: '',
      precio: '',
      imagen: '',
      categoria: '',
      stock: '',
      descripcion: '',
    });
  };

  const renderProduct = ({ item }) => (
    <View style={[styles.productCard, { backgroundColor: isDarkMode ? '#1f1f1f' : '#fff' }]}>
      <View style={styles.productInfo}>
        <Text style={[styles.productName, { color: isDarkMode ? '#fff' : '#003366' }]}>
          {item.nombre}
        </Text>
        <Text style={[styles.productPrice, { color: isDarkMode ? '#03DAC6' : '#007bff' }]}>
          ${item.precio}
        </Text>
        <Text style={[styles.productStock, { color: isDarkMode ? '#888' : '#666' }]}>
          Stock: {item.stock} | {item.categoria}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleEdit(item)} style={styles.btnEdit}>
          <Ionicons name="pencil" size={20} color="#007bff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.btnDelete}>
          <Ionicons name="trash" size={20} color="#dc3545" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#0d1117' : '#f5f5f5' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#003366' }]}>
          Panel de Administración
        </Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <Ionicons name="add-circle" size={32} color="#007bff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        contentContainerStyle={styles.list}
      />

      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: isDarkMode ? '#1f1f1f' : '#fff' }]}>
            <ScrollView>
              <Text style={[styles.modalTitle, { color: isDarkMode ? '#fff' : '#003366' }]}>
                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </Text>

              <TextInput
                style={[styles.input, { borderColor: isDarkMode ? '#444' : '#ddd', color: isDarkMode ? '#fff' : '#000' }]}
                placeholder="Nombre del producto *"
                placeholderTextColor={isDarkMode ? '#888' : '#999'}
                value={formData.nombre}
                onChangeText={(text) => setFormData({ ...formData, nombre: text })}
              />

              <TextInput
                style={[styles.input, { borderColor: isDarkMode ? '#444' : '#ddd', color: isDarkMode ? '#fff' : '#000' }]}
                placeholder="Precio *"
                placeholderTextColor={isDarkMode ? '#888' : '#999'}
                keyboardType="numeric"
                value={formData.precio}
                onChangeText={(text) => setFormData({ ...formData, precio: text })}
              />

              <TextInput
                style={[styles.input, { borderColor: isDarkMode ? '#444' : '#ddd', color: isDarkMode ? '#fff' : '#000' }]}
                placeholder="Nombre de imagen (ej: Polo.jpg) *"
                placeholderTextColor={isDarkMode ? '#888' : '#999'}
                value={formData.imagen}
                onChangeText={(text) => setFormData({ ...formData, imagen: text })}
              />

              <TextInput
                style={[styles.input, { borderColor: isDarkMode ? '#444' : '#ddd', color: isDarkMode ? '#fff' : '#000' }]}
                placeholder="Categoría"
                placeholderTextColor={isDarkMode ? '#888' : '#999'}
                value={formData.categoria}
                onChangeText={(text) => setFormData({ ...formData, categoria: text })}
              />

              <TextInput
                style={[styles.input, { borderColor: isDarkMode ? '#444' : '#ddd', color: isDarkMode ? '#fff' : '#000' }]}
                placeholder="Stock"
                placeholderTextColor={isDarkMode ? '#888' : '#999'}
                keyboardType="numeric"
                value={formData.stock}
                onChangeText={(text) => setFormData({ ...formData, stock: text })}
              />

              <TextInput
                style={[styles.input, styles.textArea, { borderColor: isDarkMode ? '#444' : '#ddd', color: isDarkMode ? '#fff' : '#000' }]}
                placeholder="Descripción"
                placeholderTextColor={isDarkMode ? '#888' : '#999'}
                multiline
                numberOfLines={3}
                value={formData.descripcion}
                onChangeText={(text) => setFormData({ ...formData, descripcion: text })}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.button, styles.btnCancel]}
                  onPress={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                >
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.btnSave]} onPress={handleSave}>
                  <Text style={styles.buttonText}>Guardar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    padding: 5,
  },
  list: {
    paddingHorizontal: 15,
  },
  productCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  productStock: {
    fontSize: 13,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  btnEdit: {
    padding: 8,
  },
  btnDelete: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 15,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnCancel: {
    backgroundColor: '#6c757d',
  },
  btnSave: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

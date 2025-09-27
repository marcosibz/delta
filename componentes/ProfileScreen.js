import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
// Si tienes react-native-vector-icons instalado, puedes importar Icon:
// import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Encabezado con avatar y nombre */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>Juan Pérez</Text>
          <Text style={styles.email}>juan.perez@email.com</Text>
        </View>
      </View>

      {/* Opciones de menú */}
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          {/* <Icon name="account-circle" size={24} color="#666" /> */}
          <Text style={styles.menuIcon}>👤</Text>
          <Text style={styles.menuText}>Mi cuenta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          {/* <Icon name="shopping-cart" size={24} color="#666" /> */}
          <Text style={styles.menuIcon}>🛒</Text>
          <Text style={styles.menuText}>Mis compras</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          {/* <Icon name="settings" size={24} color="#666" /> */}
          <Text style={styles.menuIcon}>⚙️</Text>
          <Text style={styles.menuText}>Configuración</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          {/* <Icon name="logout" size={24} color="#666" /> */}
          <Text style={styles.menuIcon}>🚪</Text>
          <Text style={styles.menuText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff159',
    padding: 20,
    marginBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 2,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 15,
    color: '#555',
    marginTop: 4,
  },
  menu: {
    marginTop: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 18,
    paddingHorizontal: 25,
    marginBottom: 10,
    borderRadius: 12,
    marginHorizontal: 18,
    elevation: 1,
  },
  menuIcon: {
    fontSize: 22,
    marginRight: 18,
  },
  menuText: {
    fontSize: 17,
    color: '#333',
  },
});
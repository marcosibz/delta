import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';

export default function SettingsScreen() {

  const handlePress = (option) => {
    Alert.alert('Opción seleccionada', `Has tocado: ${option}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajustes</Text>

      <TouchableOpacity style={styles.option} onPress={() => handlePress("Editar Perfil")}>
        <Text style={styles.optionText}>Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => handlePress("Notificaciones")}>
        <Text style={styles.optionText}>Notificaciones</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => handlePress("Idioma")}>
        <Text style={styles.optionText}>Idioma</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => handlePress("Privacidad")}>
        <Text style={styles.optionText}>Privacidad</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.option, styles.logoutButton]} onPress={() => handlePress("Cerrar Sesión")}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F0FA', // Fondo azul muy suave
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#004080', // Azul oscuro
    marginBottom: 25,
    textAlign: 'center',
  },
  option: {
    backgroundColor: '#FFFFFF', // Fondo blanco para las tarjetas
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#80BFFF', // Borde azul claro
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // sombra para Android
  },
  optionText: {
    fontSize: 17,
    color: '#004080', // Texto azul oscuro
  },
  logoutButton: {
    backgroundColor: '#007BFF', // Azul principal para el botón de cerrar sesión
    borderColor: '#007BFF',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
  },
});

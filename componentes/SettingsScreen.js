import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';

export default function SettingsScreen() {

  const handlePress = (option) => {
    Alert.alert('Opción seleccionada', `Has tocado: ${option}`);
  };
 
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Ajustes</Text>

      {/* Opciones */}
      <TouchableOpacity style={styles.option} onPress={() => handlePress("Editar Perfil")}>
        <View style={styles.row}>
          <Feather name="user" size={22} color="#004080" />
          <Text style={styles.optionText}>Editar Perfil</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#004080" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => handlePress("Notificaciones")}>
        <View style={styles.row}>
          <Ionicons name="notifications-outline" size={22} color="#004080" />
          <Text style={styles.optionText}>Notificaciones</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#004080" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => handlePress("Idioma")}>
        <View style={styles.row}>
          <Ionicons name="language-outline" size={22} color="#004080" />
          <Text style={styles.optionText}>Idioma</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#004080" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => handlePress("Privacidad")}>
        <View style={styles.row}>
          <Feather name="lock" size={22} color="#004080" />
          <Text style={styles.optionText}>Privacidad</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#004080" />
      </TouchableOpacity>

      {/* Botón Cerrar Sesión */}
      <TouchableOpacity style={[styles.option, styles.logoutButton]} onPress={() => handlePress("Cerrar Sesión")}>
        <View style={styles.row}>
          <MaterialIcons name="logout" size={22} color="#fff" />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F0FA',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#004080',
    marginBottom: 25,
    textAlign: 'center',
  },
  option: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#80BFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  optionText: {
    fontSize: 17,
    color: '#004080',
  },
  logoutButton: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
    marginTop: 30,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 5,
  },
});

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';

export default function RegistroScreen({ navigation, onRegistrado }) {
  const [correo, setCorreo] = useState('');
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://192.168.100.7:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          correo,
          usuario,
          contraseña: password
        }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Éxito', 'Usuario registrado correctamente');
        setCorreo('');
        setUsuario('');
        setPassword('');
        onRegistrado();
      } else {
        Alert.alert('Error', data.error || 'Error al registrar usuario');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar al servidor');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Usuario</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo"
        placeholderTextColor="#7a7a7a"
        value={correo}
        onChangeText={setCorreo}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        placeholderTextColor="#7a7a7a"
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#7a7a7a"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.buttonContainer}>
        <Button title="Registrar" color="#007bff" onPress={handleRegister} />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>
          ¿Tienes una cuenta? <Text style={styles.link}>Acceder</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9f2ff', // fondo azul suave
    justifyContent: 'center',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0056b3', // azul oscuro del título
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    height: 45,
    width: '100%',
    borderColor: '#007bff',
    borderWidth: 1.5,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 12,
    backgroundColor: '#f8fbff',
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 10,
    elevation: 3, // sombra del botón
  },
  loginText: {
    color: '#333',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 15,
  },
  link: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native';

export default function RegistroScreen({ navigation, onRegistrado }) {
  const [correo, setCorreo] = useState('');
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    // Validación cliente
    if (!correo.trim() || !usuario.trim() || !password.trim()) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    const body = { correo: correo.trim(), usuario: usuario.trim(), contrasena: password };

    console.log('Registro: body ->', body);

    try {
      const response = await fetch('http://10.230.117.125:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log('register response:', data);

      if (response.ok && data.ok !== false) {
        Alert.alert('Éxito', data.message || 'Usuario registrado correctamente');
        setCorreo('');
        setUsuario('');
        setPassword('');
        onRegistrado && onRegistrado();
      } else {
        // construir mensaje seguro (STRING)
        let msg;
        if (typeof data === 'string') msg = data;
        else if (data?.message) msg = data.message;
        else if (data?.error) msg = (typeof data.error === 'string') ? data.error : (data.error.message || JSON.stringify(data.error));
        else msg = JSON.stringify(data);
        Alert.alert('Error', msg);
      }
    } catch (error) {
      console.log('register catch error:', error);
      Alert.alert('Error', error.message || JSON.stringify(error));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Registrar" onPress={handleRegister} />

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{ color: 'blue', textAlign: 'center', marginTop: 16 }}>
          ¿Tienes una cuenta? Acceder
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});
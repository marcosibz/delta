import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useUser } from './UserContext';

export default function RegistroScreen({ navigation }) {
  const { login } = useUser();
  const [correo, setCorreo] = useState('');
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!correo.trim() || !usuario.trim() || !password.trim()) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    const body = { 
      correo: correo.trim(), 
      usuario: usuario.trim(), 
      contrasena: password 
    };

    console.log('Registrando usuario:', body);

    try {
      const response = await fetch('http://10.0.0.113:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      if (response.ok && data.ok) {
        console.log('Registro exitoso');
        
        Alert.alert(
          'Éxito', 
          data.message || 'Usuario registrado correctamente',
          [
            {
              text: 'OK',
              onPress: () => {
                // Auto-login después del registro
                login({ 
                  nombre: usuario.trim(), 
                  correo: correo.trim(), 
                  foto: null 
                });
              }
            }
          ]
        );
        
        setCorreo('');
        setUsuario('');
        setPassword('');
      } else {
        Alert.alert('Error', data.error || 'Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      
      // Servidor no disponible - ofrecer modo de prueba
      Alert.alert(
        'Servidor no disponible',
        'No se pudo conectar al servidor. ¿Quieres usar modo de prueba?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Modo Prueba',
            onPress: () => {
              console.log('🧪 Activando modo prueba - REGISTRO');
              login({ 
                nombre: usuario.trim() || 'Usuario Prueba', 
                correo: correo.trim() || 'prueba@test.com', 
                foto: null 
              });
            }
          }
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Usuario</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#7a7a7a"
        value={correo}
        onChangeText={setCorreo}
        autoCapitalize="none"
        keyboardType="email-address"
        editable={!loading}
      />

      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        placeholderTextColor="#7a7a7a"
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="words"
        editable={!loading}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña (mínimo 6 caracteres)"
        placeholderTextColor="#7a7a7a"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
      />

      <View style={styles.buttonContainer}>
        <Button 
          title={loading ? "Registrando..." : "Registrar"} 
          color="#007bff" 
          onPress={handleRegister}
          disabled={loading}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>
          ¿Ya tienes cuenta? <Text style={styles.link}>Iniciar sesión</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9f2ff',
    justifyContent: 'center',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0056b3',
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
    elevation: 3,
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
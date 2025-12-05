import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  Alert,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useUser } from './UserContext';

const BASE_URL = 'http://192.168.100.7:3000';

export default function LoginScreen({ navigation }) {
  const { login } = useUser();
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!correo.trim() || !password.trim()) {
      Alert.alert('Error', 'Completa correo y contraseña');
      return;
    }

    console.log('LOGIN payload:', { correo: correo.trim(), contrasena: password });

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: correo.trim(), contrasena: password }),
      });

      const data = await response.json();
      console.log('login response:', data);

      if (response.ok && data.ok) {
        // Actualizar el contexto de usuario con los datos recibidos
        await login({
          id: data.user.id,
          nombre: data.user.usuario || '',
          correo: data.user.correo || '',
          foto: null,
          esAdmin: data.user.esAdmin || false,
        });
        
        Alert.alert('Éxito', 'Login exitoso');
      } else {
        const msg = typeof data === 'string' ? data : (data?.message || JSON.stringify(data));
        Alert.alert('Error', msg || 'Datos incorrectos');
      }
    } catch (error) {
      console.error('login error', error);
      Alert.alert('Error', error.message || 'No se pudo conectar al servidor');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        keyboardShouldPersistTaps="handled"
      >
        {/* LOGO */}
        <Image 
          source={{ uri: 'https://placehold.co/120x120/007bff/ffffff?text=LOGO' }}
          style={styles.logo}
        />

        {/* TARJETA DE LOGIN */}
        <View style={styles.card}>
          <Text style={styles.title}>Iniciar Sesión</Text>

          <TextInput
            style={styles.input}
            placeholder="Correo"
            placeholderTextColor="#7a7a7a"
            value={correo}
            onChangeText={setCorreo}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#7a7a7a"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <View style={styles.buttonContainer}>
            <Button title="Acceder" color="#007bff" onPress={handleLogin} />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
            <Text style={styles.newText}>
              Es la primera vez que entras? <Text style={styles.link}>Registrarme</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9f2ff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 30,
    backgroundColor: '#d0e3ff',
  },
  card: {
    backgroundColor: '#ffffff',
    width: '100%',
    maxWidth: 380,
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderLeftWidth: 5,
    borderLeftColor: '#007bff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0056b3',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 45,
    borderColor: '#007bff',
    borderWidth: 1.5,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f8fbff',
  },
  buttonContainer: { width: '100%', borderRadius: 8, overflow: 'hidden', marginTop: 10, elevation: 3 },
  newText: { color: '#333', textAlign: 'center', marginTop: 16, fontSize: 15 },
  link: { color: '#007bff', fontWeight: 'bold' },
});
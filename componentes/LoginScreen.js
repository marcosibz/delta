import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';

export default function LoginScreen({ navigation, route, onLogin }) {
  const realOnLogin = onLogin || (route?.params?.onLogin);
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://10.230.117.125:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contraseña: password }),
      });
      const data = await response.json();
      if (response.ok && data.ok) {
        if (realOnLogin) realOnLogin();
<<<<<<< HEAD
    } else {
        alert('Error', 'Datos incorrectos');
=======
      } else {
        Alert.alert('Error', 'Datos incorrectos');
>>>>>>> 9f8c41419e5da5f6e64d26359d93c8ec14aaeed3
      }
    } catch (error) {
      alert('Error', 'No se pudo conectar al servidor');
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

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Acceder</Text>
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
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
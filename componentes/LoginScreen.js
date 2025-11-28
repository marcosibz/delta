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
import { useUser } from './UserContext';

export default function LoginScreen({ navigation }) {
  const { login } = useUser();
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!correo.trim() || !password.trim()) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    setLoading(true);
    console.log('Intentando login con:', correo);

    try {
      const response = await fetch('http://10.0.0.113:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          correo: correo.trim(), 
          contrasena: password 
        }),
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      if (response.ok && data.ok) {
        console.log('Login exitoso');
        
        // Guardar datos del usuario en el contexto
        login({ 
          nombre: data.usuario || correo.split('@')[0], 
          correo: correo.trim(),
          foto: data.foto || null 
        });
        
        Alert.alert('Bienvenido', `Hola ${data.usuario}!`);
      } else {
        // Credenciales incorrectas
        Alert.alert('Error', data.message || 'Datos incorrectos');
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
              console.log('Activando modo prueba');
              login({ 
                nombre: correo.split('@')[0] || 'Usuario Prueba', 
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
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        keyboardShouldPersistTaps="handled"
      >
        <Image 
          source={require('../assets/icon.png')}
          style={styles.logo}
        />

        <View style={styles.card}>
          <Text style={styles.title}>Iniciar Sesión</Text>

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
            placeholder="Contraseña"
            placeholderTextColor="#7a7a7a"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!loading}
          />

          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Iniciando sesión...' : 'Acceder'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
            <Text style={styles.registerText}>
              ¿No tienes cuenta? <Text style={styles.link}>Regístrate</Text>
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
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  registerText: {
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
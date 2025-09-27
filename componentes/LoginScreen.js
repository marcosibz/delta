import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function LoginScreen({ isDarkMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#ffffff' }]}>
      <Text style={[styles.title, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
        Iniciar Sesión
      </Text>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDarkMode ? '#1e1e1e' : '#f0f0f0',
            color: isDarkMode ? '#ffffff' : '#000000',
            borderColor: isDarkMode ? '#03DAC6' : '#cccccc',
          },
        ]}
        placeholder="Correo electrónico"
        placeholderTextColor={isDarkMode ? '#aaaaaa' : '#555555'}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDarkMode ? '#1e1e1e' : '#f0f0f0',
            color: isDarkMode ? '#ffffff' : '#000000',
            borderColor: isDarkMode ? '#03DAC6' : '#cccccc',
          },
        ]}
        placeholder="Contraseña"
        placeholderTextColor={isDarkMode ? '#aaaaaa' : '#555555'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View
        style={[
          styles.buttonContainer,
          { backgroundColor: isDarkMode ? '#03DAC6' : '#007AFF' },
        ]}
      >
        <Button
          title="Entrar"
          color={isDarkMode ? '#121212' : '#ffffff'}
          onPress={() => alert('Iniciaste sesión')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: {
    height: 45,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
});



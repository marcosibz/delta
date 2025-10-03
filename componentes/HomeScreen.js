import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
<<<<<<< HEAD
// 1. Importa el hook useTheme
import { useTheme } from '@react-navigation/native';

export default function HomeScreen() {
  // 2. Obtiene el objeto 'colors' del tema actual
  const { colors } = useTheme();

  return (
    // 3. Usa 'colors.background' para el color de fondo del contenedor
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      
      {/* 4. Usa 'colors.text' para el color del texto. 
          Este será blanco en modo oscuro y negro en modo claro. */}
      <Text style={[styles.title, { color: colors.text }]}>
        ¡Hola! Soy texto con inversión de color
      </Text>
      
      <Text style={{ color: colors.text, marginTop: 10 }}>
        El tema actual es: {colors.card === 'rgb(1, 1, 1)' ? 'Modo Oscuro' : 'Modo Claro'}
      </Text>
=======

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido Usuario</Text>
>>>>>>> 25df4c59f6ea1a2041fa1b8d659750941c156f73
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // NO definas el 'backgroundColor' aquí, usa el estilo en línea
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
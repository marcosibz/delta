import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// Importamos useTheme de react-navigation para acceder a los colores y la propiedad 'dark'
import { useTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  // Obtenemos los colores y la propiedad 'dark' del tema actual
  // 'dark' es true si el tema actual es DarkTheme, y false si es DefaultTheme
  const { colors, dark } = useTheme();

  // El estilo de la StatusBar debe ser 'light' cuando el tema es oscuro (dark === true)
  // y 'dark' cuando el tema es claro (dark === false).
  const statusBarStyle = dark ? 'light' : 'dark';

  return (
    // Aplicamos 'colors.background' para el fondo del contenedor principal
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      
      {/* Aplicamos 'colors.text' para el color del texto */}
      <Text style={[styles.title, { color: colors.text }]}>
        ¡Bienvenido a la Tienda!
      </Text>
      <Text style={{ color: colors.text, fontSize: 16 }}>
        Esta pantalla cambia automáticamente de color.
      </Text>

      {/* La StatusBar se adapta al modo oscuro/claro de forma fiable */}
      <StatusBar style={statusBarStyle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
  },
});

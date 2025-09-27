import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';

export default function DolarScreen() {
  const [dolares, setDolares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://dolarapi.com/v1/dolares')
      .then((response) => response.json())
      .then((data) => {
        setDolares(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error al obtener los datos');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Valores del Dólar (Argentina)</Text>
      {dolares.map((dolar) => (
        <View key={dolar.nombre} style={styles.card}>
          <Text style={styles.name}>{dolar.nombre}</Text>
          <Text>Compra: ${dolar.compra}</Text>
          <Text>Venta: ${dolar.venta}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});
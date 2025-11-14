import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  ActivityIndicator, 
  StyleSheet, 
  ScrollView, 
  RefreshControl 
} from 'react-native';

export default function DolarScreen() {
  const [dolares, setDolares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = () => {
    fetch('https://dolarapi.com/v1/dolares')
      .then((response) => response.json())
      .then((data) => {
        setDolares(data);
        setLoading(false);
        setRefreshing(false);
      })
      .catch(() => {
        setError('Error al obtener los datos');
        setLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Cargando cotizaciones...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#007bff']} />
      }
    >
      <Text style={styles.title}>💵 Cotización del Dólar (Argentina)</Text>
      {dolares.map((dolar) => (
        <View key={dolar.nombre} style={styles.card}>
          <Text style={styles.name}>{dolar.nombre}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Compra:</Text>
            <Text style={styles.priceValue}>${dolar.compra}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Venta:</Text>
            <Text style={styles.priceValue}>${dolar.venta}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#e9f2ff',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e9f2ff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#007bff',
    fontSize: 16,
  },
  errorText: {
    color: '#d9534f',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 14,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    borderLeftWidth: 5,
    borderLeftColor: '#007bff',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004080',
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  priceLabel: {
    fontSize: 16,
    color: '#333',
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007bff',
  },
});
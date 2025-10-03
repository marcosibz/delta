import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch } from 'react-native';

export default function ProfileScreen({ isDarkMode, setIsDarkMode }) {
  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#f5f5f5' }]}>
      {/* Encabezado */}
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#1f1f1f' : '#ffffff' }]}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
          style={[styles.avatar, { borderColor: isDarkMode ? '#03DAC6' : '#007AFF' }]}
        />
        <View>
          <Text style={[styles.name, { color: isDarkMode ? '#fff' : '#000' }]}>Juan Pérez</Text>
          <Text style={[styles.email, { color: isDarkMode ? '#bbb' : '#555' }]}>juan.perez@email.com</Text>
        </View>
      </View>

      {/* Switch para modo oscuro */}
      <View style={[
        styles.themeToggle,
        { backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff' }
      ]}>
        <Text style={{ color: isDarkMode ? '#fff' : '#000', fontSize: 16 }}>
          {isDarkMode ? 'Modo oscuro' : 'Modo claro'}
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={value => setIsDarkMode(value)}
          thumbColor={isDarkMode ? '#03DAC6' : '#f4f3f4'}
          trackColor={{ false: '#ccc', true: '#03DAC6' }}
        />
      </View>

      {/* Menú */}
      <View style={styles.menu}>
        {['Mi cuenta', 'Mis compras', 'Configuración', 'Cerrar sesión'].map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.menuItem,
              { backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff' },
            ]}
          >
            <Text style={[styles.menuText, { color: isDarkMode ? '#fff' : '#000' }]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 3,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
    borderWidth: 2,
    backgroundColor: '#222',
  },
  name: { fontSize: 22, fontWeight: 'bold' },
  email: { fontSize: 15, marginTop: 4 },
  themeToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginHorizontal: 18,
    borderRadius: 12,
    marginBottom: 20,
  },
  menu: { marginTop: 10 },
  menuItem: {
    paddingVertical: 18,
    paddingHorizontal: 25,
    marginBottom: 12,
    borderRadius: 12,
    marginHorizontal: 18,
    elevation: 2,
  },
  menuText: { fontSize: 17 },
});

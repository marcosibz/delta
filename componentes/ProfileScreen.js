import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch } from 'react-native';

export default function ProfileScreen({ isDarkMode, setIsDarkMode }) {
  const primaryBlue = '#007bff';
  const lightBackground = '#e9f2ff';
  const cardBackground = '#ffffff';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#0d1117' : lightBackground },
      ]}
    >
      {/* Encabezado */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: isDarkMode ? '#1f1f1f' : cardBackground,
            borderBottomColor: primaryBlue,
          },
        ]}
      >
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
          style={[
            styles.avatar,
            { borderColor: isDarkMode ? '#03DAC6' : primaryBlue },
          ]}
        />
        <View>
          <Text
            style={[styles.name, { color: isDarkMode ? '#fff' : '#003366' }]}
          >
            Juan Pérez
          </Text>
          <Text
            style={[styles.email, { color: isDarkMode ? '#bbb' : '#555' }]}
          >
            juan.perez@email.com
          </Text>
        </View>
      </View>

      {/* Switch para modo oscuro */}
      <View
        style={[
          styles.themeToggle,
          { backgroundColor: isDarkMode ? '#1e1e1e' : cardBackground },
        ]}
      >
        <Text
          style={{
            color: isDarkMode ? '#fff' : '#003366',
            fontSize: 16,
            fontWeight: '500',
          }}
        >
          {isDarkMode ? 'Modo oscuro' : 'Modo claro'}
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={(value) => setIsDarkMode(value)}
          thumbColor={isDarkMode ? '#03DAC6' : '#007bff'}
          trackColor={{ false: '#b0c4de', true: '#64b5f6' }}
        />
      </View>

      {/* Menú */}
      <View style={styles.menu}>
        {['Mi cuenta', 'Mis compras', 'Configuración', 'Cerrar sesión'].map(
          (item, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.menuItem,
                {
                  backgroundColor: isDarkMode ? '#1e1e1e' : cardBackground,
                  borderLeftColor: primaryBlue,
                },
              ]}
            >
              <Text
                style={[
                  styles.menuText,
                  { color: isDarkMode ? '#fff' : '#003366' },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
    borderBottomWidth: 3,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowColor: '#007bff',
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
    borderWidth: 2,
    backgroundColor: '#dce8ff',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 15,
    marginTop: 4,
  },
  themeToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginHorizontal: 18,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
  },
  menu: { marginTop: 10 },
  menuItem: {
    paddingVertical: 18,
    paddingHorizontal: 25,
    marginBottom: 12,
    borderRadius: 12,
    marginHorizontal: 18,
    elevation: 2,
    borderLeftWidth: 5,
  },
  menuText: {
    fontSize: 17,
    fontWeight: '500',
  },
});

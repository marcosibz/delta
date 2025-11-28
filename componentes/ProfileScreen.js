import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen({ isDarkMode, setIsDarkMode }) {

  const navigation = useNavigation();

  const primaryBlue = '#007bff';
  const lightBackground = '#e9f2ff';
  const cardBackground = '#ffffff';

  const handleMenuPress = (item) => {
    switch(item) {
      case 'Mi cuenta':
        navigation.navigate("EditarPerfil");
        break;

      case 'Mis compras':
        navigation.navigate("Carrito");
        break;

      case 'Configuración':
        navigation.navigate("Settings");
        break;

      case 'Cerrar sesión':
        navigation.replace("Login");
        break;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#0d1117' : lightBackground }]}>
      
      
      <View style={styles.menu}>
        {['Mi cuenta', 'Mis compras', 'Configuración', 'Cerrar sesión'].map(
          (item, idx) => (
            <TouchableOpacity
              key={idx}

              
              onPress={() => handleMenuPress(item)}

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

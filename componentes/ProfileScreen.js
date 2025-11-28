import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Switch,
  LayoutAnimation,
  Platform,
  UIManager
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ProfileScreen({ isDarkMode, setIsDarkMode }) {

  const navigation = useNavigation();

  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenSection(openSection === section ? null : section);
  };

  const primaryBlue = '#007bff';
  const lightBackground = '#e9f2ff';
  const cardBackground = '#ffffff';

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#0d1117' : lightBackground }
    ]}>

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
          <Text style={[styles.name, { color: isDarkMode ? '#fff' : '#003366' }]}>
            Juan Pérez
          </Text>
          <Text style={[styles.email, { color: isDarkMode ? '#bbb' : '#555' }]}>
            juan.perez@email.com
          </Text>
        </View>
      </View>

      {/* Switch modo oscuro */}
      <View
        style={[
          styles.themeToggle,
          { backgroundColor: isDarkMode ? '#1e1e1e' : cardBackground }
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
        {/* MI CUENTA */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => toggleSection("cuenta")}
        >
          <Text style={[
            styles.menuText,
            { color: isDarkMode ? '#fff' : '#003366' }
          ]}>
            Mi cuenta
          </Text>
        </TouchableOpacity>

        {openSection === "cuenta" && (
          <View style={styles.subMenu}>
            <TouchableOpacity style={styles.subItem}>
              <Text style={styles.subText}>Cambiar nombre</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.subItem}>
              <Text style={styles.subText}>Cambiar foto</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.subItem}>
              <Text style={styles.subText}>Editar correo</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* MIS COMPRAS */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => toggleSection("compras")}
        >
          <Text style={[
            styles.menuText,
            { color: isDarkMode ? '#fff' : '#003366' }
          ]}>
            Mis compras
          </Text>
        </TouchableOpacity>

        {openSection === "compras" && (
          <View style={styles.subMenu}>
            <TouchableOpacity
              style={styles.subItem}
              onPress={() => navigation.navigate("Carrito")}
            >
              <Text style={styles.subText}>Ver carrito</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.subItem}>
              <Text style={styles.subText}>Historial de compras</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* CONFIGURACIÓN */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => toggleSection("config")}
        >
          <Text style={[
            styles.menuText,
            { color: isDarkMode ? '#fff' : '#003366' }
          ]}>
            Configuración
          </Text>
        </TouchableOpacity>

        {openSection === "config" && (
          <View style={styles.subMenu}>
            <TouchableOpacity
              style={styles.subItem}
              onPress={() => navigation.navigate("Settings")}
            >
              <Text style={styles.subText}>Abrir ajustes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.subItem}
              onPress={() => setIsDarkMode(!isDarkMode)}
            >
              <Text style={styles.subText}>Cambiar tema</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* CERRAR SESIÓN */}
        <TouchableOpacity
          style={[styles.menuItem, { borderLeftColor: "red" }]}
          onPress={() => navigation.replace("Login")}
        >
          <Text style={[styles.menuText, { color: "red" }]}>
            Cerrar sesión
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


// STYLES
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
    borderLeftColor: '#007bff',
    backgroundColor: '#fff',
  },
  menuText: {
    fontSize: 17,
    fontWeight: '500',
  },
  subMenu: {
    backgroundColor: "#fff",
    paddingLeft: 35,
    paddingVertical: 10,
    marginBottom: 12,
    marginHorizontal: 18,
    borderLeftWidth: 3,
    borderLeftColor: "#007bff",
    borderRadius: 8
  },
  subItem: {
    paddingVertical: 8,
  },
  subText: {
    fontSize: 15,
    color: "#003366"
  }
});

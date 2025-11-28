import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  LayoutAnimation, 
  Platform, 
  UIManager 
} from 'react-native';
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function SettingsScreen() {

  // Estados de acordeones
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajustes</Text>

      {/* Editar Perfil */}
      <TouchableOpacity style={styles.option} onPress={() => toggleSection("perfil")}>
        <View style={styles.row}>
          <Feather name="user" size={22} color="#004080" />
          <Text style={styles.optionText}>Editar Perfil</Text>
        </View>
        <MaterialIcons 
          name={openSection === "perfil" ? "keyboard-arrow-up" : "keyboard-arrow-right"} 
          size={24} 
          color="#004080" 
        />
      </TouchableOpacity>

      {openSection === "perfil" && (
        <View style={styles.subMenu}>
          <TouchableOpacity style={styles.subItem}>
            <Text style={styles.subText}>Cambiar nombre</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.subItem}>
            <Text style={styles.subText}>Cambiar foto</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.subItem}>
            <Text style={styles.subText}>Modificar correo</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Notificaciones */}
      <TouchableOpacity style={styles.option} onPress={() => toggleSection("notificaciones")}>
        <View style={styles.row}>
          <Ionicons name="notifications-outline" size={22} color="#004080" />
          <Text style={styles.optionText}>Notificaciones</Text>
        </View>
        <MaterialIcons 
          name={openSection === "notificaciones" ? "keyboard-arrow-up" : "keyboard-arrow-right"} 
          size={24} 
          color="#004080" 
        />
      </TouchableOpacity>

      {openSection === "notificaciones" && (
        <View style={styles.subMenu}>
          <TouchableOpacity style={styles.subItem}>
            <Text style={styles.subText}>Activar notificaciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.subItem}>
            <Text style={styles.subText}>Desactivar sonido</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Idioma */}
      <TouchableOpacity style={styles.option} onPress={() => toggleSection("idioma")}>
        <View style={styles.row}>
          <Ionicons name="language-outline" size={22} color="#004080" />
          <Text style={styles.optionText}>Idioma</Text>
        </View>
        <MaterialIcons 
          name={openSection === "idioma" ? "keyboard-arrow-up" : "keyboard-arrow-right"} 
          size={24} 
          color="#004080" 
        />
      </TouchableOpacity>

      {openSection === "idioma" && (
        <View style={styles.subMenu}>
          <TouchableOpacity style={styles.subItem}>
            <Text style={styles.subText}>Español</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.subItem}>
            <Text style={styles.subText}>Inglés</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Privacidad */}
      <TouchableOpacity style={styles.option} onPress={() => toggleSection("privacidad")}>
        <View style={styles.row}>
          <Feather name="lock" size={22} color="#004080" />
          <Text style={styles.optionText}>Privacidad</Text>
        </View>
        <MaterialIcons 
          name={openSection === "privacidad" ? "keyboard-arrow-up" : "keyboard-arrow-right"} 
          size={24} 
          color="#004080" 
        />
      </TouchableOpacity>

      {openSection === "privacidad" && (
        <View style={styles.subMenu}>
          <TouchableOpacity style={styles.subItem}>
            <Text style={styles.subText}>Cambiar contraseña</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.subItem}>
            <Text style={styles.subText}>Eliminar cuenta</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Cerrar Sesión */}
      <TouchableOpacity style={[styles.option, styles.logoutButton]}>
        <View style={styles.row}>
          <MaterialIcons name="logout" size={22} color="#fff" />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}


// ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F0FA',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#004080',
    marginBottom: 25,
    textAlign: 'center',
  },
  option: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#80BFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  optionText: {
    fontSize: 17,
    color: '#004080',
  },
  subMenu: {
    backgroundColor: "#fff",
    paddingLeft: 25,
    marginTop: -10,
    marginBottom: 15,
    borderLeftWidth: 3,
    borderLeftColor: "#007BFF",
    borderRadius: 10,
    paddingVertical: 10
  },
  subItem: {
    paddingVertical: 8,
  },
  subText: {
    fontSize: 15,
    color: "#004080",
  },
  logoutButton: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
    marginTop: 30,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 5,
  },
});

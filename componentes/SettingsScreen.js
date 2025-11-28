import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Switch } from 'react-native';
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';

export default function SettingsScreen() {
  const { theme, isDark, toggleTheme } = useTheme();

  const handlePress = (option) => {
    Alert.alert('Opción seleccionada', `Has tocado: ${option}`);
  };
 
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>

      <Text style={[styles.title, { color: theme.text }]}>Ajustes</Text>

      {/* Modo Oscuro
      <View style={[styles.option, { backgroundColor: theme.itemBg, borderColor: theme.cardBorder }]}>
        <View style={styles.row}>
          <Ionicons name={isDark ? "moon" : "sunny"} size={22} color={theme.primary} />
          <Text style={[styles.optionText, { color: theme.text }]}>Modo Oscuro</Text>
        </View>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          trackColor={{ false: '#767577', true: theme.primary }}
          thumbColor={isDark ? '#fff' : '#f4f3f4'}
        />
      </View> */}

      {/* Opciones */}
      <TouchableOpacity style={[styles.option, { backgroundColor: theme.itemBg, borderColor: theme.cardBorder }]} onPress={() => handlePress("Editar Perfil")}>
        <View style={styles.row}>
          <Feather name="user" size={22} color={theme.primary} />
          <Text style={[styles.optionText, { color: theme.text }]}>Editar Perfil</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={24} color={theme.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.option, { backgroundColor: theme.itemBg, borderColor: theme.cardBorder }]} onPress={() => handlePress("Notificaciones")}>
        <View style={styles.row}>
          <Ionicons name="notifications-outline" size={22} color={theme.primary} />
          <Text style={[styles.optionText, { color: theme.text }]}>Notificaciones</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={24} color={theme.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.option, { backgroundColor: theme.itemBg, borderColor: theme.cardBorder }]} onPress={() => handlePress("Idioma")}>
        <View style={styles.row}>
          <Ionicons name="language-outline" size={22} color={theme.primary} />
          <Text style={[styles.optionText, { color: theme.text }]}>Idioma</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={24} color={theme.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.option, { backgroundColor: theme.itemBg, borderColor: theme.cardBorder }]} onPress={() => handlePress("Privacidad")}>
        <View style={styles.row}>
          <Feather name="lock" size={22} color={theme.primary} />
          <Text style={[styles.optionText, { color: theme.text }]}>Privacidad</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={24} color={theme.primary} />
      </TouchableOpacity>

      {/* Botón Cerrar Sesión */}
      <TouchableOpacity style={[styles.option, styles.logoutButton, { backgroundColor: theme.button, borderColor: theme.button }]} onPress={() => handlePress("Cerrar Sesión")}>
        <View style={styles.row}>
          <MaterialIcons name="logout" size={22} color={theme.buttonText} />
          <Text style={[styles.logoutText, { color: theme.buttonText }]}>Cerrar Sesión</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },
  option: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
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
  },
  logoutButton: {
    marginTop: 30,
  },
  logoutText: {
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 5,
  },
});
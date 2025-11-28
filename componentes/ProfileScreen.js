import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from './UserContext';

export default function ProfileScreen({ isDarkMode, setIsDarkMode }) {
  const { user, updateUser, logout } = useUser();
  const primaryBlue = '#007bff';
  const lightBackground = '#e9f2ff';
  const cardBackground = '#ffffff';

  const pickImage = async () => {
    try {
      const ImagePicker = await import('expo-image-picker');
      
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert('Permiso denegado', 'Necesitas dar permiso para acceder a la galería');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled && result.assets[0]) {
        updateUser({ foto: result.assets[0].uri });
      }
    } catch (error) {
      console.log('ImagePicker no disponible:', error);
      Alert.alert('Info', 'La función de cambiar foto no está disponible en este momento');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Cerrar sesión', 
          style: 'destructive',
          onPress: () => logout()
        }
      ]
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#0d1117' : lightBackground },
      ]}
    >
      <View
        style={[
          styles.header,
          {
            backgroundColor: isDarkMode ? '#1f1f1f' : cardBackground,
            borderBottomColor: primaryBlue,
          },
        ]}
      >
        <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
          <Image
            source={
              user.foto 
                ? { uri: user.foto }
                : require('../assets/icon.png')
            }
            style={[
              styles.avatar,
              { borderColor: isDarkMode ? '#03DAC6' : primaryBlue },
            ]}
          />
          <View style={styles.cameraIcon}>
            <Ionicons name="camera" size={20} color="#fff" />
          </View>
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Text
            style={[styles.name, { color: isDarkMode ? '#fff' : '#003366' }]}
          >
            {user.nombre || 'Usuario'}
          </Text>
          <Text
            style={[styles.email, { color: isDarkMode ? '#bbb' : '#555' }]}
          >
            {user.correo || 'email@ejemplo.com'}
          </Text>
        </View>
      </View>

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
          onValueChange={(value) => setIsDarkMode && setIsDarkMode(value)}
          thumbColor={isDarkMode ? '#03DAC6' : '#007bff'}
          trackColor={{ false: '#b0c4de', true: '#64b5f6' }}
        />
      </View>

      <View style={styles.menu}>
        {['Mi cuenta', 'Mis compras', 'Configuración'].map(
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
        <TouchableOpacity
          onPress={handleLogout}
          style={[
            styles.menuItem,
            {
              backgroundColor: isDarkMode ? '#1e1e1e' : cardBackground,
              borderLeftColor: '#dc3545',
            },
          ]}
        >
          <Text
            style={[
              styles.menuText,
              { color: isDarkMode ? '#ff6b6b' : '#dc3545' },
            ]}
          >
            Cerrar sesión
          </Text>
        </TouchableOpacity>
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
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    backgroundColor: '#dce8ff',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007bff',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
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
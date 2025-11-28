import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from './UserContext';
import { useTheme } from './ThemeContext';

export default function ProfileScreen() {
  const { user, updateUser, logout } = useUser();
  const { theme } = useTheme();

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
        { backgroundColor: theme.background },
      ]}
    >
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.itemBg,
            borderBottomColor: theme.primary,
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
              { borderColor: theme.primary },
            ]}
          />
          <View style={[styles.cameraIcon, { backgroundColor: theme.button }]}>
            <Ionicons name="camera" size={20} color={theme.buttonText} />
          </View>
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Text
            style={[styles.name, { color: theme.text }]}
          >
            {user.nombre || 'Usuario'}
          </Text>
          <Text
            style={[styles.email, { color: theme.textSecondary }]}
          >
            {user.correo || 'email@ejemplo.com'}
          </Text>
        </View>
      </View>

      <View style={styles.menu}>
        {['Mi cuenta', 'Mis compras', 'Configuración'].map(
          (item, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.menuItem,
                {
                  backgroundColor: theme.itemBg,
                  borderLeftColor: theme.primary,
                },
              ]}
            >
              <Text
                style={[
                  styles.menuText,
                  { color: theme.text },
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
              backgroundColor: theme.itemBg,
              borderLeftColor: theme.danger,
            },
          ]}
        >
          <Text
            style={[
              styles.menuText,
              { color: theme.danger },
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
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
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
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from './UserContext';
import { useTheme } from './ThemeContext';

export default function EditAccountScreen({ navigation }) {
  const { user, updateUser } = useUser();
  const { theme } = useTheme();
  const [nombre, setNombre] = useState(user.nombre || '');
  const [isSaving, setIsSaving] = useState(false);

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
        Alert.alert('Éxito', 'Foto de perfil actualizada');
      }
    } catch (error) {
      console.log('ImagePicker no disponible:', error);
      Alert.alert('Error', 'No se pudo cambiar la foto en este momento');
    }
  };

  const handleSave = () => {
    if (!nombre.trim()) {
      Alert.alert('Error', 'El nombre no puede estar vacío');
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      updateUser({ nombre });
      setIsSaving(false);
      Alert.alert('Éxito', 'Cambios guardados correctamente');
      navigation.goBack();
    }, 500);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={[styles.header, { backgroundColor: theme.itemBg }]}>
        <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
          <Image
            source={
              user.foto 
                ? { uri: user.foto }
                : require('../assets/icon.png')
            }
            style={[styles.avatar, { borderColor: theme.primary }]}
          />
          <View style={[styles.cameraIcon, { backgroundColor: theme.button }]}>
            <Ionicons name="camera" size={20} color={theme.buttonText} />
          </View>
        </TouchableOpacity>
        <Text style={[styles.cameraText, { color: theme.textSecondary }]}>
          Toca para cambiar foto
        </Text>
      </View>

      <View style={styles.form}>
        <View>
          <Text style={[styles.label, { color: theme.text }]}>Nombre de usuario</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.itemBg,
                color: theme.text,
                borderColor: theme.primary,
              },
            ]}
            placeholder="Ingresa tu nombre"
            placeholderTextColor={theme.textSecondary}
            value={nombre}
            onChangeText={setNombre}
          />
        </View>

        <View>
          <Text style={[styles.label, { color: theme.text }]}>Correo electrónico</Text>
          <View
            style={[
              styles.input,
              styles.inputDisabled,
              {
                backgroundColor: theme.itemBg,
                borderColor: theme.primary,
              },
            ]}
          >
            <Text style={[styles.disabledText, { color: theme.textSecondary }]}>
              {user.correo || 'email@ejemplo.com'}
            </Text>
          </View>
          <Text style={[styles.helperText, { color: theme.textSecondary }]}>
            No puedes cambiar tu correo
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: theme.button }]}
        onPress={handleSave}
        disabled={isSaving}
      >
        <Ionicons name="save" size={20} color={theme.buttonText} />
        <Text style={[styles.saveButtonText, { color: theme.buttonText }]}>
          {isSaving ? 'Guardando...' : 'Guardar cambios'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 15,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraText: {
    fontSize: 14,
    fontWeight: '500',
  },
  form: {
    paddingHorizontal: 20,
    marginTop: 30,
    gap: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  inputDisabled: {
    justifyContent: 'center',
  },
  disabledText: {
    fontSize: 16,
  },
  helperText: {
    fontSize: 12,
    marginTop: 6,
    fontStyle: 'italic',
  },
  saveButton: {
    marginHorizontal: 20,
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    gap: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

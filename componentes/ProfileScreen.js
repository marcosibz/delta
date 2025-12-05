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
  UIManager,
  Alert,
  TextInput,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useUser } from './UserContext';
import { useCart } from './CartContext';
import { useLanguage } from './LanguageContext';
import * as ImagePicker from 'expo-image-picker';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ProfileScreen({ isDarkMode, setIsDarkMode }) {

  const navigation = useNavigation();
  const { user, updateUser, logout } = useUser();
  const { purchaseHistory } = useCart();
  const { t } = useLanguage();
  const [openSection, setOpenSection] = useState(null);
  const [historialCompras, setHistorialCompras] = useState([]);
  const [showHistorialModal, setShowHistorialModal] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [newName, setNewName] = useState(user.nombre || '');
  const [newEmail, setNewEmail] = useState(user.correo || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleSection = async (section) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenSection(openSection === section ? null : section);
    
    // Cargar historial cuando se abre la sección de compras
    if (section === "compras" && openSection !== "compras" && user.id) {
      await loadPurchaseHistory();
    }
  };

  const loadPurchaseHistory = async () => {
    try {
      const response = await fetch(`http://192.168.100.7:3000/compras/${user.id}`);
      const data = await response.json();
      
      if (data.ok) {
        setHistorialCompras(data.compras);
      }
    } catch (error) {
      console.error('Error cargando historial:', error);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a tus fotos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      await updateUser({ foto: result.assets[0].uri });
    }
  };

  const handleSaveName = async () => {
    if (!newName.trim()) {
      Alert.alert('Error', 'El nombre no puede estar vacío');
      return;
    }
    
    try {
      // Actualizar en el backend
      const response = await fetch(`http://192.168.100.7:3000/usuarios/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: newName }),
      });
      
      const data = await response.json();
      
      if (data.ok) {
        await updateUser({ nombre: newName });
        setEditingName(false);
        Alert.alert('Éxito', 'Nombre actualizado correctamente');
      } else {
        Alert.alert('Error', data.message || 'No se pudo actualizar el nombre');
      }
    } catch (error) {
      console.error('Error actualizando nombre:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  const handleSaveEmail = async () => {
    if (!newEmail.trim() || !newEmail.includes('@')) {
      Alert.alert('Error', 'Por favor ingresa un correo válido');
      return;
    }
    
    try {
      // Actualizar en el backend
      const response = await fetch(`http://192.168.100.7:3000/usuarios/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: newEmail }),
      });
      
      const data = await response.json();
      
      if (data.ok) {
        await updateUser({ correo: newEmail });
        setEditingEmail(false);
        Alert.alert('Éxito', 'Correo actualizado correctamente');
      } else {
        Alert.alert('Error', data.message || 'No se pudo actualizar el correo');
      }
    } catch (error) {
      console.error('Error actualizando correo:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }
    // Aquí iría la lógica para cambiar la contraseña en el backend
    Alert.alert('Éxito', 'Contraseña cambiada correctamente');
    setEditingPassword(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      '⚠️ Eliminar cuenta',
      '¿Estás seguro? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            // Aquí iría la lógica para eliminar cuenta del backend
            logout();
            Alert.alert('Cuenta eliminada', 'Tu cuenta ha sido eliminada');
          },
        },
      ]
    );
  };

  const handleLogout = async () => {
    console.log('👆 BOTÓN CERRAR SESIÓN PRESIONADO');
    try {
      console.log('🔴 EJECUTANDO LOGOUT');
      await logout();
      console.log('✅ LOGOUT EJECUTADO');
    } catch (error) {
      console.error('❌ ERROR EN LOGOUT:', error);
    }
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
        <TouchableOpacity onPress={pickImage}>
          {user.foto ? (
            <Image
              source={{ uri: user.foto }}
              style={[
                styles.avatar,
                { borderColor: isDarkMode ? '#03DAC6' : primaryBlue },
              ]}
            />
          ) : (
            <View
              style={[
                styles.avatar,
                styles.avatarPlaceholder,
                { borderColor: isDarkMode ? '#03DAC6' : primaryBlue },
              ]}
            >
              <Text style={styles.avatarText}>+</Text>
            </View>
          )}
        </TouchableOpacity>
        <View>
          <Text style={[styles.name, { color: isDarkMode ? '#fff' : '#003366' }]}>
            {user.nombre || 'Usuario'}
          </Text>
          <Text style={[styles.email, { color: isDarkMode ? '#bbb' : '#555' }]}>
            {user.correo || 'correo@ejemplo.com'}
          </Text>
          {user.esAdmin && (
            <Text style={[styles.adminBadge, { color: '#ff4757' }]}>
              ⭐ Administrador
            </Text>
          )}
        </View>
      </View>

      {/* Panel de Admin */}
      {user.esAdmin && (
        <TouchableOpacity
          style={[styles.adminPanel, { backgroundColor: isDarkMode ? '#1e1e1e' : '#007bff' }]}
          onPress={() => navigation.navigate('Admin')}
        >
          <Ionicons name="shield-checkmark" size={24} color="#fff" />
          <Text style={styles.adminPanelText}>Panel de Administración</Text>
        </TouchableOpacity>
      )}

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
          style={[styles.menuItem, { backgroundColor: isDarkMode ? '#1e1e1e' : '#fff' }]}
          onPress={() => toggleSection("cuenta")}
        >
          <Text style={[
            styles.menuText,
            { color: isDarkMode ? '#fff' : '#003366' }
          ]}>
            {t('account')}
          </Text>
        </TouchableOpacity>

        {openSection === "cuenta" && (
          <View style={[styles.subMenu, { backgroundColor: isDarkMode ? '#1e1e1e' : '#fff' }]}>
            {!user.esAdmin && (
              <>
                <TouchableOpacity 
                  style={styles.subItem}
                  onPress={() => setEditingName(true)}
                >
                  <Text style={[styles.subText, { color: isDarkMode ? '#ccc' : '#003366' }]}>
                    {t('changeUser')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.subItem}
                  onPress={() => setEditingEmail(true)}
                >
                  <Text style={[styles.subText, { color: isDarkMode ? '#ccc' : '#003366' }]}>
                    {t('editEmail')}
                  </Text>
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity style={styles.subItem} onPress={pickImage}>
              <Text style={[styles.subText, { color: isDarkMode ? '#ccc' : '#003366' }]}>
                {t('changePhoto')}
              </Text>
            </TouchableOpacity>

            {!user.esAdmin && (
              <>
                <TouchableOpacity 
                  style={styles.subItem}
                  onPress={() => setEditingPassword(true)}
                >
                  <Text style={[styles.subText, { color: isDarkMode ? '#ccc' : '#003366' }]}>
                    {t('changePassword')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.subItem}
                  onPress={handleDeleteAccount}
                >
                  <Text style={[styles.subText, { color: '#ff4757' }]}>
                    {t('deleteAccount')}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}

        {/* MIS COMPRAS */}
        <TouchableOpacity
          style={[styles.menuItem, { backgroundColor: isDarkMode ? '#1e1e1e' : '#fff' }]}
          onPress={() => toggleSection("compras")}
        >
          <Text style={[
            styles.menuText,
            { color: isDarkMode ? '#fff' : '#003366' }
          ]}>
            {t('purchases')}
          </Text>
        </TouchableOpacity>

        {openSection === "compras" && (
          <View style={[styles.subMenu, { backgroundColor: isDarkMode ? '#1e1e1e' : '#fff' }]}>
            <TouchableOpacity
              style={styles.subItem}
              onPress={() => navigation.navigate("Carrito")}
            >
              <Text style={[styles.subText, { color: isDarkMode ? '#ccc' : '#003366' }]}>
                {t('viewCart')}
              </Text>
            </TouchableOpacity>

            {historialCompras.length > 0 && (
              <TouchableOpacity 
                style={styles.subItem}
                onPress={() => setShowHistorialModal(true)}
              >
                <Text style={[styles.subText, { color: isDarkMode ? '#ccc' : '#003366' }]}>
                  {t('purchaseHistory')} ({historialCompras.length})
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* CERRAR SESIÓN */}
        <TouchableOpacity
          style={[styles.menuItem, { borderLeftColor: "red", backgroundColor: isDarkMode ? '#1e1e1e' : '#fff' }]}
          onPress={() => {
            console.log('🔴 BOTÓN TOCADO DIRECTAMENTE');
            handleLogout();
          }}
        >
          <Text style={[styles.menuText, { color: "red" }]}>
            {t('closeSession')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal para Editar Nombre */}
      <Modal 
        visible={editingName} 
        transparent 
        animationType="fade"
        onRequestClose={() => {
          setEditingName(false);
          setNewName(user.nombre || '');
        }}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => {
            setEditingName(false);
            setNewName(user.nombre || '');
          }}
        >
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
          <View style={[styles.modalContent, { backgroundColor: isDarkMode ? '#1f1f1f' : '#fff' }]}>
            <Text style={[styles.modalTitle, { color: isDarkMode ? '#fff' : '#003366' }]}>
              Cambiar Nombre
            </Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: isDarkMode ? '#2a2a2a' : '#f0f0f0',
                color: isDarkMode ? '#fff' : '#000'
              }]}
              value={newName}
              onChangeText={setNewName}
              placeholder="Nuevo nombre"
              placeholderTextColor={isDarkMode ? '#888' : '#999'}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setEditingName(false);
                  setNewName(user.nombre || '');
                }}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSaveName}
              >
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Modal para Editar Email */}
      <Modal 
        visible={editingEmail} 
        transparent 
        animationType="fade"
        onRequestClose={() => {
          setEditingEmail(false);
          setNewEmail(user.correo || '');
        }}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => {
            setEditingEmail(false);
            setNewEmail(user.correo || '');
          }}
        >
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
          <View style={[styles.modalContent, { backgroundColor: isDarkMode ? '#1f1f1f' : '#fff' }]}>
            <Text style={[styles.modalTitle, { color: isDarkMode ? '#fff' : '#003366' }]}>
              Editar Correo
            </Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: isDarkMode ? '#2a2a2a' : '#f0f0f0',
                color: isDarkMode ? '#fff' : '#000'
              }]}
              value={newEmail}
              onChangeText={setNewEmail}
              placeholder="Nuevo correo"
              placeholderTextColor={isDarkMode ? '#888' : '#999'}
              keyboardType="email-address"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setEditingEmail(false);
                  setNewEmail(user.correo || '');
                }}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSaveEmail}
              >
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Modal para Cambiar Contraseña */}
      <Modal 
        visible={editingPassword} 
        transparent 
        animationType="fade"
        onRequestClose={() => {
          setEditingPassword(false);
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
        }}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => {
            setEditingPassword(false);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
          }}
        >
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
          <View style={[styles.modalContent, { backgroundColor: isDarkMode ? '#1f1f1f' : '#fff' }]}>
            <Text style={[styles.modalTitle, { color: isDarkMode ? '#fff' : '#003366' }]}>
              Cambiar Contraseña
            </Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: isDarkMode ? '#2a2a2a' : '#f0f0f0',
                color: isDarkMode ? '#fff' : '#000'
              }]}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Contraseña actual"
              placeholderTextColor={isDarkMode ? '#888' : '#999'}
              secureTextEntry
            />
            <TextInput
              style={[styles.input, { 
                backgroundColor: isDarkMode ? '#2a2a2a' : '#f0f0f0',
                color: isDarkMode ? '#fff' : '#000'
              }]}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Nueva contraseña"
              placeholderTextColor={isDarkMode ? '#888' : '#999'}
              secureTextEntry
            />
            <TextInput
              style={[styles.input, { 
                backgroundColor: isDarkMode ? '#2a2a2a' : '#f0f0f0',
                color: isDarkMode ? '#fff' : '#000'
              }]}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirmar contraseña"
              placeholderTextColor={isDarkMode ? '#888' : '#999'}
              secureTextEntry
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setEditingPassword(false);
                  setCurrentPassword('');
                  setNewPassword('');
                  setConfirmPassword('');
                }}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleChangePassword}
              >
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Modal para Historial de Compras */}
      <Modal 
        visible={showHistorialModal} 
        transparent 
        animationType="slide"
        onRequestClose={() => setShowHistorialModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowHistorialModal(false)}
        >
          <TouchableOpacity 
            style={[styles.modalContent, { 
              backgroundColor: isDarkMode ? '#1f1f1f' : '#fff',
              maxHeight: '80%'
            }]}
            activeOpacity={1}
          >
            <Text style={[styles.modalTitle, { color: isDarkMode ? '#fff' : '#003366' }]}>
              📦 Historial de Compras
            </Text>
            
            {historialCompras.length > 0 ? (
              <View>
                {historialCompras.map((compra, index) => (
                  <View 
                    key={compra.id || index}
                    style={{
                      backgroundColor: isDarkMode ? '#2a2a2a' : '#f5f5f5',
                      padding: 15,
                      borderRadius: 10,
                      marginBottom: 12,
                      borderLeftWidth: 4,
                      borderLeftColor: '#007bff'
                    }}
                  >
                    <Text style={{ 
                      fontSize: 16, 
                      fontWeight: 'bold',
                      color: isDarkMode ? '#fff' : '#003366',
                      marginBottom: 5
                    }}>
                      Compra #{compra.id}
                    </Text>
                    <Text style={{ 
                      fontSize: 14, 
                      color: isDarkMode ? '#ccc' : '#666',
                      marginBottom: 3
                    }}>
                      📅 {new Date(compra.fecha_compra).toLocaleDateString('es-AR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </Text>
                    <Text style={{ 
                      fontSize: 18, 
                      fontWeight: 'bold',
                      color: '#28a745',
                      marginTop: 5
                    }}>
                      💰 Total: ${parseFloat(compra.total).toFixed(2)}
                    </Text>
                    {compra.items && (
                      <Text style={{ 
                        fontSize: 13, 
                        color: isDarkMode ? '#aaa' : '#888',
                        marginTop: 5
                      }}>
                        {compra.items}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            ) : (
              <Text style={{ 
                textAlign: 'center', 
                color: isDarkMode ? '#ccc' : '#666',
                fontSize: 16 
              }}>
                No hay compras registradas
              </Text>
            )}

            <TouchableOpacity
              style={[styles.modalButton, { 
                backgroundColor: '#007bff', 
                marginTop: 20,
                width: '100%'
              }]}
              onPress={() => setShowHistorialModal(false)}
            >
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
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
  avatarPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b0d0ff',
  },
  avatarText: {
    fontSize: 32,
    color: '#003366',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 15,
    marginTop: 4,
  },
  adminBadge: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 4,
  },
  adminPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 15,
    marginHorizontal: 18,
    marginTop: 10,
    borderRadius: 12,
    elevation: 5,
  },
  adminPanelText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#999',
  },
  saveButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

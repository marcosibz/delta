import React, { useState, useEffect } from 'react';
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
import { useLanguage } from './LanguageContext';
import { useUser } from './UserContext';
import * as Notifications from 'expo-notifications';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function SettingsScreen({ isDarkMode = false }) {
  const { language, changeLanguage, t } = useLanguage();
  const { logout } = useUser();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Estados de acordeones
  const [openSection, setOpenSection] = useState(null);

  useEffect(() => {
    checkNotificationPermissions();
  }, []);

  const checkNotificationPermissions = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setNotificationsEnabled(status === 'granted');
  };

  const toggleNotifications = async () => {
    if (notificationsEnabled) {
      // No se pueden desactivar programáticamente, solo informar al usuario
      setNotificationsEnabled(false);
    } else {
      const { status } = await Notifications.requestPermissionsAsync();
      setNotificationsEnabled(status === 'granted');
    }
  };

  const toggleSection = (section) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#0d1117' : '#E6F0FA' }]}>
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#004080' }]}>{t('settings')}</Text>

      {/* Notificaciones */}
      <TouchableOpacity style={[styles.option, { backgroundColor: isDarkMode ? '#1f1f1f' : '#FFFFFF', borderColor: isDarkMode ? '#2a2a2a' : '#80BFFF' }]} onPress={() => toggleSection("notificaciones")}>
        <View style={styles.row}>
          <Ionicons name="notifications-outline" size={22} color={isDarkMode ? '#03DAC6' : '#004080'} />
          <Text style={[styles.optionText, { color: isDarkMode ? '#fff' : '#004080' }]}>{t('notifications')}</Text>
        </View>
        <MaterialIcons 
          name={openSection === "notificaciones" ? "keyboard-arrow-up" : "keyboard-arrow-right"} 
          size={24} 
          color={isDarkMode ? '#03DAC6' : '#004080'} 
        />
      </TouchableOpacity>

      {openSection === "notificaciones" && (
        <View style={[styles.subMenu, { backgroundColor: isDarkMode ? '#1f1f1f' : '#fff', borderLeftColor: isDarkMode ? '#03DAC6' : '#007BFF' }]}>
          <TouchableOpacity 
            style={styles.subItem}
            onPress={toggleNotifications}
          >
            <Text style={[styles.subText, { color: isDarkMode ? '#fff' : '#004080' }]}>
              {notificationsEnabled ? (language === 'es' ? 'No permitir' : 'Disable') : (language === 'es' ? 'Permitir' : 'Allow')}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Idioma */}
      <TouchableOpacity style={[styles.option, { backgroundColor: isDarkMode ? '#1f1f1f' : '#FFFFFF', borderColor: isDarkMode ? '#2a2a2a' : '#80BFFF' }]} onPress={() => toggleSection("idioma")}>
        <View style={styles.row}>
          <Ionicons name="language-outline" size={22} color={isDarkMode ? '#03DAC6' : '#004080'} />
          <Text style={[styles.optionText, { color: isDarkMode ? '#fff' : '#004080' }]}>{t('language')}</Text>
        </View>
        <MaterialIcons 
          name={openSection === "idioma" ? "keyboard-arrow-up" : "keyboard-arrow-right"} 
          size={24} 
          color={isDarkMode ? '#03DAC6' : '#004080'} 
        />
      </TouchableOpacity>

      {openSection === "idioma" && (
        <View style={[styles.subMenu, { backgroundColor: isDarkMode ? '#1f1f1f' : '#fff', borderLeftColor: isDarkMode ? '#03DAC6' : '#007BFF' }]}>
          <TouchableOpacity 
            style={[styles.subItem, language === 'es' && { backgroundColor: isDarkMode ? '#2a2a2a' : '#e3f2fd' }]}
            onPress={() => changeLanguage('es')}
          >
            <Text style={[styles.subText, { 
              color: isDarkMode ? '#fff' : '#004080',
              fontWeight: language === 'es' ? 'bold' : 'normal'
            }]}>
              {t('spanish')} {language === 'es' && '✓'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.subItem, language === 'en' && { backgroundColor: isDarkMode ? '#2a2a2a' : '#e3f2fd' }]}
            onPress={() => changeLanguage('en')}
          >
            <Text style={[styles.subText, { 
              color: isDarkMode ? '#fff' : '#004080',
              fontWeight: language === 'en' ? 'bold' : 'normal'
            }]}>
              {t('english')} {language === 'en' && '✓'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Cerrar Sesión */}
      <TouchableOpacity 
        style={[styles.option, styles.logoutButton]}
        onPress={logout}
      >
        <View style={styles.row}>
          <MaterialIcons name="logout" size={22} color="#fff" />
          <Text style={styles.logoutText}>{language === 'es' ? 'Cerrar Sesión' : 'Logout'}</Text>
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

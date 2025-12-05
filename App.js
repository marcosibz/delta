import React, { useState } from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import RegistroScreen from './componentes/RegistroScreen';
import LoginScreen from './componentes/LoginScreen';
import HomeScreen from './componentes/HomeScreen';
import ProfileScreen from './componentes/ProfileScreen';
import SettingsScreen from './componentes/SettingsScreen';
import CartScreen from './componentes/CartScreen';
import AdminScreen from './componentes/AdminScreen';

import { CartProvider } from './componentes/CartContext';
import { UserProvider, useUser } from './componentes/UserContext';
import { FavoritesProvider } from './componentes/FavoritesContext';
import { LanguageProvider, useLanguage } from './componentes/LanguageContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registro" component={RegistroScreen} />
    </Stack.Navigator>
  );
}

function MainTabs({ isDarkMode, setIsDarkMode }) {
  const { user } = useUser();
  const { t } = useLanguage();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#1f1f1f' : '#ffffff',
          borderTopColor: isDarkMode ? '#2a2a2a' : '#e0e0e0',
          paddingBottom: 4,
          height: 60,
        },
        tabBarActiveTintColor: isDarkMode ? '#03DAC6' : '#007AFF',
        tabBarInactiveTintColor: '#888',
      }}
    >
      <Tab.Screen
        name="Inicio"
        options={{
          tabBarLabel: t('home'),
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      >
        {() => <HomeScreen isDarkMode={isDarkMode} />}
      </Tab.Screen>
      <Tab.Screen
        name="Carrito"
        options={{
          tabBarLabel: t('cart'),
          tabBarIcon: ({ color, size }) => <Ionicons name="cart-outline" size={size} color={color} />,
        }}
      >
        {() => <CartScreen isDarkMode={isDarkMode} />}
      </Tab.Screen>
      <Tab.Screen
        name="Mi Perfil"
        options={{
          tabBarLabel: t('profile'),
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
        }}
      >
        {() => <ProfileScreen isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}
      </Tab.Screen>
      <Tab.Screen
        name="Ajustes"
        options={{
          tabBarLabel: t('settings'),
          tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
        }}
      >
        {() => <SettingsScreen isDarkMode={isDarkMode} />}
      </Tab.Screen>
      {user.esAdmin && (
        <Tab.Screen
          name="Admin"
          options={{
            tabBarIcon: ({ color, size }) => <Ionicons name="shield-checkmark" size={size} color={color} />,
            tabBarLabel: 'Admin',
          }}
        >
          {() => <AdminScreen isDarkMode={isDarkMode} />}
        </Tab.Screen>
      )}
    </Tab.Navigator>
  );
}

function AppContent() {
  const scheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(scheme === 'dark');
  const { isAuthenticated, isLoading } = useUser();

  if (isLoading) {
    return null; // O un splash screen
  }

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      {isAuthenticated ? (
        <MainTabs isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <UserProvider>
        <FavoritesProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </FavoritesProvider>
      </UserProvider>
    </LanguageProvider>
  );
}
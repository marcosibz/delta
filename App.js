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

import { CartProvider } from './componentes/CartContext';
import { UserProvider, useUser } from './componentes/UserContext';

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
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Carrito"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="cart-outline" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Mi Perfil"
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
        }}
      >
        {() => <ProfileScreen isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}
      </Tab.Screen>
      <Tab.Screen
        name="Ajustes"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

function AppContent() {
  const scheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(scheme === 'dark');
  const { isAuthenticated } = useUser();

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
    <UserProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </UserProvider>
  );
}
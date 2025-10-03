import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './componentes/HomeScreen';
import CartScreen from './componentes/CartScreen';
import SettingsScreen from './componentes/SettingsScreen';
import ProfileScreen from './componentes/ProfileScreen';
import LoginScreen from './componentes/LoginScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  // Estado global para el modo oscuro
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: isDarkMode ? '#1f1f1f' : '#ffffff',
            borderTopColor: isDarkMode ? '#2a2a2a' : '#e0e0e0',
            paddingBottom: 4,
            height: 60,
          },
          tabBarActiveTintColor: isDarkMode ? '#03DAC6' : '#007AFF',
          tabBarInactiveTintColor: '#888',
          tabBarIcon: ({ color, size }) => {
            let iconName;
            switch (route.name) {
              case 'Inicio':
                iconName = 'home-outline';
                break;
              case 'Mi Perfil':
                iconName = 'person-outline';
                break;
              case 'Carrito':
                iconName = 'cart-outline';
                break;
              case 'Ajustes':
                iconName = 'settings-outline';
                break;
              case 'Login':
                iconName = 'log-in-outline';
                break;
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Inicio" component={HomeScreen} />
        <Tab.Screen name="Mi Perfil">
          {() => <ProfileScreen isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}
        </Tab.Screen>
        <Tab.Screen name="Carrito" component={CartScreen} />
        <Tab.Screen name="Ajustes" component={SettingsScreen} />
        <Tab.Screen name="Login">
          {() => <LoginScreen isDarkMode={isDarkMode} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

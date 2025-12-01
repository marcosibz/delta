import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './componentes/HomeScreen';
import ProfileScreen from './componentes/ProfileScreen';
import CartScreen from './componentes/CartScreen';
import SettingsScreen from './componentes/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="MiPerfil" component={ProfileScreen} />
      <Tab.Screen name="Carrito" component={CartScreen} />
      <Tab.Screen name="Ajustes" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './componentes/HomeScreen';
import CartScreen from './componentes/CartScreen';
import SettingsScreen from './componentes/SettingsScreen';
import ProfileScreen from './componentes/ProfileScreen';
import DolarScreen from './componentes/DolarScreen';
import RegistroScreen from './componentes/RegistroScreen'; // importa tu pantalla de registro

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
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
            case 'Dolar':
              iconName = 'cash-outline';
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Mi Perfil" component={ProfileScreen} />
      <Tab.Screen name="Carrito" component={CartScreen} />
      <Tab.Screen name="Ajustes" component={SettingsScreen} />
      <Tab.Screen name="Dolar" component={DolarScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [registrado, setRegistrado] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!registrado ? (
          <Stack.Screen name="Registro">
            {props => <RegistroScreen {...props} onRegistrado={() => setRegistrado(true)} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="MainTabs" component={MainTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
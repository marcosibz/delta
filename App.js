import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Pantallas principales
import RegistroScreen from './componentes/RegistroScreen';
import LoginScreen from './componentes/LoginScreen';
import MainTabs from './MainTabs';

// Contexto del carrito
import { CartProvider } from './componentes/CartContext';

// Pantallas de ajustes
import SettingsScreen from './componentes/SettingsScreen';
import EditarPerfil from './componentes/editarperfil';
import Notificaciones from './componentes/Notificaciones';
import Idioma from './componentes/Idioma';
import Privacidad from './componentes/privacidad';

const Stack = createStackNavigator();

export default function App() {
  const [registrado, setRegistrado] = useState(false);

  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Registro"
        >

          {/* 🔵 Si NO está registrado → Registro + Login */}
          {!registrado ? (
            <>
              <Stack.Screen name="Registro">
                {props => (
                  <RegistroScreen
                    {...props}
                    onRegistrado={() => setRegistrado(true)}
                  />
                )}
              </Stack.Screen>

              <Stack.Screen name="Login">
                {props => (
                  <LoginScreen
                    {...props}
                    onLogin={() => setRegistrado(true)}
                  />
                )}
              </Stack.Screen>
            </>
          ) : (

            /* 🔵 Usuario registrado → MainTabs */
            <>
              <Stack.Screen name="MainTabs" component={MainTabs} />

              {/* ⬇⬇⬇ Pantallas del Settings (IMPORTADAS ARRIBA) */}
              <Stack.Screen name="Settings" component={SettingsScreen} />
              <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
              <Stack.Screen name="Notificaciones" component={Notificaciones} />
              <Stack.Screen name="Idioma" component={Idioma} />
              <Stack.Screen name="Privacidad" component={Privacidad} />
            </>
          )}

        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

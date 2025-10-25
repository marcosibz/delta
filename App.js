import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegistroScreen from './componentes/RegistroScreen';
import LoginScreen from './componentes/LoginScreen';
import MainTabs from './MainTabs';
import { CartProvider } from './componentes/CartContext'; 

const Stack = createStackNavigator();

export default function App() {
  const [registrado, setRegistrado] = useState(false);

  return (
    <CartProvider>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Registro" // abrir siempre Registro al inicio (QR)
      >
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
          <Stack.Screen name="MainTabs" component={MainTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
    </CartProvider>
  );
}
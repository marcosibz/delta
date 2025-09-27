import React from 'react';
import { View, Text ,StyleSheet,Button,Alert,TouchableOpacity } from 'react-native';

export default function SettingsScreen() {

  const handlePress = (option) => {
    alert.alert('opcion seleccionada' , `tocaste : ${opcion}`)
  };


  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Ajustes</Text>

      <TouchableOpacity style={styles.option}
      onPress={() => handlePress ("editar perfil")}>
        <Text style={styles.optionText}>editar perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}
      onPress={() => handlePress ("notificaciones")}>
        <Text style={styles.optionText}>notificaciones</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}
      onPress={() => handlePress ("idioma")}>
        <Text style={styles.optionText}>idioma</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.option, {backgroundColor: '#fff'}]}
      onPress={() => handlePress("cerrar sesion")}>
        <Text style={[styles.optionText,{color:'white'}]}>cerrar sesion</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create ({
 container:{
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
 },
 titulo:{
   flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
     fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
 },
 option:{
  padding:15,
  borderRadius:10,
  marginBottom:15,
 },
 optionText:{
  fontSize:15,
 },
})

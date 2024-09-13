import React, { useState } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';

import appFirebase from '../firebase'; // configuración de Firebase 
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
const auth = getAuth(appFirebase);

export default function Login(props)   {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');

  const logueo = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, contraseña);
      const user = userCredential.user;

      // Obtener los custom claims del usuario 
      const customClaims = user.customClaims;
      if (customClaims && customClaims.role) {
        const { role } = customClaims;
        // Redirigir a la pantalla correspondiente según el rol
        if (role === 'admin') {
          props.navigation.navigate('AdminHome');
        } else {
          props.navigation.navigate('Home');
        }
      } else {
        // Si no hay custom claims o no tiene el campo 'role', manejar el caso por defecto
        console.warn('El usuario no tiene un rol asignado');
        //props.navigation.navigate('Home'); // O redirige a una pantalla de error
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
  };
  return (
    <View style={styles.fondo}>
      <View>
        <Image
          source={require('../assets/logo.png')}
          style={styles.Image}
        >
        </Image>
      </View>
      <View style={styles.formulario}>
        <View style={styles.cajaTexto}>
          < TextInput placeholder='correo@gmail.com' style={{ paddingHorizontal: 15, outline: 0 }} 
          onChangeText={(text)=>setEmail(text)}/>
      </View>

        <View style={styles.cajaTexto}>
          <TextInput placeholder='Contraseña' style={{ paddingHorizontal: 15,  outline: 0 }} 
          onChangeText={(text)=>setContraseña(text)} secureTextEntry={true} 
          />
        </View>
        <View style={styles.Boton}>
          <TouchableOpacity style={styles.cajaBoton} onPress={logueo}>
            <text style={styles.textoBoton}>
              Iniciar sesion
            </text>
          </TouchableOpacity>
        </View>
        {/* ... */}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#f0f8ff',
  },
  Image: {
    flex: 1,
    width:250,
    height:250,
    borderRadius: 350,
    borderColor: 'white',
  },
  formulario: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '45%',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cajaTexto: {
    flexDirection: 'column',
    marginBottom: 10,
    paddingVertical:20,
    backgroundColor:'#cccccc40',
    borderRadius:30,
    marginVertical:10
  },
  Boton: {
    alignItems: 'center'
  },
  cajaBoton: {
    backgroundColor: '#5f9ea0',
    borderRadius:30,
    paddingVertical:20,
    width:150,
    marginTop:20
  },
  textoBoton: {
    textAlign:'center',
    color:'white'
  },
});
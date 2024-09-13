import React, { useState } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';

import appFirebase from '../firebase'
import { getAuth, signInWithEmailAndPassword } from '../firebase'
const auth = getAuth(appFirebase)

export default function login(props) {

 //creamos la variable de estado
  const [email, setEmail] = useState()
  const [contraseña, setContraseña] = useState()

  const logueo = async()=>{
    try {
      await signInWithEmailAndPassword(auth, email, contraseña)
      //funcion de roles
      if (email === 'directivos@gmail.com'){
        props.navigation.navigate('directivos')
      }else{
        if (email === 'preceptores@gmail.com')
          props.navigation.navigate('preceptores')
      }
    } catch (error) {
      console.log(error);
      Alert.alert ('Error', 'Usuario o contraseña incorrectos')
    }
  }
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

/*Estilos*/
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
import React from 'react';
import { StyleSheet, View, ImageBackground, Image, TextInput, TouchableOpacity } from 'react-native';


export default function Login() {
  return (
    <View style={styles.fondo}>
      {/* Uncomment these if you want a background image */}
      {/* <view>
        <ImageBackground
          source={require('../assets/fondo.jpg')}
          style={styles.backgroundImage}
        >
        </ImageBackground>
      </view>*/}
      <View style={styles.formulario}>
        <View style={styles.cajaTexto}>
          <TextInput placeholder='correo@gmail.com' style={{ paddingHorizontal: 15 }} />
        </View>

        <View style={styles.cajaTexto}>
          <TextInput placeholder='Contraseña' style={{ paddingHorizontal: 15 }} secureTextEntry={true} />
        </View>
        {/*<view style={styles.Boton}>
        <TouchableOpacity style={styles.cajaBoton}>
          <Text style={styles.textoBoton}>Iniciar sesión</Text>
        </TouchableOpacity>
        </view>*/}

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
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
  },
  formulario: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '50%',
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
    backgroundColor: '#525FE1',
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
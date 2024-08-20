import React from 'react';
import { Text, StyleSheet, View, ImageBackground, Image, TextInput, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function Login() {
  return (
    <View style={styles.fondo}>
       {/* <view>
        <ImageBackground
            source={require('../assets/fondo.jpg')} style={styles.backgroundImage}>
        </ImageBackground>
      </view>*/}
      <view style={styles.formulario}>
        <view style={styles.cajaTexto}>
            <TextInput placeholder='correo@gmail.com' style={{paddingHorizontal:15}}/>
        </view>

        <view style={styles.cajaTexto}>
        <TextInput placeholder='Contraseña' style={{paddingHorizontal:15}}/>
        </view>

        <view>
            <TouchableOpacity>
                <text>Iniciar sesion</text>
            </TouchableOpacity>
        </view>
      </view>
    </View>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
  },
});
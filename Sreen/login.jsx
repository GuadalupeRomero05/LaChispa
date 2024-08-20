import React from 'react';
import { StyleSheet, View, ImageBackground, Image } from 'react-native';

export default function Login() {
  return (
    <View style={styles.fondo}>
       {/* <view>
        <ImageBackground
            source={require('../assets/fondo.jpg')} style={styles.backgroundImage}>
        </ImageBackground>
      </view>*/}
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
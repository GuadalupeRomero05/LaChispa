import React from 'react';
import { StyleSheet, View, ImageBackground, Image } from 'react-native';

export default function Login() {
  return (
    <View>
        <view>
      <ImageBackground
        source={require('../assets/fondo.jpg')} style={styles.backgroundImage}>
      </ImageBackground>
      </view>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
  },
});
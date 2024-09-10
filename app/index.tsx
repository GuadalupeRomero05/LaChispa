import React, { useState } from "react";
import { Text, TextInput, View, Alert, ToastAndroid, Dimensions, Image, TouchableOpacity } from "react-native";
import { auth } from './../config/FirebaseConfig'; // Asegúrate de ajustar la ruta si es necesario
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";

export default function Index() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Obtener dimensiones de la pantalla
  const { width } = Dimensions.get('window');
  const isSmallScreen = width < 600;

  const handleSignIn = () => {
    if (!email || !password) {
      ToastAndroid.show('Por favor complete los campos', ToastAndroid.LONG);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Inicio de Sesión Exitoso
        const user = userCredential.user;
        router.replace('/myInicio');
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("Error", errorMessage);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: isSmallScreen ? 16 : 32,
      }}
    >
      <Text style={{ fontSize: isSmallScreen ? 24 : 32, marginBottom: isSmallScreen ? 16 : 24 }}>
        LaChispaApp
      </Text>

      <Image
        source={require('./../assets/images/lc.png')}
        style={{
          width: isSmallScreen ? '90%' : '60%',
          height: isSmallScreen ? 150 : 200,
          resizeMode: 'contain',
          marginBottom: isSmallScreen ? 16 : 24,
        }}
      />

      <Text style={{ fontSize: isSmallScreen ? 18 : 24, marginBottom: isSmallScreen ? 16 : 20 }}>
        Vamos a Loguearnos
      </Text>

      <TextInput
        style={{
          width: isSmallScreen ? "90%" : "50%",
          height: 40,
          borderColor: "#ccc",
          borderWidth: 1,
          marginBottom: 12,
          paddingHorizontal: 8,
        }}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={{
          width: isSmallScreen ? "90%" : "50%",
          height: 40,
          borderColor: "#ccc",
          borderWidth: 1,
          marginBottom: 12,
          paddingHorizontal: 8,
        }}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={{
          paddingVertical: 12,
          paddingHorizontal: 32,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 20,
        }}
        onPress={handleSignIn}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

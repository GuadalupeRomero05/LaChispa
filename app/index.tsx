import React, { useState } from "react";
import { Text, TextInput, View, Alert, ToastAndroid, Dimensions, Image, TouchableOpacity } from "react-native";
import { auth } from '../config/FirebaseConfig'; // Asegúrate de ajustar la ruta si es necesario
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Importamos Firestore para obtener el rol
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const firestore = getFirestore(); // Inicializamos Firestore

  const { width } = Dimensions.get('window');
  const isSmallScreen = width < 600;

  const handleSignIn = () => {
    if (!email || !password) {
      ToastAndroid.show('Por favor complete los campos', ToastAndroid.LONG);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        // Obtener rol del usuario desde Firestore
        const docRef = doc(firestore, `usuarios/${user.uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          const rol = userData.rol;

          // Redirigir según el rol
          if (rol === '1') {
            router.replace('/myInicio'); // Página de administrador
          } else if (rol === '2') {
             router.replace('/ProfesorInicio'); // Página de profesor
          // } else if (rol === '3') {
          //   router.replace('/alumnoInicio'); // Página de alumno
          }
        } else {
          console.log("No se encontró el documento del usuario");
        }
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
        backgroundColor: "#f0f8ff",
        padding: isSmallScreen ? 16 : 32,
      }}
    >
      <Text style={{ fontSize: isSmallScreen ? 24 : 32, marginBottom: isSmallScreen ? 16 : 24 }}>
      </Text>

      <Image
        source={require('./../assets/images/logo.png')}
        style={{
          flex: 1,
          borderColor: 'white',
          width: isSmallScreen ? 100 : 200, // Ajusta el tamaño según la pantalla
          height: isSmallScreen ? 100 : 200, // Ajusta el tamaño según la pantalla
          borderRadius: (isSmallScreen ? 100 : 200) / 2, // Radio del círculo perfecto
          resizeMode: 'contain',
          marginBottom: isSmallScreen ? 16 : 24,
        }}
      />

      <Text style={{ fontSize: isSmallScreen ? 18 : 24, marginBottom: isSmallScreen ? 16 : 20 }}>
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
          backgroundColor: '#5f9ea0',
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

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Picker } from '@react-native-picker/picker';
import { auth } from '@/config/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types.js'; // Importa el tipo que definimos anteriormente
import AntDesign from '@expo/vector-icons/AntDesign';

const firestore = getFirestore();

// Definir el tipo de navegación para esta pantalla
type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Signup'>;

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('1');
    const [error, setError] = useState('');

    const navigation = useNavigation<SignupScreenNavigationProp>(); // Usa el tipo de navegación adecuado

    const submitHandler = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('Usuario registrado:', userCredential.user.uid);
            const docuRef = doc(firestore, `usuarios/${userCredential.user.uid}`);
            await setDoc(docuRef, { correo: email, rol: rol });

            // Navegar a la pantalla de 'myInicio' después del registro
            navigation.navigate('myInicio');
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            setError('Error al registrar usuario. Intenta de nuevo.');
        }
    };

    const { width } = Dimensions.get('window');
    const isSmallScreen = width < 600;

    return (
        <View style={styles(isSmallScreen).mainContainer}>
            <TouchableOpacity style={styles(isSmallScreen).backButton} onPress={() => navigation.goBack()}>
                <AntDesign name="back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles(isSmallScreen).title}>Registra Usuario</Text>
            <TextInput
                style={styles(isSmallScreen).input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles(isSmallScreen).input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Text style={styles(isSmallScreen).label}>Selecciona el Perfil</Text>
            <Picker
                selectedValue={rol}
                style={styles(isSmallScreen).input}
                onValueChange={(itemValue) => setRol(itemValue)}
            >
                <Picker.Item label="Administrador" value="1" />
                <Picker.Item label="Profesor" value="2" />
                <Picker.Item label="Alumno" value="3" />
                <Picker.Item label="Preceptor" value="4" />
            </Picker>
            {error ? <Text style={styles(isSmallScreen).error}>{error}</Text> : null}
            <TouchableOpacity
                style={styles(isSmallScreen).button}
                onPress={submitHandler}
            >
                <Text style={styles(isSmallScreen).buttonText}>Registro</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = (isSmallScreen: boolean) => StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f8ff",
        padding: isSmallScreen ? 16 : 32,
    },
    backButton: {
        position: "absolute",
        left: 20, // Coloca el botón a la izquierda
        top: 16,
        zIndex: 1, // Asegúrate de que el botón esté en la parte superior
    },
    title: {
        fontFamily: 'outfit-Medium',
        fontSize: isSmallScreen ? 24 : 32,
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontFamily: 'outfit-Bold',
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        width: isSmallScreen ? "90%" : "50%",
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        backgroundColor: 'blue',
        borderRadius: 15,
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default Signup;
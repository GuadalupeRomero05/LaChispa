import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Alert,
    TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Colors } from '@/constants/Colors';
import { SelectCursosList, SelectTipoCurso } from './../constants/Options';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import AntDesign from '@expo/vector-icons/AntDesign';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './types';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 600;

type CursosScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cursos'>;

export default function Cursos() {
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [selectedTipoCurso, setSelectedTipoCurso] = useState<string>('');
    const [courseName, setCourseName] = useState<string>('');

    const navigation = useNavigation<CursosScreenNavigationProp>();

    const handleContinue = async () => {
        if (!courseName || !selectedYear || !selectedTipoCurso) {
            Alert.alert('Error', 'Por favor complete todos los campos');
            return;
        }

        try {
            const db = getFirestore();
            await addDoc(collection(db, 'materias'), {
                courseName,
                year: selectedYear,
                tipoCurso: selectedTipoCurso,
                createdAt: serverTimestamp(),
            });

            Alert.alert('Éxito', 'Materia agregada exitosamente', [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('myInicio'), // Redirige a MyInicio
                },
            ]);

            setCourseName('');
            setSelectedYear('');
            setSelectedTipoCurso('');
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al agregar la materia');
            console.error('Firestore Error:', error);
        }
    };

    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <AntDesign name="back" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.title}>Cargar Curso</Text>

            {/* Selector de Año */}
            <Picker
                selectedValue={selectedYear}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedYear(itemValue as string)}
            >
                <Picker.Item label="Seleccione un Año" value="" />
                {SelectCursosList.map((item) => (
                    <Picker.Item key={item.id} label={item.title} value={item.id.toString()} />
                ))}
            </Picker>

            {/* Selector de Tipo de Curso */}
            <Picker
                selectedValue={selectedTipoCurso}
                style={[styles.picker, { opacity: selectedYear ? 1 : 0.5 }]}
                onValueChange={(itemValue) => setSelectedTipoCurso(itemValue as string)}
                enabled={!!selectedYear}
            >
                <Picker.Item label="Seleccione un Tipo de Curso" value="" />
                {SelectTipoCurso.map((item) => (
                    <Picker.Item key={item.id} label={item.title} value={item.id.toString()} />
                ))}
            </Picker>

            <TouchableOpacity onPress={handleContinue} style={styles.button}>
                <Text style={styles.buttonText}>Agregar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f8ff',
        padding: isSmallScreen ? 16 : 32,
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 16,
        zIndex: 1,
    },
    title: {
        fontSize: isSmallScreen ? 24 : 32,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    input: {
        width: isSmallScreen ? '90%' : '50%',
        height: 40,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    picker: {
        width: isSmallScreen ? '90%' : '50%',
        marginBottom: 20,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 15,
        marginTop: 20,
    },
    buttonText: {
        color: Colors.WHITE,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Asegúrate de instalar @react-native-picker/picker
import { Colors } from '@/constants/Colors';
import { SelectCursosList, SelectTipoCurso } from './../constants/Options';
import { TextInput } from 'react-native-paper';
import { getFirestore } from 'firebase/firestore';
const firestore = getFirestore();
const { width } = Dimensions.get('window');
const isSmallScreen = width < 600;

export default function Cursos() {
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [selectedTipoCurso, setSelectedTipoCurso] = useState<string | null>(null);
    const [courseName, setCourseName] = useState<string>('');

    // Función para manejar el botón "Agregar"
    const handleContinue = async () => {
        if (!courseName || !selectedYear || !selectedTipoCurso) {
            Alert.alert('Error', 'Por favor complete todos los campos');
            return;
        }

        try {
            await getFirestore().collection('materias').add({
                courseName: courseName,
                year: selectedYear,
                tipoCurso: selectedTipoCurso,
                createdAt: firestore.FieldValue.serverTimestamp(), // Timestamp para la fecha de creación
            });

            Alert.alert('Éxito', 'Materia agregada exitosamente');
            setCourseName('');
            setSelectedYear(null);
            setSelectedTipoCurso(null);
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al agregar la materia');
            console.error(error);
        }
    };

    return (
        <View style={styles(isSmallScreen).mainContainer}>
            <Text style={{ fontSize: isSmallScreen ? 23 : 32, marginBottom: isSmallScreen ? 16 : 24 }}>
                Carga de Cursos
            </Text>
            <TextInput
                style={styles(isSmallScreen).input}
                placeholder='Nombre del Curso'
                value={courseName}
                onChangeText={setCourseName}
            />

            {/* Selector de Año */}
            <Picker
                selectedValue={selectedYear}
                style={styles(isSmallScreen).picker}
                onValueChange={(itemValue) => setSelectedYear(itemValue as string)}
            >
                <Picker.Item label="Seleccione un Año" value={null} />
                {SelectCursosList.map((item) => (
                    <Picker.Item key={item.id} label={item.title} value={item.id.toString()} />
                ))}
            </Picker>

            {/* Selector de Tipo de Curso, habilitado solo si se ha seleccionado un año */}
            <Picker
                selectedValue={selectedTipoCurso}
                style={[styles(isSmallScreen).picker, { opacity: selectedYear ? 1 : 0.5 }]}
                onValueChange={(itemValue) => setSelectedTipoCurso(itemValue as string)}
                enabled={!!selectedYear}
            >
                <Picker.Item label="Seleccione un Tipo de Curso" value={null} />
                {SelectTipoCurso.map((item) => (
                    <Picker.Item key={item.id} label={item.title} value={item.id.toString()} />
                ))}
            </Picker>
            <TouchableOpacity onPress={handleContinue} style={styles(isSmallScreen).button}>
                <Text style={styles(isSmallScreen).buttonText}>Agregar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = (isSmallScreen: boolean) =>
    StyleSheet.create({
        mainContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            padding: isSmallScreen ? 16 : 32,
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
            backgroundColor: Colors.WHITE,
            borderWidth: 1,
            marginBottom: 12,
            paddingHorizontal: 8,
        },
        button: {
            paddingVertical: 12,
            paddingHorizontal: 32,
            backgroundColor: Colors.PRIMARY,
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
        picker: {
            width: isSmallScreen ? '90%' : '50%',
            height: 40,
            marginBottom: 20,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 8,
        },
    });

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import { Colors } from '../constants/Colors';
import { AntDesign } from '@expo/vector-icons';

export default function Fecha() {
    const [selectedDate, setSelectedDate] = useState(null);

    // Función para manejar el cambio de fecha
    const onDateChange = (date) => {
        setSelectedDate(date); // Guarda la fecha seleccionada en el estado
        console.log('Fecha seleccionada: ', date); // podes manejar la fecha seleccionada aquí
    };

    return (
        <View style={styles.mainContainer}>
           {/*<TouchableOpacity style={styles(isSmallScreen).backButton} onPress={() => navigation.goBack()}>
                <AntDesign name="back" size={24} color="black" />
            </TouchableOpacity>*/} 
            <View style={styles.container}>
                <Text style={styles.header}>Calendario</Text>
                <CalendarPicker onDateChange={onDateChange} />

                {selectedDate && (
                    <Text>Fecha seleccionada: {selectedDate.toString()}</Text>
                )}
            </View>
        </View>
    );
}

    const styles = StyleSheet.create({
        mainContainer: {
        padding: 25,
        paddingTop: 10,
        backgroundColor: '#f0f8ff',
        height: '100%',
    },
    backButton: {
        position: "absolute",
        left: 20, // Coloca el botón a la izquierda
        top: 16,
        zIndex: 1, // Asegúrate de que el botón esté en la parte superior
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'f0f8ff',
        marginTop: 30,
    },
    header: {
        fontSize: 35,
        fontFamily: 'outfit-Bold', // Asegurarse de que la fuente esté correctamente cargada
        marginTop: 20,
    },
    continueButton: {
        padding: 20,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 15,
        marginTop: 20,
    },
    continueButtonText: {
        textAlign: 'center',
        color: Colors.WHITE,
    },
});

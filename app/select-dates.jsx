import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import { Colors } from '../constants/Colors';

export default function Fecha() {
    const [selectedDate, setSelectedDate] = useState(null);

    // Función para manejar el cambio de fecha
    const onDateChange = (date) => {
        setSelectedDate(date); // Guarda la fecha seleccionada en el estado
        console.log('Fecha seleccionada: ', date); // Puedes manejar la fecha seleccionada aquí
    };

    return (
        <View style={styles.mainContainer}>
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
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: '100%',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        marginTop: 30,
    },
    header: {
        fontSize: 35,
        fontFamily: 'outfit-Bold', // Asegúrate de que la fuente esté correctamente cargada
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

import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from './../../constants/Colors';

export default function OptionCard({ option, selectedOption }) {
    return (
        <View style={[
            styles.card,
            selectedOption?.id === option.id && styles.selectedCard
        ]}>
            <View>
                <Text style={styles.title}>{option?.title}</Text>
                <Text style={styles.description}>{option?.desc}</Text>
                <Text style={styles.icon}>{option?.icon}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 12, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.LIGHT_GRAY,
        borderRadius: 10, 
        margin: 6, 
        elevation: 2, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 1 }, 
        shadowOpacity: 0.2, 
        shadowRadius: 2, 
        justifyContent: 'center'
    },
    selectedCard: {
        borderWidth: 1.5, 
        borderColor: Colors.PRIMARY, 
    },
    title: {
        fontFamily: 'outfit-Bold',
        fontSize: 14, 
        color: Colors.BLACK, 
    },
    description: {
        fontFamily: 'outfit-Bold',
        fontSize: 12, 
        color: Colors.GREY,
    },
    icon: {
        fontFamily: 'outfit-Bold',
        fontSize: 12, 
        color: Colors.GREY,
    },
});

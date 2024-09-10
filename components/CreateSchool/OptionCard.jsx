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
        padding: 12, // Reduced padding for smaller cards
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.LIGHT_GRAY,
        borderRadius: 10, // Reduced border radius
        margin: 6, // Reduced margin for smaller cards
        elevation: 2, // Slight shadow for visual separation on Android
        shadowColor: '#000', // Adds shadow color for iOS
        shadowOffset: { width: 0, height: 1 }, // Reduced shadow offset for iOS
        shadowOpacity: 0.2, // Adjusted shadow opacity for iOS
        shadowRadius: 2, // Reduced shadow radius for iOS
        justifyContent: 'center'
    },
    selectedCard: {
        borderWidth: 1.5, // Reduced border width
        borderColor: Colors.PRIMARY, // Adjust border color to match your theme
    },
    title: {
        fontFamily: 'outfit-Bold',
        fontSize: 14, // Further reduced font size for smaller cards
        color: Colors.BLACK, // Added color for text
    },
    description: {
        fontFamily: 'outfit-Bold',
        fontSize: 12, // Further reduced font size for smaller cards
        color: Colors.GREY,
    },
    icon: {
        fontFamily: 'outfit-Bold',
        fontSize: 12, // Further reduced font size for smaller cards
        color: Colors.GREY,
    },
});

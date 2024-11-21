import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../config/FirebaseConfig';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BD = firestore;

export default function Listausers() {
    const [users, setusers] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const usersCollection = collection(BD, 'usuarios');
        const unsubscribe = onSnapshot(usersCollection, (querySnapshot) => {
            const users = [];
            querySnapshot.forEach((doc) => {
                const { correo, rol } = doc.data(); // Extrae "correo" y "rol" de los datos
                if (rol === '3') { // Filtra usuarios con rol "3"
                    users.push({
                        id: doc.id,
                        correo,
                    });
                }
            });
            setusers(users);
        });

        return () => unsubscribe(); // Limpia la suscripción cuando el componente se desmonte
    }, []);

    const eliminaruser = async (id) => {
        const userRef = doc(BD, 'usuarios', id); // Asegúrate de que la colección es "usuarios"
        await deleteDoc(userRef);
    };

    const style = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "#f0f8ff"
        },
        form: {
            margin: 20,
            padding: 40,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 10, height: 10 },
            shadowOpacity: 0.5,
            shadowRadius: 6,
            elevation: 5,
        },
        scrollView: {
            height: 300,
            overflowY: 'auto'
        },
        userContainer: {
            width: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '12vh',
        },
        basura: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: [{ translateX: -12 }, { translateY: -12 }],
            width: 24,
            height: 24
        }
    });

    return (
        <View style={style.container}>
            <View style={style.form}>
                <Text style={style.modificaruser}>Lista de Alumnos</Text>
                <View style={style.scrollView}>
                    {users.map((user) => (
                        <View style={style.userContainer} key={user.id}>
                            <ListItem bottomDivider>
                                <ListItem.Chevron />
                                <ListItem.Content>
                                    <ListItem.Title>{user.correo}</ListItem.Title> {/* Mostramos solo el correo */}
                                </ListItem.Content>
                                <TouchableOpacity
                                    onPress={() => eliminaruser(user.id)} // Eliminar usuario por ID
                                >
                                    <Icon name="trash" size={24} color="#FF0000" style={style.basura} />
                                </TouchableOpacity>
                            </ListItem>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}

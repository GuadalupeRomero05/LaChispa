import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions, Alert, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './types'; // Importa los tipos de navegación
import { StackNavigationProp } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';

// Asegúrate de tener el tipo RootStackParamList bien definido.
type NavigationProp = StackNavigationProp<RootStackParamList, 'AsignarMateriaP'>;

const { width } = Dimensions.get('window');
const isSmallScreen = width < 600;

export default function CursosPicker() {
    const [courses, setCourses] = useState<{ id: string; name: string }[]>([]);
    const [users, setUsers] = useState<{ id: string; email: string; role: string }[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<string>("");
    const [selectedUser, setSelectedUser] = useState<string>("");
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation<NavigationProp>(); // Usando el tipo de navegación adecuado

    const handleContinue = async () => {
        if (!selectedCourse || !selectedUser) {
            Alert.alert('Error', 'Por favor, seleccione un curso y un usuario.');
            return;
        }

        try {
            const db = getFirestore();
            const materiaUsuarioRef = collection(db, 'materiaUsuario');
            const docRef = await addDoc(materiaUsuarioRef, {
                courseId: selectedCourse,
                userId: selectedUser,
                createdAt: new Date(),
            });
            console.log("Materia agregada exitosamente con ID:", docRef.id); // Imprimir ID de doc agregado
            Alert.alert('Éxito', 'Materia agregada exitosamente', [
                {
                    text: 'OK',
                    onPress: () => {
                        console.log("Redirigiendo a MyInicio...");
                        navigation.navigate('myInicio'); // Corrección aquí: punto y coma
                    },
                },
            ]);
        } catch (error) {
            Alert.alert('Error', 'No se pudo asignar el curso al usuario.');
            console.error('Error al guardar los datos:', error);
        }
    };



    useEffect(() => {
        const fetchData = async () => {
            const db = getFirestore();
            const materiasRef = collection(db, 'materias');
            const usuariosRef = collection(db, 'usuarios');

            try {
                const materiasSnapshot = await getDocs(materiasRef);
                const materias = materiasSnapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().courseName,
                }));

                const usuariosSnapshot = await getDocs(usuariosRef);
                const usuarios = usuariosSnapshot.docs.map(doc => ({
                    id: doc.id,
                    email: doc.data().correo,
                    role: doc.data().rol,
                }));

                setCourses(materias);
                setUsers(usuarios);
            } catch (error) {
                Alert.alert('Error', 'No se pudieron obtener los datos.');
                console.error('Error al obtener datos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <AntDesign name="back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.label}>Seleccione un Curso</Text>
            <Picker
                selectedValue={selectedCourse}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedCourse(itemValue as string)}
            >
                <Picker.Item label="Seleccione un Curso" value="" />
                {courses.map((course) => (
                    <Picker.Item key={course.id} label={course.name} value={course.id} />
                ))}
            </Picker>

            <Text style={styles.label}>Seleccione un Usuario</Text>
            <Picker
                selectedValue={selectedUser}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedUser(itemValue as string)}
            >
                <Picker.Item label="Seleccione un Usuario" value="" />
                {users.map((user) => (
                    <Picker.Item key={user.id} label={`${user.email} (Rol: ${user.role})`} value={user.id} />
                ))}
            </Picker>

            <TouchableOpacity onPress={handleContinue} style={styles.button}>
                <Text style={styles.buttonText}>Asignar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: isSmallScreen ? 16 : 32,
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 16,
        zIndex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    picker: {
        width: isSmallScreen ? '90%' : '50%',
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
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

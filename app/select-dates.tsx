import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { Picker } from '@react-native-picker/picker';
import { firestore, auth } from '@/config/FirebaseConfig';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

export default function Fecha() {
    const navigation = useNavigation(); // Get access to the navigation object
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [courses, setCourses] = useState<{ id: string; name: string }[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<string>('');
    const [novedad, setNovedad] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchCourses() {
            setLoading(true);
            try {
                const user = auth.currentUser;
                if (!user) {
                    Alert.alert('Error', 'Usuario no autenticado.');
                    setLoading(false);
                    return;
                }

                const materiaUsuarioRef = collection(firestore, 'materiaUsuario');
                const q = query(materiaUsuarioRef, where('userId', '==', user.uid));
                const materiaUsuarioSnapshot = await getDocs(q);

                const materiaIds = materiaUsuarioSnapshot.docs.map((doc) => doc.data().courseId);

                if (materiaIds.length > 0) {
                    const materiasRef = collection(firestore, 'materias');
                    const materiasQuery = query(materiasRef, where('__name__', 'in', materiaIds));
                    const materiasSnapshot = await getDocs(materiasQuery);

                    const fetchedCourses = materiasSnapshot.docs.map((doc) => ({
                        id: doc.id,
                        name: doc.data().courseName,
                    }));
                    setCourses(fetchedCourses);
                } else {
                    setCourses([]);
                }
            } catch (error) {
                Alert.alert('Error', 'No se pudieron cargar las materias.');
                console.error('Error al cargar materias:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchCourses();
    }, []);

    const onDateChange = (date: Date) => {
        setSelectedDate(date);
    };

    const submitData = async () => {
        try {
            if (!selectedCourse || !selectedDate || !novedad) {
                Alert.alert('Error', 'Por favor, completa todos los campos.');
                return;
            }

            const user = auth.currentUser;
            if (!user) {
                Alert.alert('Error', 'Usuario no autenticado.');
                return;
            }

            // Referencia a la colección 'novedades'
            const novedadesRef = collection(firestore, 'novedades');

            // Preparamos los datos a guardar
            const novedadData = {
                userId: user.uid, // ID del usuario autenticado
                courseId: selectedCourse, // ID del curso seleccionado
                courseName: courses.find(course => course.id === selectedCourse)?.name, // Nombre del curso
                novedadText: novedad, // Texto de la novedad
                date: selectedDate.toISOString(), // Fecha seleccionada en formato ISO
                createdAt: new Date().toISOString(), // Fecha de creación en formato ISO
            };

            // Agregar la novedad a la colección 'novedades'
            await addDoc(novedadesRef, novedadData);

            // Alerta de éxito
            Alert.alert('Éxito', 'Novedad agregada correctamente.');

            // Limpiar los campos después de agregar la novedad
            setSelectedCourse('');
            setNovedad('');
            setSelectedDate(null);
        } catch (error) {
            Alert.alert('Error', 'No se pudo agregar la novedad.');
            console.error('Error al guardar datos:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <AntDesign name="back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Selecciona una fecha:</Text>

            {/* Calendario */}
            <View style={styles.calendarContainer}>
                <CalendarPicker
                    onDateChange={onDateChange}
                    minDate={new Date()}
                />
            </View>

            {selectedDate && (
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Selecciona un Curso:</Text>
                    {loading ? (
                        <Text>Cargando cursos...</Text>
                    ) : (
                        <Picker
                            style={styles.picker}
                            selectedValue={selectedCourse}
                            onValueChange={(itemValue) => setSelectedCourse(itemValue)}
                        >
                            <Picker.Item label="Selecciona un curso" value="" />
                            {courses.map((course) => (
                                <Picker.Item key={course.id} label={course.name} value={course.id} />
                            ))}
                        </Picker>
                    )}

                    <Text style={styles.label}>Novedad:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Escribe una novedad"
                        value={novedad}
                        onChangeText={(text) => setNovedad(text)}
                    />

                    <TouchableOpacity onPress={submitData} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Agregar Novedad</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 20, backgroundColor: '#f0f8ff' },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
    calendarContainer: { alignSelf: 'center', marginBottom: 20 },
    formContainer: { marginTop: 20 },
    label: { fontSize: 16, marginBottom: 5 },
    picker: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
        backgroundColor: '#fff',
    },

    backButton: {
        position: "absolute",
        left: 20, // Coloca el botón a la izquierda
        top: 16,
        zIndex: 1, // Asegúrate de que el botón esté en la parte superior
    },
    submitButton: { padding: 15, backgroundColor: '#007BFF', marginTop: 15, borderRadius: 5 },
    submitButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});

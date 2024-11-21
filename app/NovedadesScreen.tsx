import { useEffect, useState } from 'react';
import { View, Text, Alert, ScrollView, StyleSheet } from 'react-native';
import { firestore } from '@/config/FirebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

// Definir interfaces
interface Novedad {
    id: string;
    materiaId: string;
    novedad: string;
    fecha: string;
    createdAt: string;
    userId: string;
}

export default function NovedadesPorMateria({ materiaId }: { materiaId: string }) {
    const [novedades, setNovedades] = useState<Novedad[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchNovedadesPorMateria() {
            setLoading(true);
            try {
                // Validar que el ID de materia esté presente
                if (!materiaId) {
                    Alert.alert('Error', 'No se proporcionó un ID de materia válido');
                    setLoading(false);
                    return;
                }

                // Consultar las novedades relacionadas con el materiaId
                const novedadesRef = collection(firestore, 'novedades');
                const novedadesQuery = query(novedadesRef, where('materiaId', '==', materiaId));
                const novedadesSnapshot = await getDocs(novedadesQuery);

                // Mapear los resultados a un array de Novedad
                const novedadesData: Novedad[] = novedadesSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Novedad[];

                setNovedades(novedadesData);
            } catch (error: any) {
                Alert.alert('Error', 'Hubo un problema al cargar las novedades: ' + (error.message || error));
            } finally {
                setLoading(false);
            }
        }

        fetchNovedadesPorMateria();
    }, [materiaId]);

    return (
        <ScrollView style={styles.container}>
            {loading ? (
                <Text style={styles.loadingText}>Cargando...</Text>
            ) : novedades.length > 0 ? (
                novedades.map((novedad) => (
                    <View key={novedad.id} style={styles.card}>
                        <Text style={styles.title}>Novedad:</Text>
                        <Text>{novedad.novedad}</Text>
                        <Text style={styles.title}>Fecha:</Text>
                        <Text>{new Date(novedad.fecha).toLocaleString()}</Text>
                        <Text style={styles.title}>Creado el:</Text>
                        <Text>{new Date(novedad.createdAt).toLocaleString()}</Text>
                    </View>
                ))
            ) : (
                <Text style={styles.noDataText}>No se encontraron novedades para esta materia.</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray',
    },
    card: {
        marginBottom: 16,
        padding: 12,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontWeight: 'bold',
        marginTop: 8,
    },
    noDataText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray',
    },
});

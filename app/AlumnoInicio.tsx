import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { Provider, Menu } from 'react-native-paper';
import { auth, firestore } from '@/config/FirebaseConfig';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { Colors } from '@/constants/Colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types.js';

interface Materia {
  id: string;
  courseName: string;
  tipoCurso: string;
  year: string;
  createdAt: string;
}

interface Usuario {
  id: string;
  correo: string;
  rol: string;
}

type AlumnoInicioScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AlumnoInicio'>;

export default function AlumnoInicio() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [materiaUsuarios, setMateriaUsuarios] = useState<Record<string, Usuario[]>>({});
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { width } = Dimensions.get('window');
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const [selectedMateria, setSelectedMateria] = useState<Materia | null>(null);

  const handleContinue = () => {
    if (selectedMateria) {
      navigation.navigate('NovedadesScreen', { materiaId: selectedMateria.id });
    } else {
      alert('Por favor selecciona una materia');
    }
  };

  const toggleUserMenu = () => setUserMenuVisible(!userMenuVisible);
  const isSmallScreen = width < 600;

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserEmail(currentUser.email);
    }
  }, []);

  useEffect(() => {
    const fetchMateriasYUsuarios = async () => {
      try {
        const materiasRef = collection(firestore, 'materias');
        const materiasSnapshot = await getDocs(materiasRef);

        const fetchedMaterias = materiasSnapshot.docs.map((doc) => {
          const data = doc.data();
          return { id: doc.id, ...data } as Materia;
        });

        const usuariosPorMateria: Record<string, Usuario[]> = {};

        for (const materia of fetchedMaterias) {
          const materiaUsuarioRef = collection(firestore, 'materiaUsuario');
          const q = query(materiaUsuarioRef, where('materiaId', '==', materia.id));
          const materiaUsuarioSnapshot = await getDocs(q);

          const usuariosPromises = materiaUsuarioSnapshot.docs.map(async (materiaUsuarioDoc) => {
            const materiaUsuarioData = materiaUsuarioDoc.data();
            const usuarioRef = doc(firestore, 'usuarios', materiaUsuarioData.userId);
            const usuarioSnapshot = await getDoc(usuarioRef);

            if (usuarioSnapshot.exists()) {
              const usuarioData = usuarioSnapshot.data();
              return { id: usuarioSnapshot.id, ...usuarioData } as Usuario;
            }
            return null;
          });

          const usuarios = (await Promise.all(usuariosPromises)).filter(
            (usuario) => usuario !== null
          ) as Usuario[];

          usuariosPorMateria[materia.id] = usuarios;
        }

        setMaterias(fetchedMaterias);
        setMateriaUsuarios(usuariosPorMateria);
      } catch (error) {
        console.error('Error obteniendo materias y usuarios:', error);
      }
    };

    fetchMateriasYUsuarios();
  }, []);

  const renderItem = ({ item }: { item: Materia }) => (
    <TouchableOpacity
      style={[styles.card, selectedMateria?.id === item.id ? styles.selectedCard : {}]}
      onPress={() => setSelectedMateria(item)}
    >
      <Text style={styles.cardTitle}>{item.courseName}</Text>
      <Text style={styles.cardSubtitle}>Año: {item.year}</Text>
      <Text style={styles.cardSubtitle}>Divsion: {item.tipoCurso}</Text>
      <Text style={styles.cardSubtitle}>Profesores:</Text>
      {materiaUsuarios[item.id]?.map((usuario) => (
        <Text key={usuario.id} style={styles.cardUser}>
          - {usuario.correo} (Rol: {usuario.rol})
        </Text>
      ))}
    </TouchableOpacity>
  );

  return (
    <Provider>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.backButton, isSmallScreen && styles.smallScreenBackButton]}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.header}>
          <View style={styles.rightIcons}>
            <Menu
              visible={userMenuVisible}
              onDismiss={toggleUserMenu}
              anchor={
                <TouchableOpacity onPress={toggleUserMenu} style={styles.iconButton}>
                  <AntDesign name="user" size={24} color="black" />
                </TouchableOpacity>
              }
            >
              <Menu.Item title={userEmail ? `Usuario: ${userEmail}` : 'Cargando usuario...'} />
            </Menu>
          </View>
        </View>

        <Text style={[styles.title, { fontSize: isSmallScreen ? 30 : 40 }]}>Materias</Text>

        <View style={styles.listContainer}>
          <FlatList
            data={materias}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
          />
        </View>

        <TouchableOpacity onPress={handleContinue} style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  iconButton: {
    marginLeft: 20,
  },
  title: {
    fontFamily: 'outfit-Bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    width: '80%',
    marginTop: 20,
    alignSelf: 'center',
  },
  list: {
    flexGrow: 0,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 16,
    zIndex: 1,
  },
  smallScreenBackButton: {
    left: 10,
    top: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    backgroundColor: '#d3e8f7',
  },
  cardTitle: {
    fontFamily: 'outfit-Bold',
    fontSize: 16,
  },
  cardSubtitle: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#555',
  },
  cardUser: {
    fontFamily: 'outfit',
    fontSize: 12,
    color: '#333',
  },
  continueButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center',
    maxWidth: '90%',
    width: 300,
  },
  continueButtonText: {
    color: Colors.WHITE,
    fontFamily: 'outfit-Bold',
    fontSize: 16,
  },
});

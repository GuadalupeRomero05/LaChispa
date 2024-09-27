import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { CreateSchoolContext } from './../context/CreateSchoolContext';
import { SelectCursosList } from './../constants/Options';
import OptionCard from './../components/CreateSchool/OptionCard';
import { Colors } from '@/constants/Colors';
import { Menu, Provider, Divider } from 'react-native-paper';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/FirebaseConfig';

interface Option {
  id: number;
  title: string;
  desc: string;
  icon: string;
}

export default function MyInicio() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [menuVisible, setMenuVisible] = useState(false);
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const { width } = Dimensions.get('window');
  const isSmallScreen = width < 600;

  const context = useContext(CreateSchoolContext);

  if (!context) {
    throw new Error("CreateSchoolContext debe ser utilizado dentro de CreateSchoolProvider");
  }

  const { schoolData, setSchoolData } = context;
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Obtener el email del usuario logueado
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserEmail(currentUser.email);
    }
  }, []);

  useEffect(() => {
    if (selectedOption) {
      setSchoolData((prevState) => ({
        ...prevState,
        year: selectedOption.title,
      }));
    }
  }, [selectedOption]);

  const toggleMenu = () => setMenuVisible(!menuVisible);
  const toggleUserMenu = () => setUserMenuVisible(!userMenuVisible);

  const handleContinue = () => {
    navigation.navigate('select-dates');
  };

  const handleSignup = () => {
    navigation.navigate('signup');
  };
const handleCursos = () => {
  navigation.navigate('Cursos');
}
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('Sesión cerrada');
      navigation.navigate('index'); // Cambia 'index' por el nombre de la pantalla de inicio de sesión en tu configuración de navegación
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <Provider>
      <View style={styles.container}>
        {/* Header con íconos alineados */}
        <View style={styles.header}>
          <View style={styles.rightIcons}>
            {/* Menú de configuración */}
            <Menu
              visible={menuVisible}
              onDismiss={toggleMenu}
              anchor={
                <TouchableOpacity onPress={toggleMenu} style={styles.iconButton}>
                  <AntDesign name="setting" size={24} color="black" />
                </TouchableOpacity>
              }
            >
              <Menu.Item onPress={handleSignup} title="Registrar" />
              <Divider />
              <Menu.Item onPress={handleCursos} title="Crear Cursos" />
              <Divider/>
              <Menu.Item onPress={handleSignOut} title="Cerrar sesión" />
            </Menu>

            {/* Menú de usuario */}
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

        {/* Título */}
        <Text style={[styles.title, { fontSize: isSmallScreen ? 24 : 32 }]}>Años</Text>
      

        {/* Lista de opciones */}
        <FlatList
          data={SelectCursosList}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedOption(item)} style={styles.optionButton}>
              <OptionCard option={item} selectedOption={selectedOption} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />

        {/* Botón de continuar */}
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
  subtitle: {
    fontFamily: 'outfit',
    fontSize: 8,
    marginBottom: 12,
    textAlign: 'center',
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center',
    maxWidth: '90%',
    width: 300,
    backgroundColor: '#f0f8ff',
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

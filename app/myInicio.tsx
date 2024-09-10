import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { CreateSchoolContext } from './../context/CreateSchoolContext';
import { SelectCursosList } from './../constants/Options';
import OptionCard from './../components/CreateSchool/OptionCard';
import { Colors } from '@/constants/Colors';
import { Menu, Provider, Divider, Portal } from 'react-native-paper';

interface Option {
  id: number;
  title: string;
  desc: string;
  icon: string;
}

export default function MyInicio() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [menuVisible, setMenuVisible] = useState(false);
  const { width } = Dimensions.get('window');
  const isSmallScreen = width < 600;

  const context = useContext(CreateSchoolContext);

  if (!context) {
    throw new Error("CreateSchoolContext debe ser utilizado dentro de CreateSchoolProvider");
  }

  const { schoolData, setSchoolData } = context;

  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  useEffect(() => {
    if (selectedOption) {
      setSchoolData((prevState) => ({
        ...prevState,
        year: selectedOption.title,
      }));
    }
  }, [selectedOption]);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  // Maneja el evento de presionar "back"
  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('index'); // Asegúrate de que 'Home' es una ruta válida en tu Navigator
    }
  };

  const handleContinue = () => {
    navigation.navigate('select-dates'); // Asegúrate de que 'SelectDates' es una ruta válida en tu Navigator
  };

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.iconButton}>
            <AntDesign name="back" size={24} color="black" />
          </TouchableOpacity>

          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => console.log('User Pressed')} style={styles.iconButton}>
              <AntDesign name="user" size={24} color="black" />
            </TouchableOpacity>

            <Portal>
              <Menu
                visible={menuVisible}
                onDismiss={toggleMenu}
                anchor={
                  <TouchableOpacity onPress={toggleMenu} style={styles.iconButton}>
                    <AntDesign name="setting" size={24} color="black" />
                  </TouchableOpacity>
                }
              >
                <Menu.Item onPress={() => console.log('Opción 1 seleccionada')} title="Opción 1" />
                <Menu.Item onPress={() => console.log('Opción 2 seleccionada')} title="Opción 2" />
                <Divider />
                <Menu.Item onPress={() => console.log('Cerrar sesión')} title="Cerrar sesión" />
              </Menu>
            </Portal>
          </View>
        </View>

        <Text style={[styles.title, { fontSize: isSmallScreen ? 24 : 32 }]}>Años</Text>

        <FlatList
          data={SelectCursosList}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedOption(item)} style={styles.optionButton}>
              <OptionCard option={item} selectedOption={selectedOption} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />

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
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginRight: 20,
  },
  title: {
    fontFamily: 'outfit-Bold',
    marginBottom: 20,
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

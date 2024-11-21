import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Index from './index';
import MyInicio from './myInicio';
import ProfesorInicio from './ProfesorInicio';
import PreceptorInicio from './PreceptorInicio';
import AlumnoInicio from './AlumnoInicio';
import CambioContra from './CambioContra';
import AsignarMateriaP from './AsignarMateriaP';
import Fecha from './select-dates';
import NovedadesScreen from './NovedadesScreen';
import { CreateSchoolProvider } from '../context/CreateSchoolContext';

// Define los tipos de parámetros para las rutas
type RootStackParamList = {
    Index: undefined;
    MyInicio: undefined;
    ProfesorInicio: undefined;
    AlumnoInicio: undefined;
    PreceptorInicio: undefined;
    CambioContra: undefined;
    AsignarMateriaP: undefined;
    Fecha: undefined;
    NovedadesScreen: { materiaId: string };  // Definir el parámetro materiaId
};

const Stack = createNativeStackNavigator<RootStackParamList>(); // Usar el tipo RootStackParamList aquí

export default function App() {
    return (
        <CreateSchoolProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Index">
                    <Stack.Screen
                        name="Index"
                        component={Index}
                        options={{
                            headerTitleAlign: 'center',
                            title: "INICIO DE SESION",
                            headerTintColor: "white",
                            headerStyle: { backgroundColor: "#5f9ea0" },
                            headerLeft: () => null
                        }}
                    />
                    <Stack.Screen
                        name="MyInicio"
                        component={MyInicio}
                        options={{
                            headerTitleAlign: 'center',
                            title: "Directivos",
                            headerTintColor: "white",
                            headerStyle: { backgroundColor: "#5f9ea0" },
                            headerLeft: () => null
                        }}
                    />
                    <Stack.Screen
                        name="ProfesorInicio"
                        component={ProfesorInicio}
                        options={{
                            headerTitleAlign: 'center',
                            title: "Profesor",
                            headerTintColor: "white",
                            headerStyle: { backgroundColor: "#5f9ea0" },
                            headerLeft: () => null
                        }}
                    />
                    <Stack.Screen
                        name="AlumnoInicio"
                        component={AlumnoInicio}
                        options={{
                            headerTitleAlign: 'center',
                            title: "Alumno",
                            headerTintColor: "white",
                            headerStyle: { backgroundColor: "#5f9ea0" },
                            headerLeft: () => null
                        }}
                    />
                    <Stack.Screen
                        name="PreceptorInicio"
                        component={PreceptorInicio}
                        options={{
                            headerTitleAlign: 'center',
                            title: "Preceptor",
                            headerTintColor: "white",
                            headerStyle: { backgroundColor: "#5f9ea0" },
                            headerLeft: () => null
                        }}
                    />
                    <Stack.Screen
                        name="CambioContra"
                        component={CambioContra}
                        options={{
                            headerTitleAlign: 'center',
                            title: "Cambio de Contraseña",
                            headerTintColor: "white",
                            headerStyle: { backgroundColor: "#5f9ea0" },
                            headerLeft: () => null
                        }}
                    />
                    <Stack.Screen
                        name="AsignarMateriaP"
                        component={AsignarMateriaP}
                        options={{
                            headerTitleAlign: 'center',
                            title: "Asignar Materia",
                            headerTintColor: "white",
                            headerStyle: { backgroundColor: "#5f9ea0" },
                            headerLeft: () => null
                        }}
                    />
                    <Stack.Screen
                        name="Fecha"
                        component={Fecha}
                        options={{
                            headerTitleAlign: 'center',
                            title: "Asignar Fecha",
                            headerTintColor: "white",
                            headerStyle: { backgroundColor: "#5f9ea0" },
                            headerLeft: () => null
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </CreateSchoolProvider>
    );
}

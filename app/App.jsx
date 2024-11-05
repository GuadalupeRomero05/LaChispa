import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Index from './index';
import MyInicio from './myInicio';
import ProfesorInicio from './ProfesorInicio';
import PreceptorInicio from './PreceptorInicio';
import AlumnoInicio from './AlumnoInicio';
import CambioContra from './CambioContra';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Index" component={Index} 
                options={{
                headerTitleAlign:'center',
                name: "INICIO DE SESION",
                headerTintColor: "white",
                headerStyle: {backgroundColor:"#5f9ea0"},
                headerLeft: () => null
                }
                } />
                <Stack.Screen name="MyInicio" component={MyInicio} 
                options={{
                headerTitleAlign:'center',
                name: "Directivos",
                headerTintColor: "white",
                headerStyle: {backgroundColor:"#5f9ea0"},
                headerLeft: () => null
                }
                } />
                <Stack.Screen name="ProfesorInicio" component={ProfesorInicio} 
                options={{
                headerTitleAlign:'center',
                title: "Profesor",
                headerTintColor: "white",
                headerStyle: {backgroundColor:"#5f9ea0"},
                headerLeft: () => null
                }
                } />
                <Stack.Screen name="AlumnoInicio" component={AlumnoInicio} 
                options={{
                headerTitleAlign:'center',
                title: "Alumno",
                headerTintColor: "white",
                headerStyle: {backgroundColor:"#5f9ea0"},
                headerLeft: () => null
                }
                } />
                <Stack.Screen name="PreceptorInicio" component={PreceptorInicio} 
                options={{
                headerTitleAlign:'center',
                title: "Preceptor",
                headerTintColor: "white",
                headerStyle: {backgroundColor:"#5f9ea0"},
                headerLeft: () => null
                }
                } />
                <Stack.Screen name="CambioContra" component={CambioContra} 
                options={{
                headerTitleAlign:'center',
                title: "Preceptor",
                headerTintColor: "white",
                headerStyle: {backgroundColor:"#5f9ea0"},
                headerLeft: () => null
                }
                } />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

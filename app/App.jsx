import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Index from './index';
import MyInicio from './myInicio';
import ProfesorInicio from './ProfesorInicio';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Index" component={Index} 
                options={{
                headerTitleAlign:'center',
                title: "INICIO DE SESION",
                headerTintColor: "white",
                headerStyle: {backgroundColor:"#5f9ea0"}
                }
                } />
                <Stack.Screen name="MyInicio" component={MyInicio} 
                options={{
                headerTitleAlign:'center',
                title: "Directivos",
                headerTintColor: "white",
                headerStyle: {backgroundColor:"#5f9ea0"}
                }
                } />
                <Stack.Screen name="ProfesorInicio" component={ProfesorInicio} 
                options={{
                headerTitleAlign:'center',
                title: "Profesor",
                headerTintColor: "white",
                headerStyle: {backgroundColor:"#5f9ea0"}
                }
                } />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

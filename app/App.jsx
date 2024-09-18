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
                <Stack.Screen name="Index" component={Index} />
                <Stack.Screen name="MyInicio" component={MyInicio} />
                <Stack.Screen name="ProfesorInicio" component={ProfesorInicio} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/componentes/Sreen/login';
import directivos from './src/componentes/Sreen/directivos';
import preceptores from './src/componentes/Sreen/preceptores';


export default function App() {

  const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login}
      options={{
        headerTitleAlign:'center',
        title: "INICIO DE SESION",
        headerTintColor: "white",
        headerStyle: {backgroundColor:"#5f9ea0"}
      }
    }/>
      <Stack.Screen name="directivos" component={directivos} />
      <Stack.Screen name="preceptores" component={preceptores} />
    </Stack.Navigator>
  );
}

  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'left',
    justifyContent: 'margin',
  },
});

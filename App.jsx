import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
//import Login from "./src/componentes" ;
//import calendario from './src/componentes/calendario';
export default function App() {
  return (
    <View style={styles.container}>
      <Text>hol</Text>
      <StatusBar style="auto" />
    </View>
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

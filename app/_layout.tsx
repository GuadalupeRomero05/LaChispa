import { Stack } from "expo-router";
import { useState } from "react";
import { CreateSchoolContext } from '../context/CreateSchoolContext';
import { useFonts } from "expo-font";
import { ActivityIndicator } from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'outfit-Bold': require('./../assets/fonts/Outfit-Bold.ttf'),
    'outfit-Medium': require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit': require('./../assets/fonts/Outfit-Light.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const [schoolData, setSchoolData] = useState<any[]>([]);

  return (
    <CreateSchoolContext.Provider value={{ schoolData, setSchoolData }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="App" />
      </Stack>
    </CreateSchoolContext.Provider>
  );
}

import React, { useEffect } from "react";
// import the screens we want to navigate
import Start from "./components/Start";
import Chat from "./components/Chat";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font"; //import to use downloaded font family
import * as SplashScreen from "expo-splash-screen";

//using a downloaded font
SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();
const App = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/Poppins-Regular.ttf"),
  });
  useEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };

    hideSplashScreen();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

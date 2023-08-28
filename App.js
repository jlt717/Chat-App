import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import the screens we want to navigate
import React, { useCallback } from "react";
import Start from "./components/Start";
import Chat from "./components/Chat";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();
const App = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/Poppins-Regular.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer onLayout={onLayoutRootView}>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

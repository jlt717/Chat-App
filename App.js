import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import the screens we want to navigate
import Start from "./components/Start";
import Chat from "./components/Chat";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import { useFonts } from "react-native-google-fonts";

const Stack = createNativeStackNavigator();
const App = () => {
  // const [fontsLoaded] = useFonts({
  //   Poppins:
  //     "https://fonts.googleapis.com/css2?family=Oswald:wght@300&family=Poppins&display=swap",
  // });
  // if (!fontsLoaded) {
  //   return <Text>Loading...</Text>;
  // }
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

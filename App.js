import React, { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
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
  const firebaseConfig = {
    apiKey: "AIzaSyBspXdIhGCLmkD1JXSNrNEs0ChBFOiyjf8",
    authDomain: "chatterbox-2ab4e.firebaseapp.com",
    projectId: "chatterbox-2ab4e",
    storageBucket: "chatterbox-2ab4e.appspot.com",
    messagingSenderId: "864302327200",
    appId: "1:864302327200:web:84956f1e99799f14a0f0c5",
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

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
        <Stack.Screen name="Start">
          {(props) => <Start db={db} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

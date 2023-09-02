import { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

const backgroundColors = {
  darkGray: "#474056",
  blueGray: "#8A95A5",
  green: "#B9C6AE",
  almostBlack: "#090C08",
};

const Start = ({ navigation }) => {
  const auth = getAuth();
  const [name, setName] = useState("");
  const [color, setColor] = useState(backgroundColors.darkGray);

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          userID: result.user.uid,
          name,
          backgroundColor: color,
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        Alert.alert("Unable to sign in, try again later.");
      });
  };

  return (
    //prevents keyboard from blocking view
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/background-image.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <Text style={styles.appTitle}>Chatterbox</Text>
          <View style={styles.inputBox}>
            <View style={styles.iconContainer}>
              <Image
                source={require("../assets/icon.png")}
                style={styles.icon}
              />
            </View>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="     Type your username here"
            />
            <Text
              style={{
                textAlign: "left",
                fontFamily: "Poppins-Regular",
                color: "#000000",
                fontSize: 16,
                fontWeight: "300",
                paddingTop: 15,
                marginLeft: 20,
              }}
            >
              Choose Background Color:
            </Text>
            <View style={styles.colorSelector}>
              <TouchableOpacity
                //when a color is selected and clicked on it will be set as background color
                style={[
                  styles.colorChoice,
                  color === backgroundColors.almostBlack &&
                    styles.selectedCircle,
                  { backgroundColor: backgroundColors.almostBlack },
                ]}
                onPress={() => setColor(backgroundColors.almostBlack)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.colorChoice,
                  color === backgroundColors.darkGray && styles.selectedCircle,
                  { backgroundColor: backgroundColors.darkGray },
                ]}
                onPress={() => setColor(backgroundColors.darkGray)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.colorChoice,
                  color === backgroundColors.blueGray && styles.selectedCircle,
                  { backgroundColor: backgroundColors.blueGray },
                ]}
                onPress={() => setColor(backgroundColors.blueGray)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.colorChoice,
                  color === backgroundColors.green && styles.selectedCircle,
                  { backgroundColor: backgroundColors.green },
                ]}
                onPress={() => setColor(backgroundColors.green)}
              ></TouchableOpacity>
            </View>
            <View></View>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("Chat", {
                  name: name,
                  backgroundColor: color,
                })
              }
            >
              <TouchableOpacity style={styles.button} onPress={signInUser}>
                <Text style={styles.buttonText}>Start Chatting</Text>
              </TouchableOpacity>
            </TouchableOpacity>

            {/* {Platform.OS === "android" ? (
            <KeyboardAvoidingView behavior="height" />
          ) : null} */}
            {/* prevents keyboard from blocking view ios */}
            {/* {Platform.OS === "ios" ? (
            <KeyboardAvoidingView behavior="padding" />
          ) : null} */}
          </View>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "space-between",
    padding: "5%",
  },
  appTitle: {
    fontFamily: "Poppins-Regular",
    flex: 2,
    textAlign: "center",
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: 110,
  },
  inputBox: {
    flex: 1,
    backgroundColor: "#ABABAB",
    padding: "6%",
    flexBasis: 150,
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    fontSize: 16,
    width: "88%",
    borderColor: "#090C08",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    alignSelf: "center",
  },
  colorChoice: {
    height: 50,
    width: 50,
    //border radius of half the width fof an element will make a circle
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 10,
  },
  colorSelector: {
    flex: 1,
    //provides spacing between color circles
    justifyContent: "space-around",
    flexDirection: "row",
  },
  selectedCircle: {
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  button: {
    width: "88%",
    marginTop: 0,
    marginBottom: 0,
    padding: 8,
    //aligns button itself
    alignSelf: "center",
    //aligns text inside button
    alignItems: "center",
    color: "#FFFFFF",
    backgroundColor: "#757083",
  },
  buttonText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  iconContainer: {
    backgroundColor: "#ABABAB",
    position: "absolute",
    top: 53,
    left: 56,
    zIndex: 1, // makes icon appear above textInput
  },
  icon: {
    width: 28,
    height: 28,
  },
});

export default Start;

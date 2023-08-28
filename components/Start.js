import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

const backgroundColors = {
  darkGray: "#474056",
  blueGray: "#8A95A5",
  green: "#B9C6AE",
  almostBlack: "#090C08",
};

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState(backgroundColors.darkGray);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background-image.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.appTitle}>Chatterbox</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Type your username here"
          />
          <Text
            style={{
              textAlign: "left",
              color: "#000000",
              fontSize: 16,
              fontWeight: "300",
              paddingTop: 15,
            }}
          >
            Choose Background Color:
          </Text>
          <View style={styles.colorSelector}>
            <TouchableOpacity
              style={[
                styles.colorChoice,
                color === backgroundColors.almostBlack && styles.selectedCircle,
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
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("Chat", {
                name: name,
                backgroundColor: color,
              })
            }
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
          {Platform.OS === "android" ? (
            <KeyboardAvoidingView behavior="height" />
          ) : null}
        </View>
      </ImageBackground>
    </View>
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
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 10,
  },
  colorSelector: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  selectedCircle: {
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  button: {
    width: "88%",
    marginTop: 20,
    padding: 15,
    alignSelf: "center",
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
});

export default Start;

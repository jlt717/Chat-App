import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Chat = ({ route, navigation }) => {
  const { name, backgroundColor } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name, backgroundColor: backgroundColor });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Text style={styles.text}>Let's chat!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#FFFFFF",
  },
});

export default Chat;

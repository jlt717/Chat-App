import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
  Button,
  Image,
} from "react-native";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import CustomActions from "./CustomActions";

//extract db props from components props
const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const { name, backgroundColor, userID } = route.params;
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);

  let unsubMessages;

  useEffect(() => {
    navigation.setOptions({ title: name });
    if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when
      // useEffect code is re-executed.
      if (unsubMessages) unsubMessages();
      unsubMessages = null;
      //use onSnapshot listener on query for messages collection and orderBy to sort results
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
      //get cached messages if not connected
    } else loadCachedMessages();

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  //get messages
  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };
  //cache messages
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };
  // const pickImage = async () => {
  //   let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();

  //   if (permissions?.granted) {
  //     let result = await ImagePicker.launchImageLibraryAsync();

  //     if (!result.canceled) setImage(result.assets[0]);
  //     else setImage(null);
  //   }
  // };
  // const takePhoto = async () => {
  //   let permissions = await ImagePicker.requestCameraPermissionsAsync();

  //   if (permissions?.granted) {
  //     let result = await ImagePicker.launchCameraAsync();

  //     if (!result.canceled) {
  //       let mediaLibraryPermissions =
  //         await MediaLibrary.requestPermissionsAsync();

  //       if (mediaLibraryPermissions?.granted)
  //         await MediaLibrary.saveToLibraryAsync(result.assets[0].uri);

  //       setImage(result.assets[0]);
  //     } else setImage(null);
  //   }
  // };
  // const getLocation = async () => {
  //   let permissions = await Location.requestForegroundPermissionsAsync();

  //   if (permissions?.granted) {
  //     const location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //   } else {
  //     Alert.alert("Permissions to read location aren't granted");
  //   }
  // };
  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} {...props} />;
  };
  // useEffect(() => {
  //   navigation.setOptions({ title: name, backgroundColor: backgroundColor });
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: "Have a wonderful day!",
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: "React Native",
  //         avatar: "https://placeimg.com/140/140/any",
  //       },
  //     },
  //     {
  //       _id: 2,
  //       text: "You have entered the chat.",
  //       createdAt: new Date(),
  //       system: true, //creates a system message
  //     },
  //   ]);
  // }, []);

  // save sent messages on Firestore db
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  const renderInputToolbar = (props) => {
    // renderInputToolbar function
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };
  const renderBubble = (props) => {
    return (
      //color of text bubbles in chat
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name,
        }}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
      />

      {isConnected === true ? (
        <>
          {/* prevents keyboard from blocking view android */}
          {Platform.OS === "android" && (
            <KeyboardAvoidingView behavior="height" />
          )}
          {/* prevents keyboard from blocking view ios */}
          {Platform.OS === "ios" && <KeyboardAvoidingView behavior="padding" />}
        </>
      ) : null}
      {/* <Button title="Get my location" onPress={getLocation} />
      <Button title="Pick an image from the library" onPress={pickImage} />
      <Button title="Take a photo" onPress={takePhoto} /> */}

      {location && (
        <MapView
          style={{ width: 300, height: 200 }}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      )}
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 200, height: 200 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: "#FFFFFF",
  },
});

export default Chat;

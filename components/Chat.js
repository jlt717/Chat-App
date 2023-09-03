import React, { useState, useEffect } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
//extract db props from components props
const Chat = ({ route, navigation, db }) => {
  const { name, backgroundColor, userID } = route.params;
  const [messages, setMessages] = useState([]);
  //use onSnapshot listener on query for messages collection and orderBy to sort results
  useEffect(() => {
    navigation.setOptions({ title: name });
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach((doc) => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        });
      });
      setMessages(newMessages);
    });
    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);

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
  // const onSend = (newMessages) => {
  //   setMessages((previousMessages) =>
  //     GiftedChat.append(previousMessages, newMessages)
  //   );
  // };

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
      />
      {/* prevents keyboard from blocking view android */}
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
      {/* prevents keyboard from blocking view ios */}
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
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

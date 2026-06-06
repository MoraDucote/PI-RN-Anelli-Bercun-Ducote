import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { auth, db } from "../../firebase/config";


function NewPost() {
  const [descripcionPost, setDescripcionPost] = useState("");

  function onSubmit() {
    db.collection("posts").add({
      descripcionPost: descripcionPost,
      email: auth.currentUser.email,
      createdAt: Date.now(),
      likes: []
    })
    .then(() => {
      console.log("Post creado correctamente");
      setDescripcionPost("");
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <View style={styles.container}>
      <Text>Crear nuevo post</Text>

      <TextInput
        style={styles.input}
        placeholder="Escribí la descripción del post"
        keyboardType="default"
        onChangeText={(text) => setDescripcionPost(text)}
        value={descripcionPost}
        multiline={true}
      />

      <Pressable onPress={() => onSubmit()}>
        <Text>Crear post</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default NewPost;
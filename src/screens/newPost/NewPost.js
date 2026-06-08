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
      
      <View style={styles.header} >
        <Text style={styles.title}>Crear nuevo post</Text>
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="Escribí la descripción del post"
        keyboardType="default"
        onChangeText={(text) => setDescripcionPost(text)}
        value={descripcionPost}
        multiline={true}
      />

      <Pressable style={styles.button} onPress={() => onSubmit()}>
        <Text style={styles.buttonText}>PUBLICAR</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#26394b',
    paddingHorizontal: 20,
    paddingTop: 55
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18
  },

  title: {
    color: '#f2f0ec',
    fontSize: 30,
    letterSpacing: 3,
    fontWeight: '600',
    marginBottom: 8
  },

  input: {
    backgroundColor: '#f2f0ec',
    minHeight: 150,
    borderRadius: 10,
    padding: 16,
    color: '#26394b',
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 15
  },

  button: {
    backgroundColor: '#40586d',
    borderWidth: 1,
    borderColor: '#5e788d',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center'
  },

  buttonText: {
    color: '#f2f0ec',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 4
  },
});

export default NewPost;
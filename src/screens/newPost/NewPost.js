import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";

function NewPost() {
  return (
    <View style={styles.container}>
      <Text>Nuevo post</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default NewPost;
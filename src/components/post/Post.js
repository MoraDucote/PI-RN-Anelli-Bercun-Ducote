import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

function Post(props) {
  return (
    <View style={styles.container}>
      <Text>Post</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});

export default Post;
import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";

function Login() {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Login;
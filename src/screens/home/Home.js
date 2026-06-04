import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

function Home() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
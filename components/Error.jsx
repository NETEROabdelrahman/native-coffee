import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useGlobalContext } from "../context";

const Error = () => {
  const { signUpErrorMsg } = useGlobalContext();
  return (
    <View style={[styles.container, styles.horizontal]}>
      <Text style={{ color: "red", fontSize: 20 }}>{signUpErrorMsg}</Text>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

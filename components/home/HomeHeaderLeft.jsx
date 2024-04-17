import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useGlobalContext } from "../../context";

const HomeHeaderLeft = () => {
  const { dimensions } = useGlobalContext();

  return (
    <View style={styles.header}>
      <Text
        style={[
          styles.headerText1,
          { fontSize: Math.floor(dimensions.window.height / 30) },
        ]}
      >
        Location
      </Text>
      <Text
        style={[
          styles.headerText2,
          { fontSize: Math.floor(dimensions.window.height / 25) },
        ]}
      >
        Cairo, Egypt
      </Text>
    </View>
  );
};

export default HomeHeaderLeft;

const styles = StyleSheet.create({
  headerText1: {
    color: "#B7B7B7",
    //fontSize:25
  },
  headerText2: {
    color: "#DDDDDD",
    //fontSize:35
  },
});

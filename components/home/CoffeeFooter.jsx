import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const CoffeeFooter = () => {
  return (
    <View style={styles.footer}>
      <Icon name="home" size={20} color="#8D8D8D" />
      <Icon name="heart" size={20} color="#8D8D8D" />
      <Icon name="shopping-bag" size={20} color="#8D8D8D" />
      <Icon name="bell" size={20} color="#8D8D8D" />
    </View>
  );
};

export default CoffeeFooter;

const styles = StyleSheet.create({
  footer: {
    flex: 1 / 10,
    backgroundColor: "white",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
});

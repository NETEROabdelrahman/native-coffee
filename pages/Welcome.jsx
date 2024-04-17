import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";

const Welcome = ({ navigation }) => {
  const { dimensions } = useGlobalContext();

  return (
    <SafeAreaView style={[styles.bold, styles.container]}>
      <Image style={styles.image} source={require("../assets/image 3.png")} />
      <View
        style={{
          flex: 3 / 9,
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text
          style={[
            styles.text,
            { fontSize: Math.floor(dimensions.window.width / 15), padding: 5 },
          ]}
        >
          Coffee so good, your taste buds will love it.
        </Text>
        <Text
          style={[
            styles.text2,
            { fontSize: Math.floor(dimensions.window.width / 18), padding: 5 },
          ]}
        >
          The best grain, the finest roast, the powerful flavor.
        </Text>
        <TouchableOpacity
          style={[
            styles.button,
            {
              padding: dimensions.window.width / 15,
            },
          ]}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text
            style={[styles.text, { fontSize: dimensions.window.width / 15 }]}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: "black",
  },
  bold: {
    fontFamily: "sora-bold",
  },
  image: {
    resizeMode: "cover",
    width: "auto",
    flex: 5 / 9,
  },
  text: {
    color: "white",
    fontFamily: "Sora-SemiBold",
    textAlign: "center",
    //marginHorizontal: 30,
  },
  text2: {
    color: "#A9A9A9",
    fontFamily: "Sora-Regular",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#C67C4E",
    // margin: 30,
    //padding: 20,
    borderRadius: 10,
  },
});

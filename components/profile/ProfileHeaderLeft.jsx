import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AppState,
  AppRegistry,
} from "react-native";
import React from "react";
import { useGlobalContext } from "../../context";

const ProfileHeaderLeft = () => {
  const { dimensions, profileData, signOut } = useGlobalContext();

  return (
    <View style={styles.header}>
      <Text
        style={[
          styles.headerText2,
          { fontSize: Math.floor(dimensions.window.height / 25) },
        ]}
      >
        Hi, {profileData?.username}
      </Text>
      <TouchableOpacity
        onPress={() => {
          signOut();
        }}
        style={{
          backgroundColor: "#C67C4E",
          borderRadius: 5,
          paddingVertical: 5,
          // paddingHorizontal: 15,
          margin: 5,
        }}
      >
        <Text
          style={[
            styles.headerText1,
            { fontSize: Math.floor(dimensions.window.height / 40) },
          ]}
        >
          logout?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeaderLeft;

const styles = StyleSheet.create({
  headerText1: {
    color: "white",
    textAlign: "center",

    //fontSize:25
  },
  headerText2: {
    color: "#0c0a0a",
    //fontSize:35
  },
});

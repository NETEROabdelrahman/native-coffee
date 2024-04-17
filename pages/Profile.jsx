import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import { useGlobalContext } from "../context";
import HomeHeaderRight from "../components/home/HomeHeaderRight";
import ProfileHeaderLeft from "../components/profile/ProfileHeaderLeft";
import Orders from "../components/profile/Orders";

const Profile = () => {
  const { profileData, signOut, dimensions } = useGlobalContext();
  return (
    <SafeAreaView style={{ flexDirection: "column" }}>
      <View
        style={[
          styles.header,
          {
            padding: Math.floor(dimensions.window.width / 20),
            marginTop: Math.floor(dimensions.window.width / 40),
          },
        ]}
      >
        <ProfileHeaderLeft />
        <HomeHeaderRight />
      </View>
      <Orders />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(19, 19, 19, 1)",
    flex: 1,
  },

  header: {
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  scroll: {
    flex: 6 / 10,
    backgroundColor: "#eff4fb",
  },
});

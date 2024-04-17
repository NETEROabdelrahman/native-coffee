import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  Image,
} from "react-native";

import HomeHeaderLeft from "../components/home/HomeHeaderLeft";
import HomeHeaderRight from "../components/home/HomeHeaderRight";
import CoffeeSlider from "../components/home/CoffeeSlider";
import CoffeeCard from "../components/home/CoffeeList";
import CoffeeSearch from "../components/home/CoffeeSearch";
import CoffeeFooter from "../components/home/CoffeeFooter";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context";

const Home = () => {
  const {
    dimensions,
    findCoffees,
    coffees,
    findCategories,
    fetchProfile,
    profileData,
  } = useGlobalContext();

  useEffect(() => {
    findCoffees();
    findCategories();
    fetchProfile();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View
        style={[
          styles.header,
          {
            padding: Math.floor(dimensions.window.width / 20),
            marginTop: Math.floor(dimensions.window.width / 40),
          },
        ]}
      >
        <HomeHeaderLeft />
        <HomeHeaderRight />
      </View>
      <CoffeeSearch />

      <View style={styles.scroll}>
        <CoffeeSlider />
        <CoffeeCard />
      </View>
      <CoffeeFooter />
    </SafeAreaView>
  );
};

export default Home;

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
    flex: 1 / 10,
  },
  scroll: {
    flex: 6 / 10,
    backgroundColor: "#eff4fb",
  },
});

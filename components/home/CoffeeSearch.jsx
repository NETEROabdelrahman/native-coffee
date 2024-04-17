import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useGlobalContext } from "../../context";

const CoffeeSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const {
    dimensions,
    coffees,
    filteredCoffees,
    setFilteredCoffees,
    searchTimeout,
    setSearchTimeout,
  } = useGlobalContext();

  const searching = (data, searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return data.filter((item) => regex.test(item.title));
  };

  const handleSearchChange = (text) => {
    clearTimeout(searchTimeout);
    setSearchValue(text);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = searching(
          coffees?.data.map((coffee) => coffee.attributes),
          text
        );
        setFilteredCoffees(searchResult);
      }, 500)
    );
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={[
        styles.view,
        { minHeight: Math.floor(dimensions.window.height / 30) },
      ]}
    >
      {/* <Icon name="search" size={20} color="#FFFFFF" style={styles.iconLeft} /> */}
      {/* <Image
        source={require("../../assets/Frame 4.png")}
        style={styles.iconRight}
      /> */}
      <TextInput
        // inlineImageLeft="../../assets/Frame 15.png"
        value={searchValue}
        onChangeText={(text) => handleSearchChange(text)}
        style={[
          styles.input,
          { height: Math.floor(dimensions.window.height / 14) },
        ]}
        placeholder="search coffee"
        placeholderTextColor="#989898"
        inputMode="search"
      />
    </KeyboardAvoidingView>
  );
};

export default CoffeeSearch;

const styles = StyleSheet.create({
  view: {
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 2 / 10,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    paddingLeft: 60,
    borderRadius: 10,
    backgroundColor: "#313131",
    color: "#989898",
    fontSize: 15,
  },
  iconLeft: {
    width: 50,
    height: 50,
    position: "absolute",
    zIndex: 5,
    left: 60,
    top: "45%",
  },
  iconRight: {
    width: 50,
    height: 50,
    position: "absolute",
    zIndex: 5,
    right: 55,
    top: "10%",
  },
});

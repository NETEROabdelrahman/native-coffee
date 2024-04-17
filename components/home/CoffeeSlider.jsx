import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useGlobalContext } from "../../context";

const CoffeeSlider = () => {
  const {
    dimensions,
    coffees,
    categories,
    filteredCoffees,
    setFilteredCoffees,
    setSearchTimeout,
    searchTimeout,
  } = useGlobalContext();
  const [active, setActive] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");
  //console.log(coffees);
  // const uniqueCategories = Array.from(
  //   new Set(coffees?.map((coffee) => coffee.category))
  // );

  const searching = (data, searchtext) => {
    //console.log(data);
    const regex = new RegExp(searchtext, "i");
    return data.filter((item) =>
      regex.test(item.category.data.attributes.categoryName)
    );
  };

  const handleSearchChange = (text) => {
    //clearTimeout(searchTimeout);
    setActiveCategory(text);
    const searchResult = searching(
      coffees?.data.map((coffee) => coffee.attributes),
      text
    );
    setFilteredCoffees(searchResult);
    // debounce method
    // setSearchTimeout(
    //   setTimeout(() => {
    //     const searchResult = searching(coffees,text);
    //     setFilteredCoffees(searchResult);
    //   }, 500)
    // );
  };

  return (
    <SafeAreaView>
      <Image
        source={require("../../assets/Frame 17.png")}
        style={[
          styles.promoImage,
          {
            height: Math.floor(dimensions.window.height / 8),
            top: Math.floor(dimensions.window.height / -25),
          },
        ]}
      />
      <FlatList
        ItemSeparatorComponent={<Text style={styles.separator}></Text>}
        style={[
          styles.flat,
          { top: Math.floor(dimensions.window.height / -30) },
        ]}
        data={categories?.data?.map((atr) => atr.attributes.categoryName)}
        horizontal
        renderItem={(item) => {
          //console.log(item.index);
          return (
            <TouchableOpacity
              key={item.index}
              onPress={() => {
                setActive(item.index);
                handleSearchChange(item.item);
              }}
              style={
                item.index == active
                  ? [
                      styles.active,
                      {
                        padding: Math.floor(dimensions.window.width / 30),
                      },
                    ]
                  : [
                      styles.textWrapper,
                      {
                        padding: Math.floor(dimensions.window.width / 30),
                      },
                    ]
              }
            >
              <Text
                style={[
                  styles.text,
                  { fontSize: Math.floor(dimensions.window.width / 30) },
                ]}
              >
                {item.item}{" "}
              </Text>
            </TouchableOpacity>
          );
        }}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default CoffeeSlider;

const styles = StyleSheet.create({
  flat: {
    marginHorizontal: 20,
    marginTop: 0,
  },
  textWrapper: {
    backgroundColor: "#ffffff",
    color: "black",
    justifyContent: "center",
    alignContent: "center",

    borderRadius: 10,
  },
  active: {
    backgroundColor: "#C67C4E",
    color: "black",
    borderRadius: 10,
  },
  text: {
    color: "black",
  },
  separator: {
    width: 15,
  },
  promoImage: {
    resizeMode: "contain",
    width: "auto",
    //top: -100,
  },
});

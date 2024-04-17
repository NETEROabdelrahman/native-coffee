import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context";

const Coffee = () => {
  const { dimensions } = useGlobalContext();

  //const { statusBarColor, setStatusBarColor } = useGlobalContext();
  //console.log(statusBarColor);

  // useEffect(() => {
  //   setStatusBarColor("dark");
  // }, []);

  const [active, setActive] = useState("M");
  const navigation = useNavigation();

  const route = useRoute();
  const item = route.params;

  return (
    <ScrollView
      style={[
        styles.container,
        { paddingHorizontal: Math.floor(dimensions.window.width / 24) },
      ]}
    >
      <View style={styles.imageWrapper}>
        <Image
          style={[
            styles.image,
            { height: Math.floor(dimensions.window.height / 4) },
          ]}
          source={{ uri: item.image }}
        />
      </View>
      <Text
        style={[
          styles.title,
          { fontSize: Math.floor(dimensions.window.height / 30) },
        ]}
      >
        {item.title}
      </Text>
      <Text>
        {item.ingredients.map((ing, i) => (
          <View key={i} style={{ flexDirection: "row" }}>
            <Text style={styles.ingredients}>{ing}</Text>
            <Text>{i !== item.ingredients.length - 1 && <Text> - </Text>}</Text>
          </View>
        ))}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={[
            styles.rate,
            { fontSize: Math.floor(dimensions.window.height / 70) },
          ]}
        >
          <Icon name="star" size={20} color="gold" />
          <Text
            style={[
              styles.icon,
              { fontSize: Math.floor(dimensions.window.width / 20) },
            ]}
          >
            {item.rating}
          </Text>
        </Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity>
            <Image source={require("../assets/Frame 19.png")} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require("../assets/Frame 20.png")} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#9b9b9b78",
          marginVertical: Math.floor(dimensions.window.height / 70),
        }}
      ></View>
      <View style={styles.des}>
        <Text style={styles.title}>Description</Text>
        <Text
          style={[
            styles.ingredients,
            { fontSize: Math.floor(dimensions.window.width / 25) },
          ]}
        >
          {item.description}
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View style={{ gap: 10, marginTop: 15 }}>
          <Text style={styles.title}>Size</Text>
          <View style={styles.sizes}>
            <TouchableOpacity
              style={
                active == "S"
                  ? [
                      styles.active,
                      {
                        paddingHorizontal: Math.floor(
                          dimensions.window.width / 10
                        ),
                        paddingVertical: Math.floor(
                          dimensions.window.width / 20
                        ),
                      },
                    ]
                  : [
                      styles.size,
                      {
                        paddingHorizontal: Math.floor(
                          dimensions.window.width / 10
                        ),
                        paddingVertical: Math.floor(
                          dimensions.window.width / 20
                        ),
                      },
                    ]
              }
              onPress={() => setActive("S")}
            >
              <Text>S</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                active == "M"
                  ? [
                      styles.active,
                      {
                        paddingHorizontal: Math.floor(
                          dimensions.window.width / 10
                        ),
                        paddingVertical: Math.floor(
                          dimensions.window.width / 20
                        ),
                      },
                    ]
                  : [
                      styles.size,
                      {
                        paddingHorizontal: Math.floor(
                          dimensions.window.width / 10
                        ),
                        paddingVertical: Math.floor(
                          dimensions.window.width / 20
                        ),
                      },
                    ]
              }
              onPress={() => setActive("M")}
            >
              <Text>M</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                active == "L"
                  ? [
                      styles.active,
                      {
                        paddingHorizontal: Math.floor(
                          dimensions.window.width / 10
                        ),
                        paddingVertical: Math.floor(
                          dimensions.window.width / 20
                        ),
                      },
                    ]
                  : [
                      styles.size,
                      {
                        paddingHorizontal: Math.floor(
                          dimensions.window.width / 10
                        ),
                        paddingVertical: Math.floor(
                          dimensions.window.width / 20
                        ),
                      },
                    ]
              }
              onPress={() => setActive("L")}
            >
              <Text>L</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[
            styles.footer,
            { marginTop: Math.floor(dimensions.window.width / 10) },
          ]}
        >
          <View>
            <Text style={styles.ingredients}>Price</Text>
            <Text
              style={[
                styles.price,
                { fontSize: Math.floor(dimensions.window.width / 10) },
              ]}
            >
              ${" "}
              {active == "S"
                ? item.price
                : active == "M"
                ? item.price * 1.25
                : item.price * 1.5}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.btn,
              {
                paddingHorizontal: Math.floor(dimensions.window.width / 8),
                paddingVertical: Math.floor(dimensions.window.width / 12),
              },
            ]}
            onPress={() => navigation.navigate("order", { item, active })}
          >
            <Text style={styles.btnText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Coffee;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingHorizontal: 30,
    backgroundColor: "#e4edfa1b",
  },
  imageWrapper: {
    alignItems: "center",
    marginTop: 0,
  },
  image: {
    resizeMode: "contain",
    width: "100%",
    // height: 400,
    borderRadius: 10,
    justifyContent: "center",
  },
  title: {
    //fontSize: 36,
    fontFamily: "Sora-SemiBold",
  },
  ingredients: {
    //fontSize: 18,
    fontFamily: "Sora-Regular",
    color: "#9b9b9b",
  },
  rate: {
    fontFamily: "Sora-SemiBold",
    //fontSize: 18,
    color: "#2F4B4E",
  },
  icon: {
    margin: 10,
    fontSize: 30,
  },
  des: {
    gap: 10,
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  size: {
    borderColor: "#9b9b9b78",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 50,
    //paddingHorizontal: 50,
    //paddingVertical: 20,
  },
  active: {
    backgroundColor: "#c67c4e28",
    borderColor: "#C67C4E",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 50,
    //paddingHorizontal: 50,
    //paddingVertical: 20,
  },
  footer: {
    justifyContent: "space-around",
    // alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
    //minHeight: 200,
    alignItems: "flex-end",
    flex: 1,
  },
  price: {
    color: "#C67C4E",
    //fontSize: 40,
    fontFamily: "sora-bold",
  },
  btn: {
    backgroundColor: "#C67C4E",
    // paddingHorizontal: 80,
    //paddingVertical: 30,
    borderRadius: 10,
  },
  btnText: {
    color: "white",
    fontFamily: "sora-bold",
    //fontSize: 20,
  },
});

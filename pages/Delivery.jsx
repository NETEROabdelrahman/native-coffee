import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  PanResponder,
  TouchableOpacity,
  Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { useRef, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import { useGlobalContext } from "../context";

const Delivery = ({ navigation }) => {
  const { dimensions } = useGlobalContext();

  const [viewHeight, setViewHeight] = useState(140);

  const panResponder = useRef(
    PanResponder.create({
      //onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy < -1) {
          setViewHeight(viewHeight - gestureState.dy);
        } else {
          setViewHeight((prev) => prev - gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < -100) {
          setViewHeight(400);
        } else {
          setViewHeight(140);
        }
      },
    })
  ).current;

  //console.log(panResponder.panHandlers)

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          backgroundColor: "white",
          position: "absolute",
          width: Math.floor(dimensions.window.width / 9),
          height: Math.floor(dimensions.window.width / 9),
          zIndex: 10,
          top: Math.floor(dimensions.window.width / 9),
          left: 50,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
        }}
      >
        <Icon
          name="chevron-back"
          size={25}
          color="black"
          style={styles.iconLeft}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "white",
          position: "absolute",
          width: Math.floor(dimensions.window.width / 9),
          height: Math.floor(dimensions.window.width / 9),
          zIndex: 10,
          top: Math.floor(dimensions.window.width / 9),
          right: 50,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
        }}
      >
        <Icon name="locate" size={25} color="black" style={styles.iconLeft} />
      </TouchableOpacity>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 30.0444,
          longitude: 31.2357,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <View
        {...panResponder.panHandlers}
        style={{
          height: viewHeight,
          backgroundColor: "white",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          width: "100%",
          position: "absolute",
          zIndex: 10,
          bottom: 0,
          left: 0,
          alignItems: "center",
        }}
      >
        <View style={{ alignItems: "center", flex: 0 }}>
          <View
            style={{
              width: 50,
              height: 3,
              backgroundColor: "#EAEAEA",
              marginTop: 10,
            }}
          ></View>
          <Text
            style={{
              fontFamily: "sora-bold",
              fontSize: 20,
              marginTop: 10,
            }}
          >
            10 minutes left
          </Text>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text
              style={{
                fontFamily: "Sora-Light",
                fontSize: 20,
                marginTop: 10,
                color: "#433f3f",
              }}
            >
              Delivery to
            </Text>
            <Text
              style={{
                fontFamily: "sora-bold",
                fontSize: 20,
                marginTop: 10,
              }}
            >
              Abdelrahman Adel
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 20,
              marginVertical: 20,
            }}
          >
            {[1, 2, 3, 4].map((a, i) => (
              <View
                key={i}
                style={{
                  width: Math.floor(dimensions.window.width / 6),
                  height: 4,
                  backgroundColor: i == 3 ? "#EAEAEA" : "#19a22f",
                  marginTop: 10,
                }}
              ></View>
            ))}
          </View>
          <View
            style={{
              // height: 50,
              width: "80%",
              borderRadius: 10,
              borderColor: "#EAEAEA",
              borderStyle: "solid",
              borderWidth: 2,
              padding: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Icon2
              name="directions-bike"
              size={25}
              color="#C67C4E"
              style={{
                borderRadius: 10,
                borderColor: "#EAEAEA",
                borderStyle: "solid",
                borderWidth: 2,
                width: 60,
                height: 60,
                textAlign: "center",
                textAlignVertical: "center",
              }}
            />
            <View style={{ gap: 5 }}>
              <Text style={{ fontFamily: "Sora-SemiBold", fontSize: 20 }}>
                Delivered your order
              </Text>
              <Text style={{ color: "#808080" }}>
                We deliver your goods to you in the shortes possible time.
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 20,
            alignItems: "center",
            width: "80%",
            flex: 1,
          }}
        >
          <View style={{ flexDirection: "row", gap: 20 }}>
            <TouchableOpacity style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require("../assets/5098.jpg")}
              />
            </TouchableOpacity>
            <View style={{ gap: 5 }}>
              <Text style={{ fontFamily: "Sora-SemiBold", fontSize: 30 }}>
                John Doe
              </Text>
              <Text style={{ color: "#808080" }}>Personal Courier</Text>
            </View>
          </View>
          <Icon2
            name="call"
            size={25}
            color="grey"
            style={{
              borderRadius: 10,
              borderColor: "#EAEAEA",
              borderStyle: "solid",
              borderWidth: 2,
              width: 60,
              height: 60,
              textAlign: "center",
              textAlignVertical: "center",
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Delivery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: 60,
    height: 60,
  },
  image: {
    resizeMode: "cover",
    width: 60,
    height: 60,
    borderRadius: 10,
  },
});

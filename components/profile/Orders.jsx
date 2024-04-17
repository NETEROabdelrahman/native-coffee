import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useGlobalContext } from "../../context";

const Orders = () => {
  const { dimensions, profileData } = useGlobalContext();

  // const timestamp = profileData?.orders[0].createdAt;
  // const date = new Date(timestamp);

  // const formattedDate = date
  //   .toLocaleDateString("en-GB", {
  //     year: "numeric",
  //     month: "2-digit",
  //     day: "2-digit",
  //   })
  //   .replace(/\//g, "-");

  // const formattedTime = date.toLocaleTimeString("en-US", {
  //   hour12: false,
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   second: "2-digit",
  // });

  // const transformedTimestamp = `${formattedDate}/${formattedTime}`;

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{
          fontSize: Math.floor(dimensions.window.width / 20),
          fontFamily: "sora-bold",
        }}
      >
        your orders
      </Text>
      <View
        style={{
          justifyContent: "space-around",
          flexDirection: "row",
          width: "100%",
          marginVertical: 10,
        }}
      >
        <Text>product</Text>
        <Text>ordered at</Text>
        <Text>track</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{
          marginHorizontal: Math.floor(dimensions.window.width / 30),
        }}
        data={profileData?.orders}
        renderItem={(item) => {
          return (
            <View
              style={{
                justifyContent: "space-around",
                flexDirection: "row",
                width: "100%",
                marginVertical: 10,
              }}
            >
              <Text>
                {item.item.details[0].quantity} {item.item.details[0].drink}
              </Text>
              <Text>{item.item.createdAt}</Text>
              <Text style={{ color: "blue" }}>track</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({});

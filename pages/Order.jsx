import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Ionicons";
import Icon3 from "react-native-vector-icons/Entypo";
import { useGlobalContext } from "../context";

const Order = () => {
  const { dimensions, makeOrder, orderData, setorderData } = useGlobalContext();

  const navigation = useNavigation();
  const route = useRoute();
  const { item, active } = route.params;

  const [activePick, setActivePick] = useState("pick up");
  const [orderValue, setOrderValue] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const pickOrderData = () => {
    setorderData({
      drink: item?.title,
      quantity: orderValue,
      size: active == "S" ? "small" : active == "M" ? "medium" : "large",
    });
  };

  useEffect(() => {
    pickOrderData();
  }, [item, orderValue, activePick]);

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          flex: 1 / 2,
          justifyContent: "space-between",
          paddingHorizontal: Math.floor(dimensions.window.width / 20),
        }}
      >
        <View
          style={[
            styles.pickContainer,
            { height: Math.floor(dimensions.window.height / 15) },
          ]}
        >
          <TouchableOpacity
            style={activePick == "pick up" ? styles.pickActive : styles.pick}
            onPress={() => setActivePick("pick up")}
          >
            <Text
              style={
                activePick == "pick up"
                  ? styles.pickTextActive
                  : styles.pickText
              }
            >
              Pick up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={activePick == "delivery" ? styles.pickActive : styles.pick}
            onPress={() => setActivePick("delivery")}
          >
            <Text
              style={
                activePick == "delivery"
                  ? styles.pickTextActive
                  : styles.pickText
              }
            >
              Deliver
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.address}>
          <Text
            style={{ fontSize: 30, fontFamily: "sora-bold", paddingBottom: 10 }}
          >
            Delivery Address
          </Text>
          <Text style={{ fontSize: 22, fontFamily: "Sora-Medium" }}>
            Cairo, Egypt
          </Text>
          <Text
            style={{
              fontSize: 17,
              fontFamily: "Sora-Medium",
              color: "#808080",
            }}
          >
            Bldg. No. 117, El-Gaafareya and Meya St.
          </Text>
          <View style={{ flexDirection: "row", marginTop: 10, gap: 15 }}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                gap: 7,
                borderStyle: "solid",
                borderColor: "#DEDEDE",
                borderWidth: 1,
                padding: 10,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon
                name="edit"
                size={15}
                color="black"
                style={styles.iconLeft}
              />
              <Text style={{ fontSize: 20 }}>Edit Address</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                gap: 7,
                borderStyle: "solid",
                borderColor: "#DEDEDE",
                borderWidth: 1,
                padding: 10,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon
                name="sticky-note-o"
                size={15}
                color="black"
                style={styles.iconLeft}
              />
              <Text style={{ fontSize: 20 }}>Add Note</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#DEDEDE",
            marginVertical: 20,
          }}
        ></View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Image style={styles.image} source={{ uri: item.image }} />
          <View>
            <Text
              style={{
                fontSize: Math.floor(dimensions.window.width / 20),
                fontFamily: "sora-bold",
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                fontSize: Math.floor(dimensions.window.width / 30),
                fontFamily: "Sora-Regular",
                color: "#9B9B9B",
              }}
            >
              {active == "S" ? "Small" : active == "M" ? "Medium" : "Large"}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: Math.floor(dimensions.window.width / 40),
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (orderValue > 1) setOrderValue((prev) => prev - 1);
              }}
              style={{
                borderStyle: "solid",
                borderColor: "#DEDEDE",
                borderWidth: 1,
                borderRadius: 50,
                width: Math.floor(dimensions.window.width / 8),
                height: Math.floor(dimensions.window.width / 8),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 30 }}>-</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 30 }}> {orderValue}</Text>
            <TouchableOpacity
              onPress={() => setOrderValue((prev) => prev + 1)}
              style={{
                borderStyle: "solid",
                borderColor: "#DEDEDE",
                borderWidth: 1,
                borderRadius: 50,
                width: Math.floor(dimensions.window.width / 8),
                height: Math.floor(dimensions.window.width / 8),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 30 }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          height: 3,
          width: "100%",
          backgroundColor: "#DEDEDE",
          marginVertical: 20,
        }}
      ></View>
      <View
        style={{
          flex: 3 / 8,
          justifyContent: "space-between",
          paddingHorizontal: 30,
        }}
      >
        <View
          style={{
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: 10,
            width: "100%",
            height: 60,
            borderStyle: "solid",
            borderColor: "#F2F2F2",
            borderWidth: 2,
          }}
        >
          <Icon
            name="money"
            size={25}
            color="#C67C4E"
            style={styles.iconLeft}
          />
          <Text
            style={{
              fontSize: Math.floor(dimensions.window.height / 35),
              fontFamily: "Sora-SemiBold",
            }}
          >
            1 Discount is Applied
          </Text>
          <Icon
            name="arrow-right"
            size={25}
            color="black"
            style={styles.iconLeft}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 25,
              fontFamily: "Sora-SemiBold",
              marginVertical: 10,
            }}
          >
            Payment Summary
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 7,
            }}
          >
            <Text style={{ fontSize: 20, fontFamily: "Sora-Medium" }}>
              Price
            </Text>
            <Text style={{ fontSize: 20, fontFamily: "sora-bold" }}>
              ${" "}
              {active == "S"
                ? item.price * orderValue
                : active == "M"
                ? item.price * 1.25 * orderValue
                : item.price * 1.5 * orderValue}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 7,
            }}
          >
            <Text style={{ fontSize: 20, fontFamily: "Sora-Medium" }}>
              Delivery fee
            </Text>
            <Text style={{ fontSize: 20, fontFamily: "sora-bold" }}>$ 1</Text>
          </View>
        </View>
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#DEDEDE",
            marginVertical: 20,
          }}
        ></View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 20,
          }}
        >
          <Text style={{ fontSize: 20, fontFamily: "Sora-Medium" }}>
            Total Payment
          </Text>
          <Text style={{ fontSize: 20, fontFamily: "sora-bold" }}>
            ${" "}
            {active == "S"
              ? item.price * orderValue + 1
              : active == "M"
              ? item.price * 1.25 * orderValue + 1
              : item.price * 1.5 * orderValue + 1}
          </Text>
        </View>
      </View>
      <View
        style={{ flex: 1.75 / 8, backgroundColor: "white", borderRadius: 30 }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 30,
            paddingVertical: 10,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              gap: 5,
            }}
          >
            <Icon2
              name="cash"
              size={20}
              color="#C67C4E"
              style={styles.iconLeft}
            />
            <View
              style={{
                backgroundColor: "#F2F2F2",
                borderRadius: 20,
                flexDirection: "row",
                justifyContent: "center",
                width: "40%",
                height: 40,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#C67C4E",
                  borderRadius: 20,
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 4,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "sora-bold",
                    fontSize: 15,
                  }}
                >
                  Cash
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderRadius: 20,
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 4,
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontFamily: "sora-bold",
                    fontSize: 15,
                  }}
                >
                  ${" "}
                  {active == "S"
                    ? item.price * orderValue + 1
                    : active == "M"
                    ? item.price * 1.25 * orderValue + 1
                    : item.price * 1.5 * orderValue + 1}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Icon3
            name="dots-three-horizontal"
            size={20}
            color="white"
            style={{
              backgroundColor: "#808080",
              width: 30,
              height: 30,
              borderRadius: 30,
              padding: 5,
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.btnText}>Order</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Order this for sure?</Text>
            <View style={{ flexDirection: "row", gap: 30 }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  navigation.navigate("delivery");
                  setModalVisible(!modalVisible);
                  makeOrder();
                }}
              >
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>No</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7f9",
  },
  pickContainer: {
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    width: "100%",
    //height: 60,
  },
  pick: {
    borderRadius: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
  },
  pickActive: {
    backgroundColor: "#C67C4E",
    borderRadius: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
  },
  pickText: {
    color: "black",
    fontFamily: "sora-bold",
    fontSize: 20,
  },
  pickTextActive: {
    color: "white",
    fontFamily: "sora-bold",
    fontSize: 20,
  },
  address: {
    marginVertical: 30,
  },
  image: {
    borderRadius: 15,
    width: "15%",
    height: 100,
    resizeMode: "center",
  },
  btn: {
    backgroundColor: "#C67C4E",
    marginHorizontal: 30,
    marginVertical: 10,
    padding: 30,
    borderRadius: 10,
  },
  btnText: {
    color: "white",
    fontFamily: "sora-bold",
    fontSize: 20,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 25,
    elevation: 2,
    backgroundColor: "#C67C4E",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#C67C4E",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "sora-bold",
    fontSize: 30,
  },
});

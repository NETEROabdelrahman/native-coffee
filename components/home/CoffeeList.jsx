import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useGlobalContext } from "../../context";

const CoffeeList = () => {
  const { dimensions, coffees, filteredCoffees } = useGlobalContext();
  // console.log(filteredCoffees);
  // console.log(coffees?.data.map((atr) => atr.attributes));
  const navigation = useNavigation();

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={{
        //marginTop: Math.floor(dimensions.window.height / 25),
        marginHorizontal: Math.floor(dimensions.window.width / 30),
      }}
      data={
        filteredCoffees.length > 0
          ? filteredCoffees
          : coffees?.data.map((atr) => atr.attributes)
      }
      numColumns={2}
      //keyExtractor={(item) => item.id}
      columnWrapperStyle={styles.columnWrapperStyle}
      renderItem={(item) => {
        return (
          <View key={item.index} style={styles.card}>
            <View style={styles.ratingContainer}>
              <Icon
                name="star"
                size={20}
                color="gold"
                style={styles.iconLeft}
              />
              <Text style={styles.rating}>{item.item.rating}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("coffee", item.item);
              }}
            >
              <Image
                style={styles.image}
                source={{ uri: item.item.image }}
                height={Math.floor(dimensions.window.height / 5)}
              />
            </TouchableOpacity>
            <Text style={styles.title}>{item.item.title}</Text>
            <Text style={styles.ingredients}>
              {item.item.ingredients.map((ing, i) => (
                <View key={i} style={{ flexDirection: "row" }}>
                  <Text>{ing}</Text>
                  <Text>
                    {i !== item.item.ingredients.length - 1 && <Text> - </Text>}
                  </Text>
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
              <Text style={styles.price}>$ {item.item.price}</Text>
              <TouchableOpacity>
                <Image source={require("../../assets/Frame 15.png")} />
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    />
  );
};

export default CoffeeList;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: "center",
  },
  columnWrapperStyle: {
    gap: 10,
    borderRadius: 10,
  },
  image: {
    borderRadius: 10,
    width: "100%",
    resizeMode: "cover",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    zIndex: 5,
    top: 11,
    left: 11,
    gap: 15,
    backgroundColor: "#144b864c",
    padding: 5,
    borderBottomRightRadius: 10,
    borderTopStartRadius: 10,
  },
  rating: {
    color: "white",
    fontSize: 15,
  },
  title: {
    fontSize: 16,
    fontFamily: "Sora-SemiBold",
  },
  ingredients: {
    fontSize: 12,
    fontFamily: "Sora-Regular",
  },
  price: {
    fontFamily: "Sora-SemiBold",
    fontSize: 18,
    color: "#2F4B4E",
  },
});

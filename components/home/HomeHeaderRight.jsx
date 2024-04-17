import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import { useNavigation } from "@react-navigation/native";
const HomeHeaderRight = () => {
  const navigation = useNavigation();

  const { profileData } = useGlobalContext();
  const [image, setImage] = useState(
    "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
  );

  useEffect(() => {
    if (profileData?.files?.url == null) {
      setImage(
        "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
      );
    } else {
      setImage(`http://192.168.1.8:1337${profileData?.files.url}`);
    }
  }, [profileData]);

  return (
    <View>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => {
          navigation.navigate("profile");
        }}
      >
        <Image
          style={styles.image}
          source={{
            uri: image,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeaderRight;

const styles = StyleSheet.create({
  imageContainer: {
    width: 40,
    height: 40,
  },
  image: {
    resizeMode: "cover",
    width: 50,
    height: 50,
    borderRadius: 10,
  },
});

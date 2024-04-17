import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useGlobalContext } from "../context";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Loading from "../components/Loading";
import Error from "../components/Error";

const SignupPage = ({ navigation }) => {
  const {
    dimensions,
    setUserToken,
    signUpDataChange,
    profileImage,
    setProfileImage,
    register,
    signUpData,
    checkRegisterBtn,
    usernameMsg,
    setUsernameMsg,
    emailMsg,
    setEmailMsg,
    passwordMsg,
    setPasswordMsg,
    registerBtn,
    setRegisterBtn,
    isLoading,
    signUpError,
  } = useGlobalContext();

  const validateEmail = () => {
    const result = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      signUpData?.email
    );
    if (!result) {
      //setRegisterBtn(true);
      setEmailMsg("this is not a valid email");
    } else {
      //setRegisterBtn(false);
      setEmailMsg(null);
    }
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    setProfileImage(result.assets[0]);
    if (!result.canceled) {
      console.log(result);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "black" }}>
      <SafeAreaView
        style={[
          styles.container,
          {
            height: Math.floor(dimensions.window.height * 0.8),
            marginVertical: 10,
          },
        ]}
      >
        <TextInput
          onBlur={() => {
            if (signUpData?.username?.length < 3) {
              setUsernameMsg("min. 3 characters");
            } else {
              setUsernameMsg(null);
            }
          }}
          onChangeText={(text) => {
            signUpDataChange(text, "username");
            // checkRegisterBtn();
          }}
          style={[
            styles.input,
            {
              height: Math.floor(dimensions.window.height / 14),
              fontSize: Math.floor(dimensions.window.width / 30),
            },
          ]}
          placeholder="username"
          placeholderTextColor="#989898"
          inputMode="text"
        />
        {usernameMsg && (
          <Text
            style={{
              color: "red",
              justifyContent: "flex-start",
              textAlign: "left",
              alignSelf: "flex-start",
              marginLeft: 70,
            }}
          >
            {usernameMsg}
          </Text>
        )}

        <TextInput
          onBlur={validateEmail}
          onChangeText={(text) => {
            signUpDataChange(text, "email");
            // checkRegisterBtn();
            validateEmail();
          }}
          style={[
            styles.input,
            {
              height: Math.floor(dimensions.window.height / 14),
              fontSize: Math.floor(dimensions.window.width / 30),
            },
          ]}
          placeholder="email"
          placeholderTextColor="#989898"
          inputMode="email"
        />
        {emailMsg && (
          <Text
            style={{
              color: "red",
              justifyContent: "flex-start",
              textAlign: "left",
              alignSelf: "flex-start",
              marginLeft: 70,
            }}
          >
            {emailMsg}
          </Text>
        )}
        <TextInput
          onBlur={() => {
            if (signUpData?.password?.length < 6) {
              setPasswordMsg("min. 6 characters");
            } else {
              setPasswordMsg(null);
            }
          }}
          onChangeText={(text) => {
            signUpDataChange(text, "password");
            // checkRegisterBtn();
          }}
          style={[
            styles.input,
            {
              height: Math.floor(dimensions.window.height / 14),
              fontSize: Math.floor(dimensions.window.width / 30),
            },
          ]}
          placeholder="password"
          placeholderTextColor="#989898"
          inputMode="text"
          secureTextEntry
          passwordRules="required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 6;"
        />
        {passwordMsg && (
          <Text
            style={{
              color: "red",
              justifyContent: "flex-start",
              textAlign: "left",
              alignSelf: "flex-start",
              marginLeft: 70,
            }}
          >
            {passwordMsg}
          </Text>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: Math.floor(dimensions.window.width / 7),
          }}
        >
          <TouchableOpacity
            onPress={pickImageAsync}
            style={{
              backgroundColor: "#C67C4E",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: Math.floor(dimensions.window.width / 20),
              }}
            >
              profile pic?
            </Text>
          </TouchableOpacity>
          <Image
            style={{ width: 75, height: 75, borderRadius: 10 }}
            source={{
              uri:
                profileImage != null ? profileImage.uri : "../assets/5098.jpg",
            }}
          />
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Text
            style={{
              color: "white",
              fontSize: Math.floor(dimensions.window.width / 20),
            }}
          >
            already have an account ?
          </Text>
          <Text
            style={{
              color: "#C67C4E",
              fontSize: Math.floor(dimensions.window.width / 20),
            }}
            onPress={() => navigation.navigate("SignIn")}
          >
            Sign in
          </Text>
        </View>
        <TouchableOpacity
          disabled={registerBtn}
          onPress={!registerBtn && register}
          style={{
            backgroundColor: registerBtn ? "#c67c4e5d" : "#C67C4E",
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: Math.floor(dimensions.window.width / 20),
            }}
          >
            sign up
          </Text>
        </TouchableOpacity>
        {isLoading && <Loading />}
        {signUpError && <Error />}
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignupPage;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginVertical: "auto",
  },
  input: {
    width: "80%",
    borderWidth: 1,
    paddingLeft: 20,
    borderRadius: 10,
    backgroundColor: "#313131",
    color: "#989898",
    // borderColor: "red",
    //fontSize: 15,
  },
});

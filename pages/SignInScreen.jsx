import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { useGlobalContext } from "../context";
import { useState } from "react";
import Loading from "../components/Loading";
import Error from "../components/Error";

const SignInScreen = ({ navigation }) => {
  const { dimensions, setUserToken, signInDataChange, login ,isLoading,signUpError} =
    useGlobalContext();

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        onChangeText={(text) => signInDataChange(text, "identifier")}
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

      <TextInput
        //value={searchValue}
        onChangeText={(text) => signInDataChange(text, "password")}
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

      <View style={{ flexDirection: "row", gap: 10 }}>
        <Text
          style={{
            color: "white",
            fontSize: Math.floor(dimensions.window.width / 20),
          }}
        >
          dont't have an account ?
        </Text>
        <Text
          style={{
            color: "#C67C4E",
            fontSize: Math.floor(dimensions.window.width / 20),
          }}
          onPress={() => navigation.navigate("SignUp")}
        >
          Sign up
        </Text>
      </View>
      <TouchableOpacity
        onPress={login}
        style={{ backgroundColor: "#C67C4E", padding: 20, borderRadius: 10 }}
      >
        <Text
          style={{
            color: "white",
            fontSize: Math.floor(dimensions.window.width / 20),
          }}
        >
          login
        </Text>
      </TouchableOpacity>
      {isLoading && <Loading />}
      {signUpError && <Error />}
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    paddingLeft: 20,
    borderRadius: 10,
    backgroundColor: "#313131",
    color: "#989898",
    //fontSize: 15,
  },
});

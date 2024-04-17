import { StyleSheet, Text, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import { useFonts } from "expo-font";
import Coffee from "./pages/Coffee";
import Icon from "react-native-vector-icons/FontAwesome";
import Order from "./pages/Order";
import Delivery from "./pages/Delivery";
import SignInScreen from "./pages/SignInScreen";
import Test from "./pages/Test";
import { useGlobalContext } from "./context";
import SignUpScreen from "./pages/SignUpScreen";
import Profile from "./pages/Profile";

const Stack = createNativeStackNavigator();

const MyApp = () => {
  const { isLoading, userToken } = useGlobalContext();
  const [fontsLoaded] = useFonts({
    "sora-bold": require("./assets/fonts/Sora-Bold.ttf"),
    "Sora-ExtraBold": require("./assets/fonts/Sora-ExtraBold.ttf"),
    "Sora-ExtraLight": require("./assets/fonts/Sora-ExtraLight.ttf"),
    "Sora-Light": require("./assets/fonts/Sora-Light.ttf"),
    "Sora-Medium": require("./assets/fonts/Sora-Medium.ttf"),
    "Sora-Regular": require("./assets/fonts/Sora-Regular.ttf"),
    "Sora-SemiBold": require("./assets/fonts/Sora-SemiBold.ttf"),
    "Sora-Thin": require("./assets/fonts/Sora-Thin.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  // if (isLoading) {
  //   // We haven't finished checking for the token yet
  //   return <SplashScreen />;
  // }

  return (
    <NavigationContainer>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <Stack.Navigator initialRouteName="Welcome">
        {userToken == null ? (
          <>
            <Stack.Screen
              options={{
                title: "",
                headerShown: false,
                statusBarStyle: "light",
                statusBarAnimation: "fade",
                statusBarColor: "black",
              }}
              name="Welcome"
              component={Welcome}
            />
            <Stack.Screen
              options={{
                title: "",
                headerShown: false,
                statusBarStyle: "light",
                statusBarAnimation: "fade",
                statusBarColor: "black",
              }}
              name="SignIn"
              component={SignInScreen}
            />
            <Stack.Screen
              options={{
                title: "",
                headerShown: false,
                statusBarStyle: "light",
                statusBarAnimation: "fade",
                statusBarColor: "black",
              }}
              name="SignUp"
              component={SignUpScreen}
            />
          </>
        ) : (
          <>
            {/* <Stack.Screen
              options={{
                title: "",
                headerShown: false,
                statusBarStyle: "light",
                statusBarAnimation: "fade",
                statusBarColor: "black",
              }}
              name="Welcome"
              component={Welcome}
            /> */}

            <Stack.Screen
              options={{
                headerShown: false,
                statusBarStyle: "light",
                statusBarAnimation: "fade",

                statusBarColor: "rgba(19, 19, 19, 1)",
              }}
              name="Home"
              component={Home}
            />
            <Stack.Screen
              options={{
                title: "Detail",
                statusBarStyle: "dark",
                statusBarAnimation: "fade",
                contentStyle: { backgroundColor: "white" },
                headerShadowVisible: false,
                headerRight: () => (
                  <Icon name="heart-o" size={20} color="#8D8D8D" />
                ),
              }}
              name="coffee"
              component={Coffee}
            />
            <Stack.Screen
              options={{
                title: "Order",
                statusBarStyle: "dark",
                statusBarAnimation: "fade",

                contentStyle: { backgroundColor: "white" },
                headerShadowVisible: false,
              }}
              name="order"
              component={Order}
            />
            <Stack.Screen
              options={{
                title: "",
                statusBarStyle: "dark",
                statusBarAnimation: "fade",
                contentStyle: { backgroundColor: "white" },
                headerShadowVisible: false,
                headerShown: false,
              }}
              name="delivery"
              component={Delivery}
            />
            <Stack.Screen
              options={{
                title: "",
                statusBarStyle: "dark",
                statusBarAnimation: "fade",
                contentStyle: { backgroundColor: "white" },
                headerShadowVisible: false,
                headerShown: false,
              }}
              name="profile"
              component={Profile}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyApp;

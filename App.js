import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import { useFonts } from "expo-font";
import Coffee from "./pages/Coffee";
import Icon from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import Order from "./pages/Order";
import Delivery from "./pages/Delivery";
import { AppProvider } from "./context";
import MyApp from "./MyApp";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <MyApp />
    </AppProvider>
  );
}

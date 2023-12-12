import React from "react";
import { View, FlatList, Image, Text, TouchableOpacity, Dimensions } from "react-native";
import CoffeeCard from "./components/CoffeeCard";
import { coffeeItems } from "./constants";
import { ScrollView } from "react-native";
import HomeScreen from "./screens/HomeScreen";

const { width, height } = Dimensions.get('window');

const App = () => {
  return (
  <HomeScreen />
  );
};

export default App;

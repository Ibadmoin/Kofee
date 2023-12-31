import React from "react";
import { View, FlatList, Image, Text, TouchableOpacity, Dimensions } from "react-native";
import CoffeeCard from "./components/CoffeeCard";
import { coffeeItems } from "./constants";
import { ScrollView } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import ItemScreen from "./screens/ItemScreen";
import ProductScreen from "./screens/ProductScreen";
import AppNavigation from "./navigation/AppNavigation";
import SkeletonLoader from "./components/skeleton/ScoffeeCard";
import SearchBox from "./components/SearchBox";

const { width, height } = Dimensions.get('window');

const App = () => {
  return (
  // <HomeScreen />
  // <ProductScreen />
  
  <AppNavigation />
  // <ItemScreen />
  // <SearchBox />

  
  );
};

export default App;

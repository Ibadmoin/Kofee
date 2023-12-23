import React, { useEffect, useState } from 'react'
import {View, Text, StatusBar, Image, Dimensions, SafeAreaView, TextInput, TouchableOpacity, FlatList} from 'react-native'
import { AcademicCapIcon, MagnifyingGlassIcon, MapPinIcon } from "react-native-heroicons/solid";
import { themeColors } from '../theme';
import {BellIcon} from "react-native-heroicons/outline"
import { categories, coffeeItems } from '../constants';
import Carousel from 'react-native-snap-carousel'
import CoffeeCard from '../components/CoffeeCard';
import { ScrollView } from 'react-native';
import SkeletonLoader from '../components/skeleton/ScoffeeCard';
import axios from 'axios';


const {width, height } = Dimensions.get('window')
export default function ItemScreen({route}) {
  const {queryItem} = route.params;
  return(
    <View>
      <Text>{queryItem}</Text>
    </View>
  )
   
  
}

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
import DisplayItemCard from '../components/DisplayItemCard';


const {width, height } = Dimensions.get('window')
export default function ItemScreen({route}) {
  const {queryItem} = route.params;
  return(
    <View>
      {/* <Text>{queryItem}</Text> */}
      <StatusBar style="light" />
      <Image source={require('../assets/images/beansBackground1.png')} 
        style={{height: height*0.28,}}
        className="w-full absolute -top-5 opacity-10"
       
        />
        {/* safe area view */}
        <SafeAreaView>
          <View className="mt-2 mx-4 flex-row justify-between items-center  " >
            <Image 
            
            className="h-9 w-9 rounded-full "
            source={require('../assets/images/avatar.png')} />
          <View  className="flex-row items-center space-x-2 ">
           {/* using svg for now */}
          <MapPinIcon size='25' color={themeColors.bgLight} />
          <Text className="font-semibold text-base">
            Khi, Pakistan
          </Text>
          </View>
          <BellIcon size="27" color="black" />
          </View>
          {/* Search bar */}
          <View className="mx-5 shadow" style={{marginTop:height*0.03}}>
            <View className="flex-row items-center rounded-full p-1 bg-[#e6e6e6]">
              <TextInput style={{ flex:0.8}} placeholder='Search' className="p-4 font-semibold text-gray-700" />
              <TouchableOpacity 
              className="rounded-full p-2 absolute right-5"
              style={{backgroundColor:themeColors.bgLight}}
              >
                <MagnifyingGlassIcon  size='25' strokeWidth={2} color="white"/>
              </TouchableOpacity>
            </View>
          </View>
          </SafeAreaView>
          <ScrollView>
            <View>
              <DisplayItemCard categories={queryItem} />
            </View>
          </ScrollView>


    </View>
  )
   
  
}

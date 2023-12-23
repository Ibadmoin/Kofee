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
export default function ItemScreen() {
  const [activeCategory, setActiveCategory] = useState(1);
  const [loader, setLoader] = useState(true);
  const [data, setData]= useState(null);



  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const response = await axios.get('https://fair-lime-goose-wear.cyclic.app/api/product')
        setData(response.data);
        console.log(response.data)

 
       
        setLoader(false)
      }catch (err){
        console.log(`Error: ${err}`);
      }
    }
    // setTimeout(() => {setLoader(false)},2000)
fetchData();
  },[])



  // const coffeeItems = data.coffeeItems;
  return (
    <View>
        <StatusBar />
        <Image source={require('../assets/images/beansBackground1.png')} 
        style={{height: height*0.28,}}
        className="w-full absolute -top-5 opacity-10"
       
        />

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
            {/* Categories */}
          <View className="px-5 mt-6 ">
            <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories} 
            keyExtractor={item=>item.id}
            className="overflow-visible"
            renderItem={({item})=>{
              isActive = item.id== activeCategory;
              let activeTextClass = isActive? 'text-white':'text-gray-700';
              return(
                <TouchableOpacity 
                onPress={()=>{setActiveCategory(item.id)}}
                style={{backgroundColor:isActive? themeColors.bgLight:'rgba(0,0,0,0.07)' }}
                className="p-4 px-5 mr-2 rounded-full ">
                  <Text className={"font-smiebold "+activeTextClass}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )
            }}
            />
          </View>
       
        {/* Coffee cards */}
   
    
     

      {/* Added more needed scrollable content/Comp here... */}
    
          </ScrollView>
    
     

          

     
    </View>

   
  
  )
}
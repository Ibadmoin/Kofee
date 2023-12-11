import React, { useState } from 'react'
import {View, Text, StatusBar, Image, Dimensions, SafeAreaView, TextInput, TouchableOpacity, FlatList} from 'react-native'
import { AcademicCapIcon, MagnifyingGlassIcon, MapPinIcon } from "react-native-heroicons/solid";
import { themeColors } from '../theme';
import {BellIcon} from "react-native-heroicons/outline"
import { categories } from '../constants';


const {width, height } = Dimensions.get('window')
export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState(1);
  return (
    <View>
        <StatusBar />
        <Image source={require('../assets/images/beansBackground1.png')} 
        style={{height: height*0.3,}}
        className="w-full absolute -top-5 opacity-10"
       
        />

        <SafeAreaView>
          <View className="mt-2 mx-4 flex-row justify-between items-center " >
            <Image 
            
            className="h-9 w-9 rounded-full "
            source={require('../assets/images/avatar.png')} />
          <View  className="flex-row items-center space-x-2 ">
           {/* using svg for now */}
          <MapPinIcon size='25' color={themeColors.bgLight} />
          <Text className="font-semibold text-base">
            Karachi, Pak
          </Text>
          </View>
          <BellIcon size="27" color="black" />
          </View>
          {/* Search bar */}
          <View className="mx-5 shadow" style={{marginTop:height*0.06}}>
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


    
        </SafeAreaView>
    </View>

   
  
  )
}

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// navigation import
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ArrowLeftCircleIcon,
  MinusIcon,
  PlusIcon,
} from 'react-native-heroicons/outline';
import {HeartIcon, StarIcon} from 'react-native-heroicons/solid';
import {themeColors} from '../theme';
import {useNavigation} from '@react-navigation/native';
import Animated, {useSharedValue,withSpring} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function WelcomeScreen() {

  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);
  const navigation = useNavigation()



  useEffect(()=>{
    ring1padding.value= 0;
    ring2padding.value= 0;
    setTimeout(()=>ring1padding.value = withSpring(ring1padding.value+hp(5)),100);
    setTimeout(()=>ring2padding.value = withSpring(ring2padding.value+hp(5.5)),100);
  //  condition for auth here....
  const loadToken = async()=>{
    try{
      const savedToken = await AsyncStorage.getItem('userToken');
      if(savedToken !== null){
       
        console.log('Token from async storagexd',savedToken);
        setTimeout(()=>navigation.navigate('Home'),250);
        
      }else{
        
        setTimeout(()=>navigation.navigate('Login'),250);
      }
    }catch(err){
      console.log('Error loading token:',err)
    }
  }
  loadToken();
   
  },[])


  return (
    <View className="flex-1 justify-center items-center space-y-10 " style={{backgroundColor:themeColors.bgDark}}>
      <StatusBar style="light" />
      {/* {logo} */}
      <Animated.View className="bg-white/20 rounded-full " style={{padding:ring2padding}}>
        <Animated.View className="bg-white/20 rounded-full" style={{padding:ring1padding}}>
          <Image source={require('../assets/main.png') } style={{width:hp(20), height:(120)}}  />

        </Animated.View>

      </Animated.View>
      {/* Title or punch line */}
      <View className="flex  items-center space-y-2">
        <Text className='font-bold text-white tracking-widest ' style={{fontSize:hp(7)}}>
          Koffee
        </Text>
        <Text className="font-medium text-white tracking-widest" style={{fontSize:hp(2)}}>
          Refresh your Day
        </Text>
      </View>

      </View>
  )
}

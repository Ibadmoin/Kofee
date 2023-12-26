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
// import{ShoppingBag}  from 'react-native-feat'

const {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';

export default function StoreItemScreen(props) {
  const item = props.route.params;
  const [size, setSize] = useState('small');
  const [quantity, setQuantity]= useState(1);
  const [favourite, setFavourite]= useState(false);


  const handleFavaouriteItem =async ()=>{
    
      setFavourite(!favourite);
      // add to favoite item
      
    
  }
  useEffect(()=>{
  //  debugger

  })

  const navigation = useNavigation()
  return (
    <View className="flex-1 ">
      <StatusBar barStyle={'light-content'} />
      <Image
        source={{uri:item.imageUrl}}
        style={{
          height: 250,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
        }}
        className="w-full absolute"
      />
      <SafeAreaView className="space-y-1   flex-1">
        <View className="mx-4 flex-row  justify-between  items-center">
          <TouchableOpacity
            className="rounded-full"
            onPress={()=> navigation.goBack()}>
            <ArrowLeftCircleIcon size={50} color="white" strokeWidth={1.2} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleFavaouriteItem} className="rounded-full border-2 border-white p-2">
            <HeartIcon size={24} color={favourite?'red':'white'} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            shadowColor: themeColors.bgDark,
            shadowRadius: 30,
            shadowOffset: {width: 0, height: 30},
            shadowOpacity: 1.9,
            elevation: 5,
            height: 230
          }}
          className="flex-row justify-center w-40   ">
          
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{backgroundColor: themeColors.bgLight}}
          className="flex-row justify-center items-center mx-4 rounded-3xl p-1 px-2 space-x-1 opacity-90 w-16">
          <StarIcon size={15} color="white" />
          <Text className="text-base font-semibold text-white">{item.stars}</Text>
        </View>
        <View className="px-4 flex-row justify-between items-center">
          <Text
            style={{color: themeColors.text}}
            className="text-3xl font-semibold ">
           {item.name}
          </Text>
          <Text
            style={{color: themeColors.text}}
            className="text-lg font-semibold ">
            $ {size==="large"?item.prices.large:size==="medium"?item.prices.medium:item.prices.small}
          </Text>
        </View>
        <View className="px-4 space-y-2">
          <Text style={{color: themeColors.text}} className="text-lg font-bold">
            Coffee size
          </Text>
          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={() => setSize('small')}
              style={{
                backgroundColor:
                  size == 'small' ? themeColors.bgLight : 'rgba(0,0,0,0.07)',
              }}
              className="p-3 px-8 rounded-full">
                <Text className={size=='small'?'text-white': "text-gray-700"}>Small</Text>
              </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSize('medium')}
              style={{
                backgroundColor:
                  size == 'medium' ? themeColors.bgLight : 'rgba(0,0,0,0.07)',
              }}
              className="p-3 px-8 rounded-full">
                <Text className={size=='medium'?'text-white': "text-gray-700"}>Medium</Text>
              </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSize('large')}
              style={{
                backgroundColor:
                  size == 'large' ? themeColors.bgLight : 'rgba(0,0,0,0.07)',
              }}
              className="p-3 px-8 rounded-full">
                <Text className={size=='large'?'text-white': "text-gray-700"}>Large</Text>
              </TouchableOpacity>
              
          </View>
        </View>
        <View className="px-4 space-y-2">
            <Text style={{color:themeColors.text}} className="text-lg font-bold">About</Text>
            <Text  className="text-gray-600 mb-10"> {item.description}</Text>
        </View>
        </ScrollView>
      </SafeAreaView>
              <View className={`space-y-3 ${ios? 'mb-6': 'mb-3'}`}>
          <View className="flex-row justify-between items-center px-2 -mb-4 " >
              <View className="flex-col justify-center items-center space-x-2 mx-2">
                <Text className="text-base text-gray-700 font-semibold opacity-60">
                Volume 
                </Text>
                <Text className="text-base text-black font-semibold">{(size==="large"?item.volumes.large:size==="medium"?item.volumes.medium:item.volumes.small)}</Text>
              </View>
              <View className="flex-row justify-center rounded-full p-3 m-3 " style={{backgroundColor:themeColors.bgDark,width:130}}>
                <TouchableOpacity>
                <Text className="text-white text-base">Buy Now</Text>
                </TouchableOpacity>
              </View>
              <View style={{ borderWidth: 2, borderColor: "gray" }} 
                className="flex-row items-center space-x-4   rounded-full p-1 px-4">
                <TouchableOpacity>
                  <MinusIcon size="20" strokeWidth={3} color={themeColors.text} onPress={()=>quantity>1?setQuantity(quantity- 1):setQuantity(1)} />
                </TouchableOpacity>
                <Text style={{color: themeColors.text}} className="font-extrabold text-lg">{quantity}</Text>
                <TouchableOpacity>
                  <PlusIcon size="20" strokeWidth={3} color={themeColors.text} onPress={()=>quantity<30? setQuantity(quantity+1):setQuantity(30)} />
                </TouchableOpacity>
              </View>
              </View>
              </View>
           
      
    </View>
  );
}

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  AcademicCapIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
} from 'react-native-heroicons/solid';
import {themeColors} from '../theme';
import {BellIcon} from 'react-native-heroicons/outline';
import {categories, coffeeItems} from '../constants';
import Carousel from 'react-native-snap-carousel';
import CoffeeCard from '../components/CoffeeCard';
import {ScrollView} from 'react-native';
import SkeletonLoader from '../components/skeleton/ScoffeeCard';
import axios from 'axios';
import DisplayItemCard from '../components/DisplayItemCard';
import Loader from '../components/loader';
import SearchBox from '../components/SearchBox';
import NotFound from '../components/NotFound';
import { useNavigation } from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
export default function ItemScreen({route}) {
  const {queryItem, queryItemName} = route.params;
  const [data, setData] = useState(null);
  const [loading, setloading] = useState(false);
  const navigation = useNavigation();


  useEffect(() => {

    const fetchData = async()=>{
      setloading(true);
      try{
        if(queryItem){
          console.log(queryItem)
          const response = await axios.get(`https://sore-pear-seagull-gear.cyclic.app/api/product/getcategories?category=${queryItem}`)
          // console.log(response.data.products);
          setData(response.data.products);
          setloading(false);
        }else{
          console.log(queryItemName)
         const response = await axios.get(`https://sore-pear-seagull-gear.cyclic.app/api/product/search?term=${queryItemName}`)
         setData(response.data.suggestions) 
         setloading(false);
          
       }

      }catch(err){
        console.log("Error while fecthing this category",err)
        setloading(false)
      }
    }
    
 

    fetchData();
  }, [queryItemName]);

  return (
    <View>
      {/* <Text>{queryItem}</Text> */}
      <StatusBar style="light" />
      <Image
        source={require('../assets/images/beansBackground1.png')}
        style={{height: height * 0.28}}
        className="w-full absolute -top-5 opacity-10"
      />
      {/* safe area view */}
      <SafeAreaView>
        <View className="mt-2 mx-4 flex-row justify-between items-center  ">
          <Image
            className="h-9 w-9 rounded-full "
            source={require('../assets/images/avatar.png')}
          />
          <View className="flex-row items-center space-x-2 ">
            {/* using svg for now */}
            <MapPinIcon size="25" color={themeColors.bgLight} />
            <Text className="font-semibold text-base">Khi, Pakistan</Text>
          </View>
          <BellIcon size="27" color="black" />
        </View>
        {/* Search bar */}
        <SearchBox/>
      </SafeAreaView>
      {loading ? (
    
       <View style={{ height:"50%"}} className=" justify-center items-center ">
        <Loader />
       </View>
      
      ) : data ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <DisplayItemCard data={data} />
          </View>
        </ScrollView>
      ) : (
        <View>
          {/* add no result found compoenent */}
         <NotFound />
        </View>
      )}
    </View>
  );
}

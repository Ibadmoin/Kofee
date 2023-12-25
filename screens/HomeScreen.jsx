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
import {useNavigation} from '@react-navigation/native';
import DisplayItemCard from '../components/DisplayItemCard';
import {config} from 'dotenv';




const {width, height} = Dimensions.get('window');
export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState(1);
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState(null);
  const [featuredData, setFeaturedData]= useState(null)
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mainResponse = await axios.get('https://sore-pear-seagull-gear.cyclic.app/api/product/');
        setData(mainResponse.data.products);

        const featuredResponse = await axios.get('https://sore-pear-seagull-gear.cyclic.app/api/product/featured');
        setFeaturedData(featuredResponse.data.featuredProducts);

        setLoader(false);
      } catch (err) {
        console.log(`Error: ${err}`);
        setLoader(false);
      }
    };

    fetchData();
  }, []);
useEffect(()=>{

  console.log("featuredData=>",featuredData)
},[featuredData])

 
  // const coffeeItems = data.coffeeItems;
  return (
    <View>
      <StatusBar />
      <Image
        source={require('../assets/images/beansBackground1.png')}
        style={{height: height * 0.28}}
        className="w-full absolute -top-5 opacity-10"
      />

      <SafeAreaView>
        <View className="mt-2 mx-4  flex-row justify-between items-center  ">
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
        <View className="mx-5 shadow" style={{marginTop: height * 0.03}}>
          <View className="flex-row items-center rounded-full p-1 bg-[#e6e6e6] mb-3">
            <TextInput
              style={{flex: 0.8}}
              placeholder="Search"
              className="p-4 font-semibold text-gray-700"
            />
            <TouchableOpacity
              className="rounded-full p-2 absolute right-5"
              style={{backgroundColor: themeColors.bgLight}}>
              <MagnifyingGlassIcon size="25" strokeWidth={2} color="white" />
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
            keyExtractor={item => item.id}
            className="overflow-visible"
            renderItem={({item}) => {
              isActive = item.id == activeCategory;
              let activeTextClass = isActive ? 'text-white' : 'text-gray-700';
              return (
                <TouchableOpacity
                  onPress={() => {
                    setActiveCategory(item.id);
                    navigation.navigate('Item', {
                      queryItem: item.categorie,
                    });
                  }}
                  style={{
                    backgroundColor: isActive
                      ? themeColors.bgLight
                      : 'rgba(0,0,0,0.07)',
                  }}
                  className="p-4 px-5 mr-2 rounded-full ">
                  <Text className={'font-smiebold ' + activeTextClass}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* Coffee cards */}

        {loader ? (
          <View style={{overflow: 'visible'}}>
            <View
              style={{backgroundColor: 'transparent', flexDirection: 'row'}}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <SkeletonLoader loading={loader} />
                <SkeletonLoader loading={loader} />
              </ScrollView>
            </View>
          </View>
        ) : (
          <View>
            <View style={{overflow: 'visible'}}>
            <View
              style={{backgroundColor: 'transparent', flexDirection: 'row'}}>
              <FlatList
                style={{padding: 8}}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={featuredData}
                keyExtractor={item => item._id}
                renderItem={({item}) =>
                  item.isEmpty ? (
                    <View style={{width: 10}} />
                  ) : (
                    <CoffeeCard item={item} />
                  )
                }
                ItemSeparatorComponent={() => <View style={{width: 10}} />}
              />
            </View>
          </View>
           <View>
           <DisplayItemCard data={data} />
         </View>
          </View>
        )}
        {/* Added more needed scrollable content/Comp here... */}
       
      </ScrollView>
    </View>
  );
}

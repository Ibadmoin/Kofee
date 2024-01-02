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
import SearchBox from '../components/SearchBox';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserAvatar from 'react-native-user-avatar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { getUser } from '../globalFunctions/getSavedUser';



const {width, height} = Dimensions.get('window');
export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState(1);
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState(null);
  const [featuredData, setFeaturedData]= useState(null);
  const [user, setUser]= useState(null);
  const [userName, setUserName]= useState(null);
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

    const fetchUserData = async()=>{
      const userData = await getUser();
      setUser(userData)
    }

    fetchUserData();

    fetchData();
  },[]);
useEffect(()=>{

  console.log("userData=>",user);
  if(user !== null){
    setUserName(user.userName);
  }
 
},[user]);

const handleLogout= async()=>{
  await AsyncStorage.removeItem('userToken');
  await AsyncStorage.removeItem('User');
  navigation.navigate('Login');
console.log('Login out successfully',AsyncStorage.getItem('userToken'));
}


 
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
          {/* <Image 
          onPress={handleLogout}
            className="h-9 w-9 rounded-full "
            source={require('../assets/images/avatar.png')}
          /> */}
          <UserAvatar size={40} name={userName? userName:"K O"} />
          <View className="flex-row items-center space-x-2 ">
            {/* using svg for now */}
            <MapPinIcon  size="25" color={themeColors.bgLight} />
            <Text className="font-semibold text-base">Khi, Pakistan</Text>
          </View>
          <TouchableOpacity onPress={handleLogout}>
          <BellIcon size="27" color="black" />
          </TouchableOpacity>
        </View>
        {/* Search bar */}
      </SafeAreaView>
      <SearchBox />

      <ScrollView showsVerticalScrollIndicator={false}>
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

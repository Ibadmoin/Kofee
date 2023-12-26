import React, {useEffect, useState, useRef} from 'react';
import {View, TextInput, FlatList, Text, Dimensions, Keyboard} from 'react-native';
import axios from 'axios';
import {TouchableOpacity} from 'react-native';
import {themeColors} from '../theme';
import {MagnifyingGlassIcon, XMarkIcon} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
export default function SearchBox() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showCloseIcon, setShowCloseIcon] = useState(false);
  const inputRef = useRef(null);

  const navigation = useNavigation();

  const closeSuggestions = () => {
    setSuggestions([]);
    Keyboard.dismiss(); // Close the keyboard when suggestions are closed
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim() !== '') {
        fetchSuggestions();
        setShowCloseIcon(true);
      } else {
        setSuggestions([]);
        setShowCloseIcon(false);
      }
    }, 300);

    return () => clearInterval(delayDebounceFn);
  }, [searchTerm]);

  const fetchSuggestions = async () => {
    try {
      const response = await axios.get(
        `https://sore-pear-seagull-gear.cyclic.app/api/product/search?term=${searchTerm}`,
      );
      setSuggestions(response.data.suggestions);
    } catch (err) {
      console.log('Error fetching suggestions:', err);
    }
  };

  const handleIconPress = () => {
    if (showCloseIcon) {
      closeSuggestions();
      setSearchTerm("")
    } else {
      inputRef.current.focus();
    }
  };

  return (
    <View
      className="mx-5 shadow"
      style={{
        margin: 5,
        marginTop: height * 0.03,
        backgroundColor: 'white',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
        justifyContent: 'center',
        paddingTop: 0,
        // ...(searchTerm ? {paddingLeft: 20, paddingRight: 20} : {}),
      }}>
      <View
        style={[{}, searchTerm ? {marginBottom: 10} : {}]}
        className="flex-row justify-center  items-center rounded-full p-1 bg-[#e6e6e6] ">
        <TextInput
          ref={inputRef}
          className="flex-1 pl-5 "
          placeholder="Search"
          onChangeText={text => setSearchTerm(text)}
          value={searchTerm}
        />

        <TouchableOpacity
          onPress={handleIconPress}
          className="rounded-full p-2 absolute right-5"
          style={{backgroundColor: themeColors.bgLight}}>
          {showCloseIcon ? ( <XMarkIcon size="25" strokeWidth={2} color="white" />) : (
            <MagnifyingGlassIcon size="25" strokeWidth={2} color="white" />
          )}
        </TouchableOpacity>
      </View>
      {suggestions.length > 0 ? (
        <FlatList
          style={{paddingBottom: 10}}
          data={suggestions}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Item', {
                  queryItemName: item.name,
                });
                setSuggestions([]);
                setSearchTerm('');
              }}>
              <Text
                className="rounded-full"
                style={{
                  width: '100%',
                  backgroundColor: 'white',
                  padding: 10,
                  marginBottom: 10,
                  paddingLeft: 20,

                  backgroundColor: themeColors.bgLight,
                  color: 'white',
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      ) : null}
    </View>
  );
}

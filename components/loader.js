import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, ActivityIndicator } from 'react-native';
import { themeColors } from '../theme';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

export default function Loader() {
  return (
    <View style={{height:hp(50)}} className="flex-1 flex justify-center items-center">
        <ActivityIndicator size={hp(9)} color={themeColors.bgDark}  />
    </View>

   
  )
}


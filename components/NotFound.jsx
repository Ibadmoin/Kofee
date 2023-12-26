import React from 'react'
import {View, Text, Image, } from "react-native"

export default function NotFound() {
  return (
    <View className="bg- flex justify-center items-center" style={{height:400}}>
        <Image source={require("../assets/404.png")} style={{width:200, height:190}} />

        <Text className="text-base text-xl">404 Not Found</Text></View>
  )
}

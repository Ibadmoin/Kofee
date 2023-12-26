import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet,} from 'react-native';
import { themeColors } from '../theme';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// navigation import
import { TextInput } from 'react-native-paper';

const LoginScreen = () => {
    const [email, setEmail]= useState("");
  return (
    <ImageBackground
      source={require('../assets/coffeebg.png')} // Replace with the actual path to your image
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Welcome Back!</Text>
        <Text style={styles.subText}>Please Sign in to your account</Text>
        <TextInput
      label="Email"
      value={email}
      style={styles.input}
      onChangeText={text => setEmail(email)}
    />

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    justifyContent: 'center',
    backgroundColor:themeColors.bgDark,
  },
  container: {
    flex: 1,
   
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Adjust the alpha channel for transparency
  },
  text: {
    color: 'white',
    fontSize:hp(6) ,
    fontWeight: 'bold',
  },
  subText:{
    color:"white",
    fontSize: hp(3),
    fontWeight:"light"


  },
  input:{
    width:wp("85%"),
    backgroundColor:"black",
    marginBottom:10,
    marginTop:10,

  }
});

export default LoginScreen;

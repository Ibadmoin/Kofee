import React, { useState } from 'react'
import { Button, TouchableOpacity } from 'react-native'
import { Text, View, StyleSheet } from 'react-native'
import { Modal } from 'react-native'
import { themeColors } from '../theme';
import { Linking } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import VeridyEmailModal from '../components/VerifyEmailModal';
export default function TestScreen() {
   
   
      
  return (
    <View><Text>Test screen</Text>
    
     <VeridyEmailModal Visible={true} ModalHeader={"Email verified Successfully"} ModalText={"Check your email for verification"}/>

    </View>
  )
}


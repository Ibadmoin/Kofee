import React, { useState } from 'react'
import { Button, Image, TouchableOpacity } from 'react-native'
import { Text, View, StyleSheet } from 'react-native'
import { Modal } from 'react-native'
import { themeColors } from '../theme';
import { Linking } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default function VeridyEmailModal({Visible,ModalHeader, ModalText}) {
    const [isVisible, setIsVisible] = useState(Visible);
    const openGmailApp = async () => {
        const url = 'https://gmail.app.goo.gl';
      
        try {
          const canOpen = await Linking.canOpenURL(url);
      
          if (canOpen) {
            Linking.openURL(url);
          } else {
            console.log('Gmail app is not installed.');
          }
        } catch (error) {
          console.log('Error opening Gmail app:', error);
        }
      };
      
  return (
    <View>
     <Modal
         transparent={true}
         visible={isVisible}
         animationIn="slideInLeft"
         animationOut="slideOutRight"
         onRequestClose={() => setIsVisible(false)}
         >
            
         <View
           style={{
             backgroundColor: 'rgba(0,0,0,0.3)',
             alignItems: 'center',
             justifyContent: 'center',
             flex: 1,
           }}>
           <View
             style={{
               width: '90%',
               backgroundColor: themeColors.bgDark,
               padding: 22,
               justifyContent: 'center',
               alignItems: 'center',
               gap: 10,
               borderRadius: 4,
               borderColor: 'rgba(0, 0, 0, 0.1)',
             }}>
                <View style={styles.ImgContainer}>
                    <Image source={require("../assets/icons/verified.png")} style={{width:"100%", height:"100%"}} />
                </View>
             <Text style={styles.ModalHeader} >{ModalHeader}</Text>
             <Text style={styles.ModalText} >{ModalText}</Text>
             <TouchableOpacity >
                <Text style={styles.ModalBtn} onPress={()=>{
                    setIsVisible(false);
                    openGmailApp();
                }} >Verify Email</Text>
             </TouchableOpacity>
           </View>
         </View>
       </Modal>
    </View>
  )
}


const styles = StyleSheet.create({
    ModalHeader : {
        color:"white",
        fontWeight:"bold",
        fontSize:hp(3),
    },
    ModalText:{
        color:"white",
        textAlign:"center"
    },
    ModalBtn:{
        width: "max-content",
        backgroundColor:themeColors.bgLight,
        textAlign:"center",
        fontSize:hp(4),
        padding:8,
        color:"white",

        borderRadius: 5,

    },
    ImgContainer: {
        width:hp(12),
        height:hp(12),
        position:"relative",
        top:0,
    }
})
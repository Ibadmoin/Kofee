import React, { useState } from 'react'
import { Button, Image, TouchableOpacity } from 'react-native'
import { Text, View, StyleSheet } from 'react-native'
import { Modal } from 'react-native'
import { themeColors } from '../theme';
import { Linking } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default function VerifyEmailModal({ closeModal, Visible, ModalHeader, ModalText }) {
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
    <Modal
      transparent={true}
      visible={Visible}
      animationIn="slideInLeft"
      animationOut="slideOutRight"
      onRequestClose={closeModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.imgContainer}>
            <Image source={require("../assets/icons/verified.png")} style={styles.img} />
          </View>
          <Text style={styles.modalHeader}>{ModalHeader}</Text>
          <Text style={styles.modalText}>{ModalText}</Text>
          <TouchableOpacity onPress={() => {
            closeModal();
            openGmailApp();
          }}>
            <Text style={styles.modalBtn}>Verify Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  modalContent: {
    width: '90%',
    backgroundColor: themeColors.bgDark,
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  imgContainer: {
    width: hp(12),
    height: hp(12),
  },
  img: {
    width: '100%',
    height: '100%',
  },
  modalHeader: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp(3),
    marginVertical: 10,
  },
  modalText: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalBtn: {
    width: "max-content",
    backgroundColor: themeColors.bgLight,
    textAlign: "center",
    fontSize: hp(4),
    padding: 8,
    color: "white",
    borderRadius: 5,
  },
});

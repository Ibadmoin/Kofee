import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {themeColors} from '../theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// navigation import
import {IconButton, TextInput} from 'react-native-paper';
import {EyeIcon, EyeSlashIcon} from 'react-native-heroicons/solid';
import SignUp from '../components/SignUp';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Loader from '../components/loader';
import VerifyEmailModal from '../components/VerifyEmailModal';

const LoginScreen = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null)
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [isKeyboardOpen, setKeyboardOpen] = useState(false);
  const [showLoginComp, setShowLoginComp]= useState(true);
  const [token, setToken]= useState(null);
  const [loading, setLoading]= useState(false);
  const [feildError,setFeildError] = useState(null);
  const [requiredFeilds, setRequiredFeilds] = useState(false);
  const [modalActive, setModalActive]= useState(false);
  const [modalHead, setModalHead]= useState(null);
  const [modalText, setModalText]= useState(null);


  const navigation = useNavigation();


  // // load token fromasyncstorage
  useEffect(()=>{
    const loadToken = async()=>{
      try{
        const savedToken = await AsyncStorage.getItem('userToken');
        if(savedToken !== null){
          setToken(savedToken);
          console.log('Token from async storagexd',savedToken);
          navigation.navigate('Home');

        }
      }catch(err){
        console.log('Error loading token:',err)
      }
    }
    loadToken();
  },[]);

  const savedTokenToAsyncStorage = async(apiToken)=>{
    try{
      await AsyncStorage.setItem('userToken',apiToken);
      console.log('Token saved to AsyncStorage');
    }catch(err){
      console.log('Error saving token to AsyncStorage',err);
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(emailRegex.test(email) ? null : 'Invalid email address');
  };

  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z]).{8,}$/;

    setPasswordError(
      passwordRegex.test(password)
        ? null
        : 'Password must have at least 8 characters, including one special character',
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateFields = ()=>{
    if(email ===null && password ===null){
      setFeildError("Feilds can't be empty.");
      return false

    }else{
      console.log("returning value: true");
      setEmailError(null)
      setRequiredFeilds(true);
      return true;
    }
  };

// /Custom alert
  
  const openModal = (modalHead, modalText) => {
    setModalHead(modalHead);
    setModalText(modalText);
    setModalActive(true);
  };
  const closeModal = () => {
    setModalActive(false);
    // Reset modal header and text if needed
    setModalHead(null);
    setModalText(null);
  };
  useEffect(()=>{
    return ()=>{
      closeModal();
    }
  },[])

  const handleLogin = async () => {
    validateEmail();
    validatePassword();
    validateFields();
    if (!emailError && !passwordError && requiredFeilds) { // Check the truthiness of the validation errors
     
      try {
        setLoading(true);
        console.log("trying login...")
        const response = await axios.post(
          `https://sore-pear-seagull-gear.cyclic.app/api/users/login`,
          { email, password }
        );
        const apiToken = response.data.token;
        setToken(apiToken);
        savedTokenToAsyncStorage(apiToken);
        setLoading(false)
        navigation.navigate("Home");
        console.log(`Login successfully`);
        console.log('Token:',apiToken);
      } catch (err) {
        const status = err.response.status;
        const message = err.response.data.message;
        console.log(message.head)
        if(message.head === "Account not verified." && status === 400){
          openModal(message.head,message.text);
          setLoading(false);
        }else if (message === "Invalid Password" && status === 400){
          setPasswordError(message);
          setLoading(false);
        }else{
          setEmailError(message);
          setLoading(false);
        }
        
      }
    }
  };
  
  const toggleShowLoginComp = () => {
    setShowLoginComp(!showLoginComp);
  };
  

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardOpen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardOpen(false);
      },
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <ImageBackground
      source={require('../assets/coffeebg.png')} // Replace with the actual path to your image
      style={[styles.background]}>
       
    {showLoginComp ? (  <View style={styles.container}>
        <View className="mb-10">
          <Text style={styles.text}>Welcome Back!</Text>
          <Text style={styles.subText}>Please Sign in to your account</Text>
        </View>
       
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {loading && <View style={{position:"absolute", width:"100%", height:"100%",display:"flex", justifyContent:"center", alignItems:"center" }}><Loader/></View>}
          {modalActive && <VerifyEmailModal closeModal={closeModal}  Visible={modalActive} ModalHeader={modalHead} ModalText={modalText} />}
          <TextInput
            label="Email"
            value={email}
            style={styles.input}
            textColor="white"
            error={emailError ? true : false}
            activeUnderlineColor={themeColors.bgLight}
            onChangeText={email => setEmail(email)}
          />
          {emailError && <Text style={styles.errorText}>{emailError}</Text>}
          <View style={styles.passContainer}>
            <TextInput
              error={passwordError ? true : false}
              label="Password"
              value={password}
              style={styles.input}
              textColor="white"
              // outlineColor="White"
              secureTextEntry={showPassword ? true : false}
              activeUnderlineColor={themeColors.bgLight}
              onChangeText={password => setPassword(password)}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.iconButton}>
              {showPassword ? (
                <EyeIcon color={'white'} />
                ) : (
                  <EyeSlashIcon color={'white'} />
              )}
            </TouchableOpacity>
          </View>
          {passwordError && (
            <Text style={styles.errorText}>{passwordError}</Text>
            )}
          {feildError && (
            
            <Text style={styles.errorText}>{feildError}</Text>
          )}
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {!isKeyboardOpen && (
            <Text
              className="mt-10"
              style={[
                styles.subText,
                {
                  color: themeColors.bgLight,
                  position: 'absolute',
                  bottom: 10,
                },
              ]} onPress={()=>toggleShowLoginComp()}>
              create an account
            </Text>
          )}
        </ScrollView>
      </View>):(<View>
        <SignUp   toggleShowLoginComp={toggleShowLoginComp}/>
      
      </View>
      )}
    
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    justifyContent: 'center',
    backgroundColor: themeColors.bgDark,
  },
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Adjust the alpha channel for transparency
  },
  text: {
    color: 'white',
    fontSize: hp(6),
    fontWeight: 'bold',
  },
  subText: {
    color: 'white',
    fontSize: hp(3),
    fontWeight: 'light',
  },
  input: {
    width: wp('85%'),
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 10,
    marginTop: 10,
  },
  passContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    position: 'absolute',
    right: 15,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: hp(2),
  },
  loginButton: {
    backgroundColor: themeColors.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: themeColors.bgDark,
    width: hp(25),
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: hp(4),
    letterSpacing: 2,
    fontWeight: 'bold',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  BackHandler,
} from 'react-native';
import {themeColors} from '../theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// navigation import
import {IconButton, TextInput} from 'react-native-paper';
import {EyeIcon, EyeSlashIcon} from 'react-native-heroicons/solid';
import axios from 'axios';
import Loader from './loader';
import VerifyEmailModal from './VerifyEmailModal';


export default function SignUp({toggleShowLoginComp}) {
      const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confrimPassword, setConfrimPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [isKeyboardOpen, setKeyboardOpen] = useState(false);
  const [phone, setPhone]= useState("+92");
  const [loading, setLoading]= useState(false);
  const[userName, setUserName]= useState(null);
  const [requriedFeilds, setRequiredFeilds]= useState(false);
  const [feildError, setFeildError]= useState(null);
  const [modalActive, setModalActive]= useState(false);
  const [modalHead, setModalHead]= useState(null);
  const [modalText, setModalText]= useState(null);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(emailRegex.test(email) ? null : 'Invalid email address');
  };

  const validatePassword = () => {
    if(password ===""){
      setPasswordError("Field can't be empty!");
     
    }else{
      if(password !== confrimPassword){
        setPasswordError("Passwords do not match");

       
        return;
      }
        const passwordRegex =
      /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z]).{8,}$/;

    setPasswordError(
      passwordRegex.test(password)
        ? null
        : 'Password must have at least 8 characters, including one special character',
    );

    }
    
  };

  const validateFields = ()=>{
    if(email ===null && password ===null && userName === null ){

      setFeildError("Feilds can't be empty.");
      setRequiredFeilds(false);
      console.log("re is false");
      
      
    }else{
      setFeildError(null);
      setRequiredFeilds(true);
      console.log("re is true");


    }
  }
  const handleSetLoginComp = ()=>{
    toggleShowLoginComp();

  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  };

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


  const handleSignUp = async()=>{
    validateFields();
    validateEmail();
    validatePassword();
    if(requriedFeilds){
      try{
        setLoading(true);
        const response = await axios.post('https://sore-pear-seagull-gear.cyclic.app/api/users/register',{email, password, userName,phone});
        console.log(response.data)
        setLoading(false);
        openModal(response.data.message.head,response.data.message.text )

      }catch(err){

        const errorResponse = err.response.data;
        const errorStatus = err.response.status;
       
  
        if (errorStatus === 400 && errorResponse.message.head === "Email already Registered.") {
         
          openModal(errorResponse.message.head, errorResponse.message.text);
          setLoading(false);
        }else if(errorStatus === 400 && errorResponse.message=== "Email already exists."){
          setEmailError(errorResponse.message)
        } 
        else {
          console.log("Signup unsuccessful.");
          console.log(errorResponse.data);
        }
  
        setLoading(false);

      }
    }
  }

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
    <View className="  h-100" style={{height:hp(90)}}>
      {!isKeyboardOpen && (
            <Text
              className="mt-10"
              style={[
                styles.subText,
                {

                  color: themeColors.bgLight,
                  position: 'absolute',
                  top: -40,
                  left:hp(2),
                },
              ]} onPress={handleSetLoginComp}>
                Already have an account
            </Text>
          )}
          {loading && <View style={{ width:hp(50), height:hp(50),position:"absolute" ,top:"20%",left:hp(5) }}>
            <Loader  />
            
            </View>}
          {modalActive && <VerifyEmailModal closeModal={closeModal}  Visible={modalActive} ModalHeader={modalHead} ModalText={modalText} />}
          
      <View className="mt-10 ">
          <Text style={[styles.text,{textAlign:"center"}]}>SignUp Page </Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TextInput
            label="UserName"
            value={userName}
            style={styles.input}
            textColor="white"
            
            activeUnderlineColor={themeColors.bgLight}
            onChangeText={userName => setUserName(userName)}
          />
          <TextInput
            label="Email"
            value={email}
            style={styles.input}
            textColor="white"
            error={emailError ? true : false}
            activeUnderlineColor={themeColors.bgLight}
            onChangeText={email => setEmail(email)}
          />
         
          {/* phone validation here... */}
          <TextInput
            label="Phone"
            value={phone}
            style={styles.input}
            keyboardType='numeric'
            maxLength={13}
         
            textColor="white"
            error={emailError ? true : false}
            activeUnderlineColor={themeColors.bgLight}
            onChangeText={phone => setPhone(phone)}
          />
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
          <View style={styles.passContainer}>
            <TextInput
              error={passwordError ? true : false}
              label="Confrim Password"
              value={confrimPassword}
              style={styles.input}
              textColor="white"
              // outlineColor="White"
              secureTextEntry={showPassword ? true : false}
              activeUnderlineColor={themeColors.bgLight}
              onChangeText={confrimPassword => setConfrimPassword(confrimPassword)}
            />
        
          </View>
         
           {emailError? <Text style={styles.errorText}>{emailError}</Text>:passwordError?<Text style={styles.errorText}>{passwordError}</Text>:null}
          <TouchableOpacity onPress={handleSignUp} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>SignUp</Text>
          </TouchableOpacity>

      
        </ScrollView>
    </View>
  )
}


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
      paddingTop:20,
    },
  });
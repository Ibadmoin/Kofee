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
  Modal,
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



export default function SignUp({toggleShowLoginComp}) {
      const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confrimPassword, setConfrimPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [isKeyboardOpen, setKeyboardOpen] = useState(false);
  const [phone, setPhone]= useState("+92");
  const [loading, setLoading]= useState(false);
  const[userName, setUserName]= useState("");
const [successMsg, setSuccessMsg]= useState(null);
const [errorMsg, setErrorMsg]= useState(null);


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

        console.log("dont")
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
  const handleSetLoginComp = ()=>{
    toggleShowLoginComp();

  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  };

  const handleSignUp =async ()=>{
    validateEmail();
    validatePassword();
    // need work here...
    if (!emailError && !passwordError) {
      setLoading(true);

      try{
        const response = await axios.post(`https://sore-pear-seagull-gear.cyclic.app/api/users/register`,{email,password,userName,phone});
        console.log("register successfully");
        const apitoken = response.data;
        console.log(apitoken);
        console.log(response.data.text)
        setSuccessMsg(response.data.text);
        
      }catch(err){
        if(err.response){
          if(err.response.status === 400 &&err.response.data.message === "email already exists."){
            console.log("email already exists.")
            setErrorMsg(err.response.data.message);
          }
        }else{
          console.log("Internal server Error! Try later")
      }
      }
     
    }
    
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
           {errorMsg?<Text style={styles.errorText}>{errorMsg}</Text>:<Text style={styles.successText}>{successMsg}</Text> }
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
    successText:{
      color: 'green',
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
    modalContent: {
      backgroundColor: themeColors.bgDark,
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalText: {
      color: 'white',
      fontSize: hp(2),
      marginBottom: 15,
    },
    modalButton: {
      backgroundColor: themeColors.primary,
      padding: 10,
      borderRadius: 5,
      width: hp(15),
      alignItems: 'center',
    },
    modalButtonText: {
      color: 'white',
      fontSize: hp(2),
      fontWeight: 'bold',
    },
  });
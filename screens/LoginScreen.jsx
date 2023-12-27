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

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [isKeyboardOpen, setKeyboardOpen] = useState(false);
  const [showLoginComp, setShowLoginComp]= useState(true);

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

  const handleLogin = () => {
    validateEmail();
    validatePassword();
    if (!validateEmail && !validatePassword) {
      console.log('Login successfully');
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
    <ImageBackground
      source={require('../assets/coffeebg.png')} // Replace with the actual path to your image
      style={styles.background}>
    {showLoginComp ? (  <View style={styles.container}>
        <View className="mb-10">
          <Text style={styles.text}>Welcome Back!</Text>
          <Text style={styles.subText}>Please Sign in to your account</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
                <EyeSlashIcon color={'white'} />
              ) : (
                <EyeIcon color={'white'} />
              )}
            </TouchableOpacity>
          </View>
          {passwordError && (
            <Text style={styles.errorText}>{passwordError}</Text>
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
              ]} onPress={()=>setShowLoginComp(false)}>
              create an account
            </Text>
          )}
        </ScrollView>
      </View>):(<Text style={{color:"white"}} onPress={()=>setShowLoginComp(true)}>already have account</Text>)}
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

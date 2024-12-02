import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../Assets/font/mustardo.ttf';
//import { useDispatch } from 'react-redux';


  const API_URL = 'https://671c7a012c842d92c382f99d.mockapi.io/user';
const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setError(''); // Xóa thông báo lỗi trước đó
    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    try {
      const response = await fetch(API_URL);
      const users = await response.json();

      const user = users.find((u) => u.email === email && u.password === password);
      if (user) {
        dispatch({ type: 'addData', payload: user });
        dispatch({ type: 'log_in' });
        navigation.goBack();
      } else {
        setError('Email hoặc mật khẩu không chính xác!');
      }
    } catch (err) {
      console.error('Lỗi khi đăng nhập:', err.message);
      Alert.alert('Lỗi', 'Không thể kết nối với máy chủ. Vui lòng thử lại sau!');
    }
  };

    return (
    <View style={styles.mainContainer}>
        {/* Header ngoài container */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Sign In</Text>
        </View>
  
      <View style={styles.container}>
        
        {/* Logo */}
        <Image
          source={require('../Assets/logo.png')} // Thay thế bằng URL logo của bạn
          style={styles.logo}
        />
  
        {/* Username Input */}
        <View style={styles.inputContainer}>
          <Image
            source={require('../Assets/user-svgrepo-com.svg')} // Thay icon người dùng
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#aaa"
            value={username}
            onChangeText={setUsername}
          />
        </View>
  
        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Image
            source={require('../Assets/lock-alt-svgrepo-com.svg')} // Thay icon khóa
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
  
        {/* Sign In Button */}
       <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
  <Text style={styles.signInButtonText}>Sign In</Text>
</TouchableOpacity>

  
        {/* Sign Up Link */}
        <Text style={styles.signUpText}>
          Don't have an account?{' '}
          <Text
            style={styles.signUpLink}
            onPress={() => navigation.navigate('SignUp')}>
            Sign up
          </Text>
        </Text>
  
        {/* Social Media Buttons */}
       

        <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
          <Image
            source={require('../Assets/google-color-svgrepo-com.svg')} // Thay icon Google
            style={styles.socialIcon}
          />
          <Text style={styles.socialButtonText}>Connect With Google</Text>
        </TouchableOpacity>
      </View>
    </View>
    );
  };

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
      },
    header: {
    backgroundColor: '#000', // Màu nền header đổi thành màu đen
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', // Để header nằm ngoài container
    top: 0,
    zIndex: 10,
  },
     headerText: {
  fontSize: 30,
  fontWeight: 'bold',
  color: '#ff0000', // Đổi màu chữ thành đỏ
},

    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingHorizontal: 20,
    },
    logo: {
      width: 220,
      height: 220,
      marginBottom:5,
      marginTop:50,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      height: 50,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 8,
      marginVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: '#f7f7f7',
    },
    inputIcon: {
      width: 20,
      height: 20,
      marginRight: 10,
    },
    input: {
      flex: 1,
      color: '#000',
    },
 signInButton: {
  backgroundColor: '#ff0000', // Đổi nền thành màu đỏ
  paddingVertical: 10,
  paddingHorizontal: 50,
  borderRadius: 8,
  marginTop: 15,
},
signInButtonText: {
  color: '#000', // Đổi màu chữ thành đen
  fontSize: 20,
  fontWeight: 'bold',
},

    signUpText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14,
    color: '#000', // Đổi màu chữ của Sign In và Sign Up thành màu đen
    },
    signUpLink: {
    color: '#000', // Đổi màu chữ link thành màu đen
    fontWeight: 'bold',
  },
    socialButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 8,
      marginVertical: 5,
      width: '100%',
      marginTop: 10,
      marginBottom: 10,
    },
  
    googleButton: {
      backgroundColor: '#5A7E92',
    },
    socialButtonText: {
      color: '#fff',
      fontSize: 14,
      marginLeft: 10,
    },
    socialIcon: {
      width: 20,
      height: 20,
    },
  });

export default SignIn;

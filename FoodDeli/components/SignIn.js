import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../Assets/font/mustardo.ttf';
const SignIn = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
    <View style={styles.mainContainer}>
        {/* Header ngoài container */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Sign In</Text>
        </View>
  
      <View style={styles.container}>
        
        {/* Logo */}
        <Image
          source={require('../Assets/LogoSignIn.png')} // Thay thế bằng URL logo của bạn
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
        <TouchableOpacity style={styles.signInButton}>
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
        <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
          <Image
            source={require('../Assets/facebook-color-svgrepo-com.svg')} // Thay icon Facebook
            style={styles.socialIcon}
          />
          <Text style={styles.socialButtonText}>Connect With Facebook</Text>
        </TouchableOpacity>
  
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
        backgroundColor: '#f8d7e2', // Màu nền header
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
        color: '#db7093',
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
      backgroundColor: '#d86fa6',
      paddingVertical: 10,
      paddingHorizontal: 50,
      borderRadius: 8,
      marginTop: 15,
    },
    signInButtonText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
    },
    signUpText: {
      marginTop: 10,
      marginBottom: 10,
      fontSize: 14,
      color: '#000',
    },
    signUpLink: {
      color: '#d86fa6',
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
    facebookButton: {
      backgroundColor: '#4FB6ED',

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

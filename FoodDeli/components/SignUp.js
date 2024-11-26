import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError(null);

    const apiUrl = 'https://672f3422229a881691f22a29.mockapi.io/SignUp';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Sign up successful!');
        navigation.navigate('SignIn');
      } else {
        setError('Failed to sign up. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
        {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            style={styles.backIcon}
            source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/left.png' }}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Sign Up</Text>
      </View>

  
    <View style={styles.container}>
      
      {/* Title */}
      <Text style={styles.title}>Create Account</Text>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <Image
          style={styles.icon}
          source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/user.png' }}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image
          style={styles.icon}
          source={{ uri: 'https://img.icons8.com/color/48/000000/gmail.png' }}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image
          style={styles.icon}
          source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/lock.png' }}
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

      {/* Create Account Button */}
      <TouchableOpacity style={styles.createAccountButton}>
        <Text style={styles.createAccountButtonText}>Create Account</Text>
      </TouchableOpacity>

      {/* OR Separator */}
      <Text style={styles.orText}>OR</Text>

      {/* Social Buttons */}
      <TouchableOpacity style={styles.facebookButton}>
        <Image
          style={styles.socialIcon}
          source={{ uri: 'https://img.icons8.com/ios-filled/50/ffffff/facebook.png' }}
        />
        <Text style={styles.facebookButtonText}>Connect With Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton}>
        <Image
          style={styles.socialIcon}
          source={{ uri: 'https://img.icons8.com/ios-filled/50/ffffff/google-logo.png' }}
        />
        <Text style={styles.googleButtonText}>Connect With Google</Text>
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
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: '#000',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#db7093',
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginVertical: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  createAccountButton: {
    backgroundColor: '#db7093',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  createAccountButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    fontSize: 14,
    color: '#000',
    marginVertical: 20,
  },
  facebookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b5998',
    paddingVertical: 10,
    borderRadius: 10,
    width: '100%',
    marginVertical: 5,
    justifyContent: 'center',

  },
  facebookButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#db4437',
    paddingVertical: 10,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',

  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  socialIcon: {
    width: 20,
    height: 20,
  },
});

export default SignUp;

import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

const API_URL = 'https://671c7a012c842d92c382f99d.mockapi.io/user';

const DangNhap = ({ navigation }) => {
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
    <View style={styles.container}>
      <ImageBackground
        source={require('../image/backgroundYoutube1.jpg')}
        resizeMode="cover"
        style={styles.background}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Login Now</Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor="grey"
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="grey"
            secureTextEntry
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
          />

          {error !== '' && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>New user? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('DangKy')}>
              <Text style={styles.registerLink}>Đăng ký tại đây</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default DangNhap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  formContainer: {
    width: 300,
    height: 400,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: 250,
    height: 50,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    color: 'white',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  loginButton: {
    width: 90,
    height: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  loginButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerText: {
    color: 'white',
  },
  registerLink: {
    color: 'green',
    fontWeight: 'bold',
  },
});

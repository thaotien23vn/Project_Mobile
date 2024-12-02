import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useState } from 'react';

const API_URL = 'https://671c7a012c842d92c382f99d.mockapi.io/user'; // Mock API URL

const DangKy = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError('Email không hợp lệ. Vui lòng nhập đúng định dạng email.');
      return false;
    }
    if (!email.endsWith('@gmail.com')) {
      setError('Email phải có đuôi @gmail.com.');
      return false;
    }
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu và xác nhận mật khẩu không khớp.');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(API_URL);
      const existingUsers = await response.json();

      // Kiểm tra xem email đã tồn tại chưa
      const emailExists = existingUsers.some((user) => user.email === email);

      if (emailExists) {
        setError('Email đã tồn tại! Vui lòng sử dụng email khác.');
      } else {
        const registerResponse = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (registerResponse.ok) {
          Alert.alert('Thành công', 'Đăng ký thành công! Hãy đăng nhập.', [
            { text: 'OK', onPress: () => navigation.navigate('DangNhap') },
          ]);
        } else {
          setError('Đăng ký không thành công. Vui lòng thử lại.');
        }
      }
    } catch (error) {
      setError('Có lỗi xảy ra. Vui lòng kiểm tra kết nối mạng.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../image/youtube-application-logo-3d-rendering-black-background_41204-22027.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.form}>
          <Text style={styles.title}>Đăng ký</Text>
          <TextInput
            placeholder="Email"
            placeholderTextColor="grey"
            style={styles.input}
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            placeholder="Mật khẩu"
            placeholderTextColor="grey"
            secureTextEntry={true}
            style={styles.input}
            onChangeText={setPassword}
            value={password}
          />
          <TextInput
            placeholder="Xác nhận mật khẩu"
            placeholderTextColor="grey"
            secureTextEntry={true}
            style={styles.input}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
          {error !== '' && <Text style={styles.errorText}>{error}</Text>}
          {loading ? (
            <ActivityIndicator size="large" color="white" style={styles.loader} />
          ) : (
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
              <Text style={styles.registerText}>ĐĂNG KÝ</Text>
            </TouchableOpacity>
          )}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Đã có tài khoản?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('DangNhap')}>
              <Text style={styles.signInText}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: 320,
    height: 480,
    backgroundColor: 'black',
    opacity: 0.9,
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    paddingLeft: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  loader: {
    marginTop: 10,
  },
  registerButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#1e90ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  registerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  footerText: {
    color: 'white',
    marginRight: 5,
  },
  signInText: {
    color: '#00ff00',
    fontWeight: 'bold',
  },
});

export default DangKy;

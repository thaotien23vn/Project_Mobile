import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

  const API_URL = 'https://671c7a012c842d92c382f99d.mockapi.io/user'; // Mock API URL

const SignUp = ({ navigation }) => {
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
    <View style={styles.mainContainer}>
        {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
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

      <TouchableOpacity 
        style={styles.createAccountButton} 
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text style={styles.createAccountButtonText}>
          {loading ? 'Signing Up...' : 'Create Account'}
        </Text>
      </TouchableOpacity>
      {/* OR Separator */}
      <Text style={styles.orText}>OR</Text>

     
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
    color: '#ff0000', // Màu đỏ cho chữ SignUp
    marginLeft: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    alignItems: 'center',
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
    backgroundColor: '#ff0000', // Nền màu đỏ
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  createAccountButtonText: {
    color: '#000', // Chữ màu đen
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    fontSize: 14,
    color: '#000',
    marginVertical: 20,
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

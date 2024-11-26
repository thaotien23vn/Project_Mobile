import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './components/SignIn'; // Đường dẫn tới file SignIn.js
import SignUp from './components/SignUp'; // Đường dẫn tới file SignUp.js
import HomeFood from './components/HomeFood'; // Đường dẫn tới file SignUp.js
import  Order from './components/Order.js';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="HomeFood" component={HomeFood} options={{ headerShown: false }} />
         <Stack.Screen name="Order" component={Order} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

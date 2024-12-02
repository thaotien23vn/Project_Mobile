import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/Screens/Home'
import Search from './src/Screens/Search'
import ChannelSub from './src/Screens/ChannelSub'
import History from './src/Screens/History';
import VideoPlayer from './src/Screens/VideoPlayer';
import Card from './src/Component/Card';
import DangNhap from './src/Screens/DangNhap';
import DangKy from './src/Screens/DangKy';
import infoChannel from './src/Screens/infoChannel'; 
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';
import { reducer } from './src/Component/Reducer';


//https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=song&type=video&key=AIzaSyAkR64LHntE29CluL5A6NOjZp-pwqRZ3oo
//AIzaSyDtlgOUocDV93ajAvmn_LXIYSpxQb7h2lw
//AIzaSyCiPpCXyHTU2FtWNlhbDkdX_5rLTST94xg
const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();
const store = createStore(reducer)


const mainHome =()=>{
  return(
<Tabs.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({color}) => {
      let iconName;

      if (route.name === 'Home') {
        iconName = 'home';
      } else if (route.name === 'Channel Sub') {
        iconName = 'subscriptions';
      }else if (route.name === 'History') {
        iconName = 'history';
      }

      // You can return any component that you like here!
      return <MaterialIcons name={iconName} size={32} color={color} />;
    },
    tabBarActiveTintColor: 'red',
    tabBarInactiveTintColor: 'gray',
  })}
>
    <Tabs.Screen name='Home' component={Home} options={{ headerShown: false }}/>
    <Tabs.Screen name='Channel Sub' component={ChannelSub} options={{ headerShown: false }}/>
    <Tabs.Screen name='History' component={History} options={{ headerShown: false }}/>
  </Tabs.Navigator>
  )
  
}

export default function App() {
  return (
    <Provider store={store}>
<NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name='MainHome' component={mainHome} options={{ headerShown: false }}/>
        <Stack.Screen name='Search' component={Search} options={{ headerShown: false }}/>
        <Stack.Screen name='Video' component={VideoPlayer}/>
        <Stack.Screen name='Card' component={Card}/>
        <Stack.Screen name='DangNhap' component={DangNhap} options={{ headerShown: false }}/>
        <Stack.Screen name='DangKy' component={DangKy} options={{ headerShown: false }}/>
        <Stack.Screen name='Channel' component={infoChannel}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Dimensions,FlatList,TouchableOpacity } from 'react-native';
import {AntDesign, EvilIcons, FontAwesome5} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import VideoPlayer from '../Screens/VideoPlayer'
import History from '../Screens/History';
import { useSelector, useDispatch } from 'react-redux';

const url = 'https://671cb18409103098807ae082.mockapi.io/user'

export default function Card(props) {
      const navigation = useNavigation();
      const [channel, setChannel] = useState([])
      const Data = useSelector(state=>{
        return state.data.id
      })
      const dispatch = useDispatch();

      const updateVideoDaXem = async ()=>{
        const res = await fetch(`https://671cb18409103098807ae082.mockapi.io/user/${Data}`,{
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
        },
        });
        const data = await res.json();
        if(!data.videoDaXem){
            data.videoDaXem = [];
        }
        data.videoDaXem.push({
            idVideo: props.videoId,
            thumbnailURL: props.thumbnails,
            titleVideo: props.title,
            channelName: props.channel,
            channelBanner: channel[0].snippet.thumbnails.default.url,
            idChannel: props.channelId
        });
        const updateRes = await fetch(`https://671cb18409103098807ae082.mockapi.io/user/${Data}`,{
            method: 'PUT',
            headers:{
                'Accept': "application/json",
                "Content-type": "application/json; charset=UTF-8",
            },
            body:JSON.stringify(data)
        })
        
        
      }

      const updateDataAndFetch = async () => {
          await updateVideoDaXem(); // Cập nhật dữ liệu trong Redux
          const response = await fetch(url); // Yêu cầu mới để lấy dữ liệu từ API
          if (response.ok) {
            const data = await response.json();
            for (var i = 0; i < data.length; i++) {
              if (Data == data[i].id) {
                dispatch({type:'addData', payload: data[i]})
              }
            }
          } 
        }

      const fetchData = ()=>{
        fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=id&id=${props.channelId}&key=AIzaSyDmajzJpryX-zwRMHHsKqDUSvdb6wklmpY`)
        .then((res)=>res.json())
        .then((data)=>{     
            setChannel(data.items)
        })
    }

    useEffect(fetchData,[])
    

      
  return (
    <TouchableOpacity 
    onPress = {()=>{updateVideoDaXem(), 
        updateDataAndFetch(),
        navigation.navigate('Video',{
            videoId: props.videoId, 
            title: props.title,
            channelName: props.channel,
            channelId: props.channelId,
            channelBanner: channel[0].snippet.thumbnails.default.url
        })
        
}}
    >
<View style = {styles.body}
    
    >
        <Image source = {props.thumbnails} style = {styles.video}/>
        <View style = {styles.infoVideo}>
            <FlatList
            data={channel}
            renderItem={({item})=>{
                return(
                    <View>
                        <Image source= {item.snippet.thumbnails.default.url} style = {styles.imageUser}/>
                    </View>
                )
            }}
            />
            
            <View>
                <Text 
                style = {styles.textTieuDeVideo}
                ellipsizeMode='tail'
                numberOfLines={2}
                >
                    {props.title}</Text>    
                <Text style = {styles.textNameChannel}>{props.channel}</Text>   
            </View>
            
        </View>
          
    </View>
    </TouchableOpacity>
    


    
    
  );
}
const styles = StyleSheet.create({
    body:{
        marginBottom: 20,
        marginTop: 10,
    },
    video:{
        
        width: '100%',
        height: 218,
        marginBottom: 5,
    },
    infoVideo:{
        flexDirection: 'row',
        marginLeft: 10,
      
    },
    imageUser:{
        borderRadius: 100,
        width: 40,
        height: 40,
        marginRight: 10,
        marginTop: 5,
    },
    textTieuDeVideo:{
        fontSize: 18,
        width: Dimensions.get('window').width - 50
    },
    textNameChannel:{
        fontSize: 13,
        color: 'grey',
    }
  });
  

  


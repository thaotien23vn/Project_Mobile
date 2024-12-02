import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../Component/Header';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const url = "https://671cb18409103098807ae082.mockapi.io/user";
export default function History({ navigation }) {
  const data = useSelector((state) => state.data.videoDaXem);

  return (
    <View style={styles.container}>
      <View style={{ zIndex: 1 }}>
        <Header />
      </View>
      <View style={styles.historyHeader}>
        <MaterialIcons name='history' size={50} />
        <Text style={styles.historyText}>Video đã xem</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.idVideo.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Video', {
                videoId: item.idVideo,
                title: item.titleVideo,
                channelName: item.channelName,
                channelBanner: item.channelBanner,
                channelId: item.idChannel,
              })
            }
          >
            <View style={styles.videoItem}>
              <Image source={{ uri: item.thumbnailURL }} style={styles.video} />
              <View style={styles.infoVideo}>
                <Image source={{ uri: item.channelBanner }} style={styles.imageUser} />
                <View style={styles.textContainer}>
                  <Text style={styles.textTieuDeVideo} numberOfLines={2} ellipsizeMode='tail'>
                    {item.titleVideo}
                  </Text>
                  <Text style={styles.textNameChannel}>{item.channelName}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 20,
  },
  historyText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  videoItem: {
    marginBottom: 20,
    marginTop: 10,
  },
  video: {
    width: '100%',
    height: 218,
    marginBottom: 5,
    borderRadius: 8, // Thêm bo góc cho ảnh thumbnail
  },
  infoVideo: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 5,
    alignItems: 'center',
  },
  imageUser: {
    borderRadius: 100,
    width: 40,
    height: 40,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  textTieuDeVideo: {
    fontSize: 18,
    width: Dimensions.get('window').width - 60, // Điều chỉnh chiều rộng để tránh bị tràn
  },
  textNameChannel: {
    fontSize: 13,
    color: 'grey',
    marginTop: 5, // Thêm khoảng cách giữa tiêu đề và tên kênh
  },
});

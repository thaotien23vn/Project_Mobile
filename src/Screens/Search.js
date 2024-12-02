import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TextInput, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import Card from '../Component/Card';

export default function Search({ navigation }) {
    const [text, setText] = useState("");
    const [cardData, setCardData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Hàm tìm kiếm video
    const fetchData = () => {
        if (!text.trim()) return; // Không tìm kiếm nếu ô tìm kiếm trống
        setLoading(true);
        fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${text}&type=video&key=AIzaSyDmajzJpryX-zwRMHHsKqDUSvdb6wklmpY`)
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                setCardData(data.items);
            })
            .catch(() => {
                setLoading(false);
                alert('Đã xảy ra lỗi, vui lòng thử lại!');
            });
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Ionicons 
                    style={styles.iconBack} 
                    name="arrow-back" 
                    size={32} 
                    onPress={() => navigation.goBack()} 
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => setText(text)}
                    value={text}
                    placeholder="Tìm kiếm video..."
                    placeholderTextColor="#888"
                />
                <Ionicons 
                    style={styles.iconSend} 
                    name="send" 
                    size={30} 
                    onPress={() => fetchData()} 
                />
            </View>

            {/* Hiển thị danh sách video */}
            {loading ? (
                <ActivityIndicator size="large" color="red" style={styles.loading} />
            ) : cardData.length > 0 ? (
                <FlatList
                    data={cardData}
                    renderItem={({ item }) => (
                        <Card
                            videoId={item.id.videoId}
                            title={item.snippet.title}
                            channel={item.snippet.channelTitle}
                            channelId={item.snippet.channelId}
                            thumbnails={item.snippet.thumbnails.medium.url}
                        />
                    )}
                    keyExtractor={(item) => item.id.videoId}
                />
            ) : (
                <Text style={styles.noResultsText}>Không tìm thấy kết quả nào!</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBack: {
        marginLeft: 10,
    },
    iconSend: {
        position: 'absolute',
        right: 10,
    },
    textInput: {
        position: 'absolute',
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        width: '75%',
        height: 35,
        fontSize: 16,
        left: 50,
        paddingLeft: 15,
        paddingRight: 20,
    },
    loading: {
        marginTop: 20,
    },
    noResultsText: {
        fontSize: 18,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
    }
});

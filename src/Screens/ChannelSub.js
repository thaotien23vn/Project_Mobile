import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Header from "../Component/Header";
import { useSelector } from "react-redux";

export default function ChannelSub({ navigation }) {
  const Data = useSelector((state) => state.data.kenhDangKy);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      {/* Title */}
      <Text style={styles.title}>Tất cả các kênh đăng ký</Text>

      {/* Channel List */}
      <FlatList
        data={Data}
        keyExtractor={(item) => item.idChannel.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Channel", {
                channelId: item.idChannel,
                channelBanner: item.avartaChannel,
                channelName: item.nameChannel,
                customUrl: item.customUrl,
                subCount: item.subCount,
                videoCount: item.videoCount,
                description: item.description,
              })
            }
            style={styles.channelCard}
          >
            <Image
              source={{ uri: item.avartaChannel }}
              style={styles.channelImage}
            />
            <View style={styles.channelInfo}>
              <Text style={styles.channelName}>{item.nameChannel}</Text>
              <Text style={styles.subCount}>{item.subCount} Subscribers</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop: 20,
    backgroundColor: "#f8f8f8", // Light background for a cleaner look
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
    color: "#333", // Darker text for better readability
  },
  channelCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff", // White background for each channel card
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Adds a shadow effect for depth
  },
  channelImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  channelInfo: {
    flex: 1,
    justifyContent: "center",
  },
  channelName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // Dark color for channel name
  },
  subCount: {
    fontSize: 14,
    color: "#888", // Lighter color for the subscriber count
  },
});

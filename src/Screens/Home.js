import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
} from "react-native";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import Card from "../Component/Card";

export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [videoData, setVideoData] = useState([]);
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Music");

  const disPlayNameUser = useSelector((state) => state.data.email);
  const loggedIn = useSelector((state) => state.loggedIn);

  const categories = ["Âm Nhạc", "Trò Chơi", "Tin Tức", "Thể Thao", "Giáo Dục"];

  const fetchCategoryVideos = (category) => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&q=${category}&key=AIzaSyDmajzJpryX-zwRMHHsKqDUSvdb6wklmpY`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.items) {
          setVideoData(data.items);
        }
      })
      .catch((error) => console.error("Lỗi khi lấy video theo danh mục:", error));
  };

  const fetchSuggestedVideos = () => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=10&key=AIzaSyDmajzJpryX-zwRMHHsKqDUSvdb6wklmpY`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.items) {
          setSuggestedVideos(data.items);
        }
      })
      .catch((error) => console.error("Lỗi khi lấy gợi ý:", error));
  };

  const handleLogout = () => {
    dispatch({ type: "log_out" });
    setMenuVisible(false);
  };

  useEffect(() => {
    fetchSuggestedVideos();
    fetchCategoryVideos(selectedCategory);
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.leftHeader}>
          <AntDesign
            style={styles.iconYoutube}
            name="youtube"
            size={32}
            color="red"
          />
          <Text style={styles.textYoutube}>YouTube</Text>
        </TouchableOpacity>

        <View style={styles.rightHeader}>
          <EvilIcons
            style={styles.iconSearch}
            name="search"
            size={32}
            color={"black"}
            onPress={() => navigation.navigate("Search")}
          />
          <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
            <Image
              source={require("../image/UserIcon.png")}
              style={styles.imageUser}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>
          {loggedIn
            ? `Xin chào, ${disPlayNameUser}!`
            : "Chào mừng bạn đến với ứng dụng YouTube"}
        </Text>
      </View>

      {/* User Menu */}
      {menuVisible && (
        <View style={styles.popupMenu}>
          <SafeAreaView style={styles.popupContainer}>
            {loggedIn ? (
              <View style={styles.popupOption}>
                <Text>{disPlayNameUser}</Text>
              </View>
            ) : (
              <Pressable
                onPress={() => {
                  navigation.navigate("DangNhap");
                  setMenuVisible(false);
                }}
                style={styles.popupOption}
              >
                <Text>Đăng nhập</Text>
              </Pressable>
            )}
            <Pressable onPress={handleLogout} style={styles.popupOption}>
              <Text>Đăng xuất</Text>
            </Pressable>
          </SafeAreaView>
        </View>
      )}

      {/* Category Navigation */}
      <View style={styles.categoryNav}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Suggested Videos Section */}
     {/* <View style={styles.suggestedContainer}>
        <Text style={styles.sectionTitle}>Video gợi ý</Text>
        <FlatList
          data={suggestedVideos}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestedItem}
              onPress={() => navigation.navigate("VideoDetail", { videoId: item.id })}
            >
              <Image
                source={{ uri: item.snippet.thumbnails.medium.url }}
                style={styles.suggestedThumbnail}
              />
              <Text style={styles.suggestedTitle}>{item.snippet.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Video List */}
      <View style={styles.listContainer}>
        <FlatList
          data={videoData}
          keyExtractor={(item) => item.id.videoId || Math.random().toString()}
          renderItem={({ item }) => (
            <Card
              videoId={item.id.videoId}
              title={item.snippet.title}
              channel={item.snippet.channelTitle}
              channelId={item.snippet.channelId}
              thumbnails={item.snippet.thumbnails.medium.url}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconYoutube: {
    marginRight: 5,
  },
  textYoutube: {
    fontSize: 25,
    fontWeight: "bold",
  },
  rightHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageUser: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginLeft: 10,
  },
  welcomeContainer: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  welcomeText: {
    fontSize: 18,
    color: "#333",
  },
  popupMenu: {
    position: "absolute",
    zIndex: 2,
    right: 10,
    top: 60,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  popupContainer: {
    padding: 10,
  },
  popupOption: {
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 40,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  categoryNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  categoryButtonActive: {
    backgroundColor: "#ff0000",
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
  },
  categoryTextActive: {
    color: "white",
  },
  suggestedContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  suggestedItem: {
    marginRight: 10,
    width: 120,
  },
  suggestedThumbnail: {
    width: "100%",
    height: 80,
    borderRadius: 5,
  },
  suggestedTitle: {
    fontSize: 12,
    marginTop: 5,
    color: "#333",
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

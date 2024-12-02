import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
} from "react-native";
import { AntDesign, EvilIcons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

export default function Header() {
  const [selected, setselected] = useState(false);  
  const navigation = useNavigation();
  const disPatch = useDispatch()

  const disPlayNameUser = useSelector(state=>{
    return state.data.email
  })
  const loggedIn = useSelector(state=>{
    return state.loggedIn
  })


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <AntDesign
            style={styles.iconYoutube}
            name="youtube"
            size={32}
            color="red"
          />
          <Text style={styles.textYoutube}>YouTube</Text>
        </View>

        <View style={styles.rightHeader}>
          <EvilIcons
            style={styles.iconSearch}
            name="search"
            size={32}
            color={"black"}
            onPress={() => navigation.navigate("Search")}
          />
          <View>
            <TouchableOpacity
              onPress={() => {
                if (selected === false) setselected(true);
                else if(selected===true) setselected(false)
              }}
            >
              <Image
                source={require("../image/UserIcon.png")}
                style={styles.imageUser}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {selected === true && (
        <View style={{ flex: 1, alignItems: "flex-end", marginEnd: 30,position:'absolute',zIndex:2,right:1,top:51 }}>
          <SafeAreaView style={{ width: 100, height: 100 }}>

            {loggedIn?(<View style = {{
                alignItems: "center",
                justifyContent: "center",
                width: 120,
                height: 40,
                borderWidth: 1,
                borderColor: "black",
                borderRadius: 10,
                backgroundColor: "#f0f0f0",
                marginVertical: 10,
              }}>
               <Text>{disPlayNameUser}</Text>
            </View>):(<Pressable
            onPress={()=>{navigation.navigate("DangNhap"), setselected(false)}}
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 120,
                height: 40,
                borderWidth: 1,
                borderColor: "black",
                borderRadius: 10,
                backgroundColor: "#f0f0f0",
                marginVertical: 10,
              }}
            >
              <Text>Đăng nhập</Text>
            </Pressable>)}

            

            <Pressable
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 120,
                height: 40, 
                borderWidth: 1,
                borderColor: "black",
                borderRadius: 10,
                backgroundColor: "#f0f0f0",
              }}
              onPress={()=>disPatch({type: 'log_out'})}
            >
              <Text>Đăng xuất</Text>
            </Pressable>
          </SafeAreaView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
},
  leftHeader: {
    flexDirection: "row",
    margin: 10,
  },
  iconYoutube: {
    marginLeft: 10,
    marginRight: 5,
  },
  textYoutube: {
    fontSize: 25,
    fontWeight: "bold",
  },
  rightHeader: {
    flexDirection: "row",
    margin: 10,
  },
  imageUser: {
    width: 30,
    height: 30,
    marginLeft: 20,
  },
});
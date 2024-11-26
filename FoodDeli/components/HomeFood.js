import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, FlatList } from 'react-native';

const categories = ['Cà Phê/Trà', 'Bánh Mì', 'Bún/Phở', 'Cơm', 'Trà Sữa'];

const HomeFood = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Image
            style={styles.backIcon}
            source={{ uri: 'https://placeholder.pics/svg/20x20' }}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Foodie</Text>
        <View style={styles.signOutContainer}>
          <Image
            style={styles.icon}
            source={{ uri: 'https://placeholder.pics/svg/20x20' }}
          />
          <Text style={styles.signOutText}>Sign Out</Text>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <Image
          style={styles.searchIcon}
          source={{ uri: 'https://placeholder.pics/svg/16x16' }}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#aaa"
        />
        <Image
          style={styles.moreIcon}
          source={{ uri: 'https://placeholder.pics/svg/16x16' }}
        />
      </View>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.category} onPress={() => alert(`You clicked ${item}`)}>
            <Image
              style={styles.categoryIcon}
              source={{ uri: 'https://placeholder.pics/svg/30x30' }}
            />
            <Text style={styles.categoryText}>{item}</Text>
          </TouchableOpacity>
        )}
        style={styles.categories}
      />
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Quán Ngon Được Yêu Thích</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={[{ name: 'Bánh Mì Huỳnh Hoa' }, { name: 'Cơm Gà Singapore' }]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.shopCard}>
            <Image
              style={styles.shopImage}
              source={{ uri: 'https://placeholder.pics/svg/89x45' }}
            />
            <Text style={styles.shopName}>{item.name}</Text>
            <View style={styles.shopInfo}>
              <Image
                style={styles.icon}
                source={{ uri: 'https://placeholder.pics/svg/10x10' }}
              />
              <Text style={styles.shopInfoText}>4.8/5.0</Text>
              <Text style={styles.shopInfoText}>12km</Text>
            </View>
          </View>
        )}
        style={styles.favoriteShops}
      />
      <View style={styles.filterContainer}>
        {['Gần Đây', 'Yêu Thích', 'Đánh Giá', 'Phổ Biến', 'Xu Hướng'].map((filter, index) => (
          <Text style={styles.filterText} key={index}>{filter}</Text>
        ))}
      </View>
      <View style={styles.recommendedContainer}>
        {[{
          name: 'SuShi Kodomo - Trường Chinh', rating: '4.8/5.0', distance: '7km', discount: '15k'
        }, {
          name: 'Hồng Trà Ngô Gia - 148 Trương Công Định', rating: '4.6/5.0', distance: '4km', discount: '25k'
        }].map((shop, index) => (
          <View style={styles.recommendedCard} key={index}>
            <Image
              style={styles.shopThumbnail}
              source={{ uri: 'https://placeholder.pics/svg/53x42' }}
            />
            <View style={styles.recommendedInfo}>
              <Text style={styles.recommendedName}>{shop.name}</Text>
              <View style={styles.recommendedDetails}>
                <Text style={styles.recommendedText}>{shop.rating}</Text>
                <Text style={styles.recommendedText}>{shop.distance}</Text>
                <Text style={styles.recommendedText}>{shop.discount}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff0f5',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  title: {
    fontSize: 36,
    color: '#db7093',
    fontFamily: 'Rubik Vinyl',
    textAlign: 'center',
    flex: 1,
  },
  signOutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signOutText: {
    color: '#fff',
    fontSize: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchIcon: {
    width: 16,
    height: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
  },
  moreIcon: {
    width: 16,
    height: 16,
  },
  categories: {
    marginBottom: 20,
  },
  category: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryIcon: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 10,
    color: '#000',
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 13,
    color: '#000',
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 10,
    color: '#4fb6ed',
    fontWeight: '600',
  },
  favoriteShops: {
    marginBottom: 20,
  },
  shopCard: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    width: 120,
  },
  shopImage: {
    width: 89,
    height: 45,
    marginBottom: 5,
    borderRadius: 5,
  },
  shopName: {
    fontSize: 8,
    color: '#000',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  shopInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shopInfoText: {
    fontSize: 7,
    color: '#000',
    marginRight: 5,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterText: {
    fontSize: 10,
    color: '#000',
    opacity: 0.8,
    fontWeight: '600',
  },
  recommendedContainer: {
    marginBottom: 20,
  },
  recommendedCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  shopThumbnail: {
    width: 53,
    height: 42,
    marginRight: 10,
    borderRadius: 5,
  },
  recommendedInfo: {
    flex: 1,
  },
  recommendedName: {
    fontSize: 10,
    color: '#000',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  recommendedDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recommendedText: {
    fontSize: 7,
    color: '#000',
  },
});

export default HomeFood;

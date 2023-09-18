import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Favorites = ({ movie, onFavoritePress }) => {
  const navigation = useNavigation();

  const handleContainerPress = () => {
    navigation.navigate("MovieDetail", { movie });
  };
  return (
    <TouchableOpacity onPress={handleContainerPress}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onFavoritePress}
          style={styles.favoriteButton}
        >
          <Text style={styles.favoriteIcon}>☆</Text>
        </TouchableOpacity>
        <Image source={movie.imageUrl} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.date}>{movie.date}</Text>
          <Text style={styles.description}>
            {movie.description.substring(0, 111 - 3) + "..."}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0,
    borderRadius: 10,
    borderColor: "#ccc",
    margin: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 7.84,
    backgroundColor: "#fff",
  },
  favoriteButton: {
    position: "absolute",
    top: 5,
    left: 365,
  },
  favoriteIcon: {
    fontSize: 20,
    color: "gold",
  },
  image: {
    width: 100,
    height: 150,
    marginRight: 10,
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 7,
  },
  date: {
    fontSize: 16,
    color: "#777",
  },
  description: {
    fontSize: 14,
    marginHorizontal: 5,
    marginTop: 10,
  },
});

export default Favorites;

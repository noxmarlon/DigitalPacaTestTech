import React, { useState, useEffect } from "react";
import { View, FlatList, TextInput, StyleSheet, Text } from "react-native";
import MovieListItem from "./MovieListItem";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    loadFavoriteMovies();
  }, []);

  const loadFavoriteMovies = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites) {
        setFavoriteMovies(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Error al cargar favoritos:", error);
    }
  };

  const handleFavoritePress = async (movie) => {
    try {
      const updatedFavorites = favoriteMovies.filter(
        (favorite) => favorite.id !== movie.id
      );
      setFavoriteMovies(updatedFavorites);
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Error al eliminar de favoritos:", error);
    }
  };

  const renderItem = ({ item }) => (
    <MovieListItem
      movie={item}
      onFavoritePress={() => handleFavoritePress(item)}
      isFavorite={favoriteMovies.some((favorite) => favorite.id === item.id)}
    />
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadFavoriteMovies();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FontAwesome
        name="bars"
        size={24}
        color="#BDBDBD"
        style={{ marginLeft: 18, marginBottom: 30 }}
        onPress={() => {
          navigation.openDrawer();
        }}
      />
      <FontAwesome
        name="search"
        size={24}
        color="#BDBDBD"
        style={styles.iconSearch}
      />
      <TextInput
        placeholderTextColor="#757575"
        style={styles.inputSearch}
        placeholder="Rechercher"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      {favoriteMovies.length === 0 ? (
        <Text style={{ color: "#BDBDBD", fontSize: 20, textAlign: "center" }}>
          Vous n'avez pas encore de films favoris
        </Text>
      ) : (
        <FlatList
          data={favoriteMovies}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 60,
  },
  inputSearch: {
    paddingHorizontal: 47,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 20,
    width: 380,
    marginLeft: 15,
    marginBottom: 20,
  },
  iconSearch: {
    position: "absolute",
    top: 121,
    left: 27,
  },
});

export default FavoritesScreen;

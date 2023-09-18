import React, { useState, useEffect } from "react";
import { View, FlatList, TextInput, StyleSheet } from "react-native";
import MovieListItem from "./MovieListItem";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MovieListScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);

  const loadMovies = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      let favorites = [];

      if (storedFavorites) {
        favorites = JSON.parse(storedFavorites);
      }

      // Define tu lista de películas aquí
      const initialData = [
        {
          id: 1,
          title: "Spider-man : No way home",
          date: "15 Décembre 2021",
          description:
            "Pour la première fois dans l'histoire cinématographique de Spider-Man, notre sympathique héros est démasqué et n'est plus capable de séparer sa vie normale des enjeux considérables de son rôle de super-héros.Lorsqu'il sollicite l'aide du Docteur Strange, les enjeux deviennent encore plus dangereux, le forçant à se demander ce que signifie vraiment être Spider-Man.",
          imageUrl: require("../assets/Spider-Man.jpg"),
          isFavorite: false,
          pourcentage: 85,
        },
        {
          id: 2,
          title: "Encanto",
          date: "24 Novembre 2021",
          description:
            "Pour la première fois dans l'histoire cinématographique de Spider-Man, notre sympathique héros est démasqué et n'est plus capable de séparer sa vie normale des enjeux considérables de son rôle de super-héros.Lorsqu'il sollicite l'aide du Docteur Strange, les enjeux deviennent encore plus dangereux, le forçant à se demander ce que signifie vraiment être Spider-Man.",
          imageUrl: require("../assets/maribel-encanto-affiche-france.jpg"),
          isFavorite: true,
          pourcentage: 80,
        },
        {
          id: 3,
          title: "La méthode Williams",
          date: "1er Décembre 2021",
          description:
            "Pour la première fois dans l'histoire cinématographique de Spider-Man, notre sympathique héros est démasqué et n'est plus capable de séparer sa vie normale des enjeux considérables de son rôle de super-héros.Lorsqu'il sollicite l'aide du Docteur Strange, les enjeux deviennent encore plus dangereux, le forçant à se demander ce que signifie vraiment être Spider-Man.",
          imageUrl: require("../assets/Williams-Affiche.jpeg"),
          isFavorite: false,
          pourcentage: 62,
        },
        {
          id: 4,
          title: "Les Eternels",
          date: "3 Novembre 2021",
          description:
            "Pour la première fois dans l'histoire cinématographique de Spider-Man, notre sympathique héros est démasqué et n'est plus capable de séparer sa vie normale des enjeux considérables de son rôle de super-héros.Lorsqu'il sollicite l'aide du Docteur Strange, les enjeux deviennent encore plus dangereux, le forçant à se demander ce que signifie vraiment être Spider-Man.",
          imageUrl: require("../assets/affiche-eternels.jpg"),
          isFavorite: false,
          pourcentage: 66,
        },
      ];

      const updatedData = initialData.map((movie) => ({
        ...movie,
        isFavorite: favorites.some((favorite) => favorite.id === movie.id),
      }));

      setData(updatedData);
    } catch (error) {
      console.error("Error al cargar películas:", error);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadMovies();
    });

    return unsubscribe;
  }, [navigation]);

  const filteredData = data.filter((movie) =>
    movie.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <MovieListItem
      movie={item}
      onFavoritePress={() => handleFavoritePress(item)}
    />
  );

  const handleFavoritePress = async (movie) => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      let favorites = [];

      if (storedFavorites) {
        favorites = JSON.parse(storedFavorites);
      }

      const isFavorite = favorites.some((favorite) => favorite.id === movie.id);

      if (isFavorite) {
        const updatedFavorites = favorites.filter(
          (favorite) => favorite.id !== movie.id
        );

        movie.isFavorite = false;

        await AsyncStorage.setItem(
          "favorites",
          JSON.stringify(updatedFavorites)
        );
      } else {
        favorites.push(movie);

        movie.isFavorite = true;

        await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
      }

      // Actualiza la lista de películas después de cambiar el estado de favoritos
      setData([...data]);
    } catch (error) {
      console.error("Error al gestionar favoritos:", error);
    }
  };

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
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
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

export default MovieListScreen;

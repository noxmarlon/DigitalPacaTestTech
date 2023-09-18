import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import ProgressCircle from "../components/ProgressCircle";

const MovieDetail = ({ route }) => {
  const navigation = useNavigation();
  const { movie } = route.params;
  return (
    <View style={styles.container}>
      <FontAwesome
        name="bars"
        size={24}
        color="white"
        style={{
          marginLeft: 18,
          marginBottom: 30,
          position: "absolute",
          top: 80,
          left: 5,
          zIndex: 1,
        }}
        onPress={() => {
          navigation.openDrawer();
        }}
      />
      <Image source={movie.imageUrl} style={styles.image} resizeMode="cover" />
      <LinearGradient
        colors={["#143d520e", "#143d5210", "#143D52"]}
        style={styles.background}
      />
      <View style={styles.details}>
        <Text style={styles.title}>{movie.title}</Text>
        <View style={styles.containerHead}>
          <View style={styles.ProgressCircle}>
            <ProgressCircle
              radius={35}
              strokeWidth={6}
              progress={movie.pourcentage}
            />
            <Text style={styles.note}>Note du Public</Text>
          </View>

          <View style={styles.barCentral}>
            <View style={styles.detailsContainer}>
              <Text style={styles.textDetailContainer}> 2h30 </Text>
              <Text style={styles.textDetailContainer}> 15 Décembre 2021 </Text>
              <Text style={styles.textDetailContainer}> Action/Aventure </Text>
              <Text style={styles.textDetailContainer}> Tous publics </Text>
            </View>
          </View>
        </View>
        <Text style={styles.synopsis}>Synopsis</Text>
        <Text style={styles.description}>{movie.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: 400,
    marginRight: 10,
  },
  details: {
    width: "100%",
    height: "100%",
    backgroundColor: "#143D52",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  date: {
    fontSize: 16,
    color: "#777",
  },
  description: {
    fontSize: 14,
    color: "#bdbdbd",
    marginRight: 5,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 400,
  },
  ProgressCircle: {
    marginTop: 5,
    marginBottom: 20,
    marginLeft: 15,
  },
  barCentral: {
    borderLeftWidth: 1,
    borderLeftColor: "#ffffff98",
    marginLeft: 45,
  },
  containerHead: {
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 20,
    height: 100,
  },
  detailsContainer: {
    marginLeft: 30,
    marginTop: 7,
  },
  textDetailContainer: {
    fontSize: 16,
    color: "#BDBDBDc2",
    marginBottom: 8,
  },
  note: {
    marginTop: 14,
    fontSize: 16,
    color: "#bdbdbdd7",
    fontWeight: "bold",
  },
  synopsis: {
    fontSize: 25,
    color: "#bdbdbd",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 15,
  },
});

export default MovieDetail;

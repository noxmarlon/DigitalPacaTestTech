import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import MovieListScreen from "./MovieListScreen";
import MovieDetail from "./MovieDetail";
import FavoritesScreen from "./FavoritesScreen";

const Drawer = createDrawerNavigator();

const RedirectScreen = () => {
  const { setAccessToken, setRefreshToken } = useAuth();
  React.useEffect(() => {
    AsyncStorage.removeItem("accessToken");
    AsyncStorage.removeItem("refreshToken");

    setAccessToken(null);
    setRefreshToken(null);
  }, []);

  return null;
};

const DrawerNavigator = () => {
  const navigation = useNavigation();

  return (
    <Drawer.Navigator
      initialRouteName="MovieList"
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../Elements/DigitalPACA-Logo_Round_poulpe-en-haut.png")}
              style={styles.imageLogo}
            />
          </View>
          <Text style={styles.menu}>Menu</Text>

          <TouchableOpacity
            onPress={() => {
              props.navigation.closeDrawer();
            }}
          >
            <Image
              source={require("../assets/close.png")}
              style={styles.cancelIcon}
            ></Image>
          </TouchableOpacity>

          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      )}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#03A9F4",
        },
      }}
    >
      <Drawer.Screen
        name="MovieList"
        component={MovieListScreen}
        options={{
          headerShown: false,
          drawerLabel: "Home",
          drawerActiveBackgroundColor: "#012b3f",
          drawerLabelStyle: {
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
          },
          drawerIcon: ({ focused, size }) => (
            <View style={styles.container}>
              <Image
                source={
                  focused
                    ? require("../assets/home.png")
                    : require("../assets/homeBlack.png")
                }
                style={styles.image}
              />
            </View>
          ),
          drawerItemStyle: {
            width: "100%",
            marginLeft: 0,
            height: 60,
            paddingTop: 10,
            borderRadius: 0,
          },
        }}
      />

      <Drawer.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
        }}
      />

      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          drawerLabel: "Favorites",
          headerShown: false,
          drawerLabelStyle: {
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
          },
          drawerIcon: ({ focused, size }) => (
            <View style={styles.container}>
              <Image
                source={require("../assets/star.png")}
                style={styles.image}
              />
            </View>
          ),
          drawerItemStyle: {
            width: "100%",
            marginLeft: 0,
            height: 60,
            paddingTop: 10,
            borderRadius: 0,
          },
        }}
      />

      <Drawer.Screen
        name="Deconnexion"
        component={RedirectScreen}
        options={{
          drawerLabel: "Déconnexion",
          drawerLabelStyle: {
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
          },
          drawerIcon: () => (
            <View style={styles.container}>
              <Image
                source={require("../assets/mail-replyBlack.png")}
                style={styles.image}
              />
            </View>
          ),
          drawerItemStyle: {
            width: "100%",
            marginLeft: 0,
            height: 60,
            paddingTop: 10,
            borderRadius: 0,
          },
        }}
      />
    </Drawer.Navigator>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 24,
    height: 24,
    marginRight: -15,
    marginLeft: 15,
  },
  imageLogo: {
    width: 45,
    height: 45,
    resizeMode: "contain",
  },
  imageContainer: {
    width: 65,
    height: 65,
    backgroundColor: "white",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    padding: 25,
    marginLeft: 20,
    marginBottom: 40,
    marginTop: 20,
  },
  menu: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    position: "absolute",
    top: 87,
    left: 100,
  },
  cancelIcon: {
    width: 22,
    height: 22,
    position: "absolute",
    top: -84,
    left: 245,
    zIndex: 10,
  },
});

export default DrawerNavigator;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const { setAccessToken, setRefreshToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://digitalpaca-06597a1c3ec2.herokuapp.com/api/auth/login",
        { email, password }
      );
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;

      await AsyncStorage.setItem("accessToken", accessToken);

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    } catch (e) {
      console.error("Erreur de connexion");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../Elements/DigitalPACA-Logo_Round_poulpe-en-haut.png")}
          style={styles.image}
        />
      </View>
      <Text
        style={{
          color: "white",
          fontSize: 28,
          fontWeight: "bold",
          marginVertical: 20,
        }}
      >
        Se connecter :
      </Text>
      <View style={styles.form}>
        <TextInput
          placeholderTextColor="#BDBDBD"
          style={styles.input}
          placeholder="Adresse email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholderTextColor="#BDBDBD"
          style={styles.input}
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {email !== "" && password !== "" && (
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Connexion</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#03A9F4",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 160,
    height: 160,
    backgroundColor: "white",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    padding: 25,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  form: {
    padding: 20,
    borderRadius: 8,
    elevation: 2,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    height: 40,
    width: 200,
    padding: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  loginButton: {
    backgroundColor: "#012b3fb9",
    borderRadius: 8,
    height: 40,
    width: 200,
    padding: 7,
    marginTop: 25,
    textAlign: "center",
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    paddingLeft: 55,
    paddingTop: 3,
  },
});

export default LoginScreen;

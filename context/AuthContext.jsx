import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [tokenExpiration, setTokenExpiration] = useState(null);

  const isTokenExpired = () => {
    return tokenExpiration && Date.now() >= tokenExpiration;
  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        "https://digitalpaca-06597a1c3ec2.herokuapp.com/refresh",
        {
          refreshToken,
        }
      );

      if (response.status === 200) {
        const { accessToken, expiresIn } = response.data;
        setAccessToken(accessToken);
        setTokenExpiration(Date.now() + expiresIn * 1000);
        await AsyncStorage.setItem("accessToken", accessToken);
      } else {
        console.log("Error refresh token");
      }
    } catch (error) {
      console.log("Error red");
    }
  };

  useEffect(() => {
    const checkStoredToken = async () => {
      try {
        const storedAccessToken = await AsyncStorage.getItem("accessToken");
        if (storedAccessToken) {
          setAccessToken(storedAccessToken);
        }
        const storedRefreshToken = await AsyncStorage.getItem("refreshToken");
        if (storedRefreshToken) {
          setRefreshToken(storedRefreshToken);
        }
      } catch (error) {
        console.error(
          "Erreur lors de l'obtention des tokens d'AsyncStorage:",
          error
        );
      }
    };

    checkStoredToken();

    const checkTokenExpiration = () => {
      if (isTokenExpired()) {
        refreshAccessToken();
      }
    };
    const tokenCheckInterval = setInterval(checkTokenExpiration, 600000);
    return () => clearInterval(tokenCheckInterval);
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, refreshToken, setRefreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

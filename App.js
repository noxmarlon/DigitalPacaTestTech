import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from "./context";
import LoginScreen from './pages/LoginScreen';
import DrawerNavigator from './pages/DrawerNavigator';
import NetInfo from "@react-native-community/netinfo";
import { Alert } from 'react-native';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const { accessToken } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={accessToken ? "MovieScreen" : "Login"}>
        {accessToken ? (
          <Stack.Group>
            <Stack.Screen name="MovieScreen" component={DrawerNavigator} options={{ headerShown: false }} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {

    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {

      unsubscribe();
    };
  }, []);

  useEffect(() => {

    if (!isConnected) {
      Alert.alert("Sans connexion Internet, veuillez vérifier votre connexion Internet.");
    }
  }, [isConnected]);

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;

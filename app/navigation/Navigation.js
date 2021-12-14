import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {useAuthContext} from '../auth/hooks';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Login">
      <Stack.Screen component={Login} name="Login" />
      <Stack.Screen component={Register} name="Register" />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Home} name="Home" />
    </Stack.Navigator>
  );
};

export default function Navigation() {
  const {user, restoreUser, ready} = useAuthContext();

  useEffect(() => {
    restoreUser();
  }, []);

  if (!ready) return <Text>Loading...</Text>

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

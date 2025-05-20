import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import UserListScreen from '../screens/UserListScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen
  name="UserList"
  component={UserListScreen}
  options={{
    title: 'User List',
    headerBackVisible: false, // hides the back button
  }}
/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

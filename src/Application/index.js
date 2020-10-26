import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/Login';
import SignupScreen from './screens/Signup';
import BottomNav from './screens/BottomNav';
import Team from './screens/Team';
import AddMember from './screens/Team/AddMember';
import RoomTransactions from './screens/Team/RoomTransactions';
const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};
const Stack = createStackNavigator();

const Application = (props) => {
  return (
    <NavigationContainer theme={navigatorTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!props.isLoggedIn ? (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              initialParams={{setIsLoggedIn: props.setIsLoggedIn}}
            />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Main Tab" component={BottomNav}></Stack.Screen>
            <Stack.Screen name="Team" component={Team}></Stack.Screen>
            <Stack.Screen
              name="Add Member"
              component={AddMember}></Stack.Screen>
            <Stack.Screen
              name="Room Transaction"
              component={RoomTransactions}></Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Application;

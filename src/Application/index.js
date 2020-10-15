import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/Login';
import SignupScreen from './screens/Signup';
import BottomNav from './screens/BottomNav';

const Stack = createStackNavigator();

const Application = (props) => {
  return (
    <NavigationContainer>
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Application;

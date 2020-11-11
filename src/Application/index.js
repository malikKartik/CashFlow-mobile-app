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
import SimplifiedTransactions from './screens/Team/SimplifiedTransactions';
import Toast from './hoc/Toast';
import {connect} from 'react-redux';
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
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Main Tab" component={BottomNav}></Stack.Screen>
            <Stack.Screen
              name="Team"
              component={(props) => (
                <Toast>
                  <Team navigation={props.navigation}></Team>
                </Toast>
              )}></Stack.Screen>
            <Stack.Screen
              name="Add Member"
              component={AddMember}></Stack.Screen>
            <Stack.Screen
              name="Simplified Transactions"
              component={SimplifiedTransactions}></Stack.Screen>
            <Stack.Screen
              name="Room Transaction"
              component={RoomTransactions}></Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};
export default connect(mapStateToProps)(Application);

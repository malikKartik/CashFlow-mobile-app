import React from 'react';
import {Button, Text, View, StyleSheet, AsyncStorage} from 'react-native';

const Login = (props) => {
  const login = async () => {
    props.route.params.setIsLoggedIn(true);
    await AsyncStorage.setItem('isLoggedIn', 'true');
  };

  return (
    <View style={styles.container}>
      <Text>Login page</Text>
      <Button onPress={login} title="login" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    flex: 1,
    height: '100%',
    width: '100%',
  },
});

export default Login;

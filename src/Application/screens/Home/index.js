import React, {useState} from 'react';
import {AsyncStorage, Button, Text, View} from 'react-native';
import Checkbox from '../../components/Checkbox';
const Home = () => {
  const signup = () => {};
  return (
    <View style={{marginHorizontal: '5%'}}>
      <Text>Home page</Text>
      <Checkbox
        height={25}
        width={25}
        label="Kartik"
        reverse={true}
        checkedColor="blue"
        labelStyle={{marginLeft: 10}}></Checkbox>
    </View>
  );
};

export default Home;

import React, {useState} from 'react';
import {AsyncStorage, Button, Text, View} from 'react-native';
import DropDown from '../../components/Dropdown';

const Home = () => {
  const signup = () => {};
  return (
    <View style={{marginHorizontal: '5%'}}>
      <Text>Home page</Text>
      <DropDown
        selectedValue={{id: 1, label: 'A'}}
        options={[
          {id: 1, label: 'A'},
          {id: 2, label: 'B'},
          {id: 3, label: 'C'},
          {id: 4, label: 'D'},
          {id: 5, label: 'E'},
          {id: 6, label: 'F'},
        ]}></DropDown>
    </View>
  );
};

export default Home;

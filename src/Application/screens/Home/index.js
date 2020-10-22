import React, {useState} from 'react';
import {AsyncStorage, Button, Text, View} from 'react-native';
import Checkbox from '../../components/Checkbox';
import Dropdown from '../../components/Dropdown';
import Backdrop from '../../components/Backdrop';
const Home = () => {
  const [options, setOptions] = useState([
    {label: 'Java', id: '1'},
    {label: 'Python', id: '2'},
    {label: 'Js', id: '3'},
  ]);
  const [opts, setOpts] = useState([
    {label: 'Flower', id: '1'},
    {label: 'Rose', id: '2'},
    {label: 'sunflower', id: '3'},
    {label: 'lily', id: '4'},
  ]);
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
      <Dropdown
        options={options}
        selectedValue={options[0]}
        backdropColor="transparent"
        zIndex={80}></Dropdown>
      <View style={{marginBottom: 140}}></View>
      <Dropdown
        options={opts}
        selectedValue={opts[0]}
        backdropColor="blue"
        zIndex={100}></Dropdown>
    </View>
  );
};

export default Home;

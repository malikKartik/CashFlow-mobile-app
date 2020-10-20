import React, {useState} from 'react';
import {AsyncStorage, Button, Text, View} from 'react-native';
import Input from '../../components/Input';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Icon from 'react-native-vector-icons/dist/EvilIcons';
import Checkbox from '../../components/Checkbox';
import DropDown from '../../components/Dropdown';

const Home = () => {
  const [text, setText] = useState('');
  const [text1, setText1] = useState('');
  const [check, setCheck] = useState(true);
  const [checkList, setCheckList] = useState([
    {label: 'Kartik', id: '2'},
    {label: 'Karan', id: '3', checked: true},
    {label: 'Arjun', id: '4'},
  ]);
  const [options, setOptions] = useState([
    {label: 'Kartik', id: '2'},
    {label: 'Karan', id: '3', checked: true},
    {label: 'Arjun', id: '4'},
  ]);
  const handleInput = (text) => {
    setText(text);
  };
  const handleChange = (text) => {
    setText1(text);
  };
  const handleCheck = async (e) => {
    await setCheck(e.checked);
  };
  const handleCheckList = async (e) => {
    const temp = [...checkList];
    temp.map((item) => {
      if (item.id === e.id) item['checked'] = e.checked;
    });
    await setCheckList(temp);
    console.log(options);
  };
  const handleMultiCheckList = async (e) => {
    const temp = [...options];
    console.log(e.id);
    temp.map((item) => {
      if (item.id === e.id) item['checked'] = e.checked;
    });
    await setOptions(temp);
    console.log(temp);
  };
  const signup = () => {};
  return (
    <View>
      <Text>Home page</Text>
      <View style={{marginHorizontal: '5%'}}>
        <Input
          label="First Name"
          placeholder="Enter name"
          onChangeText={handleInput}
          value={text}
          icon={<Icon name="search" size={25}></Icon>}></Input>
        <DropDown
          options={[
            {label: 'Java', value: 'js'},
            {label: 'Python', value: 'python'},
          ]}
          value={text1}
          onChange={handleChange}></DropDown>
        <Checkbox
          checked={check}
          label="Prerna"
          onChange={handleCheck}
          id="1"
          checkedColor="#B798F9"
          reverse={true}></Checkbox>
        {checkList.map((item) => {
          return (
            <Checkbox
              checked={item.checked}
              label={item.label}
              onChange={handleCheckList}
              id={item.id}
              checkedColor="#B798F9"
              key={item.id}></Checkbox>
          );
        })}
        <Checkbox
          type="list"
          options={options}
          checkedColor="red"
          onChange={handleMultiCheckList}
          labelStyle={{fontFamily: 'Roboto-Bold', color: 'blue'}}></Checkbox>
      </View>
      <Text>{text}</Text>
      <Text>{text1}</Text>
      <Text>{check.toString()}</Text>
    </View>
  );
};

export default Home;

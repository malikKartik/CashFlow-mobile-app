import React, {useState} from 'react';
import {AsyncStorage, Button, View} from 'react-native';
import Text from '../../components/Text';

const Home = () => {
  const [activeTab, setActiveTab] = useState('left');

  return (
    <View style={{marginHorizontal: '5%'}}>
      <Text>Home page!</Text>
    </View>
  );
};

export default Home;

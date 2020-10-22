import React, {useState} from 'react';
import {AsyncStorage, Button, Text, View} from 'react-native';

const Home = () => {
  const [activeTab, setActiveTab] = useState('left');

  return (
    <View>
      <Text>Home page</Text>
    </View>
  );
};

export default Home;

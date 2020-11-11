import React, {useState} from 'react';
import {AsyncStorage, Button, View} from 'react-native';
import Tabs from '../../components/Tabs';

const Home = () => {
  const [activeTab, setActiveTab] = useState('left');
  const onTapLeft = () => {
    setActiveTab('left');
  };
  const onTapMid = () => {
    setActiveTab('mid');
  };
  const onTapRight = () => {
    setActiveTab('right');
  };

  return (
    <View style={{marginHorizontal: '5%'}}>
      <Tabs
        activeTab={activeTab}
        onTapLeft={onTapLeft}
        leftLabel="Home"
        onTapMid={onTapMid}
        midLabel="Search"
        onTapRight={onTapRight}
        rightLabel="Profile"></Tabs>
    </View>
  );
};

export default Home;

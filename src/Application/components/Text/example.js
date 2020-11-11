import React, {useState} from 'react';
import {View} from 'react-native';
import Text from '../../components/Text';
import Tabs from '../../components/Tabs';

const Home = () => {
  return (
    <View style={{marginHorizontal: '5%'}}>
      <Text type="heading">Home page</Text>
      <Text type="sub-heading">Home page</Text>
      <Text type="content">Home page</Text>
      <Text type="sub-content">Home page</Text>
      <Text type="content" amountType="credit">
        Home page
      </Text>
      <Text type="content" amountType="debit">
        Home page
      </Text>
      <Text type="content" amountType="still">
        Home page
      </Text>
      <Text type="content" color="blue">
        Home page
      </Text>
      <Text type="content" color="blue" size={32}>
        Home page
      </Text>
      <Tabs></Tabs>
    </View>
  );
};

export default Home;

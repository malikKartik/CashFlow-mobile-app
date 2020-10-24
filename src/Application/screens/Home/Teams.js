import React, {useState} from 'react';
import {Image, ScrollView, View} from 'react-native';
import Card from '../../components/Card';
import Input from '../../components/Input';

const Teams = () => {
  const [search, setSearch] = useState('');
  return (
    <>
      <View style={{width: '90%'}}>
        <Input
          onChangeText={(val) => setSearch(val)}
          value={search}
          icon={
            <Image
              source={require('../../../../asstes/icons/search.png')}></Image>
          }
          borderRadius={20}
          placeholder="Search a team"
          marginVertical={5}
          height={40}
          width="90%"></Input>
      </View>
      <ScrollView style={{width: '90%'}}>
        <Card height={100} marginVertical={4}></Card>
        <Card height={100} marginVertical={4}></Card>
        <Card height={100} marginVertical={4}></Card>
        <Card height={100} marginVertical={4}></Card>
        <Card height={100} marginVertical={4}></Card>
        <Card height={100} marginVertical={4}></Card>
        <Card height={100} marginVertical={4}></Card>
        <Card height={100} marginVertical={4}></Card>
        <Card
          height={60}
          marginVertical={4}
          elevation={0}
          borderColor="white"></Card>
      </ScrollView>
    </>
  );
};

export default Teams;

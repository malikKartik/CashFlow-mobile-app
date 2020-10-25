import React from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import TextComp from '../../../components/Text';
import Button from '../../../components/Button';
import MemberCard from './MemberCard';

const data = [
  {
    firstName: 'Kartik',
    lastName: 'Malik',
    id: '1',
  },
  {
    firstName: 'Prerna',
    lastName: 'Budhraja',
    debit: 300,
    id: '2',
  },
  {
    firstName: 'Karan',
    lastName: 'Kumar',
    credit: 400,
    id: '3',
  },
];
const TeamDashboard = (props) => {
  const renderItem = ({item, index}) => {
    return <MemberCard item={item}></MemberCard>;
  };
  return (
    <>
      <View style={styles.container}>
        <TextComp type="heading" marginVertical={1}>
          Bangalore Trip
        </TextComp>
        <TextComp type="sub-heading">Team Dashboard</TextComp>
      </View>
      <View style={styles.horizontalLine}></View>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <TextComp type="content">Taken by you: </TextComp>
          <TextComp type="content" amountType="debit">
            300 Rs
          </TextComp>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TextComp type="content">Given by you: </TextComp>
          <TextComp type="content" amountType="credit">
            300 Rs
          </TextComp>
        </View>
        <View style={{marginTop: 15, marginBottom: 10}}>
          <TextComp>Members: </TextComp>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={{maxHeight: 250}}
          showsVerticalScrollIndicator={false}></FlatList>
        <View style={{marginTop: 20, alignItems: 'center'}}>
          <Button
            title="Add Member"
            onPress={() => props.navigation.navigate('Add Member')}></Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginTop: 12,
  },
  horizontalLine: {
    width: '100%',
    borderBottomColor: '#DFDFDF',
    borderBottomWidth: 1,
  },
});

export default TeamDashboard;

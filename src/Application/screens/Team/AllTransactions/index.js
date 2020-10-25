import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import TextComp from '../../../components/Text';
import TransactionCard from './TransactionCard';

const data = [
  {
    text: 'Karan owes Prerna',
    type: 'none',
    amount: '100 Rs',
    place: 'The chocolate Room',
    date: '25th Sept 2020',
    id: '1',
  },
  {
    text: 'You owe Prerna',
    type: 'debit',
    amount: '200 Rs',
    place: 'The chocolate Room',
    date: '25th Sept 2020',
    id: '2',
  },
  {
    text: 'Karan owes You',
    type: 'credit',
    amount: '100 Rs',
    place: 'The chocolate Room',
    date: '25th Sept 2020',
    id: '3',
  },
  {
    text: 'Karan owes Prerna',
    type: 'none',
    amount: '100 Rs',
    place: 'The chocolate Room',
    date: '25th Sept 2020',
    id: '4',
  },
];

const AllTransactions = (props) => {
  const renderItem = ({item, index}) => {
    return <TransactionCard item={item} {...props}></TransactionCard>;
  };
  return (
    <View style={styles.container}>
      <TextComp type="heading" marginVertical={1}>
        Bangalore Trip
      </TextComp>
      <View style={{marginTop: 20}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginTop: 12,
  },
});

export default AllTransactions;

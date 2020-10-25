import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import TextComp from '../../../components/Text';
import TransactionCard from '../AllTransactions/TransactionCard';
import {useNavigation} from '@react-navigation/native';

const data = [
  {
    text: 'Karan owes Prerna',
    type: 'none',
    amount: '100 Rs',
    date: '25th Sept 2020',
    id: '1',
  },
  {
    text: 'You owe Prerna',
    type: 'debit',
    amount: '200 Rs',
    date: '25th Sept 2020',
    id: '2',
  },
  {
    text: 'Karan owes You',
    type: 'credit',
    amount: '100 Rs',
    date: '25th Sept 2020',
    id: '3',
  },
  {
    text: 'Karan owes Prerna',
    type: 'none',
    amount: '100 Rs',
    date: '25th Sept 2020',
    id: '4',
  },
];

const RoomTransactions = (props) => {
  const navigation = useNavigation();
  const renderItem = ({item, index}) => {
    return <TransactionCard item={item}></TransactionCard>;
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <Image
          source={require('../../../../../asstes/icons/back.png')}
          style={{marginBottom: 20}}></Image>
      </TouchableWithoutFeedback>
      <TextComp type="heading" marginVertical={1}>
        Chocolate Room
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
    marginHorizontal: '5%',
  },
});

export default RoomTransactions;

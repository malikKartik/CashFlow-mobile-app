import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import TextComp from '../../../components/Text';
import {useNavigation} from '@react-navigation/native';
import RoomCard from './RoomCard';
import {connect} from 'react-redux';
import {post} from '../../../requests';

const RoomTransactions = (props) => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    post({route: '/api/places/getTransactions', body: {id: props.place}})
      .then((data) => {
        console.log(data);
        setTransactions(data.transactions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const navigation = useNavigation();
  const renderItem = ({item, index}) => {
    return <RoomCard {...item}></RoomCard>;
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
          data={transactions}
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

const mapStateToProps = (state) => {
  return {
    place: state.team.currentRoom,
  };
};

export default connect(mapStateToProps)(RoomTransactions);

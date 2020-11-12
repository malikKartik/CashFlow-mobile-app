import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from 'react-native';
import TextComp from '../../../components/Text';
import {useNavigation} from '@react-navigation/native';
import RoomCard from './RoomCard';
import {connect} from 'react-redux';
import {post} from '../../../requests';
import Button from '../../../components/Button';
import io from 'socket.io-client';
import url from '../../../constants/url';
const socket = io(url, {transports: ['websocket']});
const {height, width} = Dimensions.get('window');
const RoomTransactions = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [placeName, setPlaceName] = useState('');

  useEffect(() => {
    handleGetTransactions();
  }, []);

  useEffect(() => {
    socket.on('notification', (payload) => {
      if (
        payload.type === 'SETTLED_A_TRANSACTION' &&
        payload.placeId === props.placeId
      )
        handleGetTransactions();
    });
  }, []);
  const navigation = useNavigation();
  const renderItem = ({item, index}) => {
    return (
      <RoomCard
        {...item}
        handleSettleTransaction={handleSettleTransaction}></RoomCard>
    );
  };

  const handleGetTransactions = () => {
    post({route: '/api/places/getTransactions', body: {id: props.place}})
      .then((data) => {
        setTransactions(data.transactions);
        setPlaceName(data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSettleTransaction = (tranId) => {
    post({route: '/api/transactions/settleTransaction', body: {id: tranId}})
      .then((data) => {
        handleGetTransactions();
        socket.emit('notification', {
          data: {placeId: props.place, users: props.currentTeamData.users},
          type: 'SETTLED_A_TRANSACTION',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const settleAllTransactions = () => {
    post({route: '/api/places/settleAllTransactions', body: {id: props.place}})
      .then((data) => {
        handleGetTransactions();
        socket.emit('notification', {
          data: {placeId: props.place, users: props.currentTeamData.users},
          type: 'SETTLED_A_TRANSACTION',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <Image
          source={require('../../../../../asstes/icons/back.png')}
          style={{marginBottom: 20}}></Image>
      </TouchableWithoutFeedback>
      <TextComp type="heading" marginVertical={1}>
        {placeName}
      </TextComp>
      <TextComp type="sub-content" textAlign="center" size={12} color="#aaa">
        Swipe a card to settle a transaction
      </TextComp>
      <Button title="Settle All" onPress={settleAllTransactions}></Button>
      <View style={{marginTop: 15, height: '100%'}}>
        <FlatList
          data={transactions}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginTop: 12,
    marginHorizontal: '5%',
    height: '100%',
  },
});

const mapStateToProps = (state) => {
  return {
    place: state.team.currentRoom,
    currentTeamData: state.team.currentTeamData,
  };
};

export default connect(mapStateToProps)(RoomTransactions);

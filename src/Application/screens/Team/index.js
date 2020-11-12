import React, {useState, useEffect, useRef} from 'react';
import {
  TouchableWithoutFeedback,
  Image,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Tabs from '../../components/Tabs';
import AddTransaction from './AddTransaction';
import AllTransactions from './AllTransactions';
import TeamDashboard from './TeamDashboard';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import io from 'socket.io-client';
import url from '../../constants/url';
const socket = io(url, {transports: ['websocket']});
const {height, width} = Dimensions.get('window');

const Team = (props) => {
  const [activeTab, setActiveTab] = useState('left');
  useEffect(() => {
    props.onGetTeam({id: props.currentTeam});
    socket.emit('joinRoom', {
      userId: props.userId,
    });
    socket.on('notification', async (payload) => {
      props.onGetTeam({id: props.currentTeam});
      console.log(payload);
    });
  }, []);
  const onTapLeft = () => {
    setActiveTab('left');
  };
  const onTapMid = () => {
    setActiveTab('mid');
  };
  const onTapRight = () => {
    setActiveTab('right');
  };

  const handleLeftSwipe = () => {
    if (activeTab === 'left') setActiveTab('mid');
  };

  const handleRightSwipe = () => {
    if (activeTab === 'mid') setActiveTab('left');
    if (activeTab === 'right') setActiveTab('mid');
  };

  return (
    <GestureRecognizer
      onSwipeLeft={() => handleLeftSwipe()}
      onSwipeRight={() => handleRightSwipe()}>
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => props.navigation.navigate('Main Tab')}>
          <Image
            source={require('../../../../asstes/icons/back.png')}
            style={{marginLeft: 20, alignSelf: 'flex-start'}}></Image>
        </TouchableWithoutFeedback>
        <View style={{marginBottom: 20}}></View>
        <Tabs
          width="90%"
          activeTab={activeTab}
          onTapLeft={onTapLeft}
          leftLabel="Team Dashboard"
          onTapMid={onTapMid}
          midLabel="All Transactions"
          onTapRight={onTapRight}
          rightLabel="Add Transaction"></Tabs>
        {activeTab === 'left' ? (
          <TeamDashboard navigation={props.navigation}></TeamDashboard>
        ) : null}
        {activeTab === 'mid' ? (
          <AllTransactions navigation={props.navigation}></AllTransactions>
        ) : null}
        {activeTab === 'right' ? <AddTransaction></AddTransaction> : null}
      </View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: height - 220,
  },
});

const mapStateToProps = (state) => {
  return {
    currentTeam: state.team.currentTeam,
    userId: state.auth.userData.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetTeam: ({id}) => dispatch(actions.getTeamData({id})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Team);

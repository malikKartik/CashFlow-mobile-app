import React, {useState, useEffect} from 'react';
import {TouchableWithoutFeedback, Image, View, StyleSheet} from 'react-native';
import Tabs from '../../components/Tabs';
import AddTransaction from './AddTransaction';
import AllTransactions from './AllTransactions';
import TeamDashboard from './TeamDashboard';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';

const Team = (props) => {
  const [activeTab, setActiveTab] = useState('left');
  useEffect(() => {
    props.onGetTeam({id: props.currentTeam});
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
  return (
    <>
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
});

const mapStateToProps = (state) => {
  return {
    currentTeam: state.team.currentTeam,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetTeam: ({id}) => dispatch(actions.getTeamData({id})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Team);

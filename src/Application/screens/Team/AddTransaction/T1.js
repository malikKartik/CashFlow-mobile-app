import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import Text from '../../../components/Text';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions';
import {addTransactions} from '../../../constants/utilityFunctions';
const T1 = (props) => {
  const [amount, setAmount] = useState('0');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    props.setPlaceName({...props.placeName, placeName: ''});
    setAmount('0');
  }, [completed]);

  const equalSplit = (totalAmount, users) => {
    let allUsers = {};

    users.forEach((user) => {
      allUsers[user._id] = totalAmount / users.length;
    });

    return allUsers;
  };

  return (
    <ScrollView>
      <View style={{alignItems: 'center'}}>
        <Input
          isAmount={true}
          onChangeText={(val) => setAmount(val)}
          value={amount}
          label="Enter Amount"
          error={amount.trim() === '' || amount === '0'}
          errorMessage="* required and non-zero"></Input>
        <Text type="sub-content" color="red">
          {isNaN(amount) ? 'Amount should be a number' : null}
        </Text>
        <Button
          title="Add"
          disabled={
            amount.trim() === '' ||
            amount === '0' ||
            props.placeName.placeName.trim() === ''
          }
          onPress={() =>
            addTransactions(
              {[props.currentUser]: amount},
              equalSplit(amount, props.team.currentTeamData.users),
              props.team.currentTeamData.users,
              {
                teamId: props.team.currentTeam,
                bill: 'None',
                placeName: props.placeName.placeName,
              },
              setCompleted,
              completed,
            )
          }></Button>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.userData.userId,
    team: state.team,
  };
};

export default connect(mapStateToProps)(T1);

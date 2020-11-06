import React, {useState} from 'react';
import {View} from 'react-native';
import Text from '../../../components/Text';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions';
import {addTransactions} from '../../../constants/utilityFunctions';
const T1 = (props) => {
  const [amount, setAmount] = useState('0');

  const equalSplit = (totalAmount, users) => {
    let allUsers = {};

    users.forEach((user) => {
      allUsers[user._id] = totalAmount / users.length;
    });

    return allUsers;
  };

  return (
    <View style={{alignItems: 'center'}}>
      <Input
        isAmount={true}
        onChangeText={(val) => setAmount(val)}
        value={amount}
        label="Enter Amount"></Input>
      <Text type="sub-content" color="red">
        {isNaN(amount) ? 'Amount should be a number' : null}
      </Text>
      <Button
        title="Add"
        onPress={() =>
          addTransactions(
            {[props.currentUser]: amount},
            equalSplit(amount, props.team.currentTeamData.users),
            props.team.currentTeamData.users,
          )
        }></Button>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.userData.userId,
    team: state.team,
  };
};

export default connect(mapStateToProps)(T1);

// {userId:500,userId:500,userId:500} --> paid
// {userId:500,userId:500,userId:500} --> split
// [users]

// 50,50,500 --> 0,0,300
// 200,200,200 --> 150,150,0

// 0,0,150
// 0,150,0

// 0,50,50,500
// 0,200,200,200

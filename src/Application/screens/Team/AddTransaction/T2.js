import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import Text from '../../../components/Text';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';
import {connect} from 'react-redux';
import {addTransactions} from '../../../constants/utilityFunctions';

const T2 = (props) => {
  const users = [];
  props.team.currentTeamData.users.forEach((user) => {
    users.push({
      person: user.firstName,
      paid: false,
      amount: '0',
      id: user._id,
    });
  });
  const [amount, setAmount] = useState([...users]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    props.setPlaceName({...props.placeName, placeName: ''});
    setAmount(users);
  }, [completed]);

  const paidBy = () => {
    let tempPaid = {};
    amount.forEach((user) => {
      if (user.paid) {
        tempPaid[user.id] = user.amount;
      }
    });
    return tempPaid;
  };

  const equalSplit = () => {
    let allUsers = {};
    let totalAmount = 0;
    amount.forEach((user) => {
      if (user.paid) totalAmount = totalAmount + parseFloat(user.amount);
    });
    amount.forEach((user) => {
      allUsers[user.id] = totalAmount / amount.length;
    });

    return allUsers;
  };

  return (
    <View style={{alignItems: 'center'}}>
      <Text type="sub-heading" style={{alignSelf: 'flex-start'}}>
        Select who paid
      </Text>
      <ScrollView style={{width: '100%', display: 'flex'}}>
        {amount.map((item) => {
          return (
            <View
              key={item.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 60,
              }}>
              <Checkbox
                height={20}
                width={20}
                id={item.id}
                label={item.person}
                labelStyle={{fontSize: 20}}
                checked={item.paid}
                onChange={(val) => {
                  let temp = [...amount];
                  temp.map((each) => {
                    if (each.id === val.id) {
                      each.paid = val.checked;
                    }
                  });
                  setAmount(temp);
                }}
                checkedColor="#9392ff"></Checkbox>

              <View style={{width: '40%', position: 'relative', top: 10}}>
                {item.paid ? (
                  <Input
                    isAmount={true}
                    sizeMini={true}
                    id={item.id}
                    onChangeText={(val, id) => {
                      let temp = [...amount];
                      temp.map((each) => {
                        if (each.id === id) {
                          each.amount = val;
                        }
                      });
                      setAmount(temp);
                    }}
                    value={item.amount}></Input>
                ) : null}
              </View>
            </View>
          );
        })}
        <View style={{width: '100%', alignItems: 'center'}}>
          <Button
            title="Add"
            onPress={() => {
              addTransactions(
                paidBy(),
                equalSplit(),
                props.team.currentTeamData.users,
                {
                  teamId: props.team.currentTeam,
                  bill: 'None',
                  placeName: props.placeName,
                },
                setCompleted,
              );
            }}></Button>
        </View>
      </ScrollView>
    </View>
  );
};

const mapDispatchToProps = (state) => {
  return {
    team: state.team,
  };
};

export default connect(mapDispatchToProps)(T2);

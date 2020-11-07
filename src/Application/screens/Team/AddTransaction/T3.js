import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import Text from '../../../components/Text';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';
import Switch from '../../../components/Switch';
import {addTransactions} from '../../../constants/utilityFunctions';
import {connect} from 'react-redux';

const T2 = (props) => {
  const [amount, setAmount] = useState([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (completed) {
      props.setPlaceName({...props.placeName, placeName: ''});
      setTotalAmount('0');
      amount.forEach((person) => {
        person.paid = false;
      });
    }
  }, [completed]);

  useEffect(() => {
    let tempAmount = [];
    props.team.currentTeamData.users.forEach((user) => {
      let tempObj = {};
      tempObj['person'] = user.username;
      tempObj['paid'] = false;
      tempObj['amount'] = '0';
      tempObj['id'] = user._id;
      tempAmount = [...tempAmount, tempObj];
    });
    setAmount(tempAmount);
  }, []);

  useEffect(() => {
    let tempAmt = 0;
    amount.forEach((person) => {
      if (person.paid && person.amount !== '')
        tempAmt = tempAmt + parseFloat(person.amount);
    });
    setRemaining(parseFloat(totalAmount) - tempAmt);
  }, [amount]);

  const inputChangeHandler = async (val) => {
    await setTotalAmount(val);
    let tempAmt = 0;
    amount.forEach((person) => {
      tempAmt = tempAmt + parseFloat(person.amount);
    });
    setRemaining(parseFloat(val ? val : 0) - tempAmt);
  };

  const [totalAmount, setTotalAmount] = useState('0');
  const [paidEqually, setPaidEqually] = useState(false);
  const [remaining, setRemaining] = useState(totalAmount);
  const transactionHandler = () => {
    let split = {};
    amount.forEach((person) => {
      if (person.paid) split[person.id] = person.amount;
    });
    addTransactions(
      {[props.currentUser]: totalAmount},
      split,
      props.team.currentTeamData.users,
      {
        teamId: props.team.currentTeam,
        bill: 'None',
        placeName: props.placeName.placeName,
      },
      setCompleted,
    );
  };
  return (
    <>
      <Input
        isAmount={true}
        onChangeText={(val) => inputChangeHandler(val)}
        value={totalAmount}
        label="Enter Amount"
        error={totalAmount.trim() === '' || totalAmount === '0'}
        errorMessage="* required and non-zero"></Input>
      <Text type="sub-content" color="red">
        {isNaN(totalAmount) ? 'Amount should be a number' : null}
      </Text>
      <View style={{alignItems: 'center'}}>
        <Text type="sub-heading" style={{alignSelf: 'flex-start'}} size={20}>
          Paid To
        </Text>
        <Text type="sub-heading" style={{alignSelf: 'flex-start'}}>
          Split equally:{' '}
          <Switch
            inactiveBackgroundColor="#c1c1c1"
            onPress={() => {
              if (!paidEqually) {
                const temp = [...amount];
                temp.map((each) => {
                  each.paid = true;
                  each.amount = (totalAmount / temp.length).toString();
                });
                setAmount(temp);
              } else {
                const temp = [...amount];
                temp.map((each) => {
                  each.paid = false;
                });
                setAmount(temp);
              }
              setPaidEqually(!paidEqually);
            }}
            active={paidEqually}></Switch>
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
          <Text>Remaining balance: {remaining}</Text>
          <View style={{width: '100%', alignItems: 'center'}}>
            <Button
              title="Add"
              onPress={transactionHandler}
              disabled={
                totalAmount.trim() === '' ||
                totalAmount === '0' ||
                props.placeName.placeName.trim() === '' ||
                remaining !== 0
              }></Button>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.userData.userId,
    team: state.team,
  };
};

export default connect(mapStateToProps)(T2);

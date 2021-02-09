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
  const [totalAmount, setTotalAmount] = useState(0);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    props.setPlaceName({...props.placeName, placeName: ''});
    setTotalAmount('0');
    amount.forEach((person) => {
      person.paid = false;
      person.shared = false;
    });
  }, [completed]);

  useEffect(() => {
    let tempAmount = [];
    props.team.currentTeamData.users.forEach((user) => {
      let tempObj = {};
      tempObj['person'] = user.username;
      tempObj['paid'] = false;
      tempObj['amount'] = '0';
      tempObj['shared'] = false;
      tempObj['share'] = '0';
      tempObj['id'] = user._id;
      tempAmount = [...tempAmount, tempObj];
    });
    setAmount(tempAmount);
  }, []);

  useEffect(() => {
    let tempAmt = 0;
    amount.forEach((person) => {
      if (person.paid && person.amount !== '')
        tempAmt = tempAmt + parseInt(person.amount);
    });
    let splitAmt = 0;
    amount.forEach((person) => {
      if (person.shared && person.share !== '')
        splitAmt = splitAmt + parseInt(person.share);
    });
    setTotalAmount(tempAmt);
    setRemaining(parseFloat(tempAmt) - parseFloat(splitAmt));
  }, [amount]);

  const [paidEqually, setPaidEqually] = useState(false);

  const transactionHandler = () => {
    let split = {};
    amount.forEach((person) => {
      if (person.shared) split[person.id] = person.share;
    });
    let paid = {};
    amount.forEach((person) => {
      if (person.paid) paid[person.id] = person.amount;
    });
    addTransactions(
      paid,
      split,
      props.team.currentTeamData.users,
      {
        teamId: props.team.currentTeam,
        bill: 'None',
        placeName: props.placeName.placeName,
      },
      setCompleted,
      completed,
    );
  };
  return (
    <ScrollView
      style={{width: '100%', display: 'flex'}}
      showsVerticalScrollIndicator={false}>
      <Text type="sub-heading" style={{alignSelf: 'flex-start'}} size={20}>
        Select who paid
      </Text>
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
      <Text type="sub-heading" style={{alignSelf: 'flex-start'}} size={20}>
        Paid To
      </Text>
      {totalAmount !== 0 ? (
        <Text type="sub-heading" style={{alignSelf: 'flex-start'}}>
          Split equally:{' '}
          <Switch
            inactiveBackgroundColor="#c1c1c1"
            onPress={() => {
              if (!paidEqually) {
                const temp = [...amount];
                temp.map((each) => {
                  each.shared = true;
                  each.share = (totalAmount / temp.length).toString();
                });
                setAmount(temp);
              } else {
                const temp = [...amount];
                temp.map((each) => {
                  each.shared = false;
                });
                setAmount(temp);
              }
              setPaidEqually(!paidEqually);
            }}
            active={paidEqually}></Switch>
        </Text>
      ) : null}
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
              checked={item.shared}
              onChange={(val) => {
                let temp = [...amount];
                temp.map((each) => {
                  if (each.id === val.id) {
                    each.shared = val.checked;
                  }
                });
                setAmount(temp);
              }}
              checkedColor="#9392ff"></Checkbox>

            <View style={{width: '40%', position: 'relative', top: 10}}>
              {item.shared ? (
                <Input
                  isAmount={true}
                  sizeMini={true}
                  id={item.id}
                  onChangeText={(val, id) => {
                    let temp = [...amount];
                    temp.map((each) => {
                      if (each.id === id) {
                        each.share = val;
                      }
                    });
                    setAmount(temp);
                  }}
                  value={item.share}></Input>
              ) : null}
            </View>
          </View>
        );
      })}
      <Text>Remaining balance: {remaining}</Text>
      <View style={{width: '100%', alignItems: 'center', marginBottom: 100}}>
        <Button
          title="Add"
          onPress={transactionHandler}
          disabled={
            !totalAmount ||
            totalAmount === 0 ||
            props.placeName.placeName.trim() === '' ||
            remaining !== 0
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

export default connect(mapStateToProps)(T2);

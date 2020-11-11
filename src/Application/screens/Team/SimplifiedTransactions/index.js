import React, {useEffect, useState} from 'react';
import {
  TouchableWithoutFeedback,
  Image,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Text from '../../../components/Text';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import {connect} from 'react-redux';

const SimplifiedTransactions = (props) => {
  console.log(JSON.stringify(props.teamData.users, null, 4));
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    let tempTransactions = [];
    props.teamData.places.map((place) => {
      place.transactions.map((transaction) => {
        tempTransactions.push(transaction);
      });
    });
    // console.log(JSON.stringify(tempTransactions, null, 4));
    // setTransactions(tempTransactions);

    // SIMPLIFY
    let users = {};
    tempTransactions.map((transaction) => {
      if (!users[transaction.from]) {
        users[transaction.from] = {cred: 0, debt: 0};
      }
      if (!users[transaction.to]) {
        users[transaction.to] = {cred: 0, debt: 0};
      }
      users[transaction.from].cred =
        users[transaction.from].cred + transaction.amount;
      users[transaction.to].debt =
        users[transaction.to].debt + transaction.amount;
    });

    let usersArr = [];
    Object.keys(users).map((key) => {
      if (users[key].cred > users[key].debt) {
        users[key].cred = users[key].cred - users[key].debt;
        users[key].debt = 0;
      } else {
        users[key].debt = users[key].debt - users[key].cred;
        users[key].cred = 0;
      }

      usersArr.push({
        _id: key,
        cred: users[key].cred,
        debt: users[key].debt,
      });
    });

    let start = 0;
    let end = usersArr.length - 1;
    let finalTransactions = [];

    usersArr.sort((a, b) => {
      if (a.debt > b.debt) return 1;
      else return -1;
    });
    // balance - debt
    while (start < end) {
      if (usersArr[end].debt > 0) {
        if (usersArr[start].cred > 0) {
          // ADD transaction
          let tempTrans = {
            to: usersArr[start]._id,
            from: usersArr[end]._id,
            amount:
              usersArr[end].debt > usersArr[start].cred
                ? usersArr[start].cred
                : usersArr[end].debt,
          };
          if (usersArr[end].debt > usersArr[start].cred) {
            usersArr[end].debt = usersArr[end].debt - usersArr[start].cred;
            usersArr[start].cred = 0;
          } else {
            usersArr[start].cred = usersArr[start].cred - usersArr[end].debt;
            usersArr[end].debt = 0;
          }
          finalTransactions.push(tempTrans);
        } else {
          start++;
        }
      } else {
        end--;
      }
    }

    // console.log(JSON.stringify(usersArr, null, 4));
    console.log(JSON.stringify(finalTransactions, null, 4));
    setTransactions(finalTransactions);
  }, []);

  const getUsername = (id) => {
    let username = '';
    props.teamData.users.map((user) => {
      if (user._id === id) {
        console.log(user.username);
        username = user.username;
      }
    });
    return username;
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => props.navigation.navigate('Team')}>
        <Image
          source={require('../../../../../asstes/icons/back.png')}
          style={{marginLeft: 20, alignSelf: 'flex-start'}}></Image>
      </TouchableWithoutFeedback>
      <Text>SimplifiedTransactions</Text>
      <ScrollView
        style={{
          width: '90%',
          height: '60%',
        }}>
        {transactions.map((transaction) => {
          return (
            <Card
              marginVertical={5}
              left={
                <Text>
                  {getUsername(transaction.from)} owes{' '}
                  {getUsername(transaction.to)}{' '}
                </Text>
              }
              right={
                <Text>{parseFloat(transaction.amount).toFixed(2)}</Text>
              }></Card>
          );
        })}
        <Button title="Settle All" width="100%"></Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

const mapStateToProps = (state) => {
  return {
    teamData: state.team.currentTeamData,
  };
};

export default connect(mapStateToProps)(SimplifiedTransactions);

import {post} from '../requests';
import {store} from '../../../index';
import * as actions from '../../store/actions';
import io from 'socket.io-client';
import url from '../constants/url';
const socket = io(url, {transports: ['websocket']});

export const inputChangeHandler = (input, e, type) => {
  let updatedInput = {...input};
  let updatedElement = {...updatedInput[type]};
  updatedElement['value'] = e;
  updatedElement['valid'] = checkValidation(
    updatedElement.value,
    updatedElement.validation,
  );

  updatedElement.touched = true;
  updatedInput[type] = updatedElement;
  let validity = true;
  for (let key in updatedInput) {
    validity = validity && updatedInput[key].valid;
  }

  return [validity, updatedInput];
};

const checkValidation = (value, rules) => {
  let isValid = true;
  if (!rules) return true;
  if (rules.required) {
    isValid = isValid && value.trim() !== '';
  }
  if (rules.minLength) {
    isValid = isValid && value.length >= rules.minLength;
  }
  if (rules.maxLength) {
    isValid = isValid && value.length <= rules.maxLength;
  }
  if (rules.regex) {
    isValid = isValid && value.match(rules.regex);
  }
  return isValid;
};

// paid is an object {userId:paid amount}
// paid is an object {userId:split amount}
export const addTransactions = (
  paid,
  split,
  allUsers,
  specs,
  setCompleted,
  completed,
) => {
  console.log(paid);
  console.log(split);
  let transactions = [];

  const compareOnBalance = (a, b) => {
    if (a.balance > b.balance) return 1;
    else return -1;
  };

  let users = [];
  allUsers.forEach((user) => {
    let temp = {
      _id: user._id,
      balance: paid[user._id] ? parseFloat(paid[user._id]) : 0,
      split: split[user._id] ? parseFloat(split[user._id]) : 0,
    };
    if (temp.balance > temp.split) {
      temp.balance = temp.balance - temp.split;
      temp.split = 0;
    } else {
      temp.split = temp.split - temp.balance;
      temp.balance = 0;
    }
    users.push(temp);
  });

  users.sort(compareOnBalance);

  // Pay for Others
  let start = 0;
  let end = users.length - 1;
  while (end > start) {
    if (users[end].balance > 0) {
      if (users[start].split > 0) {
        // ADD transaction
        let tempTrans = {
          to: users[start]._id,
          from: users[end]._id,
          amount:
            users[end].balance > users[start].split
              ? users[start].split
              : users[end].balance,
        };
        if (users[end].balance > users[start].split) {
          users[end].balance = users[end].balance - users[start].split;
          users[start].split = 0;
        } else {
          users[start].split = users[start].split - users[end].balance;
          users[end].balance = 0;
        }
        transactions.push(tempTrans);
      } else {
        start++;
      }
    } else {
      end--;
    }
  }

  const finalData = {
    teamId: specs.teamId,
    placeName: specs.placeName,
    bill: specs.bill,
    transactions: transactions,
  };
  post({route: '/api/transactions/addTransactions', body: finalData})
    .then((data) => {
      store.dispatch(actions.addPlace(data.place));
      setCompleted(!completed);
      let users = [];
      data.transactions.map((transaction) => {
        users.push(transaction.from);
        users.push(transaction.to);
      });
      socket.emit('notification', {
        data: {users: users, teamId: specs.teamId},
        type: 'TRANSACTION_ADDED',
      });
    })
    .catch((e) => {
      console.log(e);
      setCompleted(false);
    });
};

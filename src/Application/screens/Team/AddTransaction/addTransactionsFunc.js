// paid is an object {userId:paid amount}
// paid is an object {userId:split amount}
export const addTransactions = (paid, split, allUsers) => {
  let transactions = [];

  const compareOnBalance = (a, b) => {
    if (a.balance > b.balance) return 1;
    else return -1;
  };

  let users = [];
  allUsers.forEach((user) => {
    let temp = {
      _id: user._id,
      balance: paid[user._id] ? parseInt(paid[user._id]) : 0,
      split: split[user._id] ? parseInt(split[user._id]) : 0,
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
  console.log(JSON.stringify(transactions, null, 4));
  console.log(JSON.stringify(users, null, 4));
};

import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import Text from '../../../components/Text';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';
import Switch from '../../../components/Switch';
const T2 = () => {
  const [amount, setAmount] = useState([
    {person: 'Kartik', paid: false, amount: '0', id: '1'},
    {person: 'Prerna', paid: false, amount: '0', id: '2'},
    {person: 'Mike', paid: false, amount: '0', id: '3'},
  ]);
  const [totalAmount, setTotalAmount] = useState('0');
  const [paidEqually, setPaidEqually] = useState(false);
  return (
    <>
      <Input
        isAmount={true}
        onChangeText={(val) => setTotalAmount(val)}
        value={totalAmount}
        label="Enter Amount"></Input>
      <Text type="sub-content" color="red">
        {isNaN(totalAmount) ? 'Amount should be a number' : null}
      </Text>
      <View style={{alignItems: 'center'}}>
        <Text type="sub-heading" style={{alignSelf: 'flex-start'}} size={20}>
          Paid To
        </Text>
        <Text type="sub-heading" style={{alignSelf: 'flex-start'}}>
          Paid equally:{' '}
          <Switch
            inactiveBackgroundColor="#c1c1c1"
            onPress={() => {
              if (!paidEqually) {
                const temp = [...amount];
                temp.map((each) => {
                  each.paid = true;
                  each.amount = (totalAmount / temp.length).toString();
                });
                console.log(temp);
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
          <View style={{width: '100%', alignItems: 'center'}}>
            <Button title="Add"></Button>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default T2;

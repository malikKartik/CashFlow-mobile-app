import React, {useState} from 'react';
import {View} from 'react-native';
import Text from '../../../components/Text';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

const T1 = () => {
  const [amount, setAmount] = useState('0');
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
      <Button title="Add"></Button>
    </View>
  );
};

export default T1;

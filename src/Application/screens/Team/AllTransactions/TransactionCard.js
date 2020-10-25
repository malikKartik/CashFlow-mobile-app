import React from 'react';
import {View, Text} from 'react-native';
import * as colors from '../../../constants/ColorConstants';
import Card from '../../../components/Card';
import TextComp from '../../../components/Text';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const TransactionCard = (props) => {
  const item = props.item;
  return (
    <TouchableWithoutFeedback
      onPress={() => props.navigation.navigate('Room Transaction')}>
      <Card
        left={
          <>
            <TextComp type="content">{item.text}</TextComp>
            {item.place ? (
              <TextComp type="sub-content">{item.place}</TextComp>
            ) : null}
          </>
        }
        marginVertical={7}
        right={
          <>
            <TextComp type="content" amountType={item.type} textAlign="right">
              {item.amount}
            </TextComp>
            <TextComp type="sub-content">{item.date}</TextComp>
          </>
        }
        height={70}></Card>
    </TouchableWithoutFeedback>
  );
};

export default TransactionCard;

import React from 'react';
import {View, Text} from 'react-native';
import * as colors from '../../../constants/ColorConstants';
import Card from '../../../components/Card';
import UserImage from '../../../components/UserImage';
import TextComp from '../../../components/Text';

const MemberCard = (props) => {
  const item = props.item;
  return (
    <View style={{marginBottom: 14}}>
      <Card
        right={
          <UserImage
            firstName={item.firstName}
            lastName={item.lastName}
            backgroundColor={colors.primary}></UserImage>
        }
        left={
          <>
            <TextComp type="content">
              {item.firstName + ' ' + item.lastName}
            </TextComp>
            <TextComp
              type="sub-content"
              amountType={
                item.credit ? 'credit' : item.debit ? 'debit' : 'none'
              }>
              {item.credit
                ? 'Owes you ' + item.credit
                : item.debit
                ? 'You owe ' + item.debit
                : ''}
            </TextComp>
          </>
        }
        height={70}></Card>
    </View>
  );
};

export default MemberCard;
